import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge } from 'react-hook-form';

export interface ReferralCodeProps {
  control: Control<FieldValues, any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  toggleReferralSwitch?: (value: boolean) => void;
}
