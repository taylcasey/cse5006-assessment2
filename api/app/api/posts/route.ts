import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const posts = await prisma.post.findMany({
        include: { feed: true, author: true },
        orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const body = await request.json();
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            topic: body.topic,
            imageUrl: body.imageUrl,
            link: body.link,
            feedId: Number(body.feedId),
            authorId: Number(body.authorId),
        },
    });
    return NextResponse.json(post, { status: 201 });
}