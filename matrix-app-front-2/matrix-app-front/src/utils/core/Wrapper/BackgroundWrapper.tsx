import React from 'react';
import { Box } from 'matrix-ui-components';
import Background from 'assets/svgs/background-2.svg';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import { BaseTheme, ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from 'src/utils/constants';

interface BackgroundWrapperPropsType {
  children?: React.ReactNode;
  theme?: BaseTheme;
}

const BackgroundWrapper: React.FC<BackgroundWrapperPropsType> = ({
  children,
  theme,
}) => (
  <>
    <CustomStatusBar theme="dark" />
    <Box
      style={StyleSheet.absoluteFill}
      backgroundColor="white"
    >
      <Background
        height={screenHeight}
        width={screenWidth}
        preserveAspectRatio="none"
        pointerEvents="none"
      />
    </Box>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </>
);

BackgroundWrapper.defaultProps = {
  children: undefined,
  theme: rebrandingTheme,
};

export default BackgroundWrapper;
