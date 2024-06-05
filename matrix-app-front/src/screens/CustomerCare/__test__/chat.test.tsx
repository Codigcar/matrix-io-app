import React from 'react';
import { render } from 'jest/test-utils';
import ChatScreen from '../CustomerCare';
import { NativeModules } from 'react-native';
import { i18n } from 'src/utils/core/MTXStrings';

describe('Customer Care Screen', () => {

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

    expect(title.children[0]).toEqual(i18n.t('chat:customer-care.title'))
    expect(subTitle.children[0]).toEqual(i18n.t('chat:customer-care.sub-title'))
  });

});


