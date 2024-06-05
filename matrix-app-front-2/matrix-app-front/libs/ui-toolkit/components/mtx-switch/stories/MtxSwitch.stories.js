// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import MtxSwitch from '../MtxSwitch';
import CenterView from '../../../../../storybook/stories/CenterView';

storiesOf('MtxSwitch', module)
    .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
    .add('primary', () => <MtxSwitch size="sm" />)
    .add('custom color', () => (
        <MtxSwitch
            size="md"
            offTrackColor="orange.100"
            onTrackColor="orange.200"
            onThumbColor="orange.500"
            offThumbColor="orange.50"
        />
    ))
    .add('large', () => <MtxSwitch size="lg" />);
