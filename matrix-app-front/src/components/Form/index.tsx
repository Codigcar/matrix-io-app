import React, { useMemo } from 'react';
import {
  Formik, FormikConfig, FormikErrors, FormikValues,
} from 'formik';
import { i18n } from 'src/utils/core/MTXStrings';
import { createSchemaByIds } from './form.scheme';

export const prepareSchema = (object: string[], validationSchema?: any) =>
  createSchemaByIds(object, i18n.t, validationSchema);

export const FormComponent = <T extends FormikValues>(
  innerProps: CustomFormikProps<T>,
  prepareSchemaProp: (object: string[], validationSchema?: any) => any,
) => {
  const schema = useMemo(() => {
    const { initialValues, validationSchema } = innerProps;
    return prepareSchemaProp(Object.keys(initialValues) as any, validationSchema);
  }, [innerProps, prepareSchemaProp]);
  return (
    <Formik validationSchema={schema} {...innerProps}>
      {(props) => {
        const { children } = innerProps;
        const newProps = props;
        const { errors, touched } = newProps;
        const touchedErrors: FormikErrors<T> = {};
        Object.keys(errors).forEach((errorKey) => {
          if (touched[errorKey]) {
            touchedErrors[errorKey] = errors[errorKey];
          }
        });
        newProps.errors = touchedErrors;
        return typeof children === 'function'
          ? children(newProps)
          : children;
      }}
    </Formik>
  );
};

interface CustomFormikProps<T extends FormikValues> extends FormikConfig<T> {
  initialValues: T;
}

export const Form = <T extends FormikValues>(props: CustomFormikProps<T>) =>
  FormComponent(props, prepareSchema);
