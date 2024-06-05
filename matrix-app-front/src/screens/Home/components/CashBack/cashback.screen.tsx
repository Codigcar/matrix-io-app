import React from 'react';
import Helpers from 'src/utils/Helpers';
import { Ticket, BlackRefresh } from 'assets/svgs/index';
import { Text, Box, fonts } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { BenefitsIconDisabled } from 'assets/svgs';
import { useAppDispatch } from 'src/core/libraries-implementation/state-manager/dispatch';
import { setAccumulatedCashback } from 'src/core/libraries-implementation/state-manager/states/credit-card/cashback/redemption.state';
import { RFValue } from 'react-native-responsive-fontsize';
import CashbackSkeleton from '../skeleton/CashbackSkeleton';
import HomeCardWrapper from '../HomeCardWrapper';
import { useCashbackPresenter, CashbackPresenterProps } from './cashback.presenter';
import useDeliquentValues from '../hooks/useDelinquentValues';

type CashbackDataProps = {
  disabled: boolean;
  loading: boolean;
  pointCashback: number;
}

const CashbackData = ({ disabled, loading, pointCashback }: CashbackDataProps) => {
  const textColor = !disabled ? 'primary800' : 'primary500';
  const dispatch = useAppDispatch();
  dispatch(setAccumulatedCashback(pointCashback));
  return (
    <>
      <Box flexDirection="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Text variant="Subtitle16pxMedium" color={textColor}>
            {i18n.t('home-cashback-title')}
          </Text>
        </Box>
        {!disabled ? <Ticket /> : <BenefitsIconDisabled />}
      </Box>
      <Box height={RFValue(22)} pt="spacing-xxxxxs" mt="spacing-xxxxxs">
        {loading ? <CashbackSkeleton isVisible /> : (
          <Text variant="label" color={textColor}>
            {Helpers.formatCurrency(pointCashback, { removeDecimalsWhenRounded: true })}
          </Text>
        )}
      </Box>
      <Text variant="smallLabelCard" color="primary800">
        {i18n.t('home-accumulated')}
      </Text>
    </>
  );
};

const CashbackError = () => (
  <Box>
    <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
      <BlackRefresh />
      <Ticket />
    </Box>
    <Box mt="spacing-xxxs">
      <Text
        variant="smallLabelCard"
        fontFamily={fonts.outfitRegular}
        color="primary500"
        numberOfLines={1}
      >
        {i18n.t('home:cashback.service-error')}
      </Text>
      <Text
        variant="smallLabelCard"
        fontFamily={fonts.outfitRegular}
        color="primary500"
      >
        <Text
          variant="smallLabelCard"
          fontWeight="600"
          color="primaryDarkest"
        >
          {i18n.t('home:cashback.tap-refresh')}
        </Text>
        {i18n.t('home:cashback.tap-refresh-label')}
      </Text>
    </Box>
  </Box>
);

type CashbackContentProps = {
  loading: boolean;
  errorServiceCashback: boolean;
  disabled: boolean;
  pointCashback: number;
}

const CashbackContent = ({
  loading, errorServiceCashback, disabled, pointCashback,
}: CashbackContentProps) => {
  if (!loading && errorServiceCashback) return <CashbackError />;
  return <CashbackData disabled={disabled} pointCashback={pointCashback} loading={loading} />;
};

const CashbackScreen: React.FC<CashbackPresenterProps> = (props) => {
  const { isCashbackDelinquentDisabled } = useDeliquentValues();
  const {
    pointCashback,
    loading,
    errorServiceCashback,
    disabled,
    onPressHandler,
  } = useCashbackPresenter(props);

  return (
    <HomeCardWrapper
      disabled={disabled || isCashbackDelinquentDisabled}
      onPress={onPressHandler}
      color="complementaryIndigo100"
    >
      <CashbackContent
        loading={loading}
        errorServiceCashback={errorServiceCashback}
        disabled={disabled || isCashbackDelinquentDisabled}
        pointCashback={pointCashback}
      />
    </HomeCardWrapper>
  );
};

CashbackScreen.defaultProps = {
  disabled: false,
  onPressHandler: () => {},
};

export default CashbackScreen;
