import {
  fetchPostComments,
  fetchSubredditPosts,
  getCurrentPostId,
  getCurrentSubreddit,
} from '@/entrypoints/content/scripts/reddit-api.ts';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner.tsx';
import PostsModal from '@/entrypoints/content/posts/PostsModal.tsx';
import CommentsModal from '@/entrypoints/content/comments/CommentsModal.tsx';
import { IComment, IPost } from '@/entrypoints/content/scripts/utils.ts';
import StatusMessage from '@/entrypoints/content/common/StatusMessage.tsx';

interface RedditData {
  posts: IPost[];
  comments: IComment[];
  message?: string;
}

export default function RedditDataLoader({
  type,
  onRemove,
}: Readonly<{
  type: 'posts' | 'comments';
  onRemove: () => void;
}>) {
  const [data, setData] = useState<RedditData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRedditData() {
      try {
        if (type === 'posts') {
          await loadPosts();
        } else {
          await loadComments();
        }
      } catch (error) {
        console.error('Error loading Reddit data:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    async function loadPosts() {
      const subreddit = getCurrentSubreddit() || 'popular';
      const posts = await fetchSubredditPosts(subreddit, 50);
      setData({ posts, comments: [] });
    }

    async function loadComments() {
      const subreddit = getCurrentSubreddit();
      const postId = getCurrentPostId();

      if (!subreddit || !postId) {
        setData({
          posts: [],
          comments: [],
          message: 'Please navigate to a Reddit post to view comments',
        });
        return;
      }

      const result = await fetchPostComments(subreddit, postId);
      if (result) {
        setData({ posts: [result.post], comments: result.comments });
      } else {
        setData(null);
      }
    }

    loadRedditData();
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
