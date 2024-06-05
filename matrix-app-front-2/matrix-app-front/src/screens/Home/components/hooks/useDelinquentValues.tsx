import {
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import CardCollectionsServices from 'src/api/CardCollections';
import { logCrashlytics } from 'src/utils/Analytics';
import { DelinquentContext } from 'src/store/states/delinquentContext';
import DelinquentEnum from 'src/shared/enums/delinquent.enum';

type toastAlert = {
  title: string,
  detail: string,
  type: string,
}

export default function useDeliquentValues() {
  const { sections, updateDelinquentSection } = useContext(DelinquentContext);
  const [isToastShowed, setIsToastShowed] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string | null>(null);
  const [isCredInfoDelinquentDisabled, setIsCredInfoDelinquentDisabled] = useState<boolean>(false);
  const [isCardDelinquentDisabled, setIsCardDelinquentDisabled] = useState<boolean>(false);
  const [isCardDelinquentIdle, setIsCardDelinquentIdle] = useState<boolean>(false);
  const [paymentDelinquentText, setPaymentDelinquentText] = useState<string|null>(null);
  const [paymentDelinquentColor, setPaymentDelinquentColor] = useState<string|null>(null);
  const [isDelinquentPaymentDisabled, setIsDelinquentPaymentDisabled] = useState<boolean>(false);
  const [isDelinquentNotification, setIsDelinquentNotification] = useState<boolean>(false);
  const [isCashbackDelinquentDisabled, setIsCashbackDelinquentDisabled] = useState<boolean>(false);
  const [isConfigDelinquentDisabled, setIsConfigDelinquentDisabled] = useState<boolean>(false);

  const getDelinquency = useCallback(async (): Promise<void> => {
    try {
      const response = await CardCollectionsServices.getCardCollections();
      updateDelinquentSection(response?.delinquency?.code, response?.alert);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Home/components/hooks/useDelinquentValues.tsx',
        service: 'getDelinquency',
        error,
      });
      throw error;
    }
  }, []);

  const getDelinquentByCode = (code:string) => sections.find((item) => item.code === code);

  const getCreditInfoDelinquency = () => {
    try {
      const creditInfoDelinquent = getDelinquentByCode(DelinquentEnum.CREDIT_INFO_CODE);
      if (creditInfoDelinquent?.status === DelinquentEnum.DISABLED) {
        setIsCredInfoDelinquentDisabled(true);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Home/components/hooks/useDelinquentValues.tsx',
        service: 'getCreditInfoDelinquency',
        error,
      });
    }
  };

  const getPaymentsDelinquency = () => {
    try {
      const paymentDelinquent = getDelinquentByCode(DelinquentEnum.ACCOUNT_STATUS_CODE);
      if (paymentDelinquent) {
        setIsDelinquentNotification(paymentDelinquent?.notification);
        setIsDelinquentPaymentDisabled(paymentDelinquent?.status === DelinquentEnum.DISABLED);
        setPaymentDelinquentText(paymentDelinquent?.text);
        setPaymentDelinquentColor(paymentDelinquent?.color);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Home/components/hooks/useDelinquentValues.tsx',
        service: 'getPaymentsDelinquency',
        error,
      });
    }
  };

  const getCreditCardDelinquency = () => {
    try {
      const cardDelinquent = getDelinquentByCode(DelinquentEnum.CREDIT_CARD_CODE);
      if (cardDelinquent?.status === DelinquentEnum.DISABLED) {
        setIsCardDelinquentDisabled(true);
      }
      if (cardDelinquent?.color === DelinquentEnum.IDLE_COLOR) {
        setIsCardDelinquentIdle(true);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Home/components/hooks/useDelinquentValues.tsx',
        service: 'getCreditCardDelinquency',
        error,
      });
    }
  };

  const getCashbackDelinquency = () => {
    try {
      const cashbackDelinquent = getDelinquentByCode(DelinquentEnum.CASHBACK_CODE);
      if (cashbackDelinquent?.status === DelinquentEnum.DISABLED) {
        setIsCashbackDelinquentDisabled(true);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Home/components/hooks/useDelinquentValues.tsx',
        service: 'getCashbackDelinquency',
        error,
      });
    }
  };

  const getCardConfigDelinquency = () => {
    try {
      const cardConfigDelinquent = getDelinquentByCode(DelinquentEnum.CARD_CONFIG_CODE);
      if (cardConfigDelinquent?.status === DelinquentEnum.DISABLED) {
        setIsConfigDelinquentDisabled(true);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Home/components/hooks/useDelinquentValues.tsx',
        service: 'getCardConfigDelinquency',
        error,
      });
    }
  };

  useEffect(() => {
    let type;
    switch (toastType) {
      case 'ALERT-WARNING':
        type = ToastType.TypeWarning;
        break;
      case 'ALERT-DANGER':
        type = ToastType.TypeDanger;
        break;
      case 'ALERT-DARK':
        type = ToastType.TypeBlack;
        break;
      default:
        type = ToastType.TypeWarning;
        break;
    }
    if (isToastShowed && toastType) {
      showToast({
        type,
        title,
        message,
        visibilityTime: 6000,
      });
    }
  }, [isToastShowed, toastType, message, title]);

  useEffect(() => {
    getCreditInfoDelinquency();
    getCreditCardDelinquency();
    getPaymentsDelinquency();
    getCashbackDelinquency();
    getCardConfigDelinquency();
  }, [sections]);

  const setToastMessage = (toastAlert: toastAlert) => {
    if (toastAlert) {
      setTitle(toastAlert.title);
      setMessage(toastAlert.detail);
      setToastType(toastAlert.type);
      setIsToastShowed(true);
    }
  };

  return {
    getDelinquency,
    isCredInfoDelinquentDisabled,
    isCardDelinquentDisabled,
    isCardDelinquentIdle,
    isDelinquentNotification,
    isDelinquentPaymentDisabled,
    paymentDelinquentColor,
    paymentDelinquentText,
    isCashbackDelinquentDisabled,
    isConfigDelinquentDisabled,
    delinquentSections: sections,
    setToastMessage,
  };
}
