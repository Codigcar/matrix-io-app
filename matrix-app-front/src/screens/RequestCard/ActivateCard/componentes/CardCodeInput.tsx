import React from 'react';
import { Box, colors } from 'matrix-ui-components';
import { StyleSheet, TextInput } from 'react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import { CardCodeInputProps } from '../../shared/types/components';

const styles = StyleSheet.create({
  codeInput: {
    width: '100%',
    textAlign: 'center',
    letterSpacing: 8,
    margin: 0,
    padding: 0,
    paddingVertical: 2,
    paddingLeft: 10,
  },
});

const CardCodeInput: React.FC<CardCodeInputProps> = (props) => {
  const {
    codeLength, value, handlerChange, inputRef, autoFocus, placeholder, handlerKeyPress,
  } = props;
  return (
    <Box
      width={codeLength === 4 ? 114 : 84}
      height={48}
      backgroundColor="white"
      borderRadius={8}
      px="spacing-xxxs"
      borderWidth={2}
      borderColor="primaryDark"
      justifyContent="center"
    >
      <TextInput
        style={styles.codeInput}
        placeholder={i18n.t(placeholder)}
        placeholderTextColor={colors.primaryMedium}
        keyboardType="numeric"
        maxLength={codeLength}
        value={value}
        onChangeText={handlerChange}
        ref={inputRef}
        autoCorrect={false}
        autoComplete="off"
        onKeyPress={handlerKeyPress}
        autoFocus={autoFocus || false}
      />
    </Box>
  );
};

export default CardCodeInput;
