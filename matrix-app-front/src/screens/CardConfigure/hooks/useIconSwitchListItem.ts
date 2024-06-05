import { string } from '../shared/strings/string';
import { IconSwitchListItemProps } from '../shared/types/components';

const useIconSwitchListItem = (props: IconSwitchListItemProps) => {
  const { isBlocked, status, type } = props;

  // Methods
  const changeText = () => {
    if (!isBlocked) {
      if (status) {
        return type === 'card' ? string.activated : string.activatedPurchases;
      }
      return type === 'card' ? string.desactivated : string.desactivatedPurchases;
    }
    return string.cardBlocked;
  };

  const changeColorStatus = () => {
    if (!isBlocked) {
      if (status) return 'complementaryMint700';
      return 'primary500';
    }
    return 'FeedbackError600';
  };

  return {
    changeText,
    changeColorStatus,
  };
};

export default useIconSwitchListItem;
