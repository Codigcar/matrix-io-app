import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Box , colors } from 'matrix-ui-components';


const skeletonDimensions = {
  titleWidth: 300,
  nextLineText: 257,
  dateText:150,
  titleHeight: 16,
  borderRadius:8,
  labelWidth: 80,
  boxBorderRadius: 16
};

const SkeletonItem = ({ isVisible, backgroundColor, speed }: SkeletonProps) => {
  return (
    <Box
      backgroundColor="primary100"
      marginBottom="spacing-s"
      padding="spacing-s"
      borderRadius={skeletonDimensions.boxBorderRadius}
    >
      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="flex-start">
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={skeletonDimensions.titleWidth}
              height={skeletonDimensions.titleHeight}
              borderRadius={skeletonDimensions.borderRadius}
            />
            <SkeletonPlaceholder.Item
              marginTop={'1%'}
              width={skeletonDimensions.nextLineText}
              height={skeletonDimensions.titleHeight}
              borderRadius={skeletonDimensions.borderRadius}
            />
            <SkeletonPlaceholder.Item
              marginTop={'5%'}
              width={skeletonDimensions.dateText}
              height={skeletonDimensions.titleHeight}
              borderRadius={skeletonDimensions.borderRadius}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>
  );
};

const ListNotificationsSkeleton = ({
  backgroundColor = colors.white,
  isVisible,
  speed = 800,
}: SkeletonProps) => {

  const numberOfItems = 6;

  const skeletonItems = [];
  for (let i = 0; i < numberOfItems; i++) {
    skeletonItems.push(
      <SkeletonItem key={i} backgroundColor={backgroundColor} isVisible={isVisible} speed={speed} />
    );
  }

  return (
    <Box pr="spacing-m" pl="spacing-m">
      {skeletonItems}
    </Box>
  );

}

export default ListNotificationsSkeleton;