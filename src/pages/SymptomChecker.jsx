import { Link } from 'react-router-dom'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'
import { useGamification } from '../hooks/useGamification'
import PageWrapper from '../components/PageWrapper'

export default function SymptomChecker() {
  const { language } = useMedwise()
  const { t } = useTranslation(language)
  const { awardPoints, checkAchievement } = useGamification()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [riskScore, setRiskScore] = useState(0)
  const [assessmentTime] = useState(new Date().toISOString())

  const questions = [
    {
      id: 'age_group',
      question: language === 'en' ? 'What is your age group?' : 'How old you be?',
      category: 'demographics',
      options: [
        { value: 'child', label: language === 'en' ? 'Below 5 years' : 'Pikin wey never reach 5 years', risk: 2, next: 1 },
        { value: 'young', label: language === 'en' ? '5-18 years' : 'Young person (5-18 years)', risk: 1, next: 1 },
        { value: 'adult', label: language === 'en' ? '18-60 years' : 'Big person (18-60 years)', risk: 0, next: 1 },
        { value: 'senior', label: language === 'en' ? 'Above 60 years' : 'Mama/Papa (Above 60 years)', risk: 3, next: 1 },
      ]
    },
    {
      id: 'existing_conditions',
      question: language === 'en' ? 'Do you have any existing health conditions?' : 'Anything else dey worry you before?',
      category: 'demographics',
      options: [
        { value: 'none', label: language === 'en' ? 'No existing conditions' : 'Nothing dey worry me', risk: 0, next: 2 },
        { value: 'diabetes', label: language === 'en' ? 'Diabetes' : 'Sugar for body (Diabetes)', risk: 2, next: 2 },
        { value: 'hypertension', label: language === 'en' ? 'Hypertension' : 'B-P (Hypertension)', risk: 1, next: 2 },
        { value: 'hiv_aids', label: 'HIV/AIDS', risk: 4, next: 2 },
        { value: 'multiple', label: language === 'en' ? 'Multiple conditions' : 'Plenty things dey worry me', risk: 3, next: 2 },
      ]
    },
    {
      id: 'symptom_type',
      question: language === 'en' ? 'What type of symptoms are you experiencing?' : 'Which place inside your body dey worry you?',
      category: 'primary',
      options: [
        { value: 'respiratory', label: language === 'en' ? 'Respiratory (cough, cold, sore throat)' : 'Inside my chest (Cough, Catarrh, Sore throat)', next: 3 },
        { value: 'digestive', label: language === 'en' ? 'Digestive (diarrhea, stomach pain)' : 'My belle (Running belle, Belle pain)', next: 4 },
        { value: 'urinary', label: language === 'en' ? 'Urinary (painful urination)' : 'To pass water (Pee dey pain me)', next: 5 },
        { value: 'skin', label: language === 'en' ? 'Skin infection (wound, rash, boil)' : 'My Skin (Wound, Rash, Boil)', next: 6 },
        { value: 'fever', label: language === 'en' ? 'Fever (high temperature)' : 'Hot body (Fever)', next: 7 },
        { value: 'ear_eye', label: language === 'en' ? 'Ear/Eye infection' : 'My Ear or Eye (Discharge or pain)', next: 8 },
      ]
    },
    {
      id: 'respiratory_duration',
      question: language === 'en' ? 'How long have you had respiratory symptoms?' : 'How long you don dey get this cough or catarrh?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: language === 'en' ? 'Less than 24 hours' : 'E never reach one day', risk: 1, next: 9 },
        { value: '1_3_days', label: language === 'en' ? '1-3 days' : 'Like 1-3 days so', risk: 1, next: 9 },
        { value: '4_7_days', label: language === 'en' ? '4-7 days' : 'Almost one week now', risk: 2, next: 9 },
        { value: 'more_than_week', label: language === 'en' ? 'More than a week' : 'E don pass one week', risk: 3, next: 9 },
      ]
    },
    {
      id: 'respiratory_severity',
      question: language === 'en' ? 'How severe are your respiratory symptoms?' : 'How the sickness dey do you?',
      category: 'severity',
      options: [
        { value: 'mild', label: language === 'en' ? 'Mild (slight cough, no fever)' : 'Small small (Small cough, body no hot)', recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: language === 'en' ? 'Moderate (sore throat, low fever)' : 'E reach middle (Sore throat, body small hot)', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: language === 'en' ? 'Severe (difficulty breathing, chest pain)' : 'E bad well well (Breath no dey reach, chest pain)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'digestive_duration',
      question: language === 'en' ? 'How long have you had digestive symptoms?' : 'How long your belle don dey run?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: language === 'en' ? 'Less than 24 hours' : 'E never reach one day', risk: 1, next: 10 },
        { value: '1_3_days', label: language === 'en' ? '1-3 days' : 'Like 1-3 days so', risk: 1, next: 10 },
        { value: '4_7_days', label: language === 'en' ? '4-7 days' : 'Almost one week now', risk: 2, next: 10 },
        { value: 'more_than_week', label: language === 'en' ? 'More than a week' : 'E don pass one week', risk: 3, next: 10 },
      ]
    },
    {
      id: 'digestive_severity',
      question: language === 'en' ? 'Describe your digestive symptoms:' : 'How the belle sickness dey do you?',
      category: 'severity',
      options: [
        { value: 'mild', label: language === 'en' ? 'Mild (upset stomach, no fever)' : 'Small small (Belle just dey disturb, body no hot)', recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: language === 'en' ? 'Moderate (persistent diarrhea with fever)' : 'E reach middle (Belle dey run well, body small hot)', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: language === 'en' ? 'Severe (bloody stool, high fever)' : 'E bad well well (Blood for inside sheet, body hot well)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'urinary_duration',
      question: language === 'en' ? 'How long have you had urinary symptoms?' : 'How long pee don dey pain you?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: language === 'en' ? 'Less than 24 hours' : 'E never reach one day', risk: 0, next: 11 },
        { value: '1_3_days', label: language === 'en' ? '1-3 days' : 'Like 1-3 days', risk: 1, next: 11 },
        { value: '4_7_days', label: language === 'en' ? '4-7 days' : 'Like one week so', risk: 2, next: 11 },
        { value: 'more_than_week', label: language === 'en' ? 'More than a week' : 'E pass one week', risk: 3, next: 11 },
      ]
    },
    {
      id: 'urinary_severity',
      question: language === 'en' ? 'How severe are your urinary symptoms?' : 'How the pee pain dey reach?',
      category: 'severity',
      options: [
        { value: 'mild', label: language === 'en' ? 'Mild (slight discomfort)' : 'Small small pain', recommendation: 'see_doctor', risk: 1 },
        { value: 'moderate', label: language === 'en' ? 'Moderate (painful urination with fever)' : 'E reach middle (E dey pain and body hot)', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: language === 'en' ? 'Severe (blood in urine, back pain)' : 'E bad well well (Blood for inside pee, back pain)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'skin_duration',
      question: language === 'en' ? 'How long have you had this skin condition?' : 'How long your skin don dey do you like this?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: language === 'en' ? 'Less than 24 hours' : 'E never reach one day', risk: 0, next: 12 },
        { value: '1_3_days', label: language === 'en' ? '1-3 days' : 'Like 1-3 days', risk: 1, next: 12 },
        { value: '4_7_days', label: language === 'en' ? '4-7 days' : 'Almost one week now', risk: 2, next: 12 },
        { value: 'more_than_week', label: language === 'en' ? 'More than a week' : 'E don pass one week', risk: 3, next: 12 },
      ]
    },
    {
      id: 'skin_severity',
      question: language === 'en' ? 'Describe your skin condition:' : 'How the skin sickness be?',
      category: 'severity',
      options: [
        { value: 'minor', label: language === 'en' ? 'Minor (small cut, no pus)' : 'Small small (Small cut, no wetin dey inside)', recommendation: 'self_care', risk: 0 },
        { value: 'infected', label: language === 'en' ? 'Infected (swollen, red, with pus)' : 'E don swell (Red, pus dey inside)', recommendation: 'see_doctor', risk: 2 },
        { value: 'spreading', label: language === 'en' ? 'Spreading rapidly (red lines, fever)' : 'E dey spread quick (Red lines, body hot)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'fever_duration',
      question: language === 'en' ? 'How long have you had fever?' : 'How long your body don dey hot?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: language === 'en' ? 'Less than 24 hours' : 'E never reach one day', risk: 1, next: 13 },
        { value: '1_3_days', label: language === 'en' ? '1-3 days' : 'Like 1-3 days', risk: 1, next: 13 },
        { value: '4_7_days', label: language === 'en' ? '4-7 days' : 'Almost one week', risk: 2, next: 13 },
        { value: 'more_than_week', label: language === 'en' ? 'More than a week' : 'E pass one week', risk: 3, next: 13 },
      ]
    },
    {
      id: 'fever_severity',
      question: language === 'en' ? 'What is your fever status?' : 'How the hot body dey do you?',
      category: 'severity',
      options: [
        { value: 'low', label: language === 'en' ? 'Low-grade fever' : 'Body small hot', recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: language === 'en' ? 'Moderate fever with body aches' : 'Body hot reach middle and bone dey pain', recommendation: 'see_doctor', risk: 2 },
        { value: 'high', label: language === 'en' ? 'High fever, confusion, weakness' : 'Body hot well well, head confuse, no power', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'ear_severity',
      question: language === 'en' ? 'Describe your ear/eye condition:' : 'How the ear or eye de do you?',
      category: 'severity',
      options: [
        { value: 'mild', label: language === 'en' ? 'Mild discomfort, slight redness' : 'Small pain, small red', recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: language === 'en' ? 'Pain with discharge' : 'Pain and something dey come out', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: language === 'en' ? 'Severe pain, pus, vision/hearing loss' : 'Big pain, pus dey, I no dey see or hear well', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'previous_antibiotics',
      question: language === 'en' ? 'Have you taken antibiotics in the last 4 weeks?' : 'You don take antibiotic inside 4 weeks wey pass?',
      category: 'history',
      options: [
        { value: 'no', label: language === 'en' ? 'No' : 'No', risk: 0, next: 14 },
        { value: 'yes_1_month', label: language === 'en' ? 'Yes, within the last month' : 'Yes, inside this month', risk: 2, next: 14 },
        { value: 'yes_incomplete', label: language === 'en' ? 'Yes, but I stopped early' : 'Yes, but I no finish am', risk: 3, next: 14 },
      ]
    },
    {
      id: 'symptom_improvement',
      question: language === 'en' ? 'Are your symptoms improving or getting worse?' : 'The sickness dey go or e dey worse?',
      category: 'trajectory',
      options: [
        { value: 'improving', label: language === 'en' ? 'Improving' : 'E dey go small small', recommendation: null, risk: 0 },
        { value: 'stable', label: language === 'en' ? 'Stable (no change)' : 'E just dey same place', recommendation: null, risk: 1 },
        { value: 'worsening', label: language === 'en' ? 'Getting worse' : 'E dey worse o', recommendation: 'urgent', risk: 3 },
      ]
    },
  ]

  const recommendations = {
    self_care: {
      title: language === 'en' ? '✓ Self-Care Management' : '✓ Wetin You Go Do for House',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      message: language === 'en' 
        ? 'Your symptoms suggest you likely don\'t need antibiotics right now.'
        : 'Sickness wey you get show say you no need antibiotics now.',
      advice: language === 'en' ? [
        '🏠 Rest and stay hydrated (drink water, warm tea, electrolyte drinks)',
        '💊 Use over-the-counter pain relievers if needed',
        '⏱️ Monitor your symptoms for 48-72 hours',
        '🩺 See a doctor IMMEDIATELY if symptoms worsen',
        '❌ Do NOT self-prescribe antibiotics - most minor infections resolve on their own'
      ] : [
        '🏠 Rest well and drink plenty water or warm tea',
        '💊 Take small medicine for pain if you need am',
        '⏱️ Watch your body for like 2-3 days so',
        '🩺 Go see doctor QUICK QUICK if the thing start to bad',
        '❌ No go buy antibiotic for yourself - body go heal by emself'
      ],
      nigeriaInfo: language === 'en' 
        ? 'Seeking unnecessary healthcare can strain resources. Your recovery can happen at home with proper care.'
        : 'If you go hospital for small thing, you dey stress medical people. You fit get better for house.',
      resistanceWarning: language === 'en'
        ? 'Self-medicating with antibiotics drives antibiotic resistance in Nigeria and puts your community at risk.'
        : 'If you use medicine anyhow, that one go make sickness strong pass antibiotic. E no good for Naija.',
      urgentSigns: language === 'en' 
        ? ['High fever persisting', 'Severe pain', 'Difficulty breathing', 'Confusion', 'Spreading redness']
        : ['Body still hot well well', 'Big pain', 'Breath no dey reach', 'Your head dey confuse', 'Redness dey spread'],
      followUp: language === 'en' 
        ? 'Return for evaluation if symptoms don\'t improve in 7 days or worsen at any time'
        : 'Come back if you never better after 7 days or if sickness start to worse'
    },
    see_doctor: {
      title: language === 'en' ? '⚠️ Professional Evaluation Needed' : '⚠️ Go See Doctor Better',
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      message: language === 'en' 
        ? 'Your symptoms require professional medical evaluation to determine if antibiotics are needed.'
        : 'This thing wey you get, doctor suppose check am before you take anything.',
      advice: language === 'en' ? [
        '📞 Schedule an appointment with a healthcare provider WITHIN 24-48 hours',
        '❌ Do NOT buy antibiotics without a prescription - this drives resistance',
        '📝 Write down: symptom duration, severity, fever, other symptoms',
        '💭 Ask your doctor: "Do I really need antibiotics for this?"',
        '✅ Follow prescription instructions EXACTLY - complete the full course'
      ] : [
        '📞 Call doctor or go see person wey know book inside 1-2 days',
        '❌ No buy medicine if doctor never write am for you',
        '📝 Note down how long the thing don start and if body hot',
        '💭 Ask doctor: "I true-true need antibiotic for this sickness?"',
        '✅ Take your pills exactly how doctor tell you - finish am o!'
      ],
      nigeriaInfo: language === 'en'
        ? 'Over 40% of antibiotics in Nigeria are purchased without prescriptions.'
        : 'For Naija, plenty people dey buy medicine without doctor - e grow wahala.',
      resistanceWarning: language === 'en'
        ? 'Taking wrong antibiotics or incomplete courses creates resistant bacteria that threaten everyone.'
        : 'If you no finish your medicine, the sickness go strong pass the drug. Wahala for everybody.',
      urgentSigns: language === 'en' ? ['Fever above 39°C', 'Difficulty breathing', 'Persistent vomiting', 'Blood in stool/urine', 'Severe pain'] : ['Body hot over 39°C', 'Breath no dey reach', 'Dey vomit anyhow', 'Blood for inside pee or sheet', 'Big big pain'],
      followUp: language === 'en' ? 'Seek urgent care if symptoms worsen before your appointment' : 'Go urgant care if sickness bad pass before you see doctor'
    },
    urgent: {
      title: language === 'en' ? '🚨 URGENT MEDICAL CARE REQUIRED' : '🚨 GO HOSPITAL NOW NOW',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      message: language === 'en' ? 'Your symptoms are severe. Seek immediate medical attention now.' : 'This sickness bad o. Go see doctor quick quick.',
      advice: language === 'en' ? [
        '🚑 Go to the nearest hospital/clinic IMMEDIATELY - do not wait',
        '❌ Do NOT self-treat or buy antibiotics on your own',
        '👥 Bring a family member if possible',
        '📋 Bring your ID and any medical history',
        '⚡ Follow all medical instructions without delay'
      ] : [
        '🚑 Run go hospital wey near you now - no wait o!',
        '❌ No try treat yourself or go buy drug yourself',
        '👥 Carry your brother or sister follow you',
        '📋 Carry your card and tell dem former sickness',
        '⚡ Do everything wey doctor tell you sharp-sharp'
      ],
      nigeriaInfo: language === 'en' ? 'Many hospitals in Nigeria provide emergency care.' : 'Hospitals for Naija dey treat emergency cases.',
      resistanceWarning: language === 'en' ? 'Serious infections may require specific antibiotics.' : 'Big sickness need correct medicine wey doctor know',
      urgentSigns: language === 'en' ? ['Difficulty breathing', 'Severe chest pain', 'Confusion', 'Severe bleeding'] : ['Breath no dey reach', 'Chest pain well well', 'Head no dey work', 'Blood dey flow for body'],
      followUp: language === 'en' ? 'This is a medical emergency' : 'This one na emergency o'
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
                <Zap size={20} className="mr-2 text-yellow-500" /> {language === 'en' ? 'What You Should Do:' : 'Wetin you go do:'}
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
                {language === 'en' ? 'Back to Learning' : 'Go back to Education'}
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
                <p className="text-sm text-gray-600">{language === 'en' ? 'Complete' : 'I don do am'}</p>
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
