import { db } from "@/lib/db";
import Link from "next/link";

export async function ChannelsNav() {
    const channels = await db.channel.findMany({
        select: { id: true, name: true },
        take: 5,
    });
    if (channels.length === 0) {
        return null;
    }
    return (
        <div className="flex items-center gap-x-4 md:gap-x-8 lg:gap-x-24">
            {channels.map((channel) => (
                <ChannelItem key={channel.id} channelName={channel.name} />
            ))}
        </div>
    );
}

type ChannelItemProps = {
    channelName: string;
};

function ChannelItem({ channelName }: ChannelItemProps) {
    return (
        <Link
            href={`/channel/${channelName}`}
            className="hover:text-fuchsia-600 transition font-semibold text-sm px-6 md:px-12 py-2 border-b-4 border-transparent hover:border-fuchsia-500"
        >
            #{channelName.toLowerCase()}
        </Link>
    );
}
