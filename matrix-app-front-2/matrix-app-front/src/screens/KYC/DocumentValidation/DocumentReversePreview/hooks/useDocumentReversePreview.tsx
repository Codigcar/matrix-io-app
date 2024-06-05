import { useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics, logVirtualEventAnalytics, setAnalyticRoute } from 'src/utils/Analytics';
import { startDocumentValidation } from 'src/api/Onboarding';

const useDocumentFrontPreview = (props: NavigationPropsType) => {
  const {
    route: { params },
    navigation,
  } = props;
  const { documentFrontUrl, documentReverseUrl } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCancelPress = () => {
    navigation.goBack();
  };

  const handleContinuePress = async () => {
    try {
      setIsLoading(true);
      setAnalyticRoute('ModalCargandoReverso');
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp09',
        screenName: 'ModalCargandoReverso',
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Modal',
        valor: 'ReversoDni-Exito',
      });
      const response = await startDocumentValidation();
      setIsLoading(false);
      navigation.navigate(navigationScreenNames.documentValidationLoading, {
        documentFrontUrl,
        documentReverseUrl,
        documentValidationUrl: response,
      });
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'DocumentReversePreview/hooks/useDocumentReversePreview.tsx',
        service: 'startDocumentValidation',
        error,
      });
      setIsLoading(false);
      navigation.navigate(navigationScreenNames.genericError);
    }
  };

  return {
    navigation,
    documentReverseUrl,
    handleCancelPress,
    handleContinuePress,
    isLoading,
  };
};

export default useDocumentFrontPreview;
