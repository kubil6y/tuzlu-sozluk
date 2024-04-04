import { db } from "@/lib/db";
import { TODO_sleep } from "@/lib/sleep";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await TODO_sleep(1000);

    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("searchTerm");
    if (!searchTerm) {
        return NextResponse.json([]);
    }
    const posts = await db.post.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
        },
        where: {
            title: {
                contains: searchTerm,
                mode: "insensitive",
            },
        },
        take: 5,
        orderBy: {
            createdAt: "desc",
        },
    });
    return NextResponse.json(posts);
}
