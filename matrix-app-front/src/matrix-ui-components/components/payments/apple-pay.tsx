import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import { Text } from '../text';
import PaymentButton from './payment-button';

type AnalyticsProps = {
  analytics?: boolean;
}
type ApplePayButtonProps = Omit<React.ComponentProps<typeof PaymentButton> & AnalyticsProps, 'children'>

export const ApplePayButton: React.FC<ApplePayButtonProps> = ({
  onPress,
  analytics,
  ...rest
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (analytics) {
      logVirtualEventAnalytics({
        tipoEvento: 'Click',
        tipoElemento: 'Boton',
        valor: 'Agregado con Apple Pay',
        ...(typeof analytics === 'object' ? analytics : {}),
      });
    }
    onPress?.(event);
  };

  return (
    <PaymentButton onPress={handlePress} testID='apple-pay' {...rest}>
      <Text variant="body14pxRegular" color="white" textAlign="center">
        {i18n.t('wallet:wallet-flow.pay-with-io-button-label')}
        {' '}
        {i18n.t('wallet:wallet-flow.pay-with-io-apple-pay')}
      </Text>
    </PaymentButton>
  );
};

ApplePayButton.defaultProps = {};

export default ApplePayButton;
