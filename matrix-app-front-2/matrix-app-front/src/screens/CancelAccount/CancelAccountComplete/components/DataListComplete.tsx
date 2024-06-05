import React from 'react';
// Assets
import { i18n } from 'src/utils/core/MTXStrings';
// Components
import { Text, Box } from 'matrix-ui-components';
import { DataListPropsType } from 'src/types/types';
import Helpers from 'src/utils/Helpers';
import IconListItem from './IconListItem';

const DataListComplete = ({
  requestDate,
  requestTime,
  maskedCard,
  pendingCreditBalance,
  pendingPayment,
}: DataListPropsType) => {
  const timeList = [
    {
      label: requestDate,
      type: 1,
    },
    {
      label: requestTime,
      type: 2,
    },
    {
      label: maskedCard,
      type: 3,
    },
  ];

  const timeList2 = [];

  if (pendingPayment) {
    timeList2.push({
      label: i18n.t('cancelAccountComplete.second-section-text-1'),
      subtitle: i18n.t('cancelAccountComplete.second-section-text-3'),
      value: pendingPayment,
      type: 4,
    });
  }

  if (pendingCreditBalance) {
    timeList2.push({
      label: i18n.t('cancelAccountComplete.second-section-text-2'),
      value: Helpers.formatCurrency(pendingCreditBalance, { removeDecimalsWhenRounded: false }),
      type: 4,
    });
  }

  return (
    <>
      <Box
        backgroundColor="primary100"
        borderWidth={1}
        borderRadius={16}
        borderColor="primary100"
        padding="spacing-s"
        py="spacing-s"
      >
        <Text
          textAlign="left"
          mt="spacing-xxxxxs"
          mb="spacing-s"
          variant="body"
          fontWeight="bold"
          lineHeight={19.2}
          numberOfLines={1}
          fontSize={16}
        >
          {i18n.t('cancelAccountComplete.first-section-title')}
        </Text>
        {timeList.map((item, idx) => (
          <Box key={`${item.label}${idx.toString()}`} my="spacing-xxxs">
            <IconListItem type={item.type} label={item.label} hasValue={false} />
          </Box>
        ))}
      </Box>
      {(!!pendingPayment || !!pendingCreditBalance) && (
        <Box
          backgroundColor="primary100"
          mt="spacing-s"
          borderWidth={1}
          borderRadius={16}
          borderColor="primary100"
          padding="spacing-s"
          py="spacing-s"
        >
          <Text
            textAlign="left"
            mt="spacing-xxxxxs"
            mb="spacing-xxxxs"
            variant="body"
            fontWeight="bold"
            fontSize={16}
            lineHeight={18}
          >
            {i18n.t('cancelAccountComplete.second-section-title')}
          </Text>
          {timeList2.map((item) => (
            <Box key={item.label} my="spacing-xxxs" mx="spacing-xxxs">
              <IconListItem
                type={item.type}
                label={item.label}
                hasValue
                subtitle={item.subtitle}
                value={item.value.toString()}
              />
            </Box>
          ))}
        </Box>
      )}
      <Box
        backgroundColor="feedbackInformativeLightest"
        mt="spacing-s"
        borderRadius={16}
        padding="spacing-s"
        py="spacing-s"
      >
        {(!pendingCreditBalance || !!pendingPayment) && (
          <Text padding="spacing-none" textAlign="justify" mt="spacing-none">
            <Text
              textAlign="justify"
              variant="body"
              fontSize={14}
              color="complementaryIndigo900"
              lineHeight={19.2}
            >
              {i18n.t('cancelAccountComplete.third-section-text-1')}
            </Text>
            <Text
              textAlign="justify"
              variant="body"
              fontSize={14}
              color="complementaryIndigo900"
              fontWeight="bold"
              lineHeight={19.2}
            >
              {i18n.t('app-name')}
            </Text>
            <Text
              marginBottom="spacing-xm"
              textAlign="justify"
              variant="body"
              fontSize={14}
              color="complementaryIndigo900"
              lineHeight={19.2}
            >
              {i18n.t('cancelAccountComplete.third-section-text-2')}
            </Text>
          </Text>
        )}
        {!!pendingCreditBalance && !pendingPayment && (
          <Text
            textAlign="justify"
            variant="body"
            fontSize={14}
            color="complementaryIndigo900"
            lineHeight={19.2}
          >
            {i18n.t('cancelAccountComplete.third-section-text-3')}
          </Text>
        )}
      </Box>
    </>
  );
};

export default DataListComplete;
