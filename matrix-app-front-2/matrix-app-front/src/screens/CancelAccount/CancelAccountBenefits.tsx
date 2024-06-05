import React from 'react';
// Components
import { Text, Box, Container, Button, rebrandingTheme } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
// Assets
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundIconScreen, CardCancellationIcon } from 'assets/svgs';
import { string } from './strings/string';

const CancelAccountBenefits: React.FC<NavigationPropsType> = (props) => {
  const { navigation } = props;
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        background={BackgroundIconScreen}
        isHeaderVisible
        goBackNavigate={() => navigation.goBack()}
        headerTitle={string.cancelAccountHeader}
      >
        <Box flex={1} justifyContent="center" bottom={32} mx="spacing-s">
          <Box alignSelf="center" ml="spacing-m" paddingTop="spacing-l" paddingBottom="spacing-l">
            <CardCancellationIcon />
          </Box>
          <Text
            textAlign="center"
            variant="Heading28Medium"
            marginBottom="spacing-s"
            fontWeight="500"
          >
            {string.cancelAccountTitle}
          </Text>
          <Text
            textAlign="center"
            variant="SubTitle18Regular"
            marginBottom="spacing-m"
            fontWeight="400"
            color="primary1000"
          >
            {string.cancelAccountSubtitle1}
            <Text
              textAlign="center"
              variant="SubTitle18Regular"
              marginBottom="spacing-m"
              fontWeight="bold"
              color="primary1000"
            >
              {' iO'}
            </Text>
          </Text>
          <Text
            variant="body"
            mx="spacing-xm"
            textAlign="center"
            mb="spacing-xxxm"
            color="primary800"
          >
            {string.cancelAccountSubtitle2}
          </Text>
          <Text variant="body" mx="spacing-l" mb="spacing-s" textAlign="center" color="primary800">
            {string.cancelAccountQuestionLabel}
          </Text>
          <Button
            variant="primary"
            my="spacing-m"
            onPress={() => {
              navigation.navigate('CancelAccountSurvey');
            }}
            label={string.cancelAccountContinueButton}
            disabled={false}
            justifyContent="space-around"
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CancelAccountBenefits;
