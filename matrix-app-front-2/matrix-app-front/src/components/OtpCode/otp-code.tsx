import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { FormikHelpers } from 'formik';
import moment from 'moment';
import useCountDown from 'react-countdown-hook';
import { Box, OtpCodeInput, Text, TouchableOpacityBox } from 'matrix-ui-components';
import { INTERVAL_TIME } from 'src/utils/constants';
import { Form } from 'src/components/Form';
import { i18n } from 'src/utils/core/MTXStrings';
import { vs } from 'src/utils/sizes';
import { checkValue, deleteValue, getValue, saveValue } from 'src/utils/AsyncStorageHandler';

export interface OtpCodeProps {
  onSubmit: (code: string) => Promise<boolean | undefined> | boolean | undefined;
  afterSubmitSuccess: (code: string) => Promise<void>;
  onError: (error: any) => Promise<void> | void;
  onResendCode: () => Promise<{ hasExceededOTP: boolean } | undefined> | void;
  successAnimationTimeout: number;
  retryKey: string;
  retryTimeOut: number;
  title: string;
  subtitle: string;
  subtitleEmphasized?: string;
  awaitText: string;
  footerTitle: string;
  footerSubtitle: string;
}
export interface ICodeForm {
  code: string;
}

const OtpCode = (props: OtpCodeProps) => {
  const {
    onSubmit,
    afterSubmitSuccess,
    onError,
    onResendCode,
    successAnimationTimeout = 0,
    retryKey,
    retryTimeOut,
    title,
    subtitle,
    subtitleEmphasized = '',
    awaitText,
    footerTitle,
    footerSubtitle,
  } = props;
  const initialTime = retryTimeOut * 1000;
  const [isExceededOtp, setIsExceededOtp] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeReSendCode, { start: startTimer, reset: resetTimer }] = useCountDown(
    initialTime,
    INTERVAL_TIME,
  );
  const minutesCountDown = Math.floor(timeReSendCode / 60000);
  const secondsCountDown = minutesCountDown === 0 ? Math.ceil(timeReSendCode % 60000) / 1000 : 0;
  const disableResendCode = timeReSendCode > 0 || isDisabled || isExceededOtp;

  const saveTime = async () => {
    const currentDate = moment();
    await saveValue(retryKey, currentDate);
  };

  const getTimeDiff = async () => {
    const startTimeBlock = await getValue(retryKey);
    const currentDate = moment();
    const startTime = moment(startTimeBlock);
    return currentDate.diff(startTime, 'minutes');
  };

  const openMailApp = () => {
    try {
      Linking.openURL('mailto:contacto@io.pe');
    } catch (error) {
      console.error(error);
    }
  };

  const onCodeSubmit = async (values: ICodeForm, formikHelpers: FormikHelpers<ICodeForm>) => {
    const { code } = values;
    try {
      setIsDisabled(true);
      await onSubmit(code);
      setIsSuccess(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, successAnimationTimeout);
      });
      afterSubmitSuccess(code);
    } catch (error) {
      setIsDisabled(false);
      formikHelpers.setFieldValue('code', '');
      await new Promise((r) => {
        setTimeout(r);
      });
      formikHelpers.setErrors({ code: i18n.t('verifyOTP.otp-error-incorrect') });
      onError(error);
    }
  };

  const onResend = async () => {
    startTimer(initialTime);
    const { hasExceededOTP } = (await onResendCode()) ?? {};
    if (hasExceededOTP) {
      setIsExceededOtp(true);
      saveTime();
      resetTimer();
    }
  };

  useEffect(() => {
    const checkBlock = async () => {
      const isBlock = await checkValue(retryKey);
      if (isBlock) {
        const timeDiff = await getTimeDiff();
        if (timeDiff >= 59) {
          await deleteValue(retryKey);
          startTimer();
          setIsExceededOtp(false);
        } else {
          setIsExceededOtp(true);
          resetTimer();
        }
      } else {
        setIsExceededOtp(false);
        startTimer();
      }
    };
    checkBlock();
  }, []);

  return (
    <Form onSubmit={onCodeSubmit} validateOnMount validateOnChange initialValues={{ code: '' }}>
      {({ values, handleChange, handleSubmit, errors }) => (
        <Box flex={1} mx="spacing-m">
          <Box height={vs(74)} />
          <Text variant="Heading20Medium" color="primary1000" mb="spacing-xxs">
            {title}
          </Text>
          <Box mr="spacing-l" mb="spacing-m">
            <Text variant="body13Regular" mr="spacing-xs">
              {subtitle}
              <Text variant="body14SemiBold" color="primary1000">
                {' '}
                {subtitleEmphasized}
              </Text>
            </Text>
          </Box>

          <OtpCodeInput
            value={values.code}
            onTextChange={handleChange('code')}
            onComplete={handleSubmit}
            disabled={isDisabled}
            error={!!errors.code}
            success={isSuccess}
            helperText={errors.code}
          />

          <TouchableOpacityBox
            flexDirection="row"
            alignItems="center"
            mt="spacing-s"
            onPress={onResend}
            disabled={disableResendCode}
            testID="resendCode"
          >
            <Text variant="body13SemiBold" color={disableResendCode ? 'primary400' : undefined}>
              {awaitText}
            </Text>
            {minutesCountDown ? (
              <Text variant="body14Regular" color="primary800">
                {i18n.t('verifyOTP.button-await-en-text')}
                {i18n.t('verifyOTP.button-end-min-text', { time: minutesCountDown })}
              </Text>
            ) : null}
            {secondsCountDown ? (
              <Text variant="body14Regular" color="primary800">
                {i18n.t('verifyOTP.button-await-en-text')}
                {i18n.t('verifyOTP.button-end-seg-text', { time: secondsCountDown })}
              </Text>
            ) : null}
          </TouchableOpacityBox>

          <Text mt="spacing-l" mb="spacing-xxs" textAlign="center" variant="body14SemiBold">
            {footerTitle}
          </Text>

          <TouchableOpacityBox onPress={openMailApp}>
            <Text textAlign="center" variant="body14Regular" color="primary800">
              {footerSubtitle}
            </Text>
          </TouchableOpacityBox>
        </Box>
      )}
    </Form>
  );
};

export default OtpCode;
