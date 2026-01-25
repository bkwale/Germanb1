import React from 'react';
import { useApp } from '../contexts/AppContext';
import { BADGES } from '../data/dialogues';
import './ProgressPage.css';

export default function ProgressPage() {
  const { streak, xp, progress, weeklyStats } = useApp();

  const getCurrentBadge = () => {
    const earnedBadges = BADGES.filter(badge => xp >= badge.threshold);
    return earnedBadges[earnedBadges.length - 1] || BADGES[0];
  };

  const getNextBadge = () => {
    return BADGES.find(badge => xp < badge.threshold);
  };

  const currentBadge = getCurrentBadge();
  const nextBadge = getNextBadge();
  const progressToNext = nextBadge ? ((xp - currentBadge.threshold) / (nextBadge.threshold - currentBadge.threshold)) * 100 : 100;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="progress-container">
      <div className="progress-content">
        {/* Current Stats */}
        <div className="section">
          <div className="section-title">Your Stats</div>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{xp}</div>
              <div className="stat-label">Total XP</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{progress.completedDialogues.length}</div>
              <div className="stat-label">Dialogues Done</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{progress.vocabularyCount || 0}</div>
              <div className="stat-label">Words Learned</div>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="section">
          <div className="section-title">This Week</div>
          <div className="weekly-chart">
            {dayNames.map((day, index) => (
              <div key={index} className="day-column">
                <div
                  className={`day-bar ${weeklyStats.days[index] ? 'day-bar-active' : ''}`}
                />
                <div className="day-label">{day}</div>
              </div>
            ))}
          </div>
          <div className="weekly-subtext">
            {weeklyStats.days.filter(d => d).length} days active this week
          </div>
        </div>

        {/* Badge Progress */}
        <div className="section">
          <div className="section-title">Current Badge</div>
          <div className="badge-display">
            <div className="current-badge-icon">{currentBadge.icon}</div>
            <div className="current-badge-name">{currentBadge.name}</div>
            <div className="badge-xp">{currentBadge.threshold} XP</div>
          </div>

          {nextBadge && (
            <>
              <div className="progress-label">
                Next: {nextBadge.name} ({nextBadge.threshold} XP)
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                />
              </div>
              <div className="progress-text">
                {nextBadge.threshold - xp} XP to go
              </div>
            </>
          )}
        </div>

        {/* All Badges */}
        <div className="section">
          <div className="section-title">All Badges</div>
          <div className="all-badges">
            {BADGES.map((badge) => {
              const isEarned = xp >= badge.threshold;
              return (
                <div
                  key={badge.id}
                  className={`badge-card ${!isEarned ? 'badge-card-locked' : ''}`}
                >
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-name">{badge.name}</div>
                  <div className="badge-threshold">{badge.threshold} XP</div>
                  {isEarned && <div className="earned-check">✓</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
