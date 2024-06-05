import React, { FC } from 'react';
import { fonts } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { RFValue } from 'react-native-responsive-fontsize';
import Box from '../box';
import { Text } from '../text';

interface Props {
  mood?: string;
  amount?: string;
  fontWeight?: string;
  fontSize?: number;
}
const Tag: FC<Props> = ({ mood, amount, fontWeight = '500', fontSize = RFValue(12) }) => {
  const virtualTagColor = mood === 'Virtual' ? 'complementaryCandy500' : 'complementaryOcean500';
  const bgColor = amount ? 'complementaryIndigo500' : virtualTagColor;
  const textToShow = amount ?? mood;

  return (
    <Box
      alignItems="center"
      backgroundColor={bgColor}
      borderRadius={18}
      paddingVertical="spacing-xxxs"
      paddingHorizontal="spacing-xxs"
    >
      <Text
        fontSize={fontSize}
        color="primary000"
        fontFamily={fonts.outfitRegular}
        fontWeight={fontWeight}
      >
        {textToShow}
      </Text>
    </Box>
  );
};

export default Tag;
