import { AxiosResponse } from 'axios';
import { SvgProps } from 'react-native-svg';

export interface SelectMountPaymentProps {
  title: string;
  mountMoney: string | number;
  onPress: () => void;
  isSelected: boolean;
  grayText?: boolean;
  warningText?: string | null;
  autoFocus?: boolean;
  inputRef?: any;
  moneySymbol: string;
  onChange?: (value: string | number) => void;
  inputValue?: string | number;
  disabled?: boolean;
  testID?: string;
  testIDInput?: string;
}

export interface AddCardProps {
  onPress: () => void;
}

export interface CardProps {
  cardNumber: string;
  cardType: string;
  cardId: string;
  // eslint-disable-next-line no-undef
  cardIcon: (props: SvgProps) => JSX.Element;
  provider: string;
}
export interface CardsListProps {
  cards: CardProps[];
  onSelect: (e: CardProps | null) => void;
  cardSelected?: CardProps | null | undefined;
  loading: boolean;
  navigate: Function;
  testID?: any,
}
export interface CardPaymentPayload {
  method: string;
  amount: number;
  currency: string;
  account: string;
}
export interface CardPaymentProps {
  cardInfo: CardProps;
  sendPayload: CardPaymentPayload;
}

export interface CardPaymentResponse {
  id: string;
  amount: string;
  createAt: string;
}

export interface PaymentMethodI {
  postPaymentMethod: (culqi: string) => Promise<IPostPaymentMethod>;
  getPaymentMethod: () => Promise<any>;
  deletePaymentMethod: (cardId: string) => Promise<AxiosResponse<any, any>>;
  cardPayment: (body: CardPaymentPayload) => Promise<CardPaymentResponse>;
  getPaymentStatus: (method: string) => Promise<getPaymentStatusResponse>;
}

export interface getTokenCulquiI {
  cardNumber: string;
  cardExpiredMonth: string;
  cardExpiredYear: string;
  cardCVV: string;
  cardEmail: string;
}

export type FlatListEventProps = {
  nativeEvent: {
    contentOffset: {
      x: number;
    };
  };
};

export interface SuccessLabelInfoProps {
  iconName: string;
  label: string;
  boldText?: boolean;
}

export interface getPaymentStatusResponse {
  account: string;
  amount: number;
  chargeOperation: string;
  createAt: Date;
  currency: string;
  id: string;
  method: string;
  pendingAmount: number;
  status: 'FAILED' | 'COMPLETED' | 'APPROVED' | 'DECLINED';
  updatedAt: Date;
  user: string;
  error?: {
    code?: string;
  };
}

export interface IErrorPostPaymentMethod {
  error: IErrorBodyPostPaymentMethod;
  status: number;
}
export interface IErrorBodyPostPaymentMethod {
  code: string;
  description?: string;
  details?: any[];
}

export interface IPostPaymentMethod {
  alias: string;
  brand: string;
  id: string;
  provider: string;
  type: string;
}
