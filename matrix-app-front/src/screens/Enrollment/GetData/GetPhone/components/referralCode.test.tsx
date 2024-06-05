import React from 'react';
import { fireEvent, renderHook, waitFor } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import ReferralCode from './referralCode';

describe('ReferralCode test', () => {
  it('switch to true should open the referral code input', async () => {
    const error = undefined;
    const { result } = renderHook(() =>
      useForm({
        mode: 'onChange',
        defaultValues: {
          phone: '',
          referralCode: '',
        },
      }),
    );

    const { getByRole, queryByTestId } = render(
      <ReferralCode
        toggleReferralSwitch={jest.fn()}
        control={result.current.control}
        error={error}
      />,
    );

    fireEvent.press(getByRole('switch'));

    await waitFor(() => {
      const referralInput = queryByTestId('referralCodeInput');
      expect(referralInput).toBeTruthy();
    });
  });

  it('writing into the text input should update the form values', () => {
    const error = undefined;
    const text = 'TEST';
    const { result } = renderHook(() =>
      useForm({
        mode: 'onChange',
        defaultValues: {
          phone: '',
          referralCode: '',
        },
      }),
    );

    const { getByRole, getByTestId } = render(
      <ReferralCode
        toggleReferralSwitch={jest.fn()}
        control={result.current.control}
        error={error}
      />,
    );

    fireEvent.press(getByRole('switch'));
    const input = getByTestId('referralCodeInput');
    fireEvent.changeText(input, text);
    const { referralCode } = result.current.getValues();
    expect(referralCode).toBe(text);
  });

  it('switching to "No" should hide the text input', async () => {
    const error = undefined;
    const { result } = renderHook(() =>
      useForm({
        mode: 'onChange',
        defaultValues: {
          phone: '',
          referralCode: '',
        },
      }),
    );
    const { getByRole, queryByTestId } = render(
      <ReferralCode
        toggleReferralSwitch={jest.fn()}
        control={result.current.control}
        error={error}
      />,
    );
    fireEvent.press(getByRole('switch'));
    fireEvent.press(getByRole('switch'));
    expect(queryByTestId('referralCodeInput')).toBeFalsy();
  });
});
