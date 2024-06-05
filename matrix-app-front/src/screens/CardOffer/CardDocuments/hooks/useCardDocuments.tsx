import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Share from 'react-native-share';
import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';
import { downloadFromUrl } from 'src/utils/filesystem/download';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const FIX_AUTOCLOSE_SHARE_TIMEOUT = 50;

export interface OnPressViewDocument {
  title: string,
  url: string,
  showShareIcon?: boolean,
  actionShareIcon?: () => Promise<{url: string}>
}

const useCardDocuments = () => {
  const navigation:any = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const onDownloadDocument = async (title: string, url: string) => {
    logVirtualEventAnalytics({
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: title,
    });

    setLoading(true);

    try {
      const localFileUrl = await downloadFromUrl(url, title);
      const shareOptions = {
        title,
        failOnCancel: false,
        saveToFiles: false,
        urls: [`file://${localFileUrl}`],
        type: 'application/pdf',
      };

      setLoading(false);
      setTimeout(async () => {
        const ShareResponse = await Share.open(shareOptions);
      }, FIX_AUTOCLOSE_SHARE_TIMEOUT);
    } catch (error) {
      setLoading(false);
      logCrashlytics({
        scope: 'API',
        fileName: 'CardDocuments/hooks/useCardDocuments.tsx',
        service: title,
        error,
      });
    }
  };

  const onPressViewDocument = (viewDocumentProps: OnPressViewDocument) => {
    const { title } = viewDocumentProps;
    logVirtualEventAnalytics({
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: title,
    });
    navigation.navigate(navigationScreenNames.cardDocumentDetail, viewDocumentProps);
  };

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  return {
    onDownloadDocument,
    onPressViewDocument,
    onPressBackArrow,
    loading,
  };
};

export default useCardDocuments;
