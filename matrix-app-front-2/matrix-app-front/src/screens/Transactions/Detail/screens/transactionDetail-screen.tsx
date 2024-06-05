import React from 'react';
import {
  Container,
  Box,
  Text,
  Theme,
} from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
// Components
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
// utils
import { TransactionDetailProps } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
// Hooks
import Helpers from 'src/utils/Helpers';
import { s } from 'src/utils/sizes';
import { SvgProps } from 'react-native-svg';
import {
  Calendar,
  Clock,
  CardReceive,
  CardTick,
  MoneyForbidden,
} from 'assets/svgs';
import { POSITIVE } from 'src/utils/constants';
import useTransactionDetail from '../hooks/useTransactionDetail';
import RowDetail from '../Components/RowDetail';
import { ColorProps } from '@shopify/restyle';

const mapIcon:{
  [key:string]: React.FC<SvgProps>;
} = {
  transactionInProcess: MoneyForbidden,
  transactionFailed: MoneyForbidden,
  transactionCompleted: CardTick,
  transactionExtorn: CardReceive,
  transactionPayed: CardReceive,
};

const TransactionDetailScreen = (props: TransactionDetailProps) => {
  const { onPressBackArrow, transaction, formatDate } = useTransactionDetail(props);
  
  const isReturn = transaction.type === 'ReturnTrans';
  const isPurchase = !isReturn;
  const amountTextColor : ColorProps<Theme>['color'] = transaction.totalAmount?.sign === POSITIVE ? 'FeedbackSuccess700' : 'primaryDark';
  let iconName: string = 'smile';

  if (isPurchase) {
    switch (transaction.status) {
      case 'PROCESSED':
        iconName = 'transactionInProcess';
        break;
      case 'RECHAZADO':
        iconName = 'transactionFailed';
        break;
      default:
        iconName = 'transactionCompleted';
        break;
    }
  } else if (isReturn) {
    iconName = 'transactionExtorn';
  } else if (transaction.type === 'DepositPayments') {
    iconName = 'transactionPayed';
  }

  const transactionDetail = () => {
    const rows = [
      {
        label: i18n.t('transactions-detail.dateBuy-label'),
        value: formatDate(transaction.date),
        icon: Calendar,
      },
      {
        label: i18n.t('transactions-detail.hour-label'),
        value: Helpers.formatDefaultTime(transaction.time),
        icon: Clock,
      },
    ];
    return (
      <Box width="100%">
        {rows.map(({ label, value, icon }, index) => (
          <RowDetail
            key={label}
            label={label}
            value={value}
            icon={icon}
            hideBottomBorder={rows.length - 1 === index}
          />
        ))}
      </Box>
    );
  };

  const extornDetail = () => {
    const rows = [
      {
        label: i18n.t('transactions-detail.dateReturnProcess-label'),
        value: formatDate(transaction.date),
        icon: Calendar,
      },
      {
        label: i18n.t('transactions-detail.hourReturn-label'),
        value: Helpers.formatDefaultTime(transaction.time),
        icon: Clock,
      },
    ];
    return (
      <Box width="100%">
        {rows.map(({ label, value, icon }) => (
          <RowDetail
            key={label}
            label={label}
            value={value}
            icon={icon}
            hideBottomBorder={false}
          />
        ))}
      </Box>
    );
  };

  const StatusIcon = mapIcon[iconName];

  return (
    <BackgroundWrapper>
      <Container
        imageBackground="none"
        isHeaderVisible
        hasGradient={false}
        goBackNavigate={() => onPressBackArrow()}
        headerTitle={i18n.t('transactions-detail.title-movement')}
      >
        <Box marginTop="spacing-m" mx="spacing-m" flex={1}>
          <Box
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width={s(56)}
              height={s(56)}
              backgroundColor="primary100"
              borderRadius={s(78)}
              alignItems="center"
              justifyContent="center"
            >
              {StatusIcon
                ? <StatusIcon />
                : <MtxIcon width={s(24)} height={s(24)} name={iconName} size="medium" />}
            </Box>
            <Text
              mt="spacing-s"
              py="spacing-xxxs"
              variant="Heading18Medium"
              color="primary1000"
              textAlign="center"
              testID="acceptorNameAndLocation"
            >
              {transaction.acceptorNameAndLocation}
            </Text>
            <Text
              mt="spacing-xxs"
              variant="Subtitle24SemiBold"
              color={amountTextColor}
              textAlign="center"
              mb="spacing-l"
              testID="totalAmount"
            >
              {transaction.totalAmount?.formatted}
            </Text>
            {transactionDetail()}
          </Box>
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};

export default TransactionDetailScreen;