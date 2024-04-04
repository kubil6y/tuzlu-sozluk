import { getPostsSummary } from "@/data/posts";
import { _cache } from "@/lib/cache";
import { SideNavPostList } from "./side-nav-post-list";

export async function SideNav() {
    const { totalPages, postSummary } = await getPostsSummary();
    return (
        <div className="hidden md:block p-2 overflow-y-auto">
            <SideNavPostList serverPosts={postSummary} serverTotalPages={totalPages} />
        </div>
    );
}
