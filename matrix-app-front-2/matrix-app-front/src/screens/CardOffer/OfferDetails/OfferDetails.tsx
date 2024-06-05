import React, { useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
// Assets
import { i18n } from 'src/utils/core/MTXStrings';
// Types
import { NavigationPropsType } from 'src/types/types';
// Components
import {
  Text, Box, Container, CheckBox, Button,
} from 'matrix-ui-components';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { logCrashlytics } from 'src/utils/Analytics';
import { ThemeProvider } from '@shopify/restyle';
import { useChallenge } from 'src/components/Challenge';
import { ChallengeClosed } from 'src/components/Challenge/Challenge';
import { BackgroundAltScreen } from 'assets/svgs';
import BenefitList from './components/BenefitList';
// Hooks
import useCardOffer, { AlreadyWithOffer } from '../hooks/useCardOffer';
import { ProcessingModal } from '../modals/ProcessingModal';
import Load from '../components/Load';
import Alert from '../components/Alert';

const OfferDetails: React.FC<NavigationPropsType> = (props) => {
  const dataProtectionClause = true;
  const [termsConditionsContract, setTermsConditionsContract] = useState(false);
  const { waitForChallenge } = useChallenge();
  const {
    offer, loading, setLoading, submitCardContract, startPolling, name, summarySheet,
  } = useCardOffer(props);
  const [isButtonLoading, setIsLoading] = useState(false);

  const { navigation } = props;

  const onPressContinue = async () => {
    if (offer) {
      try {
        setIsLoading(true);
        if (isButtonLoading) return;
        await submitCardContract(
          offer.id,
          dataProtectionClause,
          offer.maxCreditLine,
        );
        setIsLoading(false);
        await waitForChallenge?.();
        setLoading({ type: 'loading', visible: true });
        startPolling();
      } catch (error) {
        setIsLoading(false);
        if (error instanceof AlreadyWithOffer) {
          navigation.navigate(navigationScreenNames.cardOfferComplete);
        } else if (!(error instanceof ChallengeClosed)) {
          logCrashlytics({
            scope: 'API',
            fileName: 'src/screens/CardOffer/OfferDetails/OfferDetails.tsx',
            service: 'onboardingData',
            error,
          });
          navigation.navigate(navigationScreenNames.genericError);
        }
      }
    }
  };

  const goToDocuments = () => {
    navigation.navigate('CardDocuments', {
      summarySheet,
    });
  };

  /** Function to format the username with the first letter in uppercase
   * @name: formatName
   * @param: {string} names - User's full name
   * @example: formatName(josue farfan) => Josue
   */
  const formatName = (names: String) => {
    try {
      if (names) { return names.split(' ')[0][0].toUpperCase() + names.split(' ')[0].slice(1).toLowerCase(); }
      return names;
    } catch {
      return '';
    }
  };

  const alertModal = () => {
    switch (loading.type) {
      case 'warning':
        return <Alert type={loading.type} onClick={onPressContinue} />;
      case 'error':
        return <Alert type={loading.type} onClick={() => setLoading({ visible: false })} />;
      default:
        return <Load type={loading.type || 'loading'} />;
    }
  };

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        background={BackgroundAltScreen}
        imageBackground="none"
        isScrollable
      >
        <SafeAreaView>
          <Box flex={1} mx="spacing-m" pt="spacing-xxxs" justifyContent="center">
            <Text
              textAlign="center"
              mt={Platform.OS === 'android' ? 'spacing-l' : 'spacing-s'}
              mb="spacing-xxxxs"
              variant="Heading18Regular"
            >
              <Text textAlign="center" variant="Heading18SemiBold">
                {`${formatName(name)}, `}
              </Text>
              {i18n.t('card-offer-title')}
              <Text variant="Heading18SemiBold">{i18n.t('app-name')}</Text>
              {i18n.t('card-offer-title-last')}
            </Text>
            <Text mt="spacing-xxxxs" textAlign="center" variant="Heading32SemiBold">
              {offer?.maxCreditLine ? `S/${offer?.maxCreditLine.toLocaleString('es-US')}` : ''}
            </Text>
            <Text
              mb="spacing-l"
              textAlign="center"
              variant="body12Medium"
              color="complementaryIndigo600"
            >
              {i18n.t('card-offer-amount-text')}
            </Text>

            <BenefitList offer={offer} />
            <Box>
              <CheckBox
                testID="btn-terms"
                onPress={() => {
                  setTermsConditionsContract(!termsConditionsContract);
                }}
                disabled={isButtonLoading}
                marginTop="spacing-m"
                isCheck={termsConditionsContract}
                marginRight="spacing-sm"
                alignItems="flex-start"
                analytics={{
                  valor: i18n.t('card-offer-contract-first-text'),
                }}
              >
                <Text
                  textAlign="left"
                  variant="body13Regular"
                  onPress={goToDocuments}
                  analytics={{
                    valor: i18n.t('card-offer-contract-link-text'),
                  }}
                >
                  {i18n.t('card-offer-contract-first-text')}
                  <Text
                    fontSize={RFValue(11.25)}
                    lineHeight={RFValue(16.15)}
                    variant="Link14Medium"
                    color="complementaryIndigo600"
                    textDecorationLine="underline"
                  >
                    {i18n.t('card-offer-contract-link-text')}
                  </Text>
                </Text>
              </CheckBox>
            </Box>
            <Button
              testID="btn-continue-get-offer"
              variant={termsConditionsContract && !isButtonLoading ? 'primary' : 'disabled'}
              my="spacing-m"
              onPress={onPressContinue}
              loading={isButtonLoading}
              label={i18n.t('card-offer-button-label')}
              disabled={!termsConditionsContract || isButtonLoading}
            />
          </Box>
        </SafeAreaView>
        <ProcessingModal isVisible={loading.visible}>{alertModal()}</ProcessingModal>
      </Container>
    </ThemeProvider>
  );
};

export default OfferDetails;
