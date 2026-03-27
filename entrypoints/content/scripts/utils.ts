export interface IPost {
  id: string;
  title: string;
  link: string;
  comments: number;
  tag: string | null;
  description: string | null;
  score: number;
}

export interface IComment {
  id: string;
  author: string;
  comment: string;
  permalink: string;
  score: number;
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
