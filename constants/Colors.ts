/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const WHITE = '#ffffff';
export const BLACK = '#000000';

export const PRIMARY = {
  DEFAULT: '#f97316',
  LIGHT: '#fdba74',
  DARK: '#c2410c',
};

export const GRAY = {
  DARK: '#6b7280',
  LIGHT: '#e5e7eb',
  DEFAULT: '#d1d5db',
};

export const DANGER = {
  DEFAULT: '#ef4444',
  DARK: '#b91c1c',
  LIGHT: '#FCA5A5',
};
