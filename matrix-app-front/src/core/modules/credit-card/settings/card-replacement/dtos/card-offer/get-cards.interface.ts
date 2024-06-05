export interface ICard {
  account: string;
  id: string;
  isMain: boolean;
  reference: string;
  status: string;
}

export type IGetCards = ICard[];
