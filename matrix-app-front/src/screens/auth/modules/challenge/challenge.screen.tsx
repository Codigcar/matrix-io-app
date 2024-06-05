import React from 'react';
import { Container, Box, rebrandingTheme } from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { ThemeProvider } from '@shopify/restyle';
import ReCaptchaV2Component from '../../components/ReCaptchaV2';
import useChallengePresenter from './challenge.presenter';
import { RecaptchaEnum } from '../../enums/recaptcha.enum';

export const ReCaptchaV2Screen = () => {
  const { isLoading, goBack, getRecaptchaSessionToken } = useChallengePresenter();

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container imageBackground={BackgroundNew} isHeaderVisible goBackNavigate={goBack}>
        <Box px="spacing-s" py="spacing-s" flex={2}>
          <ReCaptchaV2Component
            emitToken={async (token: string) => {
              if (token !== RecaptchaEnum.EXPIRED) {
                await getRecaptchaSessionToken(token);
              }
            }}
          />
        </Box>
        {isLoading && <LoadingIndicator isVisible={isLoading} />}
      </Container>
    </ThemeProvider>
  );
};
export default ReCaptchaV2Screen;
