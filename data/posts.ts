import { _cache } from "@/lib/cache";
import { db } from "@/lib/db";
import { TODO_sleep } from "@/lib/sleep";

export const getPosts = _cache(async () => {
    console.log("getPosts");
    await TODO_sleep(5000);
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
        take: 10,
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
            where: {
                slug,
            },
        });
    },
    ["/posts/[slug]", "getPostBySlug"]
);

export const getChannelPosts = _cache(
    async (channelName: string) => {
        await TODO_sleep(5000);
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
