import React from 'react';
import { fireEvent, render } from 'src/matrix-ui-components/utils/test-utils';
import SupplementaryCardChangePin from '../../components/SupplementaryCardChangePin';
import { testID } from '../../shared/strings/testID';
import { string } from '../../shared/strings/string';
import { SupplementaryCardChangePinProps } from '../../shared/types/components';

const mainComponentTestId = testID.supplementaryCardChangePin;

const onPressMock = jest.fn();

const componentRender = (props: SupplementaryCardChangePinProps) =>
  render(
    <SupplementaryCardChangePin
      testID={mainComponentTestId}
      onPress={props.onPress ?? jest.fn()}
    />,
  );

describe('SupplementaryCardChangePin component', () => {
  it('should render without errors', () => {
    const { getByTestId } = componentRender({ onPress: onPressMock });
    const component = getByTestId(mainComponentTestId);
    expect(component).toBeTruthy();
  });

  it('should render all labels', () => {
    const { getByText } = componentRender({ onPress: onPressMock });
    const label1 = getByText(string.cardConfigurationSupplementaryCardLabel);
    const label2 = getByText(string.cardConfigurationSupplementaryCardHelper);
    const label3 = getByText(string.cardConfigurationSupplementaryCardMessage);
    const label4 = getByText(string.cardConfigurationSupplementaryCardActionText);
    expect(label1).toBeTruthy();
    expect(label2).toBeTruthy();
    expect(label3).toBeTruthy();
    expect(label4).toBeTruthy();
  });

  it('should press button', () => {
    const onPressForButtonMock = jest.fn();
    const { getByTestId } = componentRender({ onPress: onPressForButtonMock });
    const actionButton = getByTestId(testID.supplementaryCardChangePinActionButton);
    fireEvent.press(actionButton);
    expect(onPressForButtonMock).toHaveBeenCalled();
  });

  it('should match snapshot', () => {
    const { toJSON } = componentRender({ onPress: onPressMock });
    expect(toJSON()).toMatchSnapshot();
  });
});
