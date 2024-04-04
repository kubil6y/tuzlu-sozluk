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
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/lib/constants";
import { getPostsSummary } from "@/data/posts";

type SlimComment = Pick<Comment, "id" | "body" | "createdAt">;

type PostCardProps = {
    postId: string;
    authorName: string;
    createdAt: Date;
    title: string;
    slug: string;
    body: string;
    votes: Vote[];
    comments: SlimComment[];
};

export const PostCard = ({
    postId,
    authorName,
    createdAt,
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
            <Button onClick={async () => {
                const summary = await getPostsSummary();
                console.log({summary});
            }}>laksjf</Button>
            <Link
                href={`/posts/${slug}`}
                className="hover:underline text-xl font-semibold lowercase"
            >
                <h3>{title}</h3>
            </Link>
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
                        <span className="text-sm select-none">
                            {comments.length}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-end flex-col justify-center">
                        <Link
                            href={`/users/${authorName}`}
                            className="text-xs text-primary hover:underline"
                        >
                            {authorName.toLowerCase()}
                        </Link>
                        <p className="text-xs text-foreground/80">
                            {format(createdAt, "dd.MM.yyyy hh:mm")}
                        </p>
                    </div>
                    <MoreOptions slug={slug} />
                </div>
            </div>
        </div>
    );
};

export function PostCardSkeleton() {
    return (
        <div className="p-4">
            <Skeleton className="h-6 w-[50%] mb-4" />

            <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-6">
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="size-8 rounded-lg" />
                </div>
                <div className="flex items-center justify-end space-x-1">
                    <div className="flex flex-col items-end space-y-1">
                        <Skeleton className="w-12 h-2" />
                        <Skeleton className="w-24 h-2" />
                    </div>
                    <Skeleton className="size-5 rounded" />
                </div>
            </div>
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
                    console.error("Invalid vote type:", votes[i].type);
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
        vote({ voteType, postId, username: session?.data?.user?.username! });
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
                                BASE_URL + `/posts/${slug}`
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
