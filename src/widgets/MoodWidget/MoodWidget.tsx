import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../../components/ui/WidgetCard';
import type { MoodId } from '../../types/mood';
import type { CustomThemeColors, MoodWidgetConfig, ThemePresetId } from '../../types/widget';
import { getStoredMoodState, saveMoodState, getStoredCustomColors, saveStoredCustomColors } from '../../utils/storage';
import { parseUrlConfig, applyWidgetConfig, updateUrlParams, DEFAULT_CONFIG } from '../../utils/urlConfig';
import { applyCustomThemeColors } from '../../utils/themeUtils';
import { MOOD_OPTIONS } from './moodConfig';
import { MoodSelector } from './MoodSelector';
import { MoodFeedback } from './MoodFeedback';
import { ColorCustomizer } from '../../components/ui/ColorCustomizer';
import './MoodWidget.css';

export const MoodWidget: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null);
  const [subtitle, setSubtitle] = useState<string>('In this moment,');
  const [title, setTitle] = useState<string>('how do you feel?');
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [widgetConfig, setWidgetConfig] = useState<MoodWidgetConfig>(DEFAULT_CONFIG);
  const [colors, setColors] = useState<CustomThemeColors>({
    bgApp: '#FBF9F5',
    bgCard: '#FFFFFF',
    textMain: '#3A3735',
  });

  useEffect(() => {
    // Read persisted mood state on load
    const savedState = getStoredMoodState();
    if (savedState.selectedMood) {
      setSelectedMood(savedState.selectedMood);
    }

    // Read URL query parameters for central configuration system
    const config: MoodWidgetConfig = parseUrlConfig();
    const hasUrlParams = window.location.search.length > 1;

    let finalBg = config.bg;
    let finalCard = config.card;
    let finalText = config.text;

    // Only fallback to localStorage if NO URL parameters are present at all
    if (!hasUrlParams) {
      const savedColors = getStoredCustomColors();
      if (savedColors) {
        finalBg = savedColors.bgApp || finalBg;
        finalCard = savedColors.bgCard || finalCard;
        finalText = savedColors.textMain || finalText;
      }
    }

    const finalConfig: MoodWidgetConfig = {
      ...config,
      bg: finalBg,
      card: finalCard,
      text: finalText,
    };

    setWidgetConfig(finalConfig);
    applyWidgetConfig(finalConfig);

    if (config.title) {
      setTitle(config.title);
      setSubtitle('');
    }

    setColors({
      bgApp: finalConfig.bg,
      bgCard: finalConfig.card,
      textMain: finalConfig.text,
    });
  }, []);

  const handleSelectMood = (moodId: MoodId) => {
    const newMood = selectedMood === moodId ? null : moodId;
    setSelectedMood(newMood);
    saveMoodState(newMood);
  };

  const handleChangeColor = (key: keyof CustomThemeColors, value: string) => {
    const updatedColors = { ...colors, [key]: value };
    setColors(updatedColors);

    const updatedConfig: MoodWidgetConfig = {
      ...widgetConfig,
      bg: updatedColors.bgApp,
      card: updatedColors.bgCard,
      text: updatedColors.textMain,
    };

    setWidgetConfig(updatedConfig);
    applyCustomThemeColors(updatedColors);
    updateUrlParams(updatedConfig);
    saveStoredCustomColors(updatedColors);
  };

  const handleSelectPreset = (presetColors: CustomThemeColors, themeId?: ThemePresetId) => {
    setColors(presetColors);

    const updatedConfig: MoodWidgetConfig = {
      ...widgetConfig,
      theme: themeId || 'default',
      bg: presetColors.bgApp,
      card: presetColors.bgCard,
      text: presetColors.textMain,
    };

    setWidgetConfig(updatedConfig);
    applyCustomThemeColors(presetColors);
    updateUrlParams(updatedConfig);
    saveStoredCustomColors(presetColors);
  };

  const selectedConfig = MOOD_OPTIONS.find((m) => m.id === selectedMood) || null;

  return (
    <WidgetCard className="om-mood-widget">
      <header className="om-mood-widget-header">
        <div className="om-mood-widget-toprow">
          <div className="om-mood-widget-brand">
            <span className="om-brand-dot" />
            <span className="om-brand-name">OrganiMind</span>
          </div>
          <button
            type="button"
            className="om-theme-toggle-btn"
            onClick={() => setShowCustomizer(!showCustomizer)}
            title="Customize Theme Colors"
            aria-label="Customize theme colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.44-.18-.85-.47-1.16-.27-.29-.44-.7-.44-1.21 0-.92.78-1.67 1.7-1.67H17c2.76 0 5-2.24 5-5 0-4.42-4.03-8.03-10-8.03z"/>
            </svg>
          </button>
        </div>

        {subtitle && <p className="om-mood-widget-subtitle">{subtitle}</p>}
        <h1 className="om-mood-widget-title">{title}</h1>
      </header>

      {showCustomizer && (
        <ColorCustomizer
          colors={colors}
          onChangeColor={handleChangeColor}
          onSelectPreset={handleSelectPreset}
          onClose={() => setShowCustomizer(false)}
        />
      )}

      <MoodSelector
        options={MOOD_OPTIONS}
        selectedMood={selectedMood}
        onSelect={handleSelectMood}
      />

      <MoodFeedback selectedMoodConfig={selectedConfig} />
    </WidgetCard>
  );
};
