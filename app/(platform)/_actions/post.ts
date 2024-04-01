"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { postSchema } from "@/schemas/post";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { createId } from "@paralleldrive/cuid2";

export const createPost = action(
    postSchema,
    async ({ title, body, channelId }) => {
        const session = await auth();
        if (!session?.user?.id) {
            return { error: { auth: "Unauthenticated" } };
        }
        const channel = await db.channel.findUnique({
            where: {
                id: channelId,
            },
        });

        if (!channel) {
            return { error: { channel: "Channel is unavailable" } };
        }

        const slug = `${slugify(title)}-${createId()}`;

        const post = await db.post.create({
            data: {
                title,
                body,
                channelId,
                slug,
                userId: session.user.id,
            },
        });

        redirect(`/posts/${post.slug}`);
        // TODO: revalidate!
    }
);
