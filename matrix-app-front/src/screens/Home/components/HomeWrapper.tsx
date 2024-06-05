import React, { ReactNode } from 'react';
import HomeBackgroundVersion2 from 'assets/svgs/background-home.svg';
import { Box } from 'matrix-ui-components';
import { Platform } from 'react-native';

type HomeWrapperProps = {
  children?: ReactNode | undefined;
};

const HomeWrapper: React.FC<HomeWrapperProps> = ({ children }) => (
  <Box flex={1} width="100%">
    <Box
      position="absolute"
      bottom={0}
      top={0}
      right={0}
      left={0}
      flex={1}
      height="100%"
      width="100%"
      overflow="hidden"
    >
      <Box
        style={{
          marginTop: Platform.select({
            ios: 0,
            android: -38,
          }),
        }}
      >
        <HomeBackgroundVersion2
          height="100%"
          width="100%"
          preserveAspectRatio="none"
          pointerEvents="none"
        />
      </Box>
    </Box>
    {children}
  </Box>
);

HomeWrapper.defaultProps = {
  children: undefined,
};

export default HomeWrapper;
