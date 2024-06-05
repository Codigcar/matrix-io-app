import React from 'react';
import { Animated, GestureResponderEvent } from 'react-native';
import { createText } from '@shopify/restyle';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { AnalyticsProps } from 'src/types/types';
import type { Theme } from '../../theme/themes';

const TextBase = createText<Theme>();

export interface TextProps extends React.ComponentProps<typeof TextBase>, AnalyticsProps {}

export const Text: React.FC<TextProps> = ({ onPress, analytics, ...props }) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (analytics !== false) {
      logVirtualEventAnalytics({
        tipoEvento: 'Click',
        tipoElemento: 'Link',
        valor: typeof props.children === 'string' ? props.children : undefined,
        ...(typeof analytics === 'object' ? analytics : {}),
      });
    }
    onPress?.(event);
  };
  return <TextBase {...props} {...(onPress && { onPress: handlePress })} />;
};

export type TText = typeof TextBase;

export const AnimatedText = Animated.createAnimatedComponent(TextBase);
