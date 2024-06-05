import React, { useState } from 'react';
import {
  Container,
  Text,
  Box,
  Card,
  fonts,
  rebrandingTheme
} from 'matrix-ui-components';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { TouchableOpacity } from 'react-native';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { PeriodDates } from './types/types';
import useCardDocuments from '../CardOffer/CardDocuments/hooks/useCardDocuments';
import GetDataAccountStatus from './services/getDataAccountStatus';
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundAltScreen } from 'assets/svgs';
import { RFValue } from 'react-native-responsive-fontsize';

const ListAccountStatements = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params = [] },
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onPressViewDocument } = useCardDocuments(props);

  const listMovements = params;

  const viewPDF = async (date: PeriodDates) => {
    const titleLowerCase = date.title.toLocaleLowerCase();
    setIsLoading(true);
    try {
      const getAccountStatement = await GetDataAccountStatus.getAccountStatementByDateId({
        dateId: date.id,
        isEncrypted: false,
      });

      onPressViewDocument({
        title: `${i18n.t('accountStatements.title-pdf')} ${titleLowerCase}`,
        url: getAccountStatement.url,
        showShareIcon: true,
        actionShareIcon: () => (
          GetDataAccountStatus.getAccountStatementByDateId({
            dateId: date.id,
            isEncrypted: true,
          })
        ),
      });
    } catch (error) {
      showToast({
        type: ToastType.Error,
        title: i18n.t('accountStatements.error-load-list-history-movements'),
      });
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        hasGradient={false}
        background={BackgroundAltScreen}
        imageBackground="none"
        isHeaderVisible
        isScrollable
        goBackNavigate={() => navigation.goBack()}
        headerTitle={i18n.t('accountStatements.header-title')}
      >
        <Box marginVertical="spacing-sm" marginHorizontal="spacing-m">
          <Text fontSize={RFValue(16)} variant="body" fontFamily={fonts.outfitSemibold} marginBottom="spacing-s">
            {i18n.t('accountStatements.recent-account-statements')}
          </Text>
          <Box
            height="auto"
            borderRadius={20}
            backgroundColor={"complementaryIndigo050"}
            marginBottom="spacing-m"
            paddingHorizontal="spacing-s"
            paddingBottom="spacing-s"
            paddingTop="spacing-m"
          >
            <Text fontSize={RFValue(14)} variant="body" fontFamily={fonts.outfitSemibold} marginBottom="spacing-s">
              {i18n.t('accountStatements.select-month')}
            </Text>
            <Box flex={1} flexDirection="row" flexWrap="wrap">
              {listMovements.map((date: PeriodDates) => (
                <TouchableOpacity key={date.period} onPress={() => viewPDF(date)}>
                  <Box
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor="white"
                    borderRadius={20}
                    paddingVertical="spacing-xxxs"
                    paddingHorizontal="spacing-xxs"
                    marginRight={'spacing-xxs'}
                    marginBottom="spacing-xs"
                    testID={`period_${date.period}`}
                  >
                    <Text variant="label" fontFamily={fonts.outfitRegular} textAlign="center" color="primary700">
                      {date.period}
                    </Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </Box>
          </Box>
        </Box>
        <LoadingIndicator isVisible={isLoading} />
      </Container>
    </ThemeProvider>

  );
};

export default ListAccountStatements;
