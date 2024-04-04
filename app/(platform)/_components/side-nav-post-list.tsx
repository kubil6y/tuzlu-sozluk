"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPostsSummary } from "@/data/posts";

type PostSummary = {
    title: string;
    id: string;
    slug: string;
    comments: {
        id: string;
    }[];
};

type SideNavPostListItemProps = {
    serverTotalPages: number;
    serverPosts: PostSummary[];
};

export const SideNavPostList = ({
    serverPosts,
    serverTotalPages,
}: SideNavPostListItemProps) => {
    const [page, setPage] = useState<number>(1);
    const [posts, setPosts] = useState<PostSummary[]>(serverPosts ?? []);
    const [totalPages, setTotalPages] = useState<number>(serverTotalPages ?? 1);

    /*
    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetch(`/api/latest?page=${page}`, {
                    cache: "no-store",
                });
                const data = await res.json();
                setPosts(data?.posts ?? []);
                setTotalPages(data?.totalPages ?? 1);
            } catch (err) {
                console.log(err);
            }
        };
        //getPosts();
    }, [page]);
    */

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { totalPages, postSummary } = await getPostsSummary(page);
                setTotalPages(totalPages);
                setPosts(postSummary);
            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, [page]);

    return (
        <div className="w-min-[300px] px-2">
            <SideNavPagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    title={post.title}
                    slug={post.slug}
                    commentAmount={post.comments.length}
                />
            ))}
        </div>
    );
};

type SideNavPaginationProps = {
    totalPages: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
};

const SideNavPagination = ({
    totalPages,
    page,
    setPage,
}: SideNavPaginationProps) => {
    function generatePagesArray(totalPages: number): number[] {
        return new Array(totalPages).fill(0).map((_, i) => i + 1);
    }
    return (
        <Select
            value={page.toString()}
            onValueChange={(e) => {
                setPage(Number(e));
            }}
        >
            <SelectTrigger className="">
                <SelectValue placeholder={page.toString()} />
            </SelectTrigger>
            <SelectContent>
                {generatePagesArray(totalPages).map((i) => (
                    <SelectItem value={i.toString()} key={i}>
                        {i}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

type PostItemProps = {
    title: string;
    slug: string;
    commentAmount: number;
};

function PostItem({ title, slug, commentAmount }: PostItemProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={`/posts/${slug}`}
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-primary/80 transition hover:text-white"
                    >
                        <p className="w-[90%] truncate">{title}</p>
                        <p className="w-[10%] text-end">{commentAmount}</p>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
