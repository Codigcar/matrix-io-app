import React from 'react';
import { Pressable } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import { Text, Box, Container } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { BackgroundNew } from 'assets/images';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { RFValue } from 'react-native-responsive-fontsize';
import Eye from 'assets/svgs/eye.svg';
import Download from 'assets/svgs/download.svg';
import useCardDocuments from './hooks/useCardDocuments';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';

const CardDocuments = (props: NavigationPropsType) => {
  const { route } = props;
  const { summarySheet } = route.params;

  const { onDownloadDocument, onPressViewDocument, onPressBackArrow, loading } =
    useCardDocuments(props);

  const documentList = [
    {
      id: 'contract',
      title: i18n.t('card-offer-document-contract-title'),
      linkUrl: `${DOCUMENTS_BASE_URL}contract1.pdf`,
    },
    {
      id: 'resume',
      title: i18n.t('card-offer-document-resume-title'),
      linkUrl: summarySheet
    },
    {
      id: 'insurance',
      title: i18n.t('card-offer-document-insurance-title'),
      linkUrl: `${DOCUMENTS_BASE_URL}desgravamen1.pdf`,
    },
  ];

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        isHeaderVisible={true}
        goBackNavigate={onPressBackArrow}
        withInput
        imageBackground={BackgroundNew}
      >
        <LoadingIndicator isVisible={loading} />
        <React.Fragment>
          <Box
            flex={1}
            mt={'spacing-m'}
            paddingHorizontal="spacing-s"
            marginHorizontal="spacing-xxs"
          >
            <Box width={RFValue(250)}>
              <Text textAlign="left" marginRight="spacing-l" variant="Heading18Medium">
                {i18n.t('card-offer-documents-title')}
              </Text>
            </Box>

            <Text textAlign="left" my="spacing-s" marginRight="spacing-m" variant="body14Regular">
              {i18n.t('card-offer-documents-subtitle')}
            </Text>
            <Box
              my="spacing-xs"
              backgroundColor={'complementaryIndigo050'}
              borderRadius={RFValue(24)}
              paddingHorizontal="spacing-m"
              paddingVertical="spacing-s"
            >
              {documentList.map((item) => (
                <Box my="spacing-xxs" key={item.id} testID="documentListItem">
                  <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Text textAlign="left" variant="body14Medium">
                        {item.title}
                      </Text>
                    </Box>
                    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                      <Box mx="spacing-xxxs" flexDirection={'row'}>
                        <Pressable
                          onPress={() => onPressViewDocument({
                            title: item.title,
                            url: item.linkUrl,
                          })}
                          testID="viewDocumentButton"
                        >
                          <Eye />
                        </Pressable>

                        <Box ml={'spacing-xxs'}>
                          <Pressable
                            onPress={() => onDownloadDocument(`${item.title}.pdf`, item.linkUrl)}
                            testID="viewDocumentButton"
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
        </React.Fragment>
      </Container>
    </ThemeProvider>
  );
};

export default CardDocuments;
