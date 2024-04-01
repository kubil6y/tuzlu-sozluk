import { _cache } from "@/lib/cache";
import { db } from "@/lib/db";

const getPostsSummary = _cache(() => {
    console.log("getPostsSummary()");
    return db.post.findMany({
        select: {
            id: true,
            slug: true,
            title: true,
            comments: {
                select: { id: true },
            },
        },
    });
}, ["/", "getPostsSummary"]);

export async function SideNav() {
    const posts = await getPostsSummary();

    return (
        <div className="hidden md:block md:w-[] p-4 bg-gray-200">
            <h1>side nav</h1>

            {posts.map((post) => (
                <div key={post.id}>
                    {post.title} {post.comments.length}
                </div>
            ))}
        </div>
    );
}
