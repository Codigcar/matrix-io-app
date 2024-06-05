import { Dimensions, Platform } from 'react-native';
import Config from 'react-native-config';
import { InningsList } from 'src/types/types';
import { atob } from 'react-native-quick-base64';
import type { ICurrency, ICurrencyCode } from './types';

export const ios = Platform.OS === 'ios';
export const android = Platform.OS === 'android';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const rem = screenWidth / 375;

export const {
  BASE_URL,
  CARD_BASE_URL,
  DOCUMENTS_BASE_URL,
  API_KEY,
  AWS_PINPOINT_APPLICATION_ID,
  API_KEY_CULQUI,
  API_CULQUI,
  API_KEY_ZENDESK,
  APPLICATION_ID,
  REQUIRE_WAF_TOKEN,
  GCP_RECAPTCHA_KEY_ID,
  GCP_RECAPTCHA_V3_KEY_ID,
  GCP_RECAPTCHA_V2_KEY_ID,
  GCP_RECAPTCHA_DOMAIN_NAME,
  APPSFLYER_HOST,
  APPLE_ID,
  APPSFLYER_KEY,
  LINK_PRIVACY_POLICIES,
  PASSWORD_PUBLIC_KEY,
  THALES_D1_SERVICE_URL_STRING,
  THALES_ISSUER_ID,
  THALES_PUBLIC_KEY_EXPONENT,
  THALES_PUBLIC_KEY_MODULUS,
  THALES_DIGITAL_CARD_URL_STRING,
} = Config;

export const SPLASH_ANIMATION_DURATION = 2500;

export const PUBLIC_KEY = PASSWORD_PUBLIC_KEY ? atob(PASSWORD_PUBLIC_KEY) : '';

export const LOCALIZED_STRING_VAR = '%@';
export const DEFAULT_LANGUAGE = 'es-pe';
export const ALLOWED_LANGUAGES = ['es-pe', 'es-ec'];

export const PREFIX_NUMBER = 51;
export const PHONE_NUMBER_LENGHT = 9;
export const DOCUMENT_NUMBER_LENGHT = 8;

// TODO: GEnerate values from metod getString()
export const PASSWORD_REQUIREMENTS = [
  'Mínimo 8 caracteres',
  'Al menos 1 letra mayúscula y minúscula',
  'Al menos 1 número',
  'Al menos 1 caracter especial (Ejm: $,#,%,@, etc.)',
];

export const NEW_PASSWORD_REQUIREMENTS = [
  'validation-min-8',
  'validation-uppercase',
  'validation-number',
  'validation-special-chars',
] as const;

export const REQUIREMENT_INDEXES = {
  [PASSWORD_REQUIREMENTS[0]]: 'has8Characters',
  [PASSWORD_REQUIREMENTS[1]]: 'hasUppercase',
  [PASSWORD_REQUIREMENTS[2]]: 'hasNumber',
  [PASSWORD_REQUIREMENTS[3]]: 'hasSpecialCharacter',
};

export const NEW_PASSWORD_REQUIREMENT_INDEXES = {
  [NEW_PASSWORD_REQUIREMENTS[0]]: 'has8CharactersAlphanumerics',
  [NEW_PASSWORD_REQUIREMENTS[1]]: 'hasUppercase',
  [NEW_PASSWORD_REQUIREMENTS[2]]: 'hasSpecialCharacter',
};

export const DEFAULT_SPACE = 10;
export const DEFAULT_SPACE_SECOND = parseInt((DEFAULT_SPACE / 2).toString(), 10);
export const BACK_ARROW_TOP_MARGIN = 40;
export const BACK_ARROW_BOTTOM_MARGIN = 20;
export const DEFAULT_SPACE_THIRD = parseInt((DEFAULT_SPACE / 3).toString(), 10);
export const DEFAULT_SPACE_FOURTH = parseInt((DEFAULT_SPACE / 4).toString(), 10);
export const DEFAULT_SPACE_FIVE = parseInt((DEFAULT_SPACE / 5).toString(), 10);
export const DEFAULT_SPACE_SIX = parseInt((DEFAULT_SPACE / 6).toString(), 10);

