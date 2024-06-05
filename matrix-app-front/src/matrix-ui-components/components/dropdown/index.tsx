import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Helpers from 'src/utils/Helpers';
import { Text, Box, Theme, useTheme } from 'matrix-ui-components';
import { vs } from 'src/utils/sizes';
import ArrowList from 'assets/svgs/arrow-list.svg';
import ArrowListDisabled from 'assets/svgs/arrow-list-disabled.svg';
import { SpacingProps, SpacingShorthandProps, VariantProps } from '@shopify/restyle';
import { i18n } from 'src/utils/core/MTXStrings';
import { screenHeight, screenWidth, android } from 'src/utils/constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { SpinnerGray } from 'src/components/Spinner/SpinnerGray';

export type DropdownItemType = {
  code?: React.Key | null;
  [key: string]: any;
}

type DropdownPropsType = SpacingProps<Theme> & SpacingShorthandProps<Theme> & VariantProps<Theme, 'textVariants'> & {
  label: string;
  itemList: DropdownItemType[];
  testID?: string;
  disabled?: Boolean;
  labelKey: string;
  // eslint-disable-next-line no-unused-vars
  onChangeItem?: (item: DropdownItemType | any) => void;
  placeholder?: string;
  value?: any;
  isFormatText?: boolean;
  disabledItem?: boolean;
  disabledItemProp?: string;
  disabledItemValue?: string | number;
  isLoading?: Boolean;
  };

