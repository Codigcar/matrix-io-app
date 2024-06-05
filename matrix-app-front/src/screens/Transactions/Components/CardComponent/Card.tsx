import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, Theme } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  TransactionStatus,
} from 'src/api/types/TransactionTypes';
import { RFValue } from 'react-native-responsive-fontsize';
import { ColorProps } from '@shopify/restyle';
import {
  TransactionCompletedIcon,
  TransactionExtornIcon,
  TransactionFailedIcon,
} from 'assets/svgs';
import { POSITIVE, TRANSACTIONS_TYPES } from 'src/utils/constants';

type CardPropsType = {
  testID?: string;
  transactionType: string;
  transactionStatus: TransactionStatus;
  transactionMethod: string;
  description: string;
  amountTotalTransaction: string;
  paymentMaskedCard?: string;
  sign:string;
  onPress: () => void;
};

const Card: React.FC<CardPropsType> = ({
  testID,
  transactionType,
  transactionStatus,
  transactionMethod,
  description,
  amountTotalTransaction,
  onPress,
  paymentMaskedCard,
  sign
}) => {
  const isReturn = transactionType === 'ReturnTrans' || transactionType === 'EXTORNO';
  const isPayment = transactionType === 'DepositPayments';
  const isPurchase = !isReturn && !isPayment;
  const isPurchaseFailed = isPurchase && transactionStatus === 'RECHAZADA';
  const buyDetail = i18n.t('transactions.method-label', { method: transactionMethod });
  const paymentMaskedCardType = i18n.t('transactions.card-label', {card: paymentMaskedCard?.slice(-7)});

  const getTransactionInfo = () => {
    if(isPayment && paymentMaskedCard){
      return paymentMaskedCardType;
    }
    if(transactionType === ''){
      return '';
    }
    return buyDetail;
  }

  let amountTextColor: ColorProps<Theme>['color'] = sign === POSITIVE ? 'FeedbackSuccess700' : 'primaryDark';
  if (isPurchaseFailed) { 
    amountTextColor = 'FeedbackError600' 
  };

  const renderIcon = () => {
    if (isPurchaseFailed) {
      return <TransactionFailedIcon />;
    }
    if (isReturn || isPayment) {
      return <TransactionExtornIcon />;
    }
    return <TransactionCompletedIcon />;
  };

  const transactionInfo = getTransactionInfo();

  return (
    <Pressable testID={testID} onPress={onPress}>
      <Box
        flexDirection="row"
        backgroundColor="primary100"
        borderRadius={RFValue(16)}
        p="spacing-s"
        alignItems="center"
      >
        <Box
          backgroundColor="primary000"
          alignItems="center"
          justifyContent="center"
          width={48}
          height={48}
          borderRadius={12}
        >
          {renderIcon()}
        </Box>
        <Box
          flex={1}
          mx="spacing-s"
        >
          <Text
            numberOfLines={1}
            variant="body14Medium"
            color="primaryDark"
          >
            {description}
          </Text>
          <Text
            numberOfLines={1}
            variant="body14Regular"
            color="primary700"
          >
            {transactionInfo}
          </Text>
        </Box>
        <Box alignItems="center">
          {isPurchaseFailed ? (
            <Box
              px="spacing-xxxxs"
              py="spacing-xxxxxs"
              backgroundColor="primary000"
              borderRadius={30}
            >
              <Text
                numberOfLines={1}
                variant="labelCard"
                color="FeedbackError600"
              >
                {i18n.t('transactions.type-rejected')}
              </Text>
            </Box>
          ) : null}
          <Text
            numberOfLines={1}
            variant="bodySemibold"
            color={amountTextColor}
            my="spacing-xxxs"
          >
            {amountTotalTransaction}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

Card.defaultProps = {
  paymentMaskedCard: undefined,
};

export default Card;