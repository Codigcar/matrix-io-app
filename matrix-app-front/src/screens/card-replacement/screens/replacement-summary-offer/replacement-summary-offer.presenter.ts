import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { setUserData } from 'src/store/states/sessionStates';
import { string } from '../../shared/strings/string';
import useReplacementSummaryOfferInteractor from './replacement-summary-offer.interactor';

export const useReplacementSummaryOfferPresenter = () => {
  // Constants
  const BENEFITS = [
    {
      title: string.cardOfferBenefitListFirstItemTitle,
    },
    {
      title: string.cardOfferBenefitListSecondItemTitle,
    },
    {
      title: string.cardOfferBenefitListThirdItemTitle,
    },
    {
      title: string.cardOfferBenefitListFourthItemTitle,
    },
  ];

  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Interactor
  const { executeGetOnboardingData } = useReplacementSummaryOfferInteractor();

  // Methods
  const setUser = useCallback(async () => {
    const response = await executeGetOnboardingData();
    const { name, lastName, documentNumber, location } = response.user;
    const accountId = response?.account?.id;
    const userDataPayload = {
      name,
      lastName,
      documentNumber,
      location,
      accountId,
    };
    dispatch(setUserData(userDataPayload));
  }, [dispatch, executeGetOnboardingData]);

  // Effects
  useEffect(() => {
    setUser();
  }, [setUser]);

  return {
    benefits: BENEFITS,
    navigation,
  };
};
