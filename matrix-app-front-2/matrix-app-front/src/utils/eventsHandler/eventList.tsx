export const onboardingStates = {
  onProofOfLifePending: 'ON_PROOF_LIFE_PENDING',
  proofOfLifeCompleted: 'PROOF_OF_LIFE_COMPLETED',
  proofOfLifeFailed: 'PROOF_LIFE_FAILED',
  idValidationFailed: 'ID_VALIDATION_FAILED',
  idValidated: 'ID_VALIDATED',
  idEnrolled: 'ID_ENROLLED',
  contractOfferAuthorized: 'CONTRACT_OFFER_AUTHORIZED',
  mfaRegistered: 'MFA_REGISTERED',
  contractFailed: 'CONTRACT_FAILED',
  onboardingCompleted: 'ONBOARDING_COMPLETED',
  completed: 'COMPLETED',
};
/*
EVENTS
  STARTED [-]
  WAITING_FOR_ID [-]
  ID_CAPTURED [-]
  ON_ID_VALIDATION [-]
  WAITING_FOR_ID_REVIEW [-]
  ID_VALIDATED [-]
  ID_VALIDATION_FAILED [-]
  ID_ENROLLED [-]
  WAITING_PROOF_OF_LIFE [-]
  PROOF_OF_LIFE_CAPTURED [-]
  ON_PROOF_LIFE_PENDING [-]
  PROOF_LIFE_FAILED [-]
  WAITING_FOR_POF_REVIEW [-]
  PROOF_OF_LIFE_COMPLETED [-]
*/
/*
Screens
  documentValidation: {
    container: 'documentStack',
    start: 'StartDocumentValidation',
    intro: 'IntroductionDocumentScan',
    front: 'DocumentFrontPreview',
    reverse: 'DocumentReversePreview',
    loading: 'DocumentValidationLoading',
    response: 'DocumentValidationResponse',
  },
  liveness: {
    container: 'LivenessStack',
    intro: 'LivenessIntro',
    record: 'LivenessFaceScan',
    loading: 'LivenessLoading',
    response: 'LivenessGoToGetPersonalData',
  }, */

const events = [
  // Document
  {
    name: 'STARTED',
    stack: 'Enrollment',
    screen: 'StartDocumentValidation',
    params: {},
  },
  {
    name: 'WAITING_FOR_ID',
    stack: 'Enrollment',
    screen: 'IntroductionDocumentScan',
    params: {},
  },
  {
    name: 'ID_CAPTURED',
    stack: 'Enrollment',
    screen: 'DocumentValidationLoading',
    params: { origin: 'login' },
  },
  {
    name: 'ON_ID_VALIDATION',
    stack: 'Enrollment',
    screen: 'DocumentValidationLoading',
    params: { origin: 'login' },
  },
  {
    name: 'ID_VALIDATED',
    stack: 'Enrollment',
    screen: 'DocumentValidationResponse',
    params: { isOk: true },
  },
  {
    name: 'ID_VALIDATION_FAILED',
    stack: 'Enrollment',
    screen: 'DocumentValidationResponse',
    params: { isOk: false },
  },
  {
    name: 'WAITING_FOR_ID_REVIEW',
    stack: 'Enrollment',
    screen: 'ManualCheck',
    params: { stack: 'documentValidation' },
  },
  // Liveness
  {
    name: 'ID_ENROLLED',
    stack: 'LivenessStack',
    screen: 'LivenessIntro',
    params: {},
  },
  {
    name: 'WAITING_PROOF_OF_LIFE',
    stack: 'LivenessStack',
    screen: 'LivenessIntro',
    params: {},
  },
  {
    name: 'PROOF_OF_LIFE_CAPTURED',
    stack: 'LivenessStack',
    screen: 'LivenessLoading',
    params: { origin: 'login' },
  },
  {
    name: 'ON_PROOF_LIFE_PENDING',
    stack: 'LivenessStack',
    screen: 'LivenessLoading',
    params: { origin: 'login' },
  },
  {
    name: 'PROOF_LIFE_FAILED',
    stack: 'LivenessStack',
    screen: 'LivenessGoToGetPersonalData',
    params: { isOk: false },
  },
  {
    name: 'WAITING_FOR_POF_REVIEW',
    stack: 'Enrollment',
    screen: 'ManualCheck',
    params: { stack: 'liveness' },
  },
  {
    name: 'PROOF_OF_LIFE_COMPLETED',
    stack: 'LivenessStack',
    screen: 'LivenessGoToGetPersonalData',
    params: { isOk: true },
  },
  {
    name: 'PENDING_FOR_ADDRESS_INFO',
    stack: 'PersonalDataStack',
    screen: 'GetPersonalData',
    params: { fromLogin: true },
  },
  {
    name: 'PENDING_FOR_FULFILLMENT_INFO',
    stack: 'PersonalDataStack',
    screen: 'GetWorkData',
    params: { fromLogin: true },
  },
  {
    name: 'FULFILLMENT_INFO_COMPLETED',
    stack: 'PersonalDataStack',
    screen: 'PersonalDataComplete',
    params: { fromLogin: true },
  },
  {
    name: 'PENDING_MFA',
    stack: 'PersonalDataStack',
    screen: 'PersonalDataComplete',
    params: { fromLogin: true },
  },
  {
    name: 'PENDING_FOR_MFA',
    stack: 'PersonalDataStack',
    screen: 'PersonalDataComplete',
    params: { fromLogin: true },
  },
  {
    name: 'MFA_REGISTERED',
    stack: 'PersonalDataStack',
    screen: 'PersonalDataComplete',
    params: { fromLogin: true },
  },
  {
    name: 'REQUESTED',
    stack: 'PersonalDataStack',
    screen: 'PersonalDataComplete',
    params: { fromLogin: true },
  },
  {
    name: 'AUTHORIZED',
    stack: 'CardOfferStack',
    screen: 'CardOfferDetails',
    params: { fromLogin: true },
  },
  {
    name: onboardingStates.contractFailed,
    stack: 'PersonalDataStack',
    screen: 'PersonalDataComplete',
    params: { fromLogin: true },
  },
  {
    name: onboardingStates.contractOfferAuthorized,
    stack: 'CardOfferStack',
    screen: 'CardOfferDetails',
    params: { fromLogin: true },
  },
];

export default events;
