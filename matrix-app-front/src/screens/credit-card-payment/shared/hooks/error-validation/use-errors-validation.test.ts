/* eslint-disable no-undef */
import { renderHook } from 'jest/test-utils';

import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useErrorsValidation } from './use-errors-validation';

const navigate = jest.fn();
const rest: any = {
  description: 'description',
  user_message: 'user_message',
  type: 'PAGOS',
};

describe('useErrorsValidation hook', () => {
  describe('METODOS DE PAGO', () => {
    beforeAll(() => {
      rest.type = 'METODOS_DE_PAGOS';
    });

    it('should show text when the code is insufficient_funds', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'insufficient_funds',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta de débito no tiene fondos suficientes para ser utilizada como método de pago. Por favor, utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Fondos insuficientes',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is incorrect_cvv', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'incorrect_cvv',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'Asegúrate de haber ingresado correctamente el código CVV, ya sea el dinámico o el que se encuentra al reverso de la tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'CVV Inválido',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is contact_issuer', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'contact_issuer',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'Por favor, contacta al banco emisor para conocer el motivo o intenta utilizar otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'No se pudo añadir esta tarjeta',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });

    it('should show text when the code is fraudulent', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'fraudulent',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La operación fue rechazada por prevención de fraude. Por favor, utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Operación denegada',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });

    it('should show text when the code is expired_card', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'expired_card',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta a utilizar está vencida o la fecha ingresada es incorrecta. Verifica el dato y vuelve a intentarlo o utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Tarjeta vencida',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is debit_card_only', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'debit_card_only',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'Solo puedes añadir tarjetas de débito. Por favor, inténtalo nuevamente con otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Tarjeta inválida',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is issuer_not_available', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'issuer_not_available',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta a utilizar no se pudo añadir como método de pago ya que el banco emisor no responde. Por favor, vuelve a inténtalo en unos minutos o utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Banco emisor no disponible',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is issuer_decline_operation', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'issuer_decline_operation',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'Por favor, contacta al banco emisor para conocer el motivo o intenta utilizar otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'No se pudo añadir esta tarjeta',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });

    it('should show text when the code lost_card stolen_card', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'lost_card',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta a utilizar fue bloqueada y reportada al banco emisor como una tarjeta perdida. Por favor, utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Tarjeta perdida',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });

    it('should show text when the code is general_errror', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'unknow',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'No se pudo añadir el método de pago. Por favor, inténtalo nuevamente más tarde.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Operación denegada',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });
  });

  describe('PAGOS', () => {
    beforeAll(() => {
      rest.type = 'PAGOS';
    });

    it('should show text when the code is payment_insufficient_funds', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_insufficient_funds',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'warning',
        title: '¡Lo sentimos!',
        subtitle: 'Fondos insuficientes',
        description:
          'La tarjeta de débito no tiene fondos suficientes para realizar el pago. Por favor, utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_fraudulent_issuer', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_fraudulent_issuer',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'error',
        title: '¡Lo sentimos!',
        subtitle: 'No se pudo realizar el pago',
        description:
          'Por favor, contacta al banco emisor para conocer el motivo o intenta  utilizar otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_internet_not_available', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_internet_not_available',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'error',
        title: '¡Lo sentimos!',
        subtitle: 'Transacción denegada',
        description:
          'Verifica que la tarjeta de débito utilizada esté activa para operaciones por internet e inténtalo nuevamente.\n\nSi el error persiste contacta al banco emisor para saber el motivo.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_attemps_exceed', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_attemps_exceed',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'warning',
        title: '¡Lo sentimos!',
        subtitle: 'La tarjeta ha sido bloqueada',
        description:
          'La tarjeta que estás usando como método de pago ha sido bloqueada temporalmente por superar el límite de intentos.\n\nPor favor intenta nuevamente con otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_fraudulent', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_fraudulent',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'error',
        title: '¡Lo sentimos!',
        subtitle: 'Operación denegada',
        description:
          'El pago fue rechazado por prevención de fraude. Por favor, utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_issuer_not_available', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_issuer_not_available',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'warning',
        title: '¡Lo sentimos!',
        subtitle: 'No se pudo realizar el pago',
        description:
          'El banco emisor de la tarjeta no responde. Por favor, inténtalo nuevamente en unos minutos o utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_transaction_limit', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_transaction_limit',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'error',
        title: '¡Lo sentimos!',
        subtitle: 'Límite de transacciones superado',
        description:
          'Superaste el límite de transacciones diarias permitidas de tu tarjeta de débito.\nContacta al banco emisor para cambiar el límite o utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_contact_issuer', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_contact_issuer',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'error',
        title: '¡Lo sentimos!',
        subtitle: 'No se pudo realizar el pago',
        description:
          'Contacta al banco emisor para saber el motivo. Por favor, utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_error_processing', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_error_processing',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'error',
        title: '¡Lo sentimos!',
        subtitle: 'Error de procesamiento',
        description:
          'El pago no se procesó correctamente. Por favor, vuelve a intentarlo o utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_issuer_decline_operation', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_issuer_decline_operation',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'error',
        title: '¡Lo sentimos!',
        subtitle: 'Operación restringida',
        description:
          'Por favor, contacta al banco emisor para conocer el motivo o intenta utilizar otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_expired_card', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_expired_card',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'warning',
        title: '¡Lo sentimos!',
        subtitle: 'Tarjeta vencida',
        description: 'La tarjeta utilizada está vencida. Por favor utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it('should show text when the code is payment_general_error', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'payment_general_error',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        type: 'warning',
        title: '¡Lo sentimos!',
        subtitle: 'Operación denegada',
        description: 'No se pudo realizar el pago.\nPor favor, inténtalo nuevamente más tarde o utiliza otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
      });
    });

    it.skip('should show text when the code is payment_general_errror', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'unknow',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'No se pudo realizar el pago.\nPor favor, inténtalo nuevamente más tarde.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Operación denegada',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });
  });

  describe('OTROS ERRORES', () => {
    beforeAll(() => {
      rest.type = 'METODOS_DE_PAGOS';
    });

    it('should show text when the code is invalid_cvv', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'invalid_cvv',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description: 'El código de seguridad (CVV, CVC2, CID) de la tarjeta es inválido.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'CVV Inválido',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is invalid_card', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'invalid_card',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description: 'La tarjeta utilizada tiene restricciones, contacta al banco emisor.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Tarjeta inválida',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });

    it('should show text when the code is too_many_attempts_cvv', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'too_many_attempts_cvv',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'Intentaste demasiadas veces ingresar el código de seguridad (CVV2, CVC2, CID).',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Límite de intentos permitidos',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is card_already_registered', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'card_already_registered',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description: 'Podrás encontrarla en las tarjetas añadidas de métodos de pago.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Esta tarjeta ya está registrada',
        title: '¡Atención!',
        type: 'warning',
      });
    });

    it('should show text when the code is processing_error', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'processing_error',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'Ocurrió un error durante la transacción. Por favor contáctanos para brindarte soporte.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Error de procesamiento',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });

    it('should show text when the code is soft_block', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'soft_block',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta que estás usando como medio de pago ha sido bloqueada temporalmente por superar el límite de intentos. \n\nIntenta nuevamente con otra tarjeta.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'La tarjeta ha sido bloqueada',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is stolen_card', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'stolen_card',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta fue bloqueada y reportada al banco emisor como una tarjeta robada.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Tarjeta robada',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is gateway_timeout', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'gateway_timeout',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'No eres tú, somos nosotros, estamos trabajando para solucionar el inconveniente.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Error inesperado',
        title: '¡Lo sentimos!',
        type: 'warning',
      });
    });

    it('should show text when the code is DNGE0031', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'DNGE0031',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta fue bloqueada y reportada al banco emisor como una tarjeta robada.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Tarjeta robada',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });

    it('should show text when the code is DNGE0030', () => {
      const { result } = renderHook(() => useErrorsValidation(navigate));
      result.current.handleError({
        code: 'DNGE0030',
        ...rest,
      });
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.paymentError, {
        description:
          'La tarjeta fue bloqueada y reportada al banco emisor como una tarjeta perdida.',
        primaryAction: { label: 'Regresar', nextScreen: 'CardPayment' },
        subtitle: 'Tarjeta robada',
        title: '¡Lo sentimos!',
        type: 'error',
      });
    });
  });
});
