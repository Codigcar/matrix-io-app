import i18next from 'i18next';
import localizableSharedES from 'src/shared/localize/lang/es-pe/localizations.json';
import accountStatusLocalizableES from 'src/screens/AccountStatus/shared/localize/lang/es-pe/localizations.json';
import appSettingsLocalizableES from 'src/screens/AppSettings/shared/localize/lang/es-pe/localizations.json';
import authLocalizableES from 'src/screens/auth/shared/localize/lang/es-pe/localizations.json';
import benefitsLocalizableES from 'src/screens/Benefits/shared/localize/lang/es-pe/localizations.json';
import cancelAccountLocalizableES from 'src/screens/CancelAccount/shared/localize/lang/es-pe/localizations.json';
import cardConfigureLocalizableES from 'src/screens/CardConfigure/shared/localize/lang/es-pe/localizations.json';
import cardOfferLocalizableES from 'src/screens/CardOffer/shared/localize/lang/es-pe/localizations.json';
import cardPaymentLocalizableES from 'src/screens/CardPayment/shared/localize/lang/es-pe/localizations.json';
import cardReplacementLocalizableES from 'src/screens/CardReplacement/shared/localize/lang/es-pe/localizations.json';
import chatLocalizableES from 'src/screens/Chat/shared/localize/lang/es-pe/localizations.json';
import enrollmentLocalizableES from 'src/screens/Enrollment/shared/localize/lang/es-pe/localizations.json';
import homeLocalizableES from 'src/screens/Home/shared/localize/lang/es-pe/localizations.json';
import kycLocalizableES from 'src/screens/KYC/shared/localize/lang/es-pe/localizations.json';
import myProductsLocalizableES from 'src/screens/MyProducts/shared/localize/lang/es-pe/localizations.json';
import networkErrorLocalizableES from 'src/screens/NetworkError/shared/localize/lang/es-pe/localizations.json';
import notificationsLocalizableES from 'src/screens/Notifications/shared/localize/lang/es-pe/localizations.json';
import passwordRecoveryLocalizableES from 'src/screens/PasswordRecovery/shared/localize/lang/es-pe/localizations.json';
import personalDataLocalizableES from 'src/screens/PersonalData/shared/localize/lang/es-pe/localizations.json';
import profileLocalizableES from 'src/screens/Profile/shared/localize/lang/es-pe/localizations.json';
import requestCardLocalizableES from 'src/screens/RequestCard/shared/localize/lang/es-pe/localizations.json';
import soonLocalizableES from 'src/screens/Soon/shared/localize/lang/es-pe/localizations.json';
import transactionsLocalizableES from 'src/screens/Transactions/shared/localize/lang/es-pe/localizations.json';
import welcomeLocalizableES from 'src/screens/Welcome/shared/localize/lang/es-pe/localizations.json';
import cashBackLocalizableES from 'src/screens/CashBack/shared/localize/lang/es-pe/localizations.json';
import { DEFAULT_LANGUAGE, LOCALIZED_STRING_VAR } from '../constants';

const removeDash = (key: string) => key.replace('-', '');
const getLocale = () => removeDash(DEFAULT_LANGUAGE);

export const i18n = i18next;
i18next.init({
  compatibilityJSON: 'v3',
  lng: getLocale(),
  debug: false,
  ns: ['shared', 'accountStatus', 'appSettings', 'auth', 'benefits', 'cancelAccount',
    'cardConfigure', 'cardOffer', 'cardPayment', 'cardReplacement', 'chat', 'enrollment',
    'home', 'kyc', 'myProducts', 'networkError', 'notifications', 'passwordRecovery',
    'personalData', 'profile', 'requestCard', 'soonCard', 'transactions', 'welcome', 'cashBack'],
  defaultNS: 'shared',
  resources: {
    espe: {
      shared: localizableSharedES,
      accountStatus: accountStatusLocalizableES,
      appSettings: appSettingsLocalizableES,
      auth: authLocalizableES,
      benefits: benefitsLocalizableES,
      cancelAccount: cancelAccountLocalizableES,
      cardConfigure: cardConfigureLocalizableES,
      cardOffer: cardOfferLocalizableES,
      cardPayment: cardPaymentLocalizableES,
      cardReplacement: cardReplacementLocalizableES,
      chat: chatLocalizableES,
      enrollment: enrollmentLocalizableES,
      home: homeLocalizableES,
      kyc: kycLocalizableES,
      myProducts: myProductsLocalizableES,
      networkError: networkErrorLocalizableES,
      notifications: notificationsLocalizableES,
      passwordRecovery: passwordRecoveryLocalizableES,
      personalData: personalDataLocalizableES,
      profile: profileLocalizableES,
      requestCard: requestCardLocalizableES,
      soonCard: soonLocalizableES,
      transactions: transactionsLocalizableES,
      welcome: welcomeLocalizableES,
      cashBack: cashBackLocalizableES,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

/* DEPRECATED */
const sprintf = (source: string, ...args: any[]) => {
  let i = 0;
  return source.replace(new RegExp(LOCALIZED_STRING_VAR, 'g'), () => args[i++]);
};

const getKey = (key: string) => {
  if (i18next.exists(key)) {
    return key;
  }
  return key;
};

export const hasKey = (key: string) => i18next.exists(key);

export const getString = (key: string, ...args: any[]) => {
  const localizedKey = getKey(key);
  if (localizedKey === '') {
    return '';
  }
  return sprintf(i18next.t(localizedKey), ...args);
};
