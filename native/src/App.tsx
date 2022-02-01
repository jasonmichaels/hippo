import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { METHODS, NAVIGATION, URLS } from './constants';
import useAxios from './hooks/useAxios';
import PostsContext from './PostsContext';
import Posts from './screens/Posts';
import Post from './screens/Post';
import DominantHeader from './components/DominantHeader';
import theme from './styles/theme';

const Stack = createNativeStackNavigator();

/**
 * @component
 * @description Fetches data, which is provided via context value.
 * Renders the navigation stack's `Posts` and `Post` screens.
 */
export function App() {
  const {
    result: posts,
    error,
    isLoading,
  } = useAxios({ method: METHODS.GET, url: URLS.POSTS });

  return (
    <PostsContext.Provider value={{ posts, error, isLoading }}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={NAVIGATION.POSTS}
          screenOptions={{ headerTitleAlign: 'center' }}
        >
          <Stack.Screen
            name={NAVIGATION.POSTS}
            component={Posts}
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
}
