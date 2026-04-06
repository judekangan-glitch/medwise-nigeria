const fs = require('fs');

const file = 'src/pages/SymptomChecker.jsx';
let content = fs.readFileSync(file, 'utf8');

// We will change the 'handleAnswer' function to lookup by ID if next is string.
const handleAnswerFix = `
    } else if (option.next !== undefined) {
      setTimeout(() => {
        if (typeof option.next === 'string') {
          const nextIndex = questions.findIndex(q => q.id === option.next);
          setCurrentStep(nextIndex !== -1 ? nextIndex : currentStep + 1);
        } else {
          setCurrentStep(option.next);
        }
      }, 300)
    } else if (!option.recommendation && option.next === undefined) {
`;
content = content.replace(/\} else if \(option\.next !== undefined\) \{[\s\S]*?\} else if \(!option\.recommendation && option\.next === undefined\) \{/, handleAnswerFix.trim() + ' {');

const questionsArr = `[
    {
      id: 'age_group',
      question: lang({en:'Hello! I am Dr. Ada. I will help assess your symptoms. First, what is your age group?',pidgin:'I salute you! My name na Dr. Ada. I wan help check your sickness. First, how old you be?',ha:'Barkan ku! Ni ce Dr. Ada. Zan taimaka duba alamun ku. Da farko, menene rukunin shekarunku?',yo:'Ẹ n lẹ o! Èmi ni Dr. Ada. Máa ràn yín lọ́wọ́ láti yẹ àwọn àmì àìsàn rẹ wò. Lákọ̀ọ́kọ́, ọmọ ọdún melo ni ẹ?',ig:'Ndewo! Abụ m Dr. Ada. Aga m enyere gị aka inyocha ihe mgbu gị. Nke mbụ, afọ ole ka ị gbara?'}),
      category: 'demographics',
      options: [
        { value: 'child', label: lang({en:'Below 5 years',pidgin:'Pikin wey never reach 5 years',ha:'Kasa da shekara 5',yo:'Ìsalẹ̀ ọdún marun-un',ig:'Ihe karịrị afọ ise'}), risk: 2, next: 'self_medication' },
        { value: 'young', label: lang({en:'5-18 years',pidgin:'Young person (5-18 years)',ha:'Shekara 5 zuwa 18',yo:'Ọdun marun-un sí mjẹ́ríndínlógún',ig:'Afọ ise ruo iri na asatọ'}), risk: 1, next: 'self_medication' },
        { value: 'adult', label: lang({en:'18-60 years',pidgin:'Big person (18-60 years)',ha:'Shekara 18 zuwa 60',yo:'Agbalagba (Ọdun 18-60)',ig:'Okenye (Afọ 18-60)'}), risk: 0, next: 'self_medication' },
        { value: 'senior', label: lang({en:'Above 60 years',pidgin:'Mama/Papa (Above 60 years)',ha:'Sama da shekara 60',yo:'Agbalagba ju ọdún 60 lọ',ig:'Ndi gafere afọ 60'}), risk: 3, next: 'self_medication' },
      ]
    },
    {
      id: 'self_medication',
      question: lang({en:'Have you taken any treatments for this sickness yet?',pidgin:'You don take any medicine or agbo for this sickness?',ha:'Kun sha wani magani game da wannan ciwon?',yo:'Nje e ti lo ogun kankan fun aisan yii?',ig:'I nuola ogwu o bula maka oria a?'}),
      category: 'history',
      options: [
        { value: 'none', label: lang({en:'No, nothing yet',pidgin:'No, I never take anything',ha:'A\'a, ban sha magani ba',yo:'Rara, mi o ti lo nkan kan',ig:'Mba, e nwebeghi ihe m mere'}), risk: 0, next: 'existing_conditions' },
        { value: 'painkillers', label: lang({en:'Yes, painkillers (Paracetamol etc)',pidgin:'Yes, I drink panadol/painkiller',ha:'Eh, na sha maganin ciwo',yo:'Beeni, mo lo ogun inu riru',ig:'Ee, m nuola ogwu mgbu'}), risk: 0, next: 'existing_conditions' },
        { value: 'herbs', label: lang({en:'Yes, traditional medicine (Agbo/Herbs)',pidgin:'Yes, I don drink agbo',ha:'Eh, na sha maganin gargajiya',yo:'Beeni, mo ti mu agbo',ig:'Ee, m nuola ogwu ofia'}), risk: 2, next: 'existing_conditions' },
        { value: 'antibiotics', label: lang({en:'Yes, I bought antibiotics',pidgin:'Yes, I buy antibiotics',ha:'Eh, na sayi maganin kashe kwayoyin cuta',yo:'Beeni, mo ra ogun apakokoro',ig:'Ee, mgorola ogwu antibiotics'}), risk: 3, next: 'existing_conditions' },
      ]
    },
    {
      id: 'existing_conditions',
      question: lang({en:'Do you have any existing health conditions?',pidgin:'Anything else dey worry you before?',ha:'Kuna da wani ciwo tun da farko?',yo:'Njẹ ẹ ní àìsàn kankan tẹlẹ rí?',ig:'Ị nwere ọrịa ọ bụla nke ị nweburu?'}),
      category: 'demographics',
      options: [
        { value: 'none', label: lang({en:'No existing conditions',pidgin:'Nothing dey worry me',ha:'Babu komai',yo:'Kò sí àìsàn kankan',ig:'Enweghị m ọrịa ọ bụla'}), risk: 0, next: 'symptom_type' },
        { value: 'diabetes', label: lang({en:'Diabetes',pidgin:'Sugar for body (Diabetes)',ha:'Ciwon Suga',yo:'Súgà',ig:'Ọrịa Shuga'}), risk: 2, next: 'symptom_type' },
        { value: 'hypertension', label: lang({en:'Hypertension',pidgin:'B-P (Hypertension)',ha:'Hawan Jini',yo:'Ìfúnnpá Gíga',ig:'Ọbara mgbali elu'}), risk: 1, next: 'symptom_type' },
        { value: 'multiple', label: lang({en:'Multiple conditions',pidgin:'Plenty things dey worry me',ha:'Ciwon yana da yawa',yo:'Àìsàn melo kan',ig:'ỌTụtụ ọrịa'}), risk: 3, next: 'symptom_type' },
      ]
    },
    {
      id: 'symptom_type',
      question: lang({en:'What type of symptoms are you experiencing?',pidgin:'Which place inside your body dey worry you?',ha:'Wane irin ciwo kuke ji?',yo:'Irú àìsàn wo ni ẹ n lára?',ig:'Kedu ụdị mgbu ị na-enwe?'}),
      category: 'primary',
      options: [
        { value: 'respiratory', label: lang({en:'Respiratory (cough, cold, sore throat)',pidgin:'Inside my chest (Cough, Catarrh, Sore throat)',ha:'Ciwon Shaka (tari, mura, ciwon makogwaro)',yo:'Inu Àyà (Ikọ́, Ọtútù, Ọfun dídùn)',ig:'Iku ume (ụkwara, imi, mgbu akpịrị)'}), next: 'respiratory_duration' },
        { value: 'digestive', label: lang({en:'Digestive (diarrhea, stomach pain)',pidgin:'My belle (Running belle, Belle pain)',ha:'Ciwon Ciki (zawo, ciwon ciki)',yo:'Inú rírù (Inú ríun, Irora inú)',ig:'Afọ (ọbara afọ, mgbu afọ)'}), next: 'digestive_duration' },
        { value: 'urinary', label: lang({en:'Urinary (painful urination)',pidgin:'To pass water (Pee dey pain me)',ha:'Ciwon fitsari',yo:'Ìṣòro ìtọ̀ (Irora nígbà ìtọ̀)',ig:'Ihe nsi (mgbu n\'oge nsi)'}), next: 'urinary_duration' },
        { value: 'skin', label: lang({en:'Skin infection (wound, rash, boil)',pidgin:'My Skin (Wound, Rash, Boil)',ha:'Ciwon fata (miki, kyasbi, kurji)',yo:'Awọ-ara (Ọgbẹ́, Iru, Bọ́ìlì)',ig:'Akpụkpọ ahụ (ịnya, rash, boil)'}), next: 'skin_duration' },
        { value: 'fever', label: lang({en:'Fever (high temperature)',pidgin:'Hot body (Fever)',ha:'Zazzabi',yo:'Ibà (Ara gbígbóná)',ig:'Iba (Ahụ ọkụ)'}), next: 'fever_duration' },
        { value: 'ear_eye', label: lang({en:'Ear/Eye infection',pidgin:'My Ear or Eye (Discharge or pain)',ha:'Ciwon kunne/ido',yo:'Etí tàbí Ojú (Ìronra)',ig:'Ntị ma ọ bụ Anya (mgbu)'}), next: 'ear_severity' },
      ]
    },
    // RESPIRATORY
    {
      id: 'respiratory_duration',
      question: lang({en:'How long have you had respiratory symptoms?',pidgin:'How long you don dey get this cough or catarrh?',ha:'Har tsawon wane lokaci kuke fama da tari?',yo:'Ìgbà wo ni ikọ́ tàbí ọtútù yìí ti bẹ̀rẹ̀?',ig:'Ogologo oge ole ka ụkwara a si bido?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}), risk: 1, next: 'respiratory_phlegm' },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days so',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}), risk: 1, next: 'respiratory_phlegm' },
        { value: '4_7_days', label: lang({en:'4-7 days',pidgin:'Almost one week now',ha:'Kwana 4-7',yo:'Ọjọ́ 4-7',ig:'Ụbọ chị 4-7'}), risk: 2, next: 'respiratory_phlegm' },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}), risk: 3, next: 'respiratory_phlegm' },
      ]
    },
    {
      id: 'respiratory_phlegm',
      question: lang({en:'Are you coughing out any phlegm or spit, and what color is it?',pidgin:'You dey cough out any spit? Wetin be the color?',ha:'Kuna tari da kaki? Wane launi ne?',yo:'Nje e n wu ofun jade, awo wo ni o ni?',ig:'I na akwacha akwacha? agba gini ka odi?'}),
      category: 'details',
      options: [
        { value: 'dry', label: lang({en:'Dry cough (No phlegm)',pidgin:'Dry cough (Nothing dey comot)',ha:'Tari mara kaki',yo:'Iko gbigbe (Ko si ofun)',ig:'Ukwara nchara (Enweghi akwacha)'}), risk: 0, next: 'respiratory_severity' },
        { value: 'clear', label: lang({en:'Clear or white phlegm',pidgin:'White spit',ha:'Farin kaki',yo:'Ofun funfun',ig:'Akwacha ocha'}), risk: 1, next: 'respiratory_severity' },
        { value: 'colored', label: lang({en:'Yellow, green, or bloody phlegm',pidgin:'Yellow, green, or blood spit',ha:'Kaki mai launi/jini',yo:'Ofun awo ofeeyi/pupa',ig:'Akwacha odo/uhie'}), risk: 3, next: 'respiratory_severity' },
      ]
    },
    {
      id: 'respiratory_severity',
      question: lang({en:'How severe are your respiratory symptoms?',pidgin:'How the sickness dey do you?',ha:'Yaya tsananin ciwon shaka yake?',yo:'Báwo ni àìsàn ẹ̀dọ̀fóró náà ṣe lágbára tó?',ig:'Kedu otú mgbu iku ume siri dị njọ?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild (slight cough, no fever)',pidgin:'Small small (Small cough, body no hot)',ha:'Kadanci (tari kadan, babu zazzabi)',yo:'Díẹ̀ (Ikọ́ kékéré, kò sí ibà)',ig:'Obere (ụkwara obere, ọ dịghị iba)'}), recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: lang({en:'Moderate (sore throat, low fever)',pidgin:'E reach middle (Sore throat, body small hot)',ha:'Tsaka-tsaki (makogwaro yana ciwo, zazzabi kadan)',yo:'Bẹ́ẹ̀ bẹ́ẹ̀ lọ (Ọfun dídùn, Ibà díẹ̀)',ig:'N-etiti (mgbu akpịrị, iba obere)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe (difficulty breathing, chest pain)',pidgin:'E bad well well (Breath no dey reach, chest pain)',ha:'Mai tsanani (wahalar numfashi, ciwo a kirji)',yo:'Lágbára (Ìṣòro mímí, Irora àyà)',ig:'Nnukwu (nsogbu iku ume, mgbu obi)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    // DIGESTIVE
    {
      id: 'digestive_duration',
      question: lang({en:'How long have you had digestive symptoms?',pidgin:'How long your belle don dey run?',ha:'Har tsawon lokacin da kuka ji ciwon ciki?',yo:'Ìgbà wo ni inú rírù yìí bẹ̀rẹ̀?',ig:'Ogologo oge ole ka afọ gị na-egbu gị?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}), risk: 1, next: 'digestive_hydration' },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days so',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}), risk: 1, next: 'digestive_hydration' },
        { value: '4_7_days', label: lang({en:'4-7 days',pidgin:'Almost one week now',ha:'Kwana 4-7',yo:'Ọjọ́ 4-7',ig:'Ụbọ chị 4-7'}), risk: 2, next: 'digestive_hydration' },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}), risk: 3, next: 'digestive_hydration' },
      ]
    },
    {
      id: 'digestive_hydration',
      question: lang({en:'Are you able to drink water and keep it down without vomiting?',pidgin:'You fit drink water make you no vomit am?',ha:'Kuna iya shan ruwa ba tare da amayi ba?',yo:'Nje e le mu omi laisi eebi?',ig:'I nwere ike inu mmiri n-enweghi agbogho?'}),
      category: 'details',
      options: [
        { value: 'yes', label: lang({en:'Yes, I can keep liquids down',pidgin:'Yes, I fit drink well',ha:'Eh, ina iya sha',yo:'Beeni, mo le mu',ig:'Ee, m nwere ike inu'}), risk: 0, next: 'digestive_severity' },
        { value: 'no', label: lang({en:'No, I vomit everything',pidgin:'No, I dey vomit everything',ha:'A\'a, ina amayi duka',yo:'Rara, mo n bi gbogbo re',ig:'Mba, a na m agbo ife ncha'}), recommendation: 'urgent', risk: 4 }, // Instant stop
      ]
    },
    {
      id: 'digestive_severity',
      question: lang({en:'Describe your digestive symptoms:',pidgin:'How the belle sickness dey do you?',ha:'Yaya ciwon cikin nan yake?',yo:'Báwo ni inú rírù náà ṣe rí?',ig:'Kedu otú mgbu afọ ahụ dị?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild (upset stomach, no fever)',pidgin:'Small small (Belle just dey disturb, body no hot)',ha:'Kadanci (damuwar ciki, babu zazzabi)',yo:'Díẹ̀ (Ìbínú inú, kò sí ibà)',ig:'Obere (nsogbu afọ, ọ dịghị iba)'}), recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: lang({en:'Moderate (persistent diarrhea with fever)',pidgin:'E reach middle (Belle dey run well, body small hot)',ha:'Tsaka-tsaki (zawo da zazzabi)',yo:'Bẹ́ẹ̀ bẹ́ẹ̀ lọ (Ìgbẹ́ gbígbẹ́ pẹ̀lú ibà)',ig:'N-etiti (ọbara afọ na iba)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe (bloody stool, high fever)',pidgin:'E bad well well (Blood for inside sheet, body hot well)',ha:'Mai tsanani (jini a najasa, zazzabi mai tsanani)',yo:'Lágbára (Ẹ̀jẹ̀ nínú igbẹ́, Ibà lílé)',ig:'Nnukwu (ọbara n-ime nkwọ, iba nnukwu)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    // URINARY
    {
      id: 'urinary_duration',
      question: lang({en:'How long have you had urinary symptoms?',pidgin:'How long pee don dey pain you?',ha:'Har tsawon lokacin da kuka ji ciwon fitsari?',yo:'Ìgbà wo ni ìṣòro ìtọ̀ yìí bẹ̀rẹ̀?',ig:'Ogologo oge ole ka nsogbu urinary si bido?'}),
      category: 'details',
      options: [
        { value: '1_3_days', label: lang({en:'Less than 3 days',pidgin:'E never pass 3 days',ha:'Kasa da kwana 3',yo:'Kò tó ọjọ́ mẹta',ig:'Ụbọ chị e ruola ato'}), risk: 1, next: 'urinary_severity' },
        { value: 'more_than_3_days', label: lang({en:'More than 3 days',pidgin:'E don pass 3 days',ha:'Sama da kwana 3',yo:'Ju ọjọ kẹta lọ',ig:'Ihe karịrị ubochi ato'}), risk: 3, next: 'urinary_severity' },
      ]
    },
    {
      id: 'urinary_severity',
      question: lang({en:'How severe are your urinary symptoms?',pidgin:'How the pee pain dey reach?',ha:'Yaya ciwon fitsarin yake?',yo:'Báwo ni ìṣòro ìtọ̀ náà ṣe le tọ́?',ig:'Kedu otú nsogbu urinary siri dị njọ?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild (slight discomfort)',pidgin:'Small small pain',ha:'Kadanci (damuwa kadan)',yo:'Díẹ̀ (Ìbànjẹ́ díẹ̀)',ig:'Obere (nsogbu obere)'}), recommendation: 'see_doctor', risk: 1 },
        { value: 'moderate', label: lang({en:'Moderate (painful urination with fever)',pidgin:'E reach middle (E dey pain and body hot)',ha:'Tsaka-tsaki (ciwo yayin fitsari da zazzabi)',yo:'Bẹ́ẹ̀ bẹ́ẹ̀ lọ (Irora ìtọ̀ pẹ̀lú ibà)',ig:'N-etiti (mgbu n-oge nsi na iba)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe (blood in urine, back pain)',pidgin:'E bad well well (Blood for inside pee, back pain)',ha:'Mai tsanani (jini a fitsari, ciwo a baya)',yo:'Lágbára (Ẹ̀jẹ̀ nínú ìtọ̀, Irora ẹ̀yìn)',ig:'Nnukwu (ọbara n-ime nsi, mgbu azụ)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    // SKIN
    {
      id: 'skin_duration',
      question: lang({en:'How long have you had this skin condition?',pidgin:'How long your skin don dey do you like this?',ha:'Har tsawon lokacin da kuka ji ciwon fata?',yo:'Ìgbà wo ni àìsàn awọ-ara yìí ti bẹ̀rẹ̀?',ig:'Ogologo oge ole ka nsogbu akpụkpọ ahụ si bido?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}), risk: 0, next: 'skin_severity' },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}), risk: 1, next: 'skin_severity' },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}), risk: 3, next: 'skin_severity' },
      ]
    },
    {
      id: 'skin_severity',
      question: lang({en:'Describe your skin condition:',pidgin:'How the skin sickness be?',ha:'Yaya ciwon fatan nan yake?',yo:'Báwo ni àìsàn awọ-ara náà ṣe rí?',ig:'Kedu otú nsogbu akpụkpọ ahụ dị?'}),
      category: 'severity',
      options: [
        { value: 'minor', label: lang({en:'Minor (small cut, no pus)',pidgin:'Small small (Small cut, no wetin dey inside)',ha:'Karami (karamin yanki, babu ruwa)',yo:'Kékéré (Gẹ́gẹ́ kékéré, kò sí ẹ̀jẹ̀)',ig:'Obere (ịnya obere, ọ dịghị ọbara)'}), recommendation: 'self_care', risk: 0 },
        { value: 'infected', label: lang({en:'Infected (swollen, red, with pus)',pidgin:'E don swell (Red, pus dey inside)',ha:'Infection (kumburin, ja, da ruwa)',yo:'Àkóràn (Wíwú, Pupa, pẹ̀lú ẹ̀jẹ̀)',ig:'Ọrịa (ọbụbọ, ọbara na njọ)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'spreading', label: lang({en:'Spreading rapidly (red lines, fever)',pidgin:'E dey spread quick (Red lines, body hot)',ha:'Yaduwa da sauri (layin ja, zazzabi)',yo:'Títàn Yárà (Àwọn ìlà pupa, Ibà)',ig:'Na-agbasa ọ sọ (ahịrị ọbara, iba)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    // FEVER
    {
      id: 'fever_duration',
      question: lang({en:'How long have you had fever?',pidgin:'How long your body don dey hot?',ha:'Har tsawon wane lokaci jikinku yake zafi?',yo:'Ìgbà wo ni ara rẹ ti bẹ̀rẹ̀ sí ní gbóná?',ig:'Amaka ahụ ọkụ a siri dị ole oge?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}), risk: 1, next: 'fever_test' },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}), risk: 1, next: 'fever_test' },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}), risk: 3, next: 'fever_test' },
      ]
    },
    {
      id: 'fever_test',
      question: lang({en:'Have you done a Malaria or Typhoid test for this fever?',pidgin:'You don run Malaria or Typhoid test for this hot body?',ha:'Kun yi gwajin zazzabin cizon sauro ko na taifod?',yo:'Nje e ti se ayewo iba tifooid tabi malari?',ig:'I meela ule malaria ma o bu typhoid?'}),
      category: 'history',
      options: [
        { value: 'positive', label: lang({en:'Yes, it was positive',pidgin:'Yes, dem see am',ha:'Eh, an gani',yo:'Beeni, won ri nkankan',ig:'Ee, a choro ya'}), recommendation: 'see_doctor', risk: 2 }, // Doctor needed for meds
        { value: 'negative', label: lang({en:'Yes, it was negative',pidgin:'Yes, dem no see anything',ha:'Eh, ba a gani ba',yo:'Beeni, won o ri nkankan',ig:'Ee, ahubeghi ife'}), risk: 0, next: 'fever_severity' },
        { value: 'not_tested', label: lang({en:'No, I haven\'t tested yet',pidgin:'No, I never test',ha:'A\'a, ban yi gwaji ba tukunna',yo:'Rara, mi o tii se ayewo',ig:'Mba, e mebeghi m ule'}), risk: 1, next: 'fever_severity' },
      ]
    },
    {
      id: 'fever_severity',
      question: lang({en:'What is your fever status?',pidgin:'How the hot body dey do you?',ha:'Menene yanayin zazzabin ku?',yo:'Báwo ni ara gbígbóná rẹ ṣe rí?',ig:'Kedu otú ahụ ọkụ gị dị?'}),
      category: 'severity',
      options: [
        { value: 'low', label: lang({en:'Low-grade fever',pidgin:'Body small hot',ha:'Zazzabi mai kadan',yo:'Ibà díẹ̀',ig:'Iba obere'}), recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: lang({en:'Moderate fever with body aches',pidgin:'Body hot reach middle and bone dey pain',ha:'Zazzabi mai tsaka-tsaki da ciwo a jiki',yo:'Ibà àárín pẹ̀lú irora ara',ig:'Iba n-etiti na mgbu ahụ'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'high', label: lang({en:'High fever, confusion, weakness',pidgin:'Body hot well well, head confuse, no power',ha:'Zazzabi mai tsanani, rudu, raunin jiki',yo:'Ibà lílé, Ìdarúdàpọ̀, Àìlera',ig:'Iba nnukwu, mgbagwoju anya, ogochere'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    // EAR/EYE
    {
      id: 'ear_severity',
      question: lang({en:'Describe your ear/eye condition:',pidgin:'How the ear or eye de do you?',ha:'Yaya yanayin kunne ko idonku yake?',yo:'Báwo ni ojú tàbí etí rẹ ṣe dé?',ig:'Kedu ụdị mgbu na-adị gị na ntị ma ọ bụ n-anya?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild discomfort, slight redness',pidgin:'Small pain, small red',ha:'Dan damuwa, dan ja',yo:'Ìbànjẹ́ díẹ̀, Pupa díẹ̀',ig:'Nsogbu obere, ọbara obere'}), recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: lang({en:'Pain with discharge',pidgin:'Pain and something dey come out',ha:'Ciwo da ruwan kunne/ido',yo:'Irora pẹ̀lú ọ̀jẹ̀',ig:'Mgbu na ihe na-aputa'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe pain, pus, vision/hearing loss',pidgin:'Big pain, pus dey, I no dey see or hear well',ha:'Ciwo mai tsanani, ruwa, dan gani/ji',yo:'Irora lílé, Ẹ̀jẹ̀, Àíríran/Àígbọ́ràn',ig:'Mgbu nnukwu, ọbara, sufeghị anya/ntu'}), recommendation: 'urgent', risk: 4 },
      ]
    }
  ]`;

