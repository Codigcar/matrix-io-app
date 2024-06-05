import React from 'react';
import { Image, View, Text } from 'react-native';
// Components
import { Check } from 'assets/icons';
import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import MtxDivider from '../mtx-divider/MtxDivider';
// Style
import styles from './styles/MtxStepCheckStyle';

type MtxStepCheckPropsType = {
  isChecked?: boolean;
  testID?: string;
  label: Element | string;
};
/**
 * @deprecated The method should not be used
 */
const MtxStepCheck = ({ label, isChecked, testID }: MtxStepCheckPropsType) => (
  <View testID={testID} style={styles.container}>
    <View
      style={[
        styles.iconContainer,
        {
          backgroundColor: isChecked
            ? colors.complementaryMint700
            : colors.white,
        },
        {
          borderColor: !isChecked
            ? colors.primary500
            : colors.white,
        },
      ]}
    >
      <Image
        source={Check}
        resizeMode="contain"
        style={[
          styles.icon,
          {
            tintColor: isChecked ? colors.white : colors.primary500,
          },
        ]}
      />
    </View>
    <MtxDivider width={10} />
    <Text style={styles.label}>{label}</Text>
  </View>
);

MtxStepCheck.defaultProps = {
  isChecked: false,
  testID: 'MtxCheckbox',
};

export default MtxStepCheck;
