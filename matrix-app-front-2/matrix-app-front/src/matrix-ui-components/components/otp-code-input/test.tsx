import React from 'react';
import { fireEvent, render } from 'jest/test-utils';
import OtpCodeInput from './';

describe('otp Component', () => {
  const MOCK_CODE = '012345';
  it('should allow paste a code of N digits', async () => {
    const { findByTestId, findByText } = render(<OtpCodeInput />);
    const input = await findByTestId('otp-input');
    fireEvent.changeText(input, MOCK_CODE);

    for (const value of MOCK_CODE.split('')) {
      const text = await findByText(value);
      expect(text).toBeTruthy();
    }
  });
  it('should call onTextChange as a controlled component', async () => {
    const onChange = jest.fn();
    const { findByTestId, findAllByTestId } = render(
      <OtpCodeInput value="0" onTextChange={onChange} />,
    );
    const placeholder = await findAllByTestId('code-placeholder');
    fireEvent.press(placeholder[0]);
    const input = await findByTestId('otp-input');
    fireEvent.changeText(input, '1');
    expect(onChange).toHaveBeenCalled();
  });
  it('should call onTextChange as an uncontrolled component', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<OtpCodeInput onTextChange={onChange} />);
    const input = await findByTestId('otp-input');
    fireEvent.changeText(input, '1');
    expect(onChange).toHaveBeenCalled();
  });
  it('should call on complete every time a code is filled', async () => {
    const onComplete = jest.fn();
    const { findByTestId } = render(<OtpCodeInput onComplete={onComplete} />);
    const input = await findByTestId('otp-input');
    fireEvent.changeText(input, MOCK_CODE);
    expect(onComplete).toHaveBeenCalled();
  });
  it('should not call onComplete when code is incomplete', async () => {
    const onComplete = jest.fn();
    const { findByTestId } = render(<OtpCodeInput onComplete={onComplete} />);
    const input = await findByTestId('otp-input');
    fireEvent.changeText(input, '012');
    expect(onComplete).not.toHaveBeenCalled();
  });
  it('should not allow to enter any text when code input is disabled', async () => {
    const onChange = jest.fn();
    const { findByTestId, findAllByTestId } = render(
      <OtpCodeInput onTextChange={onChange} disabled />,
    );
    const placeholder = await findAllByTestId('code-placeholder');
    fireEvent.press(placeholder[0]);
    const input = await findByTestId('otp-input');
    fireEvent.changeText(input, MOCK_CODE);
    expect(onChange).not.toHaveBeenCalled();
  });
});
