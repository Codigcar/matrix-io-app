declare module 'matrix-thales-d1' {}

export const WALLET_PACKAGE_NAME: string;
export const GOOGLE_WALLET_URL: string;

export enum CARD_STATE {
  ACTIVE,
  INACTIVE,
  EXPIRED,
  DELETED,
  PENDING_IDV,
  UNKNOWN,
}
export enum DIGITALIZATION_STATE {
  DIGITIZED,
  NOT_DIGITIZED,
  PENDING_IDV,
  DIGITIZATION_IN_PROGRESS,
}

export type CardDetails = {
  name: string;
  pan: string;
  cvv: string;
  expiryDate: string;
};

export type CardMetadata = {
  expiryDate: string;
  maskedPan: string;
  cardState: CARD_STATE;
};

export declare function configure(
  d1ServiceUrl: string,
  issuerId: string,
  publicKeyExponent: string,
  publicKeyModulus: string,
  cardUrl: string,
  consumerId: string,
): Promise<any>;
export declare function login(accessToken: string): Promise<boolean>;
export declare function logout(): Promise<boolean>;
export declare function getCardMetadata(cardId: string): Promise<CardMetadata>;
export declare function getCardDetails(cardId: string): Promise<CardDetails>;
export declare function getDigitizationState(cardId: string): Promise<DIGITALIZATION_STATE>;
export declare function digitizeCard(cardId: string): Promise<boolean>;
export declare function isCardDigitized(cardId: string): Promise<boolean>;
export declare function activateDigitalCard(cardId: string): Promise<boolean>;
export declare function getLibVersions(): string;
export declare function isWalletInstalled(): Promise<boolean>;
