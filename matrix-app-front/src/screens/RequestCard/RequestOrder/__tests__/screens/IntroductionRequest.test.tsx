import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import IntroductionRequestScreen from '../../screens/IntroductionRequest';

describe('IntroductionRequestScreen', () => {
  let mockNavigation: {
    dispatch: jest.Mock<any, any, any>;
    navigate: jest.Mock;
    goBack?: Function;
    reset?: Function;
    setOptions?: Function;
    push?: Function;
  };

  beforeEach(() => {
    mockNavigation = {
      navigate: jest.fn(),
      dispatch: jest.fn(),
    };
  });

  it('renders correctly', () => {
    const { getByText } = render(<IntroductionRequestScreen navigation={mockNavigation} />);

    expect(getByText(string.requestCardIntroductionRequestTitle)).toBeDefined();
    expect(getByText(string.requestCardIntroductionRequestDescription)).toBeDefined();
  });

  it('navigates to request screen on primary button press', () => {
    const { getByText } = render(<IntroductionRequestScreen navigation={mockNavigation} />);

    fireEvent.press(getByText(string.requestCardIntroductionRequestContinue));

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      navigationScreenNames.physicalCard.location,
      { onboarding: true },
    );
  });

  it('navigates to home screen on secondary button press', () => {
    const { getByText } = render(<IntroductionRequestScreen navigation={mockNavigation} />);

    fireEvent.press(getByText(string.requestCardIntroductionRequestCancel));
  });
});
