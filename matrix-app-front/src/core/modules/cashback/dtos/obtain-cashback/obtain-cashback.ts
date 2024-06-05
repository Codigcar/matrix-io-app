interface IObtainCashback extends Array<ICashbackItem> {}

export interface ICashbackItem {
  account: string;
  pointsBalance: string;
  pointsExchangeRate: string;
  pointsAmount: string;
  expiryDate: string;
}

export default IObtainCashback;
