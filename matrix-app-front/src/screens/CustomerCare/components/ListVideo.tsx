import React, { useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import VideoRender from './VideoRender';
import { ITutorialVideoItem, ListVideoPropsType } from '../shared/types/types';

function ListVideo({flatListRef, data, height, position, changePosition, scrollPage}:ListVideoPropsType): JSX.Element {

  const renderItem = ({item, index}: {item: ITutorialVideoItem, index: number}) => {
    const total = data? data.length : 0;
    return (
      <VideoRender index={index} total={total} scrollPage={scrollPage} height={height} path={item.path} 
        url={item.urlVideo} screenActive={index === position} />
    )
  }

  const viewabilityConfig={
    itemVisiblePercentThreshold: 75,
    minimumViewTime: 200,
    waitForInteraction: true,
  }

  const onViewableItemsChanged = (info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => {
    if(info.viewableItems.length != 0){
      changePosition(info.viewableItems[0].index?info.viewableItems[0].index:0)
    }
  };

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

  return (
    <FlatList 
      data={data}
      renderItem={renderItem}
      pagingEnabled
      ref={flatListRef}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    />
  );

}

export default ListVideo;