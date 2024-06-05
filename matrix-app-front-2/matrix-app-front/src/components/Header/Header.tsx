import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box, fonts, Text, colors, useTheme,
} from 'matrix-ui-components';
import BackHeader from 'src/components/BackHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenWidth } from 'src/utils/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextProps } from 'src/matrix-ui-components/components/text';

export interface HeaderProps {
  color?: 'transparent' | 'secundaryDisable';
  goBack?: () => void;
  title?: string;
  textAlign?: TextProps['textAlign'];
  actions?: () => JSX.Element;
  theme?: 'dark' | 'light';
}

const Styles = StyleSheet.create({
  safeArea: {
    top: 0,
    left: 0,
    right: 0,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: RFValue(80),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: RFValue(10),
  },
});

const Header: React.FC<HeaderProps> = ({
  color = 'transparent',
  goBack,
  title,
  textAlign,
  actions,
  theme,
}) => {
  const { rebranding } = useTheme();
  const { top } = useSafeAreaInsets();

  if (rebranding) {
    return (
      <Box
        zIndex={3}
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        style={{
          paddingTop: top,
        }}
        backgroundColor={color === 'secundaryDisable' ? 'primary000' : 'transparent'}
      >
        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          mb={theme === 'dark' ? 'spacing-m' : 'spacing-none'}
        >
          <Box
            width="100%"
            mt="spacing-s"
            mb="spacing-xs"
            px="spacing-m"
            alignItems="center"
            flexDirection="row"
            zIndex={1}
          >
            <BackHeader onPress={goBack} theme={theme} />
            <Box flex={1} maxWidth="75%" mx="spacing-s">
              <Text
                textAlign={textAlign}
                variant="Heading18Medium"
                numberOfLines={1}
                color={theme !== 'dark' ? 'black' : 'primary000'}
              >
                {title}
              </Text>
            </Box>
            {actions ? (
              <Box flexDirection="row">
                {actions()}
              </Box>
            ) : null}
          </Box>
          {color !== 'transparent' ? (
            <Box
              position="absolute"
              bottom={0}
              width="100%"
              height={1}
              backgroundColor="primary200"
            />
          ) : null}
        </Box>
      </Box>
    );
  }

  return (
    <Box zIndex={3} style={[Styles.safeArea, { backgroundColor: colors[color] }]}>
      <Box position="absolute" zIndex={1} top={RFValue(43)} left={0}>
        <BackHeader marginLeft="spacing-m" onPress={goBack} />
      </Box>

      <Text
        textAlign="center"
        variant="H4"
        marginTop="spacing-s"
        numberOfLines={1}
        style={{ maxWidth: screenWidth * 0.7 }}
        fontFamily={fonts.euclidCircularSemibold}
      >
        {title}
      </Text>
    </Box>
  );
};

Header.defaultProps = {
  color: 'transparent',
  goBack: undefined,
  title: '',
  textAlign: 'center',
  actions: undefined,
  theme: 'light',
};

export default Header;
