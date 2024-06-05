import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  logoHeight: 25,
  logoPadding: 2,
  iconHeight: 24,
  iconWidth: 24,
  labelWidth: 96,
  labelHeight: 22,
  labelDivider: 6.75,
};

export const EyeIconSkeleton = ({
  backgroundColor = colors.complementaryIndigo100,
  isVisible,
  speed = 900,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.iconWidth}
        height={skeletonDimensions.iconHeight}
        borderRadius={skeletonDimensions.logoHeight / 2}
        opacity={0.5}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const ConsumedSkeleton = ({
  backgroundColor = colors.complementarySteel900,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item justifyContent="space-between" marginTop={5}>
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.labelWidth}
        height={skeletonDimensions.labelHeight}
        borderRadius={skeletonDimensions.labelHeight / 2}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);
