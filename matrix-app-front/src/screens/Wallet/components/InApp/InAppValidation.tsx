import React from 'react';
import { Box, Button, ScrollBox, Text } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';

import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InAppCreditCard } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { useSelector } from 'react-redux';
import { NativeModules, Platform } from 'react-native';
import { wp } from 'src/utils/sizes';
import { android } from 'src/utils/constants';

const { InAppWalletModule } = NativeModules;

export const InAppValidation: React.FC<NavigationPropsType> = (props) => {
  const safeAreaInsets = useSafeAreaInsets();

  const inAppData = useSelector((state) => state.session.inAppData);

  const activateCard = async () => {
    console.log('Go card activation', inAppData);

    if (Platform.OS === 'android') {
      // 1. WalletConfigureServices.registerConsumerWithCard(objectCard);
      // 2. WalletConfigureServices.getWalletSdkToken(walletCardId); return accessToken
      // 3. const configurated = await ThalesD1.configure()
      // 4. const isLogin: boolean =  await loginThales(walletToken);
      // 5. ThalesD1.checkDigitizationStatus(cardId); (Opcional)
      // 6. await ThalesD1.activateDigitalCard(CARD_ID)
      // InAppWalletModule.sendResultToWalletApp('approved');
    } else {
      console.log('iOS Not implemented');
    }
  };

  const contentContainerStyle = {
    flexGrow: 1,
    justifyContent: 'flex-start',
  } as const;

  return (
    <BackgroundWrapper>
      <ScrollBox
        contentContainerStyle={contentContainerStyle}
        style={{ marginTop: safeAreaInsets.top }}
        keyboardShouldPersistTaps="handled"
      >
        <Box padding="spacing-m" flex={1} justifyContent="space-between">
          <Box alignSelf="center" mt="spacing-xl" alignItems="center">
            <Box>
              <InAppCreditCard />
            </Box>
            <Box mt="spacing-l" width={200} justifyContent="center" alignItems="center">
              <Text mb="spacing-sm" variant="Heading24Medium">
                {i18n.t('inApp:inApp.title')}
              </Text>
              <Text textAlign="center" variant="body14Regular">
                {android
                  ? i18n.t('inApp:inApp.descriptionGoogle')
                  : i18n.t('inApp:inApp.descriptionApple')}
              </Text>
            </Box>
          </Box>

          <Box>
            <Button
              onPress={activateCard}
              mb="spacing-m"
              variant="primary"
              testID="submit-login"
              label={i18n.t('inApp:inApp.btnActivar')}
            />
          </Box>
        </Box>
      </ScrollBox>
    </BackgroundWrapper>
  );
};
export default InAppValidation;
