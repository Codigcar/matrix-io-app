import { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';

export const useVideoRender = (screenActive:boolean, url: string, path: string) => {
  
  const refVideo = useRef<Video>(null)
  const [paused, setPaused] = useState(true);
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoEnd, setVideoEnd] = useState(false);

  const filePath = RNFS.DocumentDirectoryPath + '/'+path+'.mp4';

  const [showVideo, setShowVideo] = useState(false);

  useEffect(()=>{
    if(screenActive && !showVideo){
      RNFS.exists(filePath).then((value)=>{
        if(value){
          setShowVideo(true)
        }else{
          RNFS.downloadFile({
            fromUrl: url,
            toFile: filePath,
            background: true,
            discretionary: true,
            progress: (res) => {
            },
          }).promise.then((response) => {
              setShowVideo(true)
          }).catch((err) => {
          });
        }
      })
    }
    if(screenActive){
      changeSeek(0)
    }
    setVideoEnd(!screenActive)
    setPaused(!screenActive)
  },[screenActive])

  const onPress = () => {
    if(paused){
      setPlay(true)
      setTimeout(() => {
        setPaused(!paused)
        setPlay(false)
      }, 200);
    }else{
      setPaused(!paused)
    }
  }

  const onPressMuted = () => {
    setMuted(!muted)
  }

  const changePaused = (paused:boolean) => {
    setPaused(paused)
  }

  const changeSeek = (seek:number) => {
    refVideo.current?.seek(seek)
  }

  const changeVideoEnd = (videoEnd:boolean) => {
    setVideoEnd(videoEnd)
  }

  return {
    showVideo,
    onPress,
    refVideo,
    filePath,
    paused, 
    play,
    muted,
    setDuration,
    setCurrentTime,
    duration,
    currentTime,
    changePaused,
    changeSeek,
    onPressMuted,
    videoEnd,
    changeVideoEnd,
  };
};

export default useVideoRender;
