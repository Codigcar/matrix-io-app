import React from 'react';
import { Text, Box, Switch } from 'matrix-ui-components';
import { ForeignPurchaseRectable, InternetPurchaseRectangle } from 'assets/svgs';
import LoadingSwitch from 'src/components/LoadingSwitch/LoadingSwitch';
import { RFValue } from 'react-native-responsive-fontsize';
import { IconSwitchListItemProps } from '../types/types';
import useIconSwitchListItem from '../hooks/useIconSwitchListItem';
import { string } from '../strings/string';
import { testID } from '../strings/testID';

export const iconSelect = (type: string) => {
  switch (type) {
    case 'internet':
      return <InternetPurchaseRectangle />;
    case 'foreign':
      return <ForeignPurchaseRectable />;
    default:
      return null;
  }
};

const IconSwitchListItem: React.FC<IconSwitchListItemProps> = (props) => {
  const {
    label, type, status, onChange, loading, isBlocked, testID: testIDProp,
  } = props;

  const { changeText, changeColorStatus } = useIconSwitchListItem(props);

  return (
    <Box testID={testIDProp} flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box flexDirection="row" justifyContent="space-between">
        <Box justifyContent="flex-start" mt="spacing-xxxs">
          {iconSelect(type ?? 'card')}
        </Box>
        <Box justifyContent="center" alignItems="flex-start">
          <Text
            textAlign="left"
            ml={type === 'card' ? 'spacing-none' : 'spacing-xxs'}
            mr="spacing-s"
            paddingHorizontal="spacing-xxxs"
            mt="spacing-xxxs"
            variant={type === 'card' ? 'Subtitle16Semibold' : 'body14pxMedium'}
            color="primary1000"
          >
            {label}
          </Text>
          <Text
            textAlign="left"
            my="spacing-xxxs"
            ml={type === 'card' ? 'spacing-none' : 'spacing-xxs'}
            mr="spacing-s"
            paddingHorizontal="spacing-xxxs"
            variant="body13pxRegular"
            color={changeColorStatus()}
          >
            {changeText()}
          </Text>
        </Box>
      </Box>
      {loading ? (
        <Box
          testID={testID.iconSwitchListItemLoadingswitch}
          mt={type === 'card' ? 'spacing-xxxs' : 'spacing-none'}
        >
          <LoadingSwitch width={RFValue(44)} height={RFValue(24)} />
        </Box>
      ) : (
        <Switch
          testID={testID.iconSwitchListItemSwitch}
          onToggle={() => {
            onChange();
          }}
          label={string.configureCardSubtitle}
          hideLabel
          checked={status}
          disabled={isBlocked}
          mt={type === 'card' ? 'spacing-xxxs' : 'spacing-none'}
          alignContent="center"
          justifyContent="center"
        />
      )}
    </Box>
  );
};

IconSwitchListItem.defaultProps = {
  type: 1,
  status: 1,
  loading: false,
  isBlocked: false,
};

export default IconSwitchListItem;
