import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../../components/ui/WidgetCard';
import type { MoodId } from '../../types/mood';
import type { CustomThemeColors } from '../../types/widget';
import { getStoredMoodState, saveMoodState, getStoredCustomColors, saveStoredCustomColors } from '../../utils/storage';
import { parseQueryParams, applyWidgetTheme, applyCustomThemeColors, DEFAULT_COLORS } from '../../utils/themeUtils';
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
  const [colors, setColors] = useState<CustomThemeColors>(DEFAULT_COLORS);

  useEffect(() => {
    // Read persisted mood state on load
    const savedState = getStoredMoodState();
    if (savedState.selectedMood) {
      setSelectedMood(savedState.selectedMood);
    }

    // Read saved custom colors from storage
    const savedColors = getStoredCustomColors();
    
    // Read URL query parameters for customization
    const params = parseQueryParams();
    if (params.theme) {
      applyWidgetTheme(params.theme);
    }
    if (params.title) {
      setTitle(params.title);
      setSubtitle('');
    }

    // Determine initial colors (URL params priority over localStorage)
    const initialColors: CustomThemeColors = {
      bgApp: params.bgApp || savedColors?.bgApp || DEFAULT_COLORS.bgApp,
      bgCard: params.bgCard || savedColors?.bgCard || DEFAULT_COLORS.bgCard,
      textMain: params.textMain || savedColors?.textMain || DEFAULT_COLORS.textMain,
    };

    setColors(initialColors);
    applyCustomThemeColors(initialColors);
  }, []);

  const handleSelectMood = (moodId: MoodId) => {
    const newMood = selectedMood === moodId ? null : moodId;
    setSelectedMood(newMood);
    saveMoodState(newMood);
  };

  const handleChangeColor = (key: keyof CustomThemeColors, value: string) => {
    const updated = { ...colors, [key]: value };
    setColors(updated);
    applyCustomThemeColors(updated);
    saveStoredCustomColors(updated);
  };

  const handleSelectPreset = (presetColors: CustomThemeColors) => {
    setColors(presetColors);
    applyCustomThemeColors(presetColors);
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
