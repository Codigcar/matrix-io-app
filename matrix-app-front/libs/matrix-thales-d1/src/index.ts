import { CardDetails, CardMetadata, DIGITALIZATION_STATE } from 'matrix-thales-d1';
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR = `The package 'matrix-thales-d1' doesn't seem to be linked. Make sure: \n\n${Platform.select(
  {
    ios: "- You have run 'pod install'\n",
    default: '',
  },
)}- You rebuilt the app after installing the package\n - You are not using Expo Go\n`;

const thalesModule = NativeModules.ThalesD1 || NativeModules.D1Plugin;

const proxyError = new Proxy(
  {},
  {
    get() {
      throw new Error(LINKING_ERROR);
    },
  },
);

export const WALLET_PACKAGE_NAME: string = 'com.google.android.apps.walletnfcrel';
export const GOOGLE_WALLET_URL: string =
  'https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel';

export const ThalesD1 = thalesModule || proxyError;

export async function configure(
  d1ServiceUrl: string,
  issuerId: string,
  publicKeyExponent: string,
  publicKeyModulus: string,
  cardUrl: string,
  consumerId: string,
): Promise<boolean> {
  return ThalesD1.configure(
    d1ServiceUrl,
    issuerId,
    publicKeyExponent,
    publicKeyModulus,
    cardUrl,
    consumerId,
  );
}

export async function login(accessToken: string): Promise<boolean> {
  return ThalesD1.login(accessToken);
}

export async function logout(): Promise<boolean> {
  return ThalesD1.logout();
}

export async function getCardMetadata(cardId: String): Promise<CardMetadata> {
  return ThalesD1.getCardMetadata(cardId);
}

export async function getCardDetails(cardId: String): Promise<CardDetails> {
  return ThalesD1.getCardDetails(cardId);
}

export async function getDigitizationState(cardId: String): Promise<DIGITALIZATION_STATE> {
  return ThalesD1.getDigitizationState(cardId);
}

export async function digitizeCard(cardId: String): Promise<boolean> {
  return ThalesD1.digitizeCard(cardId);
}

export async function isCardDigitized(cardId: String): Promise<boolean> {
  const state = await getDigitizationState(cardId);

  return state === DIGITALIZATION_STATE.DIGITIZED;
}

export async function activateDigitalCard(cardId: String): Promise<boolean> {
  return ThalesD1.activateDigitalCard(cardId);
}

export function getLibVersions(): String {
  return ThalesD1.getLibVersions();
}

export async function isWalletInstalled(): Promise<boolean> {
  if (Platform.OS === 'android') {
    return ThalesD1.isWalletInstalled(WALLET_PACKAGE_NAME);
  }
  return ThalesD1.isWalletInstalled();
}
