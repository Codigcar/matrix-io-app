import { useRemoteConfigGetValue } from 'src/shared/providers/remote-config';
import { NavigationPropsType } from 'src/types/types';
import RNFS from 'react-native-fs';
import { useState } from 'react';
import { ObtainTutorialVideoDto } from '../shared/types/types';

export const useTutorial = (props: NavigationPropsType) => {
  const { navigation } = props;
  const tutorials = useRemoteConfigGetValue('tutorials').value?.asString();
  const [loading, setLoading] = useState(true);

  const getTutorialVideo = () => {
    let tutorialVideo: ObtainTutorialVideoDto = [];
    if(tutorials){
      tutorialVideo = JSON.parse(tutorials);
      if(tutorialVideo && loading){
        Promise.all(
          tutorialVideo.map(
            (value)=>downloadFile(value.urlMiniature, value.path)
            )
          ).then(()=>{
            setLoading(false);
        })
      }
    }
    return tutorialVideo;
  }

  const downloadFile = async (urlMiniature: string, path: string) => {
    const filePath = RNFS.DocumentDirectoryPath + '/'+path+'.png';
    const exists = await RNFS.exists(filePath);
    if(!exists){
      await RNFS.downloadFile({
        fromUrl: urlMiniature,
        toFile: filePath,
        background: true,
        discretionary: true,
        progress: (res) => {
        },
      }).promise;
    }
  }

  const onPressBackArrow = () => navigation.goBack();

  return {
    onPressBackArrow,
    getTutorialVideo,
    loading
  };
};

export default useTutorial;
