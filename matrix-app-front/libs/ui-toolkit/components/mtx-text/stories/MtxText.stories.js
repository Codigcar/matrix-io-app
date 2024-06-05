// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import MtxText from '../MtxText';
import CenterView from '../../../../../storybook/stories/CenterView';

storiesOf('MtxText', module)
    .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
    // eslint-disable-next-line react-native/no-raw-text
    .add('Heading', () => (
        <MtxText style={{ fontSize: 34 }}>Este es un título</MtxText>
    ))
    .add('normal text', () => <MtxText>Este es un texto de prueba</MtxText>);
