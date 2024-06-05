interface ICreditCardTypeProps {
  testID?: string;
  isInfoButtonDisabled?: boolean;
  consumed: IConsumed;
  disabled?: boolean;
  balanceLoading: boolean;
  errorServiceBalance: boolean;
}

interface IConsumed {
  PEN: {
    amount: number;
    currency: string;
  };
  USD: {
    amount: number;
    currency: string;
  };
}

interface IConsumedCard {
  balanceLoading: boolean;
  consumed: IConsumed;
  isMultiCurrency: boolean;
  showBalance?: boolean
}

export type {
  ICreditCardTypeProps,
  IConsumed,
  IConsumedCard,
};
