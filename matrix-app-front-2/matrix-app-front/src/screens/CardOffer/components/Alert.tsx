import React, { useEffect } from 'react';
import {
  Text,
  Button,
  Box,
  Card,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import Warning from 'assets/svgs/warning.svg';
import Error from 'assets/svgs/error.svg';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IAlertProps {
  onClick?: () => void;
  type: string;
}

export const Alert = ({ onClick, type }: IAlertProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      logVirtualEventAnalytics({
        seccion: 'Error',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Modal',
        valor: type === 'warning'
          ? i18n.t('card-offer-modals.warning-authorization-title')
          : i18n.t('card-offer-modals.error-authorization-title'),
      });
    }
  }, [isFocused, type]);

  return (
    <Card marginHorizontal="spacing-m" borderRadius={RFValue(24)}>
      <Box marginHorizontal="spacing-l" marginTop="spacing-m" marginBottom="spacing-xxs">
        <Box alignItems="center" marginBottom="spacing-m">
          {type === 'warning' ? <Warning /> : <Error />}
        </Box>
        <Text
          variant="Heading18Medium"
          textAlign="center"
          marginVertical="spacing-xxxs"
        >
          {type === 'warning'
            ? i18n.t('card-offer-modals.warning-authorization-title')
            : i18n.t('card-offer-modals.error-authorization-title')}
        </Text>
        <Text variant="body14Regular" textAlign="center" marginTop="spacing-xs" marginBottom="spacing-s">
          {type === 'warning'
            ? i18n.t('card-offer-modals.warning-authorization-subtitle')
            : i18n.t('card-offer-modals.error-authorization-subtitle')}
        </Text>
        <Button
          variant="primary"
          my="spacing-xxs"
          alignSelf="stretch"
          onPress={onClick}
          label={type === 'warning'
            ? i18n.t('card-offer-modals.warning-authorization-button')
            : i18n.t('card-offer-modals.error-authorization-button')}
          analytics={{ seccion: 'Error' }}
        />
      </Box>
    </Card>
  );
};

Alert.defaultProps = {
  onClick: undefined,
};

export default Alert;
