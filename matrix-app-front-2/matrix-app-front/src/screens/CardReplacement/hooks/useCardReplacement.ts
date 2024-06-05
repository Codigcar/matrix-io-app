import { useState } from 'react';
import { logCrashlytics } from 'src/utils/Analytics';
import CardServices from 'src/api/CardOfferServices';
import { NavigationPropsType } from 'src/types/types';
import { resetNavigation } from 'src/utils/navigationHandler';
import { useSelector } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';

export const useCardReplacement = (props: NavigationPropsType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { getCards, replacementCardReissues } = CardServices;
  const { navigation } = props;
  const userData = useSelector((state: any) => state.session.user);

  const startReplacement = async () => {
    setLoading(true);
    try {
      const { data: myCards } = await getCards();
      await replacementCardReissues(myCards[0].id);
      setLoading(false);
      resetNavigation(
        navigation,
        navigationScreenNames.cardReplacement.summaryOffer,
      );
    } catch (error) {
      setLoading(false);
      logCrashlytics({
        scope: 'API',
        fileName: 'CardReplacement/hooks/useCardReplacement.tsx',
        service: 'replacementCardReissues',
        error,
      });
    }
  };

  return {
    loading,
    setLoading,
    startReplacement,
    userData,
  };
};
export default useCardReplacement;
