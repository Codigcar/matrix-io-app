import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Box, colors } from 'src/matrix-ui-components';

export const BalanceSkeleton = ({
  backgroundColor = colors.primaryLigth,
  isVisible,
  speed = 500,
}: SkeletonProps) => (
  <Box testID="skeleton-element">
    <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item justifyContent="space-between" flexDirection="row" marginTop={10}>
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item width={5} height={5} borderRadius={50} marginRight={2} />
            <SkeletonPlaceholder.Item width="60%" height={10} borderRadius={5} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="10%" height={10} borderRadius={5} />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item width="100%" height={5} borderRadius={5} marginVertical={10} />

        <SkeletonPlaceholder.Item
          justifyContent="space-between"
          flexDirection="row"
          marginBottom={10}
        >
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item width={5} height={5} borderRadius={50} marginRight={2} />
            <SkeletonPlaceholder.Item width="80%" height={10} borderRadius={5} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="10%" height={10} borderRadius={5} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </Box>
);
