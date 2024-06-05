import React, { useEffect } from 'react';
import {
  Text,
  Button,
  Box,
  Card,
} from 'matrix-ui-components';
import { Warning, Error } from 'assets/svgs';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { string } from '../shared/strings/string';
import { testID as testIDFile } from '../shared/strings/testID';

interface IAlertProps {
  onClick?: () => void;
  type: string;
  testID?: string;
}

export const Alert = ({ onClick, type, testID }: IAlertProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      logVirtualEventAnalytics({
        seccion: 'Error',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Modal',
        valor: type === 'warning'
          ? string.cardOfferModalsWarningAuthorizationTitle
          : string.cardOfferModalsErrorAuthorizationTitle,
      });
    }
  }, [isFocused, type]);

  return (
    <Card marginHorizontal="spacing-m" borderRadius={RFValue(24)} testID={testID}>
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
            ? string.cardOfferModalsWarningAuthorizationTitle
            : string.cardOfferModalsErrorAuthorizationTitle}
        </Text>
        <Text variant="body14Regular" textAlign="center" marginTop="spacing-xs" marginBottom="spacing-s">
          {type === 'warning'
            ? string.cardOfferModalsWarningAuthorizationSubtitle
            : string.cardOfferModalsErrorAuthorizationSubtitle}
        </Text>
        <Button
          variant="primary"
          my="spacing-xxs"
          alignSelf="stretch"
          onPress={onClick}
          label={type === 'warning'
            ? string.cardOfferModalsWarningAuthorizationButton
            : string.cardOfferModalsErrorAuthorizationButton}
          analytics={{ seccion: 'Error' }}
          testID={testIDFile.buttonWarningId}
        />
      </Box>
    </Card>
  );
};

Alert.defaultProps = {
  onClick: undefined,
  testID: '',
};

export default Alert;
