import React from 'react';
import { View } from 'react-native';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import styles from './styles/TimeChipStyle';

type TimeChipTypeProps = {
  text: string;
};

const TimeChip = ({ text }: TimeChipTypeProps) => (
  <View style={styles.container}>
    <MtxText style={styles.text}>{text}</MtxText>
  </View>
);

export default TimeChip;
