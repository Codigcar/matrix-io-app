export interface IRedemptionResponse {
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
