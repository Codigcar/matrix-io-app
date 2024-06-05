import React, { useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TIME_SLIDER_REQUEST_CARD } from 'src/utils/constants';
import SliderItem from './SliderItem';
import Paginator from './Paginator';
import { SliderProps } from '../../shared/types/components';

const Slider: React.FC<SliderProps> = (props) => {
  const { data } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const { width } = useWindowDimensions();
  const handleSnapToItem = (index: number) => {
    setActiveSlide(index);
  };
  return (
    <>
      <Carousel
        ref={sliderRef}
        data={data}
        renderItem={({ item }) => <SliderItem item={item} />}
        sliderWidth={width}
        itemWidth={width}
        onScrollIndexChanged={(index) => handleSnapToItem(index)}
        autoplay
        autoplayInterval={TIME_SLIDER_REQUEST_CARD}
        vertical={false}
        loop
        loopClonesPerSide={2}
      />
      <Paginator data={data} currentPage={activeSlide} />
    </>
  );
};

export default Slider;
