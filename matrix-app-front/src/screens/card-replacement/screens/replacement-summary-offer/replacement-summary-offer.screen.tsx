import React from 'react';
import { Container, Box, Text, fonts, Button, rebrandingTheme } from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ScrollView } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { ConfirmationCheck } from 'assets/lottie';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { string } from '../../shared/strings/string';
import { BenefitList } from './components/BenefitList/BenefitList';
import { useReplacementSummaryOfferPresenter } from './replacement-summary-offer.presenter';

export const ReplacementSummaryOfferScreen: React.FC = () => {
  const { benefits, navigation } = useReplacementSummaryOfferPresenter();
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
            <Text textAlign="center" mt="spacing-s" variant="Heading28Medium">
              {string.cardReplacementSummaryOfferCongrats}
            </Text>
            <Text
              m="spacing-xs"
              mb="spacing-s"
              paddingBottom="spacing-xxs"
              variant="body14Regular"
              textAlign="center"
              fontFamily={fonts.euclidCircularRegular}
            >
              {string.cardReplacementSummaryOfferSubtitle}
              <Text variant="body14Regular" fontFamily={fonts.euclidCircularSemibold}>
                iO.
              </Text>
            </Text>
            <BenefitList data={benefits} />
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
                {string.cardReplacementSummaryOfferFeedbackMessage}
              </Text>
            </Box>
          </ScrollView>
        </Box>
        <Button
          variant="primary"
          mx="spacing-m"
          mb="spacing-m"
          onPress={() => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator)}
          label={string.cardReplacementSummaryOfferGoHome}
          disabled={false}
        />
      </Container>
    </ThemeProvider>
  );
};
