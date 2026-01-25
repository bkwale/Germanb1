import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { dialogues } from '../data/dialogues';
import audioService from '../services/audioService';
import SessionTimer from '../components/SessionTimer';
import './LessonPage.css';

export default function LessonPage() {
  const { dialogueId } = useParams();
  const navigate = useNavigate();
  const { addExchangeXP, completeDialogue, settings } = useApp();

  const dialogue = dialogues.find(d => d.id === parseInt(dialogueId));
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlayingNative, setIsPlayingNative] = useState(false);

  const currentExchange = dialogue?.exchanges[currentExchangeIndex];
  const totalExchanges = dialogue?.exchanges.length || 0;
  const isLearnerTurn = currentExchange?.speaker === 'learner';

  useEffect(() => {
    return () => {
      audioService.cleanup();
    };
  }, []);

  const handlePlayNativeAudio = async () => {
    if (isPlayingNative) return;

    try {
      setIsPlayingNative(true);
      await audioService.speakGerman(
        currentExchange.german,
        settings.audioSpeed
      );
      setTimeout(() => setIsPlayingNative(false), 2000);
    } catch (error) {
      alert('Failed to play audio');
      setIsPlayingNative(false);
    }
  };

  const handleStartRecording = async () => {
    try {
      await audioService.startRecording();
      setIsRecording(true);
      setRecordingUri(null);
      setHasRecorded(false);
    } catch (error) {
      alert('Failed to start recording. Please check microphone permissions.');
    }
  };

  const handleStopRecording = async () => {
    try {
      const uri = await audioService.stopRecording();
      setIsRecording(false);
      setRecordingUri(uri);
      setHasRecorded(true);
    } catch (error) {
      alert('Failed to stop recording');
      setIsRecording(false);
    }
  };

  const handlePlayRecording = async () => {
    if (!recordingUri) return;

    try {
      await audioService.playRecording(recordingUri);
    } catch (error) {
      alert('Failed to play recording');
    }
  };

  const handleNext = async () => {
    // Award XP for completing this exchange
    await addExchangeXP();

    if (currentExchangeIndex < totalExchanges - 1) {
      setCurrentExchangeIndex(prev => prev + 1);
      setRecordingUri(null);
      setHasRecorded(false);
    } else {
      // Dialogue complete
      await completeDialogue(dialogueId);
      navigate(`/session-complete/${dialogueId}`);
    }
  };

  if (!dialogue) {
    return (
      <div className="lesson-container">
        <div className="error-text">Dialogue not found</div>
      </div>
    );
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <SessionTimer />
        <div className="progress-text">
          {currentExchangeIndex + 1} / {totalExchanges}
        </div>
      </div>

      <div className="lesson-content">
        {/* Dialogue Display */}
        <div className="dialogue-box">
          <div className="speaker-label">
            <span className="speaker-text">
              {isLearnerTurn ? 'YOUR TURN' : 'LISTEN'}
            </span>
          </div>

          <div
            className="german-text-container"
            onClick={handlePlayNativeAudio}
            style={{ cursor: isPlayingNative ? 'default' : 'pointer' }}
          >
            <div className="german-text">{currentExchange.german}</div>
            <div className="audio-hint">
              {isPlayingNative ? '🔊 Playing...' : '🔊 Tap to hear'}
            </div>
          </div>

          <div className="english-text">{currentExchange.english}</div>
        </div>

        {/* Tips Section */}
        <div className="tips-container">
          <div className="tips-title">Tips:</div>
          {currentExchange.tips.map((tip, index) => (
            <div key={index} className="tip-text">
              • {tip}
            </div>
          ))}
        </div>

        {/* Recording Controls - Only show for learner turns */}
        {isLearnerTurn && (
          <div className="recording-section">
            <div className="recording-title">Practice Speaking</div>

            {!isRecording && !hasRecorded && (
              <button
                className="record-button"
                onClick={handleStartRecording}
              >
                🎤 Start Recording
              </button>
            )}

            {isRecording && (
              <button
                className="record-button stop-button"
                onClick={handleStopRecording}
              >
                ⏹ Stop Recording
              </button>
            )}

            {hasRecorded && recordingUri && (
              <div className="playback-controls">
                <button
                  className="playback-button"
                  onClick={handlePlayRecording}
                >
                  ▶️ Play My Recording
                </button>
                <button
                  className="playback-button"
                  onClick={handlePlayNativeAudio}
                >
                  ▶️ Play Native
                </button>
                <button
                  className="re-record-button"
                  onClick={handleStartRecording}
                >
                  🔄 Record Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        <button
          className={`next-button ${(isLearnerTurn && !hasRecorded) ? 'next-button-disabled' : ''}`}
          onClick={handleNext}
          disabled={isLearnerTurn && !hasRecorded}
        >
          {currentExchangeIndex < totalExchanges - 1 ? 'Next Exchange →' : 'Complete Session ✓'}
        </button>
      </div>
    </div>
  );
}
