import { db } from "@/lib/db";
import { TODO_sleep } from "@/lib/sleep";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await TODO_sleep(1000);

    const { searchParams } = new URL(req.url);

    const take = 10;
    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const skip = page ? (page - 1) * take : 0;
    const postCount = await db.post.count();
    const totalPages = Math.ceil(postCount / take);
    const posts = await db.post.findMany({
        select: {
            id: true,
            slug: true,
            title: true,
            comments: {
                select: { id: true },
            },
        },
        take,
        skip,
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json({
        totalPages,
        posts,
    });
}
