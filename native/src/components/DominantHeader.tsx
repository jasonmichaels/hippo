import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';

const DominantHeader = (): JSX.Element => (
  <View style={styles.container}>
    <Feather name="book-open" size={32} color={colors.lightGray} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DominantHeader;
