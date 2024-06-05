import React from 'react';
import {
  Container,
  Text,
  Box,
  fonts,
  rebrandingTheme,
} from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundAltScreen } from 'assets/svgs';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

import { i18n } from 'src/utils/core/MTXStrings';
import { TouchableOpacity } from 'react-native';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { PeriodDates } from '../../shared/types/account-status.type';
import { useListAccountStatementsPresenter } from './list-account-statements.presenter';

export const ListAccountStatements = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const listMovements = route.params;
  const { viewPDF, isLoading } = useListAccountStatementsPresenter();

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        hasGradient={false}
        background={BackgroundAltScreen}
        imageBackground="none"
        isHeaderVisible
        isScrollable
        goBackNavigate={navigation.goBack}
        headerTitle={i18n.t('accountStatements.header-title')}
      >
        <Box
          marginVertical="spacing-sm"
          marginHorizontal="spacing-m"
          testID="list-account-statements"
        >
          <Text
            fontSize={RFValue(16)}
            variant="body"
            fontFamily={fonts.outfitSemibold}
            marginBottom="spacing-s"
          >
            {i18n.t('accountStatements.recent-account-statements')}
          </Text>
          <Box
            height="auto"
            borderRadius={20}
            backgroundColor="complementaryIndigo050"
            marginBottom="spacing-m"
            paddingHorizontal="spacing-s"
            paddingBottom="spacing-s"
            paddingTop="spacing-m"
          >
            <Text
              fontSize={RFValue(14)}
              variant="body"
              fontFamily={fonts.outfitSemibold}
              marginBottom="spacing-s"
            >
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
                    marginRight="spacing-xxs"
                    marginBottom="spacing-xs"
                    testID={`period_${date.period}`}
                  >
                    <Text
                      variant="label"
                      fontFamily={fonts.outfitRegular}
                      textAlign="center"
                      color="primary700"
                    >
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
