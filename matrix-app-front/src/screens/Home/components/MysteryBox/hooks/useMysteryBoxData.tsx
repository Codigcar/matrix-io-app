import HomeServices from 'src/api/HomeServices';
import { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGiftStatus,
  checkEmptyGift,
  resetEmptyGift,
} from 'src/screens/Welcome/states/welcomeState';
import { parsedGift } from 'src/types/types';
import { logCrashlytics } from 'src/utils/Analytics';
import { TIME_TO_SHOW_MYSTERY_BOX } from 'src/utils/constants';
import { ModalContext } from 'src/shared/contexts';
import { transformData } from '../utils';

const giftHasBeenSeenSelector = (state: any) => state.welcome.giftHasBeenSeen;

const useMysteryBoxData = () => {
  const [viewGift, setViewGift] = useState<parsedGift | null>(null);
  const gifHasBeen = useSelector(giftHasBeenSeenSelector);
  const { mysteryBoxModal, updateMysteryBoxModal } = useContext(ModalContext);
  const showMysteryBox = mysteryBoxModal;

  const dispatch = useDispatch();

  const getMysteryGift = async () => {
    try {
      const { data } = await HomeServices.getMysteryGift();
      const gift = transformData(data || null) ?? null;
      if (!gift) {
        dispatch(checkEmptyGift());
        const containWordViewed = JSON.stringify(data).indexOf('viewed');
        if (containWordViewed > -1) dispatch(setGiftStatus());
      } else {
        dispatch(resetEmptyGift());
      }
      setViewGift(gift);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'MysteryBox/hooks/useMysteryBoxData.tsx',
        service: 'getMysteryGift',
        error,
      });
    }
  };

  useEffect(() => {
    if (!gifHasBeen) {
      setTimeout(() => {
        getMysteryGift();
      }, TIME_TO_SHOW_MYSTERY_BOX);
    }
  }, []);

  useEffect(() => {
    if (viewGift) {
      updateMysteryBoxModal(true);
    }
  }, [viewGift]);

  const closeMysteryBox = useCallback(() => {
    updateMysteryBoxModal(false);
  }, []);

  return {
    gift: viewGift,
    showMysteryBox,
    closeMysteryBox,
  };
};

export default useMysteryBoxData;
