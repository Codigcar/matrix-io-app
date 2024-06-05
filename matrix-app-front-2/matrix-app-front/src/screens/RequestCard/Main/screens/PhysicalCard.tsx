import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import {
  Box, Button, Container, colors, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import { analyticsManagerProvider, AnalyticsProviderType, AFLoggerEvents } from 'src/shared/providers/analytics/index';
import { ThemeProvider } from '@shopify/restyle';
import { RFValue } from 'react-native-responsive-fontsize';
import { OrderStatusProps } from 'src/api/types/requestPhysicalCardTypes';
import { CardVertical, Drone, Lock } from 'assets/svgs';
import usePhysicalCardDeliveryStatus from '../hooks/usePhysicalCardDeliveryStatus';
import OrderStatusScreen from '../../OrderStatus/screens/OrderStatus';
import CardInfo from '../../CardInfo/screens/screen-cardInfo';
import Slider from '../../Slider/components/Slider';

const slides = [
  {
    id: 'intro1',
    type: 'title',
    title: i18n.t('physical-card.first-slide-title'),
    text: i18n.t('physical-card.first-slide-text'),
    image: <CardVertical />,
  },
  {
    id: 'intro2',
    type: 'title',
    title: i18n.t('physical-card.second-slide-title'),
    text: i18n.t('physical-card.second-slide-text'),
    image: <Lock />,
  },
  {
    id: 'intro3',
    type: 'title',
    title: i18n.t('physical-card.third-slide-title'),
    text: i18n.t('physical-card.third-slide-text'),
    image: <Drone />,
  },
];

const LoadingView = () => (
  <Box alignItems="center" justifyContent="center" flex={1}>
    <ActivityIndicator color={colors.primaryDark} size="large" />
  </Box>
);

const PhysicalCard = (props: NavigationPropsType) => {
  const {
    isLoading,
    navigation,
    hasProduct,
    deliveryData,
    isClosed,
    goToRequestPhysicalCard,
  } = usePhysicalCardDeliveryStatus(props);
  navigation.setOptions({ tabBarStyle: { display: isClosed ? 'flex' : 'none' } });

  useEffect(() => {
    analyticsManagerProvider.logEventWithType({
      valor: 'tc fisica solicitud',
    }, AnalyticsProviderType.appsFlyer, AFLoggerEvents.physicalCardShowed);
  }, []);

  if (isLoading) return <LoadingView />;
  if (isClosed) return <CardInfo {...props} />;
  if (hasProduct) {
    return (
      <OrderStatusScreen navigation={navigation} deliveryData={deliveryData as OrderStatusProps} />
    );
  }

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        isHeaderVisible
        imageBackground={BackgroundNew}
        goBackNavigate={() => navigation.goBack()}
        headerTitle={i18n.t('physical-card.title')}
      >
        <Box flex={1} alignItems="center">
          <Slider data={slides} />
        </Box>
        <Box position="absolute" bottom={RFValue(24)} width="100%" paddingHorizontal="spacing-m">
          <Button
            label={i18n.t('physical-card.button')}
            onPress={() => goToRequestPhysicalCard()}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PhysicalCard;
