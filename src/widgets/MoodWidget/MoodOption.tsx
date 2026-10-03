import React from 'react';
import type { MoodConfig } from '../../types/mood';
import './MoodOption.css';

interface MoodOptionProps {
  config: MoodConfig;
  isSelected: boolean;
  onSelect: (id: MoodConfig['id']) => void;
}

export const MoodOption: React.FC<MoodOptionProps> = ({ config, isSelected, onSelect }) => {
  const BlobComponent = config.icon;

  return (
    <button
      type="button"
      className={`om-mood-option ${isSelected ? 'is-selected' : ''}`}
      data-mood={config.id}
      onClick={() => onSelect(config.id)}
      aria-pressed={isSelected}
      aria-label={`Select mood ${config.label}`}
    >
      <div className="om-mood-blob-wrapper">
        <BlobComponent size={46} className="om-mood-blob-svg" />
      </div>
      <span className="om-mood-option-label">{config.label}</span>
    </button>
  );
};
