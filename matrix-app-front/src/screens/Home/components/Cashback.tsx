import React from 'react';
import Helpers from 'src/utils/Helpers';
import Ticket from 'assets/svgs/ticket.svg';
import Refresh from 'assets/svgs/black-refresh.svg';
import { Text, Box, fonts } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { BenefitsIconDisabled } from 'assets/svgs';
import CashbackSkeleton from './skeleton/CashbackSkeleton';
import HomeCardWrapper from './HomeCardWrapper';
import useCashbackData from './CashBack/hooks/useCashbackData';

interface CashbackProps {
  disabled?: boolean;
  onPress?: () => void;
  errorServices: string[];
  setErrorServices: Function;
}

const Cashback = ({
  disabled,
  onPress,
  errorServices,
  setErrorServices,
}: CashbackProps) => {
  const {
    pointCashback,
    loading,
    errorServiceCashback,
    getCashBack,
  } = useCashbackData({ errorServices, setErrorServices });

  const textColor = !disabled ? 'primary1000' : 'primary500';

  return (
    <HomeCardWrapper
      disabled={disabled}
      onPress={errorServiceCashback ? () => getCashBack() : onPress}
      color={!disabled ? 'complementaryIndigo100' : 'primary100'}
    >
      {!loading && errorServiceCashback ? (
        <Box>
          <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
            <Refresh />
            <Ticket />
          </Box>
          <Box mt="spacing-xxxs">
            <Text
              variant="smallLabelCard"
              fontFamily={fonts.outfitRegular}
              color="primary500"
              numberOfLines={1}
            >
              {i18n.t('home-service-error')}
            </Text>
            <Text variant="smallLabelCard" fontFamily={fonts.outfitRegular} color="primary500">
              <Text variant="smallLabelCard" fontWeight="600" color="primaryDarkest">
                {i18n.t('home-tap-refresh')}
              </Text>
              {i18n.t('home-tap-refresh-label')}
            </Text>
          </Box>
        </Box>
      ) : (
        <>
          <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
            <Box>
              <Text variant="Subtitle16pxMedium" color={textColor}>
                {i18n.t('home-cashback-title')}
              </Text>
            </Box>
            {!disabled ? <Ticket /> : <BenefitsIconDisabled />}
          </Box>
          <Box>
            {loading ? <CashbackSkeleton isVisible /> : (
              <Text variant="label" color={textColor}>
                {Helpers.formatCurrency(pointCashback, { removeDecimalsWhenRounded: true })}
              </Text>
            )}
            <Text variant="smallLabelCard" color="primary800">
              {i18n.t('home-accumulated')}
            </Text>
          </Box>
        </>
      )}
    </HomeCardWrapper>
  );
};

Cashback.defaultProps = {
  disabled: false,
  onPress: () => {},
};

export default Cashback;
