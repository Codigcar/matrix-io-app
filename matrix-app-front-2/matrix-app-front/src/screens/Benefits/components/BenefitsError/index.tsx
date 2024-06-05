/* eslint-disable import/no-relative-packages */
import React from 'react';
import { Text, Box, Divider } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { Refresh } from 'assets/svgs';
import Styles from '../../styles/BenefitsErrorStyle';

const BenefitsError = () => (
  <Box flex={1} flexDirection="column" alignItems="center" style={Styles.container}>
    <Box style={Styles.iconCircle}>
      <Refresh />
    </Box>

    <Divider height={35} />

    <Text variant="Heading24SemiBold" numberOfLines={2} color="primary1000" textAlign="center">
      {i18n.t('benefits:error.title')}
    </Text>

    <Divider height={21} />

    <Text variant="SubTitle16" numberOfLines={2} color="primary800" textAlign="center">
      {i18n.t('benefits:error.first-message')}
    </Text>

    <Divider height={40} />

    <Text variant="SubTitle16" numberOfLines={2} color="primary800" textAlign="center">
      {i18n.t('benefits:error.second-message')}
    </Text>
  </Box>
);

export default BenefitsError;
