import React, { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { Box, Container, Text, Button, SafeAreaBox } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import LottieView from 'lottie-react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import { RFValue } from 'react-native-responsive-fontsize';
import { CommonActions } from '@react-navigation/native';
import CheckSuccess from 'assets/lottie/ConfirmationCheck.json';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { Calendar, Clock, Money, Card } from 'assets/svgs';
import Helpers from 'src/utils/Helpers';
import { useRequestBalance } from '../AccountStatus/hooks';

type PaymentSuccessProps = {
  date: string;
  hour: string;
  amountMoney: string;
  accountNumber: string;
  operationCode: string;
  email: string;
};

type OperationRowsType = {
  icon: JSX.Element;
  field: keyof PaymentSuccessProps;
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
    icon: <Card />,
    field: 'accountNumber',
    bold: false,
  },
];

const PaymentSuccess: React.FC<NavigationPropsType> = ({ navigation, route }) => {
  const params = route.params as PaymentSuccessProps;
  const { getBalance } = useRequestBalance();

  const handleNavigate = useCallback(() => {
    getBalance();
    navigation.dispatch((state: any) => {
      const BottomTabNavigatorRoute = state.routes.filter(
        (r: any) => r.name === navigationScreenNames.bottomTabNavigator,
      );

      const routes = [...BottomTabNavigatorRoute];
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }, [navigation]);

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
          <Box flex={1} px="spacing-s" justifyContent="space-between">
            <Box>
              <Box alignItems="center">
                <Box mt="spacing-l" mb="spacing-m" width={RFValue(68)} height={RFValue(68)}>
                  <LottieView source={CheckSuccess} autoPlay loop={false} />
                </Box>
                <Text variant="Heading28Medium" mt="spacing-xxxs" mb="spacing-s">
                  {i18n.t('paymentSuccess.title')}
                </Text>
                <Text variant="Subtitle18Regular" mb="spacing-xxm">
                  {i18n.t('paymentSuccess.sub-title')}
                </Text>
              </Box>
              <Box backgroundColor="primary100" borderRadius={16} p="spacing-m" mb="spacing-m">
                <Text variant="Subtitle16Semibold" mb="spacing-m">
                  {i18n.t('paymentSuccess.box-tittle')}
                </Text>
                {operationRows.map((item) => (
                  <Box key={item.field} flexDirection="row" alignItems="center" mb="spacing-s">
                    {item.icon}
                    <Text variant={item.bold ? 'body14SemiBold' : 'body14Regular'} ml="spacing-s">
                      {params[item.field]}
                    </Text>
                  </Box>
                ))}
                <Box flexDirection="row" justifyContent="space-between">
                  <Text variant="body14Regular" mr="spacing-xs">
                    {i18n.t('paymentSuccess.operation-code')}
                  </Text>
                  <Box flex={1} alignItems="flex-end">
                    <Text variant="body14SemiBold">
                      {Helpers.limitStartString(params.operationCode, 10)}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box
                backgroundColor="complementaryIndigo050"
                borderRadius={16}
                px="spacing-m"
                py="spacing-s"
              >
                <Text>
                  <Text variant="body14Regular">{i18n.t('paymentSuccess.email-sent')}</Text>
                  <Text>{' '}</Text>
                  <Text variant="body14Medium" color="complementaryIndigo600">
                    {i18n.t('paymentSuccess.email-sent-blue')}
                  </Text>
                </Text>
              </Box>
            </Box>
            <Button
              variant="primary"
              label={i18n.t('cardPayment.go-home')}
              onPress={handleNavigate}
              my="spacing-m"
            />
          </Box>
        </Container>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};
export default PaymentSuccess;
