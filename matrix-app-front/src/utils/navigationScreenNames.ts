const navigationScreenNames = {
  login: 'Login',
  challenge: 'Challenge',

  // Tabs
  tabHome: 'Home',
  tabBenefits: 'Settings',
  tabCard: 'Card',
  tabSupport: 'Support',

  // Enrollment
  getDni: 'GetDni',
  getEmail: 'GetEmail',
  offerUnavailable: 'OfferUnavailable',
  documentDetail: 'DocumentDetail',
  passwordVerification: 'PasswordVerification',
  passwordRepeat: 'PasswordRepeat',
  getPhone: 'GetPhone',
  verifyOTP: 'VerifyOTP',
  SupportHome: 'SupportHome',
  // Personal Data
  personalDataStack: 'PersonalDataStack',
  getPersonalData: 'GetPersonalData',
  getWorkData: 'GetWorkData',
  getPublicWorkConfirmation: 'GetPublicWorkConfirmation',
  personalDataComplete: 'PersonalDataComplete',
  cardOfferStack: 'CardOfferStack',
  cardOfferDetails: 'CardOfferDetails',
  cardDocuments: 'CardDocuments',
  cardDocumentDetail: 'CardDocumentDetail',
  cardOfferComplete: 'CardOfferComplete',
  noCardOffer: 'NoCardOffer',
  cancelAccountComplete: 'CancelAccountComplete',
  cancelAccountWaiting: 'CancelAccountWaiting',
  personalChangeDataNotAvailable: 'NotAvailable',

  // DocumentValidation
  startDocumentValidation: 'StartDocumentValidation',
  introductionDocumentScan: 'IntroductionDocumentScan',
  getDocumentFront: 'GetDocumentFront',
  documentFrontPreview: 'DocumentFrontPreview',
  getDocumentReverse: 'GetDocumentReverse',
  documentReversePreview: 'DocumentReversePreview',
  documentValidationLoading: 'DocumentValidationLoading',
  manualCheck: 'ManualCheck',
  validationResponse: 'DocumentValidationResponse',

  // Liveness
  livenessStack: 'LivenessStack',
  livenessIntro: 'LivenessIntro',
  livenessFaceScan: 'LivenessFaceScan',
  livenessLoading: 'LivenessLoading',
  livenessGoToGetPersonalData: 'LivenessGoToGetPersonalData',

  // BottomTabNavigator
  bottomTabNavigator: 'BottomTabNavigator',

  /**
   * Recovery password
   * @deprecated
   *  */
  recoveryPassword: {
    stack: 'PasswordRecovery',
    getDNI: 'GetDNI',
    verifyOTP: 'VerifyOTP',
    newPassword: 'NewPassword',
    response: 'PasswordRecoveryResponse',
  },

  // Password recovery
  passwordRecovery: {
    validateDni: 'ValidateDni',
    validateOTP: 'ValidateOTP',
    newPassword: 'NewPassword',
    recoverFullPassword: 'RecoverFullPassword',
  },

  // Common
  genericError: 'GenericError',
  networkError: 'MtxNetworkError',
  maintenance: 'Maintenance',

  // Notifications
  notificationStack: 'NotificationStack',
  notificationList: 'NotificationList',
  notificationDetail: 'NotificationDetail',

  // AppSettings
  settingsStack: 'SettingsStack',
  appSettings: 'appSettings',
  configureNFC: 'ConfigureNFC',
  home: 'Home',
  profileStack: 'ProfileStack',
  myProfile: 'MyProfile',

  // Wallet
  cardConfigure: 'CardConfigure',
  enrollmentWalletDone: 'EnrollmentWalletDone',
  inAppValidation: 'InAppValidation',

  // Payment
  cardPayment: 'CardPayment',
  paymentError: 'PaymentError',
  paymentLoading: 'PaymentLoading',
  paymentSuccess: 'PaymentSuccess',
  addingPaymentMethod: 'AddingPaymentMethod',
  addDebitCardCulqi: 'AddDebitCardCulqi',

  // Account status
  listAccountStatements: 'ListAccountStatements',

  enrollmentDevice: {
    intro: 'LivenessIntro',
    scan: 'LivenessScan',
    loading: 'LivenessLoading',
    response: 'LivenessResponse',
    failed: 'LivenessResponseFailed',
  },

  // Card Replacement
  cardReplacement: {
    stack: 'CardReplacementStack',
    success: 'ReplacementValidationSuccess',
    error: 'ReplacementValidationError',
    validationSuccess: 'ReplacementValidationSuccess',
    validationError: 'ReplacementValidationError',
    summaryOffer: 'ReplacementSummaryOffer',
  },
  benefits: {
    stack: 'BenefitsStack',
    home: 'BenefitsHomeList',
    details: 'BenefitsDetails',
  },
  physicalCard: {
    stack: 'RequestCardStack',
    schedule: 'Schedule',
    summary: 'Summary',
    activation: 'ActivateCard',
    response: 'ActivateCardResponse',
    location: 'LocationForm',
    form: 'UserForm',
    dateUnavailable: 'DateUnavailableError',
    processError: 'ProcessError',
    changePinResponse: 'ChangePinResponse',
    changePinError: 'ChangePinError',
    introductionRequest: 'IntroductionRequest',
  },

  authStack: 'AuthNavigation',
  // Redemption
  redemption: {
    stack: 'Redemption',
    loading: 'RedemptionLoading',
    error: 'RedemptionError',
    success: 'RedemptionSuccess',
  },
} as const;

export default navigationScreenNames;
