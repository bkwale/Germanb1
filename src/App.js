import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AppProvider } from './contexts/AppContext';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import SessionCompletePage from './pages/SessionCompletePage';
import MeetingPage from './pages/MeetingPage';
import InstallPrompt from './components/InstallPrompt';
import './App.css';

function App() {
  // Load voices for text-to-speech
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lesson/:dialogueId" element={<LessonPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/session-complete/:dialogueId" element={<SessionCompletePage />} />
            <Route path="/meeting" element={<MeetingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <InstallPrompt />
        </div>
        <Analytics />
      </Router>
    </AppProvider>
  );
}

export default App;
