import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { HamburgerIcon, ChevronLeftIcon } from 'native-base';
import MtxCheckBox from '../MtxCheckBox';
import CenterView from '../../../../../storybook/stories/CenterView';

storiesOf('MtxCheckBox', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('checkbox/1.default', () => <MtxCheckBox />)
  .add('checkbox/3.active', () => <MtxCheckBox isChecked />)
  .add('checkbox/4.disabled', () => <MtxCheckBox isDisabled />);
