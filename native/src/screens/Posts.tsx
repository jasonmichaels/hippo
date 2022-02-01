import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import PostsContext from '../PostsContext';
import PostUtils from '../utils/PostUtils';
import PostListItem from '../components/PostListItem';
import Select from '../components/Select';
import { NAVIGATION } from '../constants';

interface IProps {
  route: {
    params: {
      authorId: string;
    };
  };
  navigation: {
    setParams: (params: { authorId: string }) => void;
    navigate: (route: string, params?: any) => void;
  };
}

const Posts = ({ route, navigation }: IProps) => {
  const { posts } = React.useContext(PostsContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      navigation.setParams({ authorId: '' });
    }
  }, [isFocused]);

  const authorId = React.useMemo(() => {
    return route.params?.authorId;
  }, [route.params?.authorId]);

  const displayablePosts = React.useMemo(() => {
    if (authorId) {
      return PostUtils.getPostsByAuthor(posts, authorId);
    }
    return PostUtils.getPostsFromHash(posts);
  }, [posts, authorId]);

  const dropdownOptions = React.useMemo(() => {
    return PostUtils.getAuthorsForDropdown(posts);
  }, [posts]);

  const handleDropdownPress = React.useCallback(
    (id: string) => () => {
      navigation.setParams({ authorId: id });
    },
    [navigation]
  );

  const handleItemPress = React.useCallback(
    (aId: string, postId: string) => () => {
      navigation.navigate(NAVIGATION.POST, { authorId: aId, postId });
    },
    [navigation, posts]
  );

  const ListHeaderComponent = React.useMemo(() => {
    return (
      <Select
        options={dropdownOptions}
        value={authorId}
        handlePress={handleDropdownPress}
        placeholder={authorId ? 'Clear Selected Author' : 'Select an Author'}
      />
    );
  }, [authorId, dropdownOptions, handleDropdownPress]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={displayablePosts}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <PostListItem {...item} handlePress={handleItemPress} />
        )}
        ListHeaderComponent={ListHeaderComponent}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listHeaderButton: {
    alignSelf: 'flex-end',
  },
  listHeaderComponentStyle: {
    paddingVertical: 15,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listHeaderText: {
    color: '#eee',
    fontSize: 18,
  },
});

export default Posts;
