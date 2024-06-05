import React from 'react';
import { View, Text } from 'react-native';
import { CronoPropsType } from 'src/types/types';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import { rem } from 'src/utils/constants';
import styles from './styles/MtxCronoStyle';

const MtxCrono = (props: CronoPropsType) => {
  // const { formatTime, time } = useCrono(props);
  const { time } = props;
  return (
    <View style={styles.container}>
      <View style={styles.itemsRow}>
        <View style={styles.recordIndicator} />
        <MtxDivider width={4 * rem} />
        <Text style={styles.text}>{time}</Text>
      </View>
    </View>
  );
};

export default MtxCrono;
