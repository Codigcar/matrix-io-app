import React from 'react';
import LottieView from 'lottie-react-native';
import { SwitchLoad } from 'assets/lottie';
import { Box } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ios } from 'src/utils/constants';

type LoadingSwitchPropsType = {
  width?: number;
  height?: number;
};

const LoadingSwitch = ({ width, height }: LoadingSwitchPropsType) => (
  <Box
    width={width}
    height={height}
    alignSelf="center"
    justifyContent="center"
    borderRadius={RFValue(12)}
    backgroundColor="primary300"
  >
    <Box width={RFValue(24)} height={RFValue(14)} alignSelf="center" m="spacing-xxxxs">
      <LottieView source={SwitchLoad} autoPlay loop resizeMode={ios ? 'contain' : 'cover'} />
    </Box>
  </Box>
);

LoadingSwitch.defaultProps = {
  width: RFValue(38),
  height: RFValue(24),
};
export default LoadingSwitch;
