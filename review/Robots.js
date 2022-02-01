import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import data from './data';
import RobotItem from './RobotItem';
import { NAVIGATION } from './constants';

/**
 * @component
 * @description Renders a scrollable view of `RobotItem`s.
 * Handles navigation between the list and preview modal.
 * @returns JSX.Element
 */
const Robots = () => {
  const navigation = useNavigation();

  /**
   * @description Callback fired when a `RobotItem` is pressed.
   * Navigates to the `Preview` modal screen, passing the
   * `RobotItem` object that was tapped.
   * @param {Object} robot
   * @param {String} robot.name
   * @param {Number} robot.year
   * @param {String} robot.img
   */
  const handlePress = React.useCallback((robot) => () => {
    navigation.navigate(NAVIGATION.PREVIEW, { ...robot });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((robot) => <RobotItem key={robot.name} {...robot} handlePress={handlePress} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Robots;