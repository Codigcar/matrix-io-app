import React from 'react';
import WebView from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { BASE_URL } from 'src/utils/constants';
import reCaptchaTemplate from './reCaptchaTemplate';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: 'transparent',
    width: '100%',
  },
});

const patchPostMessageJsCode = `(${String(() => {
  const originalPostMessage = window.ReactNativeWebView.postMessage;
  const patchedPostMessage = (message: any, targetOrigin: any, transfer: any) => {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = () => String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  window.ReactNativeWebView.postMessage = patchedPostMessage;
})})();`;

const ReCaptchaV2Component = () => {
  const onMessage = (message: any) => {
    console.log('message', message);
  };

  return (
    <WebView
      testID="recaptcha-webview"
      originWhitelist={['*']}
      mixedContentMode="always"
      onMessage={onMessage}
      javaScriptEnabled
      injectedJavaScript={patchPostMessageJsCode}
      automaticallyAdjustContentInsets
      style={styles.container}
      source={{
        html: reCaptchaTemplate,
        baseUrl: BASE_URL,
      }}
    />
  );
};

export default ReCaptchaV2Component;
