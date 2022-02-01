import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { METHODS, URLS } from './constants';
import useAxios from './hooks/useAxios';

export function App() {
  const { result, error, isLoading } = useAxios({ method: METHODS.GET, url: URLS.POSTS });
  console.log(result);
  console.log(error);
  console.log(isLoading);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
