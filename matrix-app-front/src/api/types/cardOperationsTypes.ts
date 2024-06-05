export interface CardProps {
  account: string;
  id: string;
  isMain: boolean;
  reference: string;
  status: string;
}
export interface CardReissueProps {
  code?: string;
  message: string;
}
