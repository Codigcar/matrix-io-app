import React, { useEffect } from 'react';
import {
  Container, Box, Text, fonts, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { BackgroundNew } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { onboardingData } from 'src/api/Onboarding';
import { useDispatch } from 'react-redux';
import { setUserData } from 'src/store/states/sessionStates';
import { ScrollView } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { ConfirmationCheck } from 'assets/lottie';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import BenefitList from './components/BenefitList';

const ReplacementValidationSuccess = (props: NavigationPropsType) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const setUser = async () => {
      const response = await onboardingData();
      if (response.user) {
        const {
          name, lastName, documentNumber, location,
        } = response.user;
        const accountId = response?.account?.id;
        const userDataPayload = {
          name,
          lastName,
          documentNumber,
          location,
          accountId,
        };
        dispatch(setUserData(userDataPayload));
      }
    };
    setUser();
  }, []);
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container imageBackground={BackgroundNew}>
        <Box flex={1} mx="spacing-m" mt="spacing-xl" justifyContent="center">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box alignItems="center" padding="spacing-xxxs">
              <Box width={RFValue(68)} height={RFValue(68)}>
                <LottieView source={ConfirmationCheck} autoPlay loop />
              </Box>
            </Box>
            <Text
              textAlign="center"
              mt="spacing-s"
              variant="Heading28Medium"
            >
              {i18n.t('CardReplacement.summary-offer.congrats')}
            </Text>
            <Text
              m="spacing-xs"
              mb="spacing-s"
              paddingBottom="spacing-xxs"
              variant="body14Regular"
              textAlign="center"
              fontFamily={fonts.euclidCircularRegular}
            >
              {i18n.t('CardReplacement.summary-offer.subtitle')}
              <Text variant="body14Regular" fontFamily={fonts.euclidCircularSemibold}>
                iO.
              </Text>
            </Text>
            <BenefitList />
            <Box
              backgroundColor="complementaryIndigo050"
              mt="spacing-m"
              borderRadius={16}
              paddingLeft="spacing-m"
              paddingRight="spacing-l"
              paddingVertical="spacing-xs"
            >
              <Text
                textAlign="justify"
                variant="label"
                fontFamily={fonts.euclidCircularRegular}
                color="complementaryIndigo900"
                fontSize={12.5}
                lineHeight={14}
              >
                {i18n.t('CardReplacement.summary-offer.feedback-message')}
              </Text>
            </Box>
          </ScrollView>
        </Box>
        <Button
          variant="primary"
          mx="spacing-m"
          mb="spacing-m"
          onPress={() => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator)}
          label={i18n.t('CardReplacement.summary-offer.go-home')}
          disabled={false}
        />
      </Container>
    </ThemeProvider>
  );
};

export default ReplacementValidationSuccess;
