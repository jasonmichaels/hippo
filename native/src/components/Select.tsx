import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native';

import ChevronDownIcon from './ChevronDownIcon';
import colors from '../styles/colors';
import { margin, padding } from '../styles/layout';
import { sizes } from '../styles/sizes';

interface IProps {
  options: { value: string; label: string }[];
  value: string;
  handlePress: (value: string) => () => void;
  placeholder: string;
}

const Select = ({
  options,
  value,
  handlePress,
  placeholder,
}: IProps): JSX.Element => {
  const ref = React.useRef();

  return (
    <RNPickerSelect
      onValueChange={(v) => handlePress(v)()}
      items={options.map((o) => ({ ...o, color: colors.gray }))}
      value={value}
      style={styles}
      Icon={() => <ChevronDownIcon />}
      useNativeAndroidPickerStyle={false}
      placeholder={{ value: '', label: placeholder, color: colors.orange }}
      doneText="Close"
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: margin.md,
    top: margin.lg
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
  inputAndroid: {
    borderColor: colors.lightGray,
    borderRadius: 2,
    borderWidth: 1,
    color: colors.black,
    fontSize: sizes.md,
    height: 48,
    paddingHorizontal: padding.sm,
    paddingRight: padding.xxl,
    paddingVertical: padding.md,
  },
  inputIOS: {
    borderColor: colors.lightGray,
    borderRadius: 2,
    borderWidth: 1,
    color: colors.black,
    fontSize: sizes.md,
    height: 48,
    paddingHorizontal: padding.sm,
    paddingRight: padding.xxl,
    paddingVertical: padding.md,
  },
});

export default Select;
