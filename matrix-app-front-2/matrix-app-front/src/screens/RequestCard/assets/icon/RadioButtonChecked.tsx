import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';

const RadioButtonChecked = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Circle cx={12} cy={12} r={11.5} fill="#fff" stroke="#979DBA" />
    <Circle cx={12} cy={12} r={4} fill="#0D1332" />
  </Svg>
);

export default RadioButtonChecked;
