"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Point = [number, number];

type Props = {
    from: string;
    to: string;
    alt: string;
    // Matching landmarks as [x, y] percentages; from[i] corresponds to to[i]
    landmarks: { from: Point[]; to: Point[] };
    className?: string;
};

const HOLD_MS = 600;
const MORPH_MS = 2600;
// Give up on the morph (and just fade) if images take longer than this to load
const LOAD_BUDGET_MS = 3000;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const smoothstep = (a: number, b: number, t: number) => {
    const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
    return x * x * (3 - 2 * x);
};

// Bowyer–Watson Delaunay triangulation; returns index triples into `pts`
function triangulate(pts: Point[]): number[] {
    const n = pts.length;
    const all: Point[] = [...pts, [-1000, -1000], [1100, -1000], [50, 1100]];
    const circum = (a: number, b: number, c: number) => {
        const [ax, ay] = all[a], [bx, by] = all[b], [cx, cy] = all[c];
        const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
        const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
        const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
        return { x: ux, y: uy, r2: (ax - ux) ** 2 + (ay - uy) ** 2 };
    };
    let tris = [{ v: [n, n + 1, n + 2], c: circum(n, n + 1, n + 2) }];
    for (let i = 0; i < n; i++) {
        const [px, py] = all[i];
        const bad = tris.filter(t => (px - t.c.x) ** 2 + (py - t.c.y) ** 2 < t.c.r2);
        const edges = new Map<string, [number, number]>();
        for (const t of bad) {
            for (const [a, b] of [[t.v[0], t.v[1]], [t.v[1], t.v[2]], [t.v[2], t.v[0]]]) {
                const key = a < b ? `${a}-${b}` : `${b}-${a}`;
                if (edges.has(key)) edges.delete(key);
                else edges.set(key, [a, b]);
            }
        }
        tris = tris.filter(t => !bad.includes(t));
        edges.forEach(([a, b]) => tris.push({ v: [a, b, i], c: circum(a, b, i) }));
    }
    return tris.filter(t => t.v.every(v => v < n)).flatMap(t => t.v);
}

const VERTEX = `
attribute vec2 aFrom;
attribute vec2 aTo;
uniform float uWarp;
varying vec2 vFrom;
varying vec2 vTo;
void main() {
    vec2 p = mix(aFrom, aTo, uWarp);
    vFrom = aFrom;
    vTo = aTo;
    gl_Position = vec4(p.x * 2.0 - 1.0, 1.0 - p.y * 2.0, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D uFromTex;
uniform sampler2D uToTex;
uniform float uDissolve;
varying vec2 vFrom;
varying vec2 vTo;
void main() {
    gl_FragColor = mix(texture2D(uFromTex, vFrom), texture2D(uToTex, vTo), uDissolve);
}`;

function loadImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Sets up the mesh and returns a draw(warp, dissolve) function, or null if WebGL is unavailable
function createRenderer(canvas: HTMLCanvasElement, fromImg: HTMLImageElement, toImg: HTMLImageElement, landmarks: Props["landmarks"]) {
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!gl) return null;

    const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
    gl.useProgram(program);

    // Triangulate on the average shape so neither end gets skinny triangles
    const mean = landmarks.from.map(([x, y], i): Point => [(x + landmarks.to[i][0]) / 2, (y + landmarks.to[i][1]) / 2]);
    const indices = triangulate(mean);
    const attribute = (name: string, pts: Point[]) => {
        const data = new Float32Array(indices.flatMap(i => [pts[i][0] / 100, pts[i][1] / 100]));
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };
    attribute("aFrom", landmarks.from);
    attribute("aTo", landmarks.to);

    const texture = (unit: number, img: HTMLImageElement, uniform: string) => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.uniform1i(gl.getUniformLocation(program, uniform), unit);
    };
    texture(0, fromImg, "uFromTex");
    texture(1, toImg, "uToTex");

    const uWarp = gl.getUniformLocation(program, "uWarp");
    const uDissolve = gl.getUniformLocation(program, "uDissolve");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);

    return (warp: number, dissolve: number) => {
        gl.uniform1f(uWarp, warp);
        gl.uniform1f(uDissolve, dissolve);
        gl.drawArrays(gl.TRIANGLES, 0, indices.length);
    };
}

// Landmark-based face morph: a triangle mesh warps the old photo's features
// onto the new photo's while the two cross-dissolve.
export default function PortraitMorph({ from, to, alt, landmarks, className }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<"cover" | "morphing" | "done">("cover");

    useEffect(() => {
        // The cover is already hidden by CSS for reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let frame = 0;
        let cancelled = false;
        const mountedAt = performance.now();

        Promise.all([loadImage(from), loadImage(to)])
            .then(([fromImg, toImg]) => {
                if (cancelled) return;
                const canvas = canvasRef.current;
                const draw = canvas && performance.now() - mountedAt < LOAD_BUDGET_MS
                    ? createRenderer(canvas, fromImg, toImg, landmarks)
                    : null;
                if (!draw) return setPhase("done");

                draw(0, 0);
                setPhase("morphing");
                const start = performance.now() + HOLD_MS;
                const tick = (now: number) => {
                    const p = Math.min(1, Math.max(0, (now - start) / MORPH_MS));
                    draw(easeInOutCubic(p), smoothstep(0.25, 0.75, p));
                    if (p < 1) frame = requestAnimationFrame(tick);
                    else setPhase("done");
                };
                frame = requestAnimationFrame(tick);
            })
            .catch(() => setPhase("done"));

        return () => {
            cancelled = true;
            cancelAnimationFrame(frame);
        };
    }, [from, to, landmarks]);

    return (
        <div className={`relative overflow-hidden ${className ?? ""}`}>
            <Image src={to} alt={alt} fill sizes="250px" priority className="object-cover" />
            <Image
                src={from}
                alt=""
                aria-hidden
                fill
                sizes="250px"
                priority
                className={`portrait-morph-cover object-cover transition-opacity duration-700 ${phase === "cover" ? "opacity-100" : "opacity-0"}`}
            />
            <canvas
                ref={canvasRef}
                aria-hidden
                className={`absolute inset-0 h-full w-full ${phase === "morphing" ? "visible" : "invisible"}`}
            />
        </div>
    );
}
