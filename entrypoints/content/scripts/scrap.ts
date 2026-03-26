export interface IPost {
  id: number;
  title: string;
  link: string;
  comments: string | null;
  tag: string | null;
  description: string | null;
  score: string | null;
}

export interface IComment {
  id: string;
  author: string;
  comment: string;
  permalink: string;
  score: string;
}

export function extractRedditPostsFromDOM(): IPost[] {
  const postElements = document.querySelectorAll('shreddit-post');
  const postData: IPost[] = [];

  postElements.forEach((postElement, key) => {
    const title = postElement.getAttribute('post-title')?.trim() || '';
    const permalink = postElement.getAttribute('permalink');
    const fullLink = permalink ? `https://reddit.com${permalink}` : null;
    const commentCout = postElement.getAttribute('comment-count');
    const tagElement = postElement.querySelector(
      '[slot="post-flair"] .flair-content'
    );

    const tag = tagElement?.textContent?.trim() || null;
    const descriptionElement = postElement.querySelector(
      '[slot="text-body"] div[property="schema:articleBody"]'
    );

    const description = descriptionElement?.textContent?.trim() || null;
    const score = postElement.getAttribute('score') || null;

    if (title && fullLink) {
      postData.push({
        id: key,
        title,
        link: fullLink,
        comments: commentCout,
        tag,
        description,
        score,
      });
    }
  });

  return postData;
}

export function extractRedditCommentsFromDOM(): IComment[] {
  const commentElements = document.querySelectorAll('shreddit-comment');
  const commentData: IComment[] = [];

  commentElements.forEach((commentElement, key) => {
    const author = commentElement.getAttribute('author') || '';
    const permalink = commentElement.getAttribute('permalink') || '';
    const thingId = commentElement.getAttribute('thingid') || '';
    const commentContentDiv = document.getElementById(
      `${thingId}-post-rtjson-content`
    );
    const score = commentElement.getAttribute('score') || '';

    if (commentContentDiv) {
      const commentContent = commentContentDiv.innerText || '';
      commentData.push({
        id: thingId || key.toString(),
        author,
        comment: commentContent,
        permalink,
        score,
      });
    }
  });

  return commentData;
}

export function extractJsonListFromMarkdown(markdownText: string): IPost[] {
  const jsonRegex = /```(?:json|javascript)?\n([\s\S]*?)\n```|`({[\s\S]*?})`/g;
  const jsonList = [];
  let match;

  while ((match = jsonRegex.exec(markdownText)) !== null) {
    const jsonString = match[1] || match[2];
    try {
      if (jsonString) {
        const parsedJson = JSON.parse(jsonString);
        if (Array.isArray(parsedJson)) {
          jsonList.push(...parsedJson);
        }
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  return jsonList || [];
}
