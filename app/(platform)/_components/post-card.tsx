"use client";

import {
    ChevronUpIcon,
    ChevronDownIcon,
    ShareIcon,
    LinkIcon,
    MessageCircleIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { votePost } from "../_actions/vote";
import { Vote, Comment, VoteType } from "@prisma/client";
import { useRouter } from "next/navigation";

type PostCardProps = {
    postId: string;
    title: string;
    slug: string;
    body: string;
    votes: Vote[];
    comments: Comment[];
};

export const PostCard = ({
    postId,
    title,
    slug,
    body,
    votes,
    comments,
}: PostCardProps) => {
    const mounted = useMounted();

    const maxCharAmount = 200;
    const [isTruncated, setIsTruncated] = useState<boolean>(
        body.length > maxCharAmount
    );

    if (!mounted) {
        return null;
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold lowercase">{title}</h3>
            <div
                className={cn("mt-2 lowercase", isTruncated && "line-clamp-4")}
            >
                {body}
            </div>
            {isTruncated && (
                <Button
                    variant="link"
                    className="p-0 text-sm font-normal"
                    onClick={() => setIsTruncated(false)}
                >
                    Read more...
                </Button>
            )}

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-6">
                    <PostVotes postId={postId} votes={votes} />

                    <div className="flex items-center space-x-1.5">
                        <MessageCircleIcon className="size-5 text-slate-700" />
                        <span className="text-sm select-none">{comments.length}</span>
                    </div>
                </div>

                <MoreOptions slug={slug} />
            </div>
        </div>
    );
};

export function PostCardSkeleton() {
    return (
        <div>
            <div>skeleton</div>
            <div>skeleton</div>
            <div>skeleton</div>
        </div>
    );
}

type PostVotesProps = {
    postId: string;
    votes: Vote[];
};

function PostVotes({ postId, votes }: PostVotesProps) {
    const session = useSession();
    const router = useRouter();
    const isLoggedIn = Boolean(session?.data?.user);
    const { status, execute: vote } = useAction(votePost);

    function processVotes(votes: Vote[]): {
        upvoteCount: number;
        downvoteCount: number;
        existingVote: Vote | null;
    } {
        let upvoteCount = 0;
        let downvoteCount = 0;
        let existingVote: Vote | null = null;
        for (let i = 0; i < votes.length; i++) {
            if (votes[i].userId === session?.data?.user?.id) {
                existingVote = votes[i];
            }
            switch (votes[i].type) {
                case "Up":
                    upvoteCount++;
                    break;
                case "Down":
                    downvoteCount++;
                    break;
                default:
                    console.error("Invalid vote type:" , votes[i].type);
                    break;
            }
        }
        return { upvoteCount, downvoteCount, existingVote };
    }

    function voteOnClick(voteType: VoteType) {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }
        vote({ voteType, postId });
    }

    const { upvoteCount, downvoteCount, existingVote } = processVotes(votes);

    return (
        <>
            <div className="flex items-center space-x-1.5">
                <Button
                    variant="outline"
                    size="smIcon"
                    disabled={status === "executing"}
                    onClick={() => voteOnClick("Up")}
                    className={cn(
                        existingVote?.type === "Up" && "bg-primary text-white"
                    )}
                >
                    <ChevronUpIcon className="size-5" />
                </Button>
                <span className="text-sm select-none">{upvoteCount}</span>
            </div>

            <div className="flex items-center space-x-1.5">
                <Button
                    variant="outline"
                    size="smIcon"
                    disabled={status === "executing"}
                    onClick={() => voteOnClick("Down")}
                    className={cn(
                        existingVote?.type === "Down" && "bg-primary text-white"
                    )}
                >
                    <ChevronDownIcon className="size-5" />
                </Button>
                <span className="text-sm select-none">{downvoteCount}</span>
            </div>
        </>
    );
}

type MoreOptionsProps = {
    slug: string;
};

function MoreOptions({ slug }: MoreOptionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="smIcon">
                    <ShareIcon className="size-3.5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(
                                window.location.href + `posts/${slug}`
                            );
                        }}
                    >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        <span>Copy entry link</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
