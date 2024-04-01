import { db } from "@/lib/db";

export default async function PostDetailsPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await db.post.findFirst({
        where: {
            slug: params.slug,
        },
    });
    if (!post) {
        return (
            <div>
                <h1>not found</h1>
            </div>
        );
    }
    return (
        <div>
            <p>PostDetailsPage id: {params.slug}</p>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}
