import React, { useEffect, useState } from 'react';
// Assets
import { FlagPE } from 'assets/icons';
// Components
import {
  Text, TextStyle, View, Image, TouchableOpacity, Platform,
} from 'react-native';
import {
  Input, FormControl, CheckIcon, CloseIcon,
} from 'native-base';
import { useController, Control } from 'react-hook-form';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomIcon from '../../../../src/utils/CustomIcon';
// Styles
import { colors, fonts } from '../../styles';
import styles from './styles/MtxInputStyles';
import {
  DEFAULT_BORDER_RADIUS,
  BORDER_SIZE,
  INPUT_HEIGHT,
  PHONE_NUMBER_LENGHT,
} from '../../../../src/utils/constants';

const android = Platform.OS === 'android';
type MtxInputPropsType = {
  placeholder?: string;
  label: string;
  name: string;
  type?: 'password' | 'phone' | 'text';
  style?: TextStyle;
  error?: { type: string; message: string; ref: { name: string } };
  errorMesage?: string;
  disabled?: boolean;
  success?: boolean;
  phonePrefix?: number;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  customFunction?: Function;
  control?: Control;
  rules?: Object;
  maxLength?: number;
  autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters';
  testID?: string;
  autoFocus?: boolean;
  prevPassword?: string;
  validate?: Object | Function;
  defaultValue?: string;
  hasBorderError?: boolean;
  isPasswordRepeat?: boolean;
  bottomLabel?: string;
};
/**
 * @deprecated Use src/matrix-ui-components/components/text-input/index.tsx
 */
const MtxInput = ({
  placeholder,
  label,
  name,
  type,
  error,
  success,
  disabled,
  phonePrefix,
  keyboardType,
  customFunction,
  control,
  rules,
  maxLength,
  autoCapitalize,
  testID,
  autoFocus,
  prevPassword,
  isPasswordRepeat,
  validate,
  defaultValue,
  hasBorderError,
  children,
  bottomLabel,
}: MtxInputPropsType) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    control,
    name,
    rules,
    validate,
  });
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [labelColor, setLabelColor] = useState<string>(colors.ONSURFACE_500);
  const [show, setShow] = useState<boolean>(false);
  const [showGradient, setShowGradient] = useState<boolean>(false);

  const keyboardPasswordVisible = Platform.OS === 'android' ? 'visible-password' : 'url';

  useEffect(() => {
    if (error?.message) {
      logVirtualEventAnalytics({
        tipoEvento: 'Visualizar',
        tipoElemento: 'Mensaje de Error',
        valor: error.message,
      });
    }
  }, [error?.message]);

  const handleFocus = () => {
    setIsFocused(true);
    setLabelColor(colors.SECONDARY_700);
    setShowGradient(true);
    Clipboard.setString('');
  };
  const handleBlur = () => {
    setIsFocused(false);
    setLabelColor(colors.ONSURFACE_500);
    onBlur();
    setShowGradient(false);
  };
  const maskValue = (value: string): string => value
    .replace(/ /g, '')
    .slice(0, PHONE_NUMBER_LENGHT)
    .split('')
    .map((char, index) => {
      if (index === 2 || index == 5) {
        return `${char} `;
      } return char;
    })
    .join('')
    .trim();

  const passwordButton = (
    <TouchableOpacity onPress={() => setShow(!show)}>
      <CustomIcon
        name={!show ? 'ic_eye_slash_r' : 'ic_eye_r'}
        size={28}
        style={styles.passButtonIcon}
      />
    </TouchableOpacity>
  );

  const phoneCheckSuccess = <CheckIcon color={colors.SUCCESS} size={5} mr={3} />;

  const phonePrefixComponent = (
    <View style={styles.phonePrefixContainer}>
      <Image source={FlagPE} />
      <Text style={styles.phonePrefixStyle} numberOfLines={1}>
        {`+${phonePrefix}`}
      </Text>
    </View>
  );

  const leftElement = (): JSX.Element | null => {
    if (phonePrefix) return phonePrefixComponent;
    return null;
  };

  const rightElement = (): JSX.Element | null => {
    if (type === 'password') return passwordButton;
    if (type === 'phone' && success) return phoneCheckSuccess;
    return null;
  };

  const renderInput = () => (
    <Input
      {...{ placeholder }}
      onSelectionChange={() => Clipboard.setString('')}
      value={defaultValue || value}
      backgroundColor={colors.WHITE}
      _focus={error ? styles.invalidStyle : styles.focusStyle}
      _disabled={styles.disableStyle}
      fontSize={fonts.INPUT_FONT_SIZE}
      fontFamily={fonts.EUCLID_CIRCULAR_A_REGULAR}
      color={error && error.type !== 'feedback' ? colors.ERROR : colors.TEXT}
      fontWeight="semibold"
      onFocus={handleFocus}
      onBlur={handleBlur}
      type={!show && type === 'password' ? 'password' : 'text'}
      InputRightElement={rightElement()}
      InputLeftElement={leftElement()}
      keyboardType={show && type === 'password' ? keyboardPasswordVisible : keyboardType}
      onChangeText={(textValue: string) => {
        if (customFunction) {
          customFunction(textValue);
        }
        onChange(type === 'phone' ? maskValue(textValue) : textValue);
      }}
      textContentType="oneTimeCode"
      maxLength={maxLength}
      autoCapitalize={autoCapitalize}
      testID={testID}
      borderRadius={DEFAULT_BORDER_RADIUS}
      borderWidth={BORDER_SIZE}
      height={INPUT_HEIGHT}
      autoFocus={autoFocus}
      isDisabled={disabled}
      contextMenuHidden
      autoCorrect={false}
      autoComplete="off"
      selectionColor={colors.GRAY200}
    />
  );

  return (
    <View style={styles.container}>
      <FormControl
        isInvalid={error && error.type !== 'feedback' && hasBorderError}
        isDisabled={disabled}
      >
        <Text style={[{ color: error ? colors.ERROR : labelColor }, styles.label]}>{label}</Text>
        {renderInput()}
        {error ? (
          <Text testID="inputError" style={styles.errorText}>
            {error.message}
          </Text>
        ) : (
          <Text testID="inputError" style={styles.feedbackText}>
            {bottomLabel}
          </Text>
        )}
      </FormControl>
      {children}
    </View>
  );
};

MtxInput.defaultProps = {
  placeholder: '',
  type: 'text',
  style: {},
  error: null,
  errorMesage: '',
  disabled: false,
  success: false,
  phonePrefix: null,
  keyboardType: 'default',
  customFunction: null,
  control: null,
  rules: null,
  maxLength: 30,
  autoCapitalize: 'sentences',
  testID: 'testID',
  autoFocus: false,
  prevPassword: '',
  validate: {},
  defaultValue: '',
  hasBorderError: true,
  isPasswordRepeat: false,
  bottomLabel: '',
};

export default MtxInput;
