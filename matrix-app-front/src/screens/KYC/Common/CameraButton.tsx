import React from 'react';
import Camera from 'assets/svgs/camera-btn.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityBox } from 'matrix-ui-components';

interface CameraButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

const CameraButton = ({ onPress, isLoading }: CameraButtonProps) => (
  <TouchableOpacityBox disabled={isLoading} onPress={onPress}>
    <Camera width={RFValue(64)} height={RFValue(64)} />
  </TouchableOpacityBox>
);

CameraButton.defaultProps = {
  isLoading: false,
};

export default CameraButton;
