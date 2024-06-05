import React from 'react';
import { useTheme } from 'matrix-ui-components';
import { Pagination } from 'react-native-snap-carousel';
import { SliderItemProps } from './SliderItem';
import styles from '../styles/PaginatorStyle';

type PaginatorProps = {
  data: SliderItemProps[];
  currentPage: number;
};

const Paginator: React.FC<PaginatorProps> = ({ data, currentPage }) => {
  const theme = useTheme();
  return (
    <Pagination
      dotsLength={data.length}
      activeDotIndex={currentPage}
      containerStyle={styles(theme).container}
      dotStyle={styles(theme).dotStyle}
      inactiveDotStyle={styles(theme).inactiveDotStyle}
      inactiveDotOpacity={1}
      inactiveDotScale={1}
    />
  );
};

export default Paginator;
