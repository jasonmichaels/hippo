import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import { sizes } from '../styles/sizes';

/**
 * @component
 * @description Used solely for the posts screen's header title.
 */
const DominantHeader = (): JSX.Element => (
  <View style={styles.container}>
    <Feather name="book-open" size={Platform.OS === 'android' ? sizes.xl : sizes.lg} color={colors.lightGray} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DominantHeader;
