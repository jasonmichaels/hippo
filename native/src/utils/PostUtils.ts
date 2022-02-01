import { orderBy, get } from 'lodash';
import { IPost } from '../hooks/useAxios';

interface IHash {
  [k: string]: IPost[];
}

class PostUtils {
  static keyByAuthorSort(posts: IPost[]): IHash | [] {
    if (!posts?.length) {
      return [];
    }

    const hash: IHash = {};

    for (const post of posts) {
      if ('string' === typeof post?.author?.id) {
        if (!hash?.[post.author.id]) {
          hash[post.author.id] = [post];
        } else {
          hash[post.author.id] = orderBy([...hash[post.author.id], post], 'publishedAt', 'asc')
        }
      }
    }

    return hash;
  }

  static getLatestForAuthors(posts: IHash): IPost[] {
    const latest = [];

    for (const key in posts) {
      latest.push(posts[key][0]);
    }

    return latest;
  }
}

export default PostUtils;
