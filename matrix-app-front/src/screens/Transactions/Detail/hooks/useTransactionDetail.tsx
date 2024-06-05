import moment from 'moment';
import { NavigationPropsType } from 'src/types/types';
import { DATE_DETAIL_FORMAT, RETURN_DATE_DETAIL_FORMAT } from 'src/utils/constants';

const useTransactionDetail = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;

  const onPressBackArrow = () => navigation.goBack();

  const { transaction } = params;

  const formatDate = (date: string): string => moment(date)
    .format(DATE_DETAIL_FORMAT)
    .split('')
    .map((word, index) => (index === 0 ? word.toUpperCase() : word))
    .filter((element) => element !== '.')
    .join('');

  const formatReturnDate = (date: string): string => moment(date)
    .format(RETURN_DATE_DETAIL_FORMAT)
    .split('')
    .map((word, index) => (index === 0 ? word.toUpperCase() : word))
    .filter((element) => element !== '.')
    .join('');

  return {
    onPressBackArrow,
    transaction,
    formatDate,
    formatReturnDate,
  };
};

export default useTransactionDetail;
