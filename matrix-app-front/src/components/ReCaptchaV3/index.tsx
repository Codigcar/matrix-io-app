import React, { useState, forwardRef, useEffect } from 'react';
import { useInterval } from 'usehooks-ts';
import { REFRESH_TOKEN_RECAPTCHA } from 'src/utils/constants';
import ReCaptchaComponent from './ReCaptchaComponent';

export type IProps = {
  captchaDomain: string;
  onReceiveToken: (captchaToken: string) => void;
  siteKey: string;
  action: string;
};

export type IState = {};

const ReCaptchaV3 = forwardRef((props: IProps, ref) => {
  const {
    action, captchaDomain, siteKey, onReceiveToken,
  } = props;
  const [refreshTokenTimer, setRefreshTokenTimer] = useState(REFRESH_TOKEN_RECAPTCHA);

  const refreshToken = () => {
    ref.current.refreshToken();
  };

  useInterval(() => {
    refreshToken();
  }, refreshTokenTimer);

  useEffect(() => {
    if (refreshTokenTimer <= 0) setRefreshTokenTimer(REFRESH_TOKEN_RECAPTCHA);
  }, [refreshTokenTimer]);

  return (
    <ReCaptchaComponent
      ref={ref}
      action={action}
      captchaDomain={captchaDomain}
      siteKey={siteKey}
      onReceiveToken={(token: string) => onReceiveToken(token)}
    />
  );
});

export default ReCaptchaV3;
