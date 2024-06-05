import { RefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export interface SkeletonProps {
  isVisible?: boolean;
  backgroundColor?: string;
  speed?: number;
}

export type NavigationRefType = RefObject<NavigationContainerRef<ReactNavigation.RootParamList>>;

export type ScreenClassType = {
  tipoZona: string;
  zona: string;
  subZona: string;
  seccion: string;
};

export type ProcessStatus = 'getStatus' | 'upload' | 'failed';

export type ICurrencyCode = 'PEN' | 'USD';
export type ICurrencyName = 'Soles' | 'Dólares'
export type ICurrencySymbol = 'S/' | '$'
export interface ICurrency {
  name: ICurrencyName;
  code: ICurrencyCode;
  symbol: ICurrencySymbol;
}
