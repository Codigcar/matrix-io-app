import React, { useEffect } from 'react';
import {
  Box, Text, SafeAreaBox, fonts,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import CancelCard from 'assets/svgs/cancel-card.svg';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { TIME_AWAIT_CANCEL_ACCOUNT } from 'src/utils/constants';
import useCancelAccountWaiting from './hooks/useCancelAccountWaiting';
import { string } from '../shared/strings/string';

const CancelAccoiuntWaiting = (props: NavigationPropsType) => {
  const { onCancelAccount } = useCancelAccountWaiting(props);

  useEffect(() => {
    setTimeout(() => {
      onCancelAccount();
    }, TIME_AWAIT_CANCEL_ACCOUNT);
  }, []);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" mb="spacing-l" justifyContent="space-between">
        <Box flex={1} maxWidth="95%" alignSelf="center" alignItems="center" justifyContent="center">
          <CancelCard />
          <Text
            variant="Heading"
            textAlign="center"
            mt="spacing-xl"
            mb="spacing-s"
            numberOfLines={1}
          >
            {string.cancelAccountWaitingWaitingTitle}
          </Text>
          <Text textAlign="center" variant="label">
            <Text variant="SubTitle16" textAlign="center">
              {string.cancelAccountWaitingWaitingSubtitle1}
            </Text>
            <Text
              textAlign="justify"
              mt="spacing-s"
              variant="label"
              fontFamily={fonts.euclidCircularRegular}
              fontSize={16}
              fontWeight="bold"
              lineHeight={22}
            >
              {i18n.t('app-name')}
            </Text>
            <Text variant="SubTitle16" textAlign="center">
              {string.cancelAccountWaitingWaitingSubtitle2}
            </Text>
          </Text>
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default CancelAccoiuntWaiting;
