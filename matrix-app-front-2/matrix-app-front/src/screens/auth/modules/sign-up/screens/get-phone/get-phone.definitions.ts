import * as Yup from 'yup';
import { PHONE_NUMBER_LENGHT, REFERRAL_CODE_MAX_LENGTH } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';

export interface IGetPhoneForm {
  phone: string;
  referralCode: string;
}

export type GetPhoneSchemaObject = {
  [key in keyof IGetPhoneForm]: Yup.SchemaOf<any>;
};

export const GetPhoneSchema = Yup.object().shape<GetPhoneSchemaObject>({
  phone: Yup.string()
    .required(i18n.t('form-validate-field-mandatory'))
    .matches(/^[0-9 ]*$/, i18n.t('phone-label-invalid'))
    .min(PHONE_NUMBER_LENGHT + 2, i18n.t('phone-error-min-length', { length: PHONE_NUMBER_LENGHT }))
    .max(
      PHONE_NUMBER_LENGHT + 2,
      i18n.t('phone-error-min-length', { length: PHONE_NUMBER_LENGHT }),
    ),
  referralCode: Yup.string()
    .min(REFERRAL_CODE_MAX_LENGTH, '')
    .max(REFERRAL_CODE_MAX_LENGTH, '')
    .optional(),
});
