import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { useTheme } from 'src/matrix-ui-components';

const skeletonDimensions = {
  labelWidth: 120,
  labelHeight: 18,
  borderLabelRadius: 10,
  marginBottom: 15,
};

const LabelSkeleton = ({
  isVisible,
  speed = 800,
  width,
}: SkeletonProps & { width?: number }) => {
  const { colors } = useTheme();
  return (
    <SkeletonPlaceholder enabled={isVisible} backgroundColor={colors.primary000} speed={speed}>
      <SkeletonPlaceholder.Item
        width={width ?? skeletonDimensions.labelWidth}
        height={skeletonDimensions.labelHeight}
        borderRadius={skeletonDimensions.borderLabelRadius}
        opacity={0.6}
      />
    </SkeletonPlaceholder>
  );
};

LabelSkeleton.defaultProps = {
  width: undefined,
};

export default LabelSkeleton;
