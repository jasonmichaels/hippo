import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import HeaderTitle from '../components/HeaderTitle';
import { omit } from 'lodash';

import PostsContext from '../PostsContext';
import { padding } from '../styles/layout';
import { IPost } from '../types/post';

interface IProps {
  route: {
    params: {
      authorId: string;
      postId: string;
    };
  };
  navigation: {
    setOptions: (options: { headerTitle: () => JSX.Element }) => void;
  };
}

const Post = ({ navigation, route }: IProps): JSX.Element => {
  const { posts } = React.useContext(PostsContext);

  const post: IPost | undefined = React.useMemo(() => {
    return posts[route.params.authorId].find(
      (p) => p.id === route.params.postId
    );
  }, [route?.params?.authorId, route?.params?.postId, posts]);

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
        <Markdown style={omit(styles, 'container')}>{post?.body ?? ''}</Markdown>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    padding: padding.md,
    paddingBottom: padding.md,
  },
  code_inline: {
    fontFamily: undefined,
  },
  code_block: {
    fontFamily: undefined,
  },
  fence: {
    fontFamily: undefined,
  },
});

export default Post;
