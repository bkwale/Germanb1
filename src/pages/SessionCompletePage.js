import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import SkillProgressBar from '../components/SkillProgressBar';
import './SessionCompletePage.css';

export default function SessionCompletePage() {
  const navigate = useNavigate();
  const { completeSession } = useApp();
  const [sessionData, setSessionData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const finishSession = async () => {
      const data = await completeSession();
      setSessionData(data);
    };

    finishSession();
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount to prevent infinite XP loop

  const handleContinue = () => {
    navigate('/');
  };

  const handleViewProgress = () => {
    navigate('/progress');
  };

  if (!sessionData) {
    return (
      <div className="session-complete-container">
        <div className="loading-text">Calculating results...</div>
      </div>
    );
  }

  return (
    <div className="session-complete-container">
      <SkillProgressBar />

      <div className={`session-complete-content ${isVisible ? 'visible' : ''}`}>
        {/* Celebration Header */}
        <div className="emoji">🎉</div>
        <h1 className="title">Session Complete!</h1>
        <p className="subtitle">Great work on your Berlin German!</p>

        {/* Stats Display */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-emoji">🔥</div>
            <div className="stat-number">{sessionData.newStreak}</div>
            <div className="stat-label">Day Streak</div>
          </div>

          <div className="stat-card">
            <div className="stat-emoji">⭐</div>
            <div className="stat-number">+{sessionData.earnedXP}</div>
            <div className="stat-label">XP Earned</div>
          </div>

          <div className="stat-card">
            <div className="stat-emoji">💪</div>
            <div className="stat-number">{sessionData.newXP}</div>
            <div className="stat-label">Total XP</div>
          </div>
        </div>

        {/* Streak Bonus Message */}
        {sessionData.newStreak > 1 && (
          <div className="bonus-message">
            <div className="bonus-text">
              {sessionData.newStreak} days in a row! Keep it up!
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="motivation-box">
          <div className="motivation-text">
            {getMotivationalMessage(sessionData.newStreak)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-container">
          <button
            className="primary-button"
            onClick={handleContinue}
          >
            Back to Home
          </button>

          <button
            className="secondary-button"
            onClick={handleViewProgress}
          >
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
}

function getMotivationalMessage(streak) {
  if (streak === 1) return "You've started your journey. One day at a time!";
  if (streak < 3) return "Building momentum! Come back tomorrow!";
  if (streak < 7) return "You're on fire! Consistency is key!";
  if (streak < 14) return "Eine Woche geschafft! (One week done!)";
  if (streak < 30) return "Du bist super! Keep going!";
  return "Wahnsinn! (Amazing!) You're a Berlin German pro!";
}
