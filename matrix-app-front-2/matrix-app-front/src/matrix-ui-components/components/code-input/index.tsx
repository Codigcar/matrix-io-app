/* eslint-disable react/jsx-props-no-spreading */
import { SpacingProps } from '@shopify/restyle';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput as CodeInputBase, TextInput } from 'react-native';
import { fonts, colors, Theme } from '../../theme/themes';
import Box from '../box';
import { Text } from '../text';

type CodeInputProps = React.ComponentPropsWithRef<typeof CodeInputBase> & {
  error?: boolean;
  textHelper?: string;
  enable?: boolean;
  codeLength?: number;
  success: boolean;
  complete: boolean;
  reSendCode: boolean;
  code: string[];
  setValue: (text: string, indx: number) => void;
  containerProps?: SpacingProps<Theme>;
};

const Styles = StyleSheet.create({
  input: {
    fontFamily: fonts.euclidCircularMedium,
    fontSize: 14,
    color: colors.primaryDarkest,
    textAlign: 'center',
    padding: 0,
    height: 16,
    width: 16,
  },
  disable: {
    backgroundColor: colors.secundaryDisable,
  },
});
type Props = CodeInputProps & SpacingProps<Theme>;

type InputCodeType = {
  focus: boolean;
  key: string;
};

const keyPrefix: string = 'inputKey';

export const CodeInput = ({ ref, ...rest }: Props) => {
  const inputRef0 = useRef<TextInput>(null);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);
  const inputRef5 = useRef<TextInput>(null);

  const inputRefs = {
    0: inputRef0,
    1: inputRef1,
    2: inputRef2,
    3: inputRef3,
    4: inputRef4,
    5: inputRef5,
  };

  const codeLength = rest.codeLength || 6;
  const codeInputs = Array(codeLength).fill('');
  const structureInitial = codeInputs.map((val, indx) => ({
    focus: false,
    key: `${keyPrefix}${indx}`,
  }));
  const [codeStructure, setCodeStructure] = useState<InputCodeType[]>(structureInitial);
  const boxBorderFocus = (isFocus: boolean) => (isFocus ? 'primaryDark' : 'primaryMedium');
  const inputDissable = rest.enable ? 'primaryMedium' : 'disable';
  const boxBorderSuccess = rest.success ? 'success' : inputDissable;
  const boxBorder = !rest.error ? boxBorderSuccess : 'redError';

  useEffect(() => {
    inputRef0.current.focus();
  }, []);

  useEffect(() => {
    if (rest.complete) {
      setCodeStructure(structureInitial);
    }
  }, [rest.complete]);

  useEffect(() => {
    if (rest.reSendCode) {
      setCodeStructure(
        structureInitial.map((item, indx) => (indx === 0 ? { ...item, focus: true } : item)),
      );
      inputRef0.current.focus();
    }
  }, [rest.reSendCode]);

  const regNumber: RegExp = /^[0-9]+$/;

  const handlerCodeInput = (text: string, codeIndex: number) => {
    if (text.length > 1 && regNumber.test(text) && codeIndex === 0) {
      inputRefs[text.length - 1].current?.setNativeProps({ text: text.charAt(text.length - 1) });
      if (text.length !== codeLength) {
        rest.setValue(text.charAt(text.length - 1), text.length - 1);
        inputRefs[text.length].current.focus();
      } else {
        setTimeout(() => rest.setValue(text.charAt(text.length - 1), text.length - 1), 500);
        inputRefs[text.length - 1].current.blur();
      }
    } else if (regNumber.test(text) && text.length === 1) {
      if (codeIndex !== codeLength - 1) {
        const structureAux = codeStructure.map((ele, indx) =>
          codeIndex + 1 === indx ? { ...ele, focus: true } : { ...ele, focus: false },
        );
        setCodeStructure(structureAux);
        inputRefs[codeIndex + 1].current.focus();
      }
      rest.setValue(text.charAt(0), codeIndex);
      inputRefs[codeIndex].current.blur();
    } else inputRefs[codeIndex].current.setNativeProps({ text: '' });
  };

  const handlerFocus = (codeIndex: number) => {
    inputRefs[codeIndex].current.focus();
    const structureAux = codeStructure.map((ele, indx) =>
      codeIndex === indx ? { ...ele, focus: true } : { ...ele, focus: false },
    );
    setCodeStructure(structureAux);
  };

  const handlerKey = (e: any, codeIndex: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (rest.code[codeIndex]) rest.setValue('', codeIndex);
      else if (codeIndex !== 0) {
        inputRefs[codeIndex - 1].current.focus();
        inputRefs[codeIndex].current.blur();
      }
    }
  };

  const CodeInputText = (pos: number) => (
    <Box
      borderWidth={codeStructure[pos].focus || rest.success ? 2 : 1}
      borderRadius={50}
      borderColor={codeStructure[pos].focus ? boxBorderFocus(codeStructure[pos].focus) : boxBorder}
      py="spacing-xs"
      px="spacing-xs"
      bg={!rest.enable ? 'secundaryDisable' : 'white'}
    >
      <CodeInputBase
        onFocus={() => handlerFocus(pos)}
        style={Styles.input}
        ref={inputRefs[pos]}
        placeholderTextColor={colors.primaryMedium}
        placeholder={rest.placeholder || '-'}
        onChangeText={(text: string) => handlerCodeInput(text, pos)}
        maxLength={6}
        editable={rest.enable}
        value={rest.code[pos]}
        onKeyPress={(e) => handlerKey(e, pos)}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
      />
    </Box>
  );

  return (
    <Box flexDirection="column" {...rest.containerProps}>
      <Box alignItems="center" flexDirection="row" justifyContent="space-between">
        {CodeInputText(0)}
        {CodeInputText(1)}
        {CodeInputText(2)}
        {CodeInputText(3)}
        {CodeInputText(4)}
        {CodeInputText(5)}
      </Box>
      {rest.error ? (
        <Text
          mt="spacing-xs"
          variant="SubHead"
          fontFamily={fonts.euclidCircularRegular}
          color="redError"
        >
          {rest.textHelper}
        </Text>
      ) : null}
    </Box>
  );
};

CodeInput.defaultProps = {
  onComplete: () => {},
  success: false,
  error: false,
  enable: false,
  complete: false,
  reSendCode: false,
};

export default CodeInput;