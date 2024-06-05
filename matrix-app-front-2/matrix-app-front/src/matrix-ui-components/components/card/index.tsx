import React from 'react';
import { Box } from 'src/matrix-ui-components';
import { StyleSheet, Platform } from 'react-native';

export const Card = ({
  children, styledDisable, marginHorizontal, ...props
}: any) => {
  const StylesCard = StyleSheet.create({
    default: {
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: Platform.OS === 'android' && 10,
    },
  });
  const verifyPropsStyle = Object.keys(props).length === 0;
  return (
    <Box
      style={verifyPropsStyle ? StylesCard.default : { ...StylesCard.default, ...props }}
      height="auto"
      borderColor={styledDisable ? 'primaryLigth' : 'disable'}
      borderWidth={1}
      shadowColor="black"
      backgroundColor={styledDisable ? 'secundaryDisable' : 'white'}
      marginHorizontal={marginHorizontal}
      marginBottom="spacing-m"
      paddingHorizontal="spacing-xs"
      paddingVertical="spacing-s"
    >
      {children}
    </Box>
  );
};

export default Card;
