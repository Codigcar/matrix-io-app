import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { Text, Box } from 'matrix-ui-components';
import CheckListItem from './CheckListItem';

const BenefitList = () => {
  const benefitList = [
    {
      title: i18n.t('card-offer-benefit-list-first-item-title'),
    },
    {
      title: i18n.t('card-offer-benefit-list-second-item-title'),
    },
    {
      title: i18n.t('card-offer-benefit-list-third-item-title'),
    },
    {
      title: i18n.t('card-offer-benefit-list-fourth-item-title'),
    },
  ];
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
        {i18n.t('CardReplacement.summary-offer.benefits')}
      </Text>
      <Box mr="spacing-s">
        {benefitList.map((item) => (
          <Box key={item.title} mb="spacing-xxxxxs">
            <CheckListItem
              label={item.title}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BenefitList;
