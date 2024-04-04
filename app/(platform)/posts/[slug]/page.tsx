import { getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";
import { PostCard } from "../../_components/post-card";
import { CommentForm } from "../../_components/comment-form";
import { CommentCard } from "../../_components/comment-card";
import { auth } from "@/auth";
import Link from "next/link";

export default async function PostDetailsPage({
    params,
}: {
    params: { slug: string };
}) {
    const session = await auth();
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
                {session?.user ? (
                    <CommentForm postId={post.id} slug={post.slug} />
                ) : (
                    <div className="px-4 mt-2 text-sm text-primary hover:underline">
                        <Link href="/login">Login to comment</Link>
                    </div>
                )}
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
