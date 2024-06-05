import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import {
  Box, Button, Container, colors, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { analyticsManagerProvider, AnalyticsProviderType, AFLoggerEvents } from 'src/shared/providers/analytics/index';
import { ThemeProvider } from '@shopify/restyle';
import { RFValue } from 'react-native-responsive-fontsize';
import { OrderStatusProps } from 'src/api/types/requestPhysicalCardTypes';
import { CardVertical, Drone, Lock } from 'assets/svgs';
import usePhysicalCardDeliveryStatus from '../hooks/usePhysicalCardDeliveryStatus';
import OrderStatusScreen from '../../OrderStatus/screens/OrderStatus';
import CardInfo from '../../CardInfo/screens/screen-cardInfo';
import Slider from '../../Slider/components/Slider';
import { string } from '../../shared/strings/string';

const slides = [
  {
    id: 'intro1',
    type: 'title',
    title: string.physicalCardFirstSlideTitle,
    text: string.physicalCardFirstSlideText,
    image: <CardVertical />,
  },
  {
    id: 'intro2',
    type: 'title',
    title: string.physicalCardSecondSlideTitle,
    text: string.physicalCardSecondSlideText,
    image: <Lock />,
  },
  {
    id: 'intro3',
    type: 'title',
    title: string.physicalCardThirdSlideTitle,
    text: string.physicalCardThirdSlideText,
    image: <Drone />,
  },
];

const LoadingView = (props = { testID: string }) => (
  <Box testID={props.testID} alignItems="center" justifyContent="center" flex={1}>
    <ActivityIndicator color={colors.primaryDark} size="large" />
  </Box>
);

const PhysicalCard: React.FC<NavigationPropsType> = (props) => {
  const {
    isLoading, navigation, hasProduct, deliveryData, isClosed, goToRequestPhysicalCard,
  } = usePhysicalCardDeliveryStatus(props);
  navigation.setOptions({ tabBarStyle: { display: isClosed ? 'flex' : 'none' } });

  useEffect(() => {
    analyticsManagerProvider.logEventWithType(
      {
        valor: 'tc fisica solicitud',
      },
      AnalyticsProviderType.appsFlyer,
      AFLoggerEvents.physicalCardShowed,
    );
  }, []);

  if (isLoading) return <LoadingView testID="loading-view" />;
  if (isClosed) return <CardInfo {...props} />;
  if (hasProduct) {
    return (
      <OrderStatusScreen
        navigation={navigation}
        deliveryData={deliveryData as OrderStatusProps}
        testID="order-status-screen"
      />
    );
  }

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        isHeaderVisible
        imageBackground={BackgroundNew}
        goBackNavigate={() => navigation.goBack()}
        headerTitle={string.physicalCardTitle}
      >
        <Box flex={1} alignItems="center" testID="slider">
          <Slider data={slides} />
        </Box>
        <Box position="absolute" bottom={RFValue(24)} width="100%" paddingHorizontal="spacing-m">
          <Button label={string.physicalCardButton} onPress={() => goToRequestPhysicalCard()} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PhysicalCard;
