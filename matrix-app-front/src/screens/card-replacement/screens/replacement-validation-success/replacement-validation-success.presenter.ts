import { useState } from 'react';
import { resetNavigation } from 'src/utils/navigationHandler';
import { useSelector } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useNavigation } from '@react-navigation/native';
import useReplacementValidationSuccessInteractor from './replacement-validation-success.interactor';

export const useReplacementValidationSuccessPresenter = () => {
  // States
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks
  const userData = useSelector((state: any) => state.session.user);
  const navigation = useNavigation();

  // Interactor
  const { executeGetCards, executeReplacementCardReissues } =
    useReplacementValidationSuccessInteractor();

  // Methods
  const onReplacement = async () => {
    setLoading(true);
    try {
      const myCards = await executeGetCards();
      await executeReplacementCardReissues(myCards[0].id);
      setLoading(false);
      resetNavigation(navigation, navigationScreenNames.cardReplacement.summaryOffer);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    onReplacement,
    userData,
    setLoading,
  };
};
