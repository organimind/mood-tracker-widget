import type { MoodId, MoodState } from '../types/mood';
import type { CustomThemeColors } from '../types/widget';

const MOOD_STORAGE_KEY = 'organimind_mood_widget_state';
const COLOR_STORAGE_KEY = 'organimind_mood_widget_colors';

export const getStoredMoodState = (): MoodState => {
  try {
    const raw = localStorage.getItem(MOOD_STORAGE_KEY);
    if (!raw) return { selectedMood: null, updatedAt: null };
    const parsed = JSON.parse(raw);
    return {
      selectedMood: parsed.selectedMood || null,
      updatedAt: parsed.updatedAt || null,
    };
  } catch (e) {
    console.warn('OrganiMind: Unable to access localStorage', e);
    return { selectedMood: null, updatedAt: null };
  }
};

export const saveMoodState = (mood: MoodId | null): void => {
  try {
    const state: MoodState = {
      selectedMood: mood,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('OrganiMind: Unable to save to localStorage', e);
  }
};

export const getStoredCustomColors = (): CustomThemeColors | null => {
  try {
    const raw = localStorage.getItem(COLOR_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const saveStoredCustomColors = (colors: CustomThemeColors): void => {
  try {
    localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(colors));
  } catch (e) {
    console.warn('OrganiMind: Unable to save custom colors', e);
  }
};
