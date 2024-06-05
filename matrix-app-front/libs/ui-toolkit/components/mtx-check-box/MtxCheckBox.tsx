import React from 'react';
import { Image } from 'react-native';
import { useController, Control } from 'react-hook-form';
// Components
import { Checkbox } from 'native-base';
import { CheckboxIcon } from 'assets/icons';
// Style
import { colors } from '../../styles';
import styles from './styles/MtxCheckBoxStyles';
import MtxText from '../mtx-text/MtxText';

type MtxcheckBoxPropsType = {
  name: string;
  control?: Control;
  isDisabled?: boolean;
  isChecked?: boolean;
  rules?: Object;
  testID?: string;
  error?: {
    message: string;
  };
  children?: Element | string;
};

/**
 * @deprecated The method should not be used
 */
const MtxCheckBox = ({
  name,
  control,
  rules,
  error,
  children,
  isDisabled,
  isChecked,
  testID,
}: MtxcheckBoxPropsType) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    rules,
    defaultValue: false,
  });
  const renderError = () => {
    if (error) {
      return <MtxText style={styles.errorStyle}>{error.message}</MtxText>;
    }
    return null;
  };
  return (
    <>
      <Checkbox
        {...{ value, onChange, testID }}
        isChecked={isChecked || value}
        accessibilityLabel={value.toString()}
        isDisabled={isDisabled}
        style={styles.baseStyle}
        _checked={styles.checkedStyle}
        _disabled={styles.disabledStyle}
        alignItems="flex-start"
        borderColor={colors.ONSURFACE_300}
        tintColor="white"
        my={0.1}
        icon={<Image source={CheckboxIcon} />}
      >
        {children}
      </Checkbox>
      {renderError()}
    </>
  );
};

MtxCheckBox.defaultProps = {
  isDisabled: false,
  isChecked: false,
  control: null,
  rules: null,
  testID: 'MtxCheckbox',
  error: {
    message: '',
  },
  children: null,
};

export default MtxCheckBox;
