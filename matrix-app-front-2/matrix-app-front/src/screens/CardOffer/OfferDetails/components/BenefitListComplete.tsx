import React from 'react';
// Assets
import { i18n } from 'src/utils/core/MTXStrings';
import MomentInit, { formatDate } from 'src/utils/date-time/date-time';
// Components
import { Text, fonts, Box } from 'matrix-ui-components';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckListItem from './CheckListItem';
import IconListItem from './IconListItem';

const benefitListComplete = [
  {
    title: i18n.t('card-offer-benefit-list-first-item-title'),
    hasSubtitle: false,
    subtitle: '',
  },
  {
    title: i18n.t('card-offer-benefit-list-second-item-title'),
    hasSubtitle: false,
    subtitle: '',
  },
  {
    title: i18n.t('card-offer-benefit-list-third-item-title'),
    hasSubtitle: false,
    subtitle: '',
  },
  {
    title: i18n.t('card-offer-benefit-list-fourth-item-title'),
    hasSubtitle: false,
    subtitle: '',
  },
];

const BenefitListComplete = () => {
  MomentInit();
  const now = moment();
  const timeZone = RNLocalize.getTimeZone();
  const date = formatDate(now.tz(timeZone));

  const timeList = [
    {
      label: date.charAt(0).toUpperCase() + date.substring(1),
      type: 1,
    },
    {
      label: now.tz(timeZone).format('h:mm a'),
      type: 2,
    },
  ];

  return (
    <Box
      backgroundColor="complementaryIndigo050"
      borderRadius={RFValue(24)}
      padding="spacing-sm"
      py="spacing-m"
      mt="spacing-s"
    >
      <Text
        textAlign="left"
        my="spacing-none"
        mb="spacing-s"
        variant="Subtitle16pxMedium"
      >
        {i18n.t('card-offer-benefit-first-list-complete-section-title')}
      </Text>
      <Box>
        {benefitListComplete.map((item) => (
          <Box key={item.title} mb="spacing-xs">
            <CheckListItem
              label={item.title}
              hasSubtitle={item.hasSubtitle}
              subtitle={item.subtitle}
            />
          </Box>
        ))}
      </Box>
      <Text
        textAlign="left"
        mt="spacing-xs"
        mb="spacing-xxs"
        variant="Subtitle16Semibold"
      >
        {i18n.t('card-offer-benefit-second-list-complete-section-title')}
      </Text>
      {timeList.map((item) => (
        <Box key={item.label} my="spacing-xxxs">
          <IconListItem
            type={item.type}
            label={item.label}
            hasSubtitle={false}
          />
        </Box>
      ))}
    </Box>
  );
};

export default BenefitListComplete;
