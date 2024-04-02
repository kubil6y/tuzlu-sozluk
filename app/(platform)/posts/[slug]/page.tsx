import { getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";

export default async function PostDetailsPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPostBySlug(params.slug);
    if (!post) {
        return notFound();
    }
    return (
        <div>
            <p>PostDetailsPage id: {params.slug}</p>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}
