interface UserProps {
  lastName: string;
  gender: string;
  documentNumber: string;
  dob: string;
  name: string;
  location?: {
    address?: string;
    state?: string;
  };
}

interface OfferProps {
  tea: number;
  dataProtectionClauseAccepted: boolean;
  desgravamen: number;
  billingDay: number;
  id: string;
  conditions: {
    desgravamen: number;
    billingDay: number;
    tea: number;
    currency: string;
    creditLine: number;
    tcea: number;
  };
  tcea: number;
}

interface CognitoProps {
  emailVerified: boolean;
  sub: string;
  cognitoUserStatus: string;
  phone: string;
  name: null | string;
  phoneNumberVerified: boolean;
  userName: string;
  userPoolId: string;
  dni: string;
  email: string;
}

interface KYCProps {
  profession: string;
  location: {
    address: string;
    department: string;
    province: string;
    district: string;
  };
  occupation: string;
  workplace: string;
  peruResident: boolean;
}

export interface DocumentProps {
  bucket: string;
  type: string;
  key: string;
}

export interface ProofOfLifeProps {
  uploadIntent: {
    id: number;
    time: string;
    video: string;
    actions: string[];
    status: string;
  };
  validationIntent: {
    startedAt: string;
    id: number;
    status: string;
    finishedAt: string;
  };
}

interface AccountProps {
  reference: string;
  externalCustomerId: string;
  balance: number;
  lastDepositAmount: number;
  ledgerBalance: number;
  customerId: string;
  contractId: string;
  creditLimit: number;
  id: string;
  externalTransactionId: string;
  purchaseApr: number;
}

interface CardProps {
  reference: string;
  accountId: string;
  customerId: string;
  contractId: string;
  creditLimit: number;
  alias: string;
  id: string;
  externalTransactionId: string;
  isVirtual: boolean;
  type: string;
  purchaseApr: number;
  status: string;
}

interface CustomerProps {
  profession?: string;
  lastName?: string;
  occupation?: string;
  gender?: string;
  document?: {
    documentIssueAt?: string;
    documentNumber?: string;
  };
  emailVerified?: boolean;
  phoneNumber?: string;
  name?: string;
  phoneNumberVerified?: boolean;
  location?: {
    address?: string;
    state?: string;
    province?: string;
    district?: string;
    peruResident?: boolean;
  };
  id?: string;
  workplace?: string;
  email?: string;
  status?: string;
}

export interface SumaryProps {
  status: string;
  updatedAt: string;
  declinedReason?: {
    code: string,
    msg: string
  };
}

export interface OnboardingProps {
  status: string;
  user: UserProps;
  offer?: OfferProps;
  cognitoUser?: CognitoProps;
  kyc?: KYCProps;
  document?: DocumentProps;
  proofOfLife?: ProofOfLifeProps;
  account?: AccountProps;
  card?: CardProps;
  customer?: CustomerProps;
}
