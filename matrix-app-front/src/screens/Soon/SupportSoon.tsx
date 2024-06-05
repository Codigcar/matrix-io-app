import React from 'react';
import {
  Box, Text, Button,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import InfoModal, { IInfoModalPropsType } from './components/InfoModal';
import FeatureItem from './components/FeatureItem';
import ChatEfficient from 'assets/svgs/chat_efficient.svg';
import ChatCustom from 'assets/svgs/chat_custom.svg';
import ChatAvailable from 'assets/svgs/chat_available.svg';
import { RFValue } from 'react-native-responsive-fontsize';

const SupportSoon = ({isVisible, onClose}: IInfoModalPropsType) => {

  return (
    <InfoModal title={i18n.t('comingSoon.title')} isVisible={isVisible} onClose={onClose}>
      <Text variant={'body'}>
        {i18n.t('comingSoon.chat-summary_1')}{' '}
        <Text variant={'label'} style={{ fontSize: 14 }}>
          {i18n.t('app-name')}{' '}
        </Text>
        {i18n.t('comingSoon.chat-summary_2')}
      </Text>

      <Box mt={'spacing-m'}>
        <FeatureItem
          icon={ChatEfficient}
          title={i18n.t('comingSoon.chat-efficient-title')}
          description={
            <Text variant={'body12'}>
              {i18n.t('comingSoon.chat-efficient-desc_1')}{' '}
              <Text variant={'label'} fontSize={RFValue(12)}>
                {i18n.t('app-name')}
              </Text>{' '}
              {i18n.t('comingSoon.chat-efficient-desc_2')}
            </Text>
          }
        />
        <FeatureItem
          icon={ChatCustom}
          title={i18n.t('comingSoon.chat-custom-title')}
          description={i18n.t('comingSoon.chat-custom-desc')}
        />
        <FeatureItem
          icon={ChatAvailable}
          title={i18n.t('comingSoon.chat-available-title')}
          description={
            <Text variant={'body12'}>
              {i18n.t('comingSoon.chat-available-desc_1')}{' '}
              <Text variant={'label'} fontSize={RFValue(12)}>
                {i18n.t('app-name')}
              </Text>{' '}
              {i18n.t('comingSoon.chat-available-desc_2')}
            </Text>
          }
        />

        <Button onPress={onClose} variant="primary" m="spacing-xxxs" label={i18n.t('understood')} />
      </Box>
    </InfoModal>
  );
};

export default SupportSoon;
