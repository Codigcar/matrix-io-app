import { useEffect, useState } from 'react';
import { logCrashlytics } from 'src/utils/Analytics';
import { NavigationPropsType } from 'src/types/types';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import useBenefitDetailsInteractor from 'src/screens/Benefits/modules/benefit-details/benefit-details.interactor';
import { Benefit } from 'src/screens/Benefits/shared/interfaces/benefit-details.interfaces';

const useBenefitData = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const [benefit, setBenefit] = useState<Benefit>();
  const [loading, setLoading] = useState<boolean>(false);
  const [sliderReadyToBeViewed, SetSliderReadyToBeViewed] = useState(false);
  const [coupon, setCoupon] = useState<Benefit['coupons-detail']['coupon']>();
  const [listItemsOfSlider, setListItemsOfSlider] = useState<
    { image: string; benefit?: string; channel?: string }[]
  >([]);
  const benefitDetailsInteractor = useBenefitDetailsInteractor();

  useEffect(() => {
    const getBenefit = async () => {
      try {
        const dataBenefit = await benefitDetailsInteractor.executeObtainBenefit(route.params.id);
        setBenefit(dataBenefit);
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'Benefits/hooks/useBenefitsData.ts',
          service: 'getBenefits',
          error,
        });
      } finally {
        setLoading(false);
      }
    };

    getBenefit();
  }, [route.params.id]);

  useEffect(() => {
    if (benefit) {
      setCoupon(benefit['coupons-detail']?.coupon);
      setListItemsOfSlider([
        {
          image: DOCUMENTS_BASE_URL + (benefit['coupons-detail']?.coupon.imgPathInternal ?? ''),
          benefit: benefit['coupons-detail']?.coupon.benefit,
          channel: benefit['coupons-detail']?.coupon.channel,
        },
      ]);
    }
  }, [benefit]);

  const onPressCopyCouponCode = () => {
    benefitDetailsInteractor.executeCopyCode(coupon?.codeIO || '');
  };

  return {
    benefit,
    loading,
    navigation,
    SetSliderReadyToBeViewed,
    sliderReadyToBeViewed,
    coupon,
    listItemsOfSlider,
    onPressCopyCouponCode,
  };
};

export default useBenefitData;
