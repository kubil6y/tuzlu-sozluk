"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { voteSchema } from "@/schemas/vote";

export const votePost = action(voteSchema, async ({ postId, voteType }) => {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: { auth: "Unauthenticated" } };
    }

    const post = await db.post.findUnique({
        where: { id: postId },
        include: {
            votes: true,
        },
    });
    if (!post) {
        return { error: { message: "Post not found" } };
    }

    const existingVote = post.votes.find(
        (vote) => vote.userId === session.user.id
    );

    if (existingVote) {
        if (existingVote.type === voteType) {
            // Voted the same --> remove
            await db.vote.delete({
                where: { id: existingVote.id },
            });
        } else {
            // Voted diff --> update
            await db.vote.update({
                where: { id: existingVote.id },
                data: { type: voteType },
            });
        }
    } else {
        // Create new vote
        await db.vote.create({
            data: {
                type: voteType,
                postId: postId,
                userId: session.user.id,
            },
        });
    }

    revalidatePath("/(platform)", "page");
    revalidatePath("/(platform)/channel/[channelName]", "page")
});
