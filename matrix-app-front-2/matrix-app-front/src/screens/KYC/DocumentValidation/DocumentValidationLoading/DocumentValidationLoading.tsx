import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { Box, Button, Text } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationPropsType } from 'src/types/types';
import CircularProgressBar from 'src/screens/Wellcome/Wellcome/CircularProgressBar';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useValidationLoading from './hooks/useValidationLoading';

const DocumentValidationLoading = (props: NavigationPropsType) => {
  const {
    onRetryPress,
    progress,
    processStatus,
    StatusImage,
    screenContent,
  } = useValidationLoading(props);
  const error = processStatus === 'failed';

  return (
    <BackgroundWrapper>
      <Box flex={1} width="100%" alignItems="center" justifyContent="flex-end">
        <Box
          width="100%"
          maxWidth={RFValue(150)}
          height={RFValue(125)}
          alignItems="center"
          justifyContent="flex-end"
        >
          <StatusImage />
        </Box>
        <Box mt="spacing-xxm" height={RFValue(50)}>
          <Text variant="Heading20Medium" textAlign="center">
            {screenContent.title}
          </Text>
        </Box>
        <Box my="spacing-xm" height={RFValue(70)}>
          {!error && <CircularProgressBar percent={progress} />}
        </Box>
        <Text variant="SubTitle16" textAlign="center">
          {screenContent.description}
        </Text>
      </Box>
      <Box mx="spacing-m" mb="spacing-l" mt="spacing-ml" height={RFValue(60)}>
        {error && (
          <Button
            variant="primary"
            onPress={onRetryPress}
            label={i18n.t('button-label-try-again')}
            analytics={{
              seccion: 'Error',
            }}
          />
        )}
      </Box>
    </BackgroundWrapper>
  );
};

export default DocumentValidationLoading;
