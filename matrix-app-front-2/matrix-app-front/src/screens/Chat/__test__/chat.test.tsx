import React from 'react';
import { fireEvent, render } from 'jest/test-utils';
import ChatScreen from '../chat';
import { NativeModules } from 'react-native';
import { i18n } from 'src/utils/core/MTXStrings';

describe('Chat Screen', () => {

  beforeEach(() => {
    NativeModules.RNZendeskChatModule = { 
      initChat: jest.fn(),
      configVisitor: jest.fn(),
      startChat: jest.fn(),
    } 
  });

  const navigate = jest.fn();

  const component = (
    <ChatScreen
      navigation={{
        dispatch: jest.fn(),
        goBack: jest.fn(),
        navigate,
        reset: jest.fn(),
      }}
      route={{
        params: {
          values: {},
        },
        key: '',
        name: '',
      }}
    />
  );

  it('should see the initial texts', async () => {
    const { findByTestId } = render(component);
    const title = await findByTestId('title');
    const subTitle = await findByTestId('subTitle');

    expect(title.children[0]).toEqual(i18n.t('sdk-zendesk.start.title'))
    expect(subTitle.children[0]).toEqual(i18n.t('sdk-zendesk.start.sub-title'))
  });

  it('should see the finish texts when press onChatPress', async () => {
    const { findByTestId } = render(component);

    const onChatPress = await findByTestId('onChatPress');

    fireEvent.press(onChatPress);

    const title = await findByTestId('title');
    const subTitle = await findByTestId('subTitle');

    expect(title.children[0]).toEqual(i18n.t('sdk-zendesk.finish.title'))
    expect(subTitle.children[0]).toEqual(i18n.t('sdk-zendesk.finish.sub-title'))
  });

});


