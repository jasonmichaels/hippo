import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';

import ChevronDownIcon from './ChevronDownIcon';
import colors from '../styles/colors';
import { margin, padding } from '../styles/layout';
import { borderRadius, borderWidth, sizes } from '../styles/sizes';
import { THandleSelectPress, TOptions } from '../types/extra';

interface IProps {
  options: TOptions;
  value: string;
  handlePress: THandleSelectPress;
  placeholder: string;
}

const Select = ({
  options,
  value,
  handlePress,
  placeholder,
}: IProps): JSX.Element => {
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
      pickerProps={{ testID: 'PickerSelect' }}
      textInputProps={{ testID: 'PickerText' }}
      modalProps={{ testID: "PickerModal" }}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: margin.md,
    top: margin.lg,
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
  inputAndroid: {
    borderColor: colors.lightGray,
    borderRadius: borderRadius,
    borderWidth: borderWidth * 2,
    color: colors.black,
    fontSize: sizes.md,
    height: 48,
    paddingHorizontal: padding.sm,
    paddingRight: padding.xxl,
    paddingVertical: padding.md,
  },
  inputIOS: {
    borderColor: colors.lightGray,
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    color: colors.black,
    fontSize: sizes.md,
    height: 48,
    paddingHorizontal: padding.sm,
    paddingRight: padding.xxl,
    paddingVertical: padding.md,
  },
});

export default Select;
