import React from 'react';

import MainScreen from './src/screen/MainScreen';
import {DataProvider} from './src/context/dataProvider';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <DataProvider>
      <MainScreen />
    </DataProvider>
  );
};

export default App;
