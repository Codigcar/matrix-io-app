import React from 'react';
import HomeFilled from 'assets/svgs/home-filled.svg';
import HomeOutlined from 'assets/svgs/home-outlined.svg';
import BenefitOutlined from 'assets/svgs/benefit-outlined.svg';
import BenefitFilled from 'assets/svgs/benefit-filled.svg';
import ChatFilled from 'assets/svgs/tag-user-filled.svg';
import ChatOutlined from 'assets/svgs/tag-user-outlined.svg';
import CardFilled from 'assets/svgs/card-filled.svg';
import CardOutlined from 'assets/svgs/card-outlined.svg';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import { MtxTabBarButtonTypeProps } from 'src/types/types';
import { Box, Text } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';

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
}: MtxTabBarButtonTypeProps) => {
  const Icon = icons[iconName][focused ? 'filled' : 'outlined'];
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Icon />
        <MtxDivider height={6} />
        <Text variant="body12" color={focused ? 'white' : 'primary600'}>{label}</Text>
      </Box>
    </ThemeProvider>
  );
};

export { TabBarButton };
export default TabBarButton;
