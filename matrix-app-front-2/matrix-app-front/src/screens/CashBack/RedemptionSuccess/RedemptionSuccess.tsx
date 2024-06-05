import React, { useCallback, useEffect } from 'react';
import { Box, Container, Text, Button, SafeAreaBox } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import LottieView from 'lottie-react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { RedemptionSuccessAnimation } from 'assets/lottie';
import { Calendar, Clock, Money, Wallet } from 'assets/svgs';
import { useDispatch } from 'react-redux';
import Animated, { ZoomIn } from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';
import SuccessfulRedemptionSound from 'assets/sound/successful_redemption_sound.mp3';
import { turnOffCashbackModal } from 'src/screens/Welcome/states/welcomeState';
import { hp, wp } from 'src/utils/sizes';
import { useRequestBalance } from 'src/screens/AccountStatus/hooks';
import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { BackHandler } from 'react-native';

type RedemptionSuccessProps = {
  date: string;
  hour: string;
  amountMoney: string;
  accountNumber: string;
  email: string;
};

type OperationRowsType = {
  icon: JSX.Element;
  field: keyof RedemptionSuccessProps;
  bold: boolean;
};

const operationRows: OperationRowsType[] = [
  {
    icon: <Calendar />,
    field: 'date',
    bold: false,
  },
  {
    icon: <Clock />,
    field: 'hour',
    bold: false,
  },
  {
    icon: <Money />,
    field: 'amountMoney',
    bold: true,
  },
  {
    icon: <Wallet />,
    field: 'accountNumber',
    bold: false,
  },
];

const DURATION_CARD = 300;
const DELAY_CARD = 100;
const AnimatedBox = Animated.createAnimatedComponent(Box);

const RedemptionSuccess: React.FC<NavigationPropsType> = ({ route }) => {
  const dispatch = useDispatch();
  const { getBalance } = useRequestBalance();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const params = route.params as RedemptionSuccessProps;
  const start = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: 'SuccessfulRedemptionSound',
      url: SuccessfulRedemptionSound,
    });
    await TrackPlayer.play();
  };

  const closeSoonModal = () => {
    dispatch(turnOffCashbackModal());
  };

  const handleNavigate = useCallback(() => {
    getBalance();
    closeSoonModal();
    navigation.dispatch(() =>
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: navigationScreenNames.bottomTabNavigator,
            state: {
              index: 0,
              routes: [
                {
                  name: navigationScreenNames.tabHome,
                },
              ],
            },
          },
        ],
      }));
  }, [navigation]);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    const backAction = () => {
      handleNavigate();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [handleNavigate]);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1}>
        <Container imageBackground="none" hasGradient={false} isScrollable>
          <Box flex={1} width={wp(100)} height={hp(25)}>
            <LottieView
              source={RedemptionSuccessAnimation}
              autoPlay
              loop
              resizeMode="cover"
              testID="lottieViewSuccess"
            />
          </Box>
          <AnimatedBox
            flex={1}
            px="spacing-m"
            justifyContent="space-between"
            entering={ZoomIn.duration(DURATION_CARD).delay(DELAY_CARD)}
          >
            <Box alignItems="center">
              <Text variant="Heading24SemiBold" mt="spacing-xs" mb="spacing-xs">
                {i18n.t('cashBack:redemptionSuccess.title')}
              </Text>
              <Text variant="Subtitle16pxMedium" mb="spacing-xxs">
                {i18n.t('cashBack:redemptionSuccess.sub-title')}
              </Text>
            </Box>
            <Box
              backgroundColor="complementaryOcean050"
              borderRadius={16}
              p="spacing-s"
              mb="spacing-xxs"
            >
              <Text
                variant="Subtitle16Semibold"
                ml="spacing-xxxxxs"
                mt="spacing-xxs"
                mb="spacing-s"
              >
                {i18n.t('cashBack:redemptionSuccess.box-title')}
              </Text>
              {operationRows.map((item) => (
                <Box key={item.field} flexDirection="row" alignItems="center" mb="spacing-xxs">
                  {item.icon}
                  <Box flexDirection="row" justifyContent="space-between">
                    <Text variant={item.bold ? 'body13SemiBold' : 'body13Regular'} ml="spacing-xs">
                      {params[item.field]}
                    </Text>
                    {item.field === 'accountNumber' ? (
                      <Box flex={1} alignItems="flex-end">
                        <Text color="primary500" variant="body13Regular" mr="spacing-m">
                          {i18n.t('cashBack:redemptionSuccess.description')}
                        </Text>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              flexDirection="row"
              backgroundColor="complementaryIndigo050"
              borderRadius={16}
              alignItems="center"
              px="spacing-m"
              py="spacing-s"
            >
              <Text variant="body13Medium" color="primary800">
                {i18n.t('cashBack:redemptionSuccess.notification')}
                <Text variant="body13Medium" color="complementaryIndigo600">
                  {i18n.t('cashBack:redemptionSuccess.notification-time')}
                </Text>
              </Text>
            </Box>

            <Button
              variant="primary"
              label={i18n.t('cashBack:redemptionSuccess.go-home')}
              onPress={handleNavigate}
              my="spacing-sm"
              testID="goToHome-button"
            />
          </AnimatedBox>
        </Container>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};
export default RedemptionSuccess;
