import { PropsWithChildren } from 'react';
import { PropsWithTestID } from './types';

export interface CardItemProps extends PropsWithChildren<any>, PropsWithTestID<any> {}

export interface IconSwitchListItemProps extends PropsWithTestID<any> {
  label: string;
  type?: string;
  status?: boolean;
  onChange: any;
  loading?: boolean;
  isBlocked?: boolean;
}

export interface SupplementaryCardChangePinProps extends PropsWithTestID<any> {
  onPress: () => void;
}
