import React from 'react';

import { BackgroundAltScreen, ReferralGift } from 'assets/svgs';
import {
  Box,
  Container,
  Button,
  Text,
  fonts,
} from 'src/matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';

import useNewPasswordPresenter from './referral-code.presenter';

export const ReferralCodeScreen: React.FC<NavigationPropsType> = (props) => {
  const {
    referralCode,
    onPressBackArrow,
    onPressShareReferralCode,
    onPressCopyReferralCode,
    onPressGoToTerms,
  } = useNewPasswordPresenter(props);

  return (
    <BackgroundWrapper>
      <Container
        background={BackgroundAltScreen}
        isScrollable
        headerTitle={i18n.t('referral-code.title')}
        isHeaderTransparent
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
      >
        <Box paddingHorizontal="spacing-m" alignItems="center">
          <Text mb="spacing-m" mt="spacing-l" variant="Heading24pxMedium" color="black" textAlign="center">
            {i18n.t('referral-code.title-page')}
          </Text>

          <Box mb="spacing-m" pb="spacing-s" width={320}>
            <Text color="primary800" textAlign="center" variant="body14Regular">
              {i18n.t('referral-code.message-1')}
              {' '}
              <Text color="primary800" textAlign="center" variant="body14SemiBold">
                {i18n.t('referral-code.amount')}
              </Text>
              {'\n'}
              {i18n.t('referral-code.message-2')}
              {' '}
              <Text color="primary800" textAlign="center" variant="body14SemiBold">
                {i18n.t('referral-code.io')}
              </Text>
              {'\n'}
              {i18n.t('referral-code.message-3')}
              {' '}
              <Text variant="Link14MediumBlue" onPress={onPressGoToTerms}>
                {i18n.t('referral-code.link')}
              </Text>
            </Text>
          </Box>

          <Box mb="spacing-l">
            <ReferralGift />
          </Box>

          <Text variant="body14Regular" color="primary800" textAlign="center" mb="spacing-s">
            {i18n.t('referral-code.extra-message')}
          </Text>
          <Box
            mb="spacing-m"
            p="spacing-s"
            backgroundColor="complementaryOcean050"
            borderColor="complementaryOcean600"
            borderStyle="dashed"
            borderWidth={1}
            borderRadius={48}
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontSize={28}
              lineHeight={33.6}
              letterSpacing={0.16}
              fontFamily={fonts.outfitBold}
              fontWeight="600"
              textAlign="center"
              color="complementaryOcean900"
              onPress={onPressCopyReferralCode}
            >
              {referralCode}
            </Text>
            <Box position="absolute" right={26}>
              <Text variant="Link14Medium" color="primary800" textDecorationLine="underline" onPress={onPressCopyReferralCode}>
                {i18n.t('referral-code.clipboard')}
              </Text>
            </Box>
          </Box>

          <Box width="100%">
            <Button
              variant="primary"
              onPress={onPressShareReferralCode}
              label={i18n.t('referral-code.button')}
            />
          </Box>
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};

export default ReferralCodeScreen;
