import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { colors } from 'src/matrix-ui-components';

const MoneyTypeTitleSkeleton = ({ backgroundColor, speed }: SkeletonProps) => (
  <SkeletonPlaceholder enabled backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item
      position="absolute"
      top={-12}
      left={15}
      width="45%"
      height={28}
      borderRadius={15}
    />
  </SkeletonPlaceholder>
);

const MoneyTypeBodySkeleton = ({ backgroundColor, speed }: SkeletonProps) => (
  <SkeletonPlaceholder enabled backgroundColor={backgroundColor} speed={speed}>
    <SkeletonPlaceholder.Item marginHorizontal={20} marginTop={25}>
      <SkeletonPlaceholder.Item width="80%" height={12} borderRadius={10} marginVertical={5} />
      <SkeletonPlaceholder.Item width="50%" height={22} borderRadius={10} marginVertical={5} />

      <SkeletonPlaceholder.Item
        width="60%"
        height={12}
        borderRadius={10}
        marginVertical={5}
        marginTop={15}
      />
      <SkeletonPlaceholder.Item width="40%" height={17} borderRadius={10} marginVertical={5} />

      <SkeletonPlaceholder.Item
        width="80%"
        height={12}
        borderRadius={10}
        marginVertical={5}
        marginTop={35}
      />
      <SkeletonPlaceholder.Item
        width="40%"
        height={12}
        borderRadius={10}
        marginVertical={5}
        marginBottom={20}
      />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

const MoneyTypeButtonSkeleton = ({
  backgroundColor = colors.primaryLigth,
  speed = 500,
}: SkeletonProps) => <MoneyTypeBodySkeleton speed={speed} backgroundColor={backgroundColor} />;

export default MoneyTypeButtonSkeleton;
