import React from 'react';
import { DniFrontCircle } from 'assets/images';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  Box,
  Container,
  Text,
  Button,
  ImageBox,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import Dotted from 'assets/svgs/dotted.svg';
import DniBackCircle from 'assets/svgs/dni-back-circle.svg';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useIntroductionDocumentScan from './hooks/useIntroductionDocumentScan';
import StepBox from './components/StepBox';

// Should be replaced when the svg is available
const DniFront = () => (
  <ImageBox width={RFValue(94)} height={RFValue(94)} source={DniFrontCircle} />
);
const DniBack = () => <DniBackCircle width={RFValue(94)} height={RFValue(94)} />;

const MtxIntroductionDocumentScan = (props: NavigationPropsType) => {
  const { onButtonPress } = useIntroductionDocumentScan(props);

  return (
    <BackgroundWrapper>
      <Container>
        <Box flex={1} marginHorizontal="spacing-m" justifyContent="flex-end">
          <Text variant="Heading24SemiBold" mb="spacing-xxxs">
            {i18n.t('kyc-document-validation-steps-heading-top')}
          </Text>
          <Text variant="Heading24Regular" pb="spacing-xxs">
            {i18n.t('kyc-document-validation-steps-title')}
          </Text>

          <Text mb="spacing-s" variant="body" color="black" lineHeight={19.6}>
            {i18n.t('kyc-document-validation-steps-description')}
          </Text>

          <Box
            padding="spacing-sm"
            backgroundColor="complementaryIndigo050"
            mt="spacing-xxs"
            mb="spacing-xxs"
            borderRadius={RFValue(16)}
          >
            <StepBox
              icon={DniFront}
              chipText={i18n.t('kyc-document-validation-steps-first-step-title')}
              descFirstText={i18n.t('kyc-document-validation-steps-step-text-left')}
              boldText={i18n.t('kyc-document-validation-steps-first-step-text-bold')}
              descSecondText={i18n.t('kyc-document-validation-steps-step-text-right')}
            />
            <Box flex={1} alignItems="center" margin="spacing-sm">
              <Dotted />
            </Box>

            <StepBox
              icon={DniBack}
              chipText={i18n.t('kyc-document-validation-steps-second-step-title')}
              descFirstText={i18n.t('kyc-document-validation-steps-step-text-left')}
              boldText={i18n.t('kyc-document-validation-steps-second-step-text-bold')}
              descSecondText={i18n.t('kyc-document-validation-steps-step-text-right')}
            />
          </Box>
          <Button
            label={i18n.t('button-label-start')}
            analytics={false}
            variant="primary"
            mt="spacing-m"
            mb="spacing-l"
            onPress={onButtonPress}
            testID="ContinueButton"
          />
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};

export default MtxIntroductionDocumentScan;
