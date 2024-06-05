import React from 'react';
import { render } from 'jest/test-utils';
import ReCaptchaV2Component from '..';

jest.mock('react-native-webview', () => 'WebView');

fdescribe('ReCaptchaV2Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ReCaptchaV2Component />);
    expect(getByTestId('recaptcha-webview')).toBeTruthy();
  });

  it('defines onMessage callback for WebView', () => {
    const { getByTestId } = render(<ReCaptchaV2Component />);
    const webView = getByTestId('recaptcha-webview');
    expect(typeof webView.props.onMessage).toBe('function');
  });
});
