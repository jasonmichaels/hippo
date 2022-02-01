import React from 'react';
import { FlatList } from 'react-native';

import PostsContext from '../PostsContext';
import PostUtils from '../utils/PostUtils';

const Posts = () => {
  const { posts } = React.useContext(PostsContext);

  const renderItem = React.useCallback((item) => null, []);

  const uniqueAuthors = React.useMemo(() => {
    return PostUtils.getLatestForAuthors(posts);
  }, [posts]);
  console.log(uniqueAuthors)
  return (
    <FlatList
      data={uniqueAuthors}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  )
}

export default Posts;