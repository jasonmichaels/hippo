import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { omit } from 'lodash';

import HeaderTitle from '../components/HeaderTitle';
import PostsContext from '../PostsContext';
import { margin, padding } from '../styles/layout';
import { IPost } from '../types/post';
import { TPostParams } from '../types/extra';
import colors from '../styles/colors';
import { borderRadius, borderWidth } from '../styles/sizes';

interface IProps {
  route: {
    params: TPostParams;
  };
  navigation: {
    setOptions: (options: { headerTitle: () => JSX.Element }) => void;
  };
}

/**
 * @description Renders the markdown for the selected post.
 * Also dynamically sets the header title.
 */
const Post = ({ navigation, route }: IProps): JSX.Element => {
  const { posts } = React.useContext(PostsContext);

  /**
   * @description Post for the given `params.authorId`
   * and `params.postId`.
   * @TODO Perhaps store posts keyed by `post.id`?
   */
  const post: IPost | undefined = React.useMemo(() => {
    return posts?.[route?.params?.authorId]?.find?.(
      (p) => p.id === route.params.postId
    );
  }, [route?.params?.authorId, route?.params?.postId, posts]);

  /**
   * @description Whenever `post.title` changes,
   * updates the `headerTitle`.
   */
  React.useEffect(() => {
    if (
      'string' === typeof post?.title &&
      'string' === typeof post?.author?.name
    ) {
      navigation.setOptions({
        headerTitle: () => (
          <HeaderTitle title={post.title} author={post.author.name} />
        ),
      });
    }
  }, [post?.title]);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <Markdown style={omit(styles, 'container')}>
          {post?.body ?? ''}
        </Markdown>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    padding: padding.md,
  },
  body: {
    padding: padding.md,
    paddingBottom: padding.lg,
  },
  blockquote: {
    marginLeft: 0,
    paddingLeft: padding.md,
    marginBottom: margin.sm,
    borderColor: colors.lightGray,
    backgroundColor: colors.offWhite,
  },
  bullet_list: {
    marginBottom: margin.md,
  },
  ordered_list: {
    marginBottom: margin.md,
  },
  /**
   * These three override the default
   * styling of `Markdown`. Specifically,
   * `Courier` isn't installed, and I don't like it
   * for this purpose, so defaulting to system fonts.
   */
  code_inline: {
    fontFamily: undefined,
    marginBottom: margin.md,
    borderRadius: borderRadius,
    borderWidth: borderWidth,
  },
  code_block: {
    fontFamily: undefined,
    marginBottom: margin.md,
    borderRadius: borderRadius,
    borderWidth: borderWidth,
  },
  fence: {
    fontFamily: undefined,
  },
});

export default Post;
