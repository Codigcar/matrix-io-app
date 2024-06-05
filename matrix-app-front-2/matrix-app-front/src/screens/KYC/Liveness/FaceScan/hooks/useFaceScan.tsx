import React, { useState, useEffect, useRef } from 'react';
import { Camera, useCameraDevices, VideoFile } from 'react-native-vision-camera';
import { useInterval } from 'usehooks-ts';
import { NavigationPropsType } from 'src/types/types';
import { logCrashlytics, logVirtualEventAnalytics, setAnalyticRoute } from 'src/utils/Analytics';
import { Box } from 'matrix-ui-components';
import { LIVENESS_STEPS, LIVENESS_STEP_MESSAGES, onboarding } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useCompressed from 'src/utils/compressedMedia/useCompressed';
import Crono from '../components/Crono';
import VideoButton from '../components/VideoButton';

const useFaceScan = (props: NavigationPropsType) => {
  const {
    route: { params },
    navigation,
  } = props;
  const {
    livenessInstructions,
    livenessFileUploadLink,
    process,
    session,
    validationId,
  } = params;
  const isOnboarding = process === onboarding;
  const camera = useRef<Camera>(null);
  const instructions = isOnboarding ? [LIVENESS_STEPS.passiveLiveness] : livenessInstructions;
  const [steps] = useState<string[]>(instructions);
  const [currentState, setCurrentState] = useState<string>(LIVENESS_STEPS.pendingPassiveLiveness);
  const [isStepFinished, setIsStepFinished] = useState<boolean>(false);
  const [isFinalStep, setIsFinalStep] = useState<boolean>(false);
  const [showCrono, setShowCrono] = useState<boolean>(false);
  const [startCrono, setStartCrono] = useState<boolean>(false);
  const device = useCameraDevices().front;
  const [time, setTime] = useState<number>(-1);
  const [interTime, setInterTime] = useState<number>(-1);
  const [tick, setTick] = useState<number | null>(null);
  const [tickInter, setTickInter] = useState<number | null>(null);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { compressVideo, progressCrompressing } = useCompressed();

  useEffect(() => {
    if (isOnboarding) {
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp14',
        screenName: navigationScreenNames.livenessFaceScan,
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'InicioGrabacion-Exito',
      });
    }

    Camera.getCameraPermissionStatus().then(async (status) => {
      if (status === 'denied' || status === 'not-determined') {
        await Camera.requestCameraPermission();
      }
    });
  }, []);

  useInterval(() => {
    setTime(time - 1);
  }, tick);

  useInterval(async () => {
    setInterTime(interTime - 1);
    if (stepIndex === steps.length - 1) {
      setTick(null);
      setTickInter(null);
      await camera.current?.stopRecording();
    }
  }, tickInter);

  useEffect(() => {
    if (time === 0) {
      setTick(null);
      setIsStepFinished(true);
      if (stepIndex === steps.length - 1) setIsFinalStep(true);
      setInterTime(2);
      setTickInter(1000);
    }
  }, [time]);

  useEffect(() => {
    if (interTime === 0) {
      setStepIndex(stepIndex + 1);
      setCurrentState(steps[stepIndex + 1]);
      setIsStepFinished(false);
      setTick(1000);
      setTickInter(null);
      setTime(3);
    }
  }, [interTime]);

  const onRecordFinished = async (videoDetails: VideoFile) => {
    if (isOnboarding) {
      setAnalyticRoute('LivenessEnd');
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp18',
        screenName: 'LivenessEnd',
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'FinGrabacion-Exito',
      });
    }
    setIsLoading(true);
    const compressedVideoPath = await compressVideo(videoDetails.path);
    setIsLoading(false);
    if (isOnboarding) {
      navigation.navigate(navigationScreenNames.livenessLoading, {
        compressedVideoPath,
        livenessFileUploadLink,
      });
    } else {
      navigation.navigate(navigationScreenNames.enrollmentDevice.loading, {
        compressedVideoPath,
        livenessFileUploadLink,
        process,
        session,
        validationId,
      });
    }
  };

  const recordVideo = () => {
    if (isOnboarding) {
      setAnalyticRoute('LivenessCapture');
    }
    camera.current?.startRecording({
      flash: 'off',
      onRecordingFinished: onRecordFinished,
      onRecordingError: (error) => logCrashlytics({
        scope: 'SDK',
        fileName: 'screens/KYC/Liveness/FaceScan/hooks/useFaceScan.tsx',
        service: 'recordVideo',
        error,
      }),
      fileType: 'mp4',
    });
  };

  const onPressTakeVideo = async () => {
    recordVideo();
    setShowCrono(!showCrono);
    setStartCrono(!startCrono);
    setCurrentState(steps[0]);
    setTick(1000);
    setTime(3);
  };

  const formatTime = (value: number): string => ` 00:0${value}`;

  const renderCrono = (): JSX.Element | null => {
    if (showCrono) {
      return <Crono start={startCrono} time={formatTime(time)} />;
    }
    return <Box />;
  };

  const renderRecordButton = (): JSX.Element | null => {
    if (!showCrono) {
      return <VideoButton onPress={onPressTakeVideo} isLoading={false} />;
    }
    return <Box />;
  };

  const renderStepMessages = (step: string) => LIVENESS_STEP_MESSAGES[step];

  return {
    renderCrono,
    onPressTakeVideo,
    renderRecordButton,
    renderStepMessages,
    isStepFinished,
    isFinalStep,
    currentState,
    camera,
    device,
    progressCrompressing,
    isLoading,
  };
};

export default useFaceScan;
