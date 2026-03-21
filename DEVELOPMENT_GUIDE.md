# MedWise Nigeria - Complete Setup & Development Guide

## ✅ COMPLETED FEATURES

### 1. **Medication Tracking (TRACK Module)**
- ✅ **localStorage Persistence** - Medications save and reload across sessions
- ✅ **Add/Delete Medications** - Full CRUD functionality
- ✅ **Progress Tracking** - Visual progress bars with dose counting
- ✅ **Gamification Integration** - Points awarded for each dose (+5 pts per dose, +75 for completion)
- ✅ **Auto-reminders** - Medications linked to reminder system

### 2. **Reminders System**
- ✅ **Medication Linking** - Link reminders to tracked medications
- ✅ **localStorage Support** - Reminders persist across sessions
- ✅ **Browser Notifications** - Web Notification API integration
- ✅ **Bidirectional Sync** - Track ↔ Reminders integration
- ✅ **Time-based Alerts** - 30-second check interval

### 3. **User Authentication**
- ✅ **Simple Login/Registration** - Username-based (localStorage)
- ✅ **User Profile** - Track username, level, points, achievements, streaks
- ✅ **Data Privacy** - All data stays on user's device
- ✅ **Profile Widget** - Fixed position user info with logout

### 4. **Gamification System**
- ✅ **Points System** - 5 pts/dose, 30 pts/module, 75 pts/course completion
- ✅ **Achievement Badges** - 10 achievements (First Step, Week Warrior, etc.)
- ✅ **Leveling System** - Level up every 200 points
- ✅ **Streak Tracking** - Track medication adherence streaks
- ✅ **Automatic Awards** - Achievements awarded on milestone completion

### 5. **Dark Mode**
- ✅ **Theme Toggle** - Moon/Sun icon in navigation
- ✅ **localStorage Theme** - Theme preference persists
- ✅ **Full UI Support** - Dark mode applied to all components
- ✅ **Navigation Integration** - Theme selector in sticky navbar

### 6. **Expanded Content**
- ✅ **20 Antibiotics Database** - Nigerian context for each
- ✅ **20+ Fake Drug Alerts** - NAFDAC-based real alerts with danger levels
- ✅ **Antibiotic Gallery** - Identification, uses, warnings
- ✅ **Drug Safety Tips** - 6 key safety practices

### 7. **Backend Ready (Optional)**
- ✅ **Firebase Configuration Template** - Complete setup guide provided
- ✅ **Firestore Ruleset** - Security rules for production
- ✅ **Environment Variables** - .env.local configuration ready

---

## 🚀 QUICK START

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📱 USER WORKFLOW

### First Time
1. User opens app → **Login/Registration page**
2. Enter username → **Profile created** with 0 points, Level 1
3. Access app → **Navigation with all features**

### Medication Tracking
1. Navigate to **TRACK tab**
2. Click **"Add Medication"**
3. Fill form (name, dosage, frequency, duration)
4. System calculates total doses
5. **+5 points** awarded when dose is marked
6. **Course completion** → +75 points + achievement

### Reminders
1. Navigate to **REMINDERS tab**
2. **Enable notifications** if not already
3. **Select medication** from tracked list OR enter custom
4. Set **reminder time**
5. Reminder fires at exact time with **browser notification**

### Gamification
- **View profile widget** → Top right corner shows: username, level, points
- **Logout** → Clears all data (confirmation required)

### Dark Mode
- Click **Moon/Sun icon** in navigation
- Theme applies immediately
- **Preference saves** to localStorage

---

## 📊 STORAGE STRUCTURE

All data stored in **localStorage** with these keys:

