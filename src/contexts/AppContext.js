import React, { createContext, useState, useContext, useEffect } from 'react';
import storageService from '../services/storageService';
import { XP_VALUES } from '../data/dialogues';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [progress, setProgress] = useState({
    completedDialogues: [],
    weakAreas: [],
    vocabularyCount: 0,
    skillLevel: 0,
    totalQuizScore: 0,
    totalQuizQuestions: 0
  });
  const [skillLevel, setSkillLevel] = useState(0);
  const [settings, setSettings] = useState({
    berlinDialect: true,
    audioSpeed: 1.0,
    difficulty: 'A1',
    darkMode: false
  });
  const [weeklyStats, setWeeklyStats] = useState({
    days: [false, false, false, false, false, false, false],
    startDate: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [loadedStreak, loadedXP, loadedProgress, loadedSettings, loadedWeekly] = await Promise.all([
        storageService.getStreak(),
        storageService.getXP(),
        storageService.getProgress(),
        storageService.getSettings(),
        storageService.getWeeklyStats()
      ]);

      setStreak(loadedStreak);
      setXp(loadedXP);
      setProgress(loadedProgress);
      setSettings(loadedSettings);
      setWeeklyStats(loadedWeekly);
      setSkillLevel(loadedProgress.skillLevel || 0);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeDialogue = async (dialogueId) => {
    try {
      await storageService.markDialogueComplete(dialogueId);
      const updatedProgress = await storageService.getProgress();
      setProgress(updatedProgress);

      // Award XP
      const newXP = await storageService.addXP(XP_VALUES.COMPLETE_DIALOGUE);
      setXp(newXP);
    } catch (error) {
      console.error('Error completing dialogue:', error);
    }
  };

  const completeSession = async () => {
    try {
      // Increment streak
      const newStreak = await storageService.incrementStreak();
      setStreak(newStreak);

      // Award session XP
      let sessionXP = XP_VALUES.COMPLETE_SESSION;
      if (newStreak > 0) {
        sessionXP += XP_VALUES.DAILY_STREAK;
      }

      const newXP = await storageService.addXP(sessionXP);
      setXp(newXP);

      // Update weekly stats
      await storageService.updateWeeklyStats();
      const updatedWeekly = await storageService.getWeeklyStats();
      setWeeklyStats(updatedWeekly);

      return { newStreak, newXP, earnedXP: sessionXP };
    } catch (error) {
      console.error('Error completing session:', error);
      return { newStreak: streak, newXP: xp, earnedXP: 0 };
    }
  };

  const addExchangeXP = async () => {
    try {
      const newXP = await storageService.addXP(XP_VALUES.COMPLETE_EXCHANGE);
      setXp(newXP);
      return newXP;
    } catch (error) {
      console.error('Error adding exchange XP:', error);
      return xp;
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      await storageService.saveSettings(newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const updateSkillLevel = async (quizScore, totalQuestions, pronunciationScore = 0) => {
    try {
      const newLevel = await storageService.updateSkillLevel(quizScore, totalQuestions, pronunciationScore);
      setSkillLevel(newLevel);
      const updatedProgress = await storageService.getProgress();
      setProgress(updatedProgress);
      return newLevel;
    } catch (error) {
      console.error('Error updating skill level:', error);
      return skillLevel;
    }
  };

  const value = {
    streak,
    xp,
    progress,
    settings,
    weeklyStats,
    skillLevel,
    loading,
    completeDialogue,
    completeSession,
    addExchangeXP,
    updateSettings,
    updateSkillLevel,
    refreshData: loadData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
