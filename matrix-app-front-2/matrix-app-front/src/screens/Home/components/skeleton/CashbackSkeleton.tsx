import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  labelWidth: 80,
  labelHeight: 19,
};

const CashbackSkeleton = ({
  backgroundColor = colors.complementaryIndigo200,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.labelWidth}
        height={skeletonDimensions.labelHeight}
        borderRadius={skeletonDimensions.labelHeight / 2}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default CashbackSkeleton;