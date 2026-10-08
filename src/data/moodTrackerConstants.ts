export type ThemePreset = {
  id: string;
  name: string;
  category: 'light' | 'dark';
  colors: {
    bg: string;
    card: string;
    text: string;
    accent: string;
  };
};

export type NotionStep = {
  step: number;
  prefixText: string;
  boldText: string;
  suffixText?: string;
  code?: string;
  bgClass: string;
};

export const NOTION_LIGHT_THEMES: ThemePreset[] = [
  {
    id: 'light-default',
    name: 'Default Light',
    category: 'light',
    colors: { bg: '#FBF9F5', card: '#FFFFFF', text: '#3A3735', accent: '#8B5CF6' },
  },
  {
    id: 'light-gray',
    name: 'Notion Gray',
    category: 'light',
    colors: { bg: '#F1F1EF', card: '#FFFFFF', text: '#37352F', accent: '#787774' },
  },
  {
    id: 'light-brown',
    name: 'Notion Brown',
    category: 'light',
    colors: { bg: '#F4EEEE', card: '#FFFFFF', text: '#443229', accent: '#9F6B53' },
  },
  {
    id: 'light-orange',
    name: 'Notion Orange',
    category: 'light',
    colors: { bg: '#FBECDD', card: '#FFFFFF', text: '#49290E', accent: '#D9730D' },
  },
  {
    id: 'light-yellow',
    name: 'Notion Yellow',
    category: 'light',
    colors: { bg: '#FBF3DB', card: '#FFFFFF', text: '#403101', accent: '#CB912F' },
  },
  {
    id: 'light-green',
    name: 'Notion Green',
    category: 'light',
    colors: { bg: '#EDF3EC', card: '#FFFFFF', text: '#1D3B2E', accent: '#448361' },
  },
  {
    id: 'light-blue',
    name: 'Notion Blue',
    category: 'light',
    colors: { bg: '#E7F3F8', card: '#FFFFFF', text: '#183B4E', accent: '#337EA9' },
  },
  {
    id: 'light-purple',
    name: 'Notion Purple',
    category: 'light',
    colors: { bg: '#F4F0F7', card: '#FFFFFF', text: '#412D52', accent: '#9065B0' },
  },
  {
    id: 'light-pink',
    name: 'Notion Pink',
    category: 'light',
    colors: { bg: '#F9F0F5', card: '#FFFFFF', text: '#4E2C3C', accent: '#C14C8A' },
  },
  {
    id: 'light-red',
    name: 'Notion Red',
    category: 'light',
    colors: { bg: '#FDEBEC', card: '#FFFFFF', text: '#5C1D24', accent: '#D44C47' },
  },
];

export const NOTION_DARK_THEMES: ThemePreset[] = [
  {
    id: 'dark-default',
    name: 'Default Dark',
    category: 'dark',
    colors: { bg: '#191919', card: '#202020', text: '#D4D4D4', accent: '#8B5CF6' },
  },
  {
    id: 'dark-gray',
    name: 'Notion Gray',
    category: 'dark',
    colors: { bg: '#252525', card: '#2F2F2F', text: '#9B9B9B', accent: '#787774' },
  },
  {
    id: 'dark-brown',
    name: 'Notion Brown',
    category: 'dark',
    colors: { bg: '#2F2723', card: '#3A302B', text: '#C4A393', accent: '#9F6B53' },
  },
  {
    id: 'dark-orange',
    name: 'Notion Orange',
    category: 'dark',
    colors: { bg: '#34251E', card: '#402F26', text: '#D7986C', accent: '#D9730D' },
  },
  {
    id: 'dark-yellow',
    name: 'Notion Yellow',
    category: 'dark',
    colors: { bg: '#352C1E', card: '#423625', text: '#CAAA61', accent: '#CB912F' },
  },
  {
    id: 'dark-green',
    name: 'Notion Green',
    category: 'dark',
    colors: { bg: '#1D2B26', card: '#253630', text: '#7BA98B', accent: '#448361' },
  },
  {
    id: 'dark-blue',
    name: 'Notion Blue',
    category: 'dark',
    colors: { bg: '#1D282E', card: '#25323A', text: '#6299B7', accent: '#337EA9' },
  },
  {
    id: 'dark-purple',
    name: 'Notion Purple',
    category: 'dark',
    colors: { bg: '#28212B', card: '#322A36', text: '#9D7DBA', accent: '#9065B0' },
  },
  {
    id: 'dark-pink',
    name: 'Notion Pink',
    category: 'dark',
    colors: { bg: '#2E2028', card: '#392832', text: '#C2739F', accent: '#C14C8A' },
  },
  {
    id: 'dark-red',
    name: 'Notion Red',
    category: 'dark',
    colors: { bg: '#302021', card: '#3C2829', text: '#C46D6E', accent: '#D44C47' },
  },
];

export const NOTION_EMBED_STEPS: NotionStep[] = [
  {
    step: 1,
    prefixText: 'Click ',
    boldText: 'Copy Widget URL',
    suffixText: ' button.',
    bgClass: 'step-bg-1',
  },
  {
    step: 2,
    prefixText: 'Open your ',
    boldText: 'Notion workspace',
    suffixText: ' page.',
    bgClass: 'step-bg-2',
  },
  {
    step: 3,
    prefixText: 'Type ',
    boldText: '',
    code: '/embed',
    suffixText: ' and press Enter.',
    bgClass: 'step-bg-3',
  },
  {
    step: 4,
    prefixText: 'Paste the copied URL and click ',
    boldText: 'Embed Link',
    suffixText: '.',
    bgClass: 'step-bg-4',
  },
];
