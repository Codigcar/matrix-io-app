import Svg, { Defs, Path, RadialGradient, Stop } from 'react-native-svg';
import { RadialGradientFabPropsType } from '../shared/types/types';

const RadialGradientFab = ({height, width}:RadialGradientFabPropsType) => {

  const halfHeight = height/2;
  const gradientTransform = "matrix(0 -"+halfHeight+" 99.9698 0 "+width+" "+halfHeight+")";

  return (
    <Svg
    width={width}
    height={height}
    fill="none"
  >
    <Path fill="url(#a)" d="M0 812h146V0H0v812Z" />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform={gradientTransform}
        gradientUnits="userSpaceOnUse"
      >
        <Stop />
        <Stop offset={1} stopOpacity={0} />
      </RadialGradient>
    </Defs>
  </Svg>
  )
}

export default RadialGradientFab;
