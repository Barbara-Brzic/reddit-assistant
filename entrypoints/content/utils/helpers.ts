import type { IPost } from '@/entrypoints/content/types/reddit.ts';

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

export function getCurrentSubreddit(): string | null {
  const match = globalThis.location.pathname.match(/^\/r\/([^\/]+)/);
  return match ? match[1] : null;
}

export function getCurrentPostId(): string | null {
  const match = globalThis.location.pathname.match(/\/comments\/([^\/]+)/);
  return match ? match[1] : null;
}
