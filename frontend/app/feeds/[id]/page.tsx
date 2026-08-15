import posts from "@/data/posts";
import Link from "next/link";

// Individual page for full post details, matched from static data via dynamic [id]
export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = posts.find((p) => p.id === Number(id));
    
    if (!post) {
        return (
            <main className="max-w-350 mx-auto space-y-6 p-4">
                <h1 className="text-3xl font-bold">Post Not Found</h1>
                <p className="text-muted mb-4">We couldn't find the post you were looking for. It may have been removed.</p>
                <Link href="/feeds" className="breadcrumb-link inline-block mt-2">← Back to Feeds</Link>
            </main>
        )
    }


    return (
        <main className="max-w-350 mx-auto space-y-12 p-4">
            <article className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <p className="text-sm text-muted mt-2">{post.date} · {post.author}</p>
                    <p className="mt-6">{post.content}</p>
                    <Link href="/feeds" className="breadcrumb-link inline-block mt-4">← Back to Feeds</Link>
                </article>
        </main>
    )
}