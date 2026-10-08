import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Palette,
  Paintbrush,
  Sun,
  Moon,
  Copy,
  Check,
  RefreshCw,
  AppWindow,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import {
  type ThemePreset,
  NOTION_LIGHT_THEMES,
  NOTION_DARK_THEMES,
  NOTION_EMBED_STEPS,
} from '../data/moodTrackerConstants';
import './CustomizePage.css';

export const CustomizePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('light-default');
  const [colors, setColors] = useState({
    bg: '#FBF9F5',
    card: '#FFFFFF',
    text: '#3A3735',
    accent: '#8B5CF6',
  });
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Single Source of Truth for Widget URL generation
  const widgetUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('bg', colors.bg.replace(/^#/, ''));
    params.set('card', colors.card.replace(/^#/, ''));
    params.set('text', colors.text.replace(/^#/, ''));
    params.set('accent', colors.accent.replace(/^#/, ''));

    const origin = window.location.origin;
    let pathname = window.location.pathname.replace(/\/customize\/?$/, '');
    if (!pathname.endsWith('/')) {
      pathname += '/';
    }

    return `${origin}${pathname}?${params.toString()}`;
  }, [colors]);

  const handleSelectTheme = (theme: ThemePreset) => {
    setSelectedThemeId(theme.id);
    setColors({ ...theme.colors });
  };

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value.toUpperCase() }));
    setSelectedThemeId('custom');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(widgetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleGoBack = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname.replace(/\/customize\/?$/, '') || '/';
    window.location.href = `${origin}${pathname}`;
  };

  const currentPresetList = activeTab === 'light' ? NOTION_LIGHT_THEMES : NOTION_DARK_THEMES;

  return (
    <div className="customize-page-root">
      <div className="customize-container">

        {/* Generator Main Layout: 2 Columns */}
        <div className="generator-grid">
          {/* Column 1: Customization Panel */}
          <div className="panel-col">
            <div className="card-panel">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <Sliders className="icon-purple" size={18} />
                  <h2>Customization Panel</h2>
                </div>
                <span className="badge-mono">Real-time preview</span>
              </div>

              {/* 1. Theme Presets (Light & Dark Tabs) */}
              <div className="section-group">
                <div className="section-top-row">
                  <label className="section-title">
                    <Palette size={14} /> Presets & Themes
                  </label>

                  <div className="tabs-pill">
                    <button
                      type="button"
                      onClick={() => setActiveTab('light')}
                      className={`tab-btn ${activeTab === 'light' ? 'active' : ''}`}
                    >
                      <Sun size={14} />
                      <span>Notion Light</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('dark')}
                      className={`tab-btn ${activeTab === 'dark' ? 'active' : ''}`}
                    >
                      <Moon size={14} />
                      <span>Notion Dark</span>
                    </button>
                  </div>
                </div>

                {/* Swatches Grid */}
                <div className="swatches-grid">
                  {currentPresetList.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleSelectTheme(theme)}
                        className={`swatch-btn ${isSelected ? 'selected' : ''}`}
                      >
                        <div className="swatch-dots">
                          <span
                            className="dot"
                            style={{ backgroundColor: theme.colors.bg }}
                          />
                          <span
                            className="dot"
                            style={{ backgroundColor: theme.colors.card }}
                          />
                          <span
                            className="dot"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                        <span className="swatch-name">{theme.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Color Controls */}
              <div className="section-group pt-divider">
                <label className="section-title justify-between">
                  <span className="flex-center">
                    <Paintbrush size={14} /> Color Palette
                  </span>
                  {selectedThemeId === 'custom' && (
                    <span className="badge-custom">Custom Theme Active</span>
                  )}
                </label>

                <div className="colors-grid">
                  {/* Background */}
                  <div className="color-item">
                    <div className="color-left">
                      <label className="color-swatch-picker">
                        <input
                          type="color"
                          value={colors.bg}
                          onChange={(e) => handleColorChange('bg', e.target.value)}
                        />
                        <span
                          className="swatch-box"
                          style={{ backgroundColor: colors.bg }}
                        />
                      </label>
                      <div>
                        <p className="color-label">Background</p>
                        <p className="color-key">`bg`</p>
                      </div>
                    </div>
                    <span className="color-hex-tag">{colors.bg}</span>
                  </div>

                  {/* Card */}
                  <div className="color-item">
                    <div className="color-left">
                      <label className="color-swatch-picker">
                        <input
                          type="color"
                          value={colors.card}
                          onChange={(e) => handleColorChange('card', e.target.value)}
                        />
                        <span
                          className="swatch-box"
                          style={{ backgroundColor: colors.card }}
                        />
                      </label>
                      <div>
                        <p className="color-label">Card</p>
                        <p className="color-key">`card`</p>
                      </div>
                    </div>
                    <span className="color-hex-tag">{colors.card}</span>
                  </div>

                  {/* Text */}
                  <div className="color-item">
                    <div className="color-left">
                      <label className="color-swatch-picker">
                        <input
                          type="color"
                          value={colors.text}
                          onChange={(e) => handleColorChange('text', e.target.value)}
                        />
                        <span
                          className="swatch-box"
                          style={{ backgroundColor: colors.text }}
                        />
                      </label>
                      <div>
                        <p className="color-label">Text</p>
                        <p className="color-key">`text`</p>
                      </div>
                    </div>
                    <span className="color-hex-tag">{colors.text}</span>
                  </div>

                  {/* Accent */}
                  <div className="color-item">
                    <div className="color-left">
                      <label className="color-swatch-picker">
                        <input
                          type="color"
                          value={colors.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                        />
                        <span
                          className="swatch-box"
                          style={{ backgroundColor: colors.accent }}
                        />
                      </label>
                      <div>
                        <p className="color-label">Accent</p>
                        <p className="color-key">`accent`</p>
                      </div>
                    </div>
                    <span className="color-hex-tag">{colors.accent}</span>
                  </div>
                </div>
              </div>

              {/* 3. Primary Action & Generated URL Display */}
              <div className="url-section">
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="btn-copy-url"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-emerald" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy Widget URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Live Preview & Notion Instructions */}
          <div className="preview-col">
            <div className="preview-card">
              <div className="notion-window-header">
                <div className="window-dots-wrap">
                  <div className="dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="window-title">
                    <AppWindow size={14} /> Notion Page Preview
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIframeKey((prev) => prev + 1)}
                  className="btn-reload-iframe"
                  title="Reload preview"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              <div className="iframe-stage">
                <div className="iframe-wrapper">
                  <iframe
                    key={iframeKey}
                    src={widgetUrl}
                    title="Live Mood Tracker Widget Preview"
                    className="preview-iframe"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            
             {/* Notion Step-by-Step Instructions */}
              <div className="instructions-card">
                <div className="instructions-header">
                  <HelpCircle className="instructions-icon" size={16} />
                  <h3>Add to Notion</h3>
                </div>

                <ol className="steps-grid">
                  {NOTION_EMBED_STEPS.map((s) => (
                    <li key={s.step} className={`step-item ${s.bgClass || ''}`}>
                      <span className="step-num">{s.step}</span>
                      <span className="step-text">
                        {s.prefixText}
                        {s.boldText && <strong>{s.boldText}</strong>}
                        {s.code && <code>{s.code}</code>}
                        {s.suffixText}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
