import React, { useEffect, useRef } from 'react';
import {
  Box, Button, Text, rebrandingTheme,
} from 'matrix-ui-components';
import { Modalize } from 'react-native-modalize';
import { Dimensions, TouchableOpacity } from 'react-native';
import { CloseButton, WarningIcon } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { Portal } from 'react-native-portalize';
import { ThemeProvider } from '@shopify/restyle';
import Helpers from 'src/utils/Helpers';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';

type Props = {
  balance: number;
  accountCancelled: boolean;
  navigation: NavigationType;
};
const PositiveBalanceModal = ({ balance, accountCancelled, navigation }: Props) => {
  const modalizeRef = useRef<Modalize>();
  const { height } = Dimensions.get('window');
  const styleModal = { backgroundColor: '#151831CC' };
  return (
    <Portal>
      <ThemeProvider theme={rebrandingTheme}>
        <Modalize
          ref={modalizeRef}
          modalHeight={height * 0.6}
          withHandle={false}
          overlayStyle={styleModal}
        >
          <Box flex={1} p="spacing-m">
            <Box flexDirection="row" justifyContent="flex-end">
              <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
                <CloseButton />
              </TouchableOpacity>
            </Box>

            <Text mb="spacing-m" variant="Heading" fontWeight="bold">
              {i18n.t('cancelAccount:cancelAccount.modal-positive-bal.title')}
            </Text>
            <Text variant="label" mb="spacing-xm">
              <Text paddingHorizontal="spacing-xxs" mb="spacing-m" variant="SubTitle16">
                {i18n.t('cancelAccount:cancelAccount.modal-positive-bal.subtitle')}
              </Text>
            </Text>
            <Text
              paddingHorizontal="spacing-xxs"
              variant="body"
              fontWeight="bold"
              color="primary1000"
            >
              {i18n.t('cancelAccount:cancelAccount.modal-positive-bal.title-card')}
            </Text>
            <Box
              backgroundColor="primary100"
              borderRadius={RFValue(24)}
              mt="spacing-s"
              p="spacing-m"
            >
              <Box flexDirection="row" mr="spacing-l">
                <WarningIcon />
                <Text ml="spacing-s" variant="body" color="primary800">
                  {i18n.t('cancelAccount:cancelAccount.modal-positive-bal.subtitle-card')}
                </Text>
                <Text ml="spacing-s" fontWeight="bold" variant="body" color="primary800">
                  {Helpers.formatCurrency(balance, { removeDecimalsWhenRounded: true })}
                </Text>
              </Box>
            </Box>
            <Button
              variant="primary"
              my="spacing-m"
              onPress={() => {
                navigation.navigate(navigationScreenNames.tabSupport);
                modalizeRef.current?.close();
              }}
              label={i18n.t('cancelAccount:cancelAccount.modal-positive-bal.button')}
              justifyContent="space-around"
            />
          </Box>
        </Modalize>
      </ThemeProvider>
    </Portal>
  );
};

export default PositiveBalanceModal;
