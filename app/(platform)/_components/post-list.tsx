import { Vote, Comment, User } from "@prisma/client";
import { PostCard, PostCardSkeleton } from "./post-card";
import { Suspense } from "react";
import { CustomPagination } from "@/components/custom-pagination";

type PostListProps = {
    page?: number;
    take?: number;
    fetcher: (
        page?: number,
        take?: number
    ) => Promise<{
        postCount: number;
        posts: {
            id: string;
            title: string;
            body: string;
            slug: string;
            createdAt: Date;
            user: User;
            votes: Vote[];
            comments: Comment[];
        }[];
    }>;
};

async function PostList({ page, take, fetcher }: PostListProps) {
    const { postCount, posts } = await fetcher(page, take);
    const totalPages = Math.ceil(postCount / 10);
    if (!posts || posts?.length === 0) {
        return <div className="flex items-center justify-center text-lg p-8">
            No posts found :(
        </div>;
    }
    return (
        <>
            <div className="divide-y-1 overflow-y-auto">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        postId={post.id}
                        title={post.title}
                        slug={post.slug}
                        body={post.body}
                        votes={post.votes}
                        comments={post.comments}
                        authorName={post.user?.username ?? ""}
                        createdAt={post.createdAt}
                    />
                ))}
                <CustomPagination totalPages={totalPages} />
            </div>
        </>
    );
}

type PostListWithSuspenseProps = {
    page?: number;
    take?: number;
    fetcher: (
        page?: number,
        take?: number
    ) => Promise<{
        postCount: number;
        posts: {
            id: string;
            title: string;
            body: string;
            slug: string;
            createdAt: Date;
            user: User;
            votes: Vote[];
            comments: Comment[];
        }[];
    }>;
};

export function PostListWithSuspense({
    page,
    take,
    fetcher,
}: PostListWithSuspenseProps) {
    return (
        <>
            <Suspense
                fallback={
                    <div className="space-y-4">
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </div>
                }
            >
                <PostList fetcher={fetcher} take={take} page={page} />
            </Suspense>
        </>
    );
}
