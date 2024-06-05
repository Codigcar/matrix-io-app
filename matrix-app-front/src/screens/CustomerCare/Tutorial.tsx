import React, { useRef, useState } from 'react';
import { FlatList, LayoutChangeEvent, Pressable, View } from 'react-native';
import { Box } from 'matrix-ui-components';
import { BackButtonDark } from 'assets/svgs';
import ListVideo from './components/ListVideo';
import ListImage from './components/ListImage';
import { NavigationPropsType } from 'src/types/types';
import useTutorial from './hooks/useTutorial';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import Loading from './components/Loading';
import Title from './components/Title';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import styles from './styles/TutorialStyle';

const ScreenTutorial: React.FC<NavigationPropsType> = (props) => {

  const { onPressBackArrow, getTutorialVideo, loading } = useTutorial(props);
  const flatListRef = useRef<FlatList>(null)
  const [height, setHeight] = useState(0)
  const [position, setPosition] = useState(0)
  const tutorialVideo = getTutorialVideo();

  const onLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout
    setHeight(height)
  }

  const scrollPage = (position:number) => {
    setPosition(position)
    flatListRef.current?.scrollToOffset({offset: (height*position), animated: true})
  }

  if(tutorialVideo?.length===0 || loading){
    return(
      <ThemeProvider theme={rebrandingTheme}>
        <Box backgroundColor={'primaryDark'} flex={1} 
          justifyContent={'center'} alignItems={'center'} >
          <Loading />
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <CustomStatusBar theme="light" />
      <View 
        style={styles.view}
         onLayout={onLayout} >
        <ListVideo flatListRef={flatListRef} data={tutorialVideo} 
          height={height} position={position} 
          changePosition={setPosition} scrollPage={scrollPage} />
        <Title />
        <Pressable onPress={onPressBackArrow} 
          style={{
            position: 'absolute',
            top: 56,
            left: 20
          }}>
          <BackButtonDark />
        </Pressable>
        <ListImage data={tutorialVideo} onPress={scrollPage} position={position} />
      </View>
    </ThemeProvider>
  );

}

export default ScreenTutorial;