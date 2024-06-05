import React from 'react';
import { Box, Text, fonts } from 'matrix-ui-components';
import { ConsumedSkeleton } from 'src/screens/Home/components/skeleton/CreditCardSkeleton';
import { i18n } from 'src/utils/core/MTXStrings';
import { rem } from 'src/utils/constants';
import Helpers from 'src/utils/Helpers';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import { useShowBalanceSelectors } from 'src/core/libraries-implementation';
import styles from '../styles/MtxCreaditCardStyle';
import type { IConsumedCard } from '../types';

const ConsumedCard = ({
  balanceLoading,
  consumed,
  isMultiCurrency,
  showBalance = false,
}: IConsumedCard) => {
  const { isShowBalance } = useShowBalanceSelectors();
  if (!isMultiCurrency) {
    return (
      <Box>
        <Text color="white" style={styles.consumedTitle}>
          {i18n.t('credit-card-consumed-label')}
        </Text>
        <MtxDivider height={1} />
        {balanceLoading ? (
          <ConsumedSkeleton isVisible />
        ) : (
          <Text color="white" style={styles.consumedValue}>
            {!showBalance
              ? Helpers.formatCurrency(
                consumed.PEN.amount || 0,
                { removeDecimalsWhenRounded: true },
              )
              : 'S/****'}
          </Text>
        )}
        <MtxDivider height={13 * rem} />
      </Box>
    );
  }

  return (
    <Box>
      <Text color="primary500" style={styles.consumedTitle}>
        {i18n.t('credit-card-consumed-label-multicurrency')}
      </Text>

      <MtxDivider height={3} />

      {balanceLoading ? (
        <>
          <ConsumedSkeleton isVisible />
          <ConsumedSkeleton isVisible />
        </>
      ) : (
        <>
          <Text color="white" style={styles.consumedValue}>
            {!isShowBalance
              ? Helpers.formatCurrency(consumed.PEN.amount, { removeDecimalsWhenRounded: true })
              : 'S/****'}
          </Text>
          <Text color="gray300" fontSize={16} fontFamily={fonts.outfitSemibold}>
            {!isShowBalance
              ? Helpers.formatCurrency(consumed.USD.amount, {
                removeDecimalsWhenRounded: true,
                currencySymbol: '$',
              })
              : '$****'}
          </Text>
        </>
      )}
    </Box>
  );
};

export default ConsumedCard;
