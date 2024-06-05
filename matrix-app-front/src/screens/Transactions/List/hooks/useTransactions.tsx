import { useEffect, useState } from 'react';
import { MonthType, NavigationPropsType } from 'src/types/types';
import {
  PAYMENT_CODE,
  PHISYCAL_CODE,
  TRANSACTIONS_STATUS,
  VIRTUAL_CODE,
  VIRTUAL_TYPE_FILTER,
  PAYMENT_TYPE_FILTER,
  PHISYCAL_TYPE_FILTER,
} from 'src/utils/constants';
import { getTransactions } from 'src/api/TransactionServices';
import {
  TransactionFilterProps,
  TransactionFilterType,
  TransactionGroup,
  TransactionProps,
  TransactionsProps,
} from 'src/api/types/TransactionTypes';
import { logCrashlytics } from 'src/utils/Analytics';
import axios, { AxiosRequestConfig } from 'axios';
import { currentDate } from 'src/utils/date-time/date-time';
import { i18n } from 'src/utils/core/MTXStrings';
import { checkNumberOfFilters } from '../helper/checkFilters';

const PER_PAGE = 50;
const useTransactions = (props: NavigationPropsType) => {
  const TRANSACTION_FILTERS: TransactionFilterType[] = [
    {
      key: 'payment',
      isVisible: false,
      checked: false,
      label: i18n.t('transactions.types.payment'),
      values: ['DepositPayments', 'EXTORNO', 'ReturnTrans'],
      code: PAYMENT_CODE,
    },
    {
      key: 'virtual',
      isVisible: false,
      checked: false,
      label: i18n.t('transactions.types.virtual'),
      values: ['PurchaseTrans', 'WithdrawCash'],
      code: VIRTUAL_CODE,
    },
    {
      key: 'physical',
      isVisible: false,
      checked: false,
      label: i18n.t('transactions.types.physical'),
      values: ['PurchaseTrans'],
      code: PHISYCAL_CODE,
    },
  ];
  const { navigation } = props;
  const [transactionsFiltered, setTransactionsFiltered] = useState<TransactionGroup[]>([]);
  const [isOpenFilter, setIsFilterOpen] = useState<boolean>(false);
  const [hiddenFilter, setHiddenFilter] = useState<boolean>(true);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [inProgress, setInProgress] = useState<boolean>(true);
  const now = currentDate();
  const [currentMonth, setCurrentMonth] = useState<MonthType>({
    name: now.format('MMM'),
    startDate: now.startOf('month').format('YYYY-MM-DD'),
    endDate: now.endOf('month').format('YYYY-MM-DD'),
    isSelected: true,
  });
  const [filterTypes, setFilterTypes] = useState<TransactionFilterType[]>([]);
  const [filterValuesSelection, setFilterValuesSelection] = useState<TransactionFilterType[]>([]);
  const [executeFilter, setExecuteFilter] = useState<boolean>(false);
  const [totalFilters, setTotalFilters] = useState<number>(0);
  const virtualAndPayment = `${VIRTUAL_CODE}-${PAYMENT_CODE}`;
  const virtualAndPhisycal = `${VIRTUAL_CODE}-${PHISYCAL_CODE}`;
  const phisycalAndPayment = `${PHISYCAL_CODE}-${PAYMENT_CODE}`;

  const loadMoreData = () => {
    if (loading || reachedEnd) return;
    if (!reachedEnd) {
      setPage(page + 1);
    }
  };

  const onPressBackArrow = () => {
    clearData();
    navigation.goBack();
  };

  const goToDetail = (transaction: TransactionProps): void => {
    if (transaction.status === TRANSACTIONS_STATUS.failed) {
      return;
    }
    navigation.navigate('TransactionDetail', { transaction });
  };

  async function getFilteredTransactions(
    filter: TransactionFilterProps,
    operationCode: string,
    newfilterTypes?: TransactionFilterType[] | undefined,
    config?: AxiosRequestConfig,
  ) {
    setTransactionsFiltered([]);
    setHiddenFilter(true);
    const response: TransactionsProps = await getTransactions(filter, config, operationCode);
    const filteredResponse: TransactionGroup[] = response.data;
    setTransactionsFiltered(filteredResponse);
    setLoading(false);
    setInProgress(false);
    setTimeout(() => {
      setHiddenFilter(false);
    }, 350);
  }

  const initialData = () => {
    setTransactionsFiltered(transactionsFiltered);
  };

  const filterData = async (
    VIRTUAL_CODE: string,
    PAYMENT_CODE: string,
    PHISYCAL_CODE: string,
    newfilterTypes: TransactionFilterType[],
    config?: AxiosRequestConfig,
  ): Promise<void> => {
    const filterValues = newfilterTypes.filter((filterType) => filterType.checked);
    setFilterValuesSelection(filterValues);
    const paymentType = filterValues.some((filter) => filter.code === PAYMENT_CODE);
    const virtualType = filterValues.some((filter) => filter.code === VIRTUAL_CODE);
    const physicalType = filterValues.some((filter) => filter.code === PHISYCAL_CODE);

    const filterType: number = checkNumberOfFilters(filterValues);

    let adjustedPage = page;

    if (adjustedPage != 0) {
      adjustedPage = 0;
    }

    const filterConfig: TransactionFilterProps = {
      ...currentMonth,
      limit: PER_PAGE,
      skip: adjustedPage * PER_PAGE,
    };

    if (transactionsFiltered.length === 0) {
      return;
    }

    if (filterType === 1 && paymentType) {
      setLoading(true);
      setInProgress(true);
      await getFilteredTransactions(filterConfig,PAYMENT_CODE);
      return;
    }

    if (filterType === 1 && virtualType) {
      setLoading(true);
      setInProgress(true);
      await getFilteredTransactions(filterConfig,VIRTUAL_CODE,newfilterTypes);
      return;
    }

    if (filterType === 1 && physicalType) {
      setLoading(true);
      setInProgress(true);
      await getFilteredTransactions(filterConfig,PHISYCAL_CODE);
      return;
    }

    if (filterType === 2 && virtualType && paymentType) {
      setLoading(true);
      setInProgress(true);
      await getFilteredTransactions(filterConfig,virtualAndPayment);
      return;
    }

    if (filterType === 2 && virtualType && physicalType) {
      setLoading(true);
      setInProgress(true);
      await getFilteredTransactions(filterConfig,virtualAndPhisycal);
      return;
    }

    if (filterType === 2 && physicalType && paymentType) {
      setLoading(true);
      setInProgress(true);
      await getFilteredTransactions(filterConfig,phisycalAndPayment);
      return;
    }

    if (filterType === 3 && virtualType && paymentType && physicalType) {
      setLoading(true);
      setInProgress(true);
      const allFiltersCode = `${VIRTUAL_CODE}-${PHISYCAL_CODE}-${PAYMENT_CODE}`;
      await getFilteredTransactions(filterConfig,allFiltersCode);
      return;
    }
  };

  const setFilters = async (filter: TransactionFilterType): Promise<void> => {
    if (loading && inProgress) {
      return;
    }
    setInProgress(true);
    const newList = filterTypes.map((filterType) => {
      if (filterType.code === filter.code) {
        const updatedItem = {
          ...filterType,
          checked: !filterType.checked,
        };
        return updatedItem;
      }
      return filterType;
    });
    setFilterTypes(newList);
    setPage(0);
    await checked(newList);
  };

  const checked = async (newList: TransactionFilterType[]) => {
    const isChecked = newList.some((item) => item.checked);
    if (isChecked) {
      setPage(0);
      await filterData(VIRTUAL_CODE, PAYMENT_CODE, PHISYCAL_CODE, newList);
    } else {
      await clearData();
    }
    setExecuteFilter(isChecked);
  };

  const clearData = async (): Promise<void> => {
    setPage(0);
    setTransactionsFiltered([]);
    setFilterValuesSelection([]);
    setExecuteFilter(false);
    setInProgress(false);
    setLoading(true);
  };

  const updateFilters = (
    transactions: TransactionGroup[],
    VIRTUAL_TYPE_FILTER: string,
    PAYMENT_TYPE_FILTER: string,
    PHISYCAL_TYPE_FILTER: string,
  ) => {
    const resultArray = [];

    transactions.forEach((entry) => {
      const typeSet = new Set();
      const operationAccountTypeSet = new Set();

      entry.items.forEach((item) => {
        typeSet.add(item.type);
        operationAccountTypeSet.add(item.operationAccountType);

        if (item.type === 'DepositPayments' && item.operationAccountType === 'virtual') {
          resultArray.push(PAYMENT_TYPE_FILTER);
        }

        if (
          (item.type === 'PurchaseTrans' || item.type === 'WithdrawCash') &&
          item.operationAccountType === 'virtual'
        ) {
          resultArray.push(VIRTUAL_TYPE_FILTER);
        }
      });

      if (operationAccountTypeSet.has('standard')) {
        resultArray.push(PHISYCAL_TYPE_FILTER);
      }
    });

    actionsFilter(resultArray);
    return resultArray;
  };

  const actionsFilter = (resultArray: string[]) => {
    const updatedFilters = [...TRANSACTION_FILTERS];

    if (resultArray.length >= 2) {
      if (resultArray.includes(VIRTUAL_TYPE_FILTER)) {
        const virtualFilterIndex = updatedFilters.findIndex(
          (filter) => filter.code === VIRTUAL_CODE,
        );
        if (virtualFilterIndex !== -1) {
          updatedFilters[virtualFilterIndex].isVisible = true;
        }
      }
      if (resultArray.includes(PAYMENT_TYPE_FILTER)) {
        const paymentFilterIndex = updatedFilters.findIndex(
          (filter) => filter.code === PAYMENT_CODE,
        );
        if (paymentFilterIndex !== -1) {
          updatedFilters[paymentFilterIndex].isVisible = true;
        }
      }
      if (resultArray.includes(PHISYCAL_TYPE_FILTER)) {
        const phisycalFilterIndex = updatedFilters.findIndex(
          (filter) => filter.code === PHISYCAL_CODE,
        );
        if (phisycalFilterIndex !== -1) {
          updatedFilters[phisycalFilterIndex].isVisible = true;
        }
      }
      setHiddenFilter(false);
    }
    const uniqueElement = resultArray => resultArray.length > 0 && resultArray.every(item => item === resultArray[0]) ? [resultArray[0]] : resultArray;
    const arrayValidation = uniqueElement(resultArray);
    setTotalFilters(arrayValidation.length);
    setFilterTypes(updatedFilters);
  };

  const avoidDuplicateItems = (filteredData: any[]) => {
    const itemIds = new Set<string>();

    return filteredData
      .map((entry) => ({
        ...entry,
        items: entry.items.filter((item: { id: string }) => {
          if (!itemIds.has(item.id)) {
            itemIds.add(item.id);
            return true;
          }
          return false;
        }),
      }))
      .filter((entry) => entry.items.length > 0);
  };

  const processResponseData = (response: TransactionsProps, transactions: TransactionGroup[]) => {
    if (response.data && Array.isArray(response.data)) {
      const { totalCount } = response.page;
      const allTransactionData = [...transactions, ...response.data];
      const groupedData: Record<string, { date: string; items: any[] }> = {};

      allTransactionData.forEach((item) => {
        if (groupedData[item.date]) {
          groupedData[item.date].items.push(...item.items);
        } else {
          groupedData[item.date] = { ...item, items: [...item.items] };
        }
      });

      const unifiedData = Object.values(groupedData);
      const newAllData = avoidDuplicateItems(unifiedData);
      setTransactionsFiltered(newAllData);

      if (totalCount === 0) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
      updateFilters(
        allTransactionData,
        VIRTUAL_TYPE_FILTER,
        PAYMENT_TYPE_FILTER,
        PHISYCAL_TYPE_FILTER,
      );
    }
  };

  const processResponseFilteredData = (
    response: TransactionsProps,
    transactions: TransactionGroup[],
    isReload?: boolean,
  ) => {
    if (response.data && Array.isArray(response.data)) {
      const { totalCount } = response.page;
      const allTransactionData = [...transactions, ...response.data];
      const groupedData: Record<string, { date: string; items: any[] }> = {};

      allTransactionData.forEach((item) => {
        if (groupedData[item.date]) {
          groupedData[item.date].items.push(...item.items);
        } else {
          groupedData[item.date] = { ...item, items: [...item.items] };
        }
      });

      const unifiedData = Object.values(groupedData);
      const newData = avoidDuplicateItems(unifiedData);
      if (isReload) {
        setTransactionsFiltered(newData);
        if (totalCount === 0) {
          setReachedEnd(true);
        } else {
          setReachedEnd(false);
        }
        return;
      }
      updateFilters(
        allTransactionData,
        VIRTUAL_TYPE_FILTER,
        PAYMENT_TYPE_FILTER,
        PHISYCAL_TYPE_FILTER,
      );
    }
  };

  const getResults = async (config?: AxiosRequestConfig) => {
    const filterConfig: TransactionFilterProps = {
      ...currentMonth,
      limit: PER_PAGE,
      skip: page * PER_PAGE,
    };
    setLoading(true);
    setInProgress(true);
    try {
      const getAll: string = '';
      const identityCodeZero = filterValuesSelection[0]?.code;
      const identityCodeOne = filterValuesSelection[1]?.code;
      const activeFilters: number = checkNumberOfFilters(filterValuesSelection);

      if (filterValuesSelection.length === 0) {
        const response = await getTransactions(filterConfig, config, getAll);
        processResponseData(response, transactionsFiltered);
      }

      if (activeFilters === 1 && identityCodeZero === VIRTUAL_CODE) {
        const response = await getTransactions(filterConfig, config, VIRTUAL_CODE);
        processResponseFilteredData(response, transactionsFiltered, true);
      }

      if (activeFilters === 1 && identityCodeZero === PHISYCAL_CODE) {
        const response = await getTransactions(filterConfig, config, PHISYCAL_CODE);
        processResponseFilteredData(response, transactionsFiltered, true);
      }

      if (activeFilters === 1 && identityCodeZero === PAYMENT_CODE) {
        const response = await getTransactions(filterConfig, config, PAYMENT_CODE);
        processResponseFilteredData(response, transactionsFiltered, true);
      }

      if (
        activeFilters === 2 &&
        identityCodeZero === PAYMENT_CODE &&
        identityCodeOne === VIRTUAL_CODE
      ) {
        const response = await getTransactions(filterConfig, config, virtualAndPayment);
        processResponseFilteredData(response, transactionsFiltered, true);
      }

      if (
        activeFilters === 2 &&
        identityCodeZero === VIRTUAL_CODE &&
        identityCodeOne === PHISYCAL_CODE
      ) {
        const response = await getTransactions(filterConfig, config, virtualAndPhisycal);
        processResponseFilteredData(response, transactionsFiltered, true);
      }

      if (
        activeFilters === 2 &&
        identityCodeZero === PAYMENT_CODE &&
        identityCodeOne === PHISYCAL_CODE
      ) {
        const response = await getTransactions(filterConfig, config, phisycalAndPayment);
        processResponseFilteredData(response, transactionsFiltered, true);
      }

      setIsFirstRender(false);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setIsFirstRender(false);
        logCrashlytics({
          scope: 'API',
          fileName: 'src/screens/Transactions/List/hooks/useTransactions.tsx',
          service: 'Transactions.getTransactions',
          error,
        });
      }
    } finally {
      setLoading(false);
      setInProgress(false);
    }
  };

  const selectMonth = async (month: MonthType) => {
    setTotalFilters(0);
    setFilterTypes(TRANSACTION_FILTERS);
    setHiddenFilter(true);
    setTransactionsFiltered([]);
    setPage(0);
    setReachedEnd(false);
    setCurrentMonth(month);
    setFilterValuesSelection([]);
  };

  useEffect(() => {
    if (currentMonth || filterValuesSelection.length === 0) {
      getResults();
    }
  }, [currentMonth, page]);

  useEffect(() => {
    if (currentMonth || filterValuesSelection.length === 0) {
      initialData();
    }
  }, [filterValuesSelection, transactionsFiltered]);

  useEffect(() => {
    if (executeFilter) {
      setPage(0);
    } else {
      getResults();
    }
  }, [executeFilter]);

  return {
    selectMonth,
    onPressBackArrow,
    goToDetail,
    setIsFilterOpen,
    setFilters,
    transactionsFiltered,
    isOpenFilter,
    hiddenFilter,
    loadMoreData,
    reachedEnd,
    loading,
    inProgress,
    filterTypes,
    isFirstRender,
    totalFilters,
  };
};

export default useTransactions;
