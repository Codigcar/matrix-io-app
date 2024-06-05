export type PaymentMethod = {
  alias: string;
  brand: string;
  id: string;
  provider: string;
  type: string;
};

export type CardType = {
  cardNumber: string;
  cardType: string;
  cardId: string;
  cardIcon: React.FC<any>;
  provider: string;
};
