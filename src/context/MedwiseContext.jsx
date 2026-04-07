import { createContext, useContext, useState, useEffect } from 'react';
import * as storage from '../utils/localStorage';
import { supabase } from '../utils/supabase';

const MedwiseContext = createContext();

export const MedwiseProvider = ({ children }) => {
  // Initialize context state from localStorage once
  const [user, setUser] = useState(() => storage.getUserProfile());
  const [medications, setMedications] = useState(() => storage.getMedications());
  const [reminders, setReminders] = useState(() => storage.getReminders());
  const [achievements, setAchievements] = useState(() => storage.getAchievements());
  const [theme, setThemeState] = useState(() => storage.getTheme());
  const [language, setLanguageState] = useState(() => localStorage.getItem('medwise-language') || 'en');
  const lang = (map) => map[language] ?? map['en'];
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety timeout: Always unlock the screen after 4 seconds
    const safetyTimer = setTimeout(() => {
      console.warn('Startup Safety Timeout reached. Forcing load...');
      setLoading(false);
    }, 4000);

    const handleAuthStateChange = async (_event, session) => {
      try {
        if (session) {
          const sbUser = session.user;
          
          // Use a timeout-wrapped profile fetch
          const profilePromise = supabase
            .from('profiles')
            .select('*')
            .eq('id', sbUser.id)
            .single();

          const { data: profileData } = await profilePromise;

          // Smart Merging Logic: Compare local with cloud and keep the HIGHER values
          const localUser = storage.getUserProfile();
          const cloudPoints = Number(profileData?.points) || 0;
          const cloudLevel = Number(profileData?.level) || 1;
          const cloudAchievements = Array.isArray(profileData?.achievements) ? profileData.achievements : [];
          const localAchievements = Array.isArray(localUser?.achievements) ? localUser.achievements : [];

          // Unique set of achievements by ID
          const combinedAchievements = [...cloudAchievements, ...localAchievements];
          const uniqueAchievements = [];
          const seenIds = new Set();
          
          for (const ach of combinedAchievements) {
            if (ach && ach.id) {
              const lowerId = ach.id.toLowerCase();
              if (!seenIds.has(lowerId)) {
                seenIds.add(lowerId);
                uniqueAchievements.push(ach);
              }
            }
          }

          const profile = {
            id: sbUser.id,
            username: profileData?.username || sbUser.user_metadata?.username || sbUser.email?.split('@')[0] || sbUser.phone || 'User',
            email: sbUser.email,
            phone: sbUser.phone,
            // Keep the maximum of local or cloud points/levels
            points: Math.max(cloudPoints, Number(localUser?.points) || 0),
            level: Math.max(cloudLevel, Number(localUser?.level) || 1),
            achievements: uniqueAchievements,
            streaks: Math.max(Number(profileData?.streaks || profileData?.streak) || 0, Number(localUser?.streaks) || 0),
            lastActivityDate: profileData?.last_activity_date || new Date().toISOString()
          };
          
          setUser(profile);
          storage.saveUserProfile(profile);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Core Auth Logic Error:', err);
        setLoading(false);
      } finally {
        setLoading(false);
        clearTimeout(safetyTimer);
      }
    };

    // Subscribing to auth changes
    let subscription;
    try {
      const { data } = supabase.auth.onAuthStateChange(handleAuthStateChange);
      subscription = data?.subscription;
      
      // Proactive session check
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) handleAuthStateChange('INITIAL_SESSION', session);
        else setLoading(false);
      }).catch(() => setLoading(false));

    } catch (err) {
      console.error('Supabase Init Error:', err);
      setLoading(false);
    }

    return () => {
      subscription?.unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };
  
  // Action dispatchers that sync to localStorage/Cloud automatically
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('medwise-language', lang);
  };
  
  // Side effect for Cloud Sync (Safe Lane)
  useEffect(() => {
    if (!user || !user.id || loading) return;
    
    const syncToCloud = async () => {
      try {
        const { error } = await supabase.from('profiles').upsert({
          id: user.id,
          username: user.username,
          points: user.points,
          level: user.level,
          achievements: user.achievements,
          streaks: user.streaks,
          last_activity_date: new Date().toISOString()
        }, { onConflict: 'id' });

        if (error) throw error;
        console.log('Progress saved to cloud! ☁️');
        // Let the user know progress is saved
        showToast(lang({
          en: 'Progress safely saved to cloud! ☁️',
          pidgin: 'Your progress don save for cloud! ☁️',
          ha: 'An adana bayanan ku cikin nasara! ☁️',
          yo: 'A ti tọ́jú ìlọsíwájú rẹ sí inú sánmà! ☁️',
          ig: 'Echekwala ọganiihu gị n\'ime igwe-oji! ☁️'
        }), 'success');
      } catch (err) {
        console.error('Cloud Sync Error (Auto-Sync):', err);
      }
    };

    // Debounce or delay sync slightly if needed, but for now just sync on change
    const timer = setTimeout(syncToCloud, 2000); 
    return () => clearTimeout(timer);
  }, [user?.points, user?.level, user?.achievements?.length]);

  const updateUser = (newUserOrUpdater) => { 
    setUser((prev) => {
      const nextUser = typeof newUserOrUpdater === 'function' ? newUserOrUpdater(prev) : newUserOrUpdater;
      storage.saveUserProfile(nextUser);
      return nextUser;
    });
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
      language, setLanguage,
      lang,
      toasts, showToast,
      loading
    }}>
      {children}
    </MedwiseContext.Provider>
  );
};

export const useMedwise = () => useContext(MedwiseContext);
