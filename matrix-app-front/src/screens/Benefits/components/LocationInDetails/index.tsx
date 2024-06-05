import React from 'react';
import { Text, Box, Divider } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';

import SubTitleTextInDetails from '../SubTitleTextInDetails';
import BoxLocationInDetails from '../BoxLocationInDetails';

interface ItemLocalDiscount {
  local: string;
  location: string;
}

interface LocationInDetailsProps {
  localDiscounts: ItemLocalDiscount[] | string;
}

const LocationInDetails = ({ localDiscounts }: LocationInDetailsProps) => {
  if (typeof localDiscounts === 'string') {
    return (
      <Box marginBottom="spacing-m">
        <SubTitleTextInDetails text={i18n.t('benefits:locals')} />
        <Divider height={RFValue(8)} />
        <Text variant="body13Regular" color="primary500">
          {localDiscounts}
        </Text>
      </Box>
    );
  }

  if (localDiscounts.length >= 1) {
    return (
      <Box marginBottom="spacing-m">
        <SubTitleTextInDetails text={i18n.t('benefits:locals')} />
        <Divider height={RFValue(8)} />
        <BoxLocationInDetails localDiscounts={localDiscounts} />
      </Box>
    );
  }

  return null;
};

export default LocationInDetails;
