import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getPostsSummary } from "@/data/posts";
import { _cache } from "@/lib/cache";
import Link from "next/link";

export async function SideNav() {
    const posts = await getPostsSummary();
    return (
        <div className="hidden md:block p-2 overflow-y-auto">
            <div className="">
                {posts.map((post) => (
                    <PostItem
                        key={post.id}
                        title={post.title}
                        slug={post.slug}
                        commentAmount={post.comments.length}
                    />
                ))}
            </div>
        </div>
    );
}

type PostItemProps = {
    title: string;
    slug: string;
    commentAmount: number;
};

function PostItem({ title, slug, commentAmount }: PostItemProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={`/posts/${slug}`}
                        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-primary/80 transition hover:text-white"
                    >
                        <p className="w-[90%] truncate">{title}</p>
                        <p className="w-[10%] text-end">{commentAmount}</p>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
