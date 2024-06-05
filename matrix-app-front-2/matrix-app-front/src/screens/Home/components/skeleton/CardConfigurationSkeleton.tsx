import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';

const skeletonDimensions = {
  labelWidth: 54,
  labelHeight: 18,
  labelMarginLeft: 8,
};

const CardConfigurationSkeleton = ({
  backgroundColor = colors.primary300,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.labelWidth}
        height={skeletonDimensions.labelHeight}
        borderRadius={skeletonDimensions.labelHeight / 2}
      />
      <SkeletonPlaceholder.Item
        width={48}
        height={skeletonDimensions.labelHeight}
        borderRadius={skeletonDimensions.labelHeight / 2}
        marginLeft={skeletonDimensions.labelMarginLeft}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default CardConfigurationSkeleton;