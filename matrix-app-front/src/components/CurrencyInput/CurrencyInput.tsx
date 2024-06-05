import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { TextInput, TouchableOpacity } from 'react-native';
import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import Helpers from 'src/utils/Helpers';
import { CURRENCY, ios } from 'src/utils/constants';
import Styles from './styles/currencyInputStyle';

type Props = {
  title: string;
  mountMoney: string | number;
  grayText?: boolean;
  warningText?: string | null;
  autoFocus?: boolean;
  inputRef?: any;
  moneySymbol: string;
  onChange?: (value: string | number) => void;
  inputValue?: string | number;
  disabled?: boolean;
  testID?: string;
}

export const CurrencyInput = ({
  title,
  grayText = false,
  warningText,
  autoFocus,
  inputRef,
  moneySymbol,
  onChange,
  inputValue = '0.00',
  testID,
}: Props) => {
  const isEditable = typeof onChange === 'function';

  const parseStringValue = (text: string): number => {
    const digitsOnly = text.match(/\d+/g) || 0;
    const decimalAmount: number = 10 ** 2;
    return digitsOnly ? parseInt(digitsOnly.join(''), 10) / decimalAmount : 0;
  };

  const handleOnUpdate = (text: string) => {
    const parsedValue = parseStringValue(text);
    if (isEditable) onChange(parsedValue);
  };

  const textColor = autoFocus ? 'primaryDark' : 'gray200';

  const handleFocus = () => {
    if (ios) {
      const valueLength = Helpers.formatCurrency(
        Number(inputValue),
        { currencySymbol: CURRENCY.PEN.symbol },
      )?.length;
      inputRef?.current?.setNativeProps({
        selection: { start: valueLength, end: valueLength },
      });
    }
  };

  return (
    <>
      <TouchableOpacity testID={testID}>
        <Box
          flexDirection="row"
          borderColor={warningText ? 'redError' : 'complementaryIndigo600'}
          borderWidth={2}
          backgroundColor="white"
          p="spacing-s"
          borderRadius={18}
          alignItems="center"
        >
          <Box flex={1}>
            <Text variant="body13pxRegular" mb="spacing-xxxs">{title}</Text>
            <TextInput
              value={Helpers.formatCurrency(
                Number(inputValue),
                { currencySymbol: CURRENCY.PEN.symbol },
              )}
              onChangeText={handleOnUpdate}
              style={[Styles.input, { color: colors[textColor] }]}
              keyboardType="number-pad"
              autoFocus={autoFocus}
              ref={inputRef}
              maxLength={11}
              editable={grayText}
              selectTextOnFocus={grayText}
              onFocus={handleFocus}
            />
          </Box>
        </Box>
      </TouchableOpacity>
      {warningText ? (
        <Text
          variant="body13pxMedium"
          color="redError"
          pt="spacing-xxs"
          mx="spacing-xxxxxs"
          my="spacing-none"
          testID="alertMessage"
        >
          {warningText}
        </Text>
      ) : null}
    </>
  );
};

export default CurrencyInput;
