import { _cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getPosts = _cache(
    async (page?: number, take?: number) => {
        const takePost = take ?? 10;
        const skip = page ? (page - 1) * takePost : 0;

        const [postCount, posts] = await db.$transaction([
            db.post.count(),
            db.post.findMany({
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
            }),
        ]);

        return {
            postCount,
            posts,
        };
    },
    ["/", "getPosts"]
);

export const getChannelPosts = _cache(
    async (channelName: string, page?: number, take?: number) => {
        const takePost = take ?? 10;
        const skip = page ? (page - 1) * takePost : 0;
        const [postCount, posts] = await db.$transaction([
            db.post.count({ where: { channel: { name: channelName } } }),
            db.post.findMany({
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
                take: takePost,
                skip,
                orderBy: {
                    createdAt: "desc",
                },
            }),
        ]);
        return { postCount, posts };
    },
    ["/", "getChannelWithPosts"]
);

export const getUserPosts = _cache(
    async (username: string, page?: number, take?: number) => {
        const takePost = take ?? 10;
        const skip = page ? (page - 1) * takePost : 0;
        const [postCount, posts] = await db.$transaction([
            db.post.count({ where: { user: { username }} }),
            db.post.findMany({
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
                where: { user: { username }},
                take: takePost,
                skip,
                orderBy: {
                    createdAt: "desc",
                },
            }),
        ]);
        return { postCount, posts };
    },
    ["/", "getUserPosts"]
);

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
        take: 25,
        orderBy: {
            createdAt: "desc",
        }
    });
}, ["/", "getPostsSummary"]);

export const getPostBySlug = _cache(
    (slug: string) => {
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
                    },
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
