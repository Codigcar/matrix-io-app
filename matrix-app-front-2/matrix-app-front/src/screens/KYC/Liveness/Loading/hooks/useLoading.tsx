/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  onboardingStates,
  BIOMETRIC_TIME_AWAIT_POLLING,
  TIME_AWAIT_VALIDATION,
  TIME_AWAIT_PASSIVE_LIVENESS,
  onboarding,
} from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics, logVirtualEventAnalytics, setAnalyticRoute } from 'src/utils/Analytics';
import kycServices from 'src/screens/KYC/services/kycServices';
import { resetNavigation } from 'src/utils/navigationHandler';
import { useInterval } from 'usehooks-ts';
import { onboardingSummary, onboardingData } from 'src/api/Onboarding';
import { challengeResponse } from 'src/utils/seed/customAuth';
import { setToken, setUserData } from 'src/store/states/sessionStates';
import { signInSuccess } from 'src/utils/auth/states/signInStates';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/utils/core/MTXStrings';
import { ProcessStatus } from 'src/utils/types';
import LottieView from 'lottie-react-native';
import IdentityValidation from 'assets/lottie/IdentityValidation.json';
import UploadingDocument from 'assets/lottie/UploadingDocument.json';
import CloudError from 'assets/svgs/cloud-error.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';

type ScreensStatusType = Record<ProcessStatus, { title: string; description: string }>;

const screensStatus: ScreensStatusType = {
  failed: {
    title: i18n.t('kyc-liveness-response-error-title'),
    description: i18n.t('kyc-liveness-response-error-text'),
  },
  upload: {
    title: i18n.t('kyc-liveness-response-uploading-title'),
    description: i18n.t('kyc-document-validation-uploading-text'),
  },
  getStatus: {
    title: i18n.t('kyc-liveness-loading-title'),
    description: i18n.t('kyc-liveness-loading-text'),
  },
};

const useLoading = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const {
    origin, compressedVideoPath, livenessFileUploadLink, process, validationId,
  } = route.params;
  const isOnboarding = process === onboarding;
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [processStatus, setProcessStatus] = useState<ProcessStatus>(
    origin === 'login' ? 'getStatus' : 'upload',
  );
  const [progress, setProgress] = useState<number>(0);
  const isUploading = processStatus === 'upload';
  const screenContent = screensStatus[processStatus];
  const { uploadLivenessVideo } = kycServices;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOnboarding && processStatus === 'upload') {
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp19',
        screenName: navigationScreenNames.livenessLoading,
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'Subiendo-Exito',
      });
    }
  }, []);

  const navigate = (screen: string, params?: object) => {
    setProgress(100);
    setTimeout(() => resetNavigation(navigation, screen, params), 1000);
  };

  const checkOnboardingStatus = async () => {
    setProcessStatus('getStatus');
    if (isOnboarding) {
      setAnalyticRoute('LivenessValidationInProcess');
    }
    try {
      const response = await onboardingSummary();
      const onboardingStatus = response.status;
      if (
        onboardingStatus && (
          onboardingStatus === onboardingStates.proofOfLifeCompleted
          || onboardingStatus === onboardingStates.proofOfLifeFailed
        )
      ) {
        const { declinedReason } = response;
        setIsPolling(false);
        if (isOnboarding) {
          logVirtualEventAnalytics({
            eventName: 'virtualEventApp20',
            screenName: 'LivenessValidationInProcess',
            seccion: 'Exito',
            tipoEvento: 'Visualizar',
            tipoElemento: 'Pantalla',
            valor: 'Validando-Exito',
          });
        }
        navigate(navigationScreenNames.livenessGoToGetPersonalData, {
          onboardingStatus,
          declinedReason,
        });
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'KYC/Liveness/Loading/hooks/useLoading.tsx',
        service: 'onboardingSummary',
        error,
      });
      setIsPolling(false);
      navigate(navigationScreenNames.livenessGoToGetPersonalData, {
        onboardingStatus: onboardingStates.proofOfLifeFailed,
      });
    }
  };

  const uploadVideo = async () => {
    try {
      const baseHeader = {
        'Content-Type': 'video/mpeg',
        'Accept-Encoding': 'gzip, deflate, br',
      };
      await uploadLivenessVideo(livenessFileUploadLink, compressedVideoPath, baseHeader);
      setIsPolling(true);
      if (!isOnboarding) setProcessStatus('getStatus');
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'KYC/Liveness/Loading/hooks/useLoading.tsx',
        service: 'uploadLivenessVideo',
        error,
      });
      setProcessStatus('failed');
      if (isOnboarding) {
        logVirtualEventAnalytics({
          screenName: navigationScreenNames.livenessLoading,
          seccion: 'Error',
          tipoEvento: 'Visualizar',
          tipoElemento: 'Pantalla',
          valor: 'Error al subir tu video',
        });
        setAnalyticRoute('LivenessUploadError');
      }
    }
  };

  useEffect(() => {
    if (isUploading) {
      uploadVideo();
    } else {
      setIsPolling(true);
    }
  }, []);

  useInterval(
    () => setProgress((old) => (old < 80 ? old + Math.round(Math.random() * 10) : old)),
    1000,
  );

  useInterval(
    () => {
      checkOnboardingStatus();
    },
    isPolling && isOnboarding ? BIOMETRIC_TIME_AWAIT_POLLING : null,
  );

  useInterval(
    () => {
      setIsPolling(false);
      navigate(navigationScreenNames.manualCheck);
    },
    isPolling && isOnboarding ? TIME_AWAIT_VALIDATION * 1000 : null,
  );

  const getUserData = async () => {
    try {
      const response = await onboardingData();
      const {
        name, lastName, documentNumber, location,
      } = response.user;
      const userDataPayload = {
        name,
        lastName,
        documentNumber,
        location,
      };
      dispatch(setUserData(userDataPayload));
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'KYC/Liveness/Loading/hooks/useLoading.tsx',
        service: 'onboardingData',
        error,
      });
      navigate(navigationScreenNames.genericError, {
        nextScreen: AuthRoutesEnum.AUTH_STACK,
      });
    }
  };

  const responseAuthChallenge = async () => {
    try {
      const response = await challengeResponse(validationId);
      dispatch(setToken(response.signInUserSession.accessToken.jwtToken));
      // Delte this, when all service doesn't use core service
      dispatch(signInSuccess(response));
      if (process === 'seed') navigate(navigationScreenNames.enrollmentDevice.response);
      else {
        await getUserData();
        navigate(navigationScreenNames.cardReplacement.stack);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'KYC/Liveness/Loading/hooks/useLoading.tsx',
        service: 'responseAuthChallenge',
        error,
      });
      navigate(navigationScreenNames.enrollmentDevice.failed);
    }
  };

  useInterval(
    () => {
      setIsPolling(false);
      responseAuthChallenge();
    },
    isPolling && !isOnboarding ? TIME_AWAIT_PASSIVE_LIVENESS * 1000 : null,
  );

  const onRetryPress = () => {
    navigate(navigationScreenNames.livenessIntro);
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
  }, [processStatus]);

  return {
    processStatus,
    progress,
    onRetryPress,
    StatusImage,
    screenContent,
  };
};

export default useLoading;
