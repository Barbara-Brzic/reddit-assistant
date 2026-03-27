import axios from 'axios';
import { IPost, IComment } from './scrap';

const REDDIT_API_BASE = 'https://www.reddit.com';

interface RedditPostData {
  id: string;
  title: string;
  selftext: string;
  link_flair_text: string | null;
  score: number;
  num_comments: number;
  permalink: string;
  subreddit: string;
}

interface RedditCommentData {
  id: string;
  author: string;
  body: string;
  score: number;
  permalink: string;
}

export async function fetchSubredditPosts(
  subreddit: string,
  limit: number = 25,
  sort: 'hot' | 'new' | 'top' | 'rising' = 'hot'
): Promise<IPost[]> {
  try {
    const url = `${REDDIT_API_BASE}/r/${subreddit}/${sort}.json?limit=${limit}`;
    const response = await axios.get(url);

    const posts = response.data?.data?.children || [];
    return posts.map((child: any) => {
      const post: RedditPostData = child.data;
      return {
        id: post.id,
        title: post.title,
        description: post.selftext || '',
        tag: post.link_flair_text || '',
        score: post.score,
        comments: post.num_comments,
        link: `${REDDIT_API_BASE}${post.permalink}`,
      };
    });
  } catch (error) {
    console.error('Error fetching subreddit posts:', error);
    return [];
  }
}

export async function fetchPostComments(
  subreddit: string,
  postId: string,
  limit?: number
): Promise<{ post: IPost; comments: IComment[] } | null> {
  try {
    const queryString = limit ? `?limit=${limit}` : '';
    const url = `${REDDIT_API_BASE}/r/${subreddit}/comments/${postId}.json${queryString}`;
    const response = await axios.get(url);

    const postData: RedditPostData = response.data[0]?.data?.children[0]?.data;
    const post: IPost = {
      id: postData.id,
      title: postData.title,
      description: postData.selftext || '',
      tag: postData.link_flair_text || '',
      score: postData.score,
      comments: postData.num_comments,
      link: `${REDDIT_API_BASE}${postData.permalink}`,
    };

    const commentsData = response.data[1]?.data?.children || [];
    const comments: IComment[] = extractComments(commentsData);

    return { post, comments };
  } catch (error) {
    console.error('Error fetching post comments:', error);
    return null;
  }
}

function extractComments(commentsData: any[]): IComment[] {
  const comments: IComment[] = [];

  for (const child of commentsData) {
    if (child.kind === 't1') {
      // t1 = comment
      const commentData: RedditCommentData = child.data;

      // Skip deleted/removed comments
      if (
        commentData.author === '[deleted]' ||
        commentData.body === '[deleted]'
      ) {
        continue;
      }

      comments.push({
        id: commentData.id,
        author: commentData.author,
        comment: commentData.body,
        score: commentData.score,
        permalink: `${REDDIT_API_BASE}${commentData.permalink}`,
      });

      // Recursively get replies
      if (child.data.replies?.data?.children) {
        const replies = extractComments(child.data.replies.data.children);
        comments.push(...replies);
      }
    }
  }

  return comments;
}

export function getCurrentSubreddit(): string | null {
  const match = globalThis.location.pathname.match(/^\/r\/([^\/]+)/);
  return match ? match[1] : null;
}

export function getCurrentPostId(): string | null {
  const match = globalThis.location.pathname.match(/\/comments\/([^\/]+)/);
  return match ? match[1] : null;
}
