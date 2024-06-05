import React from 'react';
import { render, fireEvent, waitFor } from 'jest/test-utils';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CancelAccountNavigation from 'src/navigators/CancelAccountNavigation';
import ProfileNavigation from 'src/navigators/ProfileNavigation';
import LoginScreen from 'src/screens/auth/modules/sign-in/sign-in.screen';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mappedRequests = {
  '/v1/me/customers/profile': {
    data: {
      data: {
        email_verified: false,
        documentNumber: '12345678',
        name: 'Alias',
        email: 'test@test.com',
        phone_number: '1212122121',
        address: 'test',
      },
    },
  },
  default: {
    data: {},
  },
};
const Stack = createNativeStackNavigator();

xdescribe('My Profile Page', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementation(
      (url) =>
        new Promise((resolve) => {
          if (mappedRequests.hasOwnProperty(url)) {
            resolve(mappedRequests[url as keyof typeof mappedRequests]);
          } else {
            resolve(mappedRequests.default);
          }
        }),
    );
  });

  const component = (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileNavigation} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={LoginScreen} />
      <Stack.Screen name="CancelAccountStack" component={CancelAccountNavigation} />
    </Stack.Navigator>
  );

  it.each`
    testID       | content
    ${'dni'}     | ${'12****78'}
    ${'alias'}   | ${'Alias'}
    ${'email'}   | ${'t**t@t***.com'}
    ${'phone'}   | ${'121 *** **21'}
    ${'address'} | ${'Test'}
  `(
    'should render transaction summary field: $testID should content $content',
    async ({ testID, content }) => {
      const { findByTestId } = render(component);
      const element = await findByTestId(testID);
      expect(element).toHaveTextContent(content);
    },
  );

  it('should show menu right to be able to cancel its account', async () => {
    const { findByTestId } = render(component);
    const menu = await findByTestId('menu-right');
    fireEvent.press(menu);
    const cancel = await findByTestId('cancel-account');
    fireEvent.press(cancel);
    await waitFor(() => expect(cancel).not.toBeOnTheScreen());
  });
  xit('should be able to sign out data be empty when it screen has changed', async () => {
    jest.useFakeTimers();
    const { findByTestId } = render(component);
    const element = await findByTestId('alias');
    const signOut = await findByTestId('signOut');
    fireEvent.press(signOut);
    jest.runAllTicks();
    expect(element).toHaveTextContent('Alias');
    await waitFor(() => expect(signOut).not.toBeOnTheScreen());
  });
});
