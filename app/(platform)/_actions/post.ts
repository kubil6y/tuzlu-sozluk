"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { postSchema } from "@/schemas/post";
import { redirect } from "next/navigation";

export const createPost = action(
    postSchema,
    async ({ title, body, channelId }) => {
        const session = await auth();
        console.log(session);
        if (!session?.user?.id) {
            return {
                error: {
                    auth: "Unauthenticated",
                },
            };
        }
        const channel = await db.channel.findUnique({
            where: {
                id: channelId,
            },
        });

        if (!channel) {
            return {
                error: {
                    channel: "Channel is unavailable",
                },
            };
        }

        console.log({
                title,
                body,
                channelId,
                userId: session.user.id,
        });

        const post = await db.post.create({
            data: {
                title,
                body,
                channelId,
                userId: session.user.id,
            },
        });

        redirect(`/posts/${post.id}`);
        // TODO: revalidate!
    }
);
