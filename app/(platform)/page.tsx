import { getPosts } from "@/data/posts";
import { Suspense } from "react";
import { PostCardSkeleton } from "./_components/post-card";
import { PostList } from "./_components/post-list";

export default async function Home() {
    return (
        <>
            <Suspense
                fallback={
                    <>
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </>
                }
            >
                <PostList fetcher={getPosts} />
            </Suspense>
        </>
    );
}
