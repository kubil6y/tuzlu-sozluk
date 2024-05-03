import { getPosts } from "@/data/posts";
import { PostListWithSuspense } from "./_components/post-list";

export default async function Home({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const page = Number(searchParams?.page ?? 0);
    const take = 10;
    return (
        <>
            <PostListWithSuspense fetcher={getPosts} take={take} page={page} key="home/posts"/>
        </>
    );
}
