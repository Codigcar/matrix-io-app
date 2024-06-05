import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'jest/test-utils';
import { i18n } from 'src/utils/core/MTXStrings';
import MaintenanceScreen from './maintenance.screen';

const Stack = createNativeStackNavigator();

describe('Maintenance', () => {
  const component = (
    <Stack.Navigator>
      <Stack.Screen name="ReferralCode" component={MaintenanceScreen} />
    </Stack.Navigator>
  );

  it('should display the correct title', () => {
    const { getByText } = render(component);
    expect(getByText(i18n.t('maintenance.title'))).toBeTruthy();
  });

  it('should display the correct message', () => {
    const { getByText } = render(component);
    expect(getByText(i18n.t('maintenance.message'))).toBeTruthy();
  });
});
