import React from 'react';
import type { MoodConfig, MoodId } from '../../types/mood';
import { MoodOption } from './MoodOption';
import './MoodSelector.css';

interface MoodSelectorProps {
  options: MoodConfig[];
  selectedMood: MoodId | null;
  onSelect: (id: MoodId) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ options, selectedMood, onSelect }) => {
  return (
    <div className="om-mood-selector-grid" role="group" aria-label="Mood selection">
      {options.map((option) => (
        <MoodOption
          key={option.id}
          config={option}
          isSelected={selectedMood === option.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
