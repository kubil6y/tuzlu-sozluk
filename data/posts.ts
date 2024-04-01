import { _cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getPostsSummary = _cache(() => {
    // TODO remove
    console.log("getPostsSummary()");
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
