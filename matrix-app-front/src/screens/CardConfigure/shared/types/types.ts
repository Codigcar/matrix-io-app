/*
    TODO: This type `PropsWithTestID` will be moved to a global types (shared/types)
    when we have all changes of Dambert related to refactor
    Mod. Date: 14/12/2023
*/
export type PropsWithTestID<P> = P & { testID?: string | undefined };

export type Card = {
  id: string;
  label: string;
  type: string;
  status: boolean;
  isBlock: boolean;
  loading: boolean;
  requireChangePin?: boolean;
};

export type Restriction = {
  id: number;
  label: string;
  type: string;
  restriction: string;
  status: boolean;
  loading: boolean;
  isHiding?: boolean;
};
