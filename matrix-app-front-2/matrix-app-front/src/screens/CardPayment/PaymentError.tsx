import React from 'react';
import {
  Box,
  Text,
  Button,
  SafeAreaBox,
} from 'matrix-ui-components';

import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import { CheckDanger, CheckSuccess, CheckWarning } from 'assets/svgs';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { SvgProps } from 'react-native-svg';

type ActionType = {
  label?: string;
  nextScreen: string;
  params?: object;
};

type IParams = {
  title?: string;
  subtitle?: string;
  description?: string;
  type?: keyof typeof icons;
  primaryAction?: ActionType;
  secondaryAction?: ActionType;
};

const icons = {
  error: <CheckDanger />,
  warning: <CheckWarning />,
  success: <CheckSuccess />,
};

const PaymentError: React.FC<NavigationPropsType> = ({
  navigation: { navigate },
  route: { params },
}: NavigationPropsType) => {
  const {
    title = i18n.t('cardPayment.screen-error-title'),
    subtitle,
    description,
    type = 'error',
    primaryAction,
    secondaryAction,
  } = (params as IParams);

  const Icon = (props: SvgProps) => {
    const IconComponent = icons[type];
    return React.cloneElement(IconComponent, { ...props });
  };

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
                navigate(primaryAction.nextScreen, { ...primaryAction.params });
              }}
              mb="spacing-s"
            />
          ) : null}
          {secondaryAction ? (
            <Button
              variant="secondary"
              label={secondaryAction.label || i18n.t('cardPaymentError.go-start')}
              onPress={() => navigate(secondaryAction.nextScreen)}
              mb="spacing-s"
            />
          ) : null}
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default PaymentError;
