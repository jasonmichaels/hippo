import { set, orderBy, flatten, values, trim } from 'lodash';

import { IPostsHash, TPostsArray, IPost } from '../types/post';

class PostUtils {
  static get intlOptions(): Intl.DateTimeFormatOptions {
    return {
      dateStyle: 'short',
      timeStyle: 'short',
    };
  }

  static keyByAuthorSort(posts: IPost[]): IPostsHash {
    if (!posts?.length) {
      return {};
    }

    const hash: IPostsHash = {};

    for (const post of posts) {
      if ('string' === typeof post?.author?.id) {
        const postWithMilliseconds = {
          ...post,
          publishedAt: PostUtils.utcToLocalDateTime(post.publishedAt),
        };

        if (!hash?.[post.author.id]) {
          hash[post.author.id] = [postWithMilliseconds];
        } else {
          hash[post.author.id] = orderBy(
            [...hash[post.author.id], postWithMilliseconds],
            'publishedAt',
            'desc'
          );
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

  static getPostsByAuthor(posts: IPostsHash, authorId: string) {
    for (const key in posts) {
      if (key === authorId) {
        return posts[key];
      }
    }

    return [];
  }

  static getAuthorsForDropdown(
    posts: IPostsHash
  ): { value: string; label: string }[] {
    return PostUtils.getLatestForAuthors(posts).map((p) => ({
      value: p.author.id,
      label: p.author.name,
    }));
  }

  static getPostsFromHash(posts: IPostsHash): IPost[] {
    return flatten(values(posts));
  }

  static utcToLocalDateTime(datetime: string): string {
    const localDatetime = new Intl.DateTimeFormat(
      navigator?.language ?? 'en-US',
      PostUtils.intlOptions
    ).format(new Date(datetime));
    return localDatetime.replace(', ', ' - ');
  }

  static simplifyBodyText(bodyText: string): string {
    return trim(bodyText.replace(/[^a-zA-Z ]/g, ''));
  }
}

export default PostUtils;
