import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';

import { Text, Box } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import BackHeader from 'src/components/BackHeader';
import { BackgroundDark } from 'src/components/Backgrounds/BackgroundDark';
import { RFValue } from 'react-native-responsive-fontsize';
import { PDFViewer } from 'src/components/PDFViewer/PDFViewer';
import { DownloadIcon } from 'assets/svgs';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import type { NavigationPropsType } from 'src/types/types';
import { accountIDSelector } from 'src/screens/CardPayment/selectors/paymentSelector';
import useCardDocuments, {
  type OnPressViewDocument,
} from '../CardDocuments/hooks/useCardDocuments';

type Props = NavigationPropsType;

const CardDocumentDetail = (props: Props) => {
  const { navigation, route } = props;
  const {
    title,
    url,
    showShareIcon = false,
    actionShareIcon,
  } = route.params as OnPressViewDocument;
  const [isLoadingSharePDF, setIsLoadingSharePDF] = useState<boolean>(false);
  const { onDownloadDocument } = useCardDocuments(props);
  const accountId = useSelector(accountIDSelector);

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const getUrlToSharePDF = async (): Promise<string> => {
    if (!actionShareIcon) return url;
    const response = await actionShareIcon();
    return response.url;
  };

  const onPressShareIcon = async () => {
    if (!accountId) return;
    setIsLoadingSharePDF(true);
    const urlToSharePDF = await getUrlToSharePDF();
    await onDownloadDocument(`${title}.pdf`, urlToSharePDF);
    setIsLoadingSharePDF(false);
  };

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <BackgroundDark />
      <Box flex={1}>
        <Box
          alignItems="center"
          flexDirection="row"
          marginTop="spacing-ml"
          marginBottom="spacing-sm"
        >
          <Box position="absolute" left={RFValue(15)} zIndex={2}>
            <BackHeader theme="dark" onPress={onPressBackArrow} />
          </Box>
          <Box flex={1}>
            <Text color="white" textAlign="center" variant="Heading18Medium">
              {title}
            </Text>
          </Box>
          {showShareIcon ? (
            <Box position="absolute" right={RFValue(15)} zIndex={2}>
              <TouchableWithoutFeedback
                hitSlop={{
                  bottom: 4,
                  left: 4,
                  right: 4,
                  top: 4,
                }}
                onPress={onPressShareIcon}
              >
                <DownloadIcon width={27} height={27} />
              </TouchableWithoutFeedback>
            </Box>
          ) : null}
        </Box>
        <Box flex={1} marginTop="spacing-s">
          <Box flex={1}>
            <PDFViewer url={url} />
          </Box>
        </Box>
      </Box>
      <LoadingIndicator isVisible={isLoadingSharePDF} />
    </ThemeProvider>
  );
};

export default CardDocumentDetail;
