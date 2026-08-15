"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "@/context/SiteContext";

interface ApiPost {
    id: number;
    title: string;
    content: string;
    topic: string | null;
    imageUrl: string | null;
    link: string;
    publishedAt: string;
    feed: { id: number; title: string };
    author: { id: number; name: string };
}

// Derives a short preview from the full content, since posts don't store
// a separate summary field.
function getPreview(content: string, maxLength = 160): string {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "…";
}

export default function Feeds() {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error("Feeds must be used within a SiteProvider");
    }
    const { view } = context;

    const [posts, setPosts] = useState<ApiPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
                const res = await fetch(`${apiUrl}/api/posts`);
                if (!res.ok) throw new Error(`API responded with ${res.status}`);
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    return (
        <main className="max-w-350 mx-auto space-y-12 p-4">
            <h1 className="text-center text-5xl">Feeds</h1>

            {loading && <p className="text-center text-muted">Loading feeds...</p>}
            {error && <p className="text-center text-red-500">Couldn&apos;t load feeds: {error}</p>}
            {!loading && !error && posts.length === 0 && (
                <p className="text-center text-muted">No posts yet.</p>
            )}

            <div className={`grid text-left ${view === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-6`}>
                {posts.map((post) => {
                    const preview = getPreview(post.content);
                    return (
                        <article key={post.id} className="border-2 border-border shadow-sm rounded-lg p-4 bg-background">
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                            <p className="text-sm text-muted">
                                {new Date(post.publishedAt).toLocaleDateString()} · {post.author.name}
                            </p>
                            <p>{preview}</p>
                            <Link
                                className="inline-flex items-center gap-1 text-accent font-medium hover:gap-4 hover:text-foreground focus-visible:text-foreground transition-all"
                                href={`/feeds/${post.id}`}
                            >
                                Read more <span aria-hidden="true">→</span>
                                <span className="sr-only">about {post.title}</span>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </main>
    );
}