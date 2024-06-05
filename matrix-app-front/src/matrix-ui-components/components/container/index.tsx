import { useTheme } from 'matrix-ui-components';
import React, { FC, useState } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ScrollViewProps,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import Header, { HeaderProps } from 'src/components/Header/Header';
import { RFValue } from 'react-native-responsive-fontsize';
import { ios, screenWidth } from 'src/utils/constants';
import { SvgProps } from 'react-native-svg';
import { BackgroundDark } from 'assets/images';
import { Box } from '../box';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
  },
  paddingContainer: {
    height: RFValue(5),
  },
  scroll: {
    flexGrow: 1,
  },
});

interface ContainerProps {
  imageBackground?: ImageSourcePropType | 'none';
  withInput?: boolean;
  hasGradient?: boolean;
  isHeaderVisible?: boolean;
  goBackNavigate?: () => void;
  headerTitle?: string;
  headerProps?: HeaderProps;
  isScrollable?: boolean;
  handleMomentumScrollEnd?: () => void;
  isHeaderTransparent?: boolean;
  behavior?: 'padding' | 'position' | 'height' | undefined;
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
  scrollRef?: any;
  showHeaderBackground?: boolean;
  background?: FC<SvgProps>;
  backgroundStatusBar?: string;
  actions?: () => JSX.Element;
  theme?: 'dark' | 'light';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  imageBackground,
  withInput,
  hasGradient,
  isHeaderVisible,
  goBackNavigate,
  headerTitle,
  headerProps,
  isScrollable,
  handleMomentumScrollEnd,
  isHeaderTransparent,
  behavior = ios ? 'padding' : undefined,
  keyboardShouldPersistTaps,
  scrollRef,
  showHeaderBackground,
  background: BackgroundIcon,
  backgroundStatusBar,
  actions,
  theme,
}) => {
  const [colorHeader, setColorHeader] = useState<'transparent' | 'secundaryDisable'>('transparent');
  const { colors, rebranding } = useTheme();
  if (!imageBackground && !BackgroundIcon) {
    return <SafeAreaView style={Styles.container}>{children}</SafeAreaView>;
  }
  return (
    <>
      <CustomStatusBar
        theme={theme === 'dark' ? 'light' : 'dark'}
        backgroundColor={backgroundStatusBar}
      />

      {hasGradient && (
        <LinearGradient
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          style={StyleSheet.absoluteFill}
          colors={[colors.bottomBackground, colors.topBackground]}
        />
      )}
      {imageBackground !== 'none' && imageBackground && (
        <ImageBackground
          source={imageBackground}
          style={StyleSheet.absoluteFill}
          resizeMode="stretch"
        />
      )}
      {theme === 'dark' && (
        <ImageBackground
          source={BackgroundDark}
          style={StyleSheet.absoluteFill}
          resizeMode="stretch"
        />
      )}
      {BackgroundIcon && (
        <Box
          position="absolute"
          bottom={0}
          top={0}
          right={0}
          left={0}
          flex={1}
          height="100%"
          width="100%"
          overflow="hidden"
        >
          <View
            style={{
              marginTop: Platform.select({
                ios: 0,
                android: -38,
              }),
            }}
          >
            <BackgroundIcon
              height="100%"
              width="100%"
              preserveAspectRatio="none"
              pointerEvents="none"
            />
          </View>
        </Box>
      )}
      <View style={Styles.container}>
        <KeyboardAvoidingView enabled={withInput} style={Styles.container} behavior={behavior}>
          {isHeaderVisible && (
            <Header
              color={showHeaderBackground ? 'secundaryDisable' : colorHeader}
              goBack={goBackNavigate}
              title={headerTitle}
              actions={actions}
              theme={theme}
              {...headerProps}
            />
          )}
          {isScrollable ? (
            <ScrollView
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={Styles.scroll}
              contentInsetAdjustmentBehavior="automatic"
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              onScroll={(event) => {
                const { y } = event.nativeEvent.contentOffset;
                const verticalScrolling = y;

                if (verticalScrolling >= 3 && !isHeaderTransparent) {
                  setColorHeader('secundaryDisable');
                } else setColorHeader('transparent');
              }}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              bounces={false}
              ref={scrollRef}
            >
              {isHeaderVisible && <View style={!rebranding && Styles.paddingContainer} />}
              {children}
            </ScrollView>
          ) : (
            <>
              {isHeaderVisible && <View style={!rebranding && Styles.paddingContainer} />}
              {children}
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
Container.defaultProps = {
  isHeaderVisible: false,
  isScrollable: false,
  hasGradient: true,
  imageBackground: undefined,
  withInput: undefined,
  goBackNavigate: undefined,
  headerTitle: undefined,
  headerProps: undefined,
  handleMomentumScrollEnd: undefined,
  isHeaderTransparent: undefined,
  behavior: undefined,
  keyboardShouldPersistTaps: undefined,
  scrollRef: undefined,
  background: undefined,
  backgroundStatusBar: 'transparent',
  actions: undefined,
  theme: 'light',
  showHeaderBackground: undefined,
};
export default Container;
