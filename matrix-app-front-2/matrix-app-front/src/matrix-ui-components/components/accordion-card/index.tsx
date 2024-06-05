import React, { useState } from 'react';
import { Box, Text, fonts } from 'src/matrix-ui-components';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import ArrowSquareDown from 'assets/svgs/arrow-square-down.svg';
import { android } from 'src/utils/constants';

export const AccordionCard = ({
  title,
  children,
  styledDisable,
  marginHorizontal,
  ...props
}: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const StylesCard = StyleSheet.create({
    default: {
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: android && 10,
    },
  });
  const verifyPropsStyle = Object.keys(props).length === 0;
  return (
    <Box
      style={verifyPropsStyle ? StylesCard.default : { ...StylesCard.default, ...props }}
      height="auto"
      borderRadius={16}
      borderColor="gray100"
      borderWidth={1}
      shadowColor="black"
      backgroundColor="white"
      marginHorizontal={marginHorizontal}
      paddingHorizontal="spacing-s"
      paddingTop="spacing-m"
      paddingBottom="spacing-s"
    >
      <Box flexDirection="row" alignItems="center" justifyContent="space-between">
        <Text
          textAlign="left"
          variant="body"
          fontFamily={fonts.euclidCircularSemibold}
          fontSize={16}
          lineHeight={16}
        >
          {title}
        </Text>
        <Pressable
          onPress={() => setIsVisible(!isVisible)}
          style={{
            transform: [
              {
                rotateZ: isVisible ? '0deg' : '180deg',
              },
            ],
          }}
        >
          <ArrowSquareDown />
        </Pressable>
      </Box>
      {isVisible && children}
    </Box>
  );
};

export default AccordionCard;
