export type ThemeId = 'cream' | 'dark' | 'lavender' | 'sage';

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
  theme?: ThemeId;
  title?: string;
  accent?: string;
  bgApp?: string;
  bgCard?: string;
  textMain?: string;
}
