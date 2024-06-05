export interface IBalance {
  consumed: {
    PEN: {
      amount: number;
      currency: string;
    };
    USD: {
      amount: number;
      currency: string;
    };
  };
  available: {
    PEN: {
      amount: number;
      currency: string;
    };
    USD: {
      amount: number;
      currency: string;
    };
  };
  creditLimit: {
    PEN: {
      amount: number;
      currency: string;
    };
    USD: {
      amount: number;
      currency: string;
    };
  };
  isDelinquent?: boolean;
}
