import { notFound } from "next/navigation";
import { getUserPosts } from "@/data/posts";
import { PostListWithSuspense } from "../../_components/post-list";
import { getUserByUsername } from "@/data/user";

export default async function UserDetailsPage({
    params,
}: {
    params: { username: string };
}) {
    const channel = await getUserByUsername(params.username);
    if (!channel) {
        return notFound();
    }

    return (
        <PostListWithSuspense fetcher={() => getUserPosts(params.username)} />
    );
}
