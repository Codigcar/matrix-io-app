import React from 'react';
import { View } from 'react-native';
import { Pressable } from 'native-base';
import { Box, Text } from 'matrix-ui-components';
import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';
import useNotificationsCounter from 'src/screens/Notifications/Detail/hooks/useNotificationsCounter';
import Photo from 'assets/svgs/photo.svg';
import Notification from 'assets/svgs/notification.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import styles from './styles/HomeTopBarStyle';
import useGetUserData from './hooks/useGetUserData';

const HomeTopBar = () => {
  const { userName } = useGetUserData();
  const { notifications } = useNotificationsCounter();
  const navigation = useNavigation();

  const goToProfile = () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Inicio',
      subZona: 'VerPerfil',
      seccion: 'Éxito',
      tipoEvento: 'Click',
      tipoElemento: 'Botón',
      valor: 'Perfil',
    }, AnalyticsProviderType.firebase, 'virtualEventApp32');
    navigation.navigate(navigationScreenNames.profileStack, {
      screen: navigationScreenNames.myProfile,
    });
  };
  const goToNotification = () => navigation.navigate(navigationScreenNames.notificationStack);

  return (
    <View style={styles.container}>
      <Box flex={1}>
        <Pressable style={styles.titleContainer} onPress={goToProfile}>
          <Box width={RFValue(49)}>
            <Photo />
          </Box>
          <Box flex={1}>
            <Text
              ml="spacing-xs"
              variant="Heading"
              numberOfLines={2}
              color="primary1000"
              testID="user-name-label"
            >
              {userName}
            </Text>
          </Box>
        </Pressable>
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Pressable style={styles.iconButtonContainer} onPress={goToNotification}>
            {notifications > 0 && (
              <Box
                backgroundColor="errorMedium"
                borderRadius={50}
                position="absolute"
                left={20}
                top={0}
                zIndex={1}
                paddingHorizontal="spacing-xxxs"
                style={styles.badgeContainer}
              >
                <Text
                  color="white"
                  variant="label"
                  fontSize={RFValue(8.75)}
                  textAlign="center"
                  letterSpacing={0.5}
                  style={styles.badge}
                  lineHeight={RFValue(9.75)}
                >
                  {notifications > 99 ? '99+' : notifications}
                </Text>
              </Box>
            )}
            <Notification />
          </Pressable>
        </Box>
      </Box>
    </View>
  );
};
export default HomeTopBar;
