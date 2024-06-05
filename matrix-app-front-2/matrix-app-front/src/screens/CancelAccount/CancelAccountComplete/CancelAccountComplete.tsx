import React from 'react';
import {
  Text, Box, Button, Divider,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { ScrollView } from 'react-native';
import { rem } from 'src/utils/constants';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useCancelAccountComplete from './hooks/useCancelAccountComplete';
import DataListComplete from './components/DataListComplete';
import { string } from '../strings/string';

const CancelAccountComplete: React.FC<NavigationPropsType> = (props) => {
  const { onPressContinue, onPressChat, onPressPayment } = useCancelAccountComplete(props);
  const {
    route: { params },
  } = props;

  const {
    requestTime, requestDate, maskedCard, pendingPayment, pendingCreditBalance,
  } = params;

  return (
    <BackgroundWrapper>
      <Box flex={1} px="spacing-s" pt="spacing-m">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text textAlign="center" mt="spacing-xm" variant="Heading20Medium">
            {string.cancelAccountCompleteHeader}
          </Text>
          <Text
            marginHorizontal="spacing-m"
            padding="spacing-none"
            textAlign="center"
            mt="spacing-s"
          >
            <Text textAlign="center" variant="body" fontSize={16} lineHeight={19.2}>
              {string.cancelAccountCompleteTitle}
            </Text>
            <Text
              textAlign="center"
              variant="body"
              fontSize={16}
              fontWeight="bold"
              lineHeight={19.2}
            >
              {`${string.appName}.`}
            </Text>
          </Text>
          <Text
            marginHorizontal="spacing-m"
            marginBottom="spacing-m"
            textAlign="center"
            variant="body"
            fontSize={16}
            lineHeight={19.2}
          >
            {string.cancelAccountCompleteSubtitle}
          </Text>

          <DataListComplete
            requestTime={requestTime}
            maskedCard={maskedCard}
            requestDate={requestDate}
            pendingPayment={pendingPayment}
            pendingCreditBalance={pendingCreditBalance}
          />
          <Divider height={170 * rem} />
        </ScrollView>
        <Box
          position="absolute"
          backgroundColor="white"
          width="100%"
          bottom={0}
          alignSelf="center"
          p="spacing-none"
        >
          {!!pendingCreditBalance && !pendingPayment && (
            <Button
              variant="primary"
              onPress={onPressChat}
              label={string.cancelAccountCompleteChatButton}
            />
          )}
          {!!pendingPayment && (
            <Button
              variant="primary"
              onPress={onPressPayment}
              label={string.cancelAccontCompletePaymentButton}
            />
          )}
          <Button
            variant={!!pendingPayment || !!pendingCreditBalance ? 'secondary' : 'primary'}
            mt="spacing-xxs"
            mb="spacing-m"
            onPress={onPressContinue}
            label={string.cancelAccountCompleteContinueButton}
          />
        </Box>
      </Box>
    </BackgroundWrapper>
  );
};

export default CancelAccountComplete;
