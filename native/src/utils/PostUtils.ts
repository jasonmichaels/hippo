import { orderBy, last, flatten, values, trim } from 'lodash';
import momentTimezone from 'moment-timezone';

import { TOptions } from '../types/extra';
import { IPostsHash, TPostsArray, IPost } from '../types/post';
import colors from '../styles/colors';
import { DATETIME_FORMAT } from '../constants';

/**
 * @class
 * @description Various helper methods used for ordering,
 * parsing, and formatting posts, post items, and various
 * properties.
 */
class PostUtils {
  /**
   * @static
   * @description Constructs an objects, keyed by `uathor.id`,
   * where each value is an array of that author's date-sorted
   * posts. Used in `useAxios` on a successful request.
   */
  static keyByAuthorSort(posts: IPost[]): IPostsHash {
    if (!posts?.length) {
      return {};
    }

    const hash: IPostsHash = {};

    for (const post of posts) {
      if ('string' === typeof post?.author?.id) {
        const postWithMilliseconds = {
          ...post,
          /**
           * Here, make sure we convert the offset string
           * to a common format for more reliable sorting.
           */
          publishedAt: PostUtils.utcToLocalDateTime(post.publishedAt),
          lastName: last(post.author.name.split(' ')),
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

  /**
   * @static
   * @description Simply returns the most recent (top-most)
   * post for every author. Orders the array by last name
   * (ascending). Because why not.
   */
  static getLatestForAuthors(posts: IPostsHash): TPostsArray {
    const latest = [];

    for (const key in posts) {
      if (posts?.[key]?.length) {
        latest.push(posts[key][0]);
      }
    }

    return orderBy(latest, 'lastName', 'asc');
  }

  /**
   * @static
   * @description Gets the array of posts for the given `authorId`
   * from state.
   */
  static getPostsByAuthor(posts: IPostsHash, authorId: string) {
    for (const key in posts) {
      if (key === authorId) {
        return posts[key];
      }
    }

    return [];
  }

  /**
   * @static
   * @description Constructs `Select`-compliant array
   * of options objects.
   */
  static getAuthorsForDropdown(posts: IPostsHash): TOptions {
    return PostUtils.getLatestForAuthors(posts || {}).map((p) => ({
      value: p.author.id,
      label: p.author.name,
      color: colors.gray,
    }));
  }

  /**
   * @static
   * @description Gets a flattened array of all authors'
   * posts, for use in the `Posts` component, prior to
   * any sorting occurring.
   */
  static getPostsFromHash(posts: IPostsHash): IPost[] {
    return flatten(values(posts));
  }

  /**
   * @static
   * @description Converts timezone-offset string
   * to a formatted one. Used in the `PostListItem` component.
   */
  static utcToLocalDateTime(datetime: string): string {
    const timezone = momentTimezone.tz.guess();
    return momentTimezone.utc(datetime).tz(timezone).format(DATETIME_FORMAT);
  }

  /**
   * @static
   * @description Simple helper that (probably) removes
   * most non-space special characters from `post.body`.
   */
  static simplifyBodyText(bodyText: string): string {
    return trim(bodyText.replace(/[^a-zA-Z ]/g, ''));
  }
}

export default PostUtils;
