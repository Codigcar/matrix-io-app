import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Text, Switch, TextInput } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { REFERRAL_CODE_MAX_LENGTH } from 'src/utils/constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { ReferralCodeProps } from '../types/referralCode';

const ReferralCode = (props: ReferralCodeProps) => {
  const { toggleReferralSwitch, control, error } = props;
  const [hasReferralCode, setHasReferralCode] = useState(false);

  const toggleReferralInput = (value: boolean) => {
    setHasReferralCode(value);
    if (toggleReferralSwitch) toggleReferralSwitch(value);
  };

  return (
    <>
      <Box flexDirection="row" justifyContent="space-between" mb="spacing-s" mt="spacing-sm">
        <Text variant="Heading20Medium" lineHeight={RFValue(24)}>
          {i18n.t('enrollment-titles-referral-code')}
        </Text>
        <Box
          bg="complementaryPrimary100"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="spacing-xxs"
          px="spacing-s"
          borderRadius={25}
          maxWidth={130}
        >
          <Text variant="SubTitle16" color={hasReferralCode ? 'primary500' : 'primaryDark'}>
            {i18n.t('no')}
          </Text>
          <Switch
            label=""
            hideLabel
            checked={hasReferralCode}
            onToggle={toggleReferralInput}
            testID="referralSwitch"
          />
          <Text variant="SubTitle16" color={hasReferralCode ? 'primaryDark' : 'primary500'}>
            {i18n.t('yes')}
          </Text>
        </Box>
      </Box>
      {hasReferralCode ? (
        <Controller
          name="referralCode"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoFocus
              label={i18n.t('enrollment-titles-enter-referral-code')}
              placeholder={i18n.t('enrollment-referral-code-placeholder')}
              maxLength={REFERRAL_CODE_MAX_LENGTH}
              autoCapitalize="characters"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!error}
              textHelper={error?.message?.toString() || ''}
              testID="referralCodeInput"
            />
          )}
        />
      ) : undefined}
    </>
  );
};

export default ReferralCode;
