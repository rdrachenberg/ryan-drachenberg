#!/usr/bin/env node
// Manage cover images for content/posts/*.mdx.
//
// Covers are openly licensed images from Wikimedia Commons, hotlinked by URL
// and credited on the page. Each post stores the search that found its image
// (`imageQuery`), so a cover that stops loading can be replaced with a
// comparable one automatically.
//
//   node scripts/post-images.mjs check            Verify every cover (and inline image) URL; exit 1 if a cover is broken
//   node scripts/post-images.mjs fix              Replace broken covers using each post's imageQuery
//   node scripts/post-images.mjs search "<query>" List licensed Commons candidates for a query
//   node scripts/post-images.mjs set <post.mdx> "<File:Title.jpg>" "<query>" "<alt text>"
//                                                 Give a post a specific Commons file as its cover

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const POSTS_DIR = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'content', 'posts');
const API = 'https://commons.wikimedia.org/w/api.php';
// Wikimedia asks API clients to identify themselves
const HEADERS = { 'User-Agent': 'ryan-drachenberg-site/1.0 (https://github.com/rdrachenberg/ryan-drachenberg)' };
const ALLOWED_LICENSE = /^(CC0|Public domain|PD|CC BY(-SA)? \d(\.\d)?)/i;
const FIELDS = ['image', 'imageAlt', 'imageCredit', 'imageSource', 'imageQuery'];

// --- frontmatter --------------------------------------------------------------

function readPost(file) {
    const text = readFileSync(file, 'utf8');
    const match = text.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) throw new Error(`No frontmatter in ${file}`);
    const data = {};
    for (const line of match[1].split('\n')) {
        const kv = line.match(/^(\w+):\s*(.*)$/);
        if (kv) data[kv[1]] = kv[2].replace(/^(["'])(.*)\1$/, '$2');
    }
    return { file, text, data, frontmatter: match[1], body: text.slice(match[0].length) };
}

function writeFields(post, fields) {
    const lines = post.frontmatter.split('\n').filter(line => !FIELDS.some(f => line.startsWith(`${f}:`)));
    for (const f of FIELDS) {
        if (fields[f]) lines.push(`${f}: ${JSON.stringify(fields[f])}`);
    }
    writeFileSync(post.file, `---\n${lines.join('\n')}\n---\n${post.body}`);
}

const allPosts = () => readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => readPost(path.join(POSTS_DIR, f)));

// --- Wikimedia Commons --------------------------------------------------------

const stripHtml = html => (html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function toCandidate(page) {
    const info = page.imageinfo?.[0];
    if (!info) return null;
    const meta = info.extmetadata || {};
    const license = stripHtml(meta.LicenseShortName?.value);
    const url = (info.thumburl || info.url).split('?')[0];
    return {
        title: page.title,
        url,
        width: info.width,
        height: info.height,
        license,
        author: stripHtml(meta.Artist?.value) || 'Unknown author',
        source: info.descriptionurl,
        usable: ALLOWED_LICENSE.test(license) && !meta.NonFree?.value
            && info.width >= 1000 && info.width / info.height >= 1.2 && info.width / info.height <= 2.2,
    };
}

async function commons(params) {
    const qs = new URLSearchParams({
        action: 'query', format: 'json', prop: 'imageinfo',
        iiprop: 'url|size|extmetadata', iiurlwidth: '1280', ...params,
    });
    const res = await fetch(`${API}?${qs}`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Commons API ${res.status}`);
    const pages = Object.values((await res.json()).query?.pages || {});
    return pages.sort((a, b) => (a.index ?? 0) - (b.index ?? 0)).map(toCandidate).filter(Boolean);
}

const search = query => commons({
    generator: 'search', gsrsearch: `${query} filetype:bitmap`, gsrnamespace: '6', gsrlimit: '30',
});

const fileInfo = async title => (await commons({ titles: title }))[0];

const credit = c => `${c.author} / ${c.license}, via Wikimedia Commons`;

// --- link checking ------------------------------------------------------------

async function isAlive(url) {
    if (url.startsWith('/')) return true; // local files are checked by the build
    try {
        const res = await fetch(url, { method: 'GET', headers: { ...HEADERS, Range: 'bytes=0-0' }, redirect: 'follow' });
        return (res.ok || res.status === 206) && (res.headers.get('content-type') || '').startsWith('image/');
    } catch {
        return false;
    }
}

const inlineImages = body => [...body.matchAll(/(?:src=["']|!\[[^\]]*\]\()(https?:\/\/[^"')\s]+)/g)].map(m => m[1]);

// --- commands -----------------------------------------------------------------

async function check({ quiet = false } = {}) {
    const broken = [];
    for (const post of allPosts()) {
        const name = path.basename(post.file);
        if (!post.data.image) {
            if (!quiet) console.log(`  no cover   ${name}`);
        } else if (!(await isAlive(post.data.image))) {
            console.log(`✗ cover      ${name}  ${post.data.image}`);
            broken.push(post);
        }
        for (const url of inlineImages(post.body)) {
            if (!(await isAlive(url))) console.log(`! inline     ${name}  ${url}`);
        }
    }
    console.log(broken.length ? `\n${broken.length} broken cover(s). Run: node scripts/post-images.mjs fix` : '\nAll covers load.');
    return broken;
}

async function fix() {
    const broken = await check({ quiet: true });
    for (const post of broken) {
        const query = post.data.imageQuery;
        if (!query) {
            console.log(`  skip ${path.basename(post.file)}: no imageQuery to search with`);
            continue;
        }
        const used = new Set(allPosts().map(p => p.data.image));
        const replacement = (await search(query)).find(c => c.usable && !used.has(c.url));
        if (!replacement) {
            console.log(`  no usable replacement for "${query}"`);
            continue;
        }
        writeFields(post, { ...post.data, image: replacement.url, imageCredit: credit(replacement), imageSource: replacement.source });
        console.log(`✓ ${path.basename(post.file)} → ${replacement.title}`);
    }
}

async function main() {
    const [command, ...args] = process.argv.slice(2);
    if (command === 'check') {
        process.exitCode = (await check()).length ? 1 : 0;
    } else if (command === 'fix') {
        await fix();
    } else if (command === 'search') {
        for (const c of await search(args.join(' '))) {
            if (c.usable) console.log(`${c.title}\n    ${c.width}x${c.height}  ${c.license}  ${c.author}\n    ${c.url}`);
        }
    } else if (command === 'set') {
        const [file, title, query, alt] = args;
        const c = await fileInfo(title);
        if (!c) throw new Error(`Not found on Commons: ${title}`);
        if (!ALLOWED_LICENSE.test(c.license)) throw new Error(`License not allowed: ${c.license}`);
        const post = readPost(path.resolve(file));
        writeFields(post, { image: c.url, imageAlt: alt, imageCredit: credit(c), imageSource: c.source, imageQuery: query });
        console.log(`✓ ${path.basename(file)} → ${c.title} (${c.license})`);
    } else {
        console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 15).join('\n'));
    }
}

main().catch(err => {
    console.error(err.message);
    process.exit(1);
});
