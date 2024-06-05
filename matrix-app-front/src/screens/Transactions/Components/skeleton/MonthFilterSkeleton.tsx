import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Box, colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  labelWidth: 74,
  labelHeight: 38,
};

const MonthFilterSkeleton = ({
  backgroundColor = colors.complementaryPrimary100,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <Box mx="spacing-m" >
    <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
        <SkeletonPlaceholder.Item
          width={skeletonDimensions.labelWidth}
          height={skeletonDimensions.labelHeight}
          borderRadius={skeletonDimensions.labelHeight / 2}
        />
        <SkeletonPlaceholder.Item
          width={skeletonDimensions.labelWidth}
          height={skeletonDimensions.labelHeight}
          borderRadius={skeletonDimensions.labelHeight / 2}
        />
        <SkeletonPlaceholder.Item
          width={skeletonDimensions.labelWidth}
          height={skeletonDimensions.labelHeight}
          borderRadius={skeletonDimensions.labelHeight / 2}
        />
        <SkeletonPlaceholder.Item
          width={skeletonDimensions.labelWidth}
          height={skeletonDimensions.labelHeight}
          borderRadius={skeletonDimensions.labelHeight / 2}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </Box>
);

export default MonthFilterSkeleton;
