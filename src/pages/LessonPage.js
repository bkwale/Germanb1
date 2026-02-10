import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { dialogues } from '../data/dialogues';
import audioService from '../services/audioService';
import SessionTimer from '../components/SessionTimer';
import SkillProgressBar from '../components/SkillProgressBar';
import './LessonPage.css';

export default function LessonPage() {
  const { dialogueId } = useParams();
  const navigate = useNavigate();
  const { addExchangeXP, completeDialogue, settings, updateSkillLevel } = useApp();

  const dialogue = dialogues.find(d => d.id === parseInt(dialogueId));
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState(null);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlayingNative, setIsPlayingNative] = useState(false);

  // Speech recognition state
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

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

  const handleCheckPronunciation = async () => {
    if (!recordingUri) return;

    // Alert user to speak when prompted
    const confirmed = window.confirm(
      'Ready to check your pronunciation?\n\n' +
      'When you click OK, speak the German phrase clearly into your microphone.\n\n' +
      'The phrase is: ' + currentExchange.german
    );

    if (!confirmed) return;

    try {
      setIsRecognizing(true);
      const result = await audioService.recognizeSpeech(currentExchange.german);
      setRecognitionResult(result);
      setIsRecognizing(false);
    } catch (error) {
      alert(error.message || 'Speech recognition failed. Make sure you are using Chrome and allow microphone access.');
      setIsRecognizing(false);
    }
  };

  const getSimilarityColor = (similarity) => {
    if (similarity >= 80) return '#4CAF50'; // green
    if (similarity >= 60) return '#FF9800'; // orange
    return '#f44336'; // red
  };

  const handleNext = async () => {
    // Award XP for completing this exchange
    await addExchangeXP();

    if (currentExchangeIndex < totalExchanges - 1) {
      setCurrentExchangeIndex(prev => prev + 1);
      setRecordingUri(null);
      setHasRecorded(false);
      setRecognitionResult(null);
    } else {
      // Dialogue complete - show quiz
      setShowQuiz(true);
    }
  };

  const handleQuizAnswer = async (answerIndex) => {
    const currentQuestion = dialogue.quiz[currentQuizIndex];
    const isCorrect = answerIndex === currentQuestion.correct;

    setSelectedAnswer(answerIndex);
    setShowQuizFeedback(true);

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }

    // Wait 1.5 seconds to show feedback, then move to next question or finish
    setTimeout(async () => {
      if (currentQuizIndex < dialogue.quiz.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowQuizFeedback(false);
      } else {
        // Quiz complete - update skill level based on performance
        const finalScore = isCorrect ? quizScore + 1 : quizScore;
        const totalQuestions = dialogue.quiz.length;
        const avgPronunciation = recognitionResult?.similarity || 0;

        await updateSkillLevel(finalScore, totalQuestions, avgPronunciation);

        // Award bonus XP and navigate
        addExchangeXP(); // bonus for quiz completion
        completeDialogue(dialogueId);
        navigate(`/session-complete/${dialogueId}`);
      }
    }, 1500);
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
      <SkillProgressBar />

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
                <button
                  className="check-pronunciation-button"
                  onClick={handleCheckPronunciation}
                  disabled={isRecognizing}
                >
                  {isRecognizing ? '🎤 Listening...' : '🎤 Check Pronunciation (Speak Now)'}
                </button>
              </div>
            )}

            {/* Pronunciation Results */}
            {recognitionResult && (
              <div className="pronunciation-results">
                <div className="pronunciation-title">Pronunciation Check:</div>
                <div className="pronunciation-score" style={{ color: getSimilarityColor(recognitionResult.similarity) }}>
                  {recognitionResult.similarity}% Match
                </div>
                <div className="pronunciation-comparison">
                  <div className="pronunciation-row">
                    <span className="pronunciation-label">You said:</span>
                    <span className="pronunciation-text">{recognitionResult.recognized}</span>
                  </div>
                  <div className="pronunciation-row">
                    <span className="pronunciation-label">Expected:</span>
                    <span className="pronunciation-text">{recognitionResult.expected}</span>
                  </div>
                </div>
                {recognitionResult.similarity >= 80 && (
                  <div className="pronunciation-feedback success">🎉 Excellent pronunciation!</div>
                )}
                {recognitionResult.similarity >= 60 && recognitionResult.similarity < 80 && (
                  <div className="pronunciation-feedback good">👍 Good! Keep practicing!</div>
                )}
                {recognitionResult.similarity < 60 && (
                  <div className="pronunciation-feedback needs-work">💪 Try again - listen carefully to the native audio</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quiz Section */}
        {showQuiz && dialogue.quiz && dialogue.quiz.length > 0 && (
          <div className="quiz-section">
            <div className="quiz-header">
              <div className="quiz-title">📝 Quick Quiz</div>
              <div className="quiz-progress">
                Question {currentQuizIndex + 1} of {dialogue.quiz.length}
              </div>
            </div>

            <div className="quiz-question">
              {dialogue.quiz[currentQuizIndex].question}
            </div>

            <div className="quiz-options">
              {dialogue.quiz[currentQuizIndex].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === dialogue.quiz[currentQuizIndex].correct;
                const showResult = showQuizFeedback;

                let buttonClass = 'quiz-option';
                if (showResult && isCorrect) {
                  buttonClass += ' quiz-option-correct';
                } else if (showResult && isSelected && !isCorrect) {
                  buttonClass += ' quiz-option-wrong';
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showQuizFeedback}
                  >
                    {option}
                    {showResult && isCorrect && ' ✓'}
                    {showResult && isSelected && !isCorrect && ' ✗'}
                  </button>
                );
              })}
            </div>

            {showQuizFeedback && (
              <div className="quiz-score-display">
                Score: {quizScore} / {currentQuizIndex + 1}
              </div>
            )}
          </div>
        )}

        {/* Next Button - only show when not in quiz mode */}
        {!showQuiz && (
          <button
            className={`next-button ${(isLearnerTurn && !hasRecorded) ? 'next-button-disabled' : ''}`}
            onClick={handleNext}
            disabled={isLearnerTurn && !hasRecorded}
          >
            {currentExchangeIndex < totalExchanges - 1 ? 'Next Exchange →' : 'Complete Session ✓'}
          </button>
        )}
      </div>
    </div>
  );
}
