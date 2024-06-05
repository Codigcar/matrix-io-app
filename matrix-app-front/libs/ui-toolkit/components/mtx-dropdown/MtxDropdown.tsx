/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Menu, Box, Pressable } from 'native-base';
import { ArrowDownChevron } from 'assets/icons';
import Helpers from 'src/utils/Helpers';
import { Text, fonts } from 'src/matrix-ui-components';
import styles from './styles/MtxDropdownStyle';

type MtxDropdownPropsType = {
  label: string;
  itemList: any[];
  testID?: string;
  isDisabled?: Boolean;
  labelKey: string;
  onChangeItem?: (item: any) => void;
  placeholder?: string;
  value?: any;
  isFormatText?: boolean;
};
/**
 * @deprecated The method should not be used
 */
const MtxDropdown = ({
  label,
  itemList,
  testID,
  isDisabled,
  labelKey,
  onChangeItem,
  placeholder,
  value,
  isFormatText = true,
}: MtxDropdownPropsType) => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const placeholderText = placeholder || 'Seleccione una opción';
  const onItemPress = (item: any) => {
    setIsVisible(!isVisible);
    onChangeItem(item);
  };
  const formatTextSelected = (formatText: boolean, text: string) => (formatText ? Helpers.formatStringCamel(text) : text);
  return (
    <>
      <Text
        color="primaryDarkest"
        mb="spacing-xs"
        fontFamily={fonts.euclidCircularMedium}
        variant="body"
      >
        {label}
      </Text>
      <Box w="100%" alignItems="flex-start">
        <Menu
          isOpen={isVisible}
          maxHeight={200}
          style={styles.menu}
          onClose={() => setIsVisible(!isVisible)}
          trigger={(triggerProps) => (
            <Pressable
              testID={testID}
              style={styles.pressable}
              isDisabled={isDisabled}
              {...triggerProps}
              onPress={() => setIsVisible(!isVisible)}
            >
              {({ isPressed }) => (
                <View
                  style={[
                    styles.dropdownBaseStyle,
                    {
                      transform: [
                        {
                          scale: isPressed ? 0.98 : 1,
                        },
                      ],
                    },
                    isDisabled && styles.dropdownDisabledStyle,
                  ]}
                >
                  <Text variant="label" style={[styles.text, !value && styles.textDisabled]}>
                    {value ? formatTextSelected(isFormatText, value[labelKey]) : placeholderText}
                  </Text>
                  <Image source={ArrowDownChevron} />
                </View>
              )}
            </Pressable>
          )}
        >
          {itemList.map((item) => (
            <Menu.Item key={item.code} style={styles.menuItem} onPress={() => onItemPress(item)}>
              {isFormatText ? Helpers.formatStringCamel(item[labelKey]) : item[labelKey]}
            </Menu.Item>
          ))}
        </Menu>
      </Box>
    </>
  );
};

MtxDropdown.defaultProps = {
  testID: 'Dropdown',
  isDisabled: false,
  onChangeItem: () => {},
  placeholder: '',
};

export default MtxDropdown;
