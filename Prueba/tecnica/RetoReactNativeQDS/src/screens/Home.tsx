import * as React from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import type {NavParams} from '../navigation/types';
import FastImage from 'react-native-fast-image';

const {height} = Dimensions.get('window');

const getRandomSize = function () {
  const min = 400;
  const max = 800;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const images = new Array(10)
  .fill(0)
  .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);

export const Home = () => {
  const {navigate} = useNavigation<NavigationProp<NavParams>>();

  /* return (
    <FastImage
      source={{
        uri: 'https://unsplash.it/400/400?image=1',
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      style={{width: 200, height: 200}}
      resizeMode={FastImage.resizeMode.contain}
    />
  ); */
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>Hola</Text>
        {/* <FastImage
        style={{width: 200, height: 200}}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
        {images.map((uri, index) => (
          <View key={index}>
            <Text>{uri}</Text>
            <TouchableWithoutFeedback
              key={uri}
              // onPress={() => navigate('Photos', {index, images})}>
              onPress={() => navigate('Gallery', {index, images})}>
              <Image key={uri} source={{uri}} style={styles.image} />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'red',
  },
  image: {
    // width: '50%',
    width: 100,
    height: 100,
    // height: (height / images.length) * 2,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
