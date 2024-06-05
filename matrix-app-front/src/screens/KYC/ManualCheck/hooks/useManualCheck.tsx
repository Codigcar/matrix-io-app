import React from 'react';
import { SvgProps } from 'react-native-svg';
import { NavigationPropsType } from 'src/types/types';
import DocumentFront from 'assets/svgs/document-front.svg';
import IcoBiometria from 'assets/svgs/ico-biometria.svg';
import { BackHandler } from 'react-native';

const useManualCheck = (props: NavigationPropsType) => {
  const { stack } = props.route.params;
  const messageFeedback = stack === 'liveness' ? 'manual-check.liveness-message' : 'manual-check.document-message';

  const closeApp = () => {
    BackHandler.exitApp();
    return true;
  };

  const FlowImage: React.FC<SvgProps> = (svgProps) => {
    if (stack === 'liveness') {
      return <IcoBiometria {...svgProps} />;
    }
    return <DocumentFront {...svgProps} />;
  };

  return {
    messageFeedback,
    FlowImage,
    closeApp,
  };
};

export default useManualCheck;