export const ICON_SIZE = 24;

export const INPUT_MAX_LENGTH = 64;
export const INPUT_MAX_LENGTH_ALIAS = 20;
export const INPUT_MAX_LENGTH_EMAIL = 216;

export const DEFAULT_BORDER_RADIUS = 32;
export const BORDER_SIZE = 1;
export const INPUT_HEIGHT = 12;

// Liveness constants
export const LOGO_INTRO_LIVENESS_SIZE = 225 * rem;
export const LIVENESS_STEPS = {
  startPending: 'start-pending',
  lookRight: 'look-right',
  lookLeft: 'look-left',
  lookUp: 'look-up',
  lookDown: 'look-down',
  openMouth: 'open-mouth',
  pendingPassiveLiveness: 'pending-passive-liveness',
  passiveLiveness: 'video-selfie',
};
export const LIVENESS_STEP_MESSAGES = {
  [LIVENESS_STEPS.startPending]: {
    title: 'kyc-liveness-face-scan-start-pending-title',
    subtitle: '',
    message: 'kyc-liveness-face-scan-start-pending-message',
  },
  [LIVENESS_STEPS.lookRight]: {
    title: 'kyc-liveness-face-scan-recording-title',
    subtitle: 'kyc-liveness-face-scan-look-right-subtitle',
    message: 'kyc-liveness-face-scan-look-right-message',
  },
  [LIVENESS_STEPS.lookLeft]: {
    title: 'kyc-liveness-face-scan-recording-title',
    subtitle: 'kyc-liveness-face-scan-look-left-subtitle',
    message: 'kyc-liveness-face-scan-look-left-message',
  },
  [LIVENESS_STEPS.lookUp]: {
    title: 'kyc-liveness-face-scan-recording-title',
    subtitle: 'kyc-liveness-face-scan-look-up-subtitle',
    message: 'kyc-liveness-face-scan-look-up-message',
  },
  [LIVENESS_STEPS.lookDown]: {
    title: 'kyc-liveness-face-scan-recording-title',
    subtitle: 'kyc-liveness-face-scan-look-down-subtitle',
    message: 'kyc-liveness-face-scan-look-down-message',
  },
  [LIVENESS_STEPS.openMouth]: {
    title: 'kyc-liveness-face-scan-recording-title',
    subtitle: 'kyc-liveness-face-scan-open-mouth-subtitle',
    message: 'kyc-liveness-face-scan-open-mouth-message',
  },
  [LIVENESS_STEPS.pendingPassiveLiveness]: {
    title: 'seed.liveness.scan.title-await',
    subtitle: '',
    message: 'seed.liveness.scan.message-await',
  },
  [LIVENESS_STEPS.passiveLiveness]: {
    title: 'seed.liveness.scan.title-recording',
    subtitle: 'seed.liveness.scan.subtitle-recording',
    message: 'seed.liveness.scan.message-recording',
  },
};
export const TIME_RESEND_CODE = 45;
export const INTERVAL_TIME = 1000;
export const DNI_LENGTH = 8;
export const PASSWORD_MIN_LENGTH = 8;
export const FIELD_ADDRESS_MAX_LENGTH = 100;
export const FIELD_OCCUPATION_MAX_LENGTH = 50;
export const FIELD_PROFESSION_MAX_LENGTH = 50;
export const FIELD_WORK_PLACE_MAX_LENGTH = 50;
export const FIELD_EF_ORGANIZATION_NAME_MAX_LENGTH = 50;
export const FIELD_EF_POSITION_MAX_LENGTH = 50;
export const FIELD_ADDRESS_DELIVERY_MAX_LENGTH = 50;
export const onboardingStates = {
  onProofOfLifePending: 'ON_PROOF_LIFE_PENDING',
  proofOfLifeCompleted: 'PROOF_OF_LIFE_COMPLETED',
  proofOfLifeFailed: 'PROOF_LIFE_FAILED',
  mfaRegistered: 'MFA_REGISTERED',
  idValidationFailed: 'ID_VALIDATION_FAILED',
  idValidated: 'ID_VALIDATED',
  idEnrolled: 'ID_ENROLLED',
  contractOfferAuthorized: 'CONTRACT_OFFER_AUTHORIZED',
};

