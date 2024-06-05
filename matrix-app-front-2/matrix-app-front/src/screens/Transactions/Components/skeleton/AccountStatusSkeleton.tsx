import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Box, colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  labelWidth: 30,
  labelHeight: 30,
};

const AccountStatusSkeleton = ({
  backgroundColor = colors.complementaryPrimary100,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <Box>
    <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="flex-end">
        <SkeletonPlaceholder.Item
          width={skeletonDimensions.labelWidth}
          height={skeletonDimensions.labelHeight}
          borderRadius={skeletonDimensions.labelHeight / 3}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </Box>
);

export default AccountStatusSkeleton;
