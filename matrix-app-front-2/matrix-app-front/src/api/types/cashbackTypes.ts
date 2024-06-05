export type CashbackResponse = Cashback[];

export interface Cashback {
  account: string;
  pointsBalance: string;
  pointsExchangeRate: string;
  pointsAmount: string | number;
  expiryDate: string;
}
export interface RedemptionProcessingResponse {
  redemptionId: string;
}

export interface RedemptionStatusResponse {
    id : string,
    description?: string,
    points: number,
    lastUpdate: string,
    status: 'REQUESTED' | 'COMPLETED' | 'FAILED',
    card: {
      id: string;
      alias: string;
    };
    errorReason?: string,
    errorCode?: 'INVALID_POINTS' | 'INVALID_CARD_ACCOUNT' | 'PROVIDER_ERROR' | 'INVALID_CARD_STATUS';
}
