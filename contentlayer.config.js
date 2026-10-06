import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
};

const Page = defineDocumentType(()=> ({
    name: 'Page',
    filePathPattern: "pages/**/*.mdx",
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true
        },
        image: {
            type: 'string',
            required: true,
        },
    },
    computedFields
}));

const Post = defineDocumentType(()=> ({
    name: 'Post',
    filePathPattern: "posts/**/*.mdx",
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
        },
        date: {
            type: 'date',
            required: true,
        },
        // Cover image, managed by scripts/post-images.mjs
        image: { type: 'string' },
        imageAlt: { type: 'string' },
        imageCredit: { type: 'string' },
        imageSource: { type: 'string' },
        imageQuery: { type: 'string' },
    },
    computedFields: {
        ...computedFields,
        readingTime: {
            type: 'number',
            resolve: (doc) => Math.max(1, Math.round(doc.body.raw.split(/\s+/).length / 230)),
        },
    },
}));

// The post layout renders `title` itself, so drop an H1 that opens the body
// (posts written by the research agent have repeated the title that way).
function remarkStripLeadingH1() {
    return tree => {
        const first = tree.children.findIndex(node => !['yaml', 'mdxjsEsm'].includes(node.type));
        if (first !== -1 && tree.children[first].type === 'heading' && tree.children[first].depth === 1) {
            tree.children.splice(first, 1);
        }
    };
}

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Page, Post],
    mdx: {
        remarkPlugins: [remarkStripLeadingH1],
    },
})