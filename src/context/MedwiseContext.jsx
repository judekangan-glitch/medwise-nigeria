import { createContext, useContext, useState, useEffect } from 'react';
import * as storage from '../utils/localStorage';

const MedwiseContext = createContext();

export const MedwiseProvider = ({ children }) => {
  // Initialize context state from localStorage once
  const [user, setUser] = useState(() => storage.getUserProfile());
  const [medications, setMedications] = useState(() => storage.getMedications());
  const [reminders, setReminders] = useState(() => storage.getReminders());
  const [achievements, setAchievements] = useState(() => storage.getAchievements());
  const [theme, setThemeState] = useState(() => storage.getTheme());
  const [language, setLanguageState] = useState(() => localStorage.getItem('medwise-language') || 'en');
  
  // Action dispatchers that sync to localStorage automatically
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('medwise-language', lang);
  };
  const updateUser = (newUser) => { 
    setUser(newUser); 
    storage.saveUserProfile(newUser); 
  };
  
  const updateMedications = (newMeds) => { 
    setMedications(newMeds); 
    storage.saveMedications(newMeds); 
  };
  
  const updateReminders = (newRems) => { 
    setReminders(newRems); 
    storage.saveReminders(newRems); 
  };
  
  const setTheme = (newTheme) => { 
    setThemeState(newTheme); 
    storage.setTheme(newTheme); 
  };
  
  const addAchievement = (ach) => { 
    storage.awardAchievement(ach.id, ach.name);
    setAchievements(storage.getAchievements());
  };

  return (
    <MedwiseContext.Provider value={{
      user, updateUser,
      medications, updateMedications,
      reminders, updateReminders,
      achievements, addAchievement,
      theme, setTheme,
      language, setLanguage
    }}>
      {children}
    </MedwiseContext.Provider>
  );
};

export const useMedwise = () => useContext(MedwiseContext);
