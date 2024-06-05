import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  labelWidth: 96,
  labelHeight: 22,

  linkWidth: 84,
  linkHeight: 18,
  linkMarginLeft: 4,
};

export const PaymentAmountSkeleton = ({
  backgroundColor = colors.complementarySteel200,
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

export const PaymentDateSkeleton = ({
  backgroundColor = colors.complementarySteel200,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.linkWidth}
        height={skeletonDimensions.linkHeight}
        borderRadius={skeletonDimensions.linkHeight / 2}
        marginLeft={skeletonDimensions.linkMarginLeft}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);
