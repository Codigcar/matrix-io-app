import React, { FC } from 'react';
import Carousel from 'react-native-snap-carousel';
import Paginator from 'src/screens/Welcome/Slider/components/Paginator';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { screenWidth } from 'src/utils/constants';
import Box from '../box';
import useSlider from './hooks/useSlider';

type SlideProps = {
  title?: string;
  description?: string;
  partnerName?: string;
  image: string;
  id?: string;
  benefit: string;
  channel: 'Presencial' | 'Virtual' | 'Presencial y virtual';
};
interface Props {
  ItemSlider: any;
  listItems: SlideProps[];
  imageLoadEnd?: (value: boolean) => void;
  widthItemCustom?: number;
  onClickItem?: (value: SlideProps) => void;
}

const Slider: FC<Props> = ({
  listItems,
  widthItemCustom,
  imageLoadEnd,
  ItemSlider,
  onClickItem = () => {},
}) => {
  const {
    carouselRef,
    activeSlide,
    setActiveSlide,
    scrollEnabled,
    animatedStyle,
    handlerOnScrollIndexChanged,
    start,
    end,
    style,
    gradientColor,
  } = useSlider(listItems);

  const renderItem = ({ item }: { item: SlideProps }) => (
    <ItemSlider
      testID="item-slider"
      item={item}
      imageLoadEnd={imageLoadEnd}
      onClickItem={() => onClickItem(item)}
    />
  );

  return (
    <Box padding="spacing-none" margin="spacing-none" position="relative">
      <Carousel
        testID="carousel"
        ref={carouselRef}
        layout="default"
        data={listItems}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        onSnapToItem={(index) => setActiveSlide(index)}
        onScrollIndexChanged={handlerOnScrollIndexChanged}
        itemWidth={widthItemCustom}
        decelerationRate={1}
        inactiveSlideScale={1}
        disableIntervalMomentum={true}
        scrollEnabled={scrollEnabled}
      />
      <Box
        padding="spacing-none"
        margin="spacing-none"
        paddingTop="spacing-xs"
        paddingBottom="spacing-xs"
        position="relative"
      >
        <LinearGradient
          position="absolute"
          height={46}
          width="100%"
          colors={gradientColor}
          start={start}
          end={end}
          style={style}
          zIndex={1}
        />
        {listItems.length && (
          <Box flexDirection="row">
            <Animated.View testID="animated-element" position="absolute" style={animatedStyle}>
              <Paginator testID="paginator" data={listItems} currentPage={activeSlide} />
            </Animated.View>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Slider;
