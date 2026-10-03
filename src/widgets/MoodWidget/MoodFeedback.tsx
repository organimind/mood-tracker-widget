import React, { useEffect, useState } from 'react';
import type { MoodConfig } from '../../types/mood';
import './MoodFeedback.css';

interface MoodFeedbackProps {
  selectedMoodConfig: MoodConfig | null;
}

export const MoodFeedback: React.FC<MoodFeedbackProps> = ({ selectedMoodConfig }) => {
  const [animating, setAnimating] = useState(false);
  const [displayConfig, setDisplayConfig] = useState<MoodConfig | null>(selectedMoodConfig);

  useEffect(() => {
    if (selectedMoodConfig?.id !== displayConfig?.id) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setDisplayConfig(selectedMoodConfig);
        setAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [selectedMoodConfig, displayConfig]);

  if (!displayConfig) {
    return (
      <div className="om-mood-feedback is-empty">
        <p className="om-mood-feedback-placeholder">Tap a mood character above to record your vibe.</p>
      </div>
    );
  }

  const BlobAvatar = displayConfig.icon;

  return (
    <div className={`om-mood-feedback ${animating ? 'is-animating' : ''}`}>
      <div className="om-mood-feedback-avatar">
        <BlobAvatar size={36} />
      </div>
      <div className="om-mood-feedback-content">
        <div className="om-mood-feedback-badge">
          <span>Feeling </span>
          <strong className="om-mood-feedback-label">{displayConfig.label}</strong>
        </div>
        <p className="om-mood-feedback-quote">
          “{displayConfig.response}”
        </p>
      </div>
    </div>
  );
};
