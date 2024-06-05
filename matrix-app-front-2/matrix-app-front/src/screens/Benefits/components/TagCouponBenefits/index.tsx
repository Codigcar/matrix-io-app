import * as React from 'react';
import { View } from 'react-native';
import { Text, Box, Divider } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import { android } from 'src/utils/constants';
import CouponEarShape from '../CouponEarShape';

interface TagCouponBenefitsProps {
  couponCode: string | undefined;
  dividerTop?: number;
  handleCopyCoupon: () => void;
}

const TagCouponBenefits = ({
  couponCode,
  dividerTop = 0,
  handleCopyCoupon,
}: TagCouponBenefitsProps) => {
  if (couponCode === '') return null;
  return (
    <Box>
      <Divider height={RFValue(dividerTop)} />
      <Box flexDirection="row" justifyContent="flex-start">
        <Box flex={1} flexDirection="row" alignItems="center" justifyContent="flex-start">
          <Box>
            <CouponEarShape />
          </Box>
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            borderRadius={1}
            borderColor="#8f8f8f"
            borderStyle="dotted"
            borderWidth={2.1}
            paddingTop={android ? 11.2 : 10.08}
            paddingBottom={android ? 11.2 : 10.08}
          >
            <Text
              textAlign="center"
              variant="Subtitle24SemiBold"
              numberOfLines={2}
              color="complementaryIndigo500"
              ml="spacing-s"
            >
              {couponCode}
            </Text>
            <Box width={15} />
            <Text
              testID="tag-coupon-benefits-button"
              variant="Link14Medium"
              color="primary800"
              textDecorationLine="underline"
              onPress={handleCopyCoupon}
              mr="spacing-s"
            >
              {i18n.t('benefits:coupon.clipboard')}
            </Text>
          </View>
          <Box transform={[{ rotate: '180deg' }]}>
            <CouponEarShape />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TagCouponBenefits;
