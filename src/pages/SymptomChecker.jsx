import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Users, AlertCircle, TrendingUp, Zap, Clock, ArrowLeft } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'
import { useGamification } from '../hooks/useGamification'
import PageWrapper from '../components/PageWrapper'

export default function SymptomChecker() {
  const { language, showToast } = useMedwise()
  const { t } = useTranslation(language)
  const { awardPoints, checkAchievement } = useGamification()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [riskScore, setRiskScore] = useState(0)
  const [assessmentTime] = useState(new Date().toISOString())

  // Translation helper — picks right text for current language, falls back to English
  const lang = (map) => map[language] ?? map['en']

  const questions = [
    {
      id: 'age_group',
      question: lang({en:'What is your age group?',pidgin:'How old you be?',ha:'Menene rukunin shekarunku?',yo:'\u1eccm\u1ecd \u1ecddun melo ni \u1eb9?',ig:'Af\u1ecd ole ka \u1ecb gbara?'}),
      category: 'demographics',
      options: [
        { value: 'child', label: lang({en:'Below 5 years',pidgin:'Pikin wey never reach 5 years',ha:'Kasa da shekara 5',yo:'\u00ccsal\u1eb9\u0300 \u1ecddun marun-un',ig:'Ihe kar\u1ecbr\u1ecb af\u1ecd ise'}), risk: 2, next: 1 },
        { value: 'young', label: lang({en:'5-18 years',pidgin:'Young person (5-18 years)',ha:'Shekara 5 zuwa 18',yo:'\u1eccdun marun-un s\u00ed mj\u1eb9\u0301rind\u00ednl\u00f3g\u00fan',ig:'Af\u1ecd ise ruo iri na asat\u1ecd'}), risk: 1, next: 1 },
        { value: 'adult', label: lang({en:'18-60 years',pidgin:'Big person (18-60 years)',ha:'Shekara 18 zuwa 60',yo:'Agbalagba (\u1eccdun 18-60)',ig:'Okenye (Af\u1ecd 18-60)'}), risk: 0, next: 1 },
        { value: 'senior', label: lang({en:'Above 60 years',pidgin:'Mama/Papa (Above 60 years)',ha:'Sama da shekara 60',yo:'Agbalagba ju \u1ecddun 60 l\u1ecd',ig:'Ndi gafere af\u1ecd 60'}), risk: 3, next: 1 },
      ]
    },
    {
      id: 'existing_conditions',
      question: lang({en:'Do you have any existing health conditions?',pidgin:'Anything else dey worry you before?',ha:'Kuna da wani ciwo tun da farko?',yo:'Nj\u1eb9 \u1eb9 n\u00ed \u00e0\u00ecs\u00e0n kankan t\u1eb9l\u1eb9 r\u00ed?',ig:'\u012a nwere \u1ecdr\u1ecba \u1ecd b\u1ee5la nke \u1ecb nweburu?'}),
      category: 'demographics',
      options: [
        { value: 'none', label: lang({en:'No existing conditions',pidgin:'Nothing dey worry me',ha:'Babu komai',yo:'K\u00f2 s\u00ed \u00e0\u00ecs\u00e0n kankan',ig:'Enwegh\u1ecb m \u1ecdr\u1ecba \u1ecd b\u1ee5la'}), risk: 0, next: 2 },
        { value: 'diabetes', label: lang({en:'Diabetes',pidgin:'Sugar for body (Diabetes)',ha:'Ciwon Suga',yo:'S\u00fag\u00e0',ig:'\u1eccr\u1ecba Shuga'}), risk: 2, next: 2 },
        { value: 'hypertension', label: lang({en:'Hypertension',pidgin:'B-P (Hypertension)',ha:'Hawan Jini',yo:'\u00ccf\u00fanp\u00e1 G\u00edga',ig:'\u1eccbara mgbali elu'}), risk: 1, next: 2 },
        { value: 'hiv_aids', label: 'HIV/AIDS', risk: 4, next: 2 },
        { value: 'multiple', label: lang({en:'Multiple conditions',pidgin:'Plenty things dey worry me',ha:'Ciwon yana da yawa',yo:'\u00c0\u00ecs\u00e0n melo kan',ig:'\u1eccT\u1ee5t\u1ee5 \u1ecdr\u1ecba'}), risk: 3, next: 2 },
      ]
    },
    {
      id: 'symptom_type',
      question: lang({en:'What type of symptoms are you experiencing?',pidgin:'Which place inside your body dey worry you?',ha:'Wane irin ciwo kuke ji?',yo:'Ir\u00fa \u00e0\u00ecs\u00e0n wo ni \u1eb9 n l\u00e1ra?',ig:'Kedu \u1ee5d\u1ecb mgbu \u1ecb na-enwe?'}),
      category: 'primary',
      options: [
        { value: 'respiratory', label: lang({en:'Respiratory (cough, cold, sore throat)',pidgin:'Inside my chest (Cough, Catarrh, Sore throat)',ha:'Ciwon Shaka (tari, mura, ciwon makogwaro)',yo:'Inu \u00c0y\u00e0 (Ik\u1ecd\u0301, \u1ecct\u00fat\u00f9, \u1eccfun d\u00edd\u00f9n)',ig:'Iku ume (\u1ee5kwara, imi, mgbu akp\u1ecbr\u1ecb)'}), next: 3 },
        { value: 'digestive', label: lang({en:'Digestive (diarrhea, stomach pain)',pidgin:'My belle (Running belle, Belle pain)',ha:'Ciwon Ciki (zawo, ciwon ciki)',yo:'In\u00fa r\u00edr\u00f9 (In\u00fa r\u00edun, Irora in\u00fa)',ig:'Af\u1ecd (\u1ecdbara af\u1ecd, mgbu af\u1ecd)'}), next: 4 },
        { value: 'urinary', label: lang({en:'Urinary (painful urination)',pidgin:'To pass water (Pee dey pain me)',ha:'Ciwon fitsari',yo:'\u00cc\u1e63\u00f2ro \u00ect\u1ecd\u0300 (Irora n\u00edgb\u00e0 \u00ect\u1ecd\u0300)',ig:'Ihe nsi (mgbu n\'oge nsi)'}), next: 5 },
        { value: 'skin', label: lang({en:'Skin infection (wound, rash, boil)',pidgin:'My Skin (Wound, Rash, Boil)',ha:'Ciwon fata (miki, kyasbi, kurji)',yo:'Aw\u1ecd-ara (\u1eccgb\u1eb9\u0301, Iru, B\u1ecd\u0301\u00ecl\u00ec)',ig:'Akp\u1ee5kp\u1ecd ah\u1ee5 (\u1ecbnya, rash, boil)'}), next: 6 },
        { value: 'fever', label: lang({en:'Fever (high temperature)',pidgin:'Hot body (Fever)',ha:'Zazzabi',yo:'Ib\u00e0 (Ara gb\u00edgb\u00f3n\u00e1)',ig:'Iba (Ah\u1ee5 \u1ecdk\u1ee5)'}), next: 7 },
        { value: 'ear_eye', label: lang({en:'Ear/Eye infection',pidgin:'My Ear or Eye (Discharge or pain)',ha:'Ciwon kunne/ido',yo:'Et\u00ed t\u00e0b\u00ed Oj\u00fa (\u00ccronra)',ig:'Nt\u1ecb ma \u1ecd b\u1ee5 Anya (mgbu)'}), next: 8 },
      ]
    },
    {
      id: 'respiratory_duration',
      question: lang({en:'How long have you had respiratory symptoms?',pidgin:'How long you don dey get this cough or catarrh?',ha:'Har tsawon wane lokaci kuke fama da tari?',yo:'\u00ccgb\u00e0 wo ni ik\u1ecd\u0301 t\u00e0b\u00ed \u1ecdt\u00fat\u00f9 y\u00ec\u00ed ti b\u1eb9\u0300r\u1eb9\u0300?',ig:'Ogologo oge ole ka \u1ee5kwara a si bido?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'K\u00f2 t\u00f3 w\u00e1k\u00e0t\u00ed m\u1eb9\u0301rinlelogun',ig:'O nwebegh\u1ecb awa iri ab\u1ee5\u1ecd na an\u1ecd'}), risk: 1, next: 9 },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days so',ha:'Kwana 1-3',yo:'\u1eccj\u1ecd\u0301 1-3',ig:'\u1ee4b\u1ecd ch\u1ecb 1-3'}), risk: 1, next: 9 },
        { value: '4_7_days', label: lang({en:'4-7 days',pidgin:'Almost one week now',ha:'Kwana 4-7',yo:'\u1eccj\u1ecd\u0301 4-7',ig:'\u1ee4b\u1ecd ch\u1ecb 4-7'}), risk: 2, next: 9 },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju \u1ecd\u0300s\u1eb9\u0300 kan l\u1ecd',ig:'Ihe kar\u1ecbr\u1ecb otu izu'}), risk: 3, next: 9 },
      ]
    },
    {
      id: 'respiratory_severity',
      question: lang({en:'How severe are your respiratory symptoms?',pidgin:'How the sickness dey do you?',ha:'Yaya tsananin ciwon shaka yake?',yo:'B\u00e1wo ni \u00e0\u00ecs\u00e0n \u1eb9\u0300d\u1ecd\u0300f\u00f3r\u00f3 n\u00e1\u00e0 \u1e63e l\u00e1gb\u00e1ra t\u00f3?',ig:'Kedu ot\u00fa mgbu iku ume siri d\u1ecb nj\u1ecd?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild (slight cough, no fever)',pidgin:'Small small (Small cough, body no hot)',ha:'Kadanci (tari kadan, babu zazzabi)',yo:'D\u00ed\u1eb9\u0300 (Ik\u1ecd\u0301 k\u00e9k\u00e9r\u00e9, k\u00f2 s\u00ed ib\u00e0)',ig:'Obere (\u1ee5kwara obere, \u1ecd d\u1ecbgh\u1ecb iba)'}), recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: lang({en:'Moderate (sore throat, low fever)',pidgin:'E reach middle (Sore throat, body small hot)',ha:'Tsaka-tsaki (makogwaro yana ciwo, zazzabi kadan)',yo:'B\u1eb9\u0301\u1eb9\u0300 b\u1eb9\u0301\u1eb9\u0300 l\u1ecd (\u1eccfun d\u00edd\u00f9n, Ib\u00e0 d\u00ed\u1eb9\u0300)',ig:'N-etiti (mgbu akp\u1ecbr\u1ecb, iba obere)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe (difficulty breathing, chest pain)',pidgin:'E bad well well (Breath no dey reach, chest pain)',ha:'Mai tsanani (wahalar numfashi, ciwo a kirji)',yo:'L\u00e1gb\u00e1ra (\u00cc\u1e63\u00f2ro m\u00edm\u00ed, Irora \u00e0y\u00e0)',ig:'Nnukwu (nsogbu iku ume, mgbu obi)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'digestive_duration',
      question: lang({en:'How long have you had digestive symptoms?',pidgin:'How long your belle don dey run?',ha:'Har tsawon lokacin da kuka ji ciwon ciki?',yo:'\u00ccgb\u00e0 wo ni in\u00fa r\u00edr\u00f9 y\u00ec\u00ed b\u1eb9\u0300r\u1eb9\u0300?',ig:'Ogologo oge ole ka af\u1ecd g\u1ecb na-egbu g\u1ecb?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'K\u00f2 t\u00f3 w\u00e1k\u00e0t\u00ed m\u1eb9\u0301rinlelogun',ig:'O nwebegh\u1ecb awa iri ab\u1ee5\u1ecd na an\u1ecd'}), risk: 1, next: 10 },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days so',ha:'Kwana 1-3',yo:'\u1eccj\u1ecd\u0301 1-3',ig:'\u1ee4b\u1ecd ch\u1ecb 1-3'}), risk: 1, next: 10 },
        { value: '4_7_days', label: lang({en:'4-7 days',pidgin:'Almost one week now',ha:'Kwana 4-7',yo:'\u1eccj\u1ecd\u0301 4-7',ig:'\u1ee4b\u1ecd ch\u1ecb 4-7'}), risk: 2, next: 10 },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju \u1ecd\u0300s\u1eb9\u0300 kan l\u1ecd',ig:'Ihe kar\u1ecbr\u1ecb otu izu'}), risk: 3, next: 10 },
      ]
    },
    {
      id: 'digestive_severity',
      question: lang({en:'Describe your digestive symptoms:',pidgin:'How the belle sickness dey do you?',ha:'Yaya ciwon cikin nan yake?',yo:'B\u00e1wo ni in\u00fa r\u00edr\u00f9 n\u00e1\u00e0 \u1e63e r\u00ed?',ig:'Kedu ot\u00fa mgbu af\u1ecd ah\u1ee5 d\u1ecb?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild (upset stomach, no fever)',pidgin:'Small small (Belle just dey disturb, body no hot)',ha:'Kadanci (damuwar ciki, babu zazzabi)',yo:'D\u00ed\u1eb9\u0300 (\u00ccb\u00edn\u00fa in\u00fa, k\u00f2 s\u00ed ib\u00e0)',ig:'Obere (nsogbu af\u1ecd, \u1ecd d\u1ecbgh\u1ecb iba)'}), recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: lang({en:'Moderate (persistent diarrhea with fever)',pidgin:'E reach middle (Belle dey run well, body small hot)',ha:'Tsaka-tsaki (zawo da zazzabi)',yo:'B\u1eb9\u0301\u1eb9\u0300 b\u1eb9\u0301\u1eb9\u0300 l\u1ecd (\u00ccgb\u1eb9\u0301 gb\u00edgb\u1eb9\u0301 p\u1eb9\u0300l\u00fa ib\u00e0)',ig:'N-etiti (\u1ecdbara af\u1ecd na iba)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe (bloody stool, high fever)',pidgin:'E bad well well (Blood for inside sheet, body hot well)',ha:'Mai tsanani (jini a najasa, zazzabi mai tsanani)',yo:'L\u00e1gb\u00e1ra (\u1eb8\u0300j\u1eb9\u0300 n\u00edn\u00fa igb\u1eb9\u0301, Ib\u00e0 l\u00edl\u00e9)',ig:'Nnukwu (\u1ecdbara n-ime nkw\u1ecd, iba nnukwu)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'urinary_duration',
      question: lang({en:'How long have you had urinary symptoms?',pidgin:'How long pee don dey pain you?',ha:'Har tsawon lokacin da kuka ji ciwon fitsari?',yo:'\u00ccgb\u00e0 wo ni \u00ec\u1e63\u00f2ro \u00ect\u1ecd\u0300 y\u00ec\u00ed b\u1eb9\u0300r\u1eb9\u0300?',ig:'Ogologo oge ole ka nsogbu urinary si bido?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'K\u00f2 t\u00f3 w\u00e1k\u00e0t\u00ed m\u1eb9\u0301rinlelogun',ig:'O nwebegh\u1ecb awa iri ab\u1ee5\u1ecd na an\u1ecd'}), risk: 0, next: 11 },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days',ha:'Kwana 1-3',yo:'\u1eccj\u1ecd\u0301 1-3',ig:'\u1ee4b\u1ecd ch\u1ecb 1-3'}), risk: 1, next: 11 },
        { value: '4_7_days', label: lang({en:'4-7 days',pidgin:'Like one week so',ha:'Kwana 4-7',yo:'\u1eccj\u1ecd\u0301 4-7',ig:'\u1ee4b\u1ecd ch\u1ecb 4-7'}), risk: 2, next: 11 },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E pass one week',ha:'Sama da sati daya',yo:'Ju \u1ecd\u0300s\u1eb9\u0300 kan l\u1ecd',ig:'Ihe kar\u1ecbr\u1ecb otu izu'}), risk: 3, next: 11 },
      ]
    },
    {
      id: 'urinary_severity',
      question: lang({en:'How severe are your urinary symptoms?',pidgin:'How the pee pain dey reach?',ha:'Yaya ciwon fitsarin yake?',yo:'B\u00e1wo ni \u00ec\u1e63\u00f2ro \u00ect\u1ecd\u0300 n\u00e1\u00e0 \u1e63e le t\u00f3?',ig:'Kedu ot\u00fa nsogbu urinary siri d\u1ecb nj\u1ecd?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild (slight discomfort)',pidgin:'Small small pain',ha:'Kadanci (damuwa kadan)',yo:'D\u00ed\u1eb9\u0300 (\u00ccb\u00e0nj\u1eb9\u0301 d\u00ed\u1eb9\u0300)',ig:'Obere (nsogbu obere)'}), recommendation: 'see_doctor', risk: 1 },
        { value: 'moderate', label: lang({en:'Moderate (painful urination with fever)',pidgin:'E reach middle (E dey pain and body hot)',ha:'Tsaka-tsaki (ciwo yayin fitsari da zazzabi)',yo:'B\u1eb9\u0301\u1eb9\u0300 b\u1eb9\u0301\u1eb9\u0300 l\u1ecd (Irora \u00ect\u1ecd\u0300 p\u1eb9\u0300l\u00fa ib\u00e0)',ig:'N-etiti (mgbu n-oge nsi na iba)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe (blood in urine, back pain)',pidgin:'E bad well well (Blood for inside pee, back pain)',ha:'Mai tsanani (jini a fitsari, ciwo a baya)',yo:'L\u00e1gb\u00e1ra (\u1eb8\u0300j\u1eb9\u0300 n\u00edn\u00fa \u00ect\u1ecd\u0300, Irora \u1eb9\u0300y\u00ecn)',ig:'Nnukwu (\u1ecdbara n-ime nsi, mgbu az\u1ee5)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'skin_duration',
      question: lang({en:'How long have you had this skin condition?',pidgin:'How long your skin don dey do you like this?',ha:'Har tsawon lokacin da kuka ji ciwon fata?',yo:'\u00ccgb\u00e0 wo ni \u00e0\u00ecs\u00e0n aw\u1ecd-ara y\u00ec\u00ed ti b\u1eb9\u0300r\u1eb9\u0300?',ig:'Ogologo oge ole ka nsogbu akp\u1ee5kp\u1ecd ah\u1ee5 si bido?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'K\u00f2 t\u00f3 w\u00e1k\u00e0t\u00ed m\u1eb9\u0301rinlelogun',ig:'O nwebegh\u1ecb awa iri ab\u1ee5\u1ecd na an\u1ecd'}), risk: 0, next: 12 },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days',ha:'Kwana 1-3',yo:'\u1eccj\u1ecd\u0301 1-3',ig:'\u1ee4b\u1ecd ch\u1ecb 1-3'}), risk: 1, next: 12 },
        { value: '4_7_days', label: lang({en:'4-7 days',pidgin:'Almost one week now',ha:'Kwana 4-7',yo:'\u1eccj\u1ecd\u0301 4-7',ig:'\u1ee4b\u1ecd ch\u1ecb 4-7'}), risk: 2, next: 12 },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E don pass one week',ha:'Sama da sati daya',yo:'Ju \u1ecd\u0300s\u1eb9\u0300 kan l\u1ecd',ig:'Ihe kar\u1ecbr\u1ecb otu izu'}), risk: 3, next: 12 },
      ]
    },
    {
      id: 'skin_severity',
      question: lang({en:'Describe your skin condition:',pidgin:'How the skin sickness be?',ha:'Yaya ciwon fatan nan yake?',yo:'B\u00e1wo ni \u00e0\u00ecs\u00e0n aw\u1ecd-ara n\u00e1\u00e0 \u1e63e r\u00ed?',ig:'Kedu ot\u00fa nsogbu akp\u1ee5kp\u1ecd ah\u1ee5 d\u1ecb?'}),
      category: 'severity',
      options: [
        { value: 'minor', label: lang({en:'Minor (small cut, no pus)',pidgin:'Small small (Small cut, no wetin dey inside)',ha:'Karami (karamin yanki, babu ruwa)',yo:'K\u00e9k\u00e9r\u00e9 (G\u00e9g\u00e9 k\u00e9k\u00e9r\u00e9, k\u00f2 s\u00ed \u1eb9\u0300j\u1eb9\u0300)',ig:'Obere (\u1ecbnya obere, \u1ecd d\u1ecbgh\u1ecb \u1ecdbara)'}), recommendation: 'self_care', risk: 0 },
        { value: 'infected', label: lang({en:'Infected (swollen, red, with pus)',pidgin:'E don swell (Red, pus dey inside)',ha:'Infection (kumburin, ja, da ruwa)',yo:'\u00c0k\u00f3r\u00e0n (W\u00edw\u00fa, Pupa, p\u1eb9\u0300l\u00fa \u1eb9\u0300j\u1eb9\u0300)',ig:'\u1eccr\u1ecba (\u1ecdb\u1ee5b\u1ecd, \u1ecdbara na nj\u1ecd)'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'spreading', label: lang({en:'Spreading rapidly (red lines, fever)',pidgin:'E dey spread quick (Red lines, body hot)',ha:'Yaduwa da sauri (layin ja, zazzabi)',yo:'T\u00edt\u00e0n Y\u00e1r\u00e0 (\u00c0w\u1ecdn \u00ecl\u00e0 pupa, Ib\u00e0)',ig:'Na-agbasa \u1ecd s\u1ecd (ah\u1ecbr\u1ecb \u1ecdbara, iba)'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'fever_duration',
      question: lang({en:'How long have you had fever?',pidgin:'How long your body don dey hot?',ha:'Har tsawon wane lokaci jikinku yake zafi?',yo:'\u00ccgb\u00e0 wo ni ara r\u1eb9 ti b\u1eb9\u0300r\u1eb9\u0300 s\u00ed n\u00ed gb\u00f3n\u00e1?',ig:'Amaka ah\u1ee5 \u1ecdk\u1ee5 a siri d\u1ecb ole oge?'}),
      category: 'details',
      options: [
        { value: 'less_than_24h', label: lang({en:'Less than 24 hours',pidgin:'E never reach one day',ha:'Kasa da awowi 24',yo:'K\u00f2 t\u00f3 w\u00e1k\u00e0t\u00ed m\u1eb9\u0301rinlelogun',ig:'O nwebegh\u1ecb awa iri ab\u1ee5\u1ecd na an\u1ecd'}), risk: 1, next: 13 },
        { value: '1_3_days', label: lang({en:'1-3 days',pidgin:'Like 1-3 days',ha:'Kwana 1-3',yo:'\u1eccj\u1ecd\u0301 1-3',ig:'\u1ee4b\u1ecd ch\u1ecb 1-3'}), risk: 1, next: 13 },
        { value: '4_7_days', label: lang({en:'4-7 days',pidgin:'Almost one week',ha:'Kwana 4-7',yo:'\u1eccj\u1ecd\u0301 4-7',ig:'\u1ee4b\u1ecd ch\u1ecb 4-7'}), risk: 2, next: 13 },
        { value: 'more_than_week', label: lang({en:'More than a week',pidgin:'E pass one week',ha:'Sama da sati daya',yo:'Ju \u1ecd\u0300s\u1eb9\u0300 kan l\u1ecd',ig:'Ihe kar\u1ecbr\u1ecb otu izu'}), risk: 3, next: 13 },
      ]
    },
    {
      id: 'fever_severity',
      question: lang({en:'What is your fever status?',pidgin:'How the hot body dey do you?',ha:'Menene yanayin zazzabin ku?',yo:'B\u00e1wo ni ara gb\u00edgb\u00f3n\u00e1 r\u1eb9 \u1e63e r\u00ed?',ig:'Kedu ot\u00fa ah\u1ee5 \u1ecdk\u1ee5 g\u1ecb d\u1ecb?'}),
      category: 'severity',
      options: [
        { value: 'low', label: lang({en:'Low-grade fever',pidgin:'Body small hot',ha:'Zazzabi mai kadan',yo:'Ib\u00e0 d\u00ed\u1eb9\u0300',ig:'Iba obere'}), recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: lang({en:'Moderate fever with body aches',pidgin:'Body hot reach middle and bone dey pain',ha:'Zazzabi mai tsaka-tsaki da ciwo a jiki',yo:'Ib\u00e0 \u00e0\u00e1r\u00edn p\u1eb9\u0300l\u00fa irora ara',ig:'Iba n-etiti na mgbu ah\u1ee5'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'high', label: lang({en:'High fever, confusion, weakness',pidgin:'Body hot well well, head confuse, no power',ha:'Zazzabi mai tsanani, rudu, raunin jiki',yo:'Ib\u00e0 l\u00edl\u00e9, \u00ccdar\u00fad\u00e0p\u1ecd\u0300, \u00c0\u00ecler\u00e0',ig:'Iba nnukwu, mgbagwoju anya, ogochere'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'ear_severity',
      question: lang({en:'Describe your ear/eye condition:',pidgin:'How the ear or eye de do you?',ha:'Yaya yanayin kunne ko idonku yake?',yo:'B\u00e1wo ni oj\u00fa t\u00e0b\u00ed et\u00ed r\u1eb9 \u1e63e d\u00e9?',ig:'Kedu \u1ee5d\u1ecb mgbu na-ad\u1ecb g\u1ecb na nt\u1ecb ma \u1ecd b\u1ee5 n-anya?'}),
      category: 'severity',
      options: [
        { value: 'mild', label: lang({en:'Mild discomfort, slight redness',pidgin:'Small pain, small red',ha:'Dan damuwa, dan ja',yo:'\u00ccb\u00e0nj\u1eb9\u0301 d\u00ed\u1eb9\u0300, Pupa d\u00ed\u1eb9\u0300',ig:'Nsogbu obere, \u1ecdbara obere'}), recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: lang({en:'Pain with discharge',pidgin:'Pain and something dey come out',ha:'Ciwo da ruwan kunne/ido',yo:'Irora p\u1eb9\u0300l\u00fa \u1ecd\u0300j\u1eb9\u0300',ig:'Mgbu na ihe na-aputa'}), recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: lang({en:'Severe pain, pus, vision/hearing loss',pidgin:'Big pain, pus dey, I no dey see or hear well',ha:'Ciwo mai tsanani, ruwa, dan gani/ji',yo:'Irora l\u00edl\u00e9, \u1eb8\u0300j\u1eb9\u0300, \u00c0\u00edr\u00edran/\u00c0\u00edgb\u00f3r\u00e0n',ig:'Mgbu nnukwu, \u1ecdbara, sufegh\u1ecb anya/ntu'}), recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'previous_antibiotics',
      question: lang({en:'Have you taken antibiotics in the last 4 weeks?',pidgin:'You don take antibiotic inside 4 weeks wey pass?',ha:'Shin kun sha maganin antibiotics a cikin sati 4?',yo:'Nj\u1eb9 \u1eb9 ti lo \u00f2g\u00f9n apak\u00f2k\u00f2r\u00f2 n\u00ed \u1ecd\u0300s\u1eb9\u0300 m\u1eb9\u0301rin s\u1eb9\u0301y\u00ecn?',ig:'\u012a n\u1ee5\u1ecd la \u1ecdgw\u1ee5 antibiotics n-ime izu an\u1ecd gara aga?'}),
      category: 'history',
      options: [
        { value: 'no', label: lang({en:'No',pidgin:'No',ha:'A\'a',yo:'R\u00e1r\u00e1',ig:'Mba'}), risk: 0, next: 14 },
        { value: 'yes_1_month', label: lang({en:'Yes, within the last month',pidgin:'Yes, inside this month',ha:'Eh, a cikin watan da ya wuce',yo:'B\u1eb9\u0301\u1eb9\u0300ni, n\u00ed os\u00f9 t\u00f3 k\u1ecd j\u00e1p\u00e1',ig:'Ee, n-ime \u1ecdn wa gara aga'}), risk: 2, next: 14 },
        { value: 'yes_incomplete', label: lang({en:'Yes, but I stopped early',pidgin:'Yes, but I no finish am',ha:'Eh, amma na daina da wuri',yo:'B\u1eb9\u0301\u1eb9\u0300ni, \u00e0m\u1ecd\u0301 mo d\u00e1w\u1ecd\u0301 d\u00faro n\u00ed \u00e0\u00e1r\u1ecd\u0300',ig:'Ee, mana m kw\u1ee5s\u1ecbr\u1ecb n-oge oge'}), risk: 3, next: 14 },
      ]
    },
    {
      id: 'symptom_improvement',
      question: lang({en:'Are your symptoms improving or getting worse?',pidgin:'The sickness dey go or e dey worse?',ha:'Shin ciwon yana raguwa ko yana karuwa?',yo:'\u1e62\u00e9 \u00e0\u00ecs\u00e0n n\u00e1\u00e0 \u0144 l\u1ecd t\u00e0b\u00ed \u00f3 \u0144 le s\u00ed i?',ig:'Ah\u1ee5 g\u1ecb \u1ecd na-ad\u1ecb mma ka \u1ecd na-aka nj\u1ecd?'}),
      category: 'trajectory',
      options: [
        { value: 'improving', label: lang({en:'Improving',pidgin:'E dey go small small',ha:'Yana raguwa',yo:'\u00d3 \u0144 l\u1ecd d\u00ed\u1eb9\u0300d\u00ed\u1eb9\u0300',ig:'\u1ecc na-ad\u1ecb mma nway\u1ecd'}), recommendation: null, risk: 0 },
        { value: 'stable', label: lang({en:'Stable (no change)',pidgin:'E just dey same place',ha:'Kamarsu daya',yo:'K\u00f2 y\u00edpad\u00e0',ig:'\u1ecc nagh\u1ecb agbanwe'}), recommendation: null, risk: 1 },
        { value: 'worsening', label: lang({en:'Getting worse',pidgin:'E dey worse o',ha:'Yana karuwa',yo:'\u00d3 \u0144 le s\u00ed i',ig:'\u1ecc na-aka nj\u1ecd'}), recommendation: 'urgent', risk: 3 },
      ]
    },
  ]

  const recommendations = {
    self_care: {
      title: lang({en:'✓ Self-Care Management',pidgin:'✓ Wetin You Go Do for House',ha:'✓ Kulawa a Gida',yo:'✓ Ìtọ́jú Ara Rẹ',ig:'✓ Nlekọta onwe gị'}),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      message: lang({en:'Your symptoms suggest you likely don\'t need antibiotics right now.',pidgin:'Sickness wey you get show say you no need antibiotics now.',ha:'Alamu suna nuna ba kwa buƙatar maganin antibiotics a yanzu.',yo:'Àwọn àmì àìsàn rẹ fún ní ìlọsíwájú láìsí antibiotics.',ig:'Ihe mgbu gị na-egosi na ị dịghị achọ antibiotics ugbu a.'}),
      advice: lang({en:[
        '🏠 Rest and stay hydrated (drink water, warm tea, electrolyte drinks)',
        '💊 Use over-the-counter pain relievers if needed',
        '⏱️ Monitor your symptoms for 48-72 hours',
        '🩺 See a doctor IMMEDIATELY if symptoms worsen',
        '❌ Do NOT self-prescribe antibiotics - most minor infections resolve on their own'
      ],pidgin:[
        '🏠 Rest well and drink plenty water or warm tea',
        '💊 Take small medicine for pain if you need am',
        '⏱️ Watch your body for like 2-3 days so',
        '🩺 Go see doctor QUICK QUICK if the thing start to bad',
        '❌ No go buy antibiotic for yourself - body go heal by emself'
      ],ha:[
        '🏠 Huta kuma sha ruwa mai yawa',
        '💊 Iya sha maganin ciwo idan yana da wuya',
        '⏱️ Kalli alamu na 48-72 sa\'o\'i',
        '🩺 Ga likita YANZU idan alamu sun tsananta',
        '❌ Kar ka shan antibiotics da kanki - yawancin cututtuka suna warwarewa da kansu'
      ],yo:[
        '🏠 Sinmi kí ẹ sì mu omi púpọ̀',
        '💊 Lò ògùn irora tí a lè rà láìsí ìwé ìfọwọ́sí bí ó bá pọn dandan',
        '⏱️ Ṣàgbéyẹ̀wò àwọn àmì àìsàn rẹ fún wákàtí 48-72',
        '🩺 Lọ sí dókítà LẸSẸKẸSẸ tí àwọn àmì àìsàn bá burú sí i',
        '❌ Má ṣe lo antibiotics lai sí ìwé ìfọwọ́sí - àwọn àìsàn kékeré máa ń san ara wọn'
      ],ig:[
        '🏠 Zọọ ma maa nata mmiri ọtụtụ',
        '💊 Ị nwere ike iji ọgwụ mgbu ndị a na-azụta n\'ahịa',
        '⏱️ Leba n\'anya ihe mgbu gị maka awa 48-72',
        '🩺 Gaa dọkịta OZUGBO ma ihe mgbu gị kachaa njọ',
        '❌ Emechaghị onwe gị antibiotics - ọtụtụ ọrịa obere na-agwọ onwe ha'
      ]}),
      nigeriaInfo: lang({en:'Seeking unnecessary healthcare can strain resources. Your recovery can happen at home with proper care.',pidgin:'If you go hospital for small thing, you dey stress medical people. You fit get better for house.',ha:'Neman lafiya ba dole ba na iya nauyar da albarkatun. Murmuwarka zai iya faruwa a gida da kulawa ta daidai.',yo:'Wíwá ìtọ́jú ìlera tí kò pọn dandan le ṣe àjẹkù àwọn ohun tí a ní. Ìmúpadàbọ̀sípò rẹ lè ṣẹlẹ̀ ní ilé pẹ̀lú ìtọ́jú tó tọ.',ig:'Ịchọ ọgwụgwọ ọrịa na-achọghị mkpa nwere ike ịrụ ọrụ na ihe ndị ọgwụ. Ị nwere ike ịdị mma n\'ụlọ maọbụ n\'ime nlekọta ọma.'}),
      resistanceWarning: lang({en:'Self-medicating with antibiotics drives antibiotic resistance in Nigeria and puts your community at risk.',pidgin:'If you use medicine anyhow, that one go make sickness strong pass antibiotic. E no good for Naija.',ha:'Sha antibiotics da kanku na ƙara yawan juriya a Najeriya kuma yana sanya al\'ummarku cikin haɗari.',yo:'Lílo antibiotics láìsí ìtọ́sọ́nà ọ̀jọ̀gbọ́n máa ń mú kí àwọn bakitéríà ní agbára sí i ní Nàìjíríà.',ig:'Iji antibiotics onwe gị na-añọgide ihe mgbochi antibiotics na Nigeria ma na-etinye obodo gị n\'ọnọdụ ihe ize ndụ.'}),
      urgentSigns: lang({en:['High fever persisting','Severe pain','Difficulty breathing','Confusion','Spreading redness'],pidgin:['Body still hot well well','Big pain','Breath no dey reach','Your head dey confuse','Redness dey spread'],ha:['Zazzabi mai tsanani','Ciwo mai tsanani','Wahalar numfashi','Ruɗu','Yaɗuwar ja'],yo:['Ibà líle tó ń bọ̀','Irora líle','Ìṣòro mímí','Ìdarúdàpọ̀','Pupa tó ń tàn kálẹ̀'],ig:['Iba nnukwu na-anọgide','Mgbu nnukwu','Nsogbu iku ume','Mgbagwoju anya','Ọbara na-agbasa']}),
      followUp: lang({en:'Return for evaluation if symptoms don\'t improve in 7 days or worsen at any time',pidgin:'Come back if you never better after 7 days or if sickness start to worse',ha:'Koma don kimantawa idan alamu ba su inganta cikin kwana 7 ko sun tsananta a kowane lokaci',yo:'Padà wá fún ìtúpalẹ̀ tí àwọn àmì àìsàn kò bá dára sí i lára ọjọ́ 7 tàbí tí wọ́n bá burú sí i',ig:'Laghachi maka nyocha ma ihe mgbu gị ejideghị mma n\'ime ụbọchị 7 ma ọ bụ kasaa njọ'})
    },
    see_doctor: {
      title: lang({en:'⚠️ Professional Evaluation Needed',pidgin:'⚠️ Go See Doctor Better',ha:'⚠️ Ana Buƙatar Kimantawa ta Kwararru',yo:'⚠️ Ìtúpalẹ̀ Ọ̀jọ̀gbọ́n Ni a Nílò',ig:'⚠️ A chọrọ nyocha dọkịta ọkachamara'}),
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      message: lang({en:'Your symptoms require professional medical evaluation to determine if antibiotics are needed.',pidgin:'This thing wey you get, doctor suppose check am before you take anything.',ha:'Alamun ku suna buƙatar kimantawa ta likita don sanin ko antibiotics ake buƙata.',yo:'Àwọn àmì àìsàn rẹ nílò ìtúpalẹ̀ ìṣègùn ọ̀jọ̀gbọ́n láti mọ bóyá antibiotics ni a nílò.',ig:'Ihe mgbu gị chọrọ nyocha dọkịta ọkachamara iji chọpụta ma antibiotics dị mkpa.'}),
      advice: lang({en:[
        '📞 Schedule an appointment with a healthcare provider WITHIN 24-48 hours',
        '❌ Do NOT buy antibiotics without a prescription - this drives resistance',
        '📝 Write down: symptom duration, severity, fever, other symptoms',
        '💭 Ask your doctor: "Do I really need antibiotics for this?"',
        '✅ Follow prescription instructions EXACTLY - complete the full course'
      ],pidgin:[
        '📞 Call doctor or go see person wey know book inside 1-2 days',
        '❌ No buy medicine if doctor never write am for you',
        '📝 Note down how long the thing don start and if body hot',
        '💭 Ask doctor: "I true-true need antibiotic for this sickness?"',
        '✅ Take your pills exactly how doctor tell you - finish am o!'
      ],ha:[
        '📞 Yi alƙawarin saduwa da ma\'aikacin kiwon lafiya cikin sa\'o\'i 24-48',
        '❌ Kar ka sayi antibiotics ba tare da takardar likita ba',
        '📝 Rubuta: tsawon alamu, tsanani, zazzabi, sauran alamu',
        '💭 Tambayi likitanka: "Na gaskiya ina buƙatar antibiotics?"',
        '✅ Bi umarni na takardar likita DAIDAI - kammala dukan koryar'
      ],yo:[
        '📞 Ṣètò ìpàdé pẹ̀lú olùpèsè ìlera ní àárọ̀ wákàtí 24-48',
        '❌ Má ṣe ra antibiotics láìsí àwé ìfọwọ́sí - èyí máa ń mú júrúsí pọ̀ sí i',
        '📝 Kọ sílẹ̀: ìgbà tí àìsàn àti bí ó ṣe burú, ibà, àwọn àmì mìíràn',
        '💭 Béèrè lọ́wọ́ dókítà rẹ: "Ṣé n gba antibiotics fún èyí?"',
        '✅ Tẹ̀lé àwọn ìtọ́sọ́nà àwé PÁTÁPÁTÁ - parí gbogbo kóọsì'
      ],ig:[
        '📞 Kee a na-atusiata ya n\'oge 24-48 nke ọrịa dọkịta',
        '❌ Azụtaghị antibiotics na-enweghị ihe ndekọ dọkịta',
        '📝 Dee: ogologo ihe mgbu, otú o siri dị njọ, iba, ihe mgbu ndị ọzọ',
        '💭 Jụọ dọkịta gị: "Ọ bụ n\'ezie m chọrọ antibiotics maka nka?"',
        '✅ Soro ntuzie ihe ndekọ KPAMKPAM - mechaa usoro ahụ'
      ]}),
      nigeriaInfo: lang({en:'Over 40% of antibiotics in Nigeria are purchased without prescriptions.',pidgin:'For Naija, plenty people dey buy medicine without doctor - e grow wahala.',ha:'Fiye da kashi 40% na antibiotics a Najeriya ana siyan su ba tare da takardar likita ba.',yo:'Ju 40% ti antibiotics ní Nàìjíríà ni a ń rà láìsí ìwé ìfọwọ́sí.',ig:'Karịa 40% nke antibiotics na Nigeria a na-azụta ha na-enweghị ihe ndekọ dọkịta.'}),
      resistanceWarning: lang({en:'Taking wrong antibiotics or incomplete courses creates resistant bacteria that threaten everyone.',pidgin:'If you no finish your medicine, the sickness go strong pass the drug. Wahala for everybody.',ha:'Shan antibiotics marasa daidai ko mara cikakke na haifar da ƙwayoyin cuta masu juriya.',yo:'Mímu antibiotics tí kò tọ̀ tàbí tí kò parí máa ń mú kí àwọn bakitéríà ní agbára sí i tí wọ́n ń ṣe ewu fún gbogbo ènìyàn.',ig:'Ịṅụ antibiotics ezighi ezi ma ọ bụ na-adịghị izu oke na-emepụta ụdị bacteria na-eguzogide nke na-egwu mmadụ ọ bụla.'}),
      urgentSigns: lang({en:['Fever above 39°C','Difficulty breathing','Persistent vomiting','Blood in stool/urine','Severe pain'],pidgin:['Body hot over 39°C','Breath no dey reach','Dey vomit anyhow','Blood for inside pee or sheet','Big big pain'],ha:['Zazzabi sama da 39°C','Wahalar numfashi','Amai mara ƙarewa','Jini a najasa/fitsari','Ciwo mai tsanani'],yo:['Ibà ju 39°C lọ','Ìṣòro mímí','Ìgbagbó tí kò dáwọ́ dúró','Ẹ̀jẹ̀ nínú igbẹ́/ìtọ̀','Irora líle'],ig:['Iba karịa 39°C','Nsogbu iku ume','Ọbara afọ na-adịghị akwụsị','Ọbara n\'ime nkwọ/nsi','Mgbu nnukwu']}),
      followUp: lang({en:'Seek urgent care if symptoms worsen before your appointment',pidgin:'Go urgant care if sickness bad pass before you see doctor',ha:'Nemi kulawa ta gaggawa idan alamu sun tsananta kafin alƙawarinka',yo:'Wá fún ìtọ́jú ìjánu tí àwọn àmì àìsàn bá burú sí i ṣáájú ìpàdé rẹ',ig:'Chọọ nlekọta oge oge ma ihe mgbu gị kachaa njọ tupu oge dọkịta gị'})
    },
    urgent: {
      title: lang({en:'🚨 URGENT MEDICAL CARE REQUIRED',pidgin:'🚨 GO HOSPITAL NOW NOW',ha:'🚨 ANA BUƘATAR KULAWA TA GAGGAWA',yo:'🚨 ÌTỌ́JÚ ÌṢÈGÙN ÌJÁNU NI A NÍLÒ',ig:'🚨 A CHỌRỌ NLEKỌTA DỌKỊTA N\'OGE OGE'}),
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      message: lang({en:'Your symptoms are severe. Seek immediate medical attention now.',pidgin:'This sickness bad o. Go see doctor quick quick.',ha:'Alamun ku na da tsanani. Nemi kulawan likita ta gaggawa yanzu.',yo:'Àwọn àmì àìsàn rẹ lágbára. Wá fún ìtọ́jú ìṣègùn ní kíákíá.',ig:'Ihe mgbu gị dị njọ. Chọọ nlekọta dọkịta ugbu a.'}),
      advice: lang({en:[
        '🚑 Go to the nearest hospital/clinic IMMEDIATELY - do not wait',
        '❌ Do NOT self-treat or buy antibiotics on your own',
        '👥 Bring a family member if possible',
        '📋 Bring your ID and any medical history',
        '⚡ Follow all medical instructions without delay'
      ],pidgin:[
        '🚑 Run go hospital wey near you now - no wait o!',
        '❌ No try treat yourself or go buy drug yourself',
        '👥 Carry your brother or sister follow you',
        '📋 Carry your card and tell dem former sickness',
        '⚡ Do everything wey doctor tell you sharp-sharp'
      ],ha:[
        '🚑 Tafi asibiti mafi kusa YANZU - kada ka jira',
        '❌ Kar ka yi magani da kanki ko saye antibiotics kadai',
        '👥 Kawo memba na iyali idan zai yiwu',
        '📋 Kawo ID ɗinka da tarihin kiwon lafiyarka',
        '⚡ Bi duk umarni na likita ba tare da jinkirta'
      ],yo:[
        '🚑 Lọ sí ilé-ìwòsàn tó sún mọ́ LẸSẸKẸSẸ - má dúró',
        '❌ Má ṣe tọ́jú ara rẹ tàbí ra antibiotics fúnra rẹ',
        '👥 Mú ọmọ ẹbí wá tí ó bá ṣeéṣe',
        '📋 Mú àmì ìdánimọ̀ rẹ àti ìtàn ìlera rẹ wá',
        '⚡ Tẹ̀lé gbogbo ìtọ́sọ́nà ìṣègùn láìsí àárẹ̀'
      ],ig:[
        '🚑 Gaa ụlọ ọgwụ kacha nso OZUGBO - emeghị atụ',
        '❌ Azọọghị onwe gị ma ọ bụ zụta antibiotics onwe gị',
        '👥 Wetara onye nke ezi na ụlọ ma ọ bụrụ na ọ ga-ekwe omume',
        '📋 Wetara ID gị na akụkọ ihe gbasara ahụike gị',
        '⚡ Soro ntuzie dọkịta niile na-enweghị nchekasị'
      ]}),
      nigeriaInfo: lang({en:'Many hospitals in Nigeria provide emergency care.',pidgin:'Hospitals for Naija dey treat emergency cases.',ha:'Yawancin asibitoci a Najeriya suna ba da kulawan gaggawa.',yo:'Ọ̀pọ̀lọpọ̀ ilé-ìwòsàn ní Nàìjíríà ń pèsè ìtọ́jú ìjánu.',ig:'Ọtụtụ ụlọ ọgwụ na Nigeria na-enye nlekọta oge oge.'}),
      resistanceWarning: lang({en:'Serious infections may require specific antibiotics.',pidgin:'Big sickness need correct medicine wey doctor know',ha:'Cututtuka masu tsanani na iya buƙatar antibiotics na musamman.',yo:'Àwọn àìsàn líle le nílò antibiotics pàtàkì.',ig:'Ọrịa siri ike nwere ike ịchọ antibiotics nke pụrụ iche.'}),
      urgentSigns: lang({en:['Difficulty breathing','Severe chest pain','Confusion','Severe bleeding'],pidgin:['Breath no dey reach','Chest pain well well','Head no dey work','Blood dey flow for body'],ha:['Wahalar numfashi','Ciwo mai tsanani a kirji','Ruɗu','Zubar jini mai muni'],yo:['Ìṣòro mímí','Irora àyà líle','Ìdarúdàpọ̀','Ẹ̀jẹ̀ líle'],ig:['Nsogbu iku ume','Mgbu obi nnukwu','Mgbagwoju anya','Ọbara siri ike']}),
      followUp: lang({en:'This is a medical emergency',pidgin:'This one na emergency o',ha:'Wannan gaggawa ce ta likita',yo:'Èyí jẹ́ ìjánu ìṣègùn',ig:'Nka bụ ọrịa ihe ize ndụ'})
    }
  }

  const calculateDynamicRisk = () => {
    let totalRisk = 0
    Object.values(answers).forEach(answer => {
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
        risk: option.risk || 0 
      } 
    }
    setAnswers(newAnswers)
    setRiskScore(calculateDynamicRisk())

    if (option.recommendation) {
      // Award points for completing assessment
      awardPoints('quiz_perfect', 50)
      checkAchievement('KNOWLEDGE_SEEKER')
      
      showToast(lang({en:'Assessment complete. View your results below.',pidgin:'I don check am. See wetin you go do for bottom.',ha:'An gama kimantawa. Duba sakamakon ku a ƙasa.',yo:'Ìwádìí parí. Wò àwọn ìyọrísí rẹ nísàlẹ̀.',ig:'Nyocha agwụla. Lee ihe ị nwetara n\'okpuru.'}), 'success')
      setResult(option.recommendation)
    } else if (option.next !== undefined) {
      setCurrentStep(option.next)
    }
  }

  const resetChecker = () => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
    setRiskScore(0)
  }

  if (result) {
    const rec = recommendations[result]
    const Icon = rec.icon

    return (
      <PageWrapper className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/learn"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Learn
          </Link>

          {/* Main Result Card */}
          <div className={`${rec.bgColor} ${rec.borderColor} border-2 p-8 rounded-2xl shadow-xl mb-8`}>
            <div className="flex items-start space-x-6 mb-8">
              <div className="flex-shrink-0">
                <Icon size={64} className={rec.color} />
              </div>
              <div className="flex-1">
                <h1 className="font-display font-bold text-4xl text-gray-900 mb-3">
                  {rec.title}
                </h1>
                <p className="text-lg text-gray-700 font-semibold">{rec.message}</p>
              </div>
            </div>

            {/* Risk Score */}
            <div className="bg-white rounded-xl p-6 mb-6 border-l-4" style={{borderLeftColor: result === 'urgent' ? '#dc2626' : result === 'see_doctor' ? '#f59e0b' : '#16a34a'}}>
              <div className="flex items-center space-x-4">
                <TrendingUp size={24} className={result === 'urgent' ? 'text-red-600' : result === 'see_doctor' ? 'text-yellow-600' : 'text-green-600'} />
                <div>
                  <p className="text-sm text-gray-600">Overall Condition Assessment</p>
                  <p className="text-2xl font-bold text-gray-900">{result === 'urgent' ? '🔴 HIGH RISK' : result === 'see_doctor' ? '🟡 MODERATE RISK' : '🟢 LOW RISK'}</p>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white p-6 rounded-xl mb-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
                <Zap size={20} className="mr-2 text-yellow-500" /> {lang({en:'What You Should Do:',pidgin:'Wetin you go do:',ha:'Abin da ya kamata ka yi:',yo:'Ohun Tí O Yẹ Kí O Ṣe:',ig:'Ihe I kwesịrị ime:'})}
              </h3>
              <ul className="space-y-3">
                {rec.advice.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={20} className={`${result === 'urgent' ? 'text-red-500' : result === 'see_doctor' ? 'text-yellow-500' : 'text-green-500'} mr-3 flex-shrink-0 mt-0.5`} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nigeria Context */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
              <h4 className="font-bold text-blue-900 mb-2">🇳🇬 Nigerian Healthcare Context:</h4>
              <p className="text-blue-800">{rec.nigeriaInfo}</p>
            </div>

            {/* Resistance Warning */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
              <h4 className="font-bold text-red-900 mb-2">⚠️ Fighting Antibiotic Resistance:</h4>
              <p className="text-red-800">{rec.resistanceWarning}</p>
            </div>

            {/* Warning Signs */}
            <div className={`${result === 'urgent' ? 'bg-red-50' : result === 'see_doctor' ? 'bg-yellow-50' : 'bg-green-50'} p-6 rounded mb-6`}>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <AlertCircle size={20} className="mr-2" /> Warning Signs - Seek Immediate Help If:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {rec.urgentSigns.map((sign, index) => (
                  <li key={index} className="flex items-center text-gray-800">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow-up */}
            <div className="bg-purple-50 p-6 rounded mb-6 border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                <Clock size={20} className="mr-2" /> Follow-up:</h4>
              <p className="text-purple-800">{rec.followUp}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetChecker}
                className="btn-primary flex-1"
              >
                {t('symptom.start_new')}
              </button>
              <Link to="/learn" className="btn-secondary flex-1 text-center">
                {lang({en:'Back to Learning',pidgin:'Go back to Education',ha:'Koma ga Koyo',yo:'Padà sí Ẹ̀kọ́',ig:'Laghachi na Mmụta'})}
              </Link>
            </div>
          </div>

          {/* Educational Footer */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white p-8 rounded-xl">
            <h3 className="font-bold text-lg mb-3">💡 Remember: Prevention is Better Than Cure</h3>
            <ul className="space-y-2">
              <li>✓ Wash hands regularly with soap and water</li>
              <li>✓ Get vaccinated to prevent infections</li>
              <li>✓ Maintain good hygiene and sanitation</li>
              <li>✓ Only use antibiotics when prescribed</li>
              <li>✓ Complete full antibiotic courses</li>
              <li>✓ Never share antibiotics with others</li>
            </ul>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const currentQuestion = questions[currentStep]
  const completionPercentage = Math.round(((currentStep + 1) / questions.length) * 100)

  return (
    <PageWrapper className="min-h-screen py-12 px-4 bg-gradient-to-b from-primary-light/10 to-white">
      <div className="container mx-auto max-w-3xl">
        <Link
          to="/learn"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 font-semibold"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Learn
        </Link>

        <div className="card border-2 border-primary/20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display font-bold text-4xl text-gray-900 mb-2">
                  {t('symptom.title')}
                </h1>
                <p className="text-gray-600 text-lg">
                  {t('symptom.subtitle')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">{completionPercentage}%</p>
                <p className="text-sm text-gray-600">{lang({en:'Complete',pidgin:'I don do am',ha:'An gama',yo:'Parí',ig:'Ọ gwụla'})}</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-semibold text-gray-700">{t('symptom.question_label')} {currentStep + 1} / {questions.length}</span>
                <p className="text-xs text-gray-600">{currentQuestion.category.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">{t('symptom.risk_level')}: <span className="font-bold">{calculateDynamicRisk()}/40</span></p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-primary-light h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="font-bold text-2xl mb-8 text-gray-900 flex items-center">
              <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-bold">
                {currentStep + 1}
              </span>
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-5 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium group-hover:text-primary">{option.label}</span>
                    <Zap size={16} className="text-gray-400 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-primary hover:text-primary-dark flex items-center font-semibold mb-4"
            >
              <ArrowLeft size={18} className="mr-2" />
              {t('symptom.previous')}
            </button>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border-l-4 border-primary p-6 rounded-lg">
          <p className="text-gray-700">
            <strong>📌 Health Tip:</strong> This assessment is for guidance only and does not replace professional medical advice. Always consult a qualified healthcare provider for medical concerns, especially in Nigeria where antibiotic resistance is a major public health issue.
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
