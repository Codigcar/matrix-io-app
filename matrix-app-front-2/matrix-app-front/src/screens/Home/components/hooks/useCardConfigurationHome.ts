import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';
import { CardProps } from 'src/api/types/cardOperationsTypes';
import { NotificationContext } from 'src/store/states/notificationContext';
import { logCrashlytics } from 'src/utils/Analytics';
import {
  CARD_IS_STOLEN, CARD_REQUIRE_ACTIVATION, CARD_REQUIRE_CHANGE_PIN, STATUS_DELIVERY_ORDER,
} from 'src/utils/constants';
import { setStatusDeliveryPhysicalCard } from 'src/store/states/cardStates';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { getLastStatusDelivery } from 'src/api/PhysicalCardServices';
import { i18n } from 'src/utils/core/MTXStrings';

const accountState = (state: any) => state.session.accountState;

export default function useCardConfigurationHome() {
  const { updateCardTabBadge } = useContext(NotificationContext);
  const navigation = useNavigation();
  const disabledProp = useSelector(accountState) !== 'AVAILABLE';
  const dispatch = useDispatch();

  const statusVirtualCard = useSelector((state: any) => state.cards?.statusCard);

  const isBlockedCard = (status: string) => status === CARD_IS_STOLEN;
  const isIssued = (status: string) => status === CARD_REQUIRE_CHANGE_PIN;
  const requireActivation = statusVirtualCard === CARD_REQUIRE_ACTIVATION;

  const onPressCardConfigure = () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Inicio',
      subZona: 'Configuracion',
      seccion: 'Éxito',
      tipoEvento: 'Click',
      tipoElemento: 'Botón',
      valor: 'Configura tu tarjeta',
    }, AnalyticsProviderType.firebase, 'virtualEventApp33');
    if (requireActivation) {
      showToast({
        type: ToastType.TypeWarning,
        title: i18n.t('toastCardInactive.title'),
        message: i18n.t('toastCardInactive.message'),
      });
    } else {
      navigation.navigate(navigationScreenNames.settingsStack);
    }
  };

  const cards = useSelector((state: any) => state.cards?.cards);
  const statusDelivery = useSelector((state: any) => state.cards?.statusDeliveryPhysicalCard);

  useEffect(() => {
    const getBlockStatus = async () => {
      const cardLost = cards.filter((item: CardProps) => item.status === CARD_IS_STOLEN);
      if (cardLost.length >= 1) {
        if (statusDelivery === '') {
          try {
            const response = await getLastStatusDelivery();
            if (response.length) {
              dispatch(
                setStatusDeliveryPhysicalCard({ statusDeliveryPhysicalCard: response[0].status }),
              );
              if (response[0].status === STATUS_DELIVERY_ORDER.orderClosed) {
                updateCardTabBadge(true);
              } else updateCardTabBadge(false);
            }
          } catch (error) {
            logCrashlytics({
              scope: 'API',
              fileName: 'Home/components/hooks/useCardConfigurationHome.ts',
              service: 'getLastStatusDelivery',
              error,
            });
          }
        } else if (statusDelivery === STATUS_DELIVERY_ORDER.orderClosed) {
          updateCardTabBadge(true);
        } else {
          updateCardTabBadge(false);
        }
      }
    };
    updateCardTabBadge(false);
    if (cards?.length) getBlockStatus();
  }, [cards]);

  return {
    statusVirtualCard,
    onPressCardConfigure,
    disabledProp,
    cards,
    isBlockedCard,
    isIssued,
  };
}
