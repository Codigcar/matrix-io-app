import React, { useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { useSelector, useDispatch } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { onboardingStates } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import { setUserData } from 'src/core/libraries-implementation/state-manager/states';
import { resetNavigation } from 'src/utils/navigationHandler';
import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';
import { onboardingData } from 'src/api/Onboarding';
import { SvgProps } from 'react-native-svg';
import { Text } from 'matrix-ui-components';
import LottieView from 'lottie-react-native';
import CheckSuccess from 'assets/lottie/ConfirmationCheck.json';
import CheckWarning from 'assets/svgs/check-warning2.svg';
import DocumentFront from 'assets/svgs/document-front.svg';
import DocumentFrontBlurred from 'assets/svgs/document-front-blurred.svg';
import { useModal } from 'src/shared/contexts';

const userDataSelector = (state: any) => state.session.user;

const useDocumentValidationResponse = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { showLoading, stopLoading } = useModal();
  const { isOk, onboardingStatus } = params;
  const userData = useSelector(userDataSelector);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isValidated = onboardingStatus === onboardingStates.idValidated
    || onboardingStatus === onboardingStates.idEnrolled;

  useEffect(() => {
    if (!isLoading && !(isValidated && isOk)) {
      logVirtualEventAnalytics({
        screenName: 'DocumentValidationInProcess',
        seccion: 'Error',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'No pudimos validar tu DNI',
      });
    }
  }, [isLoading, isValidated, isOk]);

  useEffect(() => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp12',
      seccion: 'Exito',
      tipoEvento: 'Visualizar',
      tipoElemento: 'Mensaje Felicitaciones',
      valor: 'Felicidades',
    });
  }, []);

  useEffect(() => {
    const fetchOnboardingSummary = async () => {
      setIsLoading(true);
      showLoading();
      try {
        const response = await onboardingData();
        setIsLoading(false);
        if (response.user) {
          const {
            name,
            lastName,
            documentNumber,
            location,
          } = response.user;
          const userDataPayload = {
            name,
            lastName,
            documentNumber,
            location,
          };
          dispatch(setUserData(userDataPayload));
        }
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName:
            'KYC/DocumentValidation/DocumentValidationResponse/hooks/useDocumentValidationResponse.tsx',
          service: 'getOnboardingSummary',
          error,
        });
        setIsLoading(false);
      } finally {
        stopLoading();
      }
    };
    if (isValidated || isOk) fetchOnboardingSummary();
  }, [dispatch, isOk, isValidated, showLoading, stopLoading]);

  const formatUserName = (name: string) => {
    if (name) {
      const firstName = name.split(' ')[0];
      return firstName.split(' ')[0].charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    }
    return ' ';
  };

  const StatusImage: React.FC<SvgProps> = () => {
    if (isValidated || isOk) {
      return <LottieView source={CheckSuccess} autoPlay loop />;
    }
    return <CheckWarning />;
  };

  const DocumentImage: React.FC<SvgProps> = () => {
    if (isValidated || isOk) {
      return <DocumentFront />;
    }
    return <DocumentFrontBlurred />;
  };

  const renderTitle = () => {
    if (isValidated || isOk) {
      return `${i18n.t('kyc-document-validation-response-success-title')} ${formatUserName(
        userData.name,
      )}!`;
    }
    return i18n.t('kyc-document-validation-response-info-title');
  };

  const Subtitle: React.FC | string = () => {
    if (isValidated || isOk) {
      return (
        <>
          {`${i18n.t('kyc-document-validation-response-success-heading-1')}\n`}
          <Text fontWeight="bold">{`${userData.documentNumber}\n`}</Text>
          {`${i18n.t('kyc-document-validation-response-success-heading-2')}`}
        </>
      );
    }
    return i18n.t('kyc-document-validation-response-info-heading');
  };

  const renderText = () => {
    if (isValidated || isOk) {
      return i18n.t('kyc-document-validation-response-success-text');
    }
    return (
      <>
        {i18n.t('kyc-document-validation-response-error-text-1')}
        {'\n'}
        <Text variant="body14SemiBold">
          {i18n.t('kyc-document-validation-response-error-text-2')}
        </Text>
      </>
    );
  };

  const renderButtonLabel = () => {
    if (isValidated || isOk) {
      return i18n.t('kyc-document-validation-response-success-button-text');
    }
    return i18n.t('button-label-try-again');
  };

  const onButtonPress = () => {
    resetNavigation(
      navigation,
      isValidated || isOk
        ? navigationScreenNames.livenessStack
        : navigationScreenNames.introductionDocumentScan,
    );
  };

  return {
    onboardingStatus,
    isLoading,
    StatusImage,
    DocumentImage,
    renderTitle,
    Subtitle,
    renderText,
    renderButtonLabel,
    onButtonPress,
  };
};

export default useDocumentValidationResponse;
