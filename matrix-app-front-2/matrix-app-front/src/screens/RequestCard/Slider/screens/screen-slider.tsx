import React from 'react';
import { Container, Text } from 'matrix-ui-components';
import { Background } from 'assets/images';

export const SliderCardScreen = (props: NavigationPropsType) => (
  <Container withInput imageBackground={Background} isHeaderVisible={false}>
    <Text variant="titleEmptyContent">Screen</Text>
  </Container>
);
export default SliderCardScreen;
