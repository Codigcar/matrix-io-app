import React from 'react';
import {
  Text, Box, fonts, Container, Button,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { Background } from 'assets/images';
import Icon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import Divider from 'src/matrix-ui-components/components/divider';
import useNoCardOffer from './hooks/useNoCardOffer';
import { string } from '../shared/strings/string';
import { testID } from '../shared/strings/testID';

const NoCardOffer = (props: NavigationPropsType) => {
  const { onPressContinue } = useNoCardOffer(props);

  return (
    <Container imageBackground={Background}>
      <Box paddingHorizontal="spacing-l" alignItems="center">
        <Divider height={169} />
        <Icon name="checkWarning" size="xlarge" />
        <Divider height={79} />
        <Text textAlign="left" variant="H3" fontFamily={fonts.euclidCircularSemibold}>
          {string.noCardOfferMessage}
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
          {string.noCardOfferTitle}
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
          {string.noCardOfferSubtitle}
        </Text>
      </Box>
      <Box
        paddingHorizontal="spacing-m"
        position="absolute"
        width="100%"
        bottom={0}
        alignSelf="center"
      >
        <Button
          variant="primary"
          my="spacing-m"
          onPress={onPressContinue}
          label={string.finish}
          testID={testID.continueButtonId}
        />
      </Box>
    </Container>
  );
};

export default NoCardOffer;
