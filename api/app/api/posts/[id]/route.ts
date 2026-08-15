import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const post = await prisma.post.findUnique({
        where: { id: Number(params.id) },
        include: { feed: true, author: true },
    });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    const post = await prisma.post.update({
        where: { id: Number(params.id ) },
        data: {
            title: body.title,
            content: body.content,
            topic: body.topic,
            imageUrl: body.imageUrl,
            link: body.link,
        },
    });
    return NextResponse.json(post);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await prisma.post.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ deleted: true });
}