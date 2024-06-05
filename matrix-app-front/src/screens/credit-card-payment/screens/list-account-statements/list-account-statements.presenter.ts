import { useState } from 'react';

import useCardDocuments from 'src/screens/CardOffer/CardDocuments/hooks/useCardDocuments';
import { i18n } from 'src/utils/core/MTXStrings';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';

import { PeriodDates } from '../../shared/types/account-status.type';
import { useListAccountInteractor } from './list-account-statements.interactor';

export const useListAccountStatementsPresenter = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onPressViewDocument } = useCardDocuments();
  const { executeGetAccountStatementByDate } = useListAccountInteractor();

  const viewPDF = async (date: PeriodDates) => {
    const titleLowerCase = date.title.toLocaleLowerCase();
    setIsLoading(true);
    try {
      const getAccountStatement = await executeGetAccountStatementByDate({
        dateId: date.id,
        isEncrypted: false,
      });

      onPressViewDocument({
        title: `${i18n.t('accountStatements.title-pdf')} ${titleLowerCase}`,
        url: getAccountStatement.url,
        showShareIcon: true,
        actionShareIcon: () =>
          executeGetAccountStatementByDate({
            dateId: date.id,
            isEncrypted: true,
          }),
      });
    } catch (error) {
      showToast({
        type: ToastType.Error,
        title: i18n.t('accountStatements.error-load-list-history-movements'),
      });
    }
    setIsLoading(false);
  };

  return {
    viewPDF,
    isLoading,
  };
};
