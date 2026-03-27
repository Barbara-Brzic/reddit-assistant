import {
  fetchPostComments,
  fetchSubredditPosts,
  getCurrentPostId,
  getCurrentSubreddit,
} from '@/entrypoints/content/scripts/reddit-api.ts';
import React from 'react';
import { Spinner } from '@/components/ui/spinner.tsx';
import PostsModal from '@/entrypoints/content/posts/PostsModal.tsx';
import CommentsModal from '@/entrypoints/content/comments/CommentsModal.tsx';
import { IComment, IPost } from '@/entrypoints/content/scripts/scrap.ts';

export default function RedditDataLoader({
  type,
  onRemove,
}: Readonly<{
  type: 'posts' | 'comments';
  onRemove: () => void;
}>) {
  const [data, setData] = useState<{
    posts: IPost[];
    comments: IComment[];
    message?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const subreddit = getCurrentSubreddit();

      if (type === 'posts') {
        // Use 'popular' as default if not on a specific subreddit
        const targetSubreddit = subreddit || 'popular';
        const posts = await fetchSubredditPosts(targetSubreddit, 50);
        setData({ posts, comments: [] });
      } else if (type === 'comments') {
        const postId = getCurrentPostId();
        if (!subreddit || !postId) {
          setData({
            posts: [],
            comments: [],
            message: 'Please navigate to a Reddit post to view comments',
          });
          setLoading(false);
          return;
        }
        if (postId) {
          const result = await fetchPostComments(subreddit, postId);
          if (result) {
            setData({ posts: [result.post], comments: result.comments });
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [type]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-secondary rounded-lg">
        <Spinner className="h-6 w-6 text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8 bg-secondary rounded-lg">
        <p className="text-destructive">Failed to fetch Reddit data</p>
      </div>
    );
  }

  if (data.message) {
    return (
      <div className="flex items-center justify-center p-8 bg-secondary rounded-lg">
        <p className="text-primary">{data.message}</p>
      </div>
    );
  }

  if (type === 'posts') {
    return <PostsModal posts={data.posts} onRemove={onRemove} />;
  }

  if (type === 'comments') {
    return (
      <CommentsModal
        post={data.posts[0]}
        comments={data.comments}
        onRemove={onRemove}
      />
    );
  }

  return null;
}
