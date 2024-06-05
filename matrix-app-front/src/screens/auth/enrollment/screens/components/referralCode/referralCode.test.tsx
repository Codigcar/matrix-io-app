import React from 'react';
import { Button } from 'react-native';
import { Form } from 'src/components/Form';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import ReferralCode from './referralCode';

describe('ReferralCode test', () => {
  it('switch to true should open the referral code input', async () => {
    const error = undefined;

    const { getByRole, queryByTestId } = render(
      <Form
        initialValues={{
          referralCode: '',
        }}
        onSubmit={jest.fn()}
      >
        <ReferralCode
          value=""
          error={error}
          onChangeText={jest.fn()}
          onBlur={jest.fn()}
          disabled={false}
        />
        ,
      </Form>,
    );

    fireEvent.press(getByRole('switch'));

    await waitFor(() => {
      const referralInput = queryByTestId('referralCodeInput');
      expect(referralInput).toBeTruthy();
    });
  });

  it('writing into the text input should update the form values', async () => {
    const error = undefined;
    const text = 'TEST';
    const submitTest = jest.fn();

    const { getByRole, getByTestId } = render(
      <Form
        initialValues={{
          referralCode: '',
        }}
        onSubmit={submitTest}
      >
        {({ values, handleSubmit, handleChange }) => (
          <>
            <ReferralCode
              value={values.referralCode}
              error={error}
              onChangeText={handleChange('referralCode')}
              disabled={false}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Form>,
    );

    fireEvent.press(getByRole('switch'));
    const input = getByTestId('referralCodeInput');
    fireEvent.changeText(input, text);
    fireEvent.press(getByRole('button'));

    await waitFor(() => {
      expect(submitTest).toBeCalledTimes(1);
      expect(submitTest).toBeCalledWith({ referralCode: text }, expect.anything());
    });
  });

  it('switching to "No" should hide the text input', async () => {
    const error = undefined;
    const submitTest = jest.fn();

    const { getByRole, queryByTestId } = render(
      <Form
        initialValues={{
          referralCode: '',
        }}
        onSubmit={submitTest}
      >
        {({ values, handleSubmit, handleChange }) => (
          <>
            <ReferralCode
              value={values.referralCode}
              error={error}
              onChangeText={handleChange('referralCode')}
              disabled={false}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Form>,
    );
    fireEvent.press(getByRole('switch'));
    await waitFor(() => {
      expect(queryByTestId('referralCodeInput')).toBeTruthy();
    });
    fireEvent.press(getByRole('switch'));
    await waitFor(() => {
      expect(queryByTestId('referralCodeInput')).toBeFalsy();
    });
  });
});
