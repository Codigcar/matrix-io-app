import React from 'react';
import {
  LogoAmex, LogoDinersClub, LogoMastercard, LogoVisa, Card,
} from 'assets/svgs';
import { SvgProps } from 'react-native-svg';
import { showToast, ToastType } from 'src/matrix-ui-components/components/toast';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  IPaymentMethod,
  IPaymentMethodRequest,
} from 'src/core/modules/credit-card/payment-method/dtos';
import { useAppDispatch } from 'src/core/libraries-implementation/state-manager/dispatch';
import {
  setPaymentMethodError,
  setLoadingPaymentMethod,
  setCardsPaymentMethods,
  setAllPaymentMethods,
  setAllCardsPaymentMethods,
  setPaymentMethods,
  deletePaymentMethodFinish,
  setIsLoadingDeletePaymentMethod,
  setPaymentCardSuccess,
  initialPaymentMethodError,
} from 'src/core/libraries-implementation/state-manager/states';
import { usePaymentMethodSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import { usePaymentMethodInteractor } from '../../interactors/payment-method/payment-method.interactor';
import { CardIconMap, CardType } from '../../types';

export const useMethodPayments = () => {
  const {
    executeSetPaymentMethod,
    executeDeletePaymentMethod,
    executeGetPaymentMethods,
  } = usePaymentMethodInteractor();

  const dispatch = useAppDispatch();
  const { paymentMethods, cardsPaymentMethods } = usePaymentMethodSelectors();

  const formatCardDataWithIcons = (data: IPaymentMethod[]): CardType[] => {
    const cardIcons: CardIconMap = {
      Visa: (props: SvgProps) => <LogoVisa {...props} />,
      MasterCard: (props: SvgProps) => <LogoMastercard {...props} />,
      Diners: (props: SvgProps) => <LogoDinersClub {...props} />,
      Amex: (props: SvgProps) => <LogoAmex {...props} />,
      default: (props: SvgProps) => <Card {...props} />,
    };

    return data.length > 0
      ? data.map((card: IPaymentMethod) => {
        const cardIconKey = Object.keys(cardIcons).includes(card.brand) ? card.brand : 'default';
        const cardIcon = cardIcons[cardIconKey as keyof CardIconMap];
        const cardType = card.type === 'creditcard' ? 'Tarjeta de Crédito' : 'Tarjeta de Débito';

        return {
          cardId: card.id,
          cardNumber: `${card.brand} **** ${card.alias}`,
          cardType,
          cardIcon,
          provider: card.provider,
        };
      })
      : [];
  };

  const getPaymentMethods = async () => {
    dispatch(setLoadingPaymentMethod(true));
    try {
      const response = await executeGetPaymentMethods();
      dispatch(setAllPaymentMethods(response));
      const responseFormatted = formatCardDataWithIcons(response);
      dispatch(setAllCardsPaymentMethods(responseFormatted));
    } catch (error) {
      dispatch(setPaymentMethodError(error));
    } finally {
      dispatch(setLoadingPaymentMethod(false));
    }
  };

  const setPaymentMethod = async (paymentMethodRequest: IPaymentMethodRequest) => {
    dispatch(setLoadingPaymentMethod(true));
    dispatch(setPaymentCardSuccess(false));
    try {
      const response = await executeSetPaymentMethod(paymentMethodRequest);
      dispatch(setPaymentMethods(response));
      const responseFormatted = formatCardDataWithIcons([response]);
      dispatch(setCardsPaymentMethods(responseFormatted[0]));
      dispatch(setPaymentCardSuccess(true));
    } catch (error: any) {
      dispatch(initialPaymentMethodError());
      dispatch(setPaymentMethodError(error));
    } finally {
      dispatch(setLoadingPaymentMethod(false));
    }
  };

  const deletePaymentMethod: (cardId: string) => Promise<void> = async (cardId) => {
    dispatch(deletePaymentMethodFinish(false));
    dispatch(setIsLoadingDeletePaymentMethod(true));
    try {
      await executeDeletePaymentMethod(cardId);
      const responsePaymentMethods = paymentMethods.filter(
        (card: IPaymentMethod) => card.id !== cardId,
      );
      const responseCardsPaymentMethods = cardsPaymentMethods.filter(
        (card: CardType) => card.cardId !== cardId,
      );
      dispatch(setAllPaymentMethods(responsePaymentMethods));
      dispatch(setAllCardsPaymentMethods(responseCardsPaymentMethods));
      dispatch(deletePaymentMethodFinish(true));
      showToast({ type: ToastType.Success, title: i18n.t('cardPayment.method-deleted') });
    } catch (error: any) {
      showToast({ type: ToastType.Error, title: i18n.t('cardPayment.method-deleted-error') });
    } finally {
      dispatch(setIsLoadingDeletePaymentMethod(false));
    }
  };

  return {
    deletePaymentMethod,
    getPaymentMethods,
    setPaymentMethod,
  };
};
