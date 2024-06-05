import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Proptypes from 'prop-types';

import {IPublication} from '../interfaces/publish.interface';

export const CRenderItem = ({title, body, userId}: IPublication) => {
  return (
    <View accessibilityRole='menuitem' style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{body}</Text>
      <Text>User: {userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: '#8BA0AB',
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

CRenderItem.propTypes = {
  item: Proptypes.shape({
    id: Proptypes.number.isRequired,
    title: Proptypes.string.isRequired,
    body: Proptypes.string.isRequired,
    userId: Proptypes.number.isRequired,
  }),
};
