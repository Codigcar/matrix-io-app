import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RFValue } from 'react-native-responsive-fontsize';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  labelWidth: 160,
  labelHeight: 29,
  subtitleWidth: 80,
  subtitleHeight: 17,
};

export const BalanceSkeleton = ({
  backgroundColor = colors.complementaryPrimary100,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.labelWidth}
        height={skeletonDimensions.labelHeight}
        borderRadius={skeletonDimensions.labelHeight / 2}
        marginVertical={RFValue(2)}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const CreditLineSkeleton = ({
  backgroundColor = colors.complementaryPrimary100,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.subtitleWidth}
        height={skeletonDimensions.subtitleHeight}
        borderRadius={skeletonDimensions.subtitleHeight / 2}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);
