import React, { createContext, useMemo, useState } from 'react';

interface NotificationContextData {
  cardTabBadge: boolean;
  updateCardTabBadge: (updateCardTabBadgeValue: boolean) => void;
}

const NotificationContext = createContext<NotificationContextData>({
  cardTabBadge: false,
  updateCardTabBadge: () => { },
});

const NotificationProvider = ({ children }: any) => {
  const [cardTabBadge, setCardTabBadge] = useState(false);

  const updateCardTabBadge = (updateCardTabBadgeValue: boolean) => {
    setCardTabBadge(updateCardTabBadgeValue);
  };

  const contextValue = useMemo(
    () => ({
      cardTabBadge, updateCardTabBadge,
    }),
    [cardTabBadge],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
