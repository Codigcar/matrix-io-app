import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';

import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';

import useReferralCodeInteractor from './referral-code.interactor';

export const useReferralCodePresenter = (props: NavigationPropsType) => {
  const {
    navigation,
  } = props;
  const platform = Platform.OS !== 'android' ? 'ios' : 'android';
  const [referralCode, setReferralCde] = useState('');
  const { executeShareCode, executeCopyCode, executeGetReferralCode } = useReferralCodeInteractor();

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const onPressShareReferralCode = () => executeShareCode({
    title: i18n.t('referral-code.share.title'),
    message: i18n.t('referral-code.share.message', { referralCode, url: i18n.t('referral-code.url') }),
    url: i18n.t(`referral-code.share.url.${platform}`),
  });

  const onPressCopyReferralCode = () => executeCopyCode(referralCode);

  const onPressGoToTerms = () => Linking.openURL(i18n.t('referral-code.url'));

  const getReferralCode = () => {
    executeGetReferralCode().then((response) => {
      if (response) {
        setReferralCde(response?.code || '');
      }
    });
  };

  useEffect(() => {
    getReferralCode();
  }, []);

  return {
    referralCode,
    onPressBackArrow,
    onPressShareReferralCode,
    onPressCopyReferralCode,
    onPressGoToTerms,
  };
};

export default useReferralCodePresenter;
