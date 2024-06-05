import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Proptypes from 'prop-types';

type Props = {
  title: string;
};

export const CTextCenter = ({title}: Props) => {
  return (
    <View style={styles.center}>
      <View>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

CTextCenter.propTypes = {
    title: Proptypes.string.isRequired
}