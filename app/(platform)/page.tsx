import { getPosts } from "@/data/posts";
import { PostListWithSuspense } from "./_components/post-list";
import { CustomPagination } from "@/components/custom-pagination";

export default async function Home({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const page = Number(searchParams?.page ?? 0);
    const take = 3;
    // leftoff totalPages is hardcoded
    return (
        <>
            <PostListWithSuspense fetcher={getPosts} take={take} page={page} />
            <CustomPagination totalPages={10} />
        </>
    );
}
