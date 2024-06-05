import React from 'react';
import {
  Box, Container, Text, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { NavigationPropsType } from 'src/types/types';
import { ThemeProvider } from '@shopify/restyle';
import LottieView from 'lottie-react-native';
import { ConfirmationCheck } from 'assets/lottie';
import { RFValue } from 'react-native-responsive-fontsize';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useChangePin from '../../ChangePin/hooks/useChangePin';
import ErrorChangePinSdkModal from '../../components/ErrorChangePinSdkModal';
import { string } from '../../shared/strings/string';

const ActivateCardResponseScreen = (props: NavigationPropsType) => {
  const { navigation } = props;
  const {
    i2cErrorModal, changePin, setI2cErrorModal, isLoading,
  } = useChangePin(props);
  const onPressGoHome = () => {
    setI2cErrorModal(false);
    resetNavigation(navigation, navigationScreenNames.bottomTabNavigator);
  };
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        isHeaderVisible={false}
        imageBackground={BackgroundNew}
        goBackNavigate={() => navigation.goBack()}
      >
        <Box
          mb="spacing-l"
          mt="spacing-xxl"
          alignItems="center"
          marginHorizontal="spacing-m"
          justifyContent="space-between"
          flex={1}
        >
          <Box width={RFValue(68)} height={RFValue(68)} mt="spacing-ml">
            <LottieView source={ConfirmationCheck} autoPlay loop />
          </Box>
          <Box alignItems="center">
            <Text variant="Heading32Medium" mt="spacing-xxxs">
              {string.activateCardResponseTitle}
            </Text>
            <Text my="spacing-s" variant="Subtitle18Regular" textAlign="center">
              {string.activateCardResponseSubtitle}
            </Text>
            <Text my="spacing-s" variant="body" textAlign="center">
              <Text
                my="spacing-s"
                variant="Subtitle14pxSemibold"
                lineHeight={RFValue(19.6)}
                textAlign="center"
              >
                {string.activateCardResponseMessageBold}
              </Text>
              {string.activateCardResponseMessage}
            </Text>
          </Box>
          <Button
            width="100%"
            variant="primary"
            onPress={() => {
              changePin();
            }}
            label={string.activateCardResponseSubmit}
          />
        </Box>
        <ErrorChangePinSdkModal
          afterActivate
          isVisible={i2cErrorModal}
          cancelButton={() => onPressGoHome()}
        />
        <LoadingIndicator isVisible={isLoading} />
      </Container>
    </ThemeProvider>
  );
};

export default ActivateCardResponseScreen;
