import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Modal, rebrandingTheme } from 'matrix-ui-components';
import { LoadingIndicator } from 'src/components/LoadingIndicator/LoadingIndicator';
import { ThemeProvider } from '@shopify/restyle';
import { AuthErrorCodeEnum, ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';

interface ModalContextData {
  mysteryBoxModal: boolean;
  verifyEmailModal: boolean;
  fraudBlockModal: boolean;
  forceUpdateModal: boolean;
  optionalUpdateModal: boolean;
  authErrorModal: boolean;
  blockLoginModal: boolean;
  updateFraudBlockModal: (updateFraudBlockModalValue: boolean) => void;
  updateBlockLoginModal: (updateBlockLoginModalValue: boolean) => void;
  updateVerifyEmailModal: (updateVerifyEmailModalValue: boolean) => void;
  updateMysteryBoxModal: (updateMysteryBoxModalValue: boolean) => void;
  updateAuthErrorModal: (updateMysteryBoxModalValue: boolean) => void;
  updateTypeAuthErrorModal: (typeAuthErrorModalValue: string) => void;
  updateScreenCurrentModal: (screenCurrentModalValue: string) => void;
  updateForceUpdateModal: (updateForceUpdateModalValue: boolean) => void;
  updateOptionalUpdateModal: (updateOptionalUpdateModal: boolean) => void;
  showLoading: () => void;
  stopLoading: () => void;
  typeAuthErrorModal: string;
  screenCurrentModal: string;
}

const ModalContext = createContext<ModalContextData>({
  mysteryBoxModal: false,
  verifyEmailModal: false,
  fraudBlockModal: false,
  forceUpdateModal: false,
  optionalUpdateModal: false,
  authErrorModal: false,
  blockLoginModal: false,
  updateVerifyEmailModal: () => {},
  updateMysteryBoxModal: () => {},
  updateFraudBlockModal: () => {},
  updateForceUpdateModal: () => {},
  updateOptionalUpdateModal: () => {},
  updateBlockLoginModal: () => {},
  updateAuthErrorModal: () => {},
  updateTypeAuthErrorModal: () => {},
  updateScreenCurrentModal: () => {},
  showLoading: () => {},
  stopLoading: () => {},
  typeAuthErrorModal: AuthErrorCodeEnum.UNEXPECTED_ERROR,
  screenCurrentModal: ScreenCurrentEnum.SIGN_UP,
});

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: any) => {
  const [mysteryBoxModal, setMysteryBoxModal] = useState(false);
  const [verifyEmailModal, setVerifyEmailModal] = useState(false);
  const [fraudBlockModal, setFraudBlockModal] = useState(false);
  const [blockLoginModal, setBlockLoginModal] = useState(false);
  const [forceUpdateModal, setForceUpdateModal] = useState(false);
  const [optionalUpdateModal, setOptionalUpdateModal] = useState(false);
  const [authErrorModal, setAuthErrorModal] = useState(false);
  const [typeAuthErrorModal, setTypeAuthErrorModal] = useState<string>(
    AuthErrorCodeEnum.UNEXPECTED_ERROR,
  );
  const [screenCurrentModal, setScreenCurrentModal] = useState<string>(ScreenCurrentEnum.SIGN_UP);
  const [isLoading, setIsLoading] = useState(false);

  const updateVerifyEmailModal = (updateVerifyEmailModalValue: boolean) => {
    setVerifyEmailModal(updateVerifyEmailModalValue);
  };

  const updateMysteryBoxModal = (updateMysteryBoxModalValue: boolean) => {
    setMysteryBoxModal(updateMysteryBoxModalValue);
  };

  const updateBlockLoginModal = (updateBlockLoginModalValue: boolean) => {
    setBlockLoginModal(updateBlockLoginModalValue);
  };

  const updateFraudBlockModal = (updateFraudBlockModalValue: boolean) => {
    setFraudBlockModal(updateFraudBlockModalValue);
  };

  const updateAuthErrorModal = (updateAuthErrorModalValue: boolean) => {
    setAuthErrorModal(updateAuthErrorModalValue);
  };

  const updateTypeAuthErrorModal = (typeAuthErrorModalValue: string) => {
    setTypeAuthErrorModal(typeAuthErrorModalValue);
  };

  const updateScreenCurrentModal = (screenCurrentModalValue: string) => {
    setScreenCurrentModal(screenCurrentModalValue);
  };

  const updateForceUpdateModal = (updateForceUpdateModalValue: boolean) => {
    setForceUpdateModal(updateForceUpdateModalValue);
  };

  const updateOptionalUpdateModal = (updateOptionalUpdateModalValue: boolean) => {
    setOptionalUpdateModal(updateOptionalUpdateModalValue);
  };

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      mysteryBoxModal,
      verifyEmailModal,
      fraudBlockModal,
      authErrorModal,
      typeAuthErrorModal,
      blockLoginModal,
      updateAuthErrorModal,
      updateTypeAuthErrorModal,
      forceUpdateModal,
      optionalUpdateModal,
      updateVerifyEmailModal,
      updateMysteryBoxModal,
      updateFraudBlockModal,
      updateForceUpdateModal,
      updateOptionalUpdateModal,
      showLoading,
      stopLoading,
      updateBlockLoginModal,
      screenCurrentModal,
      updateScreenCurrentModal,
    }),
    [
      showLoading,
      stopLoading,
      mysteryBoxModal,
      verifyEmailModal,
      fraudBlockModal,
      blockLoginModal,
      typeAuthErrorModal,
      authErrorModal,
      screenCurrentModal,
      forceUpdateModal,
      optionalUpdateModal,
    ],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal animationType="fade" transparent visible={isLoading}>
        <ThemeProvider theme={rebrandingTheme}>
          <LoadingIndicator />
        </ThemeProvider>
      </Modal>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
