import { db } from "@/lib/db";
import { NewPostForm } from "../../_components/new-post-form";
import { _cache } from "@/lib/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

function getChannels() {
    return db.channel.findMany();
}

export default async function NewPostPage() {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    const channels = await getChannels();
    return <NewPostForm channels={channels} />;
}
