import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Close = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 18L6 6M18 6L6 18"
      stroke="#545B7E"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Close;
