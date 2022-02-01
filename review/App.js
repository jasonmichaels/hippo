import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Robots from './Robots';
import Preview from './Preview';
import { NAVIGATION, PRESENTATION } from './constants';

const Stack = createStackNavigator();

/**
 * @component
 * @description Responsible for rendering of screens
 * @returns JSX.Element
 */
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NAVIGATION.ROBOTS} screenOptions={{ title: null }}>
        <Stack.Screen name={NAVIGATION.ROBOTS} component={Robots} options={{ headerShown: false }} />
        <Stack.Screen
          name={NAVIGATION.PREVIEW}
          component={Preview}
          options={{ presentation: PRESENTATION.MODAL, headerBackTitleVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
