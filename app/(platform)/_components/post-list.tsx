import { Vote, Comment, User } from "@prisma/client";
import { PostCard, PostCardSkeleton } from "./post-card";
import { Suspense } from "react";

type PostListProps = {
    fetcher: () => Promise<
        {
            id: string;
            title: string;
            body: string;
            slug: string;
            createdAt: Date;
        user: User;
            votes: Vote[];
            comments: Comment[];
        }[]
    >;
};

async function PostList({ fetcher }: PostListProps) {
    const posts = await fetcher();
    return (
        <div className="divide-y-1 overflow-y-auto">
            {posts?.length &&
                posts.map((post) => (
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
        </div>
    );
}

type PostListWithSuspenseProps = {
    fetcher: () => Promise<
        {
            id: string;
            title: string;
            body: string;
            slug: string;
            createdAt: Date;
            user: User;
            votes: Vote[];
            comments: Comment[];
        }[]
    >;
};

export function PostListWithSuspense({ fetcher }: PostListWithSuspenseProps) {
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
                <PostList fetcher={fetcher} />
            </Suspense>
        </>
    );
}
