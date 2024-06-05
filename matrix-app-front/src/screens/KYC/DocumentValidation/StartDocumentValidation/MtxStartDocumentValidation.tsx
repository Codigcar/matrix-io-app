import React from 'react';
import { StatusBar, Image } from 'react-native';
import { Divider } from 'native-base';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { FeedbackSuccess } from 'assets/images';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import {
  Button, Text, Box, fonts,
} from 'matrix-ui-components';
import HomeWrapper from 'src/screens/Home/components/HomeWrapper';
import { RFValue } from 'react-native-responsive-fontsize';
import useStartDocumentValidation from './hooks/useStartDocumentValidation';

export const StartDocumentValidation = (props: NavigationPropsType) => {
  const { handlePressButton } = useStartDocumentValidation(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <HomeWrapper>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <Box flex={1} alignItems="center" justifyContent="center">
          <Image source={FeedbackSuccess} />

          <Divider my={7} thickness={0} />

          <Text
            fontFamily={fonts.robotoSerifMedium}
            fontSize={RFValue(28)}
            color="primaryDark"
            textAlign="center"
            variant="H2"
            fontWeight="500"
          >
            {i18n.t('kyc-document-validation-start-title')}
          </Text>

          <Divider my={2} thickness={0} />

          <Box maxWidth={200}>
            <Text
              fontSize={RFValue(18)}
              color="primary800"
              fontFamily={fonts.outfitRegular}
              textAlign="center"
              fontWeight="400"
              variant="Subtitle18Medium"
            >
              {i18n.t('kyc-document-validation-start-heading')}
            </Text>
          </Box>

          <Divider my={2} thickness={0} />

          <Box maxWidth="70%">
            <Text
              fontSize={RFValue(14)}
              color="primary800"
              fontFamily={fonts.outfitRegular}
              textAlign="center"
              lineHeight={RFValue(19.6)}
              letterSpacing={RFValue(0.16)}
            >
              {i18n.t('kyc-document-validation-start-text')}

              <Text fontFamily={fonts.outfitSemibold} fontSize={RFValue(14)}>
                {i18n.t('kyc-document-validation-start-text-bold')}
              </Text>
            </Text>
          </Box>

          <Box width="80%" position="absolute" bottom={32} alignItems="center">
            <Button
              label={i18n.t('enrollment-buton-validate-my-identity')}
              variant="primary"
              onPress={handlePressButton}
              testID="StartButton"
              width="100%"
            />
          </Box>
        </Box>
      </HomeWrapper>
    </ThemeProvider>
  );
};

export default StartDocumentValidation;
