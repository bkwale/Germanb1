// Web localStorage service (adapted from React Native AsyncStorage)

class StorageService {
  // Progress tracking
  getProgress() {
    try {
      const data = localStorage.getItem('progress');
      return data ? JSON.parse(data) : {
        completedDialogues: [],
        weakAreas: [],
        vocabularyCount: 0,
        skillLevel: 0, // 0-100 scale (0=A1 beginner, 100=B1 proficient)
        totalQuizScore: 0,
        totalQuizQuestions: 0
      };
    } catch (error) {
      console.error('Error getting progress:', error);
      return {
        completedDialogues: [],
        weakAreas: [],
        vocabularyCount: 0,
        skillLevel: 0,
        totalQuizScore: 0,
        totalQuizQuestions: 0
      };
    }
  }

  saveProgress(progress) {
    try {
      localStorage.setItem('progress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Streak tracking
  getStreak() {
    try {
      const streakData = localStorage.getItem('streak');
      const lastDate = localStorage.getItem('lastSessionDate');

      if (!streakData) return 0;

      const streak = parseInt(streakData, 10);

      // Check if streak should reset
      if (lastDate) {
        const daysSinceLastSession = this.getDaysDifference(lastDate, new Date().toISOString());
        if (daysSinceLastSession > 1) {
          this.resetStreak();
          return 0;
        }
      }

      return streak;
    } catch (error) {
      console.error('Error getting streak:', error);
      return 0;
    }
  }

  incrementStreak() {
    try {
      const lastDate = localStorage.getItem('lastSessionDate');
      const today = new Date().toISOString().split('T')[0];

      // Only increment if last session was yesterday
      if (lastDate) {
        const lastSessionDate = lastDate.split('T')[0];
        if (lastSessionDate === today) {
          // Already did a session today, don't increment
          return this.getStreak();
        }
      }

      const currentStreak = this.getStreak();
      const newStreak = currentStreak + 1;

      localStorage.setItem('streak', newStreak.toString());
      localStorage.setItem('lastSessionDate', new Date().toISOString());

      return newStreak;
    } catch (error) {
      console.error('Error incrementing streak:', error);
      return 0;
    }
  }

  resetStreak() {
    try {
      localStorage.setItem('streak', '0');
    } catch (error) {
      console.error('Error resetting streak:', error);
    }
  }

  // XP tracking
  getXP() {
    try {
      const xp = localStorage.getItem('xp');
      return xp ? parseInt(xp, 10) : 0;
    } catch (error) {
      console.error('Error getting XP:', error);
      return 0;
    }
  }

  addXP(points) {
    try {
      const currentXP = this.getXP();
      const newXP = currentXP + points;
      localStorage.setItem('xp', newXP.toString());
      return newXP;
    } catch (error) {
      console.error('Error adding XP:', error);
      return 0;
    }
  }

  // Settings
  getSettings() {
    try {
      const data = localStorage.getItem('settings');
      return data ? JSON.parse(data) : {
        berlinDialect: true,
        audioSpeed: 1.0,
        difficulty: 'A1',
        darkMode: false
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        berlinDialect: true,
        audioSpeed: 1.0,
        difficulty: 'A1',
        darkMode: false
      };
    }
  }

  saveSettings(settings) {
    try {
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  // Completed dialogues tracking
  markDialogueComplete(dialogueId) {
    try {
      const progress = this.getProgress();
      if (!progress.completedDialogues.includes(dialogueId)) {
        progress.completedDialogues.push(dialogueId);
        this.saveProgress(progress);
      }
    } catch (error) {
      console.error('Error marking dialogue complete:', error);
    }
  }

  // Update skill level based on quiz performance
  updateSkillLevel(quizScore, totalQuestions, pronunciationScore = 0) {
    try {
      const progress = this.getProgress();

      // Update quiz totals
      progress.totalQuizScore += quizScore;
      progress.totalQuizQuestions += totalQuestions;

      // Calculate skill level (0-100)
      // Formula: Base from quiz accuracy + bonus from pronunciation + completed dialogues bonus
      const quizAccuracy = progress.totalQuizQuestions > 0
        ? (progress.totalQuizScore / progress.totalQuizQuestions) * 60 // Max 60 points from quizzes
        : 0;

      const pronunciationBonus = pronunciationScore >= 80 ? 10 : pronunciationScore >= 60 ? 5 : 0;
      const completionBonus = Math.min(progress.completedDialogues.length * 5, 30); // Max 30 points from completing dialogues

      progress.skillLevel = Math.min(100, Math.round(quizAccuracy + pronunciationBonus + completionBonus));

      this.saveProgress(progress);
      return progress.skillLevel;
    } catch (error) {
      console.error('Error updating skill level:', error);
      return 0;
    }
  }

  // Get current skill level
  getSkillLevel() {
    const progress = this.getProgress();
    return progress.skillLevel || 0;
  }

  // Weekly stats
  getWeeklyStats() {
    try {
      const data = localStorage.getItem('weeklyStats');
      return data ? JSON.parse(data) : this.getEmptyWeeklyStats();
    } catch (error) {
      console.error('Error getting weekly stats:', error);
      return this.getEmptyWeeklyStats();
    }
  }

  updateWeeklyStats() {
    try {
      const stats = this.getWeeklyStats();
      const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
      stats.days[today] = true;
      localStorage.setItem('weeklyStats', JSON.stringify(stats));
    } catch (error) {
      console.error('Error updating weekly stats:', error);
    }
  }

  getEmptyWeeklyStats() {
    return {
      days: [false, false, false, false, false, false, false], // Sun-Sat
      startDate: new Date().toISOString()
    };
  }

  // Helper methods
  getDaysDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Clear all data (for testing)
  clearAll() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

const storageServiceInstance = new StorageService();
export default storageServiceInstance;
