import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { sizes } from '../styles/sizes';

interface IProps {
  title: string;
  author: string;
}

const HeaderTitle = ({ title, author }: IProps): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.author}>By&nbsp;{author}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: sizes.sm,
  },
  author: {
    fontSize: sizes.xs,
    fontStyle: 'italic',
  },
});

export default HeaderTitle;
