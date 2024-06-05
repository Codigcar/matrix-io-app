import * as Yup from 'yup';
import {
  RegexPassword,
  RegexPhoneNumberPeru,
  RegexAddress,
  RegexCardActivationCode,
  RegexEmail,
  RegexAddressDelivery,
  RegexReferenceDelivery,
} from 'src/utils/regex/InputValidator';
import {
  DNI_LENGTH,
  INPUT_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  FIELD_ADDRESS_MAX_LENGTH,
  FIELD_OCCUPATION_MAX_LENGTH,
  FIELD_PROFESSION_MAX_LENGTH,
  FIELD_WORK_PLACE_MAX_LENGTH,
  FIELD_EF_ORGANIZATION_NAME_MAX_LENGTH,
  FIELD_EF_POSITION_MAX_LENGTH,
  PHONE_NUMBER_LENGHT,
  FIELD_ADDRESS_DELIVERY_MAX_LENGTH,
} from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import { TranslateType } from './form.props';

interface ShapesValues {
  [field: string]: any;
}

export const shapes = (Translate: TranslateType): ShapesValues => ({
  dni: Yup.string().required(i18n.t('form-validate-field-mandatory')).min(DNI_LENGTH, i18n.t('invalid-dni-length')).max(DNI_LENGTH, i18n.t('invalid-dni-length')),
  email: Yup.string().required(i18n.t('enrollment.mandatory-field')).matches(RegexEmail, i18n.t('invalid-email')),
  emailConfirm: Yup.string().test('email-match', i18n.t('enrollment-email-confirm-validation-error'), function passWordMatch(value) {
    return this.parent.email === value;
  }),
  dataProtectionClause: Yup.boolean().required(i18n.t('enrollment.mandatory-field"')).oneOf([true], i18n.t('enrollment.mandatory-field"')),
  password: Yup.string()
    .matches(RegexPassword)
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .max(INPUT_MAX_LENGTH),
  passwordConfirmation: Yup.string()
    .test('passwords-match', i18n.t('form-validate-confirmation-password'), function passWordMatch(value) {
      return this.parent.password === value;
    }),
  phone: Yup.string()
    .required(i18n.t('form-validate-field-mandatory'))
    .min(PHONE_NUMBER_LENGHT + 2, `El número de celular debe tener ${PHONE_NUMBER_LENGHT} dígitos.`)
    .max(PHONE_NUMBER_LENGHT + 2, `El número de celular debe tener ${PHONE_NUMBER_LENGHT} dígitos.`),
  department: Yup.object().required(),
  province: Yup.object().required(),
  district: Yup.object().required(),
  address: Yup.string().matches(RegexAddress, i18n.t('invalid-address'))
    .required(i18n.t('form-validate-field-mandatory'))
    .min(5, i18n.t('invalid-address'))
    .max(FIELD_ADDRESS_MAX_LENGTH, i18n.t('invalid-max-length-address')),
  addressDelivery: Yup.string().matches(RegexAddressDelivery, i18n.t('invalid-address'))
    .required(i18n.t('form-validate-field-mandatory'))
    .min(5, i18n.t('invalid-address'))
    .max(FIELD_ADDRESS_DELIVERY_MAX_LENGTH, i18n.t('invalid-max-length-address')),
  addressReference: Yup.string().notRequired().matches(RegexReferenceDelivery).max(FIELD_ADDRESS_DELIVERY_MAX_LENGTH, i18n.t('invalid-max-length-address')),
  occupation: Yup.string().required(i18n.t('form-validate-field-mandatory')).min(1).max(FIELD_OCCUPATION_MAX_LENGTH),
  profession: Yup.string().required(i18n.t('form-validate-field-mandatory')).min(1).max(FIELD_PROFESSION_MAX_LENGTH),
  workPlace: Yup.string().required(i18n.t('form-validate-field-mandatory')).min(1).max(FIELD_WORK_PLACE_MAX_LENGTH),
  extraFunctions: Yup.boolean(),
  extraFunctionsOrganizationName: Yup.string()
    .min(1)
    .max(FIELD_EF_ORGANIZATION_NAME_MAX_LENGTH)
    .when('extraFunctions', {
      is: true,
      then: (schema) => schema.required(i18n.t('form-validate-field-mandatory')),
    }),
  extraFunctionsPosition: Yup.string()
    .min(1)
    .max(FIELD_EF_POSITION_MAX_LENGTH)
    .when('extraFunctions', {
      is: true,
      then: (schema) => schema.required(i18n.t('form-validate-field-mandatory')),
    }),
  phoneNumber: Yup.string()
    .matches(RegexPhoneNumberPeru)
    .min(PHONE_NUMBER_LENGHT + 2)
    .max(PHONE_NUMBER_LENGHT + 2),
  activationCode: Yup.string()
    .matches(RegexCardActivationCode)
    .required(Translate('activate-card.inputError'))
    .min(14)
    .max(17),
  passwordLogin: Yup.string().required(),
  emailConfirmation: Yup.string()
    .required(i18n.t('email-not-match-first-field')).matches(RegexEmail, i18n.t('invalid-email'))
    .oneOf([Yup.ref('email'), null], i18n.t('email-not-match-first-field')),
});

export const createSchemaByIds = (
  object: string[],
  Translate: TranslateType,
  validationSchema?: any,
): any => {
  const scheme: ShapesValues = {};
  const localShapes: ShapesValues = shapes(Translate);
  object.forEach((element: string) => {
    if (validationSchema && validationSchema[element]) {
      scheme[element] = localShapes[element].concat(validationSchema[element]);
    } else {
      scheme[element] = localShapes[element];
    }
  });
  return Yup.object().shape(scheme);
};
