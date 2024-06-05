import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  titleWidth: 88,
  titleHeight: 14,
  titleDivider: 6,
  firstSectionDivider: 14,
  labelWidth: 75,
  labelHeight: 15.75,
  marginTop: 11.38,
};

export const TransactionNameSkeleton = ({
  backgroundColor = colors.primaryLigth,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={skeletonDimensions.firstSectionDivider}
      >
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={skeletonDimensions.titleWidth}
            height={skeletonDimensions.titleHeight}
            borderRadius={skeletonDimensions.titleHeight / 2}
            marginBottom={skeletonDimensions.titleDivider}
          />
          <SkeletonPlaceholder.Item
            width={skeletonDimensions.titleWidth}
            height={skeletonDimensions.titleHeight}
            borderRadius={skeletonDimensions.titleHeight / 2}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export const TransactionValueSkeleton = ({
  backgroundColor = colors.primaryLigth,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item
      width={skeletonDimensions.labelWidth}
      height={skeletonDimensions.labelHeight}
      borderRadius={skeletonDimensions.labelHeight / 2}
      marginTop={skeletonDimensions.marginTop}
    />
  </SkeletonPlaceholder>
);
