import React from 'react';
import {
  Box,
  Button,
  SafeAreaBox,
  spacing,
  Text,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationPropsType } from 'src/types/types';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useDocumentValidationResponse from './hooks/useDocumentValidationResponse';

const DocumentValidationResponse = (props: NavigationPropsType) => {
  const {
    StatusImage,
    DocumentImage,
    Subtitle,
    renderTitle,
    renderText,
    renderButtonLabel,
    onButtonPress,
  } = useDocumentValidationResponse(props);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" mb="spacing-l" justifyContent="space-between">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box width={spacing['spacing-ml']} height={spacing['spacing-ml']}>
            <StatusImage />
          </Box>
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-l" mb="spacing-s">
            {renderTitle()}
          </Text>
          <Text variant="SubTitle18Regular" textAlign="center">
            <Subtitle />
          </Text>
          <Box my="spacing-l">
            <DocumentImage width={RFValue(142)} />
          </Box>
          <Text variant="body14Regular" textAlign="center">{renderText()}</Text>
        </Box>
        <Button label={renderButtonLabel()} onPress={onButtonPress} />
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default DocumentValidationResponse;
