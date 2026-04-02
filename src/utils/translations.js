export const translations = {
  en: {
    nav: {
      learn: 'Learn',
      verify: 'Verify',
      track: 'Track',
      reminders: 'Reminders',
    },
    home: {
      hero_title: 'From Education to Verification',
      hero_subtitle: 'Your Complete Medication Safety Companion',
      problem_desc_long: 'Combating antibiotic resistance and counterfeit medications through education, verification, and adherence tracking',
      get_started: 'Get Started',
      stat_label_1: 'Nigerians Protected',
      stat_label_2: 'Fake Drugs Flagged',
      stat_label_3: 'Verification Accuracy',
      impact_short: 'Join thousands of Nigerians making safer medication choices.',
      live_status: 'Live Protection Active',
      problem_title: 'Nigeria Faces a Silent Healthcare Crisis',
      problem_desc: 'Two deadly threats are claiming lives across our nation:',
      feature_title: 'One Platform. Three Solutions.',
      feature_desc_short_learn: 'Evidence-based education on antibiotic use, resistance, and medication safety',
      feature_desc_short_verify: 'Authenticate medications and detect counterfeit drugs before consumption',
      feature_desc_short_track: 'Smart reminders to ensure proper medication adherence and course completion',
      start_learning: 'Start Learning Today',
      resistance_title: 'Antibiotic Resistance',
      resistance_desc: 'Over-the-counter antibiotics, incomplete treatment courses, and inappropriate use are creating superbugs that no longer respond to treatment. Simple infections are becoming life-threatening.',
      fake_drug_title: 'Counterfeit Medications',
      fake_drug_desc: '30-40% of medications in Nigerian markets are fake or substandard. Patients trust these drugs with their lives, unknowingly consuming substances that provide no treatment or cause harm.',
      stat_use: 'Inappropriate antibiotic use in Nigeria',
      stat_fake: 'Counterfeit medications in markets',
      stat_resistance: 'Increased resistance from incomplete courses',
      feature_desc: 'MedWise Nigeria tackles both problems through comprehensive education, medication verification, and adherence support',
      impact_hero_title: 'Education Changes Behavior. Verification Saves Lives.',
      impact_hero_desc: 'When patients understand proper antibiotic use and can verify their medications, resistance decreases and treatment success increases.',
    },
    symptom: {
      title: 'Symptom Assessment Tool',
      subtitle: 'Get evidence-based guidance on whether you need antibiotics.',
      question_label: 'Question',
      risk_level: 'Risk Level',
      next: 'Next',
      previous: 'Previous',
      start_new: 'Start New Assessment',
      rec: {
        self_care: {
          title: '✓ Self-Care Management',
          message: 'Your symptoms suggest you likely don\'t need antibiotics right now.',
          advice: [
            '🏠 Rest and stay hydrated (drink water, warm tea, electrolyte drinks)',
            '💊 Use over-the-counter pain relievers if needed',
            '⏱️ Monitor your symptoms for 48-72 hours',
            '🩺 See a doctor IMMEDIATELY if symptoms worsen',
            '❌ Do NOT self-prescribe antibiotics - most minor infections resolve on their own'
          ],
          nigeria_info: 'Seeking unnecessary healthcare can strain resources. Your recovery can happen at home with proper care.',
          res_warning: 'Self-medicating with antibiotics drives antibiotic resistance in Nigeria and puts your community at risk.',
          urgent_signs: ['High fever persisting', 'Severe pain', 'Difficulty breathing', 'Confusion', 'Spreading redness'],
          follow_up: 'Return for evaluation if symptoms don\'t improve in 7 days or worsen at any time'
        },
        see_doctor: {
          title: '⚠️ Professional Evaluation Needed',
          message: 'Your symptoms require professional medical evaluation to determine if antibiotics are needed.',
          advice: [
            '📞 Schedule an appointment with a healthcare provider WITHIN 24-48 hours',
            '❌ Do NOT buy antibiotics without a prescription - this drives resistance',
            '📝 Write down: symptom duration, severity, fever, other symptoms',
            '💭 Ask your doctor: "Do I really need antibiotics for this?"',
            '✅ Follow prescription instructions EXACTLY - complete the full course'
          ],
          nigeria_info: 'Over 40% of antibiotics in Nigeria are purchased without prescriptions.',
          res_warning: 'Taking wrong antibiotics or incomplete courses creates resistant bacteria that threaten everyone.',
          urgent_signs: ['Fever above 39°C', 'Difficulty breathing', 'Persistent vomiting', 'Blood in stool/urine', 'Severe pain'],
          follow_up: 'Seek urgent care if symptoms worsen before your appointment'
        },
        urgent: {
          title: '🚨 URGENT MEDICAL CARE REQUIRED',
          message: 'Your symptoms are severe. Seek immediate medical attention now.',
          advice: [
            '🚑 Go to the nearest hospital/clinic IMMEDIATELY - do not wait',
            '❌ Do NOT self-treat or buy antibiotics on your own',
            '👥 Bring a family member if possible',
            '📋 Bring your ID and any medical history',
            '⚡ Follow all medical instructions without delay'
          ],
          nigeria_info: 'Many hospitals in Nigeria provide emergency care.',
          res_warning: 'Serious infections may require specific antibiotics.',
          urgent_signs: ['Difficulty breathing', 'Severe chest pain', 'Confusion', 'Severe bleeding'],
          follow_up: 'This is a medical emergency'
        }
      },
      assessment_label: 'Overall Condition Assessment',
      what_to_do: 'What You Should Do:',
      nigeria_context: 'Nigerian Healthcare Context:',
      resistance_warning: 'Fighting Antibiotic Resistance:',
      warning_signs_title: 'Warning Signs - Seek Immediate Help If:',
      follow_up: 'Follow-up:',
      emergency_note: 'This is a medical emergency',
      remember_title: '💡 Remember: Prevention is Better Than Cure',
      q: {
        age: 'What is your age group?',
        conditions: 'Do you have any existing health conditions?',
        type: 'What type of symptoms are you experiencing?',
        resp_dur: 'How long have you had respiratory symptoms?',
        resp_sev: 'How severe are your respiratory symptoms?',
        dig_dur: 'How long have you had digestive symptoms?',
        dig_sev: 'Describe your digestive symptoms:',
        uri_dur: 'How long have you had urinary symptoms?',
        uri_sev: 'How severe are your urinary symptoms?',
        skin_dur: 'How long have you had this skin condition?',
        skin_sev: 'Describe your skin condition:',
        fever_dur: 'How long have you had fever?',
        fever_sev: 'What is your fever status?',
        ear_sev: 'Describe your ear/eye condition:',
        prev_anti: 'Have you taken antibiotics in the last 4 weeks?',
        traj: 'Are your symptoms improving or getting worse?'
      },
      opt: {
        child: 'Below 5 years',
        young: '5-18 years',
        adult: '18-60 years',
        senior: 'Above 60 years',
        none: 'No existing conditions',
        diabetes: 'Diabetes',
        hypertension: 'Hypertension',
        multiple: 'Multiple conditions',
        respiratory: 'Respiratory (cough, cold, sore throat)',
        digestive: 'Digestive (diarrhea, stomach pain)',
        urinary: 'Urinary (painful urination)',
        skin: 'Skin infection (wound, rash, boil)',
        fever: 'Fever (high temperature)',
        ear_eye: 'Ear/Eye infection',
        lt_24h: 'Less than 24 hours',
        d1_3: '1-3 days',
        d4_7: '4-7 days',
        gt_week: 'More than a week',
        mild: 'Mild',
        moderate: 'Moderate',
        severe: 'Severe',
        improving: 'Improving',
        stable: 'Stable',
        worsening: 'Getting worse'
      }
    }
  },
  pidgin: {
    nav: {
      learn: 'Learn',
      verify: 'Check Am',
      track: 'Follow Am',
      reminders: 'Remind Me',
    },
    home: {
      hero_title: 'From Learning to Checking Your Meds',
      hero_subtitle: 'Your Better Body Friend for Beta Medicine',
      problem_desc_long: 'We dey help you learn, check your meds, and follow your treatment correct make you no get wahala.',
      get_started: 'Make we start',
      stat_label_1: 'Naija People Wey We Protect',
      stat_label_2: 'Fake Medicine Wey We Catch',
      stat_label_3: 'As E Correct Reach',
      impact_short: 'Join plenty Naija people wey dey choose better medicine.',
      live_status: 'Active Vigilante Mode',
      problem_title: 'Naija dey face big health problem o',
      problem_desc: 'Two bad things dey kill people for our country:',
      feature_title: 'One App. Three Ways to block wahala.',
      feature_desc_short_learn: 'Learn how to use medicine well make you no get wahala for body',
      feature_desc_short_verify: 'Check your medicine make you know if e be fake or correct one',
      feature_desc_short_track: 'Make we remind you make you no forget to take your tabs correct',
      start_learning: 'Start to Learn Now',
      resistance_title: 'Antibiotic Strong-Head',
      resistance_desc: 'If you take medicine anyhow or you no finish am, the sickness go strong pass the drug. Small sickness fit turn to big wahala.',
      fake_drug_title: 'Fake Medicine',
      fake_drug_desc: 'Like 3-4 medicine inside 10 for Naija market na fake. People dey drink wetin no go heal dem or wetin go even kill dem.',
      stat_use: 'As people dey take antibiotic anyhow for Naija',
      stat_fake: 'Plenty fake medicine for market',
      stat_resistance: 'Sickness wey strong-head because people no finish dose',
      feature_desc: 'MedWise Nigeria dey help you learn, check your meds, and follow your treatment correct.',
      impact_hero_title: 'If You Learn, You Go Know. If You Check, You No Go Die.',
      impact_hero_desc: 'When people know how to use medicine well and check if e correct, sickness no go strong pass drug and everybody go well.',
    },
    symptom: {
      title: 'Check Your Sickness Tool',
      subtitle: 'Know if you true-true need antibiotic or if small rest go do.',
      question_label: 'Ask',
      risk_level: 'How e bad reach',
      next: 'Next',
      previous: 'Go Back',
      start_new: 'Start Fresh One',
      rec: {
        self_care: {
          title: '✓ Wetin You Go Do for House',
          message: 'Sickness wey you get show say you no need antibiotics now.',
          advice: [
            '🏠 Rest well and drink plenty water or warm tea',
            '💊 Take small medicine for pain if you need am',
            '⏱️ Watch your body for like 2-3 days so',
            '🩺 Go see doctor QUICK QUICK if the thing start to bad',
            '❌ No go buy antibiotic for yourself - body go heal by emself'
          ],
          nigeria_info: 'If you go hospital for small thing, you dey stress medical people. You fit get better for house.',
          res_warning: 'If you use medicine anyhow, that one go make sickness strong pass antibiotic. E no good for Naija.',
          urgent_signs: ['Body still hot well well', 'Big pain', 'Breath no dey reach', 'Your head dey confuse', 'Redness dey spread'],
          follow_up: 'Come back if you never better after 7 days or if sickness start to worse'
        },
        see_doctor: {
          title: '⚠️ Go See Doctor Better',
          message: 'This thing wey you get, doctor suppose check am before you take anything.',
          advice: [
            '📞 Call doctor or go see person wey know book inside 1-2 days',
            '❌ No buy medicine if doctor never write am for you',
            '📝 Note down how long the thing don start and if body hot',
            '💭 Ask doctor: "I true-true need antibiotic for this sickness?"',
            '✅ Take your pills exactly how doctor tell you - finish am o!'
          ],
          nigeria_info: 'For Naija, plenty people dey buy medicine without doctor - e grow wahala.',
          res_warning: 'If you no finish your medicine, the sickness go strong pass the drug. Wahala for everybody.',
          urgent_signs: ['Body hot over 39°C', 'Breath no dey reach', 'Dey vomit anyhow', 'Blood for inside pee or sheet', 'Big big pain'],
          follow_up: 'Go urgant care if sickness bad pass before you see doctor'
        },
        urgent: {
          title: '🚨 GO HOSPITAL NOW NOW',
          message: 'This sickness bad o. Go see doctor quick quick.',
          advice: [
            '🚑 Run go hospital wey near you now - no wait o!',
            '❌ No try treat yourself or go buy drug yourself',
            '👥 Carry your brother or sister follow you',
            '📋 Carry your card and tell dem former sickness',
            '⚡ Do everything wey doctor tell you sharp-sharp'
          ],
          nigeria_info: 'Hospitals for Naija dey treat emergency cases.',
          res_warning: 'Big sickness need correct medicine wey doctor know',
          urgent_signs: ['Breath no dey reach', 'Chest pain well well', 'Head no dey work', 'Blood dey flow for body'],
          follow_up: 'This one na emergency o'
        }
      },
      assessment_label: 'As your body be so',
      what_to_do: 'Wetin you go do:',
      nigeria_context: 'As hospital matter be for Naija:',
      resistance_warning: 'How we go fight sickness wey no dey hear drug:',
      warning_signs_title: 'If you see these things, run go hospital:',
      follow_up: 'Wetin follow after:',
      emergency_note: 'This one na emergency o',
      remember_title: '💡 No forget: E better to block sickness pass to treat am',
      q: {
        age: 'How old you be?',
        conditions: 'Anything else dey worry you before?',
        type: 'Which place inside your body dey worry you?',
        resp_dur: 'How long you don dey get this cough or catarrh?',
        resp_sev: 'How the sickness dey do you?',
        dig_dur: 'How long your belle don dey run?',
        dig_sev: 'How the belle sickness dey do you?',
        uri_dur: 'How long pee don dey pain you?',
        uri_sev: 'How the pee pain dey reach?',
        skin_dur: 'How long your skin don dey do you like this?',
        skin_sev: 'How the skin sickness be?',
        fever_dur: 'How long your body don dey hot?',
        fever_sev: 'How the hot body dey do you?',
        ear_sev: 'How the ear or eye de do you?',
        prev_anti: 'You don take antibiotic inside 4 weeks wey pass?',
        traj: 'The sickness dey go or e dey worse?'
      },
      opt: {
        child: 'Pikin wey never reach 5 years',
        young: 'Young person (5-18 years)',
        adult: 'Big person (18-60 years)',
        senior: 'Mama/Papa (Above 60 years)',
        none: 'Nothing dey worry me',
        diabetes: 'Sugar for body (Diabetes)',
        hypertension: 'B-P (Hypertension)',
        multiple: 'Plenty things dey worry me',
        respiratory: 'Inside my chest (Cough, Catarrh, Sore throat)',
        digestive: 'My belle (Running belle, Belle pain)',
        urinary: 'To pass water (Pee dey pain me)',
        skin: 'My Skin (Wound, Rash, Boil)',
        fever: 'Hot body (Fever)',
        ear_eye: 'My Ear or Eye (Discharge or pain)',
        lt_24h: 'E never reach one day',
        d1_3: 'Like 1-3 days so',
        d4_7: 'Almost one week now',
        gt_week: 'E pass one week',
        mild: 'Small small',
        moderate: 'E reach middle',
        severe: 'E bad well well',
        improving: 'E dey go small small',
        stable: 'E just dey same place',
        worsening: 'E dey worse o'
      }
    }
  },
  ha: {
    nav: { learn: 'Koyi', verify: 'Tabbatar', track: 'Bi diddigi', reminders: 'Tuna' },
    home: {
      hero_title: 'Daga Ilimi zuwa Tabbatarwa',
      hero_subtitle: 'Abokin Amintaccen Magungunan Ku',
      get_started: 'Fara Yanzu',
      problem_title: 'Najeriya tana cikin babban rikicin kiwon lafiya',
      feature_title: 'Dandamali Guda daya. Mafita Guda Uku.',
      start_learning: 'Fara Koyo Yau'
    },
    symptom: {
      title: 'Kayan Auna Alamomin Cututtuka',
      q: {
        age: 'Menene rukunin shekarunku?',
        conditions: 'Kuna da wani ciwo tun da farko?',
        type: 'Wane irin ciwo kuke ji?',
        resp_dur: 'Har tsawon wane lokaci kuke fama da tari ko mura?',
        resp_sev: 'Yaya tsananin ciwon yake?',
        dig_dur: 'Har tsawon lokacin da kuka ji ciwon ciki?',
        dig_sev: 'Yaya ciwon cikin nan yake?',
        uri_dur: 'Har tsawon lokacin da kuka ji ciwon fitsari?',
        uri_sev: 'Yaya ciwon fitsarin yake?',
        skin_dur: 'Har tsawon lokacin da kuka ji ciwon fata?',
        skin_sev: 'Yaya ciwon fatan nan yake?',
        fever_dur: 'Har tsawon wane lokaci jikinku yake zafi?',
        fever_sev: 'Menene yanayin zazzabin ku?',
        ear_sev: 'Yaya yanayin kunne ko idonku yake?',
        prev_anti: 'Shin kun sha maganin antibiotics a cikin sati 4 da suka gabata?',
        traj: 'Shin ciwon yana raguwa ko yana karuwa?'
      },
      opt: {
        child: 'Kasa da shekara 5',
        young: 'Shekara 5 zuwa 18',
        adult: 'Shekara 18 zuwa 60',
        senior: 'Sama da shekara 60',
        none: 'Babu komai',
        diabetes: 'Ciwon Suga',
        hypertension: 'Hawan Jini',
        multiple: 'Ciwon yana da yawa',
        respiratory: 'Ciwon Shaka (tari, mura, ciwon makogwaro)',
        digestive: 'Ciwon Ciki (zawo, ciwon ciki)',
        urinary: 'Ciwon fitsari',
        skin: 'Ciwon fata (miki, kyasbi, kurji)',
        fever: 'Zazzabi',
        ear_eye: 'Ciwon kunne/ido',
        lt_24h: 'Kasa da sa`oi 24',
        d1_3: 'Kwana 1-3',
        d4_7: 'Kwana 4-7',
        gt_week: 'Sama da sati daya',
        mild: 'Kadanci',
        moderate: 'Tsaka-tsaki',
        severe: 'Mai tsanani',
        improving: 'Yana raguwa',
        stable: 'Kamarsu daya',
        worsening: 'Yana karuwa'
      }
    }
  },
  yo: {
    nav: { learn: 'Kọ́', verify: 'Ṣàyẹ̀wò', track: 'Tọpinpin', reminders: 'Olùránnilétí' },
    home: {
      hero_title: 'Láti Ẹ̀kọ́ sí Ṣàyẹ̀wò',
      hero_subtitle: 'Alábàáṣiṣẹ́ Ààbò Ògùn Rẹ',
      get_started: 'Bẹ̀rẹ̀ Ní báyìí',
      problem_title: 'Nàìjíríà ń dojú kọ wàhálà ìlera tó le',
      feature_title: 'Ìpele Kan. Ìpinnu Mẹ́ta.',
      start_learning: 'Bẹ̀rẹ̀ sí ní Kọ́ Ẹ̀kọ́ Yìí'
    },
    symptom: {
      title: 'Ibi Ṣìyẹ̀wò Àìsàn',
      q: {
        age: 'Ọmọ ọdun melo ni ẹ?',
        conditions: 'Njẹ ẹ ní àìsàn kankan tẹlẹ rí?',
        type: 'Irú àìsàn wo ni ẹ n lára?',
        resp_dur: 'Ìgbà wo ni ikọ́ tàbí ọtútù yìí ti bẹ̀rẹ̀?',
        resp_sev: 'Báwo ni àìsàn náà ṣe lágbára tó?',
        dig_dur: 'Ìgbà wo ni inú rírù yìí bẹ̀rẹ̀?',
        dig_sev: 'Báwo ni inú rírù náà ṣe rí?',
        uri_dur: 'Ìgbà wo ni ìṣòro ìtọ̀ yìí bẹ̀rẹ̀?',
        uri_sev: 'Báwo ni ìṣòro ìtọ̀ náà ṣe le tó?',
        skin_dur: 'Ìgbà wo ni àìsàn awọ-ara yìí ti bẹ̀rẹ̀?',
        skin_sev: 'Báwo ni àìsàn awọ-ara náà ṣe rí?',
        fever_dur: 'Ìgbà wo ni ara rẹ ti bẹ̀rẹ̀ sí ní gbóná?',
        fever_sev: 'Báwo ni ara gbígbóná rẹ ṣe rí?',
        ear_sev: 'Báwo ni ojú tàbí etí rẹ ṣe dé?',
        prev_anti: 'Njẹ ẹ ti lo ògùn apakòkòrò (antibiotics) ní ọ̀sẹ̀ mẹ́rin sẹ́yìn?',
        traj: 'Ṣé àìsàn náà ń lọ tàbí ó ń le sí i?'
      },
      opt: {
        child: 'Ondubẹrẹ ọdun marun-un',
        young: 'Ọdun marun-un sí mkejila',
        adult: 'Agbalagba (Ọdun 18-60)',
        senior: 'Agbalagba ju ọdun 60 lọ',
        none: 'Kò sí àìsàn kankan',
        diabetes: 'Súgà',
        hypertension: 'Ìfúnpá Gíga',
        multiple: 'Àìsàn melo kan',
        respiratory: 'Inu Àyà (Ikọ́, Ọtútù, Ọ̀fun dídùn)',
        digestive: 'Inú rírù (Inú ríun)',
        urinary: 'Ìgbà táa bá tọ̀ (Irora nígbà ìtọ̀)',
        skin: 'Awọ-ara (Ọgbẹ́, Iru, Bọ́ìlì)',
        fever: 'Ibà (Ara gbígbóná)',
        ear_eye: 'Etí tàbí Ojú (Ìrora)',
        lt_24h: 'Kò tó wákàtí mẹ́rinlelogun',
        d1_3: 'Ọjọ́ 1-3',
        d4_7: 'Ọjọ́ 4-7',
        gt_week: 'Ju ọ̀sẹ̀ kan lọ',
        mild: 'Díẹ̀',
        moderate: 'Bẹ́ẹ̀ bẹ́ẹ̀ lọ',
        severe: 'Lágbára gan-an',
        improving: 'Ó ń lọ díẹ̀díẹ̀',
        stable: 'Kò yípadà',
        worsening: 'Ó ń le sí i'
      }
    }
  },
  ig: {
    nav: { learn: 'Mụta', verify: 'Nwalee', track: 'Soro ya', reminders: 'Ihe ncheta' },
    home: {
      hero_title: 'Site na Mmụta gaa na Nnyocha',
      hero_subtitle: 'Onye Enyemaka Nchebe Ọgwụ Gị',
      get_started: 'Malite Ugbu a',
      problem_title: 'Nigeria na-eche nnukwu nsogbu ahụike ihu',
      feature_title: 'Otu Ikpo okwu. Ngwọta Atọ.',
      start_learning: 'Malite Mmụta Taa'
    },
    symptom: {
      title: 'Ihe Nleba Anya Mgbu',
      q: {
        age: 'Afọ ole ka ị gbara?',
        conditions: 'Ị nwere ọrịa ọ bụla nke ị nweburu?',
        type: 'Kedu ụdị mgbu ị na-enwe?',
        resp_dur: 'Ebee ka ụkwara a si bido na ole oge?',
        resp_sev: 'Kedu otú mgbu a siri dị njọ?',
        dig_dur: 'Ogologo oge ole ka afọ gị na-egbu gị?',
        dig_sev: 'Kedu otú mgbu afọ ahụ dị?',
        uri_dur: 'Ogologo oge ole ka ị nwere nsogbu urinary?',
        uri_sev: 'Kedu otú nsogbu urinary ahụ siri dị njọ?',
        skin_dur: 'Ogologo oge ole ka ị nwere nsogbu akpụkpọ ahụ a?',
        skin_sev: 'Kedu otú nsogbu akpụkpọ ahụ ahụ dị?',
        fever_dur: 'Amaka ahụ ọkụ a siri dị ole oge?',
        fever_sev: 'Kedu otú ahụ ọkụ gị dị n`oge a?',
        ear_sev: 'Kedu ụdị mgbu na-adị gị na ntị ma ọ bụ n`anya?',
        prev_anti: 'Ị nụọla ọgwụ antibiotics n`ime izu anọ gara aga?',
        traj: 'Ahụ gị ọ na-adị mma ka ọ na-aka njọ?'
      },
      opt: {
        child: 'Onye na-erubeghị afọ ise',
        young: 'Afọ ise ruo iri na asatọ',
        adult: 'Okenye (Afọ 18-60)',
        senior: 'Ndi gafere afọ 60',
        none: 'Enweghị m ọrịa ọ bụla',
        diabetes: 'Ọrịa Shuga',
        hypertension: 'Ọbara Mgbali Elu',
        multiple: 'Ọtụtụ ọrịa dị iche iche',
        respiratory: 'Iku ume (ụkwara, imi na-agba agba, mgbu akpịrị)',
        digestive: 'Afọ (ọbara afọ, mgbu afọ)',
        urinary: 'Ihe nsi (mgbu n`oge nsi)',
        skin: 'Akpụkpọ ahụ (ọnya, rash, boil)',
        fever: 'Iba (Ahụ ọkụ)',
        ear_eye: 'Ntị ma ọ bụ Anya (Mgbasa ma ọ bụ mgbu)',
        lt_24h: 'O nwebeghị awa iri abụọ na anọ',
        d1_3: 'Ụbọchị 1-3',
        d4_7: 'Ụbọchị 4-7',
        gt_week: 'Ihe karịrị otu izu',
        mild: 'Obere',
        moderate: 'N-etiti',
        severe: 'Nnukwu',
        improving: 'Ọ na-adị mma nwayọ nwayọ',
        stable: 'Ọ naghị agbanwe agbanwe',
        worsening: 'Ọ na-aka njọ'
      }
    }
  }
};

export const useTranslation = (language) => {
  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    if (!result) result = translations['en']; // Fallback to EN if lang missing
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        // Final fallback to English key if specific language key is missing
        let fallback = translations['en'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey]) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback || path;
      }
    }
    return result || path;
  };
  return { t };
};

export const lang = (options) => {
  if (!options) return '';
  const currentLang = localStorage.getItem('medwise-language') || 'en';
  return options[currentLang] || options['en'] || Object.values(options)[0] || '';
};
