import {
  Box,
} from 'matrix-ui-components';
import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { CardIndigo, CardPosBlack } from 'assets/svgs';
import { BalanceComponentProps } from '../types/types';
import CardBalance from './CardBalance';

const Balance = ({
  availableBalance = 0, currentConsumption = 0, loading,
}: BalanceComponentProps) => (
  <Box
    flexDirection="row"
    marginHorizontal="spacing-m"
    justifyContent="space-between"
    marginBottom="spacing-xs"
  >
    <CardBalance
      value={availableBalance}
      label={i18n.t('accountStatus.available-balance')}
      backgroundColor="complementaryIndigo050"
      isLoading={loading}
      icon={CardIndigo}
      testID="availableBalance"
      colorLabel="complementaryIndigo800"
      colorValue="complementaryIndigo900"
    />
    <CardBalance
      value={currentConsumption}
      label={i18n.t('accountStatus.total-consumption')}
      backgroundColor="primary100"
      isLoading={loading}
      icon={CardPosBlack}
      testID="currentConsumption"
      colorLabel="primary1000"
      colorValue="primary1000"
    />
  </Box>
);

export default Balance;
