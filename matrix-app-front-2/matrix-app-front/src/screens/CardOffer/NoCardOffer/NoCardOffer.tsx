import React from 'react';
import { Text, Box, fonts, Container, Button } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { Background } from 'assets/images';
import useNoCardOffer from './hooks/useNoCardOffer';
import Icon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import Divider from 'src/matrix-ui-components/components/divider';

const NoCardOffer = (props: NavigationPropsType) => {
  const { onPressContinue } = useNoCardOffer(props);

  return (
    <Container imageBackground={Background}>
        <Box paddingHorizontal="spacing-l" alignItems="center">
          <Divider height={169} />
          <Icon name="checkWarning" size="xlarge" />
          <Divider height={79} />
          <Text
            textAlign="left"
            variant="H3"
            fontFamily={fonts.euclidCircularSemibold}
          >
            {i18n.t('kyc-liveness-response-title-pending')}
          </Text>
          <Text
            textAlign="center"
            mt="spacing-s"
            marginHorizontal="spacing-s"
            variant="body"
            fontSize={18}
            lineHeight={24}
            fontFamily={fonts.euclidCircularRegular}
          >
            {i18n.t('no-card-offer-title')}
          </Text>
          <Text
            textAlign="center"
            mt="spacing-m"
            marginHorizontal="spacing-m"
            variant="body"
            fontSize={18}
            lineHeight={24}
            fontFamily={fonts.euclidCircularRegular}
          >
            {i18n.t('no-card-offer-subtitle')}
          </Text>
        </Box>
      <Box paddingHorizontal="spacing-m" position="absolute" width="100%" bottom={0} alignSelf="center">
        <Button variant="primary" my="spacing-m" onPress={onPressContinue} label={i18n.t('finish')} />
      </Box>
    </Container>
  );
};

export default NoCardOffer;
