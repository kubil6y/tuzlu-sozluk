"use client";

import {
    ChevronUpIcon,
    ChevronDownIcon,
    ShareIcon,
    LinkIcon,
    LucideIcon,
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

type PostCardProps = {
    postId: string;
    title: string;
    slug: string;
    body: string;
};

// NOTE: anyone can vote on posts but only logged in users can see the vote amounts
export const PostCard = ({ postId, title, slug, body }: PostCardProps) => {
    const mounted = useMounted();
    const session = useSession();
    const { status, execute: vote } = useAction(votePost);

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
                {session?.data?.user ? (
                    <div className="flex items-center space-x-5">
                        <VoteButton
                            disabled={status === "executing"}
                            onClick={() =>
                                vote({
                                    voteType: "Up",
                                    postId,
                                })
                            }
                            icon={ChevronUpIcon}
                        />
                        <VoteButton
                            disabled={status === "executing"}
                            onClick={() =>
                                vote({
                                    voteType: "Down",
                                    postId,
                                })
                            }
                            icon={ChevronDownIcon}
                        />
                    </div>
                ) : (
                    <p>login to vote</p>
                )}
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

type VoteButtonProps = {
    disabled: boolean;
    onClick: () => void;
    icon: LucideIcon;
    voted?: boolean;
};

function VoteButton({
    disabled,
    onClick,
    icon: Icon,
    voted = false,
}: VoteButtonProps) {
    return (
        <Button
            variant="outline"
            size="smIcon"
            disabled={disabled}
            onClick={onClick}
            className={cn(voted && "bg-primary text-white")}
        >
            <Icon className="size-5" />
        </Button>
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
