import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';

/**
 * @component
 * @description A robot item, rendered by `Robots`.
 * @param {Object} props
 * @param {Function} props.handlePress Callback passed from `Robots` that
 * navigates to the `Preview` modal.
 * @param {String} props.name The robot's name
 * @param {Number} props.year The year the robot first appeared in popular media
 * @returns JSX.Element
 */
const RobotItem = ({ handlePress, ...rest }) => (
  <View style={styles.container}>
    <Pressable onPress={handlePress(rest)}>
      <Text style={styles.name}>{rest.name}</Text>
      <Text>{rest.year}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  name: {
    fontSize: 18,
    paddingBottom: 5
  }
})

export default RobotItem;
