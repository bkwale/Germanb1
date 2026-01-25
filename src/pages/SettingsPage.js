import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import storageService from '../services/storageService';
import './SettingsPage.css';

export default function SettingsPage() {
  const { settings, updateSettings } = useApp();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggle = (key) => {
    const newSettings = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleSpeedChange = (speed) => {
    const newSettings = { ...localSettings, audioSpeed: speed };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleDifficultyChange = (difficulty) => {
    const newSettings = { ...localSettings, difficulty };
    setLocalSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleResetData = () => {
    const confirmed = window.confirm(
      'Are you sure? This will delete all your progress, streaks, and XP. This cannot be undone.'
    );

    if (confirmed) {
      storageService.clearAll().then(() => {
        alert('All data has been reset. Please reload the page.');
        window.location.reload();
      });
    }
  };

  const speedOptions = [
    { value: 0.75, label: 'Slow' },
    { value: 1.0, label: 'Normal' },
    { value: 1.25, label: 'Fast' },
  ];

  const difficultyOptions = ['A1', 'A2', 'B1'];

  return (
    <div className="settings-container">
      <div className="settings-content">
        {/* Berlin Dialect */}
        <div className="section">
          <div className="section-title">Language Settings</div>

          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-label">Berlin Dialect</div>
              <div className="setting-description">
                Include Berlin-specific pronunciation and slang
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={localSettings.berlinDialect}
                onChange={() => handleToggle('berlinDialect')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Audio Speed */}
        <div className="section">
          <div className="section-title">Audio Speed</div>
          <div className="button-group">
            {speedOptions.map((option) => (
              <button
                key={option.value}
                className={`option-button ${localSettings.audioSpeed === option.value ? 'option-button-active' : ''}`}
                onClick={() => handleSpeedChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div className="section">
          <div className="section-title">Difficulty Level</div>
          <div className="button-group">
            {difficultyOptions.map((level) => (
              <button
                key={level}
                className={`option-button ${localSettings.difficulty === level ? 'option-button-active' : ''}`}
                onClick={() => handleDifficultyChange(level)}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="help-text">
            A1: Beginner • A2: Elementary • B1: Intermediate
          </div>
        </div>

        {/* Dark Mode */}
        <div className="section">
          <div className="section-title">Appearance</div>

          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-label">Dark Mode</div>
              <div className="setting-description">
                Easier on the eyes (coming soon)
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={localSettings.darkMode}
                onChange={() => handleToggle('darkMode')}
                disabled={true}
              />
              <span className="slider disabled"></span>
            </label>
          </div>
        </div>

        {/* About Section */}
        <div className="section">
          <div className="section-title">About</div>
          <div className="about-text">
            Berlin German Learning Tool v1.0<br />
            Built for ADHD-friendly learning<br /><br />
            Focus on 10-15 minute daily sessions with real Berlin conversations.
          </div>
        </div>

        {/* Reset Button */}
        <button
          className="reset-button"
          onClick={handleResetData}
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}
