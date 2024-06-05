import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationPropsType } from 'src/types/types';
import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';
import { API_KEY_ZENDESK } from 'src/utils/constants';
import { RootState } from 'src/core/libraries-implementation/state-manager/store';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import checkActivityApp from 'src/utils/auth/session/checkActivityApp';

const fullNameDataSelector = (state: RootState) => state.session.user?.fullName;
const phoneNumberDataSelector = (state: RootState) => state.session.user?.phoneNumber;
const emailDataSelector = (state: RootState) => state.session.user?.email;

export const useChat = (props: NavigationPropsType) => {
  const { navigation } = props;
  const { RNZendeskChatModule } = NativeModules;

  const fullName = useSelector(fullNameDataSelector);
  const phoneNumber = useSelector(phoneNumberDataSelector);
  const email = useSelector(emailDataSelector);

  let eventListener: EmitterSubscription;

  useEffect(() => {
    RNZendeskChatModule.initChat(API_KEY_ZENDESK);
    RNZendeskChatModule.configVisitor({
      name: fullName,
      email,
      phone: phoneNumber,
    });
    return () => {
      if(eventListener!=null){
        eventListener.remove();
      }
    };
  }, []);

  const onPressBackArrow = () => navigation.goBack();

  const onChatPress = () => {
    navigation.navigate(navigationScreenNames.tabSupport);
    startChat();
  };

  const onTutorialPress = () => {
    navigation.navigate('Tutorial');
  };

  const startChat = () => {
    RNZendeskChatModule.startChat({
      botName: 'iO',
      buttonTitle: 'Atrás',
    });
    const eventEmitter = new NativeEventEmitter(RNZendeskChatModule);
    eventListener = eventEmitter.addListener('onCall', event => {
      if(event.status === 'CHATTING') {
        checkActivityApp();
      }
    });
  };

  return {
    onPressBackArrow,
    onChatPress,
    startChat,
    onTutorialPress,
  };
};

export default useChat;
