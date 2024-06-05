import React from 'react';
import {
  Box, Text, Button,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';

import InfoModal, { IInfoModalPropsType } from './components/InfoModal';
import FeatureItem from './components/FeatureItem';
import CardLine from 'assets/svgs/card_line.svg';
import CardShipping from 'assets/svgs/card_shipping.svg';
import CardExclusive from 'assets/svgs/card_exclusive.svg';

const PhysicalCardSoon = ({isVisible, onClose}: IInfoModalPropsType) => {

  return (
    <InfoModal title={i18n.t('comingSoon.title')} isVisible={isVisible} onClose={onClose}>
      <Text variant={'body'}>{i18n.t('comingSoon.card-summary')}</Text>

      <Box mt={'spacing-m'}>
        <FeatureItem
          icon={CardLine}
          title={i18n.t('comingSoon.card-line-title')}
          description={i18n.t('comingSoon.card-line-desc')}
        />
        <FeatureItem
          icon={CardShipping}
          title={i18n.t('comingSoon.card-custom-title')}
          description={i18n.t('comingSoon.card-custom-desc')}
        />
        <FeatureItem
          icon={CardExclusive}
          title={i18n.t('comingSoon.card-exclusive-title')}
          description={i18n.t('comingSoon.card-exclusive-desc')}
        />

        <Button onPress={onClose} variant="primary" m="spacing-xxxs" label={i18n.t('understood')} />
      </Box>
    </InfoModal>
  );
};

export default PhysicalCardSoon;
