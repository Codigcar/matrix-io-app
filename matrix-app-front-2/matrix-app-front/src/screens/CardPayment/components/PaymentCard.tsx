/* eslint-disable react/require-default-props */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from 'matrix-ui-components';
import Trash from 'assets/icons/svgs/trash';
import { SvgProps } from 'react-native-svg';

type PaymentCardProps = {
  number: string;
  type: string;
  isSelected: boolean;
  icon: (props: SvgProps) => JSX.Element;
  width: number;
  onRemovePress?: () => void;
  isOnlyCard?: boolean;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  number,
  type,
  isSelected,
  icon,
  width,
  onRemovePress,
  isOnlyCard,
}) => (
  <Box style={{ width }} mb="spacing-s">
    <Box
      flexDirection="row"
      borderColor={isSelected || isOnlyCard ? 'complementaryIndigo500' : 'primary300'}
      borderWidth={2}
      borderRadius={18}
      backgroundColor={isSelected || isOnlyCard ? 'complementaryIndigo050' : 'primary300'}
      alignItems="center"
      justifyContent="space-between"
      p="spacing-s"
    >
      {icon && (
        <Box backgroundColor="white" padding="spacing-s" borderRadius={15}>
          {icon({ width: 50, height: 28, color: '#172274' })}
        </Box>
      )}

      <Box flex={1} px="spacing-s">
        <Text variant="body14Medium" numberOfLines={1}>
          {number}
        </Text>
        <Text variant="body12">{type}</Text>
      </Box>
      <TouchableOpacity onPress={onRemovePress}>
        <Box
          width={40}
          height={40}
          borderRadius={40}
          backgroundColor={isSelected || isOnlyCard ? 'complementaryIndigo100' : 'primary400'}
          alignItems="center"
          justifyContent="center"
        >
          <Trash width={24} height={24} />
        </Box>
      </TouchableOpacity>
    </Box>
  </Box>
);

PaymentCard.defaultProps = {
  onRemovePress: undefined,
};

export default PaymentCard;
