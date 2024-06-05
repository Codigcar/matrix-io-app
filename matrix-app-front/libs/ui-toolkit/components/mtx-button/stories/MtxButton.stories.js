import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from 'libs/ui-toolkit/styles';
import MtxButton from '../MtxButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BACKGROUND_700,
    },
});
storiesOf('MtxButton', module)
    .addDecorator((getStory) => (
        <View style={styles.container}>{getStory()}</View>
    ))
    .add('Primary', () => (
        <MtxButton
            label={text('Button text', 'Primary button')}
            type="primary"
            onPress={action('clicked-primary')}
        />
    ))
    .add('Secondary', () => (
        <MtxButton
            label={text('Button text', 'Secondary button')}
            type="secondary"
            onPress={action('clicked-secondary')}
        />
    ))
    .add('Outline', () => (
        <MtxButton
            label={text('Button text', 'Outline button')}
            type="outline"
            onPress={action('clicked-outline')}
        />
    ))
    .add('Disabled and Loading', () => (
        <MtxButton
            label={text('Button text', 'Disabled button')}
            type="outline"
            isDisabled
            isLoading
            onPress={action('clicked-disabled')}
        />
    ));
