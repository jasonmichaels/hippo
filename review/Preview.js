import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useRoute } from '@react-navigation/native';

/**
 * @component
 * @description Screen that displays the tapped robot's associated image.
 * @param {Object} props
 * @param {Object} props.navigation
 * @param {Function} props.navigation.goBack
 * @param {Function} props.navigation.setOptions
 * @returns 
 */
const Preview = ({ navigation }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const { params } = useRoute();

  /**
   * @description On mount, sets the header's title to the robot's name
   */
  React.useEffect(() => navigation.setOptions({ title: params.name }), []);

  /**
   * @description Callback fired once the current robot's image has 
   * loaded. Cues up fade-in animation (animates the Animated.Image's opacity)
   */
  const handleLoad = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  /**
   * @description Callback fired if there's an error loading an image.
   * If called, navigates to the previous screen in the stack.
   */
  const handleClose = React.useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: params.img }}
        style={[styles.image, { opacity }]}
        onLoadEnd={handleLoad}
        onError={handleClose}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  name: {
    fontSize: 36,
    paddingBottom: 5
  },
  image: {
    height: 480,
    width: '100%',
    opacity: 0
  },
  spinner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default Preview;
