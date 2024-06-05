import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createRestyleComponent,
  spacing,
  spacingShorthand,
  SpacingProps,
  SpacingShorthandProps,
} from '@shopify/restyle';
import { Skeleton } from 'native-base';
import { Box } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { ApplePayBordered, GooglePayBordered, RefreshTwo } from 'assets/svgs';
import { Text } from '../text';
import { Theme } from '../../theme/themes';

const ButtonContainer = createRestyleComponent<
  SpacingShorthandProps<Theme> &
  SpacingProps<Theme> &
  React.ComponentProps<typeof TouchableOpacity>,
  Theme
>(
  [
    spacing,
    spacingShorthand,
  ],
  TouchableOpacity,
);

interface PaymentProps {
  testID?: string;
  payment?: 'apple-pay' | 'google-pay'
  label?: string
  title?: boolean
  isLoading?: boolean;
  isFailed?: boolean;
  retryMessage?: string;
}

type PaymentCardProps = Omit<React.ComponentProps<typeof ButtonContainer>, 'children'> & PaymentProps

export const PaymentCard: React.FC<PaymentCardProps> = ({
  title = true,
  isLoading,
  isFailed,
  payment = 'google-pay',
  label,
  retryMessage,
  ...rest
}) => {
  const renderStructure = (image: React.ReactNode, titleText: string) => (
    <>
      <Box height={32}>
        {image}
      </Box>
      <Box flex={1} ml="spacing-s">
        {title && (
          <Text variant="body14Medium">{titleText}</Text>
        )}
        {label && (
          <Text variant="body13Regular" color={payment === 'google-pay' ? 'primary500' : 'complementaryIndigo900'}>
            {label}
          </Text>
        )}
      </Box>
    </>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <Skeleton marginLeft="20px" marginRight="10px" width="40px" height="40px" borderRadius={15} />
          <Box testID='payment-card' flex={1} ml="spacing-s">
            {title && <Skeleton width="70%" height={18} borderRadius={2} marginBottom={1} />}
            {label && <Skeleton width="65%" height={18} borderRadius={2} />}
          </Box>
        </>
      );
    }

    if (isFailed) {
      return (
        <>
          <Box ml="spacing-s">
            <RefreshTwo />
          </Box>
          <Box flex={1} ml="spacing-xxm">
            <Text
            variant="body13pxRegular"
            color="primary800"
            numberOfLines={1}
          >
            {i18n.t('home-service-error')}
          </Text>
          <Text
            color="primary800"
            variant="body13pxRegular"
          >
            <Text variant="body13pxSemiBold" fontWeight="600" color="primary1000">
              {i18n.t('home-tap-refresh')}
            </Text>{i18n.t('home-tap-refresh-label')}.</Text>
          </Box>
        </>
      );
    }

    return (
      <>
        {payment === 'apple-pay' && renderStructure(<ApplePayBordered />, i18n.t('wallet:wallet-flow.pay-with-io-apple-pay'))}
        {payment === 'google-pay' && renderStructure(<GooglePayBordered />, i18n.t('wallet:wallet-flow.pay-with-io-google-pay'))}
      </>
    );
  };

  return (
    <ButtonContainer {...rest}>
      <Box
        borderRadius={32}
        backgroundColor="primary100"
        paddingHorizontal="spacing-sm"
        paddingVertical="spacing-sm"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        testID='payment-card'
      >
        {renderContent()}
      </Box>
    </ButtonContainer>
  );
};

PaymentCard.defaultProps = {
  label: undefined,
  title: true,
  isLoading: false,
  isFailed: false,
  payment: 'google-pay',
  retryMessage: '',
};

export default PaymentCard;
