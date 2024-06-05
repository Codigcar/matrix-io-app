import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const WarningCircle = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9v5M12 21.411H5.94c-3.47 0-4.92-2.48-3.24-5.51l3.12-5.62 2.94-5.28c1.78-3.21 4.7-3.21 6.48 0l2.94 5.29 3.12 5.62c1.68 3.03.22 5.51-3.24 5.51H12v-.01z"
      stroke="#ED6625"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.994 17h.01"
      stroke="#ED6625"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default WarningCircle;
