import { _cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getPosts = _cache(async () => {
    // TODO remove
    console.log("getPosts");
    return db.post.findMany({
        select: {
            id: true,
            body: true,
            slug: true,
            title: true,
        },
        take: 10,
        orderBy: {
            createdAt: "desc",
        }
    });
}, ["/", "getPosts"]);

export const getPostsSummary = _cache(() => {
    // TODO remove
    return db.post.findMany({
        select: {
            id: true,
            slug: true,
            title: true,
            comments: {
                select: { id: true },
            },
        },
    });
}, ["/", "getPostsSummary"]);

export const getPostBySlug = _cache(
    (slug: string) => {
        // TODO remove
        console.log(`getPostBySlug(${slug})`);
        return db.post.findFirst({
            where: {
                slug,
            },
        });
    },
    ["/posts/[slug]", "getPostBySlug"]
);
