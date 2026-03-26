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
