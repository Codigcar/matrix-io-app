import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const MoneyChangeSkeleton = ({
  backgroundColor = colors.gray100,
  isVisible,
  speed = 500,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item marginHorizontal={30} marginVertical={10}>
      <SkeletonPlaceholder.Item width="85%" height={20} borderRadius={10} marginBottom={20} />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default MoneyChangeSkeleton;
