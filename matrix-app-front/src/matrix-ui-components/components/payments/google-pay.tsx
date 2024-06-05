import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { GooglePayWhite } from 'assets/svgs';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { Box } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { PaymentButton } from './payment-button';
import { Text } from '../text';

type AnalyticsProps = {
  analytics?: boolean;
}
type GooglePayButtonProps = Omit<React.ComponentProps<typeof PaymentButton> & AnalyticsProps, 'children'>

export const GooglePayButton: React.FC<GooglePayButtonProps> = ({
  onPress,
  analytics,
  ...rest
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (analytics) {
      logVirtualEventAnalytics({
        tipoEvento: 'Click',
        tipoElemento: 'Boton',
        valor: 'Agregado con GPay',
        ...(typeof analytics === 'object' ? analytics : {}),
      });
    }
    onPress?.(event);
  };

  return (
    <PaymentButton onPress={handlePress} testID='google-pay' {...rest}>
      <Text variant="body14pxRegular" color="white" textAlign="center">
        {i18n.t('wallet:wallet-flow.pay-with-io-button-label')}
        <Box width={56}>
          <Box position="absolute" bottom={-4} left={8}>
            <GooglePayWhite />
          </Box>
        </Box>
      </Text>
    </PaymentButton>
  );
};

GooglePayButton.defaultProps = {};

export default GooglePayButton;
