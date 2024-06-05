import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import Helpers from 'src/utils/Helpers';
import {
  Box, fonts, Text, TouchableOpacityBox,
} from 'matrix-ui-components';
import { Eye, EyeSlash, Refresh } from 'assets/svgs';
import { TouchableOpacity } from 'react-native';
import { useShowBalanceSelectors } from 'src/store/selectors/showBalanceSelector';
import { useDispatch } from 'react-redux';
import { setShowBalance } from 'src/store/states/showBalance';
import { BalanceSkeleton, CreditLineSkeleton } from './skeleton/CreditInfoSkeleton';
import useDeliquentValues from './hooks/useDelinquentValues';

const ReloadMessage = ({ onPress = () => {} }) => (
  <TouchableOpacity onPress={onPress}>
    <Box>
      <Box flexDirection="row" justifyContent="space-between" mb="spacing-xxs">
        <Refresh />
      </Box>
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
  </TouchableOpacity>
);

type creditInfoTypeProps = {
  availableValue: number;
  creditValue: number;
  isLoading: boolean;
  disabled?: boolean;
  errorServiceBalance: boolean;
  onPress: () => void;
  getBalance: () => void;
};

const CreditInfo = ({
  availableValue,
  creditValue,
  isLoading,
  disabled,
  errorServiceBalance = false,
  getBalance,
  onPress,
}: creditInfoTypeProps) => {
  const { isCredInfoDelinquentDisabled } = useDeliquentValues();
  const dispatch = useDispatch();
  const { isShowBalance } = useShowBalanceSelectors();

  const getTextTitle = () => {
    // eslint-disable-next-line no-nested-ternary
    const title = errorServiceBalance
      ? 'home-available-balance'
      : isShowBalance
        ? 'home-show-balance'
        : 'home-hide-balance';
    return title;
  };

  return (
    <>
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start" margin="spacing-none" marginBottom="spacing-xxxxxs">
        <Text color="primary500" variant="body" margin="spacing-none">
          {i18n.t(getTextTitle())}
        </Text>

        {!errorServiceBalance && (
          <TouchableOpacityBox
            onPress={() => {
              dispatch(setShowBalance(!isShowBalance));
              if (isShowBalance) {
                onPress();
              }
            }}
            margin="spacing-none"
            marginLeft="spacing-xxs"
          >
            {isShowBalance ? <Eye /> : <EyeSlash />}
          </TouchableOpacityBox>
        )}
      </Box>

      {!isLoading && errorServiceBalance ? (
        <ReloadMessage onPress={getBalance} />
      ) : (
        <>
          <Box margin="spacing-none" marginBottom="spacing-xxxxxs">
            {isLoading ? (
              <BalanceSkeleton isVisible />
            ) : (
              <Text variant="headerCard" color={!disabled && !isCredInfoDelinquentDisabled ? 'black' : 'primary500'}>
                {!isShowBalance
                  ? Helpers.formatCurrency(!disabled && !isCredInfoDelinquentDisabled
                    ? availableValue : 0, {
                    removeDecimalsWhenRounded: true,
                  })
                  : 'S/****'}
              </Text>
            )}
          </Box>

          <Box alignItems="flex-start">
            <Text variant="body12" color="primary500">
              {i18n.t('home-credit-info-label')}
            </Text>
            {isLoading ? (
              <CreditLineSkeleton isVisible />
            ) : (
              <Text variant="body12Semibold" color={!disabled && !isCredInfoDelinquentDisabled ? 'primary800' : 'primary500'}>
                {!isShowBalance
                  ? Helpers.formatCurrency(
                    !disabled && !isCredInfoDelinquentDisabled ? creditValue : 0,
                    {
                      removeDecimalsWhenRounded: true,
                    },
                  )
                  : 'S/****'}
              </Text>
            )}
          </Box>
        </>
      )}
    </>
  );
};

CreditInfo.defaultProps = {
  disabled: false,
};

export default CreditInfo;
