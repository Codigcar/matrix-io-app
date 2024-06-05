import { Box } from 'matrix-ui-components';
import React from 'react';
import Pdf from 'react-native-pdf';
import { logCrashlytics } from 'src/utils/Analytics';
import LottieView from 'lottie-react-native';
import loadingSpin from 'assets/lottie/LoadingAnimation2.json';
import { screenHeight } from 'src/utils/constants';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { i18n } from 'src/utils/core/MTXStrings';
import { navigationRef } from 'src/navigators/RootNavigation';

const SimpleSpinner = () => {
  return (
    <Box
      position={'absolute'}
      zIndex={2}
      top={screenHeight / 2 - 130}
      width={40}
      height={40}
      alignSelf={'center'}
    >
      <LottieView source={loadingSpin} autoPlay loop />
    </Box>
  );
};

interface PDFViewerProps {
  url: string;
  cache?: boolean;
  onError?: Function;
}

export const PDFViewer = ({ url, cache = false, onError }: PDFViewerProps) => {
  const source = { uri: url, cache: cache };
  return (
    <Pdf
      enableAntialiasing
      renderActivityIndicator={() => <SimpleSpinner />}
      style={{ flex: 1 }}
      trustAllCerts={false}
      source={source}
      onError={(error) => {
        if (onError) {
          onError(error);
        } else {
          navigationRef.current?.goBack();
          showToast({ type: ToastType.Error, title: i18n.t('generic-error-load-pdf') });
        }
        logCrashlytics({
          scope: 'API',
          fileName: 'components/PDFViewer/PDFViewer.tsx',
          service: 'PDFViewer',
          error,
        });
      }}
    />
  );
};
