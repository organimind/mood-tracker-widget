import React from 'react';
import type { BlobProps } from '../components/ui/BlobCharacters';

export type MoodId = 'great' | 'good' | 'okay' | 'low' | 'stressed';

export interface MoodConfig {
  id: MoodId;
  label: string;
  icon: React.ComponentType<BlobProps>;
  response: string;
  accent: string;
  softBg: string;
}

export interface MoodState {
  selectedMood: MoodId | null;
  updatedAt: string | null;
}
