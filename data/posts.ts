import { _cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getPosts = _cache(async (page?: number, take?: number) => {
    console.log("getPosts");
    const takePost = take ?? 10;
    const skip = page ? (page - 1) * takePost : 0;
    return db.post.findMany({
        select: {
            id: true,
            body: true,
            slug: true,
            title: true,
            votes: true,
            user: true,
            comments: true,
            createdAt: true,
        },
        take: takePost,
        skip,
        orderBy: {
            createdAt: "desc",
        },
    });
}, ["/", "getPosts"]);

export const getPostsSummary = _cache(() => {
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
        console.log(`getPostBySlug(${slug})`);
        return db.post.findFirst({
            select: {
                id: true,
                body: true,
                slug: true,
                title: true,
                votes: true,
                user: true,
                comments: {
                    select: {
                        id: true,
                        body: true,
                        createdAt: true,
                        user: true,
                    }
                },
                createdAt: true,
            },
            where: {
                slug,
            },
        });
    },
    ["/posts/[slug]", "getPostBySlug"]
);

export const getChannelPosts = _cache(
    async (channelName: string) => {
        console.log("getPosts");
        return db.post.findMany({
            select: {
                id: true,
                body: true,
                slug: true,
                title: true,
                createdAt: true,
                user: true,
                votes: true,
                comments: true,
            },
            where: { channel: { name: channelName } },
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        });
    },
    ["/", "getChannelWithPosts"]
);

export const getChannel = _cache(
    (channelName: string) => {
        return db.channel.findFirst({
            where: {
                name: channelName,
            },
        });
    },
    ["/", "getChannel"]
);
