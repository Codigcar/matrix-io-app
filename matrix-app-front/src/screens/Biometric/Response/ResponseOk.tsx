import React from 'react';
import { Box, Text, Button, colors, fonts } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import { NavigationPropsType } from 'src/types/types';
import { BiometryTypes } from 'react-native-biometrics';

const ResponseOkScreen = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { type } = params;

  const onSubmit = () => navigation.goBack();
  const factorType = {
    iconName: type === BiometryTypes.FaceID ? 'faceIdOk' : 'touchIdOk',
    title:
      type === BiometryTypes.FaceID ? 'biometric-ok.face-id.title' : 'biometric-ok.touch-id.title',
    message:
      type === BiometryTypes.FaceID
        ? 'biometric-ok.face-id.message'
        : 'biometric-ok.touch-id.message',
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
          {i18n.t(factorType.title)}
          <Text variant="SubTitle" fontFamily={fonts.euclidCircularRegular} mb="spacing-m">
            {i18n.t('biometric-ok.subTitle')}
          </Text>
        </Text>
        <Box alignItems="center" mb="spacing-s">
          <MtxIcon size="medium" name={factorType.iconName} />
        </Box>
        <Text textAlign="center" variant="label" fontFamily={fonts.euclidCircularRegular}>
          {i18n.t(factorType.message)}
        </Text>
      </Box>
      <Box>
        <Box borderRadius={8} backgroundColor="secundaryDisable" padding="spacing-s" mb="spacing-m">
          <Text textAlign="center" variant="label" fontFamily={fonts.euclidCircularRegular}>
            {i18n.t('biometric-ok.feedback')}
          </Text>
        </Box>
        <Button
          label={i18n.t('biometric-ok.submit')}
          onPress={onSubmit}
          variant="primary"
          disabled={false}
        />
      </Box>
    </Box>
  );
};

export default ResponseOkScreen;
