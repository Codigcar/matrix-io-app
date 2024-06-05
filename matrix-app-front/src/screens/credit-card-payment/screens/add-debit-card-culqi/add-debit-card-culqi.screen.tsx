import React from 'react';
import { Box, Container } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { WebView } from 'react-native-webview';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { AddDebitCardCulqiPresenter } from './add-debit-card-culqi.presenter';

export const AddDebitCardCulqi: React.FC<NavigationPropsType> = ({ navigation }) => {
  const { setToken, html } = AddDebitCardCulqiPresenter();

  return (
    <BackgroundWrapper>
      <Container
        withInput
        imageBackground="none"
        hasGradient={false}
        isHeaderVisible
        isScrollable
        goBackNavigate={() => navigation.goBack()}
        headerTitle={i18n.t('paymentMethod.title')}
      >
        <Box flex={1} pt="spacing-m">
          <WebView
            testID="webviewAddDebitCardCulqi"
            onMessage={(event: any) => {
              setToken(JSON.parse(event.nativeEvent.data));
            }}
            source={{ html }}
          />
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};
