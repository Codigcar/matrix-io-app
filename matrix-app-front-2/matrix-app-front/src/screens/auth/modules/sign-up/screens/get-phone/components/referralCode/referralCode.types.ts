import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export interface ReferralCodeProps {
  error?: string;
  value: string;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
