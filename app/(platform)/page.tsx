import { getPosts } from "@/data/posts";
import { PostListWithSuspense } from "./_components/post-list";

export default async function Home() {
    return <PostListWithSuspense  fetcher={getPosts}/>;
}
