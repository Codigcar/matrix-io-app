import * as React from 'react';
import type { ReactElement } from 'react';
import { ThemeProvider as ThemeProviderRS, useTheme as useThemeRS } from '@shopify/restyle';
import { theme, Theme } from './themes';
import { RebrandingTheme } from './themes/rebranding-theme';

interface ThemeProviderProps {
  children?: ReactElement;
}

export const useTheme: () => Theme & RebrandingTheme = useThemeRS;

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <ThemeProviderRS theme={theme}>{children}</ThemeProviderRS>
);
