import React from 'react';
import HomeFilled from 'assets/svgs/home-filled.svg';
import HomeOutlined from 'assets/svgs/home-outlined.svg';
import BenefitOutlined from 'assets/svgs/benefit-outlined.svg';
import BenefitFilled from 'assets/svgs/benefit-filled.svg';
import ChatFilled from 'assets/svgs/tag-user-filled.svg';
import ChatOutlined from 'assets/svgs/tag-user-outlined.svg';
import CardFilled from 'assets/svgs/card-filled.svg';
import CardOutlined from 'assets/svgs/card-outlined.svg';
import InfoCircleAlert from 'assets/svgs/info-circle-fill-alert.svg';
import { Box, Text } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { TabBarButtonProps } from './types';

const icons = {
  home: {
    filled: HomeFilled,
    outlined: HomeOutlined,
  },
  benefit: {
    filled: BenefitFilled,
    outlined: BenefitOutlined,
  },
  chat: {
    filled: ChatFilled,
    outlined: ChatOutlined,
  },
  card: {
    filled: CardFilled,
    outlined: CardOutlined,
  },
};

const TabBarButton = ({
  focused,
  iconName,
  label,
  hasAlert,
}: TabBarButtonProps) => {
  const Icon = icons[iconName][focused ? 'filled' : 'outlined'];
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Box flex={1} alignItems="center" justifyContent="center">
        {hasAlert && (
          <Box position="absolute" top={10} zIndex={1} paddingLeft="spacing-xs">
            <InfoCircleAlert />
          </Box>
        )}
        <Icon />
        <Text mt="spacing-xxxxxs" variant="body12" color={focused ? 'white' : 'primary600'}>{label}</Text>
      </Box>
    </ThemeProvider>
  );
};

export { TabBarButton };
export default TabBarButton;
