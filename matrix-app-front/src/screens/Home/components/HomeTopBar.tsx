import React from 'react';
import { View } from 'react-native';
import { Pressable } from 'native-base';
import { Box, Text } from 'matrix-ui-components';
import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';
import Photo from 'assets/svgs/photo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import NotificationCounter from 'src/screens/Notifications/screens/notification-counter/notification-counter.screen';
import styles from './styles/HomeTopBarStyle';
import useGetUserData from './hooks/useGetUserData';

const HomeTopBar = () => {
  const { userName } = useGetUserData();
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
      <NotificationCounter />
    </View>
  );
};
export default HomeTopBar;
