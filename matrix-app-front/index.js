/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './src/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import audioService from './audio.service.js';
import startNetworkLog from './src/shared/providers/networklog/networklog';

startNetworkLog();
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => audioService);
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
}
