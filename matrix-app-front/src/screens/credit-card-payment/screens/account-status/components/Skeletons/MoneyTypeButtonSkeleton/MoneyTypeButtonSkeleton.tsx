import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Box, colors } from 'src/matrix-ui-components';

const MoneyTypeBodySkeleton = ({ backgroundColor, speed }: SkeletonProps) => (
  <Box testID="skeleton-element">
    <SkeletonPlaceholder enabled backgroundColor={backgroundColor} speed={speed}>
      <SkeletonPlaceholder.Item marginHorizontal={20} marginTop={25}>
        <SkeletonPlaceholder.Item width="80%" height={12} borderRadius={10} marginVertical={5} />
        <SkeletonPlaceholder.Item width="50%" height={22} borderRadius={10} marginVertical={5} />

        <SkeletonPlaceholder.Item
          width="60%"
          height={12}
          borderRadius={10}
          marginVertical={5}
          marginTop={15}
        />
        <SkeletonPlaceholder.Item width="40%" height={17} borderRadius={10} marginVertical={5} />

        <SkeletonPlaceholder.Item
          width="80%"
          height={12}
          borderRadius={10}
          marginVertical={5}
          marginTop={35}
        />
        <SkeletonPlaceholder.Item
          width="40%"
          height={12}
          borderRadius={10}
          marginVertical={5}
          marginBottom={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </Box>
);

export const MoneyTypeButtonSkeleton = ({
  backgroundColor = colors.primaryLigth,
  speed = 500,
}: SkeletonProps) => <MoneyTypeBodySkeleton speed={speed} backgroundColor={backgroundColor} />;
