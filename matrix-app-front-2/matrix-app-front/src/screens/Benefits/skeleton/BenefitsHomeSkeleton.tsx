/* eslint-disable import/no-relative-packages */
import React from 'react';
import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SkeletonProps } from 'src/utils/types';
import { Text, Box, Container, Divider } from 'matrix-ui-components';
import { hp } from 'src/utils/sizes';

const BenefitsHomeSkeleton = ({
  backgroundColor = colors.primary100,
  isVisible,
  speed = 500,
}: SkeletonProps) => (
  <Box>
    <Box>
      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="flex-start">
          <SkeletonPlaceholder.Item width="70%" height={22} borderRadius={12} marginBottom={16} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <Box
        padding="spacing-s"
        backgroundColor="primary100"
        borderRadius={24}
        paddingRight="spacing-xxm"
      >
        <SkeletonPlaceholder enabled={isVisible} backgroundColor={colors.primary000} speed={speed}>
          <SkeletonPlaceholder.Item
            borderRadius={24}
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonPlaceholder.Item width="52%" height={109} borderRadius={16} marginRight="5%" />
            <SkeletonPlaceholder.Item
              width="43%"
              height={109}
              flexDirection="column"
              alignItems="flex-start"
            >
              <SkeletonPlaceholder.Item
                width="100%"
                height={25}
                borderRadius={12}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={19}
                borderRadius={12}
                marginBottom={23}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={17}
                borderRadius={12}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item width="100%" height={17} borderRadius={12} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </Box>

      <Divider height={14} />

      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center" width="100%">
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>

    <Divider height={26} />

    <Box>
      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="flex-start">
          <SkeletonPlaceholder.Item width="70%" height={22} borderRadius={12} marginBottom={16} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <Box
        padding="spacing-s"
        backgroundColor="primary100"
        borderRadius={24}
        paddingRight="spacing-xxm"
      >
        <SkeletonPlaceholder enabled={isVisible} backgroundColor={colors.primary000} speed={speed}>
          <SkeletonPlaceholder.Item
            borderRadius={24}
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonPlaceholder.Item width="52%" height={109} borderRadius={16} marginRight="5%" />
            <SkeletonPlaceholder.Item
              width="43%"
              height={109}
              flexDirection="column"
              alignItems="flex-start"
            >
              <SkeletonPlaceholder.Item
                width="100%"
                height={25}
                borderRadius={12}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={19}
                borderRadius={12}
                marginBottom={23}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={17}
                borderRadius={12}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item width="100%" height={17} borderRadius={12} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </Box>

      <Divider height={14} />

      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center" width="100%">
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>

    <Divider height={26} />

    <Box>
      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="flex-start">
          <SkeletonPlaceholder.Item width="70%" height={22} borderRadius={12} marginBottom={16} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <Box
        padding="spacing-s"
        backgroundColor="primary100"
        borderRadius={24}
        paddingRight="spacing-xxm"
      >
        <SkeletonPlaceholder enabled={isVisible} backgroundColor={colors.primary000} speed={speed}>
          <SkeletonPlaceholder.Item
            borderRadius={24}
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonPlaceholder.Item width="52%" height={109} borderRadius={16} marginRight="5%" />
            <SkeletonPlaceholder.Item
              width="43%"
              height={109}
              flexDirection="column"
              alignItems="flex-start"
            >
              <SkeletonPlaceholder.Item
                width="100%"
                height={25}
                borderRadius={12}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={19}
                borderRadius={12}
                marginBottom={23}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={17}
                borderRadius={12}
                marginBottom={4}
              />
              <SkeletonPlaceholder.Item width="100%" height={17} borderRadius={12} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </Box>

      <Divider height={14} />

      <SkeletonPlaceholder enabled={isVisible} backgroundColor={backgroundColor} speed={speed}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center" width="100%">
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} marginRight={12} />
          <SkeletonPlaceholder.Item width="5%" height={4} borderRadius={3} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>
  </Box>
);

export default BenefitsHomeSkeleton;
