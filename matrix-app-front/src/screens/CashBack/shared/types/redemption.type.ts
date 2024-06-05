export interface Redemption {
  account: string;
  points: number;
}

export interface RedemptionProps {
  send: Redemption;
}
