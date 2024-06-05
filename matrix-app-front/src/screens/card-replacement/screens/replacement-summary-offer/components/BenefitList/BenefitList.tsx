import React from 'react';
import { Text, Box } from 'matrix-ui-components';
import { BenefitListProps } from 'src/screens/card-replacement/shared/types/component';
import { CheckListItem } from '../CheckListItem/CheckListItem';
import { string } from '../../../../shared/strings/string';

export const BenefitList: React.FC<BenefitListProps> = (props) => {
  const { data } = props;
  return (
    <Box
      backgroundColor="complementaryIndigo050"
      borderRadius={16}
      paddingTop="spacing-s"
      paddingBottom="spacing-m"
      paddingHorizontal="spacing-m"
    >
      <Text
        textAlign="left"
        mt="spacing-xxxxs"
        mb="spacing-s"
        variant="Subtitle16pxMedium"
        color="complementaryIndigo900"
      >
        {string.cardReplacementSummaryOfferBenefits}
      </Text>
      <Box mr="spacing-s">
        {data.map((item) => (
          <Box key={item.title} mb="spacing-xxxxxs">
            <CheckListItem label={item.title} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
