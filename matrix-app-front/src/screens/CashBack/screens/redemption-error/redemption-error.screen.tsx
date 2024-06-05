import React, { useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  SafeAreaBox,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { useRedemptionErrorPresenter } from './redemption-error.presenter';
import RedemptionAnalytics from '../../analytics/redemption.analytics';

export const RedemptionError: React.FC = () => {
  const {
    Icon,
    title,
    subtitle,
    signOut,
    goToHome,
    errorBlocked,
    type
  } = useRedemptionErrorPresenter();

  useEffect(() => {
    RedemptionAnalytics.onFinishError(type);
  }, []);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} justifyContent="space-between" mx="spacing-m">
        <Box flex={1} alignItems="center" justifyContent="center" mt="spacing-ml" mx="spacing-m">
          <Icon width={RFValue(64)} height={RFValue(64)} />
        </Box>
        <Box flex={1} mx="spacing-m">
          <Text variant="Heading28Medium" textAlign="center">
            {title}
          </Text>
          <Text variant="SubTitle18Regular" mt="spacing-s" textAlign="center">
            {subtitle}
          </Text>
          {errorBlocked ? (
            <Text variant="body14Regular" mt="spacing-xxm" textAlign="center">
              {i18n.t('cashBack:redemptionError.detail-general-error-blocked')}
            </Text>
          )
            : (
              <Text variant="body14Regular" mt="spacing-xxm" textAlign="center">
                {i18n.t('cashBack:redemptionError.its-not-you')}
              </Text>
            )}
        </Box>
        <Box>
          {errorBlocked ? (
            <Button
              variant="primary"
              label={i18n.t('cashBack:redemptionError.finish')}
              onPress={signOut}
              mb="spacing-m"
              testID="understood-button"
            />
          )
            : (
              <Button
                variant="primary"
                label={i18n.t('cashBack:redemptionError.understood')}
                onPress={goToHome}
                mb="spacing-m"
                testID="understood-button"
              />
            )}

        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};
