import React, {
  useEffect, useState, useRef, useCallback, useMemo,
} from 'react';
import { StyleSheet } from 'react-native';
import { Camera, useCameraDevices, TakePhotoOptions } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import ImageEditor from '@react-native-community/image-editor';
import { NavigationPropsType } from 'src/types/types';
import { DocumentReverse } from 'assets/images';
import { Box, Text, Chip } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { logCrashlytics } from 'src/utils/Analytics';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { ThemeProvider } from '@shopify/restyle';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import useGetDocumentImages from './hooks/useGetDocumentImages';
import CameraButton from '../../Common/CameraButton';
import { BackgroundCamera } from '../../Common/BackgroundCamera';
import { EmptyContainer } from '../../Common/EmptyContainer';
import { DocumentOpacity } from '../../Common/DocumentOpacity';
import { scaleCrop } from '../../utils/crop';

const ANIMATION_DURATION = 1000;

const GetDocumentReverse = (props: NavigationPropsType) => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevices().back;
  const { onMediaCaptured } = useGetDocumentImages(props);
  const isFocused = useIsFocused();
  const [cameraReady, setCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const takePhotoOptions = useMemo<TakePhotoOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      quality: 90,
      skipMetadata: true,
    }),
    [],
  );

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(async (status) => {
      if (status === 'denied' || status === 'not-determined') {
        await Camera.requestCameraPermission();
      }
    });

    setTimeout(() => {
      setCameraReady(true);
    }, ANIMATION_DURATION);
  }, []);

  const takePhoto = useCallback(async () => {
    setIsLoading(true);
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      const cropData = scaleCrop({
        originalHeight: photo.height,
        originalWidth: photo.width,
        width: 312,
        height: 220,
        posY: 296,
        posX: 31,
      });
      ImageEditor.cropImage(`file://${photo.path}`, cropData)
        .then((cropImageUrl) => {
          onMediaCaptured(photo.path, cropImageUrl);
        })
        .catch((error) => logCrashlytics({
          scope: 'SDK',
          fileName: 'KYC/DocumentValidation/GetDocumentFront/GetDocumentFront.tsx',
          service: 'cropImage',
          error,
        }))
        .finally(() => setIsLoading(false));
    } catch (error) {
      logCrashlytics({
        scope: 'SDK',
        fileName: 'KYC/DocumentValidation/GetDocumentReverse/GetDocumentReverse.tsx',
        service: 'takePhoto',
        error,
      });
      setIsLoading(false);
    }
  }, [camera, takePhotoOptions, onMediaCaptured]);

  if (!device) {
    logCrashlytics({
      scope: 'SDK',
      fileName: 'screens/KYC/DocumentValidation/GetDocumentReverse/GetDocumentReverse.tsx',
      service: 'device render',
      error: device,
    });
    return <EmptyContainer />;
  }

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <CustomStatusBar backgroundColor="transparent" />
      <Box
        flex={1}
        justifyContent="center"
        backgroundColor="primaryDark"
        alignItems="center"
      >
        {isFocused && device && (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            enableZoomGesture={false}
            photo
            zoom={device.neutralZoom}
            orientation="portrait"
            frameProcessorFps={1}
            device={device}
            isActive
          />
        )}
        <BackgroundCamera />

        <Box height={RFValue(140)} alignItems="center" maxWidth={RFValue(200)}>
          <Box mt="spacing-m">
            <Chip label={i18n.t('kyc-document-validation-get-front-second-step-title')} />
          </Box>
          <Text mt="spacing-m" variant="Heading" color="white" textAlign="center">
            {i18n.t('kyc-document-validation-get-reverse-title')}
          </Text>
        </Box>

        <DocumentOpacity image={DocumentReverse} cameraReady={cameraReady} />

        <Box
          height={RFValue(140)}
          maxWidth={RFValue(280)}
          width="100%"
          marginVertical="spacing-m"
          paddingHorizontal="spacing-sm"
          alignItems="center"
          mb="spacing-l"
        >
          <Text
            mb="spacing-m"
            mt="spacing-l"
            variant="body"
            color="white"
            textAlign="center"
          >
            {i18n.t('kyc-document-validation-get-front-description')}
          </Text>

          <Box mb="spacing-xs">
            <CameraButton onPress={takePhoto} isLoading={isLoading} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default GetDocumentReverse;
