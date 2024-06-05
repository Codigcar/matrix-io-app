/* eslint-disable import/no-relative-packages */
import React from 'react';
import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';

const BenefitsDetailsSkeleton = ({
  backgroundColor = colors.primary100,
  isVisible,
  speed = 500,
}: SkeletonProps) => (
  <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item width="100%">
      <SkeletonPlaceholder.Item width="100%" height={200} borderRadius={24} marginBottom={16} />

      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={16}
      >
        <SkeletonPlaceholder.Item width="20%" height={27} borderRadius={16} />
        <SkeletonPlaceholder.Item width="20%" height={27} borderRadius={16} />
      </SkeletonPlaceholder.Item>

      <SkeletonPlaceholder.Item width="70%" height={24} borderRadius={19} marginBottom={4} />
      <SkeletonPlaceholder.Item width="50%" height={24} borderRadius={19} marginBottom={22} />

      <SkeletonPlaceholder.Item width="45%" height={24} borderRadius={19} marginBottom={12} />

      <SkeletonPlaceholder.Item width="30%" height={12} borderRadius={19} marginBottom={6} />

      <SkeletonPlaceholder.Item marginBottom={26} flexDirection="column" alignItems="flex-start">
        <SkeletonPlaceholder.Item marginBottom={6} flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={12} height={12} borderRadius={6} marginRight={7} />
          <SkeletonPlaceholder.Item width="60%" height={12} borderRadius={19} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginBottom={6} flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={12} height={12} borderRadius={6} marginRight={7} />
          <SkeletonPlaceholder.Item width="60%" height={12} borderRadius={19} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginBottom={6} flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={12} height={12} borderRadius={6} marginRight={7} />
          <SkeletonPlaceholder.Item width="60%" height={12} borderRadius={19} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginBottom={6} flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={12} height={12} borderRadius={6} marginRight={7} />
          <SkeletonPlaceholder.Item width="60%" height={12} borderRadius={19} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={12} height={12} borderRadius={6} marginRight={7} />
          <SkeletonPlaceholder.Item width="60%" height={12} borderRadius={19} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>

      <SkeletonPlaceholder.Item marginBottom={28} flexDirection="column" alignItems="flex-start">
        <SkeletonPlaceholder.Item width="50%" height={22} borderRadius={19} marginBottom={10} />
        <SkeletonPlaceholder.Item width="100%" height={12} borderRadius={19} marginBottom={6} />
        <SkeletonPlaceholder.Item width="100%" height={12} borderRadius={19} marginBottom={6} />
        <SkeletonPlaceholder.Item width="70%" height={12} borderRadius={19} />
      </SkeletonPlaceholder.Item>

      <SkeletonPlaceholder.Item marginBottom={28} flexDirection="column" alignItems="flex-start">
        <SkeletonPlaceholder.Item width="50%" height={22} borderRadius={19} marginBottom={10} />
        <SkeletonPlaceholder.Item width="45%" height={12} borderRadius={19} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default BenefitsDetailsSkeleton;
