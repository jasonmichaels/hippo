import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NAVIGATION } from '../constants';
import Posts from '../screens/Posts';
import Post from '../screens/Post';
import DominantHeader from '../components/DominantHeader';
import theme from '../styles/theme';
import PostsContext from '../PostsContext';
import { mockPostA, mockPostB } from '../dummyData';
import PostUtils from '../utils/PostUtils';

const Stack = createNativeStackNavigator();

const props = {
  navigation: {
    navigate: jest.fn(),
    setParams: jest.fn(),
  },
  route: {
    params: {
      authorId: '',
    },
  },
};

describe('Posts', () => {
  const Tree = (
    /* @ts-expect-error: Will fix typings later */
    <PostsContext.Provider
      value={{
        posts: { [mockPostA.id]: mockPostA, [mockPostB.id]: mockPostB },
        error: null,
        isLoading: false,
      }}
    >
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={NAVIGATION.POSTS}
          screenOptions={{ headerTitleAlign: 'center' }}
        >
          <Stack.Screen
            name={NAVIGATION.POSTS}
            component={() => <Posts {...props} />}
            options={{ headerTitle: () => <DominantHeader /> }}
          />
          <Stack.Screen
            name={NAVIGATION.POST}
            component={Post}
            options={{ headerBackTitle: 'Posts', headerTitle: '' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PostsContext.Provider>
  );
  test('renders a list of posts', async () => {
    const { getAllByTestId } = render(Tree);
    const posts = getAllByTestId('PostListItem');
    expect(posts.length).toBe(2);
  });

  test('PostListItem displays title, author, publishedAt, and summary', async () => {
    const { getByTestId } = render(Tree);

    expect(getByTestId(mockPostA.title)).toBeDefined();
    expect(getByTestId(mockPostA.author.name)).toBeDefined();
    expect(getByTestId(mockPostA.publishedAt)).toBeDefined();

    const summary = getByTestId(mockPostA.id);
    expect(summary.props.children).toEqual(
      PostUtils.simplifyBodyText(mockPostA.body)
    );
  });

  test('PostListItem taps cue navigation to the Post screen', async () => {
    const { getAllByTestId } = render(Tree);
    const post = getAllByTestId('PostListItem')[0];
    expect(post).not.toBeNull();
    fireEvent(post, 'onPress');

    const spy = jest.spyOn(props.navigation, 'navigate');
    expect(spy).toHaveBeenCalledWith(NAVIGATION.POST, {
      postId: mockPostA.id,
      authorId: mockPostA.author.id,
    });
  });

  /**
   * @TODOs
   * - test that posts are displayed in reverse-chronological order
   * - test that fireEvent on `ListHeaderComponent`'s instance of `Select`
   *   results in params changes and the number of displayed posts
   */
});
