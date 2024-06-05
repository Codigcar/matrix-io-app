import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const BillingCycleSkeleton = ({
  backgroundColor = colors.primaryLigth,
  isVisible,
  speed = 500,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item marginHorizontal={20} marginTop={20} marginBottom={20}>
      <SkeletonPlaceholder.Item flexDirection="row">
        <SkeletonPlaceholder.Item width="50%" flexDirection="column">
          <SkeletonPlaceholder.Item width="85%" height={30} borderRadius={15} marginVertical={10} />
          <SkeletonPlaceholder.Item width="85%" height={15} borderRadius={10} marginVertical={5} marginTop={15} />
          <SkeletonPlaceholder.Item width="60%" height={15} borderRadius={10} marginVertical={5} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width="50%" flexDirection="column">
          <SkeletonPlaceholder.Item width="90%" height={15} borderRadius={10} marginVertical={5} />
          <SkeletonPlaceholder.Item width="60%" height={15} borderRadius={10} marginVertical={5} />
          <SkeletonPlaceholder.Item width="90%" height={50} borderRadius={20} marginTop={15} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default BillingCycleSkeleton;
