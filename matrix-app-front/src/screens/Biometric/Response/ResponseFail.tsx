import React from 'react';
import {
  Box,
  Text,
  Button,
  colors,
  fonts,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import { NavigationPropsType } from 'src/types/types';
import { BiometryTypes } from 'react-native-biometrics';

const ResponseFailScreen = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { type } = params;
  const onSubmit = () => navigation.goBack();
  const factorType = {
    iconName: type === BiometryTypes ? 'faceId' : 'touchId',
    message:
      type === BiometryTypes
        ? 'biometric-failed.face-id.message'
        : 'biometric-failed.touch-id.message',
  };
  return (
    <Box
      justifyContent="space-between"
      flex={1}
      backgroundColor="white"
      paddingHorizontal="spacing-m"
      pt="spacing-xl"
      pb="spacing-m"
    >
      <Box mt="spacing-xl">
        <Text
          textAlign="center"
          variant="SubTitle"
          fontFamily={fonts.euclidCircularSemibold}
          mb="spacing-m"
        >
          {i18n.t('biometric-failed.title')}
        </Text>
        <Text
          textAlign="center"
          variant="label"
          fontFamily={fonts.euclidCircularRegular}
          mb="spacing-m"
        >
          {i18n.t(factorType.message)}
        </Text>
        <Box alignItems="center" mb="spacing-s">
          <MtxIcon size="medium" strokeColor={colors.redError} name={factorType.iconName} />
        </Box>
      </Box>
      <Button
        label={i18n.t('biometric-failed.submit')}
        onPress={onSubmit}
        variant="primary"
        disabled={false}
      />
    </Box>
  );
};

export default ResponseFailScreen;
