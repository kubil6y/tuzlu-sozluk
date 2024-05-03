import { getPostsSummary } from "@/data/posts";
import { SideNavItem } from "./side-nav-item";

export async function SideNav() {
    const posts = await getPostsSummary();
    return (
        <div className="hidden min-h-[calc(100vh-120px)] flex-col border-r md:flex md:pt-2">
            <h2 className="ml-4 mt-2 text-start text-lg font-semibold">
                #Popular
            </h2>
            <div className="overflow-y-auto">
                {posts.map((post) => (
                    <SideNavItem
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
