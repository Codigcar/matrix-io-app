import React from 'react';

import { CheckDanger, CheckSuccess, CheckWarning } from 'assets/svgs';
import { SvgProps } from 'react-native-svg';
import { useRoute } from '@react-navigation/native';
import { i18n } from 'src/utils/core/MTXStrings';
import { usePaymentMethodSelectors } from 'src/core/libraries-implementation/state-manager/selectors';

export const icons: any = {
  error: <CheckDanger />,
  warning: <CheckWarning />,
  success: <CheckSuccess />,
};

export const usePaymentErrorPresenter = () => {
  const route: any = useRoute();
  const { params } = route;
  const { paymentMethodError } = usePaymentMethodSelectors();

  const {
    title = i18n.t('cardPayment.screen-error-title'),
    subtitle,
    description,
    type = 'error',
    primaryAction,
    secondaryAction,
  } = params;

  const Icon = (props: SvgProps) => {
    const IconComponent = icons[type];
    return React.cloneElement(IconComponent, { ...props });
  };
  return {
    Icon,
    title,
    subtitle,
    description,
    primaryAction,
    secondaryAction,
    paymentMethodError,
  };
};
