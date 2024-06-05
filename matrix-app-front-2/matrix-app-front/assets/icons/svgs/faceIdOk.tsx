import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const FaceIdOk = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={84 || width}
    height={82 || height}
    viewBox="0 0 84 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path fill="#fff" d="M0 2H80V82H0z" />
    <Path
      d="M9.277 31.976c.828 0 1.276-.483 1.276-1.31v-9.282c0-4.485 2.346-6.83 6.831-6.83H26.7c.828 0 1.31-.45 1.31-1.277 0-.829-.482-1.277-1.31-1.277h-9.385C11.21 12 8 15.174 8 21.246v9.42c0 .827.449 1.31 1.277 1.31zm61.446 0c.829 0 1.277-.483 1.277-1.31v-9.42C72 15.243 68.826 12 62.72 12H53.3c-.828 0-1.31.448-1.31 1.277 0 .828.482 1.276 1.31 1.276h9.316c4.347 0 6.83 2.346 6.83 6.831v9.281c0 .828.45 1.311 1.277 1.311zM37.188 48.64h.31c2.795 0 4.21-1.38 4.21-4.209V33.84c0-.793-.38-1.173-1.173-1.173-.76 0-1.173.38-1.173 1.173v10.903c0 .931-.76 1.518-1.518 1.518H36.67c-.656 0-1.139.483-1.139 1.138 0 .828.518 1.242 1.656 1.242zm-9.591-7.935c1.035 0 1.69-.655 1.69-1.69v-4.59c0-1.069-.655-1.724-1.69-1.724-1 0-1.656.69-1.656 1.725v4.589c0 1.035.655 1.69 1.656 1.69zm24.496 0c1 0 1.656-.655 1.656-1.69v-4.59c0-1.034-.656-1.724-1.656-1.724-1.035 0-1.725.655-1.725 1.725v4.589c0 1.035.69 1.69 1.725 1.69zM39.707 59.198c3.795 0 7.59-1.587 10.385-4.382a1.19 1.19 0 00.414-.931c0-.69-.518-1.139-1.139-1.139-.38 0-.69.104-1.138.587-2.07 2.07-5.28 3.553-8.522 3.553-3.243 0-6.418-1.483-8.522-3.553-.414-.449-.725-.587-1.139-.587-.62 0-1.138.449-1.138 1.139 0 .414.207.724.414.931 2.725 2.83 6.59 4.382 10.385 4.382zM17.315 76H26.7c.828 0 1.31-.448 1.31-1.277 0-.828-.482-1.276-1.31-1.276h-9.316c-4.485 0-6.83-2.346-6.83-6.866v-9.246c0-.828-.45-1.346-1.277-1.346-.828 0-1.277.518-1.277 1.346v9.384C8 72.826 11.209 76 17.315 76zM53.3 76h9.42c6.106 0 9.28-3.278 9.28-9.28v-9.385c0-.828-.448-1.346-1.277-1.346-.828 0-1.276.518-1.276 1.346v9.246c0 4.52-2.484 6.866-6.831 6.866H53.3c-.828 0-1.31.448-1.31 1.276 0 .829.482 1.277 1.31 1.277z"
      fill="#007AFF"
    />
    <Circle cx={72} cy={12} r={11} fill="#3E9438" stroke="#fff" strokeWidth={2} />
    <Path
      d="M68 11.83l2.83 2.83L76.5 9"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default FaceIdOk;