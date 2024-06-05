import { i18n } from 'src/utils/core/MTXStrings';
import * as Yup from 'yup';

export const AddCardSchema = Yup.object().shape({
  cvv: Yup.string().min(3, i18n.t('paymentMethod.form.invalidCVV2')).required(i18n.t('paymentMethod.form.enterCVV2Code')),
  email: Yup.string().email(i18n.t('paymentMethod.form.invalidEmail')).required(i18n.t('paymentMethod.form.emailRequiredValidateError')),
});

export default AddCardSchema;
