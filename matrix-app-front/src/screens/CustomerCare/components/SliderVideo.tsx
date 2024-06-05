import Slider from '@react-native-community/slider';
import React from 'react';
import { Text } from 'react-native';
import { Box, TouchableOpacityBox } from 'matrix-ui-components';
import { Mute, Sound } from 'assets/svgs';
import { SliderVideoPropsType } from '../shared/types/types';
import styles from '../styles/SliderVideoStyle';

const SliderVideo = ({muted, currentTime, duration, 
  onPressMuted, changePaused, changeSeek}:SliderVideoPropsType): JSX.Element => {

  return (
    <Box width={'96%'} position={'absolute'} bottom={30}
      style={{ marginHorizontal: '2%'}}>
        <Box flexDirection={'row-reverse'} style={{marginHorizontal: '4%'}}>
          <TouchableOpacityBox onPress={onPressMuted}>
          {muted
            ? <Mute />
            : <Sound />
          }
          </TouchableOpacityBox>
        </Box>
        <Slider
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#8F8F8F"
          value={percentage(currentTime,duration)}
          onSlidingStart={(value)=>{
            changePaused(true);
          }}
          onValueChange={(value)=>{
            let valueRound = Math.round(value*100)/100;
            let durationRound = Math.round(duration);
            let result = valueRound * durationRound / 100;
            changeSeek(result);
          }}
          onSlidingComplete={(value)=>{
            changePaused(false);
          }}
          thumbImage={require('assets/icons/thumb_slider.png')}
        />
        <Box flexDirection={'row'} style={{marginHorizontal: '4%'}}>
          <Text style={styles.currentTimeText}>{mmss(Math.round(currentTime))}</Text>
          <Text style={styles.durationText}>{mmss(Math.round(duration))}</Text>
        </Box>
    </Box>
  )

}

export default SliderVideo;

function pad(num: number) {
  return ("0"+num).slice(-2);
}
function mmss(secs: number) {
  let minutes = Math.floor(secs / 60);
  secs = secs%60;
  return `${minutes}:${pad(secs)}`;
}
function percentage(currentTime: number, duration: number) {
  if(duration === 0 && currentTime === 0){
    return 0
  }
  currentTime = Math.round(currentTime)
  duration = Math.round(duration)
  let result = currentTime/duration*10000
  result = Math.round(result) / 100
  return result
}
