import React from 'react';
import { Box, TouchableOpacityBox } from 'matrix-ui-components';
import Video from 'react-native-video';
import Loading from './Loading';
import Pause from './Pause';
import SliderVideo from './SliderVideo';
import useVideoRender from '../hooks/useVideoRender';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import RadialGradientFab from './RadialGradientFab';
import { VideoRenderPropsType } from '../shared/types/types';
import styles from '../styles/VideoRenderStyle';

const VideoRender = ({index, total, scrollPage, url, height, screenActive,path}:VideoRenderPropsType): JSX.Element => {

  const {showVideo, onPress, refVideo, filePath, paused, play, muted, 
    setDuration, setCurrentTime, duration, currentTime,
    changePaused, changeSeek, onPressMuted, videoEnd, changeVideoEnd} = useVideoRender(screenActive, url, path)

  if(!showVideo) {
    return (
      <Box backgroundColor={'primaryDark'} height={height} 
        justifyContent={'center'} alignItems={'center'} >
        <Loading />
      </Box>
    )
  }

  return (
    <Box backgroundColor={'primaryDark'} height={height} >
      <TouchableOpacityBox onPress={onPress} flex={1} >
        <Video 
          ref={refVideo}
          style={{flex: 1}}
          source={{uri: filePath}}
          resizeMode={'cover'}
          paused={paused}
          muted={muted}
          onLoad={(data)=>{
            setDuration(data.duration)
          }}
          onProgress={(data)=>{
            setCurrentTime(data.currentTime)
          }}
          onEnd={()=>{
            const nextPosition = index+1;
            changeVideoEnd(true)
            if(nextPosition<total){
              scrollPage(nextPosition);
            }
          }}
          />
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']} 
          style={styles.gradientTop} />
        <View style={styles.gradientRight}>
          <RadialGradientFab height={height} width={146} />
        </View>
        <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} 
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']} 
          style={styles.gradientBottom} />
        <Pause paused={paused && !videoEnd} play={play} height={height} />
        <SliderVideo muted={muted} duration={duration} currentTime={currentTime}
          changePaused={changePaused} changeSeek={changeSeek} onPressMuted={onPressMuted} />
      </TouchableOpacityBox>
    </Box>
  )

}

export default VideoRender;
