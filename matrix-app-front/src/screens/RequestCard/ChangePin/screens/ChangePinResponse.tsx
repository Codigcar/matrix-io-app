import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Box, SafeAreaBox, Text, spacing, Button,
} from 'matrix-ui-components';
import LottieView from 'lottie-react-native';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import CheckSuccess from 'assets/lottie/ConfirmationCheck.json';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CARD_IS_OPEN } from 'src/utils/constants';
import { useSelector } from 'react-redux';
import { string } from '../../shared/strings/string';

const ChangePinResponse: React.FC<NavigationPropsType> = (props) => {
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
            <LottieView testID="lottie-view" source={CheckSuccess} autoPlay loop />
          </Box>
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-xm" mb="spacing-m">
            {string.changePinChangeSuccessTitle}
          </Text>
          <Text variant="SubTitle18Regular" textAlign="center">
            {!isCardActive
              ? string.changePinChangeSuccessSubTitleAfterActivation
              : string.changePinChangeSuccessSubTitle}
          </Text>
          <Text variant="body14Regular" textAlign="center" mt="spacing-xm">
            {string.changePinChangeSuccessMessage}
          </Text>
        </Box>
        <Button
          label={string.changePinChangeSuccessSubmit}
          onPress={() => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator)}
        />
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default ChangePinResponse;
