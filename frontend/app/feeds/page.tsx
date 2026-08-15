"use client";

import posts from "@/data/posts";
import Link from "next/link";
import { useContext } from "react";
import { SiteContext } from "@/context/SiteContext";

// displays all posts as cards or a list (dependent on SiteContext view mode), each post linking to
// it's full detail page using [id]
export default function Feeds() {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error("Feeds must be used within a SiteProvider")
    }
    const { view } = context;

        return (
            <main className="max-w-350 mx-auto space-y-12 p-4">
                <h1 className="text-center text-5xl">Feeds</h1>
                <div className={`grid text-left ${view === "list" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-6`}>
                {posts.map((post) => (
                    <article key={post.id} className="border-2 border-border shadow-sm rounded-lg p-4 bg-background">
                        <h2 className="text-2xl font-bold">{post.title}</h2>
                        <p className="text-sm text-muted">{post.date} · {post.author}</p>
                        <p>{post.summary}</p>
                        <Link 
                        className="inline-flex items-center gap-1 text-accent font-medium hover:gap-4 hover:text-foreground focus-visible:text-foreground transition-all" 
                        href={`/feeds/${post.id}`}
                        >Read more <span aria-hidden="true">→</span><span className="sr-only">about {post.title}
                        </span></Link>
                    </article>
                ))}
                </div>
            </main>
    )
}