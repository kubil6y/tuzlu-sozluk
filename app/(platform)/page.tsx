import { getPosts } from "@/data/posts";
import { Suspense } from "react";
import { PostCard, PostCardSkeleton } from "./_components/post-card";

export default async function Home() {
    return (
        <>
            <Suspense fallback={
                <>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </>
            }>
                <PostList fetcher={getPosts} />
            </Suspense>
        </>
    );
}

type PostListProps = {
    fetcher: () => Promise<
        {
            id: string;
            title: string;
            body: string;
            slug: string;
        }[]
    >;
};

async function PostList({ fetcher }: PostListProps) {
    const posts = await fetcher();
    return (
        <div className="divide-y-1 overflow-y-auto">
            {posts.map((post) => (
                <PostCard key={post.id} {...post} postId={post.id} />
            ))}
        </div>
    );
}
