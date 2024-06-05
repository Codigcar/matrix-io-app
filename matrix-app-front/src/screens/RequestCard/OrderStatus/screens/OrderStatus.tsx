import React from 'react';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
import { OrderStatusType } from 'src/types/types';
import { ThemeProvider } from '@shopify/restyle';
import Helpers from 'src/utils/Helpers';
import { Drone } from 'assets/svgs';
import OrderSumary from '../../components/OrderSumary';
import InactiveCardModal from '../../components/InactiveCardModal';
import useOrderStatus from '../hooks/useOrderStatus';
import { string } from '../../shared/strings/string';

export const OrderStatusScreen: React.FC<OrderStatusType> = (props) => {
  const { testID } = props;
  const {
    navigation,
    date,
    address,
    addressLabel,
    phoneNumber,
    inning,
    name,
    inactiveVirtualCardModal,
    setInactiveVirtualCardModal,
    goToActivateCard,
    onPressGoConfigureCard,
  } = useOrderStatus(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        isHeaderVisible
        imageBackground={BackgroundNew}
        goBackNavigate={() => navigation.goBack()}
        headerTitle={string.physicalCardTitle}
      >
        <Box
          testID={testID}
          mb="spacing-s"
          alignItems="center"
          marginHorizontal="spacing-m"
          justifyContent="space-evenly"
          flex={1}
        >
          <Box alignItems="center">
            <Box>
              <Drone width={RFValue(160)} height={RFValue(150)} />
            </Box>
            <Text
              fontWeight="500"
              mt="spacing-xxs"
              mb="spacing-s"
              textAlign="center"
              variant="Heading24Medium"
              marginHorizontal="spacing-l"
              color="primary1000"
            >
              {string.physicalCardOrderStatusTitle}
            </Text>
          </Box>
          <Box
            backgroundColor="primary100"
            px="spacing-sm"
            pt="spacing-m"
            pb="spacing-s"
            borderColor="primaryLigth"
            mb="spacing-s"
            borderRadius={RFValue(24)}
            width="100%"
          >
            <OrderSumary
              name={Helpers.formatStringCamel(name)}
              date={date}
              hour={inning}
              address={address}
              addressLabel={addressLabel}
              phoneNumber={Helpers.formatPhone(phoneNumber)}
            />
          </Box>
          <Button
            width="100%"
            variant="primary"
            onPress={goToActivateCard}
            label={string.physicalCardOrderStatusButton}
          />
        </Box>
        <InactiveCardModal
          isVisible={inactiveVirtualCardModal}
          goConfigureButton={() => onPressGoConfigureCard()}
          cancelButton={() => setInactiveVirtualCardModal(false)}
          isVirtual
        />
      </Container>
    </ThemeProvider>
  );
};
export default OrderStatusScreen;
