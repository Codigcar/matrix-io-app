/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { i18n } from 'src/utils/core/MTXStrings';
import { Pressable } from 'react-native';
import { getValue, saveValue } from 'src/utils/AsyncStorageHandler';
import { TIME_INCENTIVE_TOAST } from 'src/utils/constants';
import { BaseToast } from 'src/matrix-ui-components/components/toast';
import Wallet from 'assets/svgs/wallet.svg';

const toastConfig = {
  default: ({ props }: any) => (
    <Pressable onPress={props.onPressToast}>
      <BaseToast
        message={i18n.t('wallet-flow.pay-with-io-message')}
        icon={<Wallet />}
      />
    </Pressable>
  ),
};

const ToastPayIO = ({ onPressToast }: { onPressToast: () => void }) => {
  const [show, setShow] = useState(true);
  const checkValues = async () => {
    const showFirstIncentive = (await getValue('showIncentiveBottom')) ?? false;
    if (showFirstIncentive) {
      const showSecondIncentive = (await getValue('showIncentiveToast')) ?? false;
      if (showSecondIncentive) {
        setShow(false);
      } else {
        setShow(true);
        Toast.show({ props: { onPressToast } });
      }
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    checkValues();
  }, []);

  const onHideToast = async () => {
    await saveValue('showIncentiveToast', true);
  };

  return (
    <>
      {show && (
        <Toast
          visibilityTime={TIME_INCENTIVE_TOAST}
          type="default"
          config={toastConfig}
          onHide={onHideToast}
        />
      )}
    </>
  );
};

export default ToastPayIO;
