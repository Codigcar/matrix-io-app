import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface ButtonProps {
  backgroundColor: string | undefined;
  enabled: boolean;
  speed?: number;
}

const skeletonTextDimensions = {
  width: 119,
  height: 21,
  marginLeft: 12,
  marginDivide: 9,
};

const skeletonIconDimensions = {
  size: 48,
};

const HomeTopBarSkeleton = ({ backgroundColor, enabled, speed = 800 }: ButtonProps) => (
  <SkeletonPlaceholder
    borderRadius={4}
    enabled={enabled}
    backgroundColor={backgroundColor}
    speed={speed}
  >
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
      <SkeletonPlaceholder.Item
        width={skeletonIconDimensions.size}
        height={skeletonIconDimensions.size}
        borderRadius={skeletonIconDimensions.size / 2}
      />
      <SkeletonPlaceholder.Item marginLeft={skeletonTextDimensions.marginLeft}>
        <SkeletonPlaceholder.Item
          width={skeletonTextDimensions.width}
          height={skeletonTextDimensions.height}
          borderRadius={skeletonTextDimensions.height / 2}
        />
        <SkeletonPlaceholder.Item
          marginTop={skeletonTextDimensions.marginDivide}
          width={skeletonTextDimensions.width}
          height={skeletonTextDimensions.height}
          borderRadius={skeletonTextDimensions.height / 2}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default HomeTopBarSkeleton;
