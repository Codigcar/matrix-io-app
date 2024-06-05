import { StyleSheet } from 'react-native';
import { colors } from 'libs/ui-toolkit/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LABEL,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export const activityIndicatorColor = colors.PRIMARY_LIGHT;

export default styles;
