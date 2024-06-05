import React from 'react';
import {
  Container, Box, Text, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { ThemeProvider } from '@shopify/restyle';
import { ConfirmationCheck } from 'assets/lottie';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LoadingModal from '../components/LoadingModal';
import useCardReplacement from '../hooks/useCardReplacement';

const ReplacementValidationSuccess = (propsNavigation: NavigationPropsType) => {
  const {
    loading, startReplacement, userData, setLoading,
  } = useCardReplacement(propsNavigation);
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container imageBackground={BackgroundNew}>
        <Box flex={1} my="spacing-xxl" mx="spacing-m" justifyContent="center" alignItems="center">
          <Box alignItems="center" mt="spacing-l" paddingTop="spacing-l" paddingBottom="spacing-s">
            <Box width={RFValue(68)} height={RFValue(68)}>
              <LottieView source={ConfirmationCheck} autoPlay loop />
            </Box>
          </Box>
          <Text
            my="spacing-xxs"
            mt="spacing-m"
            variant="Heading28Medium"
          >
            {i18n.t('CardReplacement.validation-success.title')}
          </Text>
          <Text
            mb="spacing-m"
            variant="Heading28Medium"
          >
            {`${userData.name}!`}
          </Text>
          <Text
            mt="spacing-sm"
            mx="spacing-m"
            variant="body"
            textAlign="center"
          >
            {i18n.t('CardReplacement.validation-success.continue-message')}
            <Text variant="Subtitle16Semibold">
              iO
            </Text>
          </Text>
          {loading && <LoadingModal isVisible={loading} />}
        </Box>
        <Button
          variant="primary"
          mx="spacing-m"
          mb="spacing-l"
          onPress={() => {
            setLoading(true);
            startReplacement();
          }}
          label={i18n.t('CardReplacement.validation-success.button')}
          disabled={false}
          justifyContent="space-around"
        />
      </Container>
    </ThemeProvider>
  );
};

export default ReplacementValidationSuccess;
