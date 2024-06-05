import React, { useEffect } from 'react';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import LottieView from 'lottie-react-native';
import loading from 'assets/lottie/LoadingAnimation2.json';
import { Box } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useModal } from 'src/store/states/modalsContext';

type LoadingIndicatorPropTypes = {
  isVisible: boolean;
};

export const LoadingIndicator = () => (
  <>
    <CustomStatusBar theme="dark" />
    <Box flex={1} alignItems="center" justifyContent="center" backgroundColor="blackWithOpacity">
      <Box height={RFValue(52)} width={RFValue(52)}>
        <LottieView source={loading} autoPlay loop />
      </Box>
    </Box>
  </>
);

const LoadingIndicatorModal = ({ isVisible }: LoadingIndicatorPropTypes) => {
  const { showLoading, stopLoading } = useModal();

  useEffect(() => {
    if (isVisible) {
      showLoading();
    } else {
      stopLoading();
    }
    return () => {
      stopLoading();
    };
  }, [isVisible, showLoading, stopLoading]);

  return (
    null
  );
};

export default LoadingIndicatorModal;
