import { Text } from 'matrix-ui-components';
import React from 'react';
import { BillingCycleDateProps } from '../../types/types';

const BillingCycleDate = ({ day, month, year }: BillingCycleDateProps) => {
  const dayWithSpace = `${day} `;
  return (
    <>
      <Text
        variant="body12"
        color="complementaryOcean200"
      >
        {year}
      </Text>
      <Text
        variant="body14SemiBold"
        color="primary000"
      >
        {dayWithSpace}
        <Text
          variant="body14Regular"
          color="complementaryOcean200"
        >
          {month}
        </Text>
      </Text>
    </>
  );
};

export default BillingCycleDate;
