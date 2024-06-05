import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MtxDropdown from '../MtxDropdown';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '24rem',
  },
});
storiesOf('MtxDropdown', module)
  .addDecorator((getStory) => (
    <View style={styles.container}>{getStory()}</View>
  ))
  .add('Primary', () => <MtxDropdown />);
