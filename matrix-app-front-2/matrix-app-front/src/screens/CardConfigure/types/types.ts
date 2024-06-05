import { PropsWithChildren } from 'react';
import { NavigationPropsType } from 'src/types/types';
/*
    TODO: This type `PropsWithTestID` will be moved to a global types (shared/types)
    when we have all changes of Dambert related to refactor
    Mod. Date: 14/12/2023
*/
type PropsWithTestID<P> = P & { testID?: string | undefined };

export type Card = {
    id: string;
    label: string;
    type: string;
    status: boolean;
    isBlock: boolean;
    loading: boolean;
    requireChangePin?: boolean;
}

export type Restriction = {
    id: number;
    label: string;
    type: string;
    restriction: string;
    status: boolean;
    loading: boolean;
    isHiding?: boolean;
}

// Components
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

// Screens
export interface CardConfigureHomeProps extends PropsWithTestID<any>, NavigationPropsType {}
