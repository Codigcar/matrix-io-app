import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const FaceId = ({ width, height, strokeColor }: MtxSvgIconTypeProps) => (
  <Svg
    width={width || 64}
    height={height || 64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1.277 19.976c.828 0 1.276-.483 1.276-1.31V9.383c0-4.485 2.346-6.83 6.831-6.83H18.7c.828 0 1.31-.45 1.31-1.277C20.01.449 19.529 0 18.7 0H9.315C3.21 0 0 3.174 0 9.246v9.42c0 .827.449 1.31 1.277 1.31zm61.446 0c.828 0 1.277-.483 1.277-1.31v-9.42C64 3.243 60.826 0 54.72 0H45.3c-.828 0-1.31.449-1.31 1.277 0 .828.482 1.276 1.31 1.276h9.316c4.347 0 6.83 2.346 6.83 6.831v9.281c0 .828.45 1.311 1.277 1.311zM29.188 36.64h.31c2.795 0 4.21-1.38 4.21-4.209V21.84c0-.793-.38-1.173-1.173-1.173-.76 0-1.173.38-1.173 1.173v10.903c0 .931-.76 1.518-1.518 1.518H28.67c-.656 0-1.139.483-1.139 1.138 0 .828.518 1.242 1.656 1.242zm-9.591-7.935c1.035 0 1.69-.655 1.69-1.69v-4.59c0-1.069-.655-1.724-1.69-1.724-1 0-1.656.69-1.656 1.725v4.589c0 1.035.655 1.69 1.656 1.69zm24.496 0c1 0 1.656-.655 1.656-1.69v-4.59c0-1.034-.656-1.724-1.656-1.724-1.035 0-1.725.655-1.725 1.725v4.589c0 1.035.69 1.69 1.725 1.69zM31.707 47.198c3.795 0 7.59-1.587 10.385-4.382a1.19 1.19 0 00.414-.931c0-.69-.518-1.139-1.139-1.139-.38 0-.69.104-1.138.587-2.07 2.07-5.28 3.553-8.522 3.553-3.243 0-6.418-1.483-8.522-3.553-.414-.449-.725-.587-1.139-.587-.62 0-1.138.449-1.138 1.139 0 .414.207.724.414.931 2.725 2.83 6.59 4.382 10.385 4.382zM9.315 64H18.7c.828 0 1.31-.449 1.31-1.277 0-.828-.482-1.276-1.31-1.276H9.384c-4.485 0-6.83-2.346-6.83-6.866v-9.246c0-.828-.45-1.346-1.277-1.346-.828 0-1.277.518-1.277 1.346v9.384C0 60.826 3.209 64 9.315 64zM45.3 64h9.42c6.106 0 9.28-3.278 9.28-9.28v-9.385c0-.828-.449-1.346-1.277-1.346-.828 0-1.276.518-1.276 1.346v9.246c0 4.52-2.484 6.866-6.831 6.866H45.3c-.828 0-1.31.448-1.31 1.276 0 .828.482 1.277 1.31 1.277z"
      fill={strokeColor || '#007AFF'}
    />
  </Svg>
);

export default FaceId;