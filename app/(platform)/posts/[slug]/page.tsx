import { getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";
import { PostCard } from "../../_components/post-card";
import { CommentForm } from "../../_components/comment-form";
import { CommentCard } from "../../_components/comment-card";

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
            <PostCard
                postId={post.id}
                authorName={post.user.username ?? ""}
                createdAt={post.createdAt}
                title={post.title}
                slug={post.slug}
                body={post.body}
                votes={post.votes}
                comments={post.comments}
            />
            <div className="space-y-4">
                <CommentForm postId={post.id} slug={post.slug} />
                {post.comments.map((comment) => (
                    <CommentCard
                        authorName={comment.user.username ?? ""}
                        createdAt={comment.createdAt}
                        body={comment.body}
                    />
                ))}
            </div>
        </div>
    );
}
