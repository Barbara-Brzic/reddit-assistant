import { useEffect, useState } from 'react';
import {
  fetchPostComments,
  fetchSubredditPosts,
  getCurrentPostId,
  getCurrentSubreddit,
} from '@/entrypoints/content/scripts/reddit-api.ts';
import { IComment, IPost } from '@/entrypoints/content/scripts/utils.ts';
import useQueryLimit from '@/entrypoints/hooks/useQueryLimit.tsx';

interface RedditData {
  posts: IPost[];
  comments: IComment[];
  message?: string;
}

export const useRedditData = (type: 'posts' | 'comments') => {
  const [data, setData] = useState<RedditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const { limit } = useQueryLimit(type);

  useEffect(() => {
    async function loadRedditData() {
      if (data) {
        setIsRefetching(true);
      } else {
        setLoading(true);
      }

      try {
        if (type === 'posts') {
          await loadPosts(limit);
        } else {
          await loadComments(limit);
        }
      } catch (error) {
        console.error('Error loading Reddit data:', error);

        setData(null);
      } finally {
        setLoading(false);
        setIsRefetching(false);
      }
    }

    async function loadPosts(limit: number) {
      const subreddit = getCurrentSubreddit();
      const postId = getCurrentPostId();

      if (subreddit && postId) {
        const result = await fetchPostComments(subreddit, postId, 1);
        if (result) {
          setData({ posts: [result.post], comments: [] });
        } else {
          setData(null);
        }
        return;
      }

      const targetSubreddit = subreddit || 'popular';
      const posts = await fetchSubredditPosts(targetSubreddit, limit);
      setData({ posts, comments: [] });
    }

    async function loadComments(limit: number) {
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

      const result = await fetchPostComments(subreddit, postId, limit);
      if (result) {
        setData({ posts: [result.post], comments: result.comments });
      } else {
        setData(null);
      }
    }

    loadRedditData();
  }, [type, limit]);

  return { data, loading, isRefetching };
};
