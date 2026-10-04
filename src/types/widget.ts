export type ThemePresetId =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';

export type WidgetStyle = 'minimal' | 'organic' | 'zen' | 'editorial';
export type WidgetLayout = 'centered' | 'compact' | 'wide';

export interface MoodWidgetConfig {
  theme: ThemePresetId;
  bg: string;
  card: string;
  text: string;
  accent: string;
  style: WidgetStyle;
  layout: WidgetLayout;
  title?: string;
}

export interface ThemePalette {
  bg: string;
  card: string;
  text: string;
  accent: string;
}

// Retained for backward compatibility with existing components
export type ThemeId = 'cream' | 'dark' | 'lavender' | 'sage' | ThemePresetId;

export interface WidgetThemeConfig {
  id: ThemeId;
  name: string;
  bg: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  shadow: string;
}

export interface CustomThemeColors {
  bgApp: string;
  bgCard: string;
  textMain: string;
}

export interface WidgetQueryParams {
  theme?: string;
  title?: string;
  accent?: string;
  bg?: string;
  card?: string;
  text?: string;
  style?: string;
  layout?: string;
  bgApp?: string;
  bgCard?: string;
  textMain?: string;
}
