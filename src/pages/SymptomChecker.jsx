import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Users, AlertCircle, TrendingUp, Zap, Clock, ArrowLeft, Stethoscope, ClipboardList, Send, FileText, Download, UserRound, Activity, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'
import { useGamification } from '../hooks/useGamification'
import PageWrapper from '../components/PageWrapper'

export default function SymptomChecker() {
  const { user, language, showToast, theme } = useMedwise()
  const { t } = useTranslation(language)
  const { awardPoints, checkAchievement } = useGamification()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [riskScore, setRiskScore] = useState(0)
  const [showReport, setShowReport] = useState(false)
  const chatEndRef = useRef(null)

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentStep, result, showReport])

  // Translation helper
  const lang = (map) => map[language] ?? map['en']

  const questions = [
    {
      id: 'age_group',
      question: {en:'Hello! I am Dr. Ada. I will help assess your symptoms. First, what is your age group?',pidgin:'I salute you! My name na Dr. Ada. I wan help check your sickness. First, how old you be?',ha:'Barkan ku! Ni ce Dr. Ada. Zan taimaka duba alamun ku. Da farko, menene rukunin shekarunku?',yo:'Ẹ n lẹ o! Èmi ni Dr. Ada. Máa ràn yín lọ́wọ́ láti yẹ àwọn àmì àìsàn rẹ wò. Lákọ̀ọ́kọ́, ọmọ ọdún melo ni ẹ?',ig:'Ndewo! Abụ m Dr. Ada. Aga m enyere gị aka inyocha ihe mgbu gị. Nke mbụ, afọ ole ka ị gbara?'},
      category: 'demographics',
      options: [
        { value: 'child', label: {en:'Below 5 years',pidgin:'Pikin wey never reach 5 years',ha:'Kasa da shekara 5',yo:'Ìsalẹ̀ ọdún marun-un',ig:'Ihe karịrị afọ ise'}, risk: 2, next: 'self_medication' },
        { value: 'young', label: {en:'5-18 years',pidgin:'Young person (5-18 years)',ha:'Shekara 5 zuwa 18',yo:'Ọdun marun-un sí mjẹ́ríndínlógún',ig:'Afọ ise ruo iri na asatọ'}, risk: 1, next: 'self_medication' },
        { value: 'adult', label: {en:'18-60 years',pidgin:'Big person (18-60 years)',ha:'Shekara 18 zuwa 60',yo:'Agbalagba (Ọdun 18-60)',ig:'Okenye (Afọ 18-60)'}, risk: 0, next: 'self_medication' },
        { value: 'senior', label: {en:'Above 60 years',pidgin:'Mama/Papa (Above 60 years)',ha:'Sama da shekara 60',yo:'Agbalagba ju ọdún 60 lọ',ig:'Ndi gafere afọ 60'}, risk: 3, next: 'self_medication' },
      ]
    },
    {
      id: 'self_medication',
      question: {en:'Have you taken any treatments for this sickness yet?',pidgin:'You don take any medicine or agbo for this sickness?',ha:'Kun sha wani magani game da wannan ciwon?',yo:'Nje e ti lo ogun kankan fun aisan yii?',ig:'I nuola ogwu o bula maka oria a?'},
      category: 'history',
      options: [
        { value: 'none', label: {en:'No, nothing yet',pidgin:'No, I never take anything',ha:"A'a, ban sha magani ba",yo:'Rara, mi o ti lo nkan kan',ig:'Mba, e nwebeghi ihe m mere'}, risk: 0, next: 'existing_conditions' },
        { value: 'painkillers', label: {en:'Yes, painkillers (Paracetamol etc)',pidgin:'Yes, I drink panadol/painkiller',ha:'Eh, na sha maganin ciwo',yo:'Beeni, mo lo ogun inu riru',ig:'Ee, m nuola ogwu mgbu'}, risk: 0, next: 'existing_conditions' },
        { value: 'herbs', label: {en:'Yes, traditional medicine (Agbo/Herbs)',pidgin:'Yes, I don drink agbo',ha:'Eh, na sha maganin gargajiya',yo:'Beeni, mo ti mu agbo',ig:'Ee, m nuola ogwu ofia'}, risk: 2, next: 'existing_conditions' },
        { value: 'antibiotics', label: {en:'Yes, I bought antibiotics',pidgin:'Yes, I buy antibiotics',ha:'Eh, na sayi maganin kashe kwayoyin cuta',yo:'Beeni, mo ra ogun apakokoro',ig:'Ee, mgorola ogwu antibiotics'}, risk: 3, next: 'existing_conditions' },
      ]
    },
    {
      id: 'existing_conditions',
      question: {en:'Do you have any existing health conditions?',pidgin:'Anything else dey worry you before?',ha:'Kuna da wani ciwo tun da farko?',yo:'Njẹ ẹ ní àìsàn kankan tẹlẹ rí?',ig:'Ị nwere ọrịa ọ bụla nke ị nweburu?'},
      category: 'demographics',
      options: [
        { value: 'none', label: {en:'No existing conditions',pidgin:'Nothing dey worry me',ha:'Babu komai',yo:'Kò sí àìsàn kankan',ig:'Enweghị m ọrịa ọ bụla'}, risk: 0, next: 'symptom_type' },
        { value: 'diabetes', label: {en:'Diabetes',pidgin:'Sugar for body (Diabetes)',ha:'Ciwon Suga',yo:'Súgà',ig:'Ọrịa Shuga'}, risk: 2, next: 'symptom_type' },
        { value: 'hypertension', label: {en:'Hypertension',pidgin:'B-P (Hypertension)',ha:'Hawan Jini',yo:'Ìfúnnpá Gíga',ig:'Ọbara mgbali elu'}, risk: 1, next: 'symptom_type' },
        { value: 'multiple', label: {en:'Multiple conditions',pidgin:'Plenty things dey worry me',ha:'Ciwon yana da yawa',yo:'Àìsàn melo kan',ig:'ỌTụtụ ọrịa'}, risk: 3, next: 'symptom_type' },
      ]
    },
    {
      id: 'symptom_type',
      question: {en:'What type of symptoms are you experiencing?',pidgin:'Which place inside your body dey worry you?',ha:'Wane irin ciwo kuke ji?',yo:'Irú àìsàn wo ni ẹ n lára?',ig:'Kedu ụdị mgbu ị na-enwe?'},
      category: 'primary',
      options: [
        { value: 'respiratory', label: {en:'Respiratory (cough, cold, sore throat)',pidgin:'Inside my chest (Cough, Catarrh, Sore throat)',ha:'Ciwon Shaka (tari, mura, ciwon makogwaro)',yo:'Inu Àyà (Ikọ́, Ọtútù, Ọfun dídùn)',ig:'Iku ume (ụkwara, imi, mgbu akpịrị)'}, next: 'respiratory_duration' },
        { value: 'digestive', label: {en:'Digestive (diarrhea, stomach pain)',pidgin:'My belle (Running belle, Belle pain)',ha:'Ciwon Ciki (zawo, ciwon ciki)',yo:'Inú rírù (Inú ríun, Irora inú)',ig:'Afọ (ọbara afọ, mgbu afọ)'}, next: 'digestive_duration' },
        { value: 'urinary', label: {en:'Urinary (painful urination)',pidgin:'To pass water (Pee dey pain me)',ha:'Ciwon fitsari',yo:'Ìṣòro ìtọ̀ (Irora nígbà ìtọ̀)',ig:"Ihe nsi (mgbu n'oge nsi)"}, next: 'urinary_duration' },
        { value: 'skin', label: {en:'Skin infection (wound, rash, boil)',pidgin:'My Skin (Wound, Rash, Boil)',ha:'Ciwon fata (miki, kyasbi, kurji)',yo:'Awọ-ara (Ọgbẹ́, Iru, Bọ́ìlì)',ig:'Akpụkpọ ahụ (ịnya, rash, boil)'}, next: 'skin_duration' },
        { value: 'fever', label: {en:'Fever (high temperature)',pidgin:'Hot body (Fever)',ha:'Zazzabi',yo:'Ibà (Ara gbígbóná)',ig:'Iba (Ahụ ọkụ)'}, next: 'fever_duration' },
        { value: 'ear_eye', label: {en:'Ear/Eye infection',pidgin:'My Ear or Eye (Discharge or pain)',ha:'Ciwon kunne/ido',yo:'Etí tàbí Ojú (Ìronra)',ig:'Ntị ma ọ bụ Anya (mgbu)'}, next: 'ear_severity' },
      ]
    },
    // RESPIRATORY
    {
      id: 'respiratory_duration',
      question: {en:'How long have you had respiratory symptoms?',pidgin:'How long you don dey get this cough or catarrh?',ha:'Har tsawon wane lokaci kuke fama da tari?',yo:'Ìgbà wo ni ikọ́ tàbí ọtútù yìí ti bẹ̀rẹ̀?',ig:'Ogologo oge ole ka ụkwara a si bido?'},
      category: 'details',
      options: [
        { value: 'less_than_24h', label: {en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}, risk: 1, next: 'respiratory_phlegm' },
        { value: '1_3_days', label: {en:'1-3 days',pidgin:'Like 1-3 days so',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}, risk: 1, next: 'respiratory_phlegm' },
        { value: '4_7_days', label: {en:'4-7 days',pidgin:'Almost one week now',ha:'Kwana 4-7',yo:'Ọjọ́ 4-7',ig:'Ụbọ chị 4-7'}, risk: 2, next: 'respiratory_phlegm' },
        { value: 'more_than_week', label: {en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}, risk: 3, next: 'respiratory_phlegm' },
      ]
    },
    {
      id: 'respiratory_phlegm',
      question: {en:'Are you coughing out any phlegm or spit, and what color is it?',pidgin:'You dey cough out any spit? Wetin be the color?',ha:'Kuna tari da kaki? Wane launi ne?',yo:'Nje e n wu ofun jade, awo wo ni o ni?',ig:'I na akwacha akwacha? agba gini ka odi?'},
      category: 'details',
      options: [
        { value: 'dry', label: {en:'Dry cough (No phlegm)',pidgin:'Dry cough (Nothing dey comot)',ha:'Tari mara kaki',yo:'Iko gbigbe (Ko si ofun)',ig:'Ukwara nchara (Enweghi akwacha)'}, risk: 0, next: 'respiratory_severity' },
        { value: 'clear', label: {en:'Clear or white phlegm',pidgin:'White spit',ha:'Farin kaki',yo:'Ofun funfun',ig:'Akwacha ocha'}, risk: 1, next: 'respiratory_severity' },
        { value: 'colored', label: {en:'Yellow, green, or bloody phlegm',pidgin:'Yellow, green, or blood spit',ha:'Kaki mai launi/jini',yo:'Ofun awo ofeeyi/pupa',ig:'Akwacha odo/uhie'}, risk: 3, next: 'respiratory_severity' },
      ]
    },
    {
      id: 'respiratory_severity',
      question: {en:'How severe are your respiratory symptoms?',pidgin:'How the sickness dey do you?',ha:'Yaya tsananin ciwon shaka yake?',yo:'Báwo ni àìsàn ẹ̀dọ̀fóró náà ṣe lágbára tó?',ig:'Kedu otú mgbu iku ume siri dị njọ?'},
      category: 'severity',
      options: [
        { value: 'mild', label: {en:'Mild (slight cough, no fever)',pidgin:'Small small (Small cough, body no hot)',ha:'Kadanci (tari kadan, babu zazzabi)',yo:'Díẹ̀ (Ikọ́ kékéré, kò sí ibà)',ig:'Obere (ụkwara obere, ọ dịghị iba)'}, recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: {en:'Moderate (sore throat, low fever)',pidgin:'E reach middle (Sore throat, body small hot)',ha:'Tsaka-tsaki (makogwaro yana ciwo, zazzabi kadan)',yo:'Bẹ́ẹ̀ bẹ́ẹ̀ lọ (Ọfun dídùn, Ibà díẹ̀)',ig:'N-etiti (mgbu akpịrị, iba obere)'}, recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: {en:'Severe (difficulty breathing, chest pain)',pidgin:'E bad well well (Breath no dey reach, chest pain)',ha:'Mai tsanani (wahalar numfashi, ciwo a kirji)',yo:'Lágbára (Ìṣòro mímí, Irora àyà)',ig:'Nnukwu (nsogbu iku ume, mgbu obi)'}, recommendation: 'urgent', risk: 4 },
      ]
    },
    // DIGESTIVE
    {
      id: 'digestive_duration',
      question: {en:'How long have you had digestive symptoms?',pidgin:'How long your belle don dey run?',ha:'Har tsawon lokacin da kuka ji ciwon ciki?',yo:'Ìgbà wo ni inú rírù yìí bẹ̀rẹ̀?',ig:'Ogologo oge ole ka afọ gị na-egbu gị?'},
      category: 'details',
      options: [
        { value: 'less_than_24h', label: {en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}, risk: 1, next: 'digestive_hydration' },
        { value: '1_3_days', label: {en:'1-3 days',pidgin:'Like 1-3 days so',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}, risk: 1, next: 'digestive_hydration' },
        { value: '4_7_days', label: {en:'4-7 days',pidgin:'Almost one week now',ha:'Kwana 4-7',yo:'Ọjọ́ 4-7',ig:'Ụbọ chị 4-7'}, risk: 2, next: 'digestive_hydration' },
        { value: 'more_than_week', label: {en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}, risk: 3, next: 'digestive_hydration' },
      ]
    },
    {
      id: 'digestive_hydration',
      question: {en:'Are you able to drink water and keep it down without vomiting?',pidgin:'You fit drink water make you no vomit am?',ha:'Kuna iya shan ruwa ba tare da amayi ba?',yo:'Nje e le mu omi laisi eebi?',ig:'I nwere ike inu mmiri n-enweghi agbogho?'},
      category: 'details',
      options: [
        { value: 'yes', label: {en:'Yes, I can keep liquids down',pidgin:'Yes, I fit drink well',ha:'Eh, ina iya sha',yo:'Beeni, mo le mu',ig:'Ee, m nwere ike inu'}, risk: 0, next: 'digestive_severity' },
        { value: 'no', label: {en:'No, I vomit everything',pidgin:'No, I dey vomit everything',ha:"A'a, ina amayi duka",yo:'Rara, mo n bi gbogbo re',ig:'Mba, a na m agbo ife ncha'}, recommendation: 'urgent', risk: 4 }, // Instant stop
      ]
    },
    {
      id: 'digestive_severity',
      question: {en:'Describe your digestive symptoms:',pidgin:'How the belle sickness dey do you?',ha:'Yaya ciwon cikin nan yake?',yo:'Báwo ni inú rírù náà ṣe rí?',ig:'Kedu otú mgbu afọ ahụ dị?'},
      category: 'severity',
      options: [
        { value: 'mild', label: {en:'Mild (upset stomach, no fever)',pidgin:'Small small (Belle just dey disturb, body no hot)',ha:'Kadanci (damuwar ciki, babu zazzabi)',yo:'Díẹ̀ (Ìbínú inú, kò sí ibà)',ig:'Obere (nsogbu afọ, ọ dịghị iba)'}, recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: {en:'Moderate (persistent diarrhea with fever)',pidgin:'E reach middle (Belle dey run well, body small hot)',ha:'Tsaka-tsaki (zawo da zazzabi)',yo:'Bẹ́ẹ̀ bẹ́ẹ̀ lọ (Ìgbẹ́ gbígbẹ́ pẹ̀lú ibà)',ig:'N-etiti (ọbara afọ na iba)'}, recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: {en:'Severe (bloody stool, high fever)',pidgin:'E bad well well (Blood for inside sheet, body hot well)',ha:'Mai tsanani (jini a najasa, zazzabi mai tsanani)',yo:'Lágbára (Ẹ̀jẹ̀ nínú igbẹ́, Ibà lílé)',ig:'Nnukwu (ọbara n-ime nkwọ, iba nnukwu)'}, recommendation: 'urgent', risk: 4 },
      ]
    },
    // URINARY
    {
      id: 'urinary_duration',
      question: {en:'How long have you had urinary symptoms?',pidgin:'How long pee don dey pain you?',ha:'Har tsawon lokacin da kuka ji ciwon fitsari?',yo:'Ìgbà wo ni ìṣòro ìtọ̀ yìí bẹ̀rẹ̀?',ig:'Ogologo oge ole ka nsogbu urinary si bido?'},
      category: 'details',
      options: [
        { value: '1_3_days', label: {en:'Less than 3 days',pidgin:'E never pass 3 days',ha:'Kasa da kwana 3',yo:'Kò tó ọjọ́ mẹta',ig:'Ụbọ chị e ruola ato'}, risk: 1, next: 'urinary_severity' },
        { value: 'more_than_3_days', label: {en:'More than 3 days',pidgin:'E don pass 3 days',ha:'Sama da kwana 3',yo:'Ju ọjọ kẹta lọ',ig:'Ihe karịrị ubochi ato'}, risk: 3, next: 'urinary_severity' },
      ]
    },
    {
      id: 'urinary_severity',
      question: {en:'How severe are your urinary symptoms?',pidgin:'How the pee pain dey reach?',ha:'Yaya ciwon fitsarin yake?',yo:'Báwo ni ìṣòro ìtọ̀ náà ṣe le tọ́?',ig:'Kedu otú nsogbu urinary siri dị njọ?'},
      category: 'severity',
      options: [
        { value: 'mild', label: {en:'Mild (slight discomfort)',pidgin:'Small small pain',ha:'Kadanci (damuwa kadan)',yo:'Díẹ̀ (Ìbànjẹ́ díẹ̀)',ig:'Obere (nsogbu obere)'}, recommendation: 'see_doctor', risk: 1 },
        { value: 'moderate', label: {en:'Moderate (painful urination with fever)',pidgin:'E reach middle (E dey pain and body hot)',ha:'Tsaka-tsaki (ciwo yayin fitsari da zazzabi)',yo:'Bẹ́ẹ̀ bẹ́ẹ̀ lọ (Irora ìtọ̀ pẹ̀lú ibà)',ig:'N-etiti (mgbu n-oge nsi na iba)'}, recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: {en:'Severe (blood in urine, back pain)',pidgin:'E bad well well (Blood for inside pee, back pain)',ha:'Mai tsanani (jini a fitsari, ciwo a baya)',yo:'Lágbára (Ẹ̀jẹ̀ nínú ìtọ̀, Irora ẹ̀yìn)',ig:'Nnukwu (ọbara n-ime nsi, mgbu azụ)'}, recommendation: 'urgent', risk: 4 },
      ]
    },
    // SKIN
    {
      id: 'skin_duration',
      question: {en:'How long have you had this skin condition?',pidgin:'How long your skin don dey do you like this?',ha:'Har tsawon lokacin da kuka ji ciwon fata?',yo:'Ìgbà wo ni àìsàn awọ-ara yìí ti bẹ̀rẹ̀?',ig:'Ogologo oge ole ka nsogbu akpụkpọ ahụ si bido?'},
      category: 'details',
      options: [
        { value: 'less_than_24h', label: {en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}, risk: 0, next: 'skin_severity' },
        { value: '1_3_days', label: {en:'1-3 days',pidgin:'Like 1-3 days',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}, risk: 1, next: 'skin_severity' },
        { value: 'more_than_week', label: {en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}, risk: 3, next: 'skin_severity' },
      ]
    },
    {
      id: 'skin_severity',
      question: {en:'Describe your skin condition:',pidgin:'How the skin sickness be?',ha:'Yaya ciwon fatan nan yake?',yo:'Báwo ni àìsàn awọ-ara náà ṣe rí?',ig:'Kedu otú nsogbu akpụkpọ ahụ dị?'},
      category: 'severity',
      options: [
        { value: 'minor', label: {en:'Minor (small cut, no pus)',pidgin:'Small small (Small cut, no wetin dey inside)',ha:'Karami (karamin yanki, babu ruwa)',yo:'Kékéré (Gẹ́gẹ́ kékéré, kò sí ẹ̀jẹ̀)',ig:'Obere (ịnya obere, ọ dịghị ọbara)'}, recommendation: 'self_care', risk: 0 },
        { value: 'infected', label: {en:'Infected (swollen, red, with pus)',pidgin:'E don swell (Red, pus dey inside)',ha:'Infection (kumburin, ja, da ruwa)',yo:'Àkóràn (Wíwú, Pupa, pẹ̀lú ẹ̀jẹ̀)',ig:'Ọrịa (ọbụbọ, ọbara na njọ)'}, recommendation: 'see_doctor', risk: 2 },
        { value: 'spreading', label: {en:'Spreading rapidly (red lines, fever)',pidgin:'E dey spread quick (Red lines, body hot)',ha:'Yaduwa da sauri (layin ja, zazzabi)',yo:'Títàn Yárà (Àwọn ìlà pupa, Ibà)',ig:'Na-agbasa ọ sọ (ahịrị ọbara, iba)'}, recommendation: 'urgent', risk: 4 },
      ]
    },
    // FEVER
    {
      id: 'fever_duration',
      question: {en:'How long have you had fever?',pidgin:'How long your body don dey hot?',ha:'Har tsawon wane lokaci jikinku yake zafi?',yo:'Ìgbà wo ni ara rẹ ti bẹ̀rẹ̀ sí ní gbóná?',ig:'Amaka ahụ ọkụ a siri dị ole oge?'},
      category: 'details',
      options: [
        { value: 'less_than_24h', label: {en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'Kò tó wákàtí mẹ́rinlelogun',ig:'O nwebeghị awa iri abụọ na anọ'}, risk: 1, next: 'fever_test' },
        { value: '1_3_days', label: {en:'1-3 days',pidgin:'Like 1-3 days',ha:'Kwana 1-3',yo:'Ọjọ́ 1-3',ig:'Ụbọ chị 1-3'}, risk: 1, next: 'fever_test' },
        { value: 'more_than_week', label: {en:'More than a week',pidgin:'E pass one week',ha:'Sama da sati daya',yo:'Ju ọ̀sẹ̀ kan lọ',ig:'Ihe karịrị otu izu'}, risk: 3, next: 'fever_test' },
      ]
    },
    {
      id: 'fever_test',
      question: {en:'Have you done a Malaria or Typhoid test for this fever?',pidgin:'You don run Malaria or Typhoid test for this hot body?',ha:'Kun yi gwajin zazzabin cizon sauro ko na taifod?',yo:'Nje e ti se ayewo iba tifooid tabi malari?',ig:'I meela ule malaria ma o bu typhoid?'},
      category: 'history',
      options: [
        { value: 'positive', label: {en:'Yes, it was positive',pidgin:'Yes, dem see am',ha:'Eh, an gani',yo:'Beeni, won ri nkankan',ig:'Ee, a choro ya'}, recommendation: 'see_doctor', risk: 2 }, // Doctor needed for meds
        { value: 'negative', label: {en:'Yes, it was negative',pidgin:'Yes, dem no see anything',ha:'Eh, ba a gani ba',yo:'Beeni, won o ri nkankan',ig:'Ee, ahubeghi ife'}, risk: 0, next: 'fever_severity' },
        { value: 'not_tested', label: {en:"No, I haven't tested yet",pidgin:'No, I never test',ha:"A'a, ban yi gwaji ba tukunna",yo:'Rara, mi o tii se ayewo',ig:'Mba, e mebeghi m ule'}, risk: 1, next: 'fever_severity' },
      ]
    },
    {
      id: 'fever_severity',
      question: {en:'What is your fever status?',pidgin:'How the hot body dey do you?',ha:'Menene yanayin zazzabin ku?',yo:'Báwo ni ara gbígbóná rẹ ṣe rí?',ig:'Kedu otú ahụ ọkụ gị dị?'},
      category: 'severity',
      options: [
        { value: 'low', label: {en:'Low-grade fever',pidgin:'Body small hot',ha:'Zazzabi mai kadan',yo:'Ibà díẹ̀',ig:'Iba obere'}, recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: {en:'Moderate fever with body aches',pidgin:'Body hot reach middle and bone dey pain',ha:'Zazzabi mai tsaka-tsaki da ciwo a jiki',yo:'Ibà àárín pẹ̀lú irora ara',ig:'Iba n-etiti na mgbu ahụ'}, recommendation: 'see_doctor', risk: 2 },
        { value: 'high', label: {en:'High fever, confusion, weakness',pidgin:'Body hot well well, head confuse, no power',ha:'Zazzabi mai tsanani, rudu, raunin jiki',yo:'Ibà lílé, Ìdarúdàpọ̀, Àìlera',ig:'Iba nnukwu, mgbagwoju anya, ogochere'}, recommendation: 'urgent', risk: 4 },
      ]
    },
    // EAR/EYE
    {
      id: 'ear_severity',
      question: {en:'Describe your ear/eye condition:',pidgin:'How the ear or eye de do you?',ha:'Yaya yanayin kunne ko idonku yake?',yo:'Báwo ni ojú tàbí etí rẹ ṣe dé?',ig:'Kedu ụdị mgbu na-adị gị na ntị ma ọ bụ n-anya?'},
      category: 'severity',
      options: [
        { value: 'mild', label: {en:'Mild discomfort, slight redness',pidgin:'Small pain, small red',ha:'Dan damuwa, dan ja',yo:'Ìbànjẹ́ díẹ̀, Pupa díẹ̀',ig:'Nsogbu obere, ọbara obere'}, recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: {en:'Pain with discharge',pidgin:'Pain and something dey come out',ha:'Ciwo da ruwan kunne/ido',yo:'Irora pẹ̀lú ọ̀jẹ̀',ig:'Mgbu na ihe na-aputa'}, recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: {en:'Severe pain, pus, vision/hearing loss',pidgin:'Big pain, pus dey, I no dey see or hear well',ha:'Ciwo mai tsanani, ruwa, dan gani/ji',yo:'Irora lílé, Ẹ̀jẹ̀, Àíríran/Àígbọ́ràn',ig:'Mgbu nnukwu, ọbara, sufeghị anya/ntu'}, recommendation: 'urgent', risk: 4 },
      ]
    }
  ]

  // Get specific tailored remedy based on user's primary symptom type
  const getTailoredRemedy = () => {
    const symptomRaw = answers['symptom_type']?.value || 'general'
    const remedies = {
      respiratory: lang({
        en: ['☕ Drink warm water with honey and lemon', '😤 Inhale steam from a bowl of hot water', '🛏️ Rest your voice and body'],
        pidgin: ['☕ Drink warm water with small honey and lemon', '😤 Put heat water for bowl, cover head breathe the steam', '🛏️ Make you just rest'],
        ha: ['☕ Sha ruwan zafi da zuma da lemun tsami', '😤 Shaki tururin ruwan zafi', '🛏️ Hutu da kyau'],
        yo: ['☕ Mu omi gbigbona pẹlu oyin ati lẹmọọn', '😤 Fa ategun omi gbigbona', '🛏️ Sinmi daadaa'],
        ig: ['☕ Ṅụọ mmiri ọkụ nwere mmanụ aṅụ na lịmọn', '😤 Kuru uzu mmiri ọkụ', '🛏️ Zuo ike nke ọma']
      }),
      digestive: lang({
        en: ['💧 Drink ORS (Salt Sugar Solution) constantly', '🍚 Eat plain foods like pap, rice, or crackers', '🚫 Avoid oily, spicy, or fried foods today'],
        pidgin: ['💧 Dey sip ORS or salt-sugar water steady', '🍚 Chop plain food like pap or white rice', '🚫 No chop pepper or oil food today at all'],
        ha: ['💧 Yawaita shan ORS', '🍚 Ci abinci maras gishiri bari fari kamar shinkafa/koko', '🚫 A daina cin mai ko yaji yau'],
        yo: ['💧 Máa mu ORS tàbí omi iyọ-ṣúgà', '🍚 Jẹ ògì tàbí ìrẹsì funfun', '🚫 Má jẹ oúnjẹ oníyọ̀ tàbí ata lónìí'],
        ig: ['💧 Ṅụọ ORS mgbe niile', '🍚 Rie nri dị nro dị ka akamu ma ọ bụ osikapa', '🚫 Ezerekwa nri nwere mmanụ ma ọ bụ ose']
      }),
      fever: lang({
        en: ['🧊 Use a lukewarm sponge to cool the body', '💧 Drink lots of water to prevent dehydration', '👕 Wear light, breathable clothes'],
        pidgin: ['🧊 Use rag and warm water press the body', '💧 Drink plenty water make you no dry', '👕 Wear light cloth wey breeze fit pass'],
        ha: ['🧊 Yi wanka da ruwa mara sanyi mara zafi', '💧 Yawaita shan ruwa sosai', '👕 Saka kaya marasa nauyi'],
        yo: ['🧊 Fi asọ tí a tẹbọ inu omi lọ́ wọ́ pa ara rẹ', '💧 Mu omi púpọ̀ láti yàgò fún gbígbẹ ara', '👕 Wọ aṣọ fẹ́ẹ́rẹ́fẹ́'],
        ig: ['🧊 Jiri mmiri ṅara ṅara hichaa ahụ', '💧 Ṅụọ mmiri ọtụtụ', '👕 Yiri akwa na-adịghị arọ']
      }),
      general: lang({
        en: ['🏠 Rest and stay hydrated', '⏱️ Monitor symptoms for 48 hours'],
        pidgin: ['🏠 Rest well and drink water', '⏱️ Watch your body for 2 days'],
        ha: ['🏠 Hutu tare with shan ruwa', '⏱️ Halarci alamu na kwana 2'],
        yo: ['🏠 Sinmi kí o sì mu omi', '⏱️ Kíyèsí ara rẹ fún ọjọ́ méjì'],
        ig: ['🏠 Zuo ike na-aṅụkwa mmiri', '⏱️ Leba ahụ gị anya ụbọchị abụọ']
      })
    }
    return remedies[symptomRaw] || remedies.general
  }

  const recommendations = {
    self_care: {
      title: {en:'✓ Self-Care Plan',pidgin:'✓ Wetin You Go Do for House',ha:'✓ Kulawa a Gida',yo:'✓ Ìtọ́jú Ara Rẹ',ig:'✓ Nlekọta onwe gị'},
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      message: {en:'Your symptoms suggest you likely don\'t need antibiotics right now. Most of these clear up with time and home care.',pidgin:'Sickness wey you get show say you no need antibiotics now. Body go heal am with time.',ha:'Alamu suna nuna ba kwa buƙatar maganin antibiotics a yanzu.',yo:'Àwọn àmì Àìsàn rẹ fún ní ìlọsíwájú láìsí antibiotics.',ig:'Ihe mgbu gị na-egosi na ị dịghị achọ antibiotics ugbu a.'}
    },
    see_doctor: {
      title: {en:'⚠️ See A Doctor/Pharmacist',pidgin:'⚠️ Go See Doctor/Pharmacist',ha:'⚠️ Ziyarci Likita/Kwararre',yo:'⚠️ Ẹ lọ rí Dókítà',ig:'⚠️ Gaa Hụ Dọkịta'},
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      message: {en:'Your symptoms require a professional evaluation. Please visit a clinic or certified pharmacy.',pidgin:'This thing wey you get, doctor or pharmacist suppose check am before you take anything.',ha:'Alamun ku suna buƙatar kimantawa ta likita don sanin ko antibiotics ake buƙata.',yo:'Àwọn àmì àìsàn rẹ nílò ìtúpalẹ̀ ìṣègùn ọ̀jọ̀gbọ́n.',ig:'Ihe mgbu gị chọrọ nyocha dọkịta ọkachamara.'}
    },
    urgent: {
      title: {en:'🚨 Urgent Medical Care Required',pidgin:'🚨 Go Hospital NOW NOW',ha:'🚨 Ana Buƙatar Kulawa ta Gaggawa',yo:'🚨 Ìtọ́jú Ìṣègùn Ìjánu Ni a Nílò',ig:'🚨 A Chọrọ Nlekọta Dọkịta N\'Oge'},
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      message: {en:'Please go to the nearest hospital or emergency clinic immediately.',pidgin:'This sickness bad o. Go see doctor quick quick, no wait.',ha:'Tafi asibiti mafi kusa yanzu, kada ka jira.',yo:'Lọ sí ilé-ìwòsàn tó sún mọ́ lẹ́sẹ̀kẹsẹ̀.',ig:'Gaa ụlọ ọgwụ kacha nso ozugbo.'}
    }
  }

  const calculateDynamicRisk = (currentAnswers = answers) => {
    let totalRisk = 0
    Object.values(currentAnswers).forEach(answer => {
      if (typeof answer === 'object' && answer.risk) {
        totalRisk += answer.risk
      }
    })
    return totalRisk
  }

  const handleAnswer = (option) => {
    const newAnswers = { 
      ...answers, 
      [questions[currentStep].id]: { 
        value: option.value, 
        label: option.label,
        risk: option.risk || 0 
      } 
    }
    setAnswers(newAnswers)
    setRiskScore(calculateDynamicRisk(newAnswers))

    if (option.recommendation) {
      awardPoints('quiz_perfect', 50)
      checkAchievement('KNOWLEDGE_SEEKER')
      showToast(lang({en:'Consultation complete.',pidgin:'We don finish the check.',ha:'An gama kimantawa.',yo:'Ìwádìí parí.',ig:'Nyocha agwụla.'}), 'success')
      setTimeout(() => setResult(option.recommendation), 400)
    } else if (option.next !== undefined) {
      setTimeout(() => {
        if (typeof option.next === 'string') {
          const nextIndex = questions.findIndex(q => q.id === option.next);
          setCurrentStep(nextIndex !== -1 ? nextIndex : currentStep + 1);
        } else {
          setCurrentStep(option.next);
        }
      }, 300)
    } else {
        awardPoints('quiz_perfect', 50)
        checkAchievement('KNOWLEDGE_SEEKER')
        setTimeout(() => setResult('self_care'), 400)
    }
  }

  const resetChecker = () => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
    setShowReport(false)
    setRiskScore(0)
  }

  const ReportCard = () => {
    return (
      <div className="bg-white border text-gray-900 border-gray-300 shadow-2xl rounded-lg p-6 max-w-sm mx-auto my-6 print:shadow-none print:border-none">
        <div className="flex border-b-2 border-gray-800 pb-4 mb-4 gap-4 items-center">
          <Stethoscope size={36} className="text-gray-800" />
          <div>
            <h2 className="font-bold text-xl uppercase tracking-widest">Consultation Summary</h2>
            <p className="text-sm font-semibold text-gray-500">Provided by MedWise Nigeria</p>
          </div>
        </div>
        
        <div className="space-y-3 font-mono text-sm">
          <div className="flex justify-between border-b border-gray-200 border-dashed pb-1">
            <span className="font-semibold text-gray-600">Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          {Object.entries(answers).map(([key, data]) => {
            let formattedTitle = key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
            if(formattedTitle === 'Age Group') formattedTitle = 'Patient Age'
            if(formattedTitle === 'Symptom Type') formattedTitle = 'Primary Symptom'
            
            return (
              <div key={key} className="flex flex-col border-b border-gray-200 border-dashed pb-2">
                <span className="font-semibold text-gray-600">{formattedTitle}:</span>
                <span className="text-gray-900 text-base">{data.label?.en || data.label}</span>
              </div>
            )
          })}
          
          <div className="mt-6 pt-4 border-t-2 border-gray-800">
            <p className="text-xs text-center text-gray-500 italic">This is an automated symptom assessment summary, to assist the consulted Medical Professional or Pharmacist.</p>
          </div>
        </div>
        
        <button 
          className="btn-primary w-full mt-6 flex justify-center items-center print:hidden"
          onClick={() => window.print()}
        >
          <Download size={18} className="mr-2" /> {lang({en:'Save / Print Report',pidgin:'Save / Print Report',ha:'Ajiye / Buga Rahoton',yo:'Pamọ́ / Tẹ̀ Ìròyìn náà jade',ig:'Chekwaa / Bipụta Nkwupụta'})}
        </button>
      </div>
    )
  }

  const path = []
  let traceStep = 0
  while (traceStep !== null && traceStep !== undefined) {
      const qIndex = typeof traceStep === 'string' ? questions.findIndex(q => q.id === traceStep) : traceStep
      if (qIndex === -1 || qIndex >= questions.length) break
      
      const q = questions[qIndex]
      path.push(qIndex)
      const answerRecord = answers[q.id]
      
      if (answerRecord && qIndex !== currentStep) {
         const optionData = q.options.find(o => o.value === answerRecord.value)
         traceStep = optionData?.next 
      } else {
         break
      }
  }

  if (result) {
    const rec = recommendations[result]
    const RecIcon = rec.icon

    return (
      <PageWrapper className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-2xl">
          <Link 
            to="/learn" 
            className="inline-flex items-center text-primary hover:underline mb-8 print:hidden"
          >
            <ArrowLeft size={20} className="mr-2" />
            {lang({en:'Back to Learn',pidgin:'Go back to Learn',ha:'Koma Koyo',yo:'Padà sí Ìtọ́jú',ig:'Laghachi n-Ihe Ọmụmụ'})}
          </Link>

          {!showReport ? (
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
                    <UserRound size={32} className="text-blue-600" />
                 </div>
                 <div>
                    <h2 className="text-2xl font-bold text-gray-900">{lang({en:"Dr. Ada's Recommendation", pidgin: "Dr. Ada Tok Say", ha: "Shawara Dr. Ada", yo: "Ìpinnu Dr. Ada", ig: "Nkwupụta Dr. Ada"})}</h2>
                    <p className="text-gray-500 font-medium">{lang({en: 'Based on your answers', pidgin: 'From wetin you talk', ha: 'Bisa ga amsoshinku', yo: 'Nítorí àwọn ìdáhùn rẹ', ig: 'Dabere na azịza gị'})}</p>
                 </div>
              </div>

              <div className={`${rec.bgColor} ${rec.borderColor} border-2 p-6 rounded-2xl shadow-xl mb-6 transition-all`}>
                <div className="flex items-center space-x-4 mb-4">
                  <RecIcon size={40} className={rec.color} />
                  <h1 className="font-display font-bold text-2xl text-gray-900">
                    {lang(rec.title)}
                  </h1>
                </div>
                <p className="text-lg text-gray-700 font-medium mb-6">{lang(rec.message)}</p>

                <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <CheckCircle size={20} className="mr-2 text-green-500" /> 
                    {lang({en:'Specific Home Remedies:',pidgin:'Wetin to take for house:',ha:'Magungunan Gida na Musamman',yo:'Àwọn Ìtọ́jú Lọ́dọ̀ Rẹ',ig:'Ọgwụgwọ Ụlọ Karịrị:'})}
                  </h3>
                  <ul className="space-y-3">
                    {getTailoredRemedy().map((remedy, idx) => (
                      <li key={idx} className="flex text-gray-700 items-start">
                         <span className="mr-2 mt-0.5">•</span> <span>{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {result !== 'self_care' && (
                  <div className="bg-red-50 text-red-900 p-4 rounded-xl font-bold flex items-start mb-4 border border-red-200">
                    <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={20} />
                    {lang({en:'Please do NOT buy antibiotics on your own. Go to an approved pharmacy or clinic.', pidgin: 'No buy antibiotics by yourself o. Go meet pharmacist or doctor for hospital.', ha: 'Kada ku sayi maganin antibiotics da kanku. Ziyarci likita ko kwararre.', yo: 'Má ṣe ra ogun apakòkòrò fúnra rẹ. Lọ rí oníṣègùn tàbí ilé-ìwòsàn.', ig: 'Azụla ogwu antibiotics n-onwe gị. Gaa hụ dọkịta ma ọ bụ dọkịta na ụlọ ọgwụ.'})}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 mb-8">
                <button 
                  onClick={() => setShowReport(true)}
                  className="w-full btn-primary py-4 rounded-xl flex items-center justify-center font-bold shadow-lg transform hover:scale-[1.02] transition-all"
                >
                  <FileText size={20} className="mr-2" /> {lang({en:'Show Medical Report Card', pidgin: 'Show Medical Report Card', ha: 'Nuna Rahoton Lafiya', yo: 'Ìròyìn Ìtọ́jú Rẹ Jade', ig: 'Gosi Nkwupụta Ọgwụgwọ'})}
                </button>
                <button onClick={resetChecker} className="w-full btn-secondary py-3 rounded-xl flex items-center justify-center font-semibold text-gray-700">
                  {lang({en:'Start New Assessment', pidgin: 'Start New Assessment', ha: 'Fara sabon duba alamun', yo: 'Tún bẹ̀rẹ̀ ẹrọ náà', ig: 'Malite ọzọ'})}
                </button>
                <Link to="/learn" className="text-center text-primary font-bold hover:underline py-2">
                  {lang({en:'Back to Learning Center', pidgin: 'Back to Learning Center', ha: 'Koma Cibiyar Koyo', yo: 'Padà sí Ibùdó Ìtọ́jú', ig:'Laghachi n-Ihe Ọmụmụ'})}
                </Link>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up pb-12">
              <button 
                onClick={() => setShowReport(false)}
                className="text-gray-500 hover:text-gray-900 mb-6 flex items-center font-bold print:hidden"
              >
                <ChevronLeft size={20} className="mr-2" /> {lang({en:'Back to Summary', pidgin: 'Go back to Summary', ha: 'Koma baya', yo: 'Padà sẹ́yìn', ig: 'Laghachi azụ'})}
              </button>
              <ReportCard />
            </div>
          )}
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper className="min-h-screen bg-gray-50 flex flex-col relative pb-20">
      <div className="container mx-auto max-w-2xl px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
           <Link to="/learn" className="text-gray-500 hover:text-gray-900 flex items-center font-semibold">
             <ChevronLeft size={20} className="mr-1" /> {lang({en:'Exit', pidgin:'Comot', ha:'Fita', yo:'Jade', ig:'Puo'})}
           </Link>
           <h1 className="font-display font-bold text-xl text-primary uppercase tracking-widest">{lang({en:'Symptom Checker', pidgin:'Sickness Checker', ha:'Duba Alamomin Ciwo', yo:'Ayẹwo Àmì Àìsàn', ig:'Nyocha Ihe Mgbu'})}</h1>
           <button onClick={resetChecker} className="text-red-500 font-bold hover:bg-red-50 px-3 py-1 rounded-lg transition-colors">
             {lang({en:'Restart', pidgin:'Start again', ha:'Sake farawa', yo:'Tún bẹ̀rẹ̀', ig:'Malite ọzọ'})}
           </button>
        </div>

        <div className="bg-white border-2 border-gray-100 shadow-xl rounded-3xl p-6 sm:p-8">
          <div className="space-y-8">
            {path.map((stepIndex, idx) => {
               const isCurrentStep = (stepIndex === currentStep);
               const q = questions[stepIndex];
               const answeredOptionLabel = answers[q.id]?.label;

               return (
                  <div key={idx} className={`space-y-4 ${!isCurrentStep ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                     <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mr-3 mt-1">
                           <span className="text-primary font-bold text-sm">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                           <h3 className="text-lg font-bold text-gray-900 mb-4">{lang(q.question)}</h3>
                           
                           {isCurrentStep ? (
                              <div className="grid grid-cols-1 gap-2">
                                 {q.options.map((opt, oIdx) => (
                                    <button 
                                       key={oIdx}
                                       onClick={() => handleAnswer(opt)}
                                       className="bg-white hover:bg-primary/5 border-2 border-gray-100 hover:border-primary text-gray-700 hover:text-primary text-left px-5 py-4 rounded-2xl w-full shadow-sm transition-all group flex justify-between items-center"
                                    >
                                       <span className="font-semibold">{lang(opt.label)}</span>
                                       <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                                    </button>
                                 ))}
                              </div>
                           ) : (
                              <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-xl text-gray-700 font-bold">
                                 <CheckCircle size={16} className="mr-2 text-green-500" />
                                 {lang(answeredOptionLabel)}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               )
            })}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
