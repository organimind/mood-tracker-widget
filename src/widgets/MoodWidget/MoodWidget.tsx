import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../../components/ui/WidgetCard';
import type { MoodId } from '../../types/mood';
import type { MoodWidgetConfig } from '../../types/widget';
import { getStoredMoodState, saveMoodState, getStoredCustomColors } from '../../utils/storage';
import { parseUrlConfig, applyWidgetConfig } from '../../utils/urlConfig';
import { MOOD_OPTIONS } from './moodConfig';
import { MoodSelector } from './MoodSelector';
import { MoodFeedback } from './MoodFeedback';
import { SettingsIcon } from '../../components/ui/Icons';
import './MoodWidget.css';

export const MoodWidget: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null);
  const [subtitle, setSubtitle] = useState<string>('In this moment,');
  const [title, setTitle] = useState<string>('how do you feel?');

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

    applyWidgetConfig(finalConfig);

    if (config.title) {
      setTitle(config.title);
      setSubtitle('');
    }
  }, []);

  const handleSelectMood = (moodId: MoodId) => {
    const newMood = selectedMood === moodId ? null : moodId;
    setSelectedMood(newMood);
    saveMoodState(newMood);
  };

  const selectedConfig = MOOD_OPTIONS.find((m) => m.id === selectedMood) || null;

  // Hide settings icon inside any preview window (iframe) or preview mode
  const isIframe = typeof window !== 'undefined' && window.self !== window.top;
  const searchParams = new URLSearchParams(window.location.search);
  const hideSettings = isIframe || searchParams.get('hideSettings') === 'true' || searchParams.get('preview') === 'true';

  return (
    <WidgetCard className="om-mood-widget">
      <header className="om-mood-widget-header">
        <div className="om-mood-widget-toprow">
          <div className="om-mood-widget-brand">
            <span className="om-brand-dot" />
            <span className="om-brand-name">OrganiMind</span>
          </div>

          {!hideSettings && (
            <a
              href="/mood-tracker-widget/customize"
              className="om-settings-btn"
              title="OrganiMind Settings & Customization"
              aria-label="OrganiMind Settings"
            >
              <SettingsIcon size={15} />
            </a>
          )}
        </div>

        {subtitle && <p className="om-mood-widget-subtitle">{subtitle}</p>}
        <h1 className="om-mood-widget-title">{title}</h1>
      </header>

      <MoodSelector
        options={MOOD_OPTIONS}
        selectedMood={selectedMood}
        onSelect={handleSelectMood}
      />

      <MoodFeedback selectedMoodConfig={selectedConfig} />
    </WidgetCard>
  );
};

export default MoodWidget;
