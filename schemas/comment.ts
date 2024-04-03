import { z } from "zod";

export const commentSchema = z.object({
    body: z.string().min(8, { message: "Please write something meaningful" }),
    postId: z.string(),
    slug: z.string(),
});

export type CommentSchema = z.infer<typeof commentSchema>;
