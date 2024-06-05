import {
  SpacingProps,
  SpacingShorthandProps,
  createRestyleComponent,
  spacing,
  spacingShorthand,
  useTheme,
} from '@shopify/restyle';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ReferralBannerPerson } from 'assets/images';
import { Box, Text, Theme } from 'src/matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { f, s, vs } from 'src/utils/sizes';

const REFERRALS_AMOUNT = 'S/ 20';

const ReferralBannerContainer = createRestyleComponent<
  SpacingShorthandProps<Theme> &
  SpacingProps<Theme> &
  React.ComponentProps<typeof TouchableOpacity>,
>(
  [
    spacing,
    spacingShorthand,
  ],
  TouchableOpacity,
);

interface ReferralBannerProps extends React.ComponentProps<typeof ReferralBannerContainer> {
  amount?: string;
  isLoading?: boolean;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ amount, isLoading, ...props }) => {
  const { colors } = useTheme();

  return (isLoading ? (
    <Box
      style={{ padding: 24 }}
      flexDirection="row"
      borderRadius={16}
      maxHeight={120}
      height="100%"
      backgroundColor="primary100"
      {...props}
    >
      <SkeletonPlaceholder enabled speed={800} backgroundColor={colors.primary000}>
        <SkeletonPlaceholder.Item opacity={0.6} flexDirection="column" justifyContent="center">
          <SkeletonPlaceholder.Item
            width={s(136)}
            height={vs(24)}
            borderRadius={vs(4)}
            marginBottom={vs(12)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item opacity={0.6} flexDirection="column" justifyContent="center">
          <SkeletonPlaceholder.Item
            width={s(132)}
            height={vs(16)}
            borderRadius={vs(4)}
            marginBottom={vs(8)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item opacity={0.6} flexDirection="column" justifyContent="center">
          <SkeletonPlaceholder.Item
            width={s(180)}
            height={vs(16)}
            borderRadius={vs(4)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>
  ) : (
    <ReferralBannerContainer {...props}>
      <Box position="absolute" width="100%" height="100%" top={0} maxHeight={120} backgroundColor="complementaryIndigo900" borderRadius={16}>
        <Box position="absolute" height="100%" top={0} right={16} width={144}>
          <ImageBackground source={ReferralBannerPerson} style={StyleSheet.absoluteFill} resizeMode="stretch" />
        </Box>
      </Box>
      <Box
        justifyContent="center"
        backgroundColor="transparent"
        alignItems="flex-start"
        borderRadius={16}
        maxHeight={120}
        style={{ padding: 24 }}
      >
        <Box style={{ marginBottom: 8 }}>
          <Text variant="Heading20pxMedium" color="primary000" fontSize={f(20)} lineHeight={f(24)}>
            {i18n.t('referral-banner.title')}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center" width={198}>
          <Text color="primary000" variant="body14Regular" fontSize={f(14)} lineHeight={f(19.6)}>
            {i18n.t('referral-banner.message-1')}
            {' '}
            <Text color="primary000" variant="body14SemiBold" fontSize={f(14)} lineHeight={f(19.6)}>{amount}</Text>
            {' '}
            {i18n.t('referral-banner.message-2')}
          </Text>
        </Box>
      </Box>
    </ReferralBannerContainer>
  ));
};

ReferralBanner.defaultProps = {
  amount: REFERRALS_AMOUNT,
  isLoading: false,
};

export default ReferralBanner;
