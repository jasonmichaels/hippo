import React from 'react';
import { useRoute } from '@react-navigation/native';

import Select from './Select';
import PostsContext from '../PostsContext';
import PostUtils from '../utils/PostUtils';

type TProps = {
  authorId: string;
  navigation: {
    setParams: (params: { authorId: string }) => void;
  };
};

const ListHeaderComponent = ({ authorId, navigation }: TProps): JSX.Element => {
  const { posts } = React.useContext(PostsContext);

  /**
   * @description Unique author `Select` options.
   * @TODO Maybe alphabetize 'em?
   */
  const selectOptions = React.useMemo(() => {
    return PostUtils.getAuthorsForDropdown(posts);
  }, [posts]);

  /**
   * @description When the `Select` fires,
   * make sure to update `route.params` with the
   * chosen `authorId`. Cues off processing of
   * `selectOptions`, `displayablePosts`, etc.
   */
  const handleDropdownPress = React.useCallback(
    (id: string) => () => {
      navigation.setParams({ authorId: id });
    },
    [navigation]
  );

  return (
    <Select
      options={selectOptions}
      value={authorId}
      handlePress={handleDropdownPress}
      placeholder={authorId ? 'Clear Selected Author' : 'Select an Author'}
    />
  );
};

export default ListHeaderComponent;
