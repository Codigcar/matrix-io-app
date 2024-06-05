import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  Box, Text, Button, SafeAreaBox,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { resetNavigation } from 'src/utils/navigationHandler';
import CheckWarning from 'assets/svgs/check-warning2.svg';
import CheckError from 'assets/svgs/check-error.svg';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { logout } from 'src/utils/auth/states/signInStates';
import { SignOut } from 'src/api/AuthServices';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';

const GenericError = (props: NavigationPropsType) => {
  const dispatch = useDispatch();
  const {
    navigation,
    route: { params },
  }: any = props;

  useEffect(() => {
    if (params?.logout) {
      navigation.setOptions({ gestureEnabled: false });
      dispatch(logout());
      SignOut();
    }
    const backListener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (params?.logout) {
        resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);
      }
      return true;
    });
    return () => backListener.remove();
  }, []);

  const handlePress = () => {
    if (params?.logout) {
      resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);
    } else if (params?.nextScreen) {
      resetNavigation(navigation, params.nextScreen);
    } else {
      navigation.goBack();
    }
  };

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" py="spacing-m">
        <Box flex={1} justifyContent="space-between">
          <Box
            mt="spacing-custom-l"
            maxWidth="100%"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
          >
            {params?.logout ? (
              <CheckError width={RFValue(68)} height={RFValue(68)} />
            ) : (
              <CheckWarning width={RFValue(68)} height={RFValue(68)} />
            )}
            <Text variant="Heading28pxMedium" textAlign="center" mt="spacing-xl">
              {params?.title || i18n.t('generic-error-title')}
            </Text>
            <Text variant="SubTitle18pxRegular" textAlign="center" mt="spacing-s">
              {params?.subtitle || i18n.t('generic-error-heading')}
            </Text>
            {params?.text && (
              <Text variant="body14pxRegular" textAlign="center" mt="spacing-xxm">
                {params?.text}
              </Text>
            )}
          </Box>
          <Box>
            <Button
              label={params?.buttonLabel || i18n.t('button-label-try-again')}
              onPress={handlePress}
              analytics={{
                seccion: 'Error',
              }}
            />
          </Box>
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default GenericError;
