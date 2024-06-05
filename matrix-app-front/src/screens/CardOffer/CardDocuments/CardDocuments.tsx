import React from 'react';
import { Pressable } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import { Text, Box, Container } from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { Eye, Download } from 'assets/svgs';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useCardDocuments from './hooks/useCardDocuments';
import { string } from '../shared/strings/string';
import { testID } from '../shared/strings/testID';

const CardDocuments = (props: NavigationPropsType) => {
  const { route } = props;
  const { summarySheet } = route.params;

  const { onDownloadDocument, onPressViewDocument, onPressBackArrow, loading } = useCardDocuments();

  const documentList = [
    {
      id: 'contract',
      title: string.cardOfferDocumentContractTitle,
      linkUrl: `${DOCUMENTS_BASE_URL}contract1.pdf`,
    },
    {
      id: 'resume',
      title: string.cardOfferDocumentResumeTitle,
      linkUrl: summarySheet,
    },
    {
      id: 'insurance',
      title: string.cardOfferDocumentInsuranceTitle,
      linkUrl: `${DOCUMENTS_BASE_URL}desgravamen1.pdf`,
    },
  ];

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
        withInput
        imageBackground={BackgroundNew}
      >
        <LoadingIndicator isVisible={loading} />
        <Box flex={1} mt="spacing-m" paddingHorizontal="spacing-s" marginHorizontal="spacing-xxs">
          <Box width={RFValue(250)}>
            <Text textAlign="left" marginRight="spacing-l" variant="Heading18Medium">
              {string.cardOfferDocumentsTitle}
            </Text>
          </Box>

          <Text textAlign="left" my="spacing-s" marginRight="spacing-m" variant="body14Regular">
            {string.cardOfferDocumentsSubtitle}
          </Text>
          <Box
            my="spacing-xs"
            backgroundColor="complementaryIndigo050"
            borderRadius={RFValue(24)}
            paddingHorizontal="spacing-m"
            paddingVertical="spacing-s"
          >
            {documentList.map((item) => (
              <Box my="spacing-xxs" key={item.id} testID={testID.documentListItemId}>
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Text textAlign="left" variant="body14Medium">
                      {item.title}
                    </Text>
                  </Box>
                  <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Box mx="spacing-xxxs" flexDirection="row">
                      <Pressable
                        onPress={() =>
                          onPressViewDocument({
                            title: item.title,
                            url: item.linkUrl,
                          })
                        }
                        testID={`${testID.viewDocumentButtonMultipleId} ${item.id}`}
                      >
                        <Eye />
                      </Pressable>

                      <Box ml="spacing-xxs">
                        <Pressable
                          onPress={() => onDownloadDocument(`${item.title}.pdf`, item.linkUrl)}
                          testID={testID.viewDocumentButtonId}
                        >
                          <Download />
                        </Pressable>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CardDocuments;
