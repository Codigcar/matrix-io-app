import React from 'react';
import { Pressable } from 'react-native';
import {
  Box, Text, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { BackButton, Support } from 'assets/svgs';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeProvider } from '@shopify/restyle';
import useChat from './hooks/useChat';

const ScreenChat: React.FC<NavigationPropsType> = (props) => {
  const { onPressBackArrow, onChatPress, onTutorialPress } = useChat(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Box flex={1}>
        <Box flex={1} backgroundColor="blackWithOpacity" justifyContent={'flex-end'}>
          <Box
            height={RFValue(500)}
            padding="spacing-m"
            backgroundColor="white"
            borderTopEndRadius={20}
            borderTopStartRadius={20}
          >
            <Pressable onPress={onPressBackArrow}>
              <BackButton />
            </Pressable>
            <Box alignItems="center" mt={'spacing-s'} mb={'spacing-xm'}>
              <Support />
            </Box>
            <Text testID='title' variant="Heading24Medium" numberOfLines={2} textAlign="center">
              {i18n.t(`chat:customer-care.title`)}
            </Text>
            <Text testID='subTitle' variant="SubTitle16" textAlign="center" m="spacing-m" numberOfLines={3}>
              {i18n.t(`chat:customer-care.sub-title`)}
            </Text>
            <Button
              testID='onChatPress'
              variant="primary"
              onPress={onTutorialPress}
              label={i18n.t(`chat:customer-care.button-tutorial`)}
              mb={'spacing-m'}
            />
            <Button
              testID='onChatPress'
              variant="secondary"
              onPress={onChatPress}
              label={i18n.t(`chat:customer-care.button-chat`)}
              mb={'spacing-m'}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ScreenChat;
