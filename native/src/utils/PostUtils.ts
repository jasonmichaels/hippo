import { orderBy, get } from 'lodash';
import { IPostsHash, TPostsArray, IPost } from '../types/post';

class PostUtils {
  static keyByAuthorSort(posts: IPost[]): IPostsHash  {
    if (!posts?.length) {
      return {};
    }

    const hash: IPostsHash = {};

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

  static getLatestForAuthors(posts: IPostsHash): TPostsArray {
    const latest = [];

    for (const key in posts) {
      latest.push(posts[key][0]);
    }

    return latest;
  }
}

export default PostUtils;
