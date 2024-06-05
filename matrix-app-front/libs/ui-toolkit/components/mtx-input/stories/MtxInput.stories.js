// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import MtxInput from '../MtxInput';
import CenterView from '../../../../../storybook/stories/CenterView';
import { WarningIcon } from 'native-base';
import { colors } from '../../../styles';

storiesOf('MtxInput', module)
    .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
    .add('basic', () => <MtxInput label="Label" />)
    .add('error', () => <MtxInput label="Label" error />)
    .add('disabled', () => (
        <MtxInput label="Label" disabled placeholder="Disabled" />
    ))
    .add('password', () => (
        <MtxInput label="Label" placeholder="Password" type="password" />
    ))
    .add('phone number', () => (
        <MtxInput
            label="Label"
            placeholder="Password"
            type="phone"
            success
            phonePrefix={57}
            keyboardType="numeric"
        />
    ));
