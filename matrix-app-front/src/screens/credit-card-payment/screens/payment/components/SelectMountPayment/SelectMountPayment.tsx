import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { TextInput, TouchableOpacity } from 'react-native';
import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import Helpers from 'src/utils/Helpers';
import { SelectMountPaymentProps } from '../../../../shared/types/card-payment.type';
import Styles from './SelectMountPayment.styles';

const SelectMountPayment: React.FC<SelectMountPaymentProps> = ({
  title,
  mountMoney,
  onPress,
  isSelected = false,
  grayText = false,
  warningText,
  autoFocus,
  inputRef,
  moneySymbol,
  onChange,
  inputValue = '0.00',
  disabled = false,
  testID,
  testIDInput,
}) => {
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

  const textColor = isSelected ? 'primaryDark' : 'primary500';

  return (
    <>
      <TouchableOpacity onPress={onPress} disabled={disabled} testID={testID}>
        <Box
          flexDirection="row"
          borderColor={isSelected ? 'complementaryIndigo500' : 'primary100'}
          borderWidth={2}
          backgroundColor={isSelected ? 'complementaryIndigo050' : 'primary100'}
          p="spacing-s"
          borderRadius={18}
          alignItems="center"
        >
          <Box
            width={24}
            height={24}
            borderRadius={24}
            backgroundColor="white"
            borderColor="primary400"
            borderWidth={1}
            alignItems="center"
            justifyContent="center"
            mr="spacing-s"
          >
            {isSelected ? (
              <Box backgroundColor="black" borderRadius={8} width={8} height={8} />
            ) : null}
          </Box>
          <Box flex={1}>
            <Text variant="body14pxRegular" mb="spacing-xxs">{title}</Text>
            {!isEditable ? (
              <Text variant="Subtitle20SemiBold" color={textColor}>
                {`${moneySymbol}${mountMoney}`}
              </Text>
            ) : (
              <Box flexDirection="row">
                {isSelected ? (
                  <TextInput
                    value={Helpers.formatMoney(inputValue, moneySymbol, true)}
                    onChangeText={handleOnUpdate}
                    style={[Styles.input, { color: colors[textColor] }]}
                    keyboardType="number-pad"
                    autoFocus={autoFocus}
                    ref={inputRef}
                    maxLength={11}
                    editable={grayText}
                    selectTextOnFocus={grayText}
                    testID={testIDInput}
                  />
                ) : (
                  <Text variant="Subtitle20SemiBold" color="primary500">
                    {`${moneySymbol}0.00`}
                  </Text>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
      {warningText ? (
        <Text
          variant="body14pxRegular"
          color="warningMedium"
          my="spacing-xxs"
          testID="alertMessage"
        >
          {warningText}
        </Text>
      ) : null}
    </>
  );
};

export default SelectMountPayment;
