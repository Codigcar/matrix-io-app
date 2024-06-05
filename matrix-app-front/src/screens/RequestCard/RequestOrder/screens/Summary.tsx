import React, { useEffect } from 'react';
import { analyticsManagerProvider, AnalyticsProviderType, AFLoggerEvents } from 'src/shared/providers/analytics/index';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { formatDate } from 'src/utils/date-time/date-time';
import { CommonActions } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { ConfirmationCheck } from 'assets/lottie';
import LottieView from 'lottie-react-native';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import Helpers from 'src/utils/Helpers';
import { ios } from 'src/utils/constants';
import {
  CalendarSummary,
  LocationSummary,
  PhoneSummary,
  ClockSummary,
  UserSquare,
} from 'assets/svgs/index';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { resetNavigation } from 'src/utils/navigationHandler';
import { string } from '../../shared/strings/string';

export const SumaryScreen: React.FC<NavigationPropsType> = (props) => {
  const {
    route: { params },
    navigation,
  } = props;

  const {
    date, inning, phone, address, name, onboarding,
  } = params;

  useEffect(() => {
    analyticsManagerProvider.logEventWithType(
      {
        valor: 'tc fisica adquirida',
      },
      AnalyticsProviderType.appsFlyer,
      AFLoggerEvents.physicalCardAcquired,
    );
  }, []);

  const goTo = () => {
    if (onboarding) {
      resetNavigation(navigation, navigationScreenNames.bottomTabNavigator);
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'BottomTabNavigator', state: { routes: [{ name: 'Card' }] } }],
        }),
      );
    }
  };
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container imageBackground={BackgroundNew} isHeaderVisible={false}>
        <Box
          flex={1}
          mt={ios ? 'spacing-xxm' : 'spacing-xxs'}
          mx="spacing-m"
          pb="spacing-s"
          justifyContent="space-evenly"
        >
          <Box>
            <Box alignItems="center">
              <Box mt="spacing-xm">
                <Box width={RFValue(68)} height={RFValue(68)}>
                  <LottieView source={ConfirmationCheck} autoPlay loop />
                </Box>
              </Box>
              <Text variant="H3" mt="spacing-sm">
                {string.requestCardSumaryTitle}
              </Text>
              <Text my="spacing-s" variant="body13pxRegular" textAlign="center">
                {string.requestCardumaryDescription}
              </Text>
            </Box>
            <Box
              mx="spacing-none"
              my="spacing-xs"
              px="spacing-m"
              borderRadius={RFValue(24)}
              py="spacing-sm"
              backgroundColor="complementaryPrimary100"
            >
              <Text mb="spacing-xxs" variant="Subtitle16Semibold">
                {string.requestCardSumarySubtitleUserData}
              </Text>
              <Box flexDirection="row" alignItems="center" my="spacing-xxxs" pr="spacing-s">
                <UserSquare width={RFValue(23)} height={RFValue(23)} />
                <Text paddingHorizontal="spacing-xxs" variant="body14Regular">
                  {Helpers.formatStringCamel(name)}
                </Text>
              </Box>
              <Box flexDirection="row" alignItems="center" my="spacing-xxxs" pr="spacing-s">
                <LocationSummary width={RFValue(23)} height={RFValue(23)} />
                <Box paddingHorizontal="spacing-xxs">
                  <Text numberOfLines={2} variant="body14Regular">
                    {address.address}
                  </Text>
                  <Text numberOfLines={2} variant="body14Regular">
                    {`${Helpers.formatStringCamel(
                      address.department.description,
                    )}, ${Helpers.formatStringCamel(
                      address.province.description,
                    )}, ${Helpers.formatStringCamel(address.district.description)}`}
                  </Text>
                </Box>
              </Box>
              <Box flexDirection="row" alignItems="center" my="spacing-xxxs">
                <PhoneSummary width={RFValue(23)} height={RFValue(23)} />
                <Text ml="spacing-xxs" variant="body14Regular">
                  {Helpers.formatPhone(phone)}
                </Text>
              </Box>
              <Text mt="spacing-sm" variant="Subtitle16Semibold" mb="spacing-xxs">
                {string.requestCardSumarySubtitleSchedule}
              </Text>
              <Box flexDirection="row" alignItems="center" my="spacing-xxxs">
                <CalendarSummary width={RFValue(23)} height={RFValue(23)} />
                <Text ml="spacing-xxs" variant="body14Regular">
                  {formatDate(date, 'dddd DD [de] MMMM YYYY')}
                </Text>
              </Box>
              <Box flexDirection="row" alignItems="center" mt="spacing-xxxs">
                <ClockSummary width={RFValue(23)} height={RFValue(23)} />
                <Text ml="spacing-xxs" variant="body14Regular">
                  {Helpers.formatTimeString(inning)}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <Button variant="primary" onPress={goTo} label={string.requestCardSumarySubmit} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default SumaryScreen;
