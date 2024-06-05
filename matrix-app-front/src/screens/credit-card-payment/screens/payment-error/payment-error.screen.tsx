import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  Box,
  Text,
  Button,
  SafeAreaBox,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { usePaymentErrorPresenter } from './payment-error.presenter';

export const PaymentError: React.FC = () => {
  const navigation:any = useNavigation();
  const {
    Icon,
    title,
    subtitle,
    description,
    primaryAction,
    secondaryAction,
  } = usePaymentErrorPresenter();

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} justifyContent="space-between" mx="spacing-m">
        <Box flex={1} alignItems="center" justifyContent="center" mt="spacing-m" mx="spacing-m">
          <Icon width={RFValue(64)} height={RFValue(64)} />
        </Box>
        <Box flex={1} mx="spacing-xxm">
          <Text variant="Heading28Medium" textAlign="center">
            {title}
          </Text>
          {subtitle ? (
            <Text variant="SubTitle18Regular" mt="spacing-s" textAlign="center">
              {subtitle}
            </Text>
          ) : null}
          {description ? (
            <Text variant="body14Regular" mt="spacing-xxm" textAlign="center">
              {description}
            </Text>
          ) : null}
        </Box>
        <Box>
          {primaryAction ? (
            <Button
              variant="primary"
              label={primaryAction.label || i18n.t('cardPaymentError.try-again')}
              onPress={() => {
                navigation.navigate(primaryAction.nextScreen, { ...primaryAction.params });
              }}
              mb="spacing-s"
            />
          ) : null}
          {secondaryAction ? (
            <Button
              variant="secondary"
              label={secondaryAction.label || i18n.t('cardPaymentError.go-start')}
              onPress={() => navigation.navigate(secondaryAction.nextScreen)}
              mb="spacing-s"
            />
          ) : null}
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};
