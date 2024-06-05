import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { useTheme } from 'src/matrix-ui-components';
import { s, vs } from 'src/utils/sizes';

const skeletonDimensions = {
  labelWidth: 50,
  labelHeight: 18,
  borderLabelRadius: 10,
  titleDivider: 5.25,
  textWidth: 150,
  textHeight: 18,
  iconSize: 24,
  firstSectionDivider: 18.25,
  cardTextDivider: 14,
};

const CardProfileSkeleton = ({
  isVisible,
  speed = 800,
}: SkeletonProps) => {
  const { colors } = useTheme();
  return (
    <SkeletonPlaceholder enabled={isVisible} backgroundColor={colors.primary000} speed={speed}>
      <SkeletonPlaceholder.Item flexDirection="row">
        <SkeletonPlaceholder.Item
          width={skeletonDimensions.iconSize}
          height={skeletonDimensions.iconSize}
          borderRadius={skeletonDimensions.iconSize / 2}
          marginRight={s(16)}
          opacity={0.6}
        />
        <SkeletonPlaceholder.Item opacity={0.6} flexDirection="column" justifyContent="center">
          <SkeletonPlaceholder.Item
            width={s(54)}
            height={vs(20)}
            borderRadius={skeletonDimensions.borderLabelRadius}
          />
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            marginTop={vs(4)}
          >
            <SkeletonPlaceholder.Item
              width={s(134)}
              height={vs(20)}
              borderRadius={skeletonDimensions.borderLabelRadius}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default CardProfileSkeleton;
