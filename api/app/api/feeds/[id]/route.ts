import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const feed = await prisma.feed.findUnique({
        where: { id: Number(params.id) },
        include: { posts: true },
    });
    if (!feed) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(feed);
    }

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    const feed = await prisma.feed.update({
        where: { id: Number(params.id) },
        data: {
            title: body.title,
            description: body.description,
            url: body.url,
        },
    });
    return NextResponse.json(feed);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await prisma.feed.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ deleted: true });
}