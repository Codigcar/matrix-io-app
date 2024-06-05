import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Box, colors, useTheme } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';

const ANIMATION_DURATION = 750;
const DELAY = 400;

interface SafeAreaBottomTabScreenProps {
  children: React.ReactNode;
}

export const SafeAreaBottomTabScreen: React.FC<SafeAreaBottomTabScreenProps> = ({ children }) => (
  <ThemeProvider theme={rebrandingTheme}>
    <Box flex={1} paddingBottom="spacing-ml">
      <Box flex={1} paddingBottom="spacing-xxxm">
        {children}
      </Box>
    </Box>
  </ThemeProvider>
);

const WrapAnimation = ({
  children,
  style,
  accountCanceled,
}: {
  children: React.ReactNode;
  style: Object;
  accountCanceled: boolean;
}) => {
  const opacity = useSharedValue(0);
  const slideUp = useSharedValue(100);
  const startFadeAnimation = useCallback(() => {
    opacity.value = withDelay(DELAY, withTiming(1, { duration: ANIMATION_DURATION }));
    slideUp.value = withDelay(DELAY, withTiming(1, { duration: ANIMATION_DURATION }));
  }, [opacity, slideUp]);
  useEffect(() => {
    startFadeAnimation();
  }, [startFadeAnimation]);
  const viewStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: slideUp.value,
      },
    ],
  }));
  const { spacing } = useTheme();
  return (
    <Animated.View style={[viewStyles, { display: style?.display }]}>
      <Box
        flexDirection="row"
        backgroundColor="primary1000"
        height={spacing['spacing-ml']}
        paddingHorizontal="spacing-xxs"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        borderRadius={50}
        justifyContent="center"
        alignItems="center"
        marginHorizontal={!accountCanceled ? 'spacing-xs' : 'spacing-xl'}
        marginBottom="spacing-xxxm"
      >
        {children}
      </Box>
    </Animated.View>
  );
};

const CustomTabBar = (props: BottomTabBarProps, accountCanceled: boolean) => {
  const { state, descriptors, navigation } = props;
  const focusedRoute = state.routes.find((route, index) => state.index === index);
  let style: any;
  if (focusedRoute) style = descriptors[focusedRoute.key].options.tabBarStyle;

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <WrapAnimation style={style} accountCanceled={accountCanceled}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const { tabBarIcon } = options;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const key = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : String(index);
          return (
            <Box flex={1} alignItems="center" key={key}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                {tabBarIcon?.({
                  focused: isFocused,
                  color: isFocused ? colors.white : colors.bottomTabIcon,
                  size: 25,
                })}
              </TouchableOpacity>
            </Box>
          );
        })}
      </WrapAnimation>
    </ThemeProvider>
  );
};

export default CustomTabBar;
