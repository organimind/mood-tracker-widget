import type { ThemeId, WidgetQueryParams, CustomThemeColors } from '../types/widget';
import { parseUrlConfig } from './urlConfig';

export const DEFAULT_COLORS: CustomThemeColors = {
  bgApp: '#FBF9F5',
  bgCard: '#FFFFFF',
  textMain: '#3A3735',
};

export interface NotionPreset {
  name: string;
  colors: CustomThemeColors;
}

export const NOTION_LIGHT_PRESETS: NotionPreset[] = [
  { name: 'Default', colors: { bgApp: '#FBF9F5', bgCard: '#FFFFFF', textMain: '#3A3735' } },
  { name: 'Gray', colors: { bgApp: '#EBECED', bgCard: '#FFFFFF', textMain: '#9B9A97' } },
  { name: 'Brown', colors: { bgApp: '#E9E5E3', bgCard: '#FFFFFF', textMain: '#64473A' } },
  { name: 'Orange', colors: { bgApp: '#FAEBDD', bgCard: '#FFFFFF', textMain: '#D9730D' } },
  { name: 'Yellow', colors: { bgApp: '#FBF3DB', bgCard: '#FFFFFF', textMain: '#DFAB01' } },
  { name: 'Green', colors: { bgApp: '#DDEDEA', bgCard: '#FFFFFF', textMain: '#0F7B6C' } },
  { name: 'Blue', colors: { bgApp: '#DDEBF1', bgCard: '#FFFFFF', textMain: '#0B6E99' } },
  { name: 'Purple', colors: { bgApp: '#EAE4F2', bgCard: '#FFFFFF', textMain: '#6940A5' } },
  { name: 'Pink', colors: { bgApp: '#F4DFEB', bgCard: '#FFFFFF', textMain: '#AD1A72' } },
  { name: 'Red', colors: { bgApp: '#FBE4E4', bgCard: '#FFFFFF', textMain: '#E03E3E' } },
];

export const NOTION_DARK_PRESETS: NotionPreset[] = [
  { name: 'Dark', colors: { bgApp: '#2F3437', bgCard: '#3F4447', textMain: '#FFFFFF' } },
  { name: 'Gray', colors: { bgApp: '#454B4E', bgCard: '#2F3437', textMain: '#979A9B' } },
  { name: 'Brown', colors: { bgApp: '#434040', bgCard: '#2F3437', textMain: '#937264' } },
  { name: 'Orange', colors: { bgApp: '#594A3A', bgCard: '#2F3437', textMain: '#FFA344' } },
  { name: 'Yellow', colors: { bgApp: '#59563B', bgCard: '#2F3437', textMain: '#FFDC49' } },
  { name: 'Green', colors: { bgApp: '#354C4B', bgCard: '#2F3437', textMain: '#4DAB9A' } },
  { name: 'Blue', colors: { bgApp: '#364954', bgCard: '#2F3437', textMain: '#529CCA' } },
  { name: 'Purple', colors: { bgApp: '#443F57', bgCard: '#2F3437', textMain: '#9A6DD7' } },
  { name: 'Pink', colors: { bgApp: '#533B4C', bgCard: '#2F3437', textMain: '#E255A1' } },
  { name: 'Red', colors: { bgApp: '#594141', bgCard: '#2F3437', textMain: '#FF7369' } },
];

export const parseQueryParams = (): WidgetQueryParams => {
  const config = parseUrlConfig();
  return {
    theme: config.theme,
    title: config.title,
    accent: config.accent,
    bg: config.bg,
    card: config.card,
    text: config.text,
    style: config.style,
    layout: config.layout,
    bgApp: config.bg,
    bgCard: config.card,
    textMain: config.text,
  };
};

export const applyWidgetTheme = (theme?: ThemeId): void => {
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
};

export const applyCustomThemeColors = (colors: Partial<CustomThemeColors>): void => {
  const root = document.documentElement;

  if (colors.bgApp) {
    root.style.setProperty('--om-bg-app', colors.bgApp);
  }
  if (colors.bgCard) {
    root.style.setProperty('--om-bg-card', colors.bgCard);
  }
  if (colors.textMain) {
    root.style.setProperty('--om-text-main', colors.textMain);
    // Derive subtle muted text color and border opacity from main text color
    root.style.setProperty('--om-text-muted', `${colors.textMain}AA`);
    root.style.setProperty('--om-border', `${colors.textMain}1A`);
    root.style.setProperty('--om-border-hover', `${colors.textMain}33`);
  }
};
