import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { sizes } from '../styles/sizes';

/**
 * @component
 * @description Down arrow used int he `Select` component.
 */
const ChevronDownIcon = (): JSX.Element => {
  return (
    <Svg viewBox="0 0 15 15" fill="#ccc" width={sizes.md} height={sizes.md}>
      <Path d="M1.707.293A1 1 0 00.293 1.707L5 6.414l4.707-4.707A1 1 0 008.293.293L5 3.586 1.707.293z" />
    </Svg>
  );
};

export default ChevronDownIcon;
