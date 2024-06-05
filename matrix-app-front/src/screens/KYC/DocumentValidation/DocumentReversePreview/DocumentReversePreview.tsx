import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { Box, Button, Container, Divider, ImageBox, Text } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useDocumentReversePreview from './hooks/useDocumentReversePreview';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { BackgroundNew } from 'assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
const DocumentReverseReview = (props: NavigationPropsType) => {
  const { documentReverseUrl, handleCancelPress, handleContinuePress, isLoading } =
    useDocumentReversePreview(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Container
        goBackNavigate={handleCancelPress}
        imageBackground={BackgroundNew}
        isHeaderVisible={true}
      >
        <>
          <Box flex={1} alignItems={'center'}>
            <Divider height={10} />

            <Text my="spacing-l" variant="Heading" textAlign="center">
              {i18n.t('kyc-document-validation-reverse-preview-title')}
            </Text>

            <Box
              borderWidth={RFValue(8)}
              borderColor={'complementaryIndigo050'}
              borderRadius={RFValue(16)}
            >
              <ImageBox
                width={RFValue(277)}
                borderRadius={RFValue(8)}
                aspectRatio={8.5 / 5.5}
                alignSelf={'center'}
                overflow={'hidden'}
                source={{
                  uri: `file://${documentReverseUrl.crop}`,
                }}
                resizeMode={Platform.OS === 'ios' ? 'stretch' : 'cover'}
              />
            </Box>
            <Box width={RFValue(200)}>
              <Text my="spacing-m" variant="body" textAlign="center">
                {i18n.t('kyc-document-validation-reverse-preview-subtitle')}
              </Text>
            </Box>
          </Box>
          <Box
            width={RFValue(300)}
            flex={1}
            position={'absolute'}
            bottom={RFValue(50)}
            alignSelf={'center'}
          >
            <Button
              label={i18n.t('button-label-continue')}
              onPress={handleContinuePress}
              testID="StartButton"
            />

            <Divider height={16} />
            <Button
              variant={'secondary'}
              label={i18n.t('button-label-try-again')}
              onPress={handleCancelPress}
              testID="StartButton"
            />
          </Box>
          <LoadingIndicator isVisible={isLoading} />
        </>
      </Container>
    </ThemeProvider>
  );
};

export default DocumentReverseReview;
