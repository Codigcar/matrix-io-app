import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const WarningTriangle = () => (
  <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M12.5 9.375v5.208M12.5 22.302H6.188c-3.615 0-5.125-2.583-3.375-5.74l3.25-5.854 3.062-5.5c1.854-3.343 4.896-3.343 6.75 0l3.063 5.51 3.25 5.855c1.75 3.156.229 5.74-3.375 5.74H12.5v-.01z"
      stroke="#ED6625"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.494 17.708h.01"
      stroke="#ED6625"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default WarningTriangle;
