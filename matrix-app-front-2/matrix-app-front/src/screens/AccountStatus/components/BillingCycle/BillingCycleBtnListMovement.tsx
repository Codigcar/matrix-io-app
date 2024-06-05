import React, { FC } from 'react';
import CardErrorRefresh from 'src/screens/Home/components/CardError';
import SeeMovementsButton from '../seeMovementsButton';

type IBtnListMovements = {
  isError: boolean;
  isFirstBillingCycle: boolean;
  navigate: () => void;
  onPress: () => Promise<void>;
};

const BtnListMovements: FC<IBtnListMovements> = ({
  isError,
  isFirstBillingCycle,
  navigate,
  onPress,
}): JSX.Element => {
  if (isError) {
    return (
      <CardErrorRefresh
        colorText="complementaryOcean800"
        colorTextBold="primaryDarkest"
        onPress={onPress}
      />
    );
  }

  return <SeeMovementsButton navigate={navigate} isFirstBillingCycle={isFirstBillingCycle} />;
};

export default BtnListMovements;
