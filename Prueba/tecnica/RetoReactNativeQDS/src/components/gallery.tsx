import React, {useRef} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FC, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavParams} from '../navigation/types';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CGallery} from './CGallery';

type IGallery = {
  setIndex: (newIndex: number) => void;
  reset: () => void;
};

export const PhotoScreen: FC = (): JSX.Element => {
  const {params} = useRoute<RouteProp<NavParams, 'Photos'>>();
  const {images, index} = params;
  const {top, bottom} = useSafeAreaInsets();
  const galleryRef = useRef<IGallery>(null);

  return (
    <View>
      <CGallery data={images} initialIndex={index} ref={galleryRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolbar: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  bottomToolBar: {
    bottom: 0,
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
