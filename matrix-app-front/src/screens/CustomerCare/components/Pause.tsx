import { PauseCircle, PlayCircle } from "assets/svgs";
import { Box } from "matrix-ui-components";
import { PausePropsType } from "../shared/types/types";

const Pause = ({paused, play, height}:PausePropsType) => {

  if(play){
    return (
      <Box position={'absolute'} 
        justifyContent={'center'} 
        alignItems={'center'}
        height={height}
        width={'100%'}>
        <PlayCircle />
      </Box>
    )
  }

  if(paused){
    return (
      <Box position={'absolute'} 
        justifyContent={'center'} 
        alignItems={'center'}
        height={height}
        width={'100%'}>
        <PauseCircle />
      </Box>
    )
  }
  return null

}

export default Pause;