import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { ResponsiveValue } from '@shopify/restyle';
import {
  Box,
  fonts,
  Text,
  Theme,
} from 'matrix-ui-components';

import { BlackRefresh } from 'assets/svgs/index';
import { i18n } from 'src/utils/core/MTXStrings';

type ICardErrorRefresh = {
  colorText?: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  colorTextBold?: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  disabled?: boolean;
  icon?: ReactNode;
  onPress: () => void;
};

const CardErrorRefresh: React.FC<ICardErrorRefresh> = ({
  colorText,
  colorTextBold,
  disabled,
  icon,
  onPress,
}) => (
  <TouchableOpacity disabled={disabled} onPress={onPress} testID="card-error-refresh">
    <Box>
      <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
        <Box flex={1}>
          <BlackRefresh />
        </Box>
        {icon}
      </Box>
      <Box mt="spacing-xxxs">
        <>
          <Text
            variant="smallLabelCard"
            fontFamily={fonts.outfitRegular}
            color={colorText}
            numberOfLines={1}
          >
            {i18n.t('home-service-error')}
          </Text>
          <Text variant="smallLabelCard" fontFamily={fonts.outfitRegular} color={colorText}>
            <Text variant="smallLabelCard" fontWeight="bold" color={colorTextBold}>
              {i18n.t('home-tap-refresh')}
            </Text>
            {i18n.t('home-tap-refresh-label')}
          </Text>
        </>
      </Box>
    </Box>
  </TouchableOpacity>
);

CardErrorRefresh.defaultProps = {
  colorText: 'black',
  colorTextBold: 'black',
  disabled: false,
  icon: <Box />,
};

export default CardErrorRefresh;
