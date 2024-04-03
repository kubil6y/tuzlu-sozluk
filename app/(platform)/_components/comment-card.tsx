"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type CommentCardProps = {
    authorName: string;
    createdAt: Date;
    body: string;
};

export const CommentCard = ({
    authorName,
    createdAt,
    body,
}: CommentCardProps) => {
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
            <div className="flex space-x-2">
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
            <div
                className={cn("mt-2 lowercase", isTruncated && "line-clamp-4")}
            >
                {body}
            </div>
            {isTruncated && (
                <Button
                    variant="link"
                    className="p-0 text-xs font-normal"
                    onClick={() => setIsTruncated(false)}
                >
                    Read more...
                </Button>
            )}
        </div>
    );
};

export function CommentCardSkeleton() {
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
