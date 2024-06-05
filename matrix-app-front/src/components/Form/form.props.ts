import React from 'react';
import { FormikHelpers, FormikTouched } from 'formik';

export type FormValues = {
  [field: string]: any;
};

export type TranslateType = (keyTranslate: string) => string;

export interface RenderProps {
  handleChange: any;
  handleBlur: any;
  handleSubmit: (e?: React.FormEvent<any>) => void;
  handleReset: (e?: React.SyntheticEvent<any>) => void;
  values: FormValues;
  errors: any;
  isValid: boolean;
  touched: FormikTouched<FormValues>;
  schema: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  setFieldTouched?: FormikHelpers<FormValues>['setFieldTouched'];
  isSubmitting?: boolean;
}

export interface FormProps {
  validationSchema?: any | (() => any);
  initialValues: FormValues;
  resetOnSubmit?: boolean;
  resetDelay?: number;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => void | Promise<any>;
  onFocus?: () => void;
  children: (props: RenderProps) => void;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnMount?: boolean;
  onValid?: (boolean: boolean) => void;
  enableReinitialize?: boolean;
  reference?: any;
}
