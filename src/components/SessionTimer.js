import React, { useState, useEffect } from 'react';
import './SessionTimer.css';

const SessionTimer = ({ onBreakSuggested }) => {
  const [seconds, setSeconds] = useState(0);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [breakShown, setBreakShown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show break suggestion at 10 minutes (600 seconds)
    if (seconds === 600 && !breakShown) {
      setShowBreakModal(true);
      setBreakShown(true);
      if (onBreakSuggested) {
        onBreakSuggested();
      }
    }
  }, [seconds, breakShown, onBreakSuggested]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    setShowBreakModal(false);
  };

  const getTimerColor = () => {
    if (seconds < 600) return '#27AE60'; // Green for first 10 mins
    if (seconds < 900) return '#F39C12'; // Orange for 10-15 mins
    return '#E74C3C'; // Red after 15 mins
  };

  return (
    <>
      <div className="session-timer-container">
        <div className="timer" style={{ color: getTimerColor() }}>
          {formatTime(seconds)}
        </div>
      </div>

      {showBreakModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Time for a quick stretch?</h2>
            <p className="modal-text">
              You've been learning for 10 minutes. Taking a short break helps with focus!
            </p>
            <button
              className="continue-button"
              onClick={handleContinue}
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionTimer;
