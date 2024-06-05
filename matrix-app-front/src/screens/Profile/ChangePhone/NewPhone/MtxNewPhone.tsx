import React from 'react';
// Components
import MtxInput from 'libs/ui-toolkit/components/mtx-input/MtxInput';
import HomeWrapper from 'src/screens/Home/components/HomeWrapper';
import { Box, Button, Container, Text, rebrandingTheme } from 'matrix-ui-components';
// Styles
import { ThemeProvider } from '@shopify/restyle';
import { Background } from 'assets/images';
// Utils
import useKeyboard from 'src/utils/hooks/useKeyboard';
import { INPUT_MAX_LENGTH, PREFIX_NUMBER } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from '../../../../types/types';
import usePhone from './hooks/useNewPhone';

const MtxConfirmPhone = (props: NavigationPropsType) => {
  const { isKeyboardVisible } = useKeyboard();
  const { control, onPressBackArrow, handleSubmit, phoneLenghtRule, verifyPhone } = usePhone(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <HomeWrapper>
        <Container
          withInput
          imageBackground={Background}
          isHeaderTransparent
          isHeaderVisible
          isScrollable
          goBackNavigate={onPressBackArrow}
        >
          <Box
            flex={1}
            mx="spacing-m"
            justifyContent={isKeyboardVisible ? 'flex-end' : 'space-between'}
            mt="spacing-xl"
          >
            <Box mb="spacing-m">
              <Text variant="Heading20Medium">{i18n.t('new-phone-title')}</Text>
            </Box>
            <MtxInput
              label={i18n.t('phone-label')}
              name="phone"
              keyboardType="phone-pad"
              control={control}
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
            />

            <Button
              mt="spacing-l"
              label="Continuar"
              variant="primary"
              onPress={() => {
                console.log('estoy en new phone');
                verifyPhone();
              }}
              marginBottom="spacing-m"
            />
          </Box>
        </Container>
      </HomeWrapper>
    </ThemeProvider>
  );
};
export default MtxConfirmPhone;
