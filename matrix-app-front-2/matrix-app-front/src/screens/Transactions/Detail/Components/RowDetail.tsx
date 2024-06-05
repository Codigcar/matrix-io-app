import React from 'react';
import {
  Box, Text,
} from 'matrix-ui-components';

const RowDetail:React.FC<{
  icon?: React.FC;
  label?: string;
  value?: string;
  hideBottomBorder?: boolean;
}> = ({
  icon: Icon = null, label = '', value = '', hideBottomBorder,
}) => (
  <Box alignItems="center" flexDirection="row" py="spacing-xs">
    {
      Icon
        ? (
          <Box mr="spacing-xs">
            <Icon />
          </Box>
        )
        : <Box />
    }
    <Box flex={1}>
      <Text variant="body" color="primary1000">
        {label}
      </Text>
    </Box>
    <Text variant="body" color="primary500">
      {value}
    </Text>
    {
      !hideBottomBorder ? (
        <Box
          position="absolute"
          borderColor="primary300"
          width="100%"
          height={1}
          left={0}
          bottom={0}
          right={0}
          borderStyle="dashed"
          borderWidth={1}
        />
      ) : <Box />
    }
  </Box>
);

RowDetail.defaultProps = {
  icon: undefined,
  label: '',
  value: '',
  hideBottomBorder: false,
};

export default RowDetail;
