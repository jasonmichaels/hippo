import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { margin, padding } from '../styles/layout';
import { sizes } from '../styles/sizes';

import { IPost } from '../types/post';
import PostUtils from '../utils/PostUtils';

interface IProps {
  item: IPost;
  handlePress: (authorId: string, postId: string) => () => void;
}

const PostListItem = ({ item, handlePress }: IProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress(item.author.id, item.id)}
    >
      <Text style={styles.headerText}>{item.title}</Text>
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheaderText}>By&nbsp;{item.author.name}</Text>
        <Text style={styles.subheaderText}>{item.publishedAt}</Text>
      </View>
      <Text style={styles.bodyText} numberOfLines={3}>
        {PostUtils.simplifyBodyText(item.body)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offWhite,
    padding: padding.lg,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
  },
  headerText: {
    fontSize: sizes.md,
    fontWeight: 'bold',
    color: colors.gray,
    marginBottom: margin.sm,
  },
  subheaderText: {
    fontSize: sizes.sm,
    fontStyle: 'italic',
    color: colors.lightGray,
  },
  subheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: margin.sm,
  },
  bodyText: {
    color: colors.black,
  },
});

export default PostListItem;