export const BIOMETRIC_TIME_AWAIT_POLLING = 2000;

export const ACTIVATE_CARD_POLLING = 5000;

export const TIME_AWAIT_ACTIVATE_CARD = 60;

export const TIME_AWAIT_VALIDATION = 180;

export const SESSION_TIMEOUT = 120000;

export const SESSION_TIMEOUT_SECONDS = 120;

export const SESSION_TIMEOUT_TOKEN_SECONDS = 150;

export const TIME_INCENTIVE_TOAST = 7000;

export const VIDEO_SIZE = 1920;

export const VIDEO_MIN_SIZE_MB = 25;

export const VIDEO_PASSIVE_SIZE = 720;

export const VIDEO_PASSIVE_MIN_SIZE_MB = 5;

export const TOTAL_LENGTH = 69;

export const INACTIVITY_TIMEOUTS = {
  default: 120,
  onboarding: 270,
};

export const MAX_FAILED_ATTEMPTS_FOR_BLOCK = 4;
export const BLOCK_TIME_AFTER_FAILED_ATTEMPTS = 60 * 60 * 1000;
export const RESET_FAILED_ATTEMPTS_TIME = 24 * 60 * 60 * 1000;
export const COUNT_TO_SHOW_ALERT_PREV_BLOCK = 2;
export const CODE_LOCKED_AFTER_FAILED_ATTEMPTS = 'USER_LOCKED';
export const SECOND_DEVICE_NOT_ALLOWED = 'second_device_not_allowed';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_DETAIL_FORMAT = 'ddd DD MMM YYYY';
export const RETURN_DATE_DETAIL_FORMAT = 'ddd DD MMM';

export const INNINGS_LIST: InningsList = {
  morning: { value: '9:00 am a 1:00 pm', code: 'morning' },
  afternoon: { value: '2:00 pm a 6:00 pm', code: 'afternoon' },
  unique: { value: '9:00 am a 6:00 pm', code: 'unique' },
};

export const TRANSACTIONS_STATUS = {
  failed: 'RECHAZADA',
  process: 'PROCESSED',
  success: 'BILLED',
};

export const TRANSACTIONS_TYPES = {
  payment: 'DepositPayments',
  monthInsPrim: 'MonthInsPrim',
  finCharges: 'FinCharges',
  chargebackCr: 'ChargebackCr',
  creditFunds: 'CreditFunds',
};

export const CARD_IS_OPEN = 'OPEN';
export const CARD_IS_INACTIVE = 'INACTIVE';
export const CARD_IS_LOST = 'LOST CARD';
export const CARD_IS_STOLEN = 'STOLEN CARD';
export const CARD_WITH_FRAUD = 'FRAUD BLOCK';
export const CARD_REQUIRE_CHANGE_PIN = 'ISSUED INACTIVE';
export const CARD_REQUIRE_ACTIVATION = 'ISSUED INACTIVE';

export const RESTRICTIONS_TYPES = {
  ecommerce: 'ECOMMERCE',
  foreign: 'FOREIGN',
};
export const OFFER_CONTRACT_INTERVAL_TIME = 4500;
export const OFFER_CONTRACT_TIME_AWAIT = 40000;
export const TIME_TO_SHOW_MYSTERY_BOX = 3000;
export const TIME_TO_SHOW_TOAST_DEFAULT = 4000;
export const TIME_DELAY_TO_SHOW_TOAST = 500;

export const NO_SELECTION = -1;

export const TIME_AWAIT_PASSIVE_LIVENESS = 100;
export const TIME_AWAIT_CANCEL_ACCOUNT = 3000;

export const onboarding = 'onboarding';

