import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffCashbackModal, turnOnCashbackModal } from 'src/screens/Welcome/states/welcomeState';
import { RootState } from 'src/store/store';
import ModalSoonAnalytics from '../analytics/modalSoon.analytics';

const useModalSoon = () => {
  const cashbackSelector = (state: RootState) => state.welcome.isOpenCashbackModal;
  const isCashbackModalOpen = useSelector(cashbackSelector);

  const dispatch = useDispatch();
  const [soonModal, setSoonModal] = useState<string>('');
  const openCahbackModal = () => {
    ModalSoonAnalytics.onOpenCashback();
    dispatch(turnOnCashbackModal());
  };

  const closeSoonModal = () => {
    setSoonModal('');
    dispatch(turnOffCashbackModal());
  };

  return {
    soonModal,
    setSoonModal,
    closeSoonModal,
    isCashbackModalOpen,
    openCahbackModal,
  };
};

export default useModalSoon;
