import React from 'react';
import { Box, Divider } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from 'src/matrix-ui-components/components/slider';
import { hp } from 'src/utils/sizes';
import { screenWidth } from 'src/utils/constants';
import FrontPage from 'src/matrix-ui-components/components/slider/FrontPage';
import useBenefitData from 'src/screens/Benefits/modules/benefit-details/benefit-details.presenter';
import BenefitsDetailsSkeleton from 'src/screens/Benefits/skeleton/BenefitsDetailsSkeleton';
import BenefitDetailsWrapper from 'src/screens/Benefits/components/BenefitDetailsWrapper';
import BenefitContent from 'src/screens/Benefits/components/BenefitContent';

const BenefitDetails: React.FC<NavigationPropsType> = (props) => {
  const {
    loading,
    SetSliderReadyToBeViewed,
    sliderReadyToBeViewed,
    coupon,
    listItemsOfSlider,
    navigation,
    onPressCopyCouponCode,
  } = useBenefitData(props);

  return (
    <BenefitDetailsWrapper navigation={navigation}>
      {(loading || !sliderReadyToBeViewed) && (
        <Box
          testID="skeleton"
          flexDirection="column"
          marginLeft="spacing-m"
          marginRight="spacing-m"
        >
          <Divider height={hp(2)} />
          <BenefitsDetailsSkeleton isVisible />
        </Box>
      )}
      <Divider height={RFValue(8)} />
      {listItemsOfSlider.length > 0 && (
        <Slider
          testID="slider-benefit-details"
          listItems={listItemsOfSlider}
          widthItemCustom={screenWidth - 54}
          ItemSlider={FrontPage}
          imageLoadEnd={SetSliderReadyToBeViewed}
        />
      )}
      {sliderReadyToBeViewed && (
        <BenefitContent coupon={coupon} handleCopyCoupon={onPressCopyCouponCode} />
      )}
    </BenefitDetailsWrapper>
  );
};

export default React.memo(BenefitDetails);
