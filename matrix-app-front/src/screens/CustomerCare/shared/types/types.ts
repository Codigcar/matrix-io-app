import { FlatList } from 'react-native';
import { InferType, object, string, array } from 'yup';

export type FabImagePropsType = {
  uri: string;
  onPress: ()=> void;
}

const ObtainTutorialVideoSchema = array().of(
  object({
    path: string().required(),
    title: string().required(),
    urlMiniature: string().required(),
    urlVideo: string().required(),
  }),
);

export type ObtainTutorialVideoDto = InferType<typeof ObtainTutorialVideoSchema>;

export type ListImagePropsType = {
  data: ObtainTutorialVideoDto;
  onPress: (position: number)=> void;
  position: number;
}

export interface IObtainTutorialVideo extends Array<ITutorialVideoItem> {}

export interface ITutorialVideoItem {
  path: string;
  title: string;
  urlMiniature: string;
  urlVideo: string;
}

export type ListVideoPropsType = {
  flatListRef: React.LegacyRef<FlatList<ITutorialVideoItem>>;
  data: ObtainTutorialVideoDto;
  height: number;
  position: number;
  changePosition: (position: number)=> void;
  scrollPage: (position: number)=> void;
}

export type PausePropsType = {
  paused: boolean;
  play: boolean;
  height: number;
}

export type RadialGradientFabPropsType = {
  height: number;
  width: number;
}

export type SliderVideoPropsType = {
  muted: boolean;
  currentTime: number;
  duration: number;
  onPressMuted: ()=> void;
  changePaused: (paused: boolean)=> void;
  changeSeek: (seek: number)=> void;
}

export type VideoRenderPropsType = {
  index: number;
  total: number;
  scrollPage: (position: number)=> void;
  url: string;
  height: number;
  screenActive: boolean;
  path: string;
}