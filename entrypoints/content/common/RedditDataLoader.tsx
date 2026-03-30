import { Spinner } from '@/components/ui/spinner.tsx';
import PostsModal from '@/entrypoints/content/posts/PostsModal.tsx';
import CommentsModal from '@/entrypoints/content/comments/CommentsModal.tsx';
import StatusMessage from '@/entrypoints/content/common/StatusMessage.tsx';
import { useRedditData } from '@/entrypoints/hooks/useRedditData.tsx';

export default function RedditDataLoader({
  type,
  onRemove,
}: Readonly<{
  type: 'posts' | 'comments';
  onRemove: () => void;
}>) {
  const { data, loading } = useRedditData(type);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-secondary rounded-lg">
        <Spinner className="h-6 w-6 text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <StatusMessage message="Failed to fetch Reddit data" variant="error" />
    );
  }

  if (data.message) {
    return <StatusMessage message={data.message} />;
  }

  return type === 'posts' ? (
    <PostsModal posts={data.posts} onRemove={onRemove} />
  ) : (
    <CommentsModal
      post={data.posts[0]}
      comments={data.comments}
      onRemove={onRemove}
    />
  );
}
