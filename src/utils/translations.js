export const translations = {
  en: {
    nav: {
      learn: 'Learn',
      verify: 'Verify',
      track: 'Track',
      reminders: 'Reminders',
      lang_toggle: 'Pidgin'
    },
    home: {
      hero_title: 'From Education to Verification',
      hero_subtitle: 'Your Complete Medication Safety Companion',
      get_started: 'Get Started',
      problem_title: 'Nigeria Faces a Silent Healthcare Crisis',
      problem_desc: 'Two deadly threats are claiming lives across our nation:',
      feature_title: 'One Platform. Three Solutions.',
      start_learning: 'Start Learning Today'
    },
    verify: {
      title: 'Verify Your Medication',
      subtitle: 'Check NAFDAC registration numbers to help identify counterfeit medications',
      scan_btn: 'Scan Code with Camera',
      stop_scan: 'Stop Scanning',
      input_label: 'Enter NAFDAC Number (e.g., A7-1234)',
      verify_btn: 'Verify',
      verifying: 'Verifying...'
    },
    symptom: {
      title: 'Symptom Assessment Tool',
      subtitle: 'Get evidence-based guidance on whether you need antibiotics.',
      question_label: 'Question',
      risk_level: 'Risk Level',
      next: 'Next',
      previous: 'Previous',
      start_new: 'Start New Assessment'
    }
  },
  pidgin: {
    nav: {
      learn: 'Learn',
      verify: 'Check Am',
      track: 'Follow Am',
      reminders: 'Remind Me',
      lang_toggle: 'English'
    },
    home: {
      hero_title: 'From Learning to Checking Your Meds',
      hero_subtitle: 'Your Better Body Friend for Beta Medicine',
      get_started: 'Make we start',
      problem_title: 'Naija dey face big health problem o',
      problem_desc: 'Two bad things dey kill people for our country:',
      feature_title: 'One App. Three Ways to block wahala.',
      start_learning: 'Start to Learn Now'
    },
    verify: {
      title: 'Check If Your Meds be Correct',
      subtitle: 'Check NAFDAC number make you know if medicine be fake',
      scan_btn: 'Use Camera Scan Am',
      stop_scan: 'Stop to Scan',
      input_label: 'Put that NAFDAC Number (e.g., A7-1234)',
      verify_btn: 'Check Am',
      verifying: 'Dey check am...'
    },
    symptom: {
      title: 'Check Your Sickness Tool',
      subtitle: 'Know if you true-true need antibiotic or if small rest go do.',
      question_label: 'Ask',
      risk_level: 'How e bad reach',
      next: 'Next',
      previous: 'Go Back',
      start_new: 'Start Fresh One'
    }
  }
};

export const useTranslation = (language) => {
  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result[key]) {
        result = result[key];
      } else {
        return path; // Fallback to path if not found
      }
    }
    return result;
  };
  return { t };
};
