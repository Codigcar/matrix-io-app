/* eslint-disable max-len */
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import Config from 'react-native-config';

const { APP_ID_I2C, API_KEY_I2C } = Config;

class I2CModule {
  appId: string;

  apiKey: string;

  i2cEvents: NativeEventEmitter;

  currentTimeOut: NodeJS.Timeout | null = null;

  constructor() {
    this.appId = APP_ID_I2C;
    this.apiKey = API_KEY_I2C;
    this.i2cEvents = new NativeEventEmitter(NativeModules.RNi2cModule);
  }

  revealCardInfo = (authToken: string, cardRefNo: string) => {
    NativeModules.RNi2cModule.startTask(
      this.appId,
      this.apiKey,
      authToken,
      cardRefNo,
      'revealCardInfo',
    );
  };

  changePinPhysicalCard = (authToken: string, cardRefNo: string) => {
    NativeModules.RNi2cModule.startTask(this.appId, this.apiKey, authToken, cardRefNo, 'changePin');
  };

  finishTask = () => {
    NativeModules.RNi2cModule.finishTask();
  };

  cleanIOsInterval = () => {
    if (this.currentTimeOut) {
      clearTimeout(this.currentTimeOut);
      this.currentTimeOut = null;
    }
  };

  cleanAndroidInterval = () => {
    NativeModules.RNi2cModule.cleanInterval();
  };

  finishTaskTimeOut = (timeOut: number) => {
    this.cleanIOsInterval();

    if (Platform.OS === 'ios') {
      this.currentTimeOut = setTimeout(() => {
        this.finishTask();
      }, timeOut);
    } else {
      NativeModules.RNi2cModule.finishTaskTimeOut(timeOut);
    }
  };
}

export default new I2CModule();
