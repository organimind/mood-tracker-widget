import type {
  MoodWidgetConfig,
  ThemePresetId,
  ThemePalette,
  WidgetStyle,
  WidgetLayout,
} from '../types/widget';

export const THEME_PRESETS: Record<ThemePresetId, ThemePalette> = {
  default: {
    bg: '#FBF9F5',
    card: '#FFFFFF',
    text: '#3A3735',
    accent: '#6E6862',
  },
  gray: {
    bg: '#EBECED',
    card: '#FFFFFF',
    text: '#9B9A97',
    accent: '#787774',
  },
  brown: {
    bg: '#E9E5E3',
    card: '#FFFFFF',
    text: '#64473A',
    accent: '#9F6B53',
  },
  orange: {
    bg: '#FAEBDD',
    card: '#FFFFFF',
    text: '#D9730D',
    accent: '#D9730D',
  },
  yellow: {
    bg: '#FBF3DB',
    card: '#FFFFFF',
    text: '#DFAB01',
    accent: '#CB912F',
  },
  green: {
    bg: '#DDEDEA',
    card: '#FFFFFF',
    text: '#0F7B6C',
    accent: '#0F7B6C',
  },
  blue: {
    bg: '#DDEBF1',
    card: '#FFFFFF',
    text: '#0B6E99',
    accent: '#0B6E99',
  },
  purple: {
    bg: '#EAE4F2',
    card: '#FFFFFF',
    text: '#6940A5',
    accent: '#A78BFA',
  },
  pink: {
    bg: '#F4DFEB',
    card: '#FFFFFF',
    text: '#AD1A72',
    accent: '#DD5D93',
  },
  red: {
    bg: '#FBE4E4',
    card: '#FFFFFF',
    text: '#E03E3E',
    accent: '#E03E3E',
  },
};

export const DEFAULT_CONFIG: MoodWidgetConfig = {
  theme: 'default',
  bg: THEME_PRESETS.default.bg,
  card: THEME_PRESETS.default.card,
  text: THEME_PRESETS.default.text,
  accent: THEME_PRESETS.default.accent,
  style: 'organic',
  layout: 'centered',
};

export const VALID_THEMES: ThemePresetId[] = [
  'default',
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
];

export const VALID_STYLES: WidgetStyle[] = ['minimal', 'organic', 'zen', 'editorial'];
export const VALID_LAYOUTS: WidgetLayout[] = ['centered', 'compact', 'wide'];

/**
 * Normalizes and validates HEX color strings.
 * Supports values like: "#FFFFFF", "%23FFFFFF", "FFFFFF", "#FFF", "FFF".
 * Returns uppercase hex with leading '#' or null if invalid.
 */