export const PROOF_OF_LIFE_FAILED_DECLINED_REASONS_CODES = {
  livenessVerificationNotPassed: '0001',
  similarityThresholdNotPassed: '0002',
  notFaceDetected: '0003',
  invalidFileFormat: '0004',
  fileFormatNotSupported: '0005',
  videoExpectedInsteadOfImage: '0006',
};

export const PROOF_OF_LIFE_FAILED_DECLINED_REASONS_MESSAGES = {
  [PROOF_OF_LIFE_FAILED_DECLINED_REASONS_CODES.notFaceDetected]:
    'liveness.decline-reasons.not-face-detected',
  [PROOF_OF_LIFE_FAILED_DECLINED_REASONS_CODES.invalidFileFormat]:
    'liveness.decline-reasons.invalid-file-format',
  [PROOF_OF_LIFE_FAILED_DECLINED_REASONS_CODES.fileFormatNotSupported]:
    'liveness.decline-reasons.invalid-file-format',
  [PROOF_OF_LIFE_FAILED_DECLINED_REASONS_CODES.videoExpectedInsteadOfImage]:
    'liveness.decline-reasons.invalid-file-format',
};

export const PAYMENT_CARDS_LIMIT = 4;
export const PAYMENT_MIN_AMOUNT = 1;
export const PAYMENT_STATUS_POLLING = {
  failed: 'FAILED',
  completed: 'COMPLETED',
  approved: 'APPROVED',
  declined: 'DECLINED',
};

export const RECAPTCHA_ACTIONS = {
  login: 'login',
  passwordRecovery: 'password_recovery',
  signup: 'signup',
  support: 'support',
};

export const BUTTON_PRESS_DELAY = 2000;

export const CALL_CENTER_NUMBER = '016441010';

export const TIME_CARD_CONFIG_DISABLED = 7000;
export const REFRESH_TOKEN_RECAPTCHA = 90000;

export const HOLIDAYS = [
  '01/01',
  '01/05',
  '07/06',
  '29/06',
  '23/07',
  '28/07',
  '29/07',
  '06/08',
  '30/08',
  '08/10',
  '01/11',
  '08/12',
  '09/12',
  '25/12',
];
export const VIRTUAL_CODE = '3E8';
export const PHISYCAL_CODE = '7D0';
export const PAYMENT_CODE = 'BB8';
export const POSITIVE = 'POSITIVE';
export const NEGATIVE = 'NEGATIVE';
export const VIRTUAL_TYPE_FILTER = 'virtualType';
export const PAYMENT_TYPE_FILTER = 'paymentType';
export const PHISYCAL_TYPE_FILTER = 'phisycalType';
export const MIN_ITEMS_REACHEDEND_MESSAGE = 3;

export const CURRENCY: Record<ICurrencyCode, ICurrency> = {
  PEN: {
    name: 'Soles',
    code: 'PEN',
    symbol: 'S/',
  },
  USD: {
    name: 'Dólares',
    code: 'USD',
    symbol: '$',
  },
};

export const PROVINCES_DELIVERY = [
  { code: '01', description: 'Arequipa' },
  { code: '02', description: 'Lima' },
];

export const PROVINCE_AQP = 'JOSE LUIS';

export const REDEMPTION_STATUS = {
  requested: 'REQUESTED',
  completed: 'COMPLETED',
  failed: 'FAILED',
};

export const REDEMPTION_ERROR_CODE = {
  provider_error: 'PROVIDER_ERROR',
  invalid_card_account: 'INVALID_CARD_ACCOUNT',
  invalid_points: 'INVALID_POINTS',
  invalid_card_status: 'INVALID_CARD_STATUS',
};

export const REFERRAL_CODE_MAX_LENGTH = 6;
export const TIME_SLIDER_REQUEST_CARD = 5000;

export const STATUS_AVAILABLE_DAY = 'AVAILABLE';

export const STATUS_DELIVERY_ORDER = {
  pendingActivation: 'PENDING',
  orderClosed: 'CLOSED',
};
