import React from 'react';
import { Text, Box, Card } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import Loading from '../components/Loading';
import { string } from '../shared/strings/string';

interface ILoadProps {
  type: string;
}
export const Load = ({ type }: ILoadProps) => {
  const titleLoad = () => {
    switch (type) {
      case 'loadingOffer':
        return string.cardOfferModalsLoadingOfferTitle;
      case 'generatingCard':
        return string.cardReissueLoadGeneratingCardTitle;
      default:
        return string.cardOfferModalsLoadingAuthorizationTitle;
    }
  };
  const subtitleLoad = () => {
    switch (type) {
      case 'loadingOffer':
        return string.cardOfferModalsLoadingOfferSubtitle;
      case 'generatingCard':
        return string.cardReissueLoadGeneratingCardSubtitle;
      default:
        return string.cardOfferModalsLoadingAuthorizationSubtitle;
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
