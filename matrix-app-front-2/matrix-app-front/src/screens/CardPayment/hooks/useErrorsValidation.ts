import { i18n } from 'src/utils/core/MTXStrings';
import navigationScreenNames from 'src/utils/navigationScreenNames';

interface IErrorCodes {
  [key: string]: string[];
}

type IErrorsType = 'PAGOS' | 'METODOS_DE_PAGOS' | 'OTROS';

type IHandleError = {
  code: string;
  description?: string | { message: string }[];
  user_message?: string;
  type?: IErrorsType;
};

const ERROR_CODES: IErrorCodes = {
  METODOS_DE_PAGOS: [
    'international_card',
    'issuer_decline_operation',
    'fraudulent_issuer',
    'fraudulent',
    'incorrect_cvv',
    'insufficient_funds',
    'contact_issuer',
    'error_processing',
    'issuer_not_available',
    'expired_card',
    'lost_card',
    'debit_card_only',
    'internet_not_available',
    // TODO! -> errores no mapeados en excel
    'invalid_card',
    'invalid_cvv',
    'too_many_attempts_cvv',
    'card_already_registered',
    'processing_error',
    'soft_block',
    'stolen_card',
    'gateway_timeout',
    'DNGE0031',
    'DNGE0030',
  ],
  PAGOS: [
    'payment_insufficient_funds',
    'payment_fraudulent_issuer',
    'payment_internet_not_available',
    'payment_attemps_exceed',
    'payment_fraudulent',
    'payment_issuer_not_available',
    'payment_transaction_limit',
    'payment_contact_issuer',
    'payment_error_processing',
    'payment_issuer_decline_operation',
    'payment_expired_card',
    'payment_general_error',
    'payment_failed',
  ],
};

const useErrorsValidation = (navigate: Function) => {
  const handleError = ({ code, type = 'OTROS' }: IHandleError): void => {
    const preBase = `cardPayment.screen-error.${type}`;

    if (type && ERROR_CODES[type].includes(code)) {
      const base = `${preBase}.${code}`;
      navigate(navigationScreenNames.paymentError, {
        title: i18n.t(`${base}.title`),
        subtitle: i18n.t(`${base}.subtitle`),
        description: i18n.t(`${base}.description`),
        type: i18n.t(`${base}.type`) ?? 'error',
        primaryAction: {
          label: i18n.t('cardPayment.to-back'),
          nextScreen: navigationScreenNames.cardPayment,
        },
      });
      return;
    }

    const codeErrorGeneral = type === 'METODOS_DE_PAGOS' ? 'general_error' : 'payment_general_error';
    const base = `${preBase}.${codeErrorGeneral}`;

    navigate(navigationScreenNames.paymentError, {
      title: i18n.t(`${base}.title`),
      subtitle: i18n.t(`${base}.subtitle`),
      description: i18n.t(`${base}.description`),
      type: i18n.t(`${base}.type`) ?? 'error',
      primaryAction: {
        label: i18n.t('cardPayment.to-back'),
        nextScreen: navigationScreenNames.cardPayment,
      },
    });
  };

  return { handleError };
};

export default useErrorsValidation;
