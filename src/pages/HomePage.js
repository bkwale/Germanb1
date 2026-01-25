import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { dialogues, BADGES } from '../data/dialogues';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { streak, xp, progress, loading } = useApp();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const getCurrentBadge = () => {
    const earnedBadges = BADGES.filter(badge => xp >= badge.threshold);
    return earnedBadges[earnedBadges.length - 1] || BADGES[0];
  };

  const currentBadge = getCurrentBadge();

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Stats Header */}
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-number">{streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-box">
            <div className="stat-badge">{currentBadge.icon}</div>
            <div className="stat-label">{currentBadge.name}</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{xp}</div>
            <div className="stat-label">XP Points</div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="welcome-section">
          <h1 className="welcome-title">Ready to learn Berlin German?</h1>
          <p className="welcome-subtitle">
            Pick a scenario for today's 10-minute session
          </p>
        </div>

        {/* Dialogue Cards */}
        <div className="dialogues-container">
          {dialogues.map((dialogue) => {
            const isCompleted = progress.completedDialogues.includes(dialogue.id);
            return (
              <div
                key={dialogue.id}
                className="dialogue-card"
                onClick={() => navigate(`/lesson/${dialogue.id}`)}
              >
                <div className="dialogue-header">
                  <h3 className="dialogue-title">{dialogue.title}</h3>
                  {isCompleted && <span className="completed-badge">✓</span>}
                </div>
                <div className="dialogue-category">{dialogue.category}</div>
                <div className="dialogue-difficulty">Level: {dialogue.difficulty}</div>
                <div className="dialogue-exchanges">
                  {dialogue.exchanges.length} exchanges
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button
            className="nav-button"
            onClick={() => navigate('/progress')}
          >
            View Progress
          </button>
          <button
            className="nav-button secondary-button"
            onClick={() => navigate('/settings')}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
