import React from 'react';
import { Pressable } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Box, Text } from 'src/matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { s } from 'src/utils/sizes';
import CardProfileSkeleton from './SkeletonCard';

interface UserDataProps {
  labelText: string;
  value: string;
  action?: () => void;
  isEditable: boolean;
  isLoading: boolean;
  isEmailVerified?: boolean;
  icon?: React.FC<SvgProps>;
  testID?: string;
}

const UserData = ({
  labelText,
  value,
  action,
  isEditable,
  isEmailVerified = false,
  isLoading,
  icon: Icon,
  testID,
}: UserDataProps) => (
  <Box
    flexDirection="row"
    my="spacing-xxxs"
    px="spacing-xs"
    borderRadius={16}
    py="spacing-xs"
    backgroundColor="primary100"
  >
    {Icon && !isLoading ? (
      <Box mr="spacing-xs" width={s(24)} height={s(24)}>
        <Icon width="100%" height="100%" />
      </Box>
    ) : (
      <Box />
    )}
    {!isLoading ? (
      <Box flexDirection="row" flex={1} justifyContent="center" alignItems="center">
        <Box flex={1}>
          <Text variant="bodySemibold" color="primary1000">
            {i18n.t(labelText)}
          </Text>
          <Box
            mt="spacing-xxxs"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text numberOfLines={1} testID={testID} variant="body" color="primary800">
              {value}
            </Text>
          </Box>
        </Box>
        {isEditable && isEmailVerified && (
          <Pressable onPress={action} testID={`action-${testID}`}>
            <Text color="complementaryIndigo600" variant="link">
              {i18n.t('myProfile-label-edit')}
            </Text>
          </Pressable>
        )}
      </Box>
    ) : (
      <CardProfileSkeleton isVisible={isLoading} />
    )}
  </Box>
);

UserData.defaultProps = {
  icon: undefined,
  testID: undefined,
  isEmailVerified: undefined,
  action: undefined,
  isEmailVerified: undefined,
};

export default UserData;
