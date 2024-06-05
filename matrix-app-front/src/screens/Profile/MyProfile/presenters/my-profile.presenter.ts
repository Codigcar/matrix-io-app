import RoutesEnum from 'src/shared/enums/routes/routes.enum';
import { getCachedRemoteConfigValue } from 'src/shared/providers/remote-config';
import { NavigationPropsType } from 'src/types/types';

export const useMyProfilePresenter = (props: NavigationPropsType) => {
  const { navigation } = props;
  const enableReferralCode = getCachedRemoteConfigValue('enableReferralCode').asBoolean() || false;

  const onPressBackArrow = () => navigation.goBack();

  const onPressGoToReferralCode = () =>
    navigation.navigate(RoutesEnum.REFERRAL_CODE);

  return {
    enableReferralCode,
    onPressBackArrow,
    onPressGoToReferralCode,
  };
};

export default useMyProfilePresenter;
