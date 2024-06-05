import React from 'react';
import { Pagination } from 'react-native-snap-carousel';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Box, Theme, useTheme } from 'matrix-ui-components';
import { PaginatorProps } from '../../shared/types/components';

const Paginator: React.FC<PaginatorProps> = (props) => {
  const { data, currentPage } = props;
  const theme = useTheme();

  const styles = (theme_: Theme) => {
    const createdStyles = EStyleSheet.create({
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: '120rem',
      },
      dotStyle: {
        height: '10rem',
        width: '29rem',
        borderRadius: 8,
        marginHorizontal: -4,
        borderColor: theme_.colors.primary1000,
        backgroundColor: theme_.colors.white,
        borderWidth: 3,
      },
      inactiveDotStyle: {
        borderColor: theme_.colors.white,
        backgroundColor: theme_.colors.primary300,
      },
    });

    return (
      createdStyles || {
        container: {},
        dotStyle: {},
        inactiveDotStyle: {},
      }
    );
  };

  return (
    <Box testID="paginator">
      <Pagination
        dotsLength={data.length}
        activeDotIndex={currentPage}
        containerStyle={styles(theme).container}
        dotStyle={styles(theme).dotStyle}
        inactiveDotStyle={styles(theme).inactiveDotStyle}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    </Box>
  );
};

export default Paginator;
