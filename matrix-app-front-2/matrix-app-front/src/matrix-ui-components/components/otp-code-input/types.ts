import { ColorValue, TextStyle, ViewStyle } from 'react-native';

export interface OtpInputProps {
  numberOfDigits?: number;
  value?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  focusColor?: ColorValue;
  onTextChange?: (text: string) => void;
  onComplete?: (text: string) => void;
}

export interface Theme {
  containerStyle?: ViewStyle;
  inputsContainerStyle?: ViewStyle;
  pinCodeContainerStyle?: ViewStyle;
  pinCodeTextStyle?: TextStyle;
  focusStickStyle?: ViewStyle;
  focusedPinCodeContainerStyle?: ViewStyle;
}
