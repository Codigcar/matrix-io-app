import React from 'react';
import { Switch } from 'native-base';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { useController, Control } from 'react-hook-form';
// Styles
import { colors } from '../../styles';

type MtxSwitchPropsType = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  name: string;
  control?: Control;
  isDisabled?: boolean;
  rules?: Object;
  testID?: string;
  defaultIsChecked?: boolean;
  onToggle?: (() => any) | undefined;
  error?: {
    message: string;
  };
};
/**
 * @deprecated The method should not be used
 */
const MtxSwitch = ({
  size,
  name,
  control,
  isDisabled,
  rules,
  testID,
  onToggle,
  defaultIsChecked,
  error,
}: MtxSwitchPropsType) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    rules,
    defaultValue: defaultIsChecked,
  });

  const handleChange = () => {
    logVirtualEventAnalytics({
      tipoEvento: value ? 'Desactivar' : 'Activar',
      tipoElemento: 'Switch',
      valor: name,
    });
    onChange?.();
  };

  return (
    <Switch
      {...{
        size,
        isDisabled,
        onToggle,
        testID,
      }}
      value={value}
      onValueChange={handleChange}
      onTrackColor={colors.SUCCESS_DARK}
      offTrackColor={colors.PRIMARY_MEDIUM}
    />
  );
};

MtxSwitch.defaultProps = {
  size: 'md',
  onToggle: () => {},
  isDisabled: false,
  control: null,
  rules: null,
  testID: 'MtxCheckbox',
  defaultIsChecked: false,
  error: {
    message: '',
  },
};

export default MtxSwitch;
