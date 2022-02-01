export interface IPost {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  author: {
    id: string;
    name: string;
  }
}

export type TPostsArray = IPost[] ;

export interface IPostsHash {
  [k: string]: TPostsArray;
}