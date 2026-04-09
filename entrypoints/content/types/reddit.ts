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
