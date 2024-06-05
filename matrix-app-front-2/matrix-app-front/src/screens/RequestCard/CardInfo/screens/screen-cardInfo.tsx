import React from 'react';
import {
  Text, Box, SafeAreaBox, Container,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundNew } from 'assets/images';
import { fonts, rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { SafeAreaBottomTabScreen } from 'src/navigators/components/CustomTabBar';
import PhysicalCreditCard from 'assets/svgs/physical_credit_card.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { s } from 'src/utils/sizes';
import { CardPin } from 'assets/svgs';
import { TouchableOpacity } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { resetNavigationToScreen } from 'src/utils/navigationHandler';
import { CARD_IS_INACTIVE, CARD_IS_OPEN, CARD_REQUIRE_CHANGE_PIN, ios } from 'src/utils/constants';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import ChipStatus from '../components/ChipStatus';
import useChangePin from '../../ChangePin/hooks/useChangePin';
import ForgotPinModal from '../../components/ForgotPinModal';
import InactiveCardModal from '../../components/InactiveCardModal';
import ErrorChangePinSdkModal from '../../components/ErrorChangePinSdkModal';

export const CardInfo = (props: NavigationPropsType) => {
  const { navigation } = props;
  const statusPhysicalCard = useSelector((state: any) => state.cards?.statusPhysicalCard);
  const isActive = statusPhysicalCard === CARD_IS_OPEN;

  const {
    isLoading,
    changePin,
    setForgotPinVisible,
    forgotPinVisible,
    setInactivePhysicalCardModal,
    inactivePhysicalCardModal,
    i2cErrorModal,
    setI2cErrorModal,
    i2cHasErrorDisabled,
  } = useChangePin(props);

  const onPressGoConfigureCard = () => {
    setInactivePhysicalCardModal(false);
    resetNavigationToScreen(navigation, [navigationScreenNames.settingsStack]);
  };

  const labelStatus =
    statusPhysicalCard === CARD_IS_OPEN
      ? 'card-info.active'
      : statusPhysicalCard === CARD_IS_INACTIVE
      ? 'card-info.inactive'
      : 'card-info.pending-activate';

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container imageBackground={BackgroundNew}>
        <SafeAreaBox flex={1}>
          <SafeAreaBottomTabScreen>
            <Box
              flex={1}
              mx="spacing-m"
              pt={ios ? 'spacing-xxs' : 'spacing-l'}
              alignItems="center"
            >
              <PhysicalCreditCard width={RFValue(106)} height={RFValue(181)} />
              <Box mt="spacing-xs">
                <ChipStatus state={statusPhysicalCard} />
              </Box>
              <Text mt="spacing-xxm" mb="spacing-s" variant="Heading24Medium">
                {i18n.t('card-info.title')}
              </Text>
              <Text mb="spacing-s" variant="body13pxRegular" textAlign="center" mx="spacing-m">
                {i18n.t('card-info.description-1')}
                <Text
                  variant="body13pxRegular"
                  fontFamily={fonts.outfitMedium}
                  color={isActive ? 'FeedbackSuccess700' : 'FeedbackWarning600'}
                >
                  {i18n.t(labelStatus)}
                </Text>
              </Text>
              {statusPhysicalCard === CARD_REQUIRE_CHANGE_PIN ? (
                <Text mb="spacing-s" variant="body13pxRegular" mx="spacing-s" textAlign="center">
                  {i18n.t('card-info.message-pending-1')}
                  <Text variant="body13pxRegular" fontFamily={fonts.outfitSemibold}>
                    {i18n.t('card-info.message-pending-bold')}
                  </Text>
                  {i18n.t('card-info.message-pending-2')}
                </Text>
              ) : (
                <Text mb="spacing-s" variant="body13pxRegular" mx="spacing-xxxs" textAlign="center">
                  {i18n.t(isActive ? 'card-info.message-active' : 'card-info.message-inactive')}
                </Text>
              )}

              <TouchableOpacity
                disabled={i2cHasErrorDisabled}
                onPress={() => {
                  changePin();
                }}
              >
                <Box
                  mt="spacing-xxxs"
                  backgroundColor="primary100"
                  px="spacing-sm"
                  py="spacing-s"
                  borderRadius={s(20)}
                  flexDirection="row"
                  width="100%"
                >
                  <Box
                    backgroundColor="white"
                    opacity={i2cHasErrorDisabled ? 0.3 : 1}
                    width={s(40)}
                    height={s(40)}
                    borderRadius={8}
                    justifyContent="center"
                    alignItems="center"
                    marginRight="spacing-s"
                  >
                    <CardPin width={s(24)} height={s(24)} />
                  </Box>
                  <Box flexDirection="column" opacity={i2cHasErrorDisabled ? 0.3 : 1}>
                    <Text variant="body14Medium" mb="spacing-xxxxxs">
                      {i18n.t('card-info.change-pin.button-text')}
                    </Text>
                    <Text variant="body13Regular" color="primary500">
                      {i18n.t('card-info.change-pin.button-detail')}
                    </Text>
                  </Box>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setForgotPinVisible(true)}>
                <Box mt="spacing-xxs" mb="spacing-xxm" alignItems="flex-end">
                  <Text textAlign="right" variant="link">
                    {i18n.t('card-info.change-pin.forgot-pin-button')}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <ForgotPinModal
              isVisible={forgotPinVisible}
              cancelButton={() => setForgotPinVisible(false)}
            />
            <InactiveCardModal
              isVisible={inactivePhysicalCardModal}
              goConfigureButton={() => onPressGoConfigureCard()}
              cancelButton={() => setInactivePhysicalCardModal(false)}
              isVirtual={false}
            />
            <ErrorChangePinSdkModal
              afterActivate={false}
              isVisible={i2cErrorModal}
              cancelButton={() => setI2cErrorModal(false)}
            />
            <LoadingIndicator isVisible={isLoading} />
          </SafeAreaBottomTabScreen>
        </SafeAreaBox>
      </Container>
    </ThemeProvider>
  );
};
export default CardInfo;
