import { Dimensions } from 'react-native';

const padding = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
  xxl: 30,
};

const margin = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
  xxl: 30,
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export { padding, margin, windowWidth, windowHeight };
