import React from 'react';
import MomentInit, { formatDate } from 'src/utils/date-time/date-time';
// Components
import { Text, Box } from 'matrix-ui-components';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckListItem from './CheckListItem';
import IconListItem from './IconListItem';
import { string } from '../../shared/strings/string';

const benefitListComplete = [
  {
    title: string.cardOfferBenefitListFirstItemTitle,
    hasSubtitle: false,
    subtitle: '',
  },
  {
    title: string.cardOfferBenefitListSecondItemTitle,
    hasSubtitle: false,
    subtitle: '',
  },
  {
    title: string.cardOfferBenefitListThirdItemTitle,
    hasSubtitle: false,
    subtitle: '',
  },
  {
    title: string.cardOfferBenefitListFourthItemTitle,
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
        {string.cardOfferBenefitFirstListCompleteSectionTitle}
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
        {string.cardOfferBenefitSecondListCompleteSectionTitle}
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
