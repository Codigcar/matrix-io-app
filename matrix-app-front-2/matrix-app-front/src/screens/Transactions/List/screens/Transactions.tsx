import React, { useMemo, useRef } from 'react';
import { FlatList, Pressable } from 'react-native';
import {
  Box,
  Container,
  Divider,
  SafeAreaBox,
  Text,
  rebrandingTheme,
} from 'src/matrix-ui-components';
import { Popover } from 'native-base';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  AccountStatus,
  CloseFilterIcon,
  FilterIcon,
  PopoverArrowIcon,
  ReachedEnd,
} from 'assets/svgs';
import { ThemeProvider } from '@shopify/restyle';
import { TransactionProps } from 'src/api/types/TransactionTypes';
import { ios } from 'src/utils/constants';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import useRequestListMovementDates from 'src/screens/AccountStatus/hooks/useRequestListMovementDates';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import Smile from 'assets/icons/svgs/smile';
import useTransactions from '../hooks/useTransactions';
import Card from '../../Components/CardComponent/Card';
import Chip from '../../Components/Chip/Chip';
import styles from '../styles/popoverStyles';
import CheckBox from '../../Components/Checkbox/Checkbox';
import { MonthFilterButtons } from '../../Components/MonthFilter/MonthFilterButtons';
import { SpinnerGray } from 'src/components/Spinner/SpinnerGray';
import AccountStatusSkeleton from '../../Components/skeleton/AccountStatusSkeleton';
import MonthFilterSkeleton from '../../Components/skeleton/MonthFilterSkeleton';
import TransactionsListSkeleton from '../../Components/skeleton/TransactionsListSkeleton';
import { dateParse, formatDate } from 'src/utils/date-time/date-time';
import { SectionList } from 'react-native';

