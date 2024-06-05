import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Box, colors } from 'src/matrix-ui-components';

const MethodPaymentSkeleton = ({
  backgroundColor = colors.primaryLigth,
  isVisible,
  speed = 500,
}: SkeletonProps) => (
  <Box
    testID="skeleton-element"
    backgroundColor="white"
    padding="spacing-xs"
    borderRadius={18}
    alignItems="center"
    justifyContent="center"
  >
    <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item justifyContent="space-between" flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={75} height={60} borderRadius={15} marginRight={20} backgroundColor="secundaryDisable" />
          <SkeletonPlaceholder.Item width="61%" marginRight={5}>
            <SkeletonPlaceholder.Item height={10} width={80} borderRadius={50} marginBottom={5} />
            <SkeletonPlaceholder.Item height={10} width={150} borderRadius={50} marginTop={5} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={20} height={25} borderRadius={8} backgroundColor="secundaryDisable" />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </Box>
);

export default MethodPaymentSkeleton;