export const Dropdown = ({
  label,
  itemList,
  testID,
  disabled,
  labelKey,
  onChangeItem,
  placeholder,
  value,
  isFormatText = true,
  variant,
  disabledItem = false,
  disabledItemProp,
  disabledItemValue,
  isLoading,
  ...rest
}: DropdownPropsType) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showKeyBoard, setShowKeyBoard] = useState(false);
  const placeholderText = placeholder || i18n.t('dropdown-default-placeholder');
  const button = useRef<View>(null);
  const listViewRef = useRef<View>(null);
  const { colors } = useTheme();
  const buttonMeasure = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const getDropdownHeight = (length: number) => {
    switch (length) {
      case 2:
        return vs(120);
      case 1:
        return vs(70);
      default:
        return vs(170);
    }
  };
  const dropdownHeight = getDropdownHeight(itemList.length);
  const onItemPress = (item: any, index: number) => {
    setIsVisible(!isVisible);
    setSelectedIndex(index);
    onChangeItem?.(item);
  };
  const formatTextSelected = (formatText: boolean, text: string) =>
    (formatText ? Helpers.formatStringCamel(text) : text);
  const pressableStyles = { width: '100%' };
  const measureButtonPosition = (callback?: () => void) => {
    button.current?.measure((x, y, width, height, px, py) => {
      buttonMeasure.current = {
        x: px,
        y: py,
        width,
        height,
      };
      callback?.();
    });
  };
  const calcPosition = () => {
    const windowWidth = screenWidth;
    const windowHeight = screenHeight;
    const buttonFrame = buttonMeasure.current;

    const bottomSpace = windowHeight - buttonFrame.y - buttonFrame.height;
    const rightSpace = windowWidth - buttonFrame.x;
    const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= buttonFrame.y;
    const showInLeft = rightSpace >= buttonFrame.x;
    const topAdjust = android ? RFValue(25) : 0;
    const positionTop = buttonFrame.y + buttonFrame.height - topAdjust;
    const positionStyle: StyleProp<ViewStyle> = {
      height: dropdownHeight,
      top: showInBottom ? positionTop : Math.max(0, buttonFrame.y - dropdownHeight),
    };

    if (showInLeft) {
      positionStyle.left = buttonFrame.x;
      positionStyle.right = rightSpace - buttonFrame.width;
    }

    return positionStyle;
  };
  const frameStyle = calcPosition();
  const renderItem = ({ item, index }: { item: DropdownItemType; index: number }) => {
    const key = `row_${index}`;
    const highlighted = index === selectedIndex;
    const content = isFormatText ? Helpers.formatStringCamel(item[labelKey]) : item[labelKey];

    const hasDisabledItemValue = disabledItemProp
      && (disabledItemValue !== '' ? item[disabledItemProp] === disabledItemValue
        : !!item[disabledItemProp]);
    const disabledElement = disabledItem ? hasDisabledItemValue : false;

    const touchableProps = {
      key,
      accessible: true,
      activeOpacity: (disabledItem && disabledElement) ? 1 : 0.7,
      onPress: () => !(disabledItem && disabledElement) && onItemPress(item, index),
      style: {
        backgroundColor: highlighted ? colors.primary100 : colors.white,
        borderRadius: 12,
        marginHorizontal: 10,
      },
    };

    return (
      <TouchableOpacity {...touchableProps}>
        <Text
          px="spacing-xxs"
          py="spacing-xs"
          textAlign="left"
          variant="body14Medium"
          color={disabledItem && disabledElement ? 'complementaryIndigo200' : 'black'}
          testID={String(item.code)}
        >
          {content}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderDropdown = () => (
    <FlatList
      getItemLayout={(data, index) => ({
        length: 33 + StyleSheet.hairlineWidth,
        index,
        offset: (33 + StyleSheet.hairlineWidth) * index,
      })}
      data={itemList}
      initialScrollIndex={itemList.length > 2 ? selectedIndex : -1}
      keyExtractor={(item, i) => `key-${i}`}
      renderItem={renderItem}
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator
      keyboardShouldPersistTaps="never"
    />
  );
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowKeyBoard(true);
    });
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!value) setSelectedIndex(-1);
  }, [value]);

  const hiddenKeyboard = () => {
    if (showKeyBoard) {
      Keyboard.dismiss();
      setShowKeyBoard(false);
    } else {
      measureButtonPosition(() => {
        setIsVisible(!isVisible);
      });
    }
  };

  return (
    <Box {...rest}>
      <Text
        color="primaryDarkest"
        mb="spacing-xxxs"
        variant={variant ?? 'body13pxRegular'}
      >
        {label}
      </Text>
      <Box width="100%" alignItems="flex-start">
        <Pressable
          testID={testID}
          ref={button}
          disabled={!!disabled || !!isLoading}
          style={pressableStyles}
          onPress={() => hiddenKeyboard()}
        >
          <Box
            borderColor={isVisible ? 'primaryDark' : 'primary400'}
            borderWidth={isVisible ? 2 : 1}
            width="100%"
            borderRadius={vs(24)}
            px="spacing-s"
            flexDirection="row"
            backgroundColor={disabled ? 'primary100' : 'primary000'}
            justifyContent="space-between"
            alignItems="center"
            height={vs(48)}
          >
            {isLoading ? (
              <Box ml="spacing-xl">
                <SpinnerGray width={RFValue(24)} />
              </Box>
            ) : (
              <Text variant="body14Regular" color={value ? 'primaryDarkest' : 'primaryMedium'}>
                {value ? formatTextSelected(isFormatText, value[labelKey]) : placeholderText}
              </Text>
            )}
            {disabled || isLoading ? (
              <ArrowListDisabled />
            ) : (
              <ArrowList
                style={{ transform: [{ rotateX: isVisible && !showKeyBoard ? '180deg' : '0deg' }] }}
              />
            )}
          </Box>
        </Pressable>
        {isVisible && (
          <Modal
            animationType="none"
            visible
            transparent
            onRequestClose={() => {
              setIsVisible(false);
            }}
          >
            <TouchableWithoutFeedback
              accessible
              disabled={!isVisible}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Box flex={1}>
                <Box
                  position="absolute"
                  shadowColor="primary400"
                  shadowOffset={{
                    width: 0,
                    height: 5,
                  }}
                  shadowOpacity={0.25}
                  shadowRadius={3.84}
                  elevation={8}
                  borderRadius={20}
                  backgroundColor="white"
                  justifyContent="center"
                  style={frameStyle}
                  ref={listViewRef}
                  py="spacing-xxs"
                >
                  {renderDropdown()}
                </Box>
              </Box>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </Box>
    </Box>
  );
};

Dropdown.defaultProps = {
  testID: 'Dropdown',
  disabled: false,
  onChangeItem: () => {},
  placeholder: '',
  value: null,
  isFormatText: true,
  disabledItem: false,
  disabledItemProp: '',
  disabledItemValue: '',
  isLoading: false,
};

export default Dropdown;
