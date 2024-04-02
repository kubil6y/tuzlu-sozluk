import { getChannel, getChannelPosts } from "@/data/posts";
import { notFound } from "next/navigation";
import { PostListWithSuspense } from "../../_components/post-list";

export default async function ChannelPage({
    params,
}: {
    params: { channelName: string };
}) {
    const channel = await getChannel(params.channelName);
    if (!channel) {
        return notFound();
    }

    return (
        <PostListWithSuspense
            fetcher={() => getChannelPosts(params.channelName)}
        />
    );
}
