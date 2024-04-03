import { z } from "zod";

const VALUES = ["Up", "Down"] as const;
export const voteSchema = z.object({
    postId: z.string(),
    username: z.string(),
    voteType: z.enum(VALUES),
})
export type VoteSchema = z.infer<typeof voteSchema>;
