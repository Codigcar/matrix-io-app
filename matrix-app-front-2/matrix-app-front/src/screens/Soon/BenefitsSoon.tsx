import React from 'react';
import { Box, Text, Button } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import InfoModal, { IInfoModalPropsType } from './components/InfoModal';
import FeatureItem from './components/FeatureItem';
import Cashback from 'assets/svgs/benefits_callback.svg';
import Discount from 'assets/svgs/benefits_discount.svg';
import Exclusive from 'assets/svgs/benefits_exclusive.svg';
import { RFValue } from 'react-native-responsive-fontsize';

const BenefitsSoon = ({ isVisible, onClose }: IInfoModalPropsType) => {
  return (
    <InfoModal title={i18n.t('comingSoon.title')} isVisible={isVisible} onClose={onClose}>
      <Text variant={'body'}>
        {i18n.t('comingSoon.benefit-summary')}{' '}
        <Text variant={'label'} fontSize={RFValue(14)}>
          {i18n.t('app-name')}
        </Text>
        :
      </Text>

      <Box mt={'spacing-m'}>
        <FeatureItem
          icon={Cashback}
          title={i18n.t('comingSoon.benefit-cashback-title')}
          description={i18n.t('comingSoon.benefit-cashback-desc')}
        />
        <FeatureItem
          icon={Discount}
          title={i18n.t('comingSoon.benefit-discount-title')}
          description={i18n.t('comingSoon.benefit-discount-desc')}
        />
        <FeatureItem
          icon={Exclusive}
          title={i18n.t('comingSoon.benefit-exclusive-title')}
          description={i18n.t('comingSoon.benefit-exclusive-desc')}
        />

        <Button onPress={onClose} variant="primary" m="spacing-xxxs" label={i18n.t('understood')} />
      </Box>
    </InfoModal>
  );
};

export default BenefitsSoon;
