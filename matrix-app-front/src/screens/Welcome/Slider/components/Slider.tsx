import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Box } from 'matrix-ui-components';
import { screenWidth } from 'src/utils/constants';
import SliderItem, { SliderItemProps } from './SliderItem';
import Paginator from './Paginator';

type SliderProps = {
  data: SliderItemProps[];
};

const Slider: React.FC<SliderProps> = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <>
      <Carousel
        data={data}
        vertical={false}
        renderItem={({ item }) => <SliderItem {...item} />}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={setActiveSlide}
        autoplayInterval={4000}
        autoplayDelay={0}
        autoplay
      />
      <Box py="spacing-xxm">
        <Paginator data={data} currentPage={activeSlide} />
      </Box>
    </>
  );
};

export default Slider;
