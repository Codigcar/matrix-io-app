import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LogoAmex,
  LogoDinersclub,
  LogoMastercard,
  LogoVisa,
  Card,
} from 'assets/svgs';
import { SvgProps } from 'react-native-svg';
import {
  loadingPaymentMethodsSelector,
  paymentMethodsSelector,
} from '../selectors/paymentSelector';
import { getReqPaymentMethod } from '../states/paymentState';

export interface CardData {
  id: string;
  type: string;
  provider: string;
  alias: string;
  brand: string;
}

const useListMethodPayments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReqPaymentMethod());
  }, [dispatch]);

  const paymentMethods = useSelector(paymentMethodsSelector);
  const loading = useSelector(loadingPaymentMethodsSelector);

  const iconAndCardTypeHandler = () => {
    if (paymentMethods.length > 0) {
      return paymentMethods.map((card: CardData) => {
        let cardIcon;
        let cardType;
        if (card.brand === 'Visa') {
          cardIcon = (props: SvgProps) => <LogoVisa {...props} />;
        } else if (card.brand === 'MasterCard') {
          cardIcon = (props: SvgProps) => <LogoMastercard {...props} />;
        } else if (card.brand === 'Diners') {
          cardIcon = (props: SvgProps) => <LogoDinersclub {...props} />;
        } else if (card.brand === 'Amex') {
          cardIcon = (props: SvgProps) => <LogoAmex {...props} />;
        } else {
          cardIcon = (props: SvgProps) => <Card {...props} />;
        }

        if (card.type === 'creditcard') {
          cardType = 'Tarjeta de Crédito';
        } else {
          cardType = 'Tarjeta de Débito';
        }

        return {
          cardId: card.id,
          cardNumber: `${card.brand} **** ${card.alias}`,
          cardType,
          cardIcon,
          provider: card.provider,
        };
      });
    }
    return [];
  };

  return { loading, cardsData: iconAndCardTypeHandler() };
};

export default useListMethodPayments;
