import React from 'react';
import { TextStyle } from 'react-native';
import { Text } from 'native-base';
// Styles
import styles from './styles/MtxTextStyles';

type MtxTextPropsType = {
  color?: string;
  fontFamily?: string;
  fontSize?: numbber;
  style: TextStyle | TextStyle[];
  children?: React.ReactNode;
};
/**
 * @deprecated The method should not be used
 */
const MtxText = ({
  color, style, children, fontFamily, fontSize, rest,
}: MtxTextPropsType) => (
  <Text style={[{ color, fontFamily, fontSize }, styles.text, style]}>{children}</Text>
);

MtxText.defaultProps = {
  color: 'black',
  children: '',
  fontFamily: 'EuclidCircularA-Light',
  fontSize: 20,
};

export default MtxText;
