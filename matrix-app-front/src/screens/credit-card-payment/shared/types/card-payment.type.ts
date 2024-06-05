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
}

export interface AddCardProps {
  onPress: () => void;
}

export interface CardIconMap {
  [key: string]: React.FC<SvgProps>;
  Visa: (props: SvgProps) => JSX.Element;
  MasterCard: (props: SvgProps) => JSX.Element;
  Diners: (props: SvgProps) => JSX.Element;
  Amex: (props: SvgProps) => JSX.Element;
  default: (props: SvgProps) => JSX.Element;
}

export interface CardProps {
  account: string;
  id: string;
  isMain: boolean;
  reference: string;
  status: string;
}

export interface CardType {
  cardNumber: string;
  cardType: string;
  cardId: string;
  cardIcon: React.FC<SvgProps>;
  provider: string;
}

export interface CardsListProps {
  cards: CardType[];
  onSelect: (e: CardType | null) => void;
  onDelete: (event: CardType) => void;
  cardSelected?: CardType | null | undefined;
  loading: boolean;
  isLoadingDelete: boolean;
  isFinishDeleteSuccess: boolean;
  navigate: Function;
  testID: string;
}

export interface CardPaymentPayload {
  method: string;
  amount: number;
  currency: string;
  account: string;
}

export interface CardPaymentProps {
  cardInfo: CardType;
  sendPayload: CardPaymentPayload;
}

export type FlatListEventProps = {
  nativeEvent: {
    contentOffset: {
      x: number;
    };
  };
};

export interface IErrorPostPaymentMethod {
  error: IErrorBodyPostPaymentMethod;
  status: number;
}

export interface IErrorBodyPostPaymentMethod {
  code: string;
  description?: string;
  details?: any[];
}
