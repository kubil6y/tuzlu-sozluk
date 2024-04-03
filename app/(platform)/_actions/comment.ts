"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { commentSchema } from "@/schemas/comment";
import { revalidatePath } from "next/cache";

export const createComment = action(
    commentSchema,
    async ({ body, postId, slug }) => {
        const session = await auth();
        if (!session?.user?.id) {
            return { error: { auth: "Unauthenticated" } };
        }

        const post = await db.post.findUnique({
            where: { id: postId },
        });
        if (!post) {
            return { error: { post: "Post is unavailable" } };
        }

        await db.comment.create({
            data: {
                userId: session.user.id,
                body,
                postId,
            },
        });

        // TODO check
        revalidatePath("/(platform)/layout");
        revalidatePath(`/(platform)/posts/${slug}`);
    }
);
