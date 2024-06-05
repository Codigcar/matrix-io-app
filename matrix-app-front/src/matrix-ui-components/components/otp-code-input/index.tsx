import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from 'matrix-ui-components';
import { OtpInputProps } from './types';
import Caret from './caret';
import Box from '../box';
import styles from './styles';
import { Text } from '../text';

const OtpCodeInput = (props: OtpInputProps) => {
  const {
    numberOfDigits = 6,
    value: valueFromProps,
    helperText = '',
    onComplete,
    onTextChange,
    disabled = false,
    error = false,
    success = false,
  } = props;

  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const isControlled = typeof valueFromProps !== 'undefined';
  const value = isControlled ? valueFromProps : text;
  const focusedInputIndex = value.length;

  const handlePress = () => {
    if (disabled) return;
    inputRef.current?.focus();
  };

  const handleTextChange = (textValue: string) => {
    if (disabled) return;
    const textNumbers = textValue.replace(/\D/g, '');
    if (!isControlled) {
      setText(textNumbers);
    }
    onTextChange?.(textNumbers);
    if (textNumbers.length === numberOfDigits) {
      onComplete?.(textNumbers);
      Keyboard.dismiss();
    }
  };

  const borderColor = (isFocused: boolean) => {
    if (error) return 'FeedbackError600';
    if (success) return 'green';
    if (disabled) return 'primaryMedium';
    if (isFocused) return 'primaryDarkest';
    return 'primaryMedium';
  };

  const borderWidth = (isFocused: boolean) => {
    if (error) return 1;
    if (success) return 2;
    if (disabled) return 1;
    if (isFocused) return 2;
    return 1;
  };

  const textColor = () => {
    if (disabled) return 'primaryMedium';
    return 'primaryDarkest';
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <Box flexDirection="column">
      <Box flexDirection="row" justifyContent="space-between">
        {Array(numberOfDigits)
          .fill(0)
          .map((_, index) => {
            const char = value[index];
            const isFocusedInput = index === focusedInputIndex && focus;
            const isEndFocus =
              focusedInputIndex === numberOfDigits &&
              index + 1 === focusedInputIndex &&
              keyboardVisible &&
              focus;

            const key = `${char}-${index}`;

            return (
              <Box
                key={key}
                borderRadius={50}
                borderWidth={borderWidth(isFocusedInput || isEndFocus)}
                borderColor={borderColor(isFocusedInput || isEndFocus)}
                width={RFValue(44)}
                height={RFValue(44)}
                focusable
              >
                <Pressable style={styles.digitButton} onPress={handlePress}>
                  {isFocusedInput && !disabled ? <Caret /> : null}
                  {char ? (
                    <Text variant="titleEmptyContent" color={textColor()}>
                      {char}
                    </Text>
                  ) : (
                    <Box width={4} height={2} bg="primaryMedium" testID="code-placeholder" />
                  )}
                </Pressable>
              </Box>
            );
          })}
      </Box>
      <TextInput
        value={value}
        onChangeText={handleTextChange}
        maxLength={numberOfDigits}
        keyboardType="numeric"
        ref={inputRef}
        autoFocus
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={styles.hiddenInput}
        testID="otp-input"
      />
      <Text
        mt="spacing-xs"
        variant="SubHead"
        fontFamily={fonts.euclidCircularRegular}
        color="redError"
      >
        {helperText}
      </Text>
    </Box>
  );
};
export default OtpCodeInput;
export { OtpCodeInput };
