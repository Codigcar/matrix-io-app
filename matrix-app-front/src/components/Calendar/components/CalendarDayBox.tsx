import { Box } from 'matrix-ui-components';
import React, { ReactChildren } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { ios } from 'src/utils/constants';
import { s } from 'src/utils/sizes';

interface CalendarDayBoxProps {
  bgColor: 'primary1000' | 'primary100' | 'transparent';
  children?: React.ReactChild;
}

const CalendarDayBox = (props: CalendarDayBoxProps) => {
  const { children, bgColor } = props;

  return (
    <Box
      width={s(40)}
      height={s(40)}
      borderRadius={s(20)}
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
      marginVertical="spacing-xxxs"
    >
      {children}
    </Box>
  );
};

export default CalendarDayBox;
