import React, { useState } from 'react';
import type { CustomThemeColors, ThemePresetId } from '../../types/widget';
import { NOTION_LIGHT_PRESETS, NOTION_DARK_PRESETS } from '../../utils/themeUtils';
import './ColorCustomizer.css';

interface ColorCustomizerProps {
  colors: CustomThemeColors;
  onChangeColor: (key: keyof CustomThemeColors, value: string) => void;
  onSelectPreset: (colors: CustomThemeColors, themeId?: ThemePresetId) => void;
  onClose: () => void;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  colors,
  onChangeColor,
  onSelectPreset,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'light' | 'dark' | 'custom'>('light');

  return (
    <div className="om-color-customizer">
      <div className="om-customizer-header">
        <span className="om-customizer-title">Notion Theme Palette</span>
        <button
          type="button"
          className="om-customizer-close-btn"
          onClick={onClose}
          aria-label="Close color customizer"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="om-customizer-tabs">
        <button
          type="button"
          className={`om-tab-btn ${activeTab === 'light' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('light')}
        >
          Notion Light
        </button>
        <button
          type="button"
          className={`om-tab-btn ${activeTab === 'dark' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('dark')}
        >
          Notion Dark
        </button>
        <button
          type="button"
          className={`om-tab-btn ${activeTab === 'custom' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          Custom Wheels
        </button>
      </div>

      {/* Light Theme Presets */}
      {activeTab === 'light' && (
        <div className="om-customizer-section">
          <div className="om-preset-grid">
            {NOTION_LIGHT_PRESETS.map((preset) => {
              const themeId = preset.name.toLowerCase() as ThemePresetId;
              return (
                <button
                  key={preset.name}
                  type="button"
                  className="om-preset-swatch"
                  onClick={() => onSelectPreset(preset.colors, themeId)}
                  title={`Notion Light ${preset.name}`}
                >
                  <span
                    className="om-swatch-bg"
                    style={{ backgroundColor: preset.colors.bgApp }}
                  />
                  <span className="om-swatch-name" style={{ color: preset.colors.textMain }}>
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Dark Theme Presets */}
      {activeTab === 'dark' && (
        <div className="om-customizer-section">
          <div className="om-preset-grid">
            {NOTION_DARK_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                className="om-preset-swatch is-dark-swatch"
                onClick={() => onSelectPreset(preset.colors)}
                title={`Notion Dark ${preset.name}`}
                style={{ backgroundColor: preset.colors.bgApp, borderColor: preset.colors.textMain + '33' }}
              >
                <span
                  className="om-swatch-bg"
                  style={{ backgroundColor: preset.colors.bgCard }}
                />
                <span className="om-swatch-name" style={{ color: preset.colors.textMain }}>
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Wheel Pickers */}
      {activeTab === 'custom' && (
        <div className="om-customizer-section">
          <div className="om-color-pickers-row">
            {/* App Background */}
            <div className="om-color-picker-item">
              <label className="om-color-picker-badge" htmlFor="picker-bgApp">
                <input
                  id="picker-bgApp"
                  type="color"
                  className="om-color-input"
                  value={colors.bgApp}
                  onChange={(e) => onChangeColor('bgApp', e.target.value)}
                />
                <span
                  className="om-color-preview-dot"
                  style={{ backgroundColor: colors.bgApp }}
                />
              </label>
              <span className="om-color-picker-name">Background</span>
            </div>

            {/* Card Background */}
            <div className="om-color-picker-item">
              <label className="om-color-picker-badge" htmlFor="picker-bgCard">
                <input
                  id="picker-bgCard"
                  type="color"
                  className="om-color-input"
                  value={colors.bgCard}
                  onChange={(e) => onChangeColor('bgCard', e.target.value)}
                />
                <span
                  className="om-color-preview-dot"
                  style={{ backgroundColor: colors.bgCard }}
                />
              </label>
              <span className="om-color-picker-name">Card</span>
            </div>

            {/* Text Color */}
            <div className="om-color-picker-item">
              <label className="om-color-picker-badge" htmlFor="picker-textMain">
                <input
                  id="picker-textMain"
                  type="color"
                  className="om-color-input"
                  value={colors.textMain}
                  onChange={(e) => onChangeColor('textMain', e.target.value)}
                />
                <span
                  className="om-color-preview-dot"
                  style={{ backgroundColor: colors.textMain }}
                />
              </label>
              <span className="om-color-picker-name">Text</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
