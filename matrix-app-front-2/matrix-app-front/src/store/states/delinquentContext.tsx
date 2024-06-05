import React, { createContext, useMemo, useState } from 'react';
import Dictionary from '../../config/delinquent-look-and-feel.json';

interface DelinquentSectionData {
    code: string;
    notification: boolean;
    text: string | null;
    color: string | null;
    itemsReduced: boolean;
    status: string;
}
interface DelinquentAlertData {
  title: string;
  detail: string;
  type: string;
}
interface DelinquentContextData {
  code: string;
  sections: DelinquentSectionData[];
  alert: DelinquentAlertData;
  updateDelinquentSection: (codeValue: string, alertValue: DelinquentAlertData) => void;
}

const DelinquentContext = createContext<DelinquentContextData>({
  code: '',
  sections: [],
  alert: {
    title: '',
    detail: '',
    type: '',
  },
  updateDelinquentSection: () => { },
});

const DelinquentProvider = ({ children }: any) => {
  const [code, setCode] = useState('');
  const [alert, setAlert] = useState({ title: '', detail: '', type: '' });
  const [sections, setSections] = useState<DelinquentSectionData[]>([]);

  const findByCode = (codeValue: string) => {
    const item = Dictionary.find((obj) => obj.code === codeValue);
    return item ? item.sections : [];
  };

  const updateDelinquentSection = (codeValue: string, alertValue: DelinquentAlertData) => {
    setCode(codeValue);
    setAlert(alertValue);
    const dictonionarySections = findByCode(codeValue);
    setSections(dictonionarySections);
  };

  const contextValue = useMemo(
    () => ({
      code,
      alert,
      sections,
      updateDelinquentSection,
    }),
    [code, sections, alert],
  );

  return (
    <DelinquentContext.Provider value={contextValue}>
      {children}
    </DelinquentContext.Provider>
  );
};

export { DelinquentContext, DelinquentProvider };
