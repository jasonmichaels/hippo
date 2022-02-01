import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { METHODS, NAVIGATION, URLS } from './constants';
import useAxios from './hooks/useAxios';
import PostsContext from './PostsContext';
import Posts from './screens/Posts';
import Post from './screens/Post';
import DominantHeader from './components/DominantHeader';

const Stack = createNativeStackNavigator();

export function App() {
  const {
    result: posts,
    error,
    isLoading,
  } = useAxios({ method: METHODS.GET, url: URLS.POSTS });

  return (
    <PostsContext.Provider value={{ posts, error, isLoading }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={NAVIGATION.POSTS}>
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
