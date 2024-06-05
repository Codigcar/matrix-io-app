import React from 'react';
import {
  Box, fonts, Text
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';


interface IFeatureIconProps  {
  title: string;
  description:  string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  icon: React.FC;
}
const FeatureItem = ({title ="", description = "", icon} : IFeatureIconProps) => {
    const Icon = icon;
    return (
      <Box mb="spacing-m" flexDirection="row">
        <Box mr={'spacing-s'}>
          <Icon />
        </Box>

        <Box flexShrink={1}>
          <Text mb="spacing-xxxs" variant={'label'} fontSize={RFValue(14)}>
            {title}
          </Text>
          <Text variant={'body12pxRegular'}>{description}</Text>
        </Box>
      </Box>
    );
}

export default FeatureItem;