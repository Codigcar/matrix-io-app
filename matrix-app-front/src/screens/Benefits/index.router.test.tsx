import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { BenefitsRoutesEnum } from 'src/shared/enums/routes/benefits-routes.enum';
import BenefitsStack from 'src/screens/Benefits/index.router';

describe('BenefitsStack Navigator', () => {
  test('initial route should be BENEFITS_LIST', async () => {
    const navigationRef = createNavigationContainerRef();

    render(
      <NavigationContainer ref={navigationRef}>
        <BenefitsStack />
      </NavigationContainer>,
    );

    expect(navigationRef?.getCurrentRoute().name).toBe(BenefitsRoutesEnum.BENEFITS_LIST);
  });
});
