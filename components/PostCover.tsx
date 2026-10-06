"use client";

import clsx from "clsx";
import { useState } from "react";

type Props = {
    src?: string;
    alt?: string;
    // Seeds the fallback gradient so each post keeps its own look
    title: string;
    className?: string;
    priority?: boolean;
};

const PALETTES = [
    ["#1e3a8a", "#0ea5e9"],
    ["#312e81", "#a855f7"],
    ["#064e3b", "#14b8a6"],
    ["#7c2d12", "#f59e0b"],
    ["#1f2937", "#3b82f6"],
    ["#4c1d95", "#ec4899"],
];

function hash(text: string) {
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
    return Math.abs(h);
}

// Cover images are hotlinked, so if one fails to load (or a post has none)
// show a generated gradient cover in its place rather than a broken image.
export default function PostCover({ src, alt = "", title, className, priority }: Props) {
    const [failed, setFailed] = useState(false);
    const [from, to] = PALETTES[hash(title) % PALETTES.length];

    return (
        <div className={clsx("relative overflow-hidden bg-zinc-100 dark:bg-zinc-800", className)}>
            {src && !failed ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote covers are pre-sized by Wikimedia
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : "auto"}
                    decoding="async"
                    onError={() => setFailed(true)}
                    // Catches images that already failed before hydration attached onError
                    ref={img => {
                        if (img?.complete && img.naturalWidth === 0) setFailed(true);
                    }}
                    className="absolute inset-0 h-full w-full object-cover text-transparent transition duration-500 group-hover:scale-[1.03]"
                />
            ) : (
                <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,.18), transparent 45%),
                            linear-gradient(transparent 95%, rgba(255,255,255,.08) 95%),
                            linear-gradient(90deg, transparent 95%, rgba(255,255,255,.08) 95%),
                            linear-gradient(135deg, ${from}, ${to})`,
                        backgroundSize: "100% 100%, 24px 24px, 24px 24px, 100% 100%",
                    }}
                />
            )}
        </div>
    );
}
