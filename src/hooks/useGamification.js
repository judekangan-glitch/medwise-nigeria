import { useMedwise } from '../context/MedwiseContext';

export const ACHIEVEMENTS = {
  FIRST_STEP: { id: 'first_step', name: '🥾 First Step', points: 10 },
  WEEK_WARRIOR: { id: 'week_warrior', name: '⚔️ Week Warrior', points: 50 },
  MONTH_MASTER: { id: 'month_master', name: '👑 Month Master', points: 100 },
  COURSE_COMPLETER: { id: 'course_completer', name: '✅ Course Completer', points: 75 },
  KNOWLEDGE_SEEKER: { id: 'knowledge_seeker', name: '🎓 Knowledge Seeker', points: 30 },
  QUIZ_MASTER: { id: 'quiz_master', name: '🧠 Quiz Master', points: 40 },
  DETECTIVE: { id: 'detective', name: '🔍 Detective', points: 20 },
  REMINDER_PRO: { id: 'reminder_pro', name: '🔔 Reminder Pro', points: 35 },
  EARLY_BIRD: { id: 'early_bird', name: '🌅 Early Bird', points: 5 },
  PERFECT_ADHERENCE: { id: 'perfect_adherence', name: '⭐ Perfect Adherence', points: 150 }
};

export const useGamification = () => {
  const { user, updateUser, achievements, addAchievement } = useMedwise();

  const awardPoints = (action, amount = 0) => {
    if (!user) return;
    
    let pointsToAdd = amount;
    let achievementToCheck = null;

    switch (action) {
      case 'dose_taken':     pointsToAdd = 5; achievementToCheck = 'FIRST_STEP'; break;
      case 'module_complete': pointsToAdd = 30; achievementToCheck = 'KNOWLEDGE_SEEKER'; break;
      case 'quiz_perfect':   pointsToAdd = amount > 0 ? amount : 40; achievementToCheck = 'QUIZ_MASTER'; break;
      case 'verify_medication': pointsToAdd = 20; achievementToCheck = 'DETECTIVE'; break;
      case 'course_complete': pointsToAdd = 75; achievementToCheck = 'COURSE_COMPLETER'; break;
      case 'reminder_set':    pointsToAdd = 5; achievementToCheck = 'REMINDER_PRO'; break;
    }

    updateUser((prev) => {
      if (!prev) return prev;
      const newPoints = prev.points + pointsToAdd;
      const newLevel = Math.floor(newPoints / 200) + 1;
      return { ...prev, points: newPoints, level: newLevel };
    });

    if (achievementToCheck) {
      checkAchievement(achievementToCheck);
    }

    return { pointsAdded: pointsToAdd };
  };

  const checkAchievement = (achievementId) => {
    if (achievements.find(a => a.id === achievementId)) {
      return false;
    }

    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return false;

    addAchievement({ id: achievementId, name: achievement.name });
    
    // Award bonus points functionally to avoid race conditions when multiple achievements unlock
    updateUser(prev => {
      if (!prev) return prev;
      const bonusPoints = prev.points + achievement.points;
      return { 
        ...prev, 
        points: bonusPoints, 
        level: Math.floor(bonusPoints / 200) + 1 
      };
    });
    
    return true;
  };

  const updateStreak = (medications) => {
    if (!user || !medications || medications.length === 0) return;

    const totalDoses = medications.reduce((sum, m) => sum + m.total, 0);
    const completedDoses = medications.reduce((sum, m) => sum + m.completed, 0);
    const adherencePercentage = (completedDoses / totalDoses) * 100;

    let newStreaks = user.streaks || 0;
    if (adherencePercentage >= 100) {
      newStreaks++;
      if (newStreaks === 7) checkAchievement('WEEK_WARRIOR');
      if (newStreaks === 30) checkAchievement('MONTH_MASTER');
      if (newStreaks >= 5) checkAchievement('PERFECT_ADHERENCE');
    } else {
      newStreaks = 0;
    }

    updateUser(prev => {
      if (!prev) return prev;
      return {
        ...prev, 
        streaks: newStreaks, 
        lastActivityDate: new Date().toISOString() 
      };
    });
  };

  const getUserStats = () => {
    if (!user) return null;
    return {
      username: user.username,
      level: user.level,
      points: user.points,
      streaks: user.streaks,
      achievements: achievements.length,
      joinedDate: new Date(user.joinedDate).toLocaleDateString(),
      nextLevelPoints: (user.level * 200) - user.points
    };
  };

  return { awardPoints, checkAchievement, updateStreak, getUserStats };
};
