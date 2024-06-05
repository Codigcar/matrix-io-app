import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Box, colors } from 'src/matrix-ui-components';

const skeletonDimensions = {
  titleWidth: 135,
  titleHeight: 19,
  iconSize: 48,
  labelWidth: 80,
};

const SkeletonItem = ({ isVisible, backgroundColor, speed }: SkeletonProps) => {
  return (
    <Box
      backgroundColor="complementaryPrimary100"
      marginTop="spacing-xxs"
      padding="spacing-xs"
      borderRadius={16}
    >
      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
          <SkeletonPlaceholder.Item
            width={skeletonDimensions.iconSize}
            height={skeletonDimensions.iconSize}
            borderRadius={skeletonDimensions.iconSize / 2}
          />
          <SkeletonPlaceholder.Item justifyContent="space-between">
            <SkeletonPlaceholder.Item
              width={skeletonDimensions.titleWidth}
              height={skeletonDimensions.titleHeight}
              borderRadius={skeletonDimensions.titleHeight / 2}
            />
            <SkeletonPlaceholder.Item
              width={skeletonDimensions.titleWidth}
              height={skeletonDimensions.titleHeight}
              borderRadius={skeletonDimensions.titleHeight / 2}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item justifyContent="center">
            <SkeletonPlaceholder.Item
              width={skeletonDimensions.labelWidth}
              height={skeletonDimensions.titleHeight}
              borderRadius={skeletonDimensions.titleHeight / 2}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>
  );
};

const TransactionsListSkeleton = ({
  backgroundColor = colors.white,
  isVisible,
  speed = 800,
}: SkeletonProps) => (
  <Box>
    <SkeletonPlaceholder
      enabled={isVisible}
      backgroundColor={colors.complementaryPrimary100}
      speed={speed}
    >
      <SkeletonPlaceholder.Item
        width={skeletonDimensions.labelWidth}
        height={skeletonDimensions.titleHeight}
        borderRadius={skeletonDimensions.titleHeight / 2}
      />
    </SkeletonPlaceholder>
    <SkeletonItem backgroundColor={backgroundColor} isVisible={isVisible} speed={speed} />
    <SkeletonItem backgroundColor={backgroundColor} isVisible={isVisible} speed={speed} />
    <SkeletonItem backgroundColor={backgroundColor} isVisible={isVisible} speed={speed} />
    <Box marginTop="spacing-xxs">
      <SkeletonPlaceholder
        enabled={isVisible}
        backgroundColor={colors.complementaryPrimary100}
        speed={speed}
      >
        <SkeletonPlaceholder.Item
          width={skeletonDimensions.labelWidth}
          height={skeletonDimensions.titleHeight}
          borderRadius={skeletonDimensions.titleHeight / 2}
        />
      </SkeletonPlaceholder>
    </Box>
    <SkeletonItem backgroundColor={backgroundColor} isVisible={isVisible} speed={speed} />
    <SkeletonItem backgroundColor={backgroundColor} isVisible={isVisible} speed={speed} />
    <SkeletonItem backgroundColor={backgroundColor} isVisible={isVisible} speed={speed} />
  </Box>
);

export default TransactionsListSkeleton;