const DATE_FORMAT_LOCALE = 'DD MMM YYYY';
export const TransactionsScreen = (props: NavigationPropsType) => {
  const { navigation } = props;
  const {
    selectMonth,
    transactionsFiltered,
    onPressBackArrow,
    goToDetail,
    isOpenFilter,
    setIsFilterOpen,
    setFilters,
    hiddenFilter,
    reachedEnd,
    loadMoreData,
    loading,
    inProgress,
    filterTypes,
    isFirstRender,
    totalFilters,
  } = useTransactions(props);
  const { listMovements } = useRequestListMovementDates();
  const sectionListRef = useRef<SectionList<TransactionGroup> | null>(null);

  const handleHistoryPress = () => {
    if (listMovements.length) {
      navigation.navigate(navigationScreenNames.listAccountStatements, listMovements);
    } else {
      showToast({
        type: ToastType.Info,
        title: i18n.t('accountStatements.without-prior-account-statements'),
      });
    }
  };

  const scrollToTop = () => {
    if (sectionListRef.current && transactionsFiltered?.length > 0) {
      sectionListRef.current.scrollToLocation({ sectionIndex: 0, itemIndex: 0 });
    }
  };

  
  const renderActiveFilters = () => (
    <Box>
      <FlatList
        testID='active-filters-transactions'
        data={filterTypes.filter((item) => item.checked)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: RFValue(24) }}
        renderItem={({ item }) => (
          <Box my="spacing-s">
            <Chip
              label={item.label}
              onClose={() => {
                if (loading || inProgress) {
                  return;
                }
                setFilters(item);
                scrollToTop();
              }}
            />
          </Box>
        )}
        ItemSeparatorComponent={() => <Divider width={8} />}
        ListEmptyComponent={() => <Divider height={RFValue(24)} />}
        keyExtractor={(item) => `${item.key}${item.label}`}
      />
    </Box>
  );

  const renderPopover = ({ scrollToTop }) => (
    <Box mx="spacing-m">
      <Popover
        crossOffset={200}
        placement="top right"
        offset={ios ? 35 : 12}
        onOpen={() => setIsFilterOpen(true)}
        onClose={() => setIsFilterOpen(false)}
        isOpen={isOpenFilter}
        trigger={(triggerProps) => (
          <Box
            position="absolute"
            bottom={40}
            right={0}
            width={56}
            height={56}
            borderRadius={32}
            justifyContent="center"
            alignItems="center"
            backgroundColor="primaryDark"
          >
            <Pressable {...triggerProps}>
              {!isOpenFilter ? <FilterIcon /> : <CloseFilterIcon />}
            </Pressable>
          </Box>
        )}
      >
        {!hiddenFilter && (
          <Popover.Content accessibilityLabel="Filter" style={styles.filterContainer}>
            <Popover.Body style={styles.filterBody}>
              <ThemeProvider theme={rebrandingTheme}>
                <Text variant="Subtitle20Medium" color="white" mb="spacing-s">
                  {i18n.t('transactions.filter-label')}
                </Text>
                {filterTypes
                  .filter((filter) => filter.isVisible)
                  .map((filter, index) => (
                    <Box
                      key={`${filter.key}${filter.label}`}
                      mt={index > 0 ? 'spacing-xxs' : 'spacing-none'}
                    >
                      <CheckBox
                        onPress={() => {
                          setFilters(filter);
                          scrollToTop();
                        }}
                        isCheck={filter.checked}
                        label={filter.label}
                      />
                    </Box>
                  ))}
              </ThemeProvider>
            </Popover.Body>
            <Box position="absolute" bottom={-16} right={RFValue(15)}>
              <PopoverArrowIcon />
            </Box>
          </Popover.Content>
        )}
      </Popover>
    </Box>
  );

  const renderFooter = () => {
    if (reachedEnd && transactionsFiltered.length) {
      return (
        <Box alignItems={'center'} marginVertical={'spacing-s'}>
          <ReachedEnd />
          <Text mt={'spacing-s'} color={'primary700'} variant={'body14Regular'}>
            {i18n.t('transactions.reached-end-message')}
          </Text>
        </Box>
      );
    }
    if (reachedEnd) {
      return <Box alignItems={'center'} marginVertical={'spacing-s'}></Box>;
    }

    if (loading && transactionsFiltered?.length > 0) {
      return (
        <Box alignItems={'center'} marginVertical={'spacing-s'}>
          <SpinnerGray />
        </Box>
      );
    }
    return <Divider height={50} />;
  };

  const actions = () => {
    return (
      <Pressable onPress={handleHistoryPress}>
        {loading && isFirstRender ? <AccountStatusSkeleton isVisible /> : <AccountStatus />}
      </Pressable>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <Box flex={1}>
          <TransactionsListSkeleton isVisible />
        </Box>
      );
    }
    if (!loading && reachedEnd && transactionsFiltered?.length === 0) {
      return (
        <Box
          backgroundColor="primary100"
          borderRadius={16}
          alignItems="center"
          p="spacing-xxm"
          mt="spacing-m"
        >
          <Box backgroundColor="white" p="spacing-xs" borderRadius={RFValue(48)}>
            <Smile width={RFValue(24)} height={RFValue(24)} />
          </Box>
          <Text mt="spacing-s" variant="Subtitle16Semibold" textAlign="center">
            {i18n.t('transactions.label-empty')}
          </Text>
        </Box>
      );
    }
  };

  const renderCard = useMemo(
    () =>
      ({ item }) =>
        (
            <Card
              testID='transactions-card'
              transactionType={item.type}
              transactionStatus={item.status}
              transactionMethod={verifyTransactionMethod(item)}
              description={item.acceptorNameAndLocation}
              amountTotalTransaction={item.totalAmount?.formatted}
              sign={item.totalAmount?.sign}
              paymentMaskedCard={'***' + item.alias}
              onPress={() => goToDetail(item)}
            />
        ),
    [],
  );

  const renderSectionHeader = useMemo(
    () =>
      ({ section: { date } }) =>
        (
          <Box paddingVertical={'spacing-xxs'} backgroundColor={'white'}>
            <Text variant="body14Regular" color="primary500">
              {formatDate(dateParse(date), DATE_FORMAT_LOCALE)}
            </Text>
          </Box>
        ),
    [],
  );

  const sections =
    transactionsFiltered.map((transacton) => ({
      data: transacton.items,
      date: transacton.date,
    })) || [];

  return (
    <BackgroundWrapper>
      <Container
        headerTitle={i18n.t('transactions.title')}
        goBackNavigate={() => onPressBackArrow()}
        hasGradient={false}
        imageBackground="none"
        isHeaderVisible
        actions={actions}
      >
        <SafeAreaBox flex={1}>
          <Box mt="spacing-s">
            {loading && isFirstRender ? (
              <MonthFilterSkeleton isVisible />
            ) : (
              <MonthFilterButtons maxMonths={4} onSelect={(month) => selectMonth(month)} progress={inProgress}/>
            )}
          </Box>
          {renderActiveFilters()}
          <Box flex={1}>
            <SectionList
              testID='transaction-list'
              ref={sectionListRef}
              stickySectionHeadersEnabled={false}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              sections={sections}
              contentContainerStyle={{ paddingHorizontal: RFValue(24) }}
              ItemSeparatorComponent={() => <Divider height={RFValue(8)} />}
              ListFooterComponent={renderFooter}
              renderItem={renderCard}
              renderSectionHeader={renderSectionHeader}
              ListEmptyComponent={renderEmpty()}
              keyExtractor={(item, index) => Number(index).toString() + '_' + item.date}
            />
          </Box>
          {totalFilters >= 2 && renderPopover({ scrollToTop })}
        </SafeAreaBox>
      </Container>
    </BackgroundWrapper>
  );
};
export const verifyTransactionMethod = (trs: TransactionProps): string => {
  if (trs.operationAccountType === 'virtual') {
    return i18n.t('transactions.purchase-virtual');
  }

  if (trs.operationAccountType === 'standard') {
    return i18n.t('transactions.purchase-face-to-face');
  }
  return '';
};
export default TransactionsScreen;