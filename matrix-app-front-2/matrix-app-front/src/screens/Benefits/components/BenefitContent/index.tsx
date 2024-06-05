import React from 'react';
import { Text, Box, Divider } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { RFValue } from 'react-native-responsive-fontsize';
import TextToggleInDetails from 'src/screens/Benefits/components/TextToggleInDetails';
import PartnerInDetails from 'src/screens/Benefits/components/PartnerInDetails';
import LocationInDetails from 'src/screens/Benefits/components/LocationInDetails';
import CheckLinksInText from 'src/screens/Benefits/components/CheckLinksInText';
import SubTitleTextInDetails from 'src/screens/Benefits/components/SubTitleTextInDetails';
import TitleTextInDetails from 'src/screens/Benefits/components/TitleTextInDetails';
import TagCouponBenefits from 'src/screens/Benefits/components/TagCouponBenefits';

const BenefitContent = ({ coupon, handleCopyCoupon }: any) => (
  <Box marginLeft="spacing-m" marginRight="spacing-m">
    <TitleTextInDetails text={coupon?.offerTitle} />
    <Divider height={RFValue(16)} />
    <Box marginBottom="spacing-m">
      <SubTitleTextInDetails text={i18n.t('benefits:title')} />
      <Divider height={RFValue(8)} />
      <CheckLinksInText text={coupon?.benefitDetail} />
    </Box>
    <Box marginBottom="spacing-m">
      <SubTitleTextInDetails text={i18n.t('benefits:how-to-use')} />
      <Divider height={RFValue(8)} />
      <CheckLinksInText text={coupon?.benefitUse} />
      <TagCouponBenefits
        couponCode={coupon?.codeIO}
        dividerTop={14}
        handleCopyCoupon={handleCopyCoupon}
      />
    </Box>
    {coupon?.localAppliesDiscount && (
      <LocationInDetails localDiscounts={coupon?.localAppliesDiscount} />
    )}
    <Box marginBottom="spacing-m">
      <SubTitleTextInDetails text={i18n.t('benefits:effective-date')} />
      <Divider height={RFValue(8)} />
      <Text textAlign="left" variant="body13Regular" lineHeight={RFValue(17.5)} color="primary500">
        {coupon?.period}
      </Text>
    </Box>
    <PartnerInDetails
      imgPathLogo={coupon?.imgPathLogo}
      partnerName={coupon?.partnerName}
      category={coupon?.category}
    />
    <Box>
      <SubTitleTextInDetails text={i18n.t('benefits:terms-and-conditions')} />
      <Divider height={RFValue(8)} />
      <TextToggleInDetails text={coupon?.termsConditions} />
    </Box>
  </Box>
);

export default BenefitContent;