```javascript
// User Profile
localStorage['medwise-user'] = {
  id, username, email, joinedDate, points, level, achievements, streaks
}

// Medications
localStorage['medwise-medications'] = [
  { id, name, dosage, frequency, duration, startDate, completed, total }
]

// Reminders
localStorage['medwise-reminders'] = [
  { id, medicationId, medication, time, enabled, createdAt }
]

// Quiz Results
localStorage['medwise-quiz-results'] = {
  moduleId: { score, completedDate }
}

// Achievements
localStorage['medwise-achievements'] = [
  { id, name, earnedDate }
]

// Theme
localStorage['medwise-theme'] = 'light' or 'dark'

// Verification History
localStorage['medwise-verifications'] = [
  { id, code, result, timestamp }
]
```

---

## 🔐 OPTIONAL: SETUP FIREBASE BACKEND

### Why Firebase?
- ✅ FREE tier (generous limits)
- ✅ Real-time Firestore database
- ✅ User authentication
- ✅ Cloud storage for images
- ✅ No server needed

### Setup Steps

1. **Create Project**
   ```
   Visit: https://console.firebase.google.com
   Create new project "MedWise Nigeria"
   ```

2. **Enable Services**
   - Authentication → Email/Password + Google
   - Firestore Database → Production mode
   - Storage (optional for images)

3. **Get Credentials**
   - Go to Settings → Project Settings
   - Copy Firebase SDK credentials

4. **Add to Project**
   ```bash
   npm install firebase
   ```

5. **Create .env.local**
   ```
   REACT_APP_FIREBASE_API_KEY=xxx
   REACT_APP_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=xxx
   ```

6. **Use Configuration**
   ```javascript
   // Rename firebaseConfig.example.js to firebaseConfig.js
   // Update with your credentials
   ```

---

## 📚 AVAILABLE UTILITIES

### localStorage Utilities (`src/utils/localStorage.js`)
```javascript
getMedications()          // Get all tracked medications
saveMedications(meds)     // Save medications
getReminders()            // Get all reminders
getQuizResults()          // Get quiz scores
getUserProfile()          // Get user data
initializeUser()          // Create new user
getTheme()               // Get current theme
```

### Gamification (`src/utils/gamification.js`)
```javascript
awardPoints(action)      // Award points for action
checkAchievement(id)     // Check if achievement earned
updateStreak(meds)       // Update medication adherence streak
getUserStats()           // Get complete user stats
```

### Databases
```javascript
getAntibioticsDatabase()  // All 20 antibiotics
getFakeDrugAlerts()      // All 20+ NAFDAC alerts
getSafetyTips()          // 6 safety tips
```

---

## 🐛 TROUBLESHOOTING

### Reminders not firing
- Ensure notifications are **enabled** in browser
- Check browser tab is **active** (some browsers pause background tabs)
- Verify reminder **time is current**
- Check browser **console** for errors

### Data not saving
- Ensure localStorage is **not disabled** in browser
- Check **Privacy mode** (won't persist data)
- Open DevTools → Application → Local Storage

### Dark mode not persisting
- Clear browser cache and reload
- Check that localStorage isn't full
- Try manually clicking theme toggle again

---

## 📈 NEXT FEATURES TO ADD

1. **Backend Sync** - Sync localStorage to Firebase
2. **User Accounts** - Firebase Authentication
3. **Offline Support** - Enhanced service worker
4. **Data Export** - CSV/PDF medication history
5. **Wearable Integration** - Smartwatch reminders
6. **AI Analysis** - Pattern detection for adherence
7. **Community Features** - Share tips, report fakes
8. **Multi-language** - Hausa, Yoruba translations
9. **SMS Reminders** - SMS-based backup
10. **Analytics** - Track resistance patterns

---

## 🤝 CONTRIBUTION NOTES

- All utilities are modular and reusable
- Components use Tailwind CSS for styling
- Dark mode via CSS class on root element
- Icons from lucide-react library
- Responsive design tested on mobile/tablet/desktop

---

## 📄 LICENSE

Built for 3MTT Knowledge Showcase 2026

---

## 🆘 SUPPORT

- **NAFDAC Hotline**: 01-4618080
- **Report Fakes**: nafdac.gov.ng
- **Technical Issues**: Check console errors

---

**Last Updated**: March 2026  
**Project Status**: MVP Complete ✅
