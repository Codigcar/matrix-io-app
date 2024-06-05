import React from 'react';
import { Text, Box, fonts, Card } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { RFValue } from 'react-native-responsive-fontsize';
import Loading from '../components/Loading';
// CHECK IN DEV

interface ILoadProps {
  type: string;
}
export const Load = ({ type }: ILoadProps) => {
  const titleLoad = () => {
    switch (type) {
      case 'loadingOffer':
        return i18n.t('card-offer-modals.loading-offer-title');
      case 'generatingCard':
        return i18n.t('cardReissue.load.generating-card-title');
      default:
        return i18n.t('card-offer-modals.loading-authorization-title');
    }
  };
  const subtitleLoad = () => {
    switch (type) {
      case 'loadingOffer':
        return i18n.t('card-offer-modals.loading-offer-subtitle');
      case 'generatingCard':
        return i18n.t('cardReissue.load.generating-card-subtitle');
      default:
        return i18n.t('card-offer-modals.loading-authorization-subtitle');
    }
  };
  return (
    <Card marginHorizontal="spacing-m" borderRadius={RFValue(24)}>
      <Box marginHorizontal="spacing-l" marginTop="spacing-m" marginBottom="spacing-xxs">
        <Box alignItems="center" marginBottom="spacing-m">
          <Loading />
        </Box>
        <Text
          variant="Heading18Medium"
          textAlign="center"
          marginVertical="spacing-xxxs"
        >
          {titleLoad()}
        </Text>
        <Text variant="body14Regular" textAlign="center" marginTop="spacing-xs" marginBottom="spacing-xxs">
          {subtitleLoad()}
        </Text>
      </Box>
    </Card>
  );
};
export default Load;
