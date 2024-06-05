import React from 'react';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import { act, render, renderHook } from 'jest/test-utils';
import { Provider } from 'react-redux';
import CardConfigureHome from '../../CardConfigureHome';
import { string } from '../../shared/strings/string';
import useCardConfiguration from '../../hooks/useCardConfiguration';

const newStore: any = { ...INITIAL_STORE_MOCK };
newStore.session = {
  user: {
    email: 'test@test.com',
    name: 'User test',
  },
};

const store = configureStore()(newStore);
const navigate = jest.fn();

const ScreenRender = () =>
  render(
    <CardConfigureHome
      navigation={{
        dispatch: jest.fn(),
        goBack: jest.fn(),
        navigate,
        reset: jest.fn(),
      }}
      route={{
        params: {
          values: {},
          token: {
            token: 'test',
          },
        },
        key: '',
        name: '',
      }}
    />,
    { customStore: store },
  );

describe('CardConfigureHome Screen', () => {
  it('should render without errors', () => {
    const component = ScreenRender();
    expect(component).toBeTruthy();
  });

  it('should render title correctly', () => {
    const { getByText } = ScreenRender();
    expect(getByText(string.configureCard0Title)).toBeTruthy();
  });

  it('should render hook correctly', () => {
    const { result } = renderHook(
      () =>
        useCardConfiguration({
          navigation: {
            dispatch: jest.fn(),
            goBack: jest.fn(),
            navigate,
            reset: jest.fn(),
          },
          route: {
            params: {
              values: {},
              token: {
                token: 'test',
              },
            },
            key: '',
            name: '',
          },
        }),
      {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      },
    );
    expect(result.current.isPhysicalCard(0)).toBe(string.cardConfigurationVirtualCard);
    expect(result.current.isPhysicalCard(1)).toBe(string.cardConfigurationPhysicalCard);

    act(() => {
      result.current.onPressChangePin();
      result.current.onCloseModal();
    });
  });

  it('should match snapshot', () => {
    const { toJSON } = ScreenRender();
    expect(toJSON()).toMatchSnapshot();
  });
});
