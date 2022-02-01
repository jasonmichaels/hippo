import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import PostsContext from '../PostsContext';
import PostUtils from '../utils/PostUtils';
import PostListItem from '../components/PostListItem';
import { NAVIGATION } from '../constants';
import { TNavigate } from '../types/extra';
import ListHeaderComponent from '../components/ListHeaderComponent';
import { margin, padding } from '../styles/layout';

interface IProps {
  route: {
    params: {
      authorId: string;
    };
  };
  navigation: {
    setParams: (params: { authorId: string }) => void;
    navigate: TNavigate;
  };
}

/**
 * @description Renders the posts list, handles various
 * business logic (parsing posts by author, etc.)
 */
const Posts = ({ route, navigation }: IProps) => {
  const { posts } = React.useContext(PostsContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    /**
     * @description When focus is lost, make sure to reset
     * the current author filter. May be removed if keeping the
     * filter when navigating back here is preferred.
     */
    if (!isFocused) {
      navigation.setParams({ authorId: '' });
    }
  }, [isFocused]);

  /**
   * @description Used solely to reduce code duplication, since
   * `authorId` is used in quite a few places.
   */
  const authorId = React.useMemo(() => {
    return route.params?.authorId ?? '';
  }, [route.params?.authorId]);

  /**
   * @description Memoize these since they shouldn't change
   * unless authorId` also changes.
   */
  const displayablePosts = React.useMemo(() => {
    /**
     * If we have an `authorId`, filter the list of posts.
     */
    if (authorId) {
      return PostUtils.getPostsByAuthor(posts, authorId);
    }
    /**
     * Otherwise, show all the posts.
     */
    return PostUtils.getPostsFromHash(posts);
  }, [posts, authorId]);

  /**
   * @description Callback for the `PostListItem` component.
   * Fires off a navigation change to the `post` screen
   * for the selected author's post.
   */
  const handleItemPress = React.useCallback(
    (aId: string, postId: string) => () => {
      navigation.navigate(NAVIGATION.POST, { authorId: aId, postId });
    },
    [navigation, posts]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={displayablePosts}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <PostListItem {...item} handlePress={handleItemPress} />
        )}
        ListHeaderComponent={() => (
          <ListHeaderComponent authorId={authorId} navigation={navigation} />
        )}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listHeaderComponentStyle: {
    paddingTop: padding.md,
    paddingBottom: padding.xs,
    marginHorizontal: margin.md,
    marginBottom: 0,
  },
});

export default Posts;
