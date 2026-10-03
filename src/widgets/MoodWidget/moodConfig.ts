import type { MoodConfig } from '../../types/mood';
import { GreatBlob, GoodBlob, OkayBlob, LowBlob, StressedBlob } from '../../components/ui/BlobCharacters';

export const MOOD_OPTIONS: MoodConfig[] = [
  {
    id: 'great',
    label: 'Great',
    icon: GreatBlob,
    response: 'Radiating energy and clear focus today.',
    accent: 'var(--om-mood-great-accent)',
    softBg: 'var(--om-mood-great-bg)',
  },
  {
    id: 'good',
    label: 'Good',
    icon: GoodBlob,
    response: 'Steady, grounded, and feeling positive.',
    accent: 'var(--om-mood-good-accent)',
    softBg: 'var(--om-mood-good-bg)',
  },
  {
    id: 'okay',
    label: 'Okay',
    icon: OkayBlob,
    response: 'Navigating the day with calm balance.',
    accent: 'var(--om-mood-okay-accent)',
    softBg: 'var(--om-mood-okay-bg)',
  },
  {
    id: 'low',
    label: 'Low',
    icon: LowBlob,
    response: 'Taking things slow. Be gentle with yourself.',
    accent: 'var(--om-mood-low-accent)',
    softBg: 'var(--om-mood-low-bg)',
  },
  {
    id: 'stressed',
    label: 'Stressed',
    icon: StressedBlob,
    response: 'Pause, take a deep breath, step by step.',
    accent: 'var(--om-mood-stressed-accent)',
    softBg: 'var(--om-mood-stressed-bg)',
  },
];
