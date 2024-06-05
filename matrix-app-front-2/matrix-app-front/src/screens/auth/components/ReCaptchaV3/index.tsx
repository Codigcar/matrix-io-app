/* eslint-disable react-native/no-inline-styles */
import React, {
  useRef, useCallback, useImperativeHandle, forwardRef, useState,
} from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

type IProps = {
  captchaDomain: string;
  siteKey: string;
  action: string;
};

// JavaScript code to patch postMessage for WebView
const patchPostMessageJsCode = `(${String(() => {
  const originalPostMessage = window.postMessage;
  const patchedPostMessage = (message: any, targetOrigin: any, transfer: any) => {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = () =>
    String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  window.postMessage = patchedPostMessage;
})})();`;

// JavaScript function to execute reCaptcha and post the result back to React Native
const getExecutionFunction = (
  siteKey: string,
  action: string,
) => `window.grecaptcha.enterprise.execute('${siteKey}', { action: '${action}' }).then(
  function(args) {
    window.ReactNativeWebView.postMessage(args);
  }
)`;

// HTML content for an invisible reCaptcha
const getInvisibleRecaptchaContent = (siteKey: string) => `<!DOCTYPE html><html><head>
  <script src="https://www.google.com/recaptcha/enterprise.js?render=${siteKey}"></script>
  </head></html>`;

// ReCaptchaComponent using forwardRef
const ReCaptchaV3Component = forwardRef((props: IProps, ref) => {
  const webViewRef = useRef<WebView>(null);
  const [promiseResolve, setPromiseResolve] = useState<((value: string) => void) | null>(null);

  /**
   * Handles receiving the reCaptcha token and resolves the promise.
   *
   * @param {string} token - The received reCaptcha token.
   */
  const handleReceiveToken = (token: string) => {
    if (promiseResolve) {
      promiseResolve(token);
      setPromiseResolve(null);
    }
  };

  /**
   * Refreshes the reCaptcha token by invoking it.
   *
   * @return {Promise<string>} The reCaptcha token.
   */
  const refreshToken = useCallback(() => {
    if (webViewRef.current) {
      let resolveTokenPromise: any;
      const tokenPromise = new Promise<string>((resolve) => {
        resolveTokenPromise = resolve;
      });

      setPromiseResolve(() => resolveTokenPromise);
      webViewRef.current.injectJavaScript(getExecutionFunction(props.siteKey, props.action));

      return tokenPromise;
    }
    return Promise.reject(new Error('No WebView reference'));
  }, [props.siteKey, props.action]);

  /**
   * Exposes the refreshToken function using useImperativeHandle.
   *
   * @type {Object}
   * @property {Function} refreshToken - Function to refresh the reCaptcha token.
   */
  useImperativeHandle(ref, () => ({
    refreshToken,
  }));

  return (
    <View style={{ width: 1, height: 0, opacity: 0 }}>
      <WebView
        ref={webViewRef}
        javaScriptEnabled
        androidHardwareAccelerationDisabled
        originWhitelist={['*']}
        automaticallyAdjustContentInsets
        mixedContentMode="always"
        injectedJavaScript={patchPostMessageJsCode}
        source={{
          html: getInvisibleRecaptchaContent(props.siteKey),
          baseUrl: props.captchaDomain,
        }}
        onMessage={(e) => {
          handleReceiveToken(e.nativeEvent.data);
        }}
      />
    </View>
  );
});

export default ReCaptchaV3Component;
