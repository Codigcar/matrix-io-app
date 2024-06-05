import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
// Components
import MtxInput from 'libs/ui-toolkit/components/mtx-input/MtxInput';
import HomeWrapper from 'src/screens/Home/components/HomeWrapper';
import { Box, Button, Container, Text, rebrandingTheme } from 'matrix-ui-components';
// Utils
import { BackgroundNew } from 'assets/images';
import { INPUT_MAX_LENGTH, PREFIX_NUMBER } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
// Hooks
import useKeyboard from 'src/utils/hooks/useKeyboard';
import usePhone from './hooks/usePhone';
// Styles

import { NavigationPropsType } from '../../../../types/types';

const MtxVerifyPhone = (props: NavigationPropsType) => {
  const { isKeyboardVisible } = useKeyboard();
  const { control, errors, onPressBackArrow, setValue, verifyPhone, phoneLenghtRule, isButtonEnabled,checkValidations } = usePhone(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <HomeWrapper>
        <Container
          withInput
          imageBackground={BackgroundNew}
          isHeaderTransparent
          isHeaderVisible
          isScrollable
          goBackNavigate={onPressBackArrow}
        >
          <Box
            flex={1}
            mx="spacing-m"
            justifyContent={isKeyboardVisible ? 'flex-end' : 'space-around'}
            mt="spacing-xl"
          >
            <Box mb="spacing-m">
              <Text variant="Heading20Medium" mb="spacing-xs">
                {i18n.t('phone-head')}
              </Text>
            </Box>
            <MtxInput
              label={i18n.t('phone-label')}
              name="phone"
              keyboardType="phone-pad"
              control={control}
              error={errors.phone}
              testID="phone"
              type="phone"
              rules={{
                required: i18n.t('form-validate-field-mandatory'),
                pattern: {
                  value: /^[0-9 ]*$/,
                  message: i18n.t('phone-field-mandatory'),
                },
                maxLength: phoneLenghtRule,
                minLength: phoneLenghtRule,
              }}
              placeholder="000 000 000"
              phonePrefix={PREFIX_NUMBER}
              maxLength={INPUT_MAX_LENGTH + 2}
              customFunction={checkValidations}
            />

            <Button
              mt="spacing-l"
              label="Continuar"
              variant={isButtonEnabled ? "primary" : "disabled"}
              onPress={verifyPhone}
              marginBottom="spacing-m"
              disabled={!isButtonEnabled}
            />
          </Box>
        </Container>
      </HomeWrapper>
    </ThemeProvider>
  );
};
export default MtxVerifyPhone;
