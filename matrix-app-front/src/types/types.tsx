import { GestureResponderEvent } from 'react-native';
import React from 'react';
import { OrderStatusProps } from 'src/api/types/requestPhysicalCardTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionsProps } from 'src/api/types/TransactionTypes';

export type NavigationType = {
  navigate: Function;
  goBack: Function;
  dispatch: Function;
  reset: Function;
  setOptions: Function;
  push: Function;
  addListener: Function;
};

export type NavigationPropsType = {
  navigation: NavigationType;
  route: {
    params: any;
    key: string;
    name: string;
  };
};

export type StepBoxTypeProps = {
  chipText: string;
  descFirstText: string;
  boldText: string;
  descSecondText: string;
  isComplete?: boolean;
  icon: React.FC;
};
export interface ICheckStates {
  has8Characters: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialCharacter: boolean;
}

export type LeftArrowButtonType = {
  onPress?: (event: GestureResponderEvent) => void | null;
  dark?: boolean;
};

export type MtxDividerTypeProps = {
  height?: number;
  width?: number;
};

export type MtxSvgIconTypeProps = {
  height: number;
  width: number;
  fill?: string;
  strokeColor?: string;
  x?: number;
  y?: number;
};

export type CronoPropsType = {
  visible?: boolean;
  start?: boolean;
  trigger?: Function;
  time: string;
};

export type CameraButtonPropsType = {
  onPress: () => void;
  isLoading: boolean;
};

export type DividerTypeProps = {
  height?: number;
  width?: number;
};

export interface Benefist {
  bucket: string;
  binderImg: string;
  img: string;
  descriptionGift: string;
  expirationDate: string;
  establishment: string;
}

export interface parsedGift {
  title: JSX.Element;
  description: JSX.Element;
  image: JSX.Element;
}
export type DataListPropsType = {
  requestTime: string;
  maskedCard: string;
  requestDate: string;
  pendingPayment: string;
  pendingCreditBalance: number;
};

export type OrderStatusType = {
  navigation: NavigationType;
  deliveryData: OrderStatusProps;
  testID: string;
};

export type TransactionStackParamList = {
  Transactions: undefined;
  TransactionDetail: {
    transaction: TransactionsProps['data']['items'][number];
  };
};

export type MonthType = {
  isSelected: boolean;
  name: string;
  startDate: string;
  endDate: string;
};

export type TransactionDetailProps = NativeStackScreenProps<
  TransactionStackParamList,
  'TransactionDetail'
>;

export type VirtualEventProps = {
  screenName?: string;
  eventName?: string;
  tipoZona?: string;
  zona?: string;
  subZona?: string;
  seccion?: string;
  tipoEvento?: string;
  tipoElemento?: string;
  valor?: string;
  [key: string]: string | undefined;
};

export type AnalyticsProps = {
  analytics?: false | VirtualEventProps;
};

export type InningsList = {
  [key: string]: { value: string; code: string };
};
