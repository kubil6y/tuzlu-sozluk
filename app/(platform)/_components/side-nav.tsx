import { getPostsSummary } from "@/data/posts";
import { SideNavItem } from "./side-nav-item";

export async function SideNav() {
    const posts = await getPostsSummary();
    return (
        <div className="hidden md:flex flex-col border-r">
            <h2 className="font-semibold text-lg text-start mt-2">
                #Popular
            </h2>
            <div className=" overflow-y-auto">
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
