import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';
import { Box, Text } from 'src/matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import CardProfileSkeleton from './SkeletonCard';

interface EmailDataProps {
  value: string;
  isEditable: boolean;
  isEmailVerified: boolean;
  goTo: (path: string) => void;
  isLoading: boolean;
  icon?: React.FC<SvgProps>;
}

const EmailData = ({ isEmailVerified, value, goTo, isLoading, icon: Icon, isEditable }: EmailDataProps) => (
  <Box
    my="spacing-xxxs"
    flexDirection="row"
    py="spacing-xs"
    borderRadius={16}
    px="spacing-xs"
    backgroundColor="primary100"
  >
    {Icon && !isLoading ? (
      <Box mr="spacing-xs">
        <Icon />
        {!isEmailVerified ? (
          <Box
            position="absolute"
            width={6}
            height={6}
            borderRadius={5}
            backgroundColor="complementaryPumpkin600"
            top={0}
            left={0}
          />
        ) : null}
      </Box>
    ) : (
      <Box />
    )}
    {!isLoading ? (
      <Box flexDirection="row" flex={1} justifyContent="center" alignItems="center">
        <Box flex={1}>
          <Text variant="bodySemibold" color="primary1000">
            {i18n.t('myProfile-label-email')}
          </Text>
          <Box
            mt="spacing-xxxxs"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              variant="body"
              color={isEmailVerified ? 'primary800' : 'primary500'}
              numberOfLines={1}
              testID="email"
            >
              {value}
            </Text>
          </Box>
        </Box>
        {!isEmailVerified ? (
          <Pressable testID="action-email" onPress={() => goTo('EmailVerify')}>
            <Text color="complementaryPumpkin600" variant="link">
              {i18n.t('myProfile-label-verify')}
            </Text>
          </Pressable>
        ) : isEditable && (
          <Text
            onPress={() => goTo('Email')}
            variant="Link14Medium"
            fontWeight="400"
            color="complementaryIndigo600"
            textDecorationLine="underline"
          >
            {i18n.t('button-label-edit')}
          </Text>
        )}
      </Box>
    ) : (
      <CardProfileSkeleton isVisible={isLoading} />
    )}
  </Box>
);

EmailData.defaultProps = {
  icon: undefined,
};

export default EmailData;
