import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';
import { Modal, rebrandingTheme } from 'matrix-ui-components';
import { LoadingIndicator } from 'src/components/LoadingIndicator/LoadingIndicator';
import { ThemeProvider } from '@shopify/restyle';
import { AuthErrorCodeEnum, ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';

interface ModalContextData {
  mysteryBoxModal: boolean;
  verifyEmailModal: boolean;
  blockLoginModal: boolean;
  authErrorModal: boolean;
  updateVerifyEmailModal: (updateVerifyEmailModalValue: boolean) => void;
  updateMysteryBoxModal: (updateMysteryBoxModalValue: boolean) => void;
  updateAuthErrorModal: (updateMysteryBoxModalValue: boolean) => void;
  updateBlockLoginModal: (updateBlockLoginModalValue: boolean) => void;
  updateTypeAuthErrorModal: (typeAuthErrorModalValue: string) => void;
  updateScreenCurrentModal: (screenCurrentModalValue: string) => void;
  forceUpdateModal: boolean;
  updateForceUpdateModal: (updateForceUpdateModalValue: boolean) => void;
  showLoading: () => void;
  stopLoading: () => void;
  typeAuthErrorModal: string;
  screenCurrentModal: string;
}

const ModalContext = createContext<ModalContextData>({
  mysteryBoxModal: false,
  verifyEmailModal: false,
  blockLoginModal: false,
  authErrorModal: false,
  updateVerifyEmailModal: () => {},
  updateMysteryBoxModal: () => {},
  updateAuthErrorModal: () => {},
  updateTypeAuthErrorModal: () => {},
  updateBlockLoginModal: () => {},
  updateScreenCurrentModal: () => {},
  forceUpdateModal: false,
  updateForceUpdateModal: () => {},
  showLoading: () => {},
  stopLoading: () => {},
  typeAuthErrorModal: AuthErrorCodeEnum.UNEXPECTED_ERROR,
  screenCurrentModal: ScreenCurrentEnum.SIGN_UP,
});

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: any) => {
  const [mysteryBoxModal, setMysteryBoxModal] = useState(false);
  const [verifyEmailModal, setVerifyEmailModal] = useState(false);
  const [authErrorModal, setAuthErrorModal] = useState(false);
  const [typeAuthErrorModal, setTypeAuthErrorModal] = useState<string>(
    AuthErrorCodeEnum.UNEXPECTED_ERROR,
  );
  const [blockLoginModal, setBlockLoginModal] = useState(false);
  const [screenCurrentModal, setScreenCurrentModal] = useState<string>(ScreenCurrentEnum.SIGN_UP);
  const [forceUpdateModal, setForceUpdateModal] = useState(false);
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
      forceUpdateModal,
      updateVerifyEmailModal,
      updateMysteryBoxModal,
      updateForceUpdateModal,
      showLoading,
      stopLoading,
      authErrorModal,
      updateAuthErrorModal,
      typeAuthErrorModal,
      updateTypeAuthErrorModal,
      blockLoginModal,
      updateBlockLoginModal,
      screenCurrentModal,
      updateScreenCurrentModal,
    }),
    [
      mysteryBoxModal,
      showLoading,
      stopLoading,
      verifyEmailModal,
      typeAuthErrorModal,
      authErrorModal,
      blockLoginModal,
      screenCurrentModal,
      forceUpdateModal,
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