content = content.replace(/const questions = \[[\s\S]*?^  \]/m, "const questions = " + questionsArr);

// Also need to improve UI styling slightly
// From: className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
// To: className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden ring-1 ring-black/5"
content = content.replace(
  /className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"/g,
  'className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden ring-1 ring-slate-900/5"'
);

// Add a gradient background to the page wrapper child instead of plain bg-slate-50
content = content.replace(
  /className="w-full max-w-4xl pt-2 pb-10"/g,
  'className="w-full max-w-4xl pt-2 pb-10 relative z-10"'
);

// We need to alter the PageWrapper content directly, but SymptomChecker is wrapped inside PageWrapper.
// We can add absolute positioned gradient blobs to SymptomChecker return.
const uiBlobs = `
    <div className="relative min-h-[80vh]">
      {/* Decorative Gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-3xl`;

content = content.replace(/<div className="max-w-3xl/g, uiBlobs);

// close the div wrapper at the very bottom
content = content.replace(/<\/div>\n    <\/PageWrapper>/g, "</div>\n    </div>\n    </PageWrapper>");

// Update user chat bubble styling
content = content.replace(
  /className="bg-teal-600 text-white rounded-2xl rounded-tr-sm p-4 shadow-sm"/g,
  'className="bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl rounded-tr-sm p-4 shadow-md"'
);

// Update doctor chat bubble styling 
content = content.replace(
  /className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm p-4 shadow-sm border border-slate-200"/g,
  'className="bg-white text-slate-800 rounded-2xl rounded-tl-sm p-4 shadow-sm border border-slate-100"'
);

// Improve options buttons hover effect
content = content.replace(
  /className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-slate-700 font-medium transition-colors"/g,
  'className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50 hover:shadow-md text-slate-700 font-medium transition-all duration-200 transform hover:-translate-y-1"'
);

fs.writeFileSync(file, content);
console.log('Successfully updated SymptomChecker.jsx');
