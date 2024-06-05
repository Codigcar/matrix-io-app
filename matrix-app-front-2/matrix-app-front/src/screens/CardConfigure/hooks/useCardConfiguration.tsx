import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardConfigureServices from 'src/api/CardConfigureServices';
import { showToast, ToastType } from 'src/matrix-ui-components/components/toast';
import { navigationRef } from 'src/navigators/RootNavigation';
import {
    setCards, setLoadingForeign, setLoadingInternet, setLoadingPhysical, setLoadingVirtual,
    setRestrictionsCard, setStatusDeliveryPhysicalCard
} from 'src/store/states/cardStates';
import { NavigationPropsType } from 'src/types/types';
import { logCrashlytics } from 'src/utils/Analytics';
import {
    CARD_IS_INACTIVE, CARD_IS_OPEN, CARD_IS_STOLEN, CARD_REQUIRE_CHANGE_PIN, RESTRICTIONS_TYPES
} from 'src/utils/constants';
import { resetNavigation, resetNavigationToScreen } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';

import { string } from '../strings/string';
import { Card } from '../types/types';

const useCardConfiguration = (props: NavigationPropsType) => {
  const { navigation } = props;

  const cardsStore = useSelector((state: any) => state.cards?.cards);
  const restrictionsStore = useSelector((state: any) => state.cards?.restrictions);
  const loadingsStore = useSelector((state: any) => state.cards?.loadings);
  const statusDelivery = useSelector((state: any) => state.cards?.statusDeliveryPhysicalCard);
  const statusPhysicalCard = useSelector((state: any) => state.cards?.statusPhysicalCard);

  const isActive = (status: string) => status === CARD_IS_OPEN;

  const isPhysicalCard = (index: number) =>
    (index === 0 ? string.cardConfigurationVirtualCard : string.cardConfigurationPhysicalCard);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingRestrictions, setLoadingRestrictions] = useState<boolean>(false);
  const [times, setTimes] = useState<number>(0);
  const cardsList = useMemo(() => {
    const { length } = cardsStore ?? {};
    if (length === 1) {
      return [
        {
          id: cardsStore[0].id,
          label: string.configureCardDetail,
          type: 'card',
          status: cardsStore[0].status === CARD_IS_OPEN,
          isBlock: false,
          loading: loadingsStore.virtual,
        },
      ];
    }
    if (length > 1) {
      return [
        {
          id: cardsStore[0].id,
          label: string.configureCardDetail,
          type: 'card',
          status: cardsStore[0].status === CARD_IS_OPEN,
          isBlock: false,
          loading: loadingsStore.virtual,
        },
        {
          id: cardsStore[1].id,
          label: string.configureCard0Detail1,
          type: 'card',
          status: cardsStore[1].status === CARD_IS_OPEN,
          isBlock: cardsStore[1].status === CARD_IS_STOLEN,
          loading: loadingsStore.physical,
          requireChangePin: cardsStore[1].status === CARD_REQUIRE_CHANGE_PIN,
        },
      ];
    }
    return [
      {
        id: '0',
        label: string.configureCardDetail,
        type: 'card',
        status: false,
        isBlock: false,
        loading: false,
      },
    ];
  }, [loadingsStore, isLoading]);

  const restrictions = useMemo(() => {
    const { length } = restrictionsStore ?? {};

    if (length === 1) {
      return [
        {
          id: 0,
          label: string.configureCard1Detail0,
          type: 'card',
          restriction: RESTRICTIONS_TYPES.ecommerce,
          status: restrictionsStore[0] ? restrictionsStore[0].ecommerceEnabled : false,
          loading: loadingsStore.internet,
          isHiding: cardsStore[0]?.status !== CARD_IS_OPEN ?? false,
        },
      ];
    }
    if (length > 1) {
      return [
        {
          id: 0,
          label: string.configureCard1Detail0,
          type: 'card',
          restriction: RESTRICTIONS_TYPES.ecommerce,
          status: restrictionsStore[0] ? restrictionsStore[0].ecommerceEnabled : false,
          loading: loadingsStore.internet,
          isHiding: cardsStore[0]?.status !== CARD_IS_OPEN ?? false,
        },
        {
          id: 1,
          label: string.configureCard1Detail1,
          type: 'foreign',
          restriction: RESTRICTIONS_TYPES.foreign,
          status: restrictionsStore[1] ? restrictionsStore[1].foreignEnabled : false,
          loading: loadingsStore.foreign,
          isHiding: cardsStore[1]?.status !== CARD_IS_OPEN ?? false,
        },
      ];
    }
    return [
      {
        id: 0,
        label: string.configureCard1Detail0,
        type: 'card',
        restriction: RESTRICTIONS_TYPES.ecommerce,
        status: false,
        loading: false,
      },
    ];
  }, [loadingsStore, loadingRestrictions, isLoading]);
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => setShowModal(false);

  const dispatch = useDispatch();

  const goToGenericError = () =>
    navigation.navigate(navigationScreenNames.genericError, {
      nextScreen: navigationScreenNames.bottomTabNavigator,
    });

  const { getCards, getCardRestrictionsAll } = CardConfigureServices;

  useEffect(() => {
    const getCardsData = async () => {
      try {
        setIsLoading(true);
        const response = await getCards();
        if (response.length) dispatch(setCards({ cards: response }));
      } catch (error) {
        goToGenericError();
        logCrashlytics({
          scope: 'API',
          fileName: 'CardConfigure/hooks/useCardConfiguration.tsx',
          service: 'CardConfigureServices.getCards',
          error,
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getRestrictionsData = async () => {
      try {
        const afterReissuePhysicalCard = statusDelivery === 'PENDING' && isActive(statusPhysicalCard);
        if (
          !restrictionsStore?.length
          || cardsStore?.length !== restrictionsStore?.length
          || afterReissuePhysicalCard
        ) {
          setLoadingRestrictions(true);
          const restrictionsResponse = await getCardRestrictionsAll();
          dispatch(setRestrictionsCard({ restrictions: restrictionsResponse }));

          if (afterReissuePhysicalCard) {
            dispatch(setStatusDeliveryPhysicalCard({ statusDeliveryPhysicalCard: '' }));
          }
        } else {
          setLoadingRestrictions(false);
        }
      } catch (error) {
        goToGenericError();
        logCrashlytics({
          scope: 'API',
          fileName: 'CardConfigure/hooks/useCardConfiguration.tsx',
          service: 'CardConfigureServices.getCardRestrictionsAll',
          error,
        });
      } finally {
        setLoadingRestrictions(false);
      }
    };
    getCardsData();
    getRestrictionsData();
  }, []);

  const changeCardEnabled = async (cardId: string, isEnabled: boolean) => {
    const cardEnabledResponse = await CardConfigureServices.changeCardEnabled(cardId, isEnabled);
    return cardEnabledResponse;
  };

  const cardRestrictionsApply = async (cards: Card[], cardRestrictions: string) => {
    const idCard = cardRestrictions === RESTRICTIONS_TYPES.ecommerce ? cards[0].id : cards[1].id;
    const restrictionsToSend = cardRestrictions === RESTRICTIONS_TYPES.ecommerce
      ? [cardRestrictions, RESTRICTIONS_TYPES.foreign]
      : [cardRestrictions];
    const data = { items: [{ card: idCard, restrictions: restrictionsToSend }] };
    const cardRestrictionsResponse = await CardConfigureServices.cardRestrictionsApply(data);
    return cardRestrictionsResponse;
  };

  const cardRestrictionsRemove = async (cards: Card[], cardRestrictions: string) => {
    const idCard = cardRestrictions === RESTRICTIONS_TYPES.ecommerce ? cards[0].id : cards[1].id;
    const restrictionsToSend = cardRestrictions === RESTRICTIONS_TYPES.ecommerce
      ? [cardRestrictions, RESTRICTIONS_TYPES.foreign]
      : [cardRestrictions];
    const data = { items: [{ card: idCard, restrictions: restrictionsToSend }] };
    const cardRestrictionsResponse = await CardConfigureServices.cardRestrictionsRemove(data);
    return cardRestrictionsResponse;
  };

  const onPressBackArrow = () => {
    if (navigationRef.current?.canGoBack()) navigation.goBack();
    else resetNavigation(navigation, navigationScreenNames.bottomTabNavigator);
  };

  const onPressChangePin = () => {
    resetNavigationToScreen(navigation, [
      navigationScreenNames.bottomTabNavigator,
      navigationScreenNames.tabCard,
    ]);
  };

  const showError = (index: number) => {
    if (times <= 1) {
      showToast({
        type: ToastType.TypeWarning,
        title: isPhysicalCard(index),
        message: string.configureCardError01,
      });
      setTimes(times + 1);
    } else {
      showToast({
        type: ToastType.TypeWarning,
        title: isPhysicalCard(index),
        message: string.configureCardError02,
      });
      setTimes(0);
    }
  };

  const changeCard = async (idCard: string, index: number) => {
    if (idCard === '') {
      showToast({
        type: ToastType.TypeWarning,
        title: isPhysicalCard(index),
        message: string.noCard,
      });
      return;
    }

    const AuxList = cardsList.slice();
    const status = !AuxList[index]?.status;
    dispatch(
      index === 0
        ? setLoadingVirtual({
          virtual: true,
        })
        : setLoadingPhysical({
          physical: true,
        }),
    );

    try {
      await changeCardEnabled(idCard, status);
      if (status) cardsStore[index].status = CARD_IS_OPEN;
      else cardsStore[index].status = CARD_IS_INACTIVE;
      dispatch(
        setCards({
          cards: cardsStore.slice(),
        }),
      );
    } catch (error) {
      showError(index);
      logCrashlytics({
        scope: 'API',
        fileName: 'CardConfigure/hooks/useCardConfiguration.tsx',
        service: 'CardConfigureServices.changeCardEnabled',
        error,
      });
    } finally {
      dispatch(
        index === 0
          ? setLoadingVirtual({
            virtual: false,
          })
          : setLoadingPhysical({
            physical: false,
          }),
      );
    }
  };

  const changeRestriction = async (idRestriction: number, index: number) => {
    const isTypeForeign = restrictions[idRestriction].type === 'foreign';
    const AuxList = restrictions.slice();
    const statusRestriction = !AuxList[idRestriction].status;
    dispatch(
      idRestriction === 0
        ? setLoadingInternet({
          internet: true,
        })
        : setLoadingForeign({
          foreign: true,
        }),
    );
    try {
      if (!statusRestriction) {
        await cardRestrictionsApply(cardsList, restrictions[idRestriction].restriction);
      } else {
        await cardRestrictionsRemove(cardsList, restrictions[idRestriction].restriction);
      }
      if (!statusRestriction) {
        showToast({
          type: ToastType.TypeWarning,
          title: isPhysicalCard(index),
          message: isTypeForeign
            ? string.configureCardForeignDesactivated
            : string.configureCardInternetDesactivated,
        });
      } else {
        showToast({
          type: ToastType.TypeSuccess,
          title: isPhysicalCard(index),
          message: !isTypeForeign
            ? string.configureCardInternetActivated
            : string.configureCardForeignActivated,
        });
      }
      if (idRestriction === 0) {
        restrictionsStore[idRestriction].ecommerceEnabled = statusRestriction;
      }
      restrictionsStore[idRestriction].foreignEnabled = statusRestriction;
      dispatch(
        setRestrictionsCard({
          restrictions: restrictionsStore.slice(),
        }),
      );
    } catch (error) {
      showError(index);
      if (!statusRestriction) {
        logCrashlytics({
          scope: 'API',
          fileName: 'CardConfigure/hooks/useCardConfiguration.tsx',
          service: 'CardConfigureServices.cardRestrictionsApply',
          error,
        });
      } else {
        logCrashlytics({
          scope: 'API',
          fileName: 'CardConfigure/hooks/useCardConfiguration.tsx',
          service: 'CardConfigureServices.cardRestrictionsRemove',
          error,
        });
      }
    } finally {
      dispatch(
        idRestriction === 0
          ? setLoadingInternet({
            internet: false,
          })
          : setLoadingForeign({
            foreign: false,
          }),
      );
    }
  };

  return {
    onPressBackArrow,
    isLoading,
    cardsList,
    restrictions,
    changeRestriction,
    changeCard,
    loadingRestrictions,
    onPressChangePin,
    showModal,
    onCloseModal,
    isPhysicalCard,
  };
};

export default useCardConfiguration;
