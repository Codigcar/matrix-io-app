import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { useTheme } from 'src/matrix-ui-components';

const skeletonDimensions = {
  labelWidth: 100,
  labelHeight: 24,
  borderLabelRadius: 10,
  iconSize: 24,
  firstSectionDivider: 18.25,
  margin: 10,
};

const LogoutSkeleton = ({
  isVisible,
  speed = 800,
}: SkeletonProps) => {
  const { colors } = useTheme();
  return (
    <SkeletonPlaceholder enabled={isVisible} backgroundColor={colors.primary100} speed={speed}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="flex-start"
          marginBottom={skeletonDimensions.firstSectionDivider}
        >
          <SkeletonPlaceholder.Item
            width={skeletonDimensions.iconSize}
            height={skeletonDimensions.iconSize}
            borderRadius={skeletonDimensions.iconSize / 2}
            marginRight={skeletonDimensions.margin}
          />
          <SkeletonPlaceholder.Item
            width={skeletonDimensions.labelWidth}
            height={skeletonDimensions.labelHeight}
            borderRadius={skeletonDimensions.borderLabelRadius}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default LogoutSkeleton;
