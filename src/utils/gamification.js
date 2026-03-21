import { getUserProfile, saveUserProfile, getAchievements, awardAchievement } from './localStorage'

// Available achievements
export const ACHIEVEMENTS = {
  FIRST_STEP: {
    id: 'first_step',
    name: '🥾 First Step',
    description: 'Complete your first dose',
    points: 10
  },
  WEEK_WARRIOR: {
    id: 'week_warrior',
    name: '⚔️ Week Warrior',
    description: 'Take doses for 7 days straight',
    points: 50
  },
  MONTH_MASTER: {
    id: 'month_master',
    name: '👑 Month Master',
    description: 'Complete a full month of tracking',
    points: 100
  },
  COURSE_COMPLETER: {
    id: 'course_completer',
    name: '✅ Course Completer',
    description: 'Complete a full antibiotic course',
    points: 75
  },
  KNOWLEDGE_SEEKER: {
    id: 'knowledge_seeker',
    name: '🎓 Knowledge Seeker',
    description: 'Complete an education module',
    points: 30
  },
  QUIZ_MASTER: {
    id: 'quiz_master',
    name: '🧠 Quiz Master',
    description: 'Score 100% on a quiz',
    points: 40
  },
  DETECTIVE: {
    id: 'detective',
    name: '🔍 Detective',
    description: 'Verify your first medication',
    points: 20
  },
  REMINDER_PRO: {
    id: 'reminder_pro',
    name: '🔔 Reminder Pro',
    description: 'Set up 5 medication reminders',
    points: 35
  },
  EARLY_BIRD: {
    id: 'early_bird',
    name: '🌅 Early Bird',
    description: 'Take a dose before 8 AM',
    points: 5
  },
  PERFECT_ADHERENCE: {
    id: 'perfect_adherence',
    name: '⭐ Perfect Adherence',
    description: 'Complete multiple courses without missing',
    points: 150
  }
}

// Award points and check achievements
export const awardPoints = (action, amount = 0) => {
  const user = getUserProfile()
  if (!user) return

  let pointsToAdd = amount
  let achievementToCheck = null

  switch (action) {
    case 'dose_taken':
      pointsToAdd = 5
      achievementToCheck = 'FIRST_STEP'
      break
    case 'module_complete':
      pointsToAdd = 30
      achievementToCheck = 'KNOWLEDGE_SEEKER'
      break
    case 'quiz_perfect':
      // If amount is provided, use it; otherwise default to 40
      pointsToAdd = amount > 0 ? amount : 40
      achievementToCheck = 'QUIZ_MASTER'
      break
    case 'verify_medication':
      pointsToAdd = 20
      achievementToCheck = 'DETECTIVE'
      break
    case 'course_complete':
      pointsToAdd = 75
      achievementToCheck = 'COURSE_COMPLETER'
      break
    case 'reminder_set':
      pointsToAdd = 5
      break
  }

  // Update user points
  const newPoints = user.points + pointsToAdd
  user.points = newPoints
  
  // Level up every 200 points
  const newLevel = Math.floor(newPoints / 200) + 1
  user.level = newLevel

  saveUserProfile(user)

  // Check for achievements
  if (achievementToCheck) {
    checkAchievement(achievementToCheck)
  }

  return { pointsAdded: pointsToAdd, newTotal: newPoints, newLevel }
}

// Check if an achievement should be awarded
export const checkAchievement = (achievementId) => {
  const user = getUserProfile()
  const existing = getAchievements()
  
  if (existing.find(a => a.id === achievementId)) {
    return false // Already have this achievement
  }

  const achievement = ACHIEVEMENTS[achievementId]
  if (!achievement) return false

  // Grant the achievement
  awardAchievement(achievementId, achievement.name)
  
  // Award bonus points
  awardPoints('achievement_bonus', achievement.points)
  
  return true
}

// Check for streak-based achievements
export const updateStreak = (medications) => {
  const user = getUserProfile()
  if (!medications || medications.length === 0) return

  // Calculate adherence ratio
  const totalDoses = medications.reduce((sum, m) => sum + m.total, 0)
  const completedDoses = medications.reduce((sum, m) => sum + m.completed, 0)
  const adherencePercentage = (completedDoses / totalDoses) * 100

  // Update streak
  if (adherencePercentage >= 100) {
    user.streaks = (user.streaks || 0) + 1
    
    if (user.streaks === 7) checkAchievement('WEEK_WARRIOR')
    if (user.streaks === 30) checkAchievement('MONTH_MASTER')
    if (user.streaks >= 5) checkAchievement('PERFECT_ADHERENCE')
  } else {
    user.streaks = 0
  }

  user.lastActivityDate = new Date().toISOString()
  saveUserProfile(user)
}

// Get current user stats
export const getUserStats = () => {
  const user = getUserProfile()
  if (!user) return null

  const achievements = getAchievements()
  const totalAchievementsPoints = achievements.reduce(
    (sum, ach) => sum + (ACHIEVEMENTS[ach.id]?.points || 0),
    0
  )

  return {
    username: user.username,
    level: user.level,
    points: user.points,
    streaks: user.streaks,
    achievements: achievements.length,
    joinedDate: new Date(user.joinedDate).toLocaleDateString(),
    nextLevelPoints: (user.level * 200) - user.points
  }
}
