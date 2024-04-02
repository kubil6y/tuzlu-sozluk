import { Vote, Comment } from "@prisma/client";
import { PostCard } from "./post-card";

type PostListProps = {
    fetcher: () => Promise<
        {
            id: string;
            title: string;
            body: string;
            slug: string;
            votes: Vote[];
            comments: Comment[];
        }[]
    >;
};

export async function PostList({ fetcher }: PostListProps) {
    const posts = await fetcher();
    return (
        <div className="divide-y-1 overflow-y-auto">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    postId={post.id}
                    title={post.title}
                    slug={post.slug}
                    body={post.body}
                    votes={post.votes}
                    comments={post.comments}
                />
            ))}
        </div>
    );
}
