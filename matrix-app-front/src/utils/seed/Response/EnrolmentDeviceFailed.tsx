import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  Box,
  Text,
  Button,
  Divider,
  SafeAreaBox,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { resetNavigation } from 'src/utils/navigationHandler';
import IcoBioMetria from 'assets/svgs/ico-biometria.svg';
import CheckWarning from 'assets/svgs/check-warning2.svg';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';

const EnrolmentDeviceFailed = (props: NavigationPropsType) => {
  const {
    navigation,
  } = props;
  const handlePress = () => resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" mb="spacing-l" justifyContent="space-between">
        <Box flex={1} maxWidth="80%" alignSelf="center" alignItems="center" justifyContent="center">
          <CheckWarning />
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-l" mb="spacing-s">
            {i18n.t('cardReplacement:validation-error.title')}
          </Text>
          <Text variant="SubTitle18Regular" textAlign="center">
            {i18n.t('cardReplacement:validation-error.subtitle')}
          </Text>
          <Divider height={RFValue(40)} />
          <IcoBioMetria width={100} height={115} />
          <Divider height={RFValue(40)} />
          <Text variant="body14Regular" textAlign="center">
            {i18n.t('cardReplacement:validation-error.message')}
          </Text>
        </Box>
        <Box position="absolute" bottom={RFValue(32)} width="100%" paddingHorizontal="spacing-s">
          <Button
            label={i18n.t('cardReplacement:validation-error.button')}
            onPress={handlePress}
          />
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default EnrolmentDeviceFailed;