export const sanitizeHexColor = (val: string | null | undefined): string | null => {
  if (!val) return null;
  let cleaned = val.trim();
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch (e) {
    // Ignore URI error and proceed with raw value
  }
  cleaned = cleaned.replace(/^#+/, '').replace(/^%23/i, '');

  if (/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
    return `#${cleaned.toUpperCase()}`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(cleaned)) {
    const expanded = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
    return `#${expanded.toUpperCase()}`;
  }
  return null;
};

/**
 * Central URL parsing & config calculation following priority:
 * URL parameters > Theme preset > Application defaults
 * 
 * Supports backward compatible aliases:
 * bgApp -> bg
 * bgCard -> card
 * textMain -> text
 * (New parameter wins if both present)
 */
export const parseUrlConfig = (searchQuery?: string): MoodWidgetConfig => {
  const search = searchQuery ?? window.location.search;
  const params = new URLSearchParams(search);

  // 1. Resolve theme preset
  const rawTheme = params.get('theme')?.toLowerCase() as ThemePresetId | null;
  const theme: ThemePresetId =
    rawTheme && VALID_THEMES.includes(rawTheme) ? rawTheme : 'default';

  const themePreset = THEME_PRESETS[theme] || THEME_PRESETS.default;

  // 2. Resolve colors (URL params win over theme preset; new params win over old aliases)
  const rawBgParam = params.has('bg') ? params.get('bg') : params.get('bgApp');
  const rawCardParam = params.has('card') ? params.get('card') : params.get('bgCard');
  const rawTextParam = params.has('text') ? params.get('text') : params.get('textMain');
  const rawAccentParam = params.get('accent');

  const bg = sanitizeHexColor(rawBgParam) ?? themePreset.bg;
  const card = sanitizeHexColor(rawCardParam) ?? themePreset.card;
  const text = sanitizeHexColor(rawTextParam) ?? themePreset.text;
  const accent = sanitizeHexColor(rawAccentParam) ?? themePreset.accent;

  // 3. Resolve style
  const rawStyle = params.get('style')?.toLowerCase() as WidgetStyle | null;
  const style: WidgetStyle =
    rawStyle && VALID_STYLES.includes(rawStyle) ? rawStyle : 'organic';

  // 4. Resolve layout
  const rawLayout = params.get('layout')?.toLowerCase() as WidgetLayout | null;
  const layout: WidgetLayout =
    rawLayout && VALID_LAYOUTS.includes(rawLayout) ? rawLayout : 'centered';

  // 5. Optional title override
  const rawTitle = params.get('title');
  const title = rawTitle?.trim() || undefined;

  return {
    theme,
    bg,
    card,
    text,
    accent,
    style,
    layout,
    title,
  };
};

/**
 * Applies the calculated MoodWidgetConfig to document elements and CSS variables.
 */
export const applyWidgetConfig = (config: MoodWidgetConfig): void => {
  const root = document.documentElement;

  root.setAttribute('data-theme', config.theme);
  root.setAttribute('data-style', config.style);
  root.setAttribute('data-layout', config.layout);

  root.style.setProperty('--om-bg-app', config.bg);
  root.style.setProperty('--om-bg-card', config.card);
  root.style.setProperty('--om-text-main', config.text);
  root.style.setProperty('--om-accent', config.accent);

  // Derived variables for smooth typography/borders matching main text color
  root.style.setProperty('--om-text-muted', `${config.text}AA`);
  root.style.setProperty('--om-border', `${config.text}1A`);
  root.style.setProperty('--om-border-hover', `${config.text}33`);
};

/**
 * Generates URL query parameters for a given MoodWidgetConfig
 * and updates browser history using replaceState without page reloads.
 */
export const updateUrlParams = (config: MoodWidgetConfig): void => {
  const params = new URLSearchParams();

  // 1. Theme preset (if not default)
  if (config.theme && config.theme !== 'default') {
    params.set('theme', config.theme);
  }

  const preset = THEME_PRESETS[config.theme] || THEME_PRESETS.default;

  // 2. Colors: check if colors differ from active theme preset or default
  const sanitizedBg = sanitizeHexColor(config.bg) || preset.bg;
  const sanitizedCard = sanitizeHexColor(config.card) || preset.card;
  const sanitizedText = sanitizeHexColor(config.text) || preset.text;
  const sanitizedAccent = sanitizeHexColor(config.accent) || preset.accent;

  const isCustomBg = sanitizedBg.toUpperCase() !== preset.bg.toUpperCase();
  const isCustomCard = sanitizedCard.toUpperCase() !== preset.card.toUpperCase();
  const isCustomText = sanitizedText.toUpperCase() !== preset.text.toUpperCase();
  const isCustomAccent = sanitizedAccent.toUpperCase() !== preset.accent.toUpperCase();

  if (isCustomBg) params.set('bg', sanitizedBg);
  if (isCustomCard) params.set('card', sanitizedCard);
  if (isCustomText) params.set('text', sanitizedText);
  if (isCustomAccent) params.set('accent', sanitizedAccent);

  // If theme is default and colors are customized without theme preset
  if (config.theme === 'default') {
    if (sanitizedBg.toUpperCase() !== THEME_PRESETS.default.bg.toUpperCase() && !params.has('bg')) {
      params.set('bg', sanitizedBg);
    }
    if (sanitizedCard.toUpperCase() !== THEME_PRESETS.default.card.toUpperCase() && !params.has('card')) {
      params.set('card', sanitizedCard);
    }
    if (sanitizedText.toUpperCase() !== THEME_PRESETS.default.text.toUpperCase() && !params.has('text')) {
      params.set('text', sanitizedText);
    }
    if (sanitizedAccent.toUpperCase() !== THEME_PRESETS.default.accent.toUpperCase() && !params.has('accent')) {
      params.set('accent', sanitizedAccent);
    }
  }

  // 3. Style (if non-default 'organic')
  if (config.style && config.style !== 'organic') {
    params.set('style', config.style);
  }

  // 4. Layout (if non-default 'centered')
  if (config.layout && config.layout !== 'centered') {
    params.set('layout', config.layout);
  }

  // 5. Title (if present)
  if (config.title) {
    params.set('title', config.title);
  }

  const queryString = params.toString();
  const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

  window.history.replaceState(null, '', newUrl);
};
