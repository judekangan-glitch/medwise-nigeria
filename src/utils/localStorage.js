// User Management
export const getUserProfile = () => {
  try {
    const saved = localStorage.getItem('medwise-user')
    return saved ? JSON.parse(saved) : null
  } catch (e) {
    console.error('Error parsing user profile:', e)
    return null
  }
}

export const saveUserProfile = (user) => {
  localStorage.setItem('medwise-user', JSON.stringify(user))
}

export const initializeUser = () => {
  const existing = getUserProfile()
  if (!existing) {
    const newUser = {
      id: Date.now(),
      username: '',
      joinedDate: new Date().toISOString(),
      points: 0,
      level: 1,
      achievements: [],
      streaks: 0,
      lastActivityDate: new Date().toISOString()
    }
    saveUserProfile(newUser)
    return newUser
  }
  return existing
}

// Medications Management
export const getMedications = () => {
  try {
    const saved = localStorage.getItem('medwise-medications')
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    console.error('Error parsing medications:', e)
    return []
  }
}

export const saveMedications = (medications) => {
  localStorage.setItem('medwise-medications', JSON.stringify(medications))
}

// Reminders Management
export const getReminders = () => {
  const saved = localStorage.getItem('medwise-reminders')
  return saved ? JSON.parse(saved) : []
}

export const saveReminders = (reminders) => {
  localStorage.setItem('medwise-reminders', JSON.stringify(reminders))
}

// Quiz Results
export const getQuizResults = () => {
  const saved = localStorage.getItem('medwise-quiz-results')
  return saved ? JSON.parse(saved) : {}
}

export const saveQuizResult = (moduleId, score) => {
  const results = getQuizResults()
  results[moduleId] = {
    score,
    completedDate: new Date().toISOString()
  }
  localStorage.setItem('medwise-quiz-results', JSON.stringify(results))
}

// Achievements
export const getAchievements = () => {
  try {
    const saved = localStorage.getItem('medwise-achievements')
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    console.error('Error parsing achievements:', e)
    return []
  }
}

export const awardAchievement = (achievementId, achievementName) => {
  const achievements = getAchievements()
  if (!achievements.find(a => a.id === achievementId)) {
    achievements.push({
      id: achievementId,
      name: achievementName,
      earnedDate: new Date().toISOString()
    })
    localStorage.setItem('medwise-achievements', JSON.stringify(achievements))
  }
}

// Theme
export const getTheme = () => {
  return localStorage.getItem('medwise-theme') || 'light'
}

export const setTheme = (theme) => {
  localStorage.setItem('medwise-theme', theme)
}

// Verification History
export const getVerificationHistory = () => {
  const saved = localStorage.getItem('medwise-verifications')
  return saved ? JSON.parse(saved) : []
}

export const addVerification = (nafdacCode, result) => {
  const history = getVerificationHistory()
  history.push({
    id: Date.now(),
    code: nafdacCode,
    result,
    timestamp: new Date().toISOString()
  })
  localStorage.setItem('medwise-verifications', JSON.stringify(history))
}

// Clear all data
export const clearAllData = () => {
  const keys = [
    'medwise-user',
    'medwise-medications',
    'medwise-reminders',
    'medwise-quiz-results',
    'medwise-achievements',
    'medwise-verifications'
  ]
  keys.forEach(key => localStorage.removeItem(key))
}
