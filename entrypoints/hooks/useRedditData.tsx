import { useEffect, useState } from 'react';
import {
  fetchPostComments,
  fetchSubredditPosts,
  getCurrentPostId,
  getCurrentSubreddit,
} from '@/entrypoints/content/scripts/reddit-api.ts';
import { IComment, IPost } from '@/entrypoints/content/scripts/utils.ts';

interface RedditData {
  posts: IPost[];
  comments: IComment[];
  message?: string;
}

export const useRedditData = (type: 'posts' | 'comments') => {
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

  return { data, loading };
};
