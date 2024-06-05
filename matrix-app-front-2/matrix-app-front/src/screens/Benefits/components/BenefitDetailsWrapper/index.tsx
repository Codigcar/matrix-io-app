import React, { ReactNode, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { Container } from 'matrix-ui-components';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { BackgroundNew } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationType } from 'src/types/types';

type BenefitDetailsWrapperProps = {
  children?: ReactNode | undefined;
  navigation: NavigationType;
};

const BenefitDetailsWrapper: React.FC<BenefitDetailsWrapperProps> = ({
  children,
  navigation,
}) => {
  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        isHeaderVisible
        imageBackground={BackgroundNew}
        goBackNavigate={handleGoBack}
        isScrollable
        headerTitle={i18n.t('benefits:title')}
      >
        <SafeAreaView>{children}</SafeAreaView>
      </Container>
    </ThemeProvider>
  );
};

BenefitDetailsWrapper.defaultProps = {
  children: undefined,
};

export default BenefitDetailsWrapper;
