import { StatusBar } from 'react-native';
import React from 'react';

type StatusBarPropTypes = {
  theme?: 'dark' | 'light';
  backgroundColor?: string;
};

const CustomStatusBar = ({ theme, backgroundColor }: StatusBarPropTypes) => {
  let barStyle: 'light-content' | 'dark-content';
  if (theme === 'dark') barStyle = 'dark-content';
  else barStyle = 'light-content';

  return <StatusBar translucent {...{ barStyle, backgroundColor }} />;
};

CustomStatusBar.defaultProps = {
  theme: 'light',
  backgroundColor: 'transparent',
};

export default CustomStatusBar;
