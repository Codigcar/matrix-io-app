/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { resetNavigation } from 'src/utils/navigationHandler';
import {
  onboardingStates,
  BIOMETRIC_TIME_AWAIT_POLLING,
  TIME_AWAIT_VALIDATION,
} from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics, logVirtualEventAnalytics, setAnalyticRoute } from 'src/utils/Analytics';
import kycServices from 'src/screens/KYC/services/kycServices';
import { useInterval } from 'usehooks-ts';
import { onboardingSummary } from 'src/api/Onboarding';
import { ProcessStatus } from 'src/utils/types';
import LottieView from 'lottie-react-native';
import IdentityValidation from 'assets/lottie/IdentityValidation.json';
import UploadingDocument from 'assets/lottie/UploadingDocument.json';
import CloudError from 'assets/svgs/cloud-error.svg';
import { i18n } from 'src/utils/core/MTXStrings';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationPropsType } from 'src/types/types';

type ScreensStatusType = Record<ProcessStatus, { title: string; description: string }>;

const screensStatus: ScreensStatusType = {
  failed: {
    title: i18n.t('kyc-document-validation-uploading-error-title'),
    description: i18n.t('kyc-document-validation-uploading-error-text'),
  },
  upload: {
    title: i18n.t('kyc-document-validation-uploading-title'),
    description: i18n.t('kyc-document-validation-uploading-text'),
  },
  getStatus: {
    title: i18n.t('kyc-document-validation-loading-title'),
    description: i18n.t('kyc-document-validation-uploading-text'),
  },
};

const useValidationLoading = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const {
    origin,
    documentFrontUrl,
    documentReverseUrl,
    documentValidationUrl,
  } = route.params;
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [processStatus, setProcessStatus] = useState<ProcessStatus>(
    origin === 'login' ? 'getStatus' : 'upload',
  );
  const isUploading = processStatus === 'upload';
  const screenContent = screensStatus[processStatus];
  const { uploadDocumentImage } = kycServices;

  useEffect(() => {
    if (processStatus === 'upload') {
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp10',
        screenName: navigationScreenNames.documentValidationLoading,
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'SubiendoDocumento-Exito',
      });
    }
  }, []);

  useEffect(() => {
    if (processStatus === 'getStatus') {
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp11',
        screenName: 'DocumentValidationInProcess',
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'ValidandoDni-Exito',
      });
    }
    if (processStatus === 'failed') {
      logVirtualEventAnalytics({
        seccion: 'Error',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'Error al subir tu DNI',
      });
    }
  }, [processStatus]);

  const navigate = (screen: string, params?: object) => {
    setProgress(100);
    setTimeout(() => resetNavigation(navigation, screen, params), 1000);
  };

  const checkOnboardingStatus = async () => {
    setProcessStatus('getStatus');
    setAnalyticRoute('DocumentValidationInProcess');
    try {
      const response = await onboardingSummary();
      const onboardingStatus = response.status;
      if (
        onboardingStatus
        && (onboardingStatus === onboardingStates.idValidationFailed
            || onboardingStatus === onboardingStates.idEnrolled)
      ) {
        setIsPolling(false);
        navigate(navigationScreenNames.validationResponse, { onboardingStatus });
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'KYC/DocumentValidation/DocumentValidationLoading/hooks/useValidationLoading.tsx',
        service: 'onboardingSummary',
        error,
      });
      setIsPolling(false);
      navigate(navigationScreenNames.validationResponse, {
        onboardingStatus: onboardingStates.idValidationFailed,
      });
    }
  };

  const uploadImages = async () => {
    try {
      const baseHeader = {
        'Content-Type': 'image/jpeg',
        'Accept-Encoding': 'gzip, deflate, br',
      };
      const uploadFrontUrl = documentValidationUrl.frontSignedUrl;
      const uploadReverseUrl = documentValidationUrl.reverseSignedUrl;
      await uploadDocumentImage(
        uploadFrontUrl,
        documentFrontUrl.crop,
        baseHeader,
      );
      await uploadDocumentImage(
        uploadReverseUrl,
        documentReverseUrl.crop,
        baseHeader,
      );
      setIsPolling(true);
    } catch (error) {
      setProcessStatus('failed');
    }
  };

  useEffect(() => {
    if (isUploading) {
      uploadImages();
    } else {
      setIsPolling(true);
    }
  }, []);

  useInterval(
    () => setProgress((old) => (old < 80 ? (old + Math.round(Math.random() * 10)) : old)),
    1000,
  );

  useInterval(
    () => {
      checkOnboardingStatus();
    },
    isPolling ? BIOMETRIC_TIME_AWAIT_POLLING : null,
  );

  useInterval(
    () => {
      setIsPolling(false);
      navigate(navigationScreenNames.manualCheck);
    },
    isPolling ? TIME_AWAIT_VALIDATION * 1000 : null,
  );

  const onRetryPress = () => {
    setProcessStatus('upload');
    uploadImages();
  };

  const StatusImage = useCallback(() => {
    if (processStatus === 'failed') {
      return <CloudError width={RFValue(130)} />;
    }

    return (
      <LottieView
        source={isUploading ? UploadingDocument : IdentityValidation}
        resizeMode="contain"
        autoPlay
        loop
      />
    );
  }, [processStatus, isUploading]);

  return {
    onRetryPress,
    processStatus,
    progress,
    screenContent,
    StatusImage,
  };
};

export default useValidationLoading;
