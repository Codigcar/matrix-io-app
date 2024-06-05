import {
  Container, Box, Button, Text,
} from 'matrix-ui-components';
import React from 'react';
import useKeyboard from 'src/utils/hooks/useKeyboard';
import { CheckSuccess } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';

interface ISuccessfulProps {
  onPress: () => void;
}

const Successful = ({ onPress }: ISuccessfulProps) => {
  const { isKeyboardVisible } = useKeyboard();
  return (
    <Container
      withInput
      imageBackground={[]}
      isHeaderTransparent
      isScrollable
      keyboardShouldPersistTaps="always"
    >
      <Box
        flex={1}
        mt="spacing-l"
        mx="spacing-m"
        justifyContent={isKeyboardVisible ? 'flex-end' : 'space-between'}
      >
        <Box>
          <Box mt="spacing-xxl" />
          <Box justifyContent="center" alignItems="center">
            <CheckSuccess />
          </Box>
          <Box mt="spacing-m" />
          <Text textAlign="center" variant="Heading28Medium">
            {i18n.t('supports.tittle')}
          </Text>
          <Box mt="spacing-m" />
          <Text textAlign="center" variant="Subtitle18Regular">
            {i18n.t('supports.header-text')}
          </Text>
          <Box mt="spacing-m" />
          <Text textAlign="center" variant="body14Regular">
            {i18n.t('supports.subheader-text')}
          </Text>
        </Box>
        <Box mb="spacing-s">
          <Button
            variant="primary"
            label={i18n.t('supports.button-succeed')}
            onPress={onPress}
            testID="SubmitButton"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Successful;
