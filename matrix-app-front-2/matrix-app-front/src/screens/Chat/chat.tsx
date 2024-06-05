import React from 'react';
import { Pressable } from 'react-native';
import {
  Box, Text, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { BackButton, Chat } from 'assets/svgs';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeProvider } from '@shopify/restyle';
import useChat from './hooks/useChat';

const ScreenChat: React.FC<NavigationPropsType> = (props) => {
  const { onPressBackArrow, onChatPress, screenStatus } = useChat(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Box flex={1}>
        <Box flex={1} backgroundColor="blackWithOpacity" pt="spacing-xl">
          <Box
            flex={1}
            padding="spacing-m"
            backgroundColor="white"
            borderTopEndRadius={20}
            borderTopStartRadius={20}
          >
            <Pressable onPress={onPressBackArrow}>
              <BackButton />
            </Pressable>
            <Box flex={1} alignItems="center">
              <Box flex={1.2} justifyContent="center">
                <Chat width={RFValue(180)} height={RFValue(180)} />
              </Box>
              <Box flex={1}>
                <Text testID='title' variant="Heading24Medium" numberOfLines={2} textAlign="center">
                  {i18n.t(`sdk-zendesk.${screenStatus}.title`)}
                </Text>
                <Text testID='subTitle' variant="SubTitle16" textAlign="center" m="spacing-m" numberOfLines={3}>
                  {i18n.t(`sdk-zendesk.${screenStatus}.sub-title`)}
                </Text>
              </Box>
            </Box>
            <Button
              testID='onChatPress'
              variant="primary"
              onPress={onChatPress}
              label={i18n.t(`sdk-zendesk.${screenStatus}.button`)}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ScreenChat;
