import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Box, SafeAreaBox, Text, spacing, Button,
} from 'matrix-ui-components';
import LottieView from 'lottie-react-native';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import CheckSuccess from 'assets/lottie/ConfirmationCheck.json';
import { i18n } from 'src/utils/core/MTXStrings';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CARD_IS_OPEN } from 'src/utils/constants';
import { useSelector } from 'react-redux';

const ChangePinResponse = (props: NavigationPropsType) => {
  const { navigation } = props;
  const statusPhysicalCard = useSelector((state: any) => state.cards?.statusPhysicalCard);
  const isCardActive: boolean = statusPhysicalCard === CARD_IS_OPEN;

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" mb="spacing-l" justifyContent="space-between">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box
            width={spacing['spacing-ml']}
            height={spacing['spacing-ml']}
            mt="spacing-l"
            mb="spacing-l"
          >
            <LottieView source={CheckSuccess} autoPlay loop />
          </Box>
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-xm" mb="spacing-m">
            {i18n.t('change-pin.change-success.title')}
          </Text>
          <Text variant="SubTitle18Regular" textAlign="center">
            {i18n.t(
              !isCardActive
                ? 'change-pin.change-success.sub-title-after-activation'
                : 'change-pin.change-success.sub-title',
            )}
          </Text>
          <Text variant="body14Regular" textAlign="center" mt="spacing-xm">
            {i18n.t('change-pin.change-success.message')}
          </Text>
        </Box>
        <Button
          label={i18n.t('change-pin.change-success.submit')}
          onPress={() => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator)}
        />
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default ChangePinResponse;
