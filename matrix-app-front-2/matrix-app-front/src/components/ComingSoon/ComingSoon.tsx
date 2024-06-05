import React from 'react';
import { Text, View } from 'react-native';
import { i18n } from 'src/utils/core/MTXStrings';

import Icon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import styles from './styles/comingSoonStyle';

const ComingSoon = () => (
  <View style={styles.container}>
    <Icon name="settings" size="large" />
    <MtxDivider height={20} />
    <Text style={styles.text}>{i18n.t('comingSoon.text')}</Text>
  </View>
);

export default ComingSoon;
