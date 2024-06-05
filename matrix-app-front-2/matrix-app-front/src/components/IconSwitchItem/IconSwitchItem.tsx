import React from 'react';
import { Text, fonts, Box } from 'matrix-ui-components';
import { colors } from 'libs/ui-toolkit/styles';
import { Switch } from 'react-native';
import { ios } from 'src/utils/constants';

type IconSwitchItemPropsType = {
  label: string;
  leftItem?: React.ReactNode;
  infoLabel?: string;
  infoLabelColor?: string;
  isActive?: boolean;
  onChange: () => void;
};

const IconSwitchItem = ({
  label,
  infoLabel,
  infoLabelColor,
  leftItem,
  isActive,
  onChange,
}: IconSwitchItemPropsType) => (
  <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
    <Box flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
      <Box backgroundColor="secundaryDisable" p="spacing-xxxxs" borderRadius={10}>
        {leftItem}
      </Box>
      <Box justifyContent="center" alignItems="flex-start">
        <Text
          textAlign="left"
          ml="spacing-xxs"
          mr="spacing-s"
          paddingHorizontal="spacing-xxxs"
          mt="spacing-xxxs"
          variant="label"
          fontFamily={fonts.euclidCircularMedium}
          fontSize={14}
          lineHeight={14}
          color="primaryDarkest"
        >
          {label}
        </Text>
        <Text
          textAlign="left"
          my="spacing-xxxs"
          ml="spacing-xxs"
          mr="spacing-s"
          paddingHorizontal="spacing-xxxs"
          variant="label"
          fontSize={12}
          lineHeight={12}
          fontFamily={fonts.euclidCircularRegular}
          color={infoLabelColor}
        >
          {infoLabel}
        </Text>
      </Box>
    </Box>
    <Switch
      trackColor={{ false: colors.PRIMARY_MEDIUM, true: colors.SUCCESS_DARK }}
      thumbColor={isActive ? 'white' : 'white'}
      onValueChange={onChange}
      style={{
        transform: [{ scaleX: ios ? 1 : 1.6 }, { scaleY: ios ? 1 : 1.6 }],
      }}
      value={isActive}
      ios_backgroundColor={colors.PRIMARY_MEDIUM}
    />
  </Box>
);

IconSwitchItem.defaultProps = {
  type: 1,
  isActive: 1,
};

export default IconSwitchItem;
