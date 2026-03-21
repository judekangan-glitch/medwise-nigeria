import { useState, useEffect } from 'react'
import { ArrowLeft, AlertCircle, CheckCircle, Users, Zap, TrendingUp, Heart, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { awardPoints, checkAchievement } from '../utils/gamification'

export default function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [riskScore, setRiskScore] = useState(0)
  const [assessmentTime] = useState(new Date().toISOString())

  const questions = [
    {
      id: 'age_group',
      question: 'What is your age group?',
      category: 'demographics',
      options: [
        { value: 'child', label: 'Below 5 years', risk: 2, next: 1 },
        { value: 'young', label: '5-18 years', risk: 1, next: 1 },
        { value: 'adult', label: '18-60 years', risk: 0, next: 1 },
        { value: 'senior', label: 'Above 60 years', risk: 3, next: 1 },
      ]
    },
    {
      id: 'existing_conditions',
      question: 'Do you have any existing health conditions?',
      category: 'demographics',
      options: [
        { value: 'none', label: 'No existing conditions', risk: 0, next: 2 },
        { value: 'diabetes', label: 'Diabetes', risk: 2, next: 2 },
        { value: 'hypertension', label: 'Hypertension', risk: 1, next: 2 },
        { value: 'hiv_aids', label: 'HIV/AIDS', risk: 4, next: 2 },
        { value: 'multiple', label: 'Multiple conditions', risk: 3, next: 2 },
      ]
    },
    {
      id: 'symptom_type',
      question: 'What type of symptoms are you experiencing?',
      category: 'primary',
      options: [
        { value: 'respiratory', label: 'Respiratory (cough, cold, sore throat, pneumonia)', next: 3 },
        { value: 'digestive', label: 'Digestive (diarrhea, stomach pain, nausea)', next: 4 },
        { value: 'urinary', label: 'Urinary (painful urination, frequent urination, UTI)', next: 5 },
        { value: 'skin', label: 'Skin infection (wound, rash, boil, abscess)', next: 6 },
        { value: 'fever', label: 'Fever (high temperature with unknown cause)', next: 7 },
        { value: 'ear_eye', label: 'Ear/Eye infection (ear pain, discharge, eye discharge)', next: 8 },
      ]
    },
    {
      id: 'respiratory_duration',
      question: 'How long have you had respiratory symptoms?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: 'Less than 24 hours', risk: 1, next: 9 },
        { value: '1_3_days', label: '1-3 days', risk: 1, next: 9 },
        { value: '4_7_days', label: '4-7 days', risk: 2, next: 9 },
        { value: 'more_than_week', label: 'More than a week', risk: 3, next: 9 },
      ]
    },
    {
      id: 'respiratory_severity',
      question: 'How severe are your respiratory symptoms?',
      category: 'severity',
      options: [
        { value: 'mild', label: 'Mild (runny nose, slight cough, no fever)', recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: 'Moderate (persistent cough, sore throat, low fever)', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: 'Severe (difficulty breathing, high fever, chest pain)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'digestive_duration',
      question: 'How long have you had digestive symptoms?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: 'Less than 24 hours', risk: 1, next: 10 },
        { value: '1_3_days', label: '1-3 days', risk: 1, next: 10 },
        { value: '4_7_days', label: '4-7 days', risk: 2, next: 10 },
        { value: 'more_than_week', label: 'More than a week', risk: 3, next: 10 },
      ]
    },
    {
      id: 'digestive_severity',
      question: 'Describe your digestive symptoms:',
      category: 'severity',
      options: [
        { value: 'mild', label: 'Mild (upset stomach, no fever, normal stools)', recommendation: 'self_care', risk: 0 },
        { value: 'moderate', label: 'Moderate (persistent diarrhea with fever)', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: 'Severe (bloody stool, severe dehydration, high fever)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'urinary_duration',
      question: 'How long have you had urinary symptoms?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: 'Less than 24 hours', risk: 0, next: 11 },
        { value: '1_3_days', label: '1-3 days', risk: 1, next: 11 },
        { value: '4_7_days', label: '4-7 days', risk: 2, next: 11 },
        { value: 'more_than_week', label: 'More than a week', risk: 3, next: 11 },
      ]
    },
    {
      id: 'urinary_severity',
      question: 'How severe are your urinary symptoms?',
      category: 'severity',
      options: [
        { value: 'mild', label: 'Mild (slight discomfort when urinating)', recommendation: 'see_doctor', risk: 1 },
        { value: 'moderate', label: 'Moderate (painful urination with fever)', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: 'Severe (blood in urine, back pain, high fever)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'skin_duration',
      question: 'How long have you had this skin condition?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: 'Less than 24 hours', risk: 0, next: 12 },
        { value: '1_3_days', label: '1-3 days', risk: 1, next: 12 },
        { value: '4_7_days', label: '4-7 days', risk: 2, next: 12 },
        { value: 'more_than_week', label: 'More than a week', risk: 3, next: 12 },
      ]
    },
    {
      id: 'skin_severity',
      question: 'Describe your skin condition:',
      category: 'severity',
      options: [
        { value: 'minor', label: 'Minor (small cut, no pus, no swelling)', recommendation: 'self_care', risk: 0 },
        { value: 'infected', label: 'Infected (swollen, red, with pus)', recommendation: 'see_doctor', risk: 2 },
        { value: 'spreading', label: 'Spreading rapidly (red lines, fever)', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'fever_duration',
      question: 'How long have you had fever?',
      category: 'details',
      options: [
        { value: 'less_than_24h', label: 'Less than 24 hours', risk: 1, next: 13 },
        { value: '1_3_days', label: '1-3 days', risk: 1, next: 13 },
        { value: '4_7_days', label: '4-7 days', risk: 2, next: 13 },
        { value: 'more_than_week', label: 'More than a week', risk: 3, next: 13 },
      ]
    },
    {
      id: 'fever_severity',
      question: 'What is your fever status?',
      category: 'severity',
      options: [
        { value: 'low', label: 'Low-grade fever (37-38°C / 98.6-100.4°F)', recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: 'Moderate fever (38-39°C / 100.4-102.2°F) with body aches', recommendation: 'see_doctor', risk: 2 },
        { value: 'high', label: 'High fever (above 39°C / 102.2°F), confusion, weakness', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'ear_severity',
      question: 'Describe your ear/eye condition:',
      category: 'severity',
      options: [
        { value: 'mild', label: 'Mild discomfort, slight redness', recommendation: 'self_care', risk: 1 },
        { value: 'moderate', label: 'Pain with discharge, affecting hearing/vision', recommendation: 'see_doctor', risk: 2 },
        { value: 'severe', label: 'Severe pain, pus discharge, fever, vision/hearing loss', recommendation: 'urgent', risk: 4 },
      ]
    },
    {
      id: 'previous_antibiotics',
      question: 'Have you taken antibiotics in the last 4 weeks?',
      category: 'history',
      options: [
        { value: 'no', label: 'No', risk: 0, next: 14 },
        { value: 'yes_1_month', label: 'Yes, within the last month', risk: 2, next: 14 },
        { value: 'yes_incomplete', label: 'Yes, but I stopped early', risk: 3, next: 14 },
      ]
    },
    {
      id: 'symptom_improvement',
      question: 'Are your symptoms improving or getting worse?',
      category: 'trajectory',
      options: [
        { value: 'improving', label: 'Improving', recommendation: null, risk: 0 },
        { value: 'stable', label: 'Stable (no change)', recommendation: null, risk: 1 },
        { value: 'worsening', label: 'Getting worse', recommendation: 'urgent', risk: 3 },
      ]
    },
  ]

  const recommendations = {
    self_care: {
      title: '✓ Self-Care Management',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      message: 'Your symptoms suggest you likely don\'t need antibiotics right now.',
      advice: [
        '🏠 Rest and stay hydrated (drink water, warm tea, electrolyte drinks)',
        '💊 Use over-the-counter pain relievers if needed',
        '⏱️ Monitor your symptoms for 48-72 hours',
        '🩺 See a doctor IMMEDIATELY if symptoms worsen',
        '❌ Do NOT self-prescribe antibiotics - most minor infections resolve on their own'
      ],
      nigeriaInfo: 'Seeking unnecessary healthcare can strain resources. Your recovery can happen at home with proper care.',
      resistanceWarning: 'Self-medicating with antibiotics drives antibiotic resistance in Nigeria and puts your community at risk.',
      urgentSigns: ['High fever persisting', 'Severe pain', 'Difficulty breathing', 'Confusion', 'Spreading redness'],
      followUp: 'Return for evaluation if symptoms don\'t improve in 7 days or worsen at any time'
    },
    see_doctor: {
      title: '⚠️ Professional Evaluation Needed',
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      message: 'Your symptoms require professional medical evaluation to determine if antibiotics are needed.',
      advice: [
        '📞 Schedule an appointment with a healthcare provider WITHIN 24-48 hours',
        '❌ Do NOT buy antibiotics without a prescription - this drives resistance',
        '📝 Write down: symptom duration, severity, fever, other symptoms',
        '💭 Ask your doctor: "Do I really need antibiotics for this?"',
        '✅ Follow prescription instructions EXACTLY - complete the full course'
      ],
      nigeriaInfo: 'Over 40% of antibiotics in Nigeria are purchased without prescriptions. Licensed pharmacies ensure authentic, appropriate medications.',
      resistanceWarning: 'Taking wrong antibiotics or incomplete courses creates resistant bacteria that threaten everyone.',
      urgentSigns: ['Fever above 39°C', 'Difficulty breathing', 'Persistent vomiting', 'Blood in stool/urine', 'Severe pain'],
      followUp: 'Seek urgent care if symptoms worsen before your appointment'
    },
    urgent: {
      title: '🚨 URGENT MEDICAL CARE REQUIRED',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      message: 'Your symptoms are severe. Seek immediate medical attention now.',
      advice: [
        '🚑 Go to the nearest hospital/clinic IMMEDIATELY - do not wait',
        '❌ Do NOT self-treat or buy antibiotics on your own',
        '👥 Bring a family member if possible',
        '📋 Bring your ID and any medical history',
        '⚡ Follow all medical instructions without delay'
      ],
      nigeriaInfo: 'Many hospitals in Nigeria provide emergency care. Calling 112 or 911 in your area can dispatch medical help.',
      resistanceWarning: 'Serious infections may require specific antibiotics. Only doctors can determine the right treatment.',
      urgentSigns: ['Difficulty breathing', 'Severe chest pain', 'Confusion/altered consciousness', 'Loss of consciousness', 'Severe bleeding'],
      followUp: 'This is a medical emergency'
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
      <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
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
                <Zap size={20} className="mr-2 text-yellow-500" /> What You Should Do:
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
                Start New Assessment
              </button>
              <Link to="/learn" className="btn-secondary flex-1 text-center">
                Back to Learning
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
      </div>
    )
  }

  const currentQuestion = questions[currentStep]
  const completionPercentage = Math.round(((currentStep + 1) / questions.length) * 100)

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-primary-light/10 to-white">
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
                  🔬 Symptom Assessment Tool
                </h1>
                <p className="text-gray-600 text-lg">
                  Get evidence-based guidance on whether you need antibiotics. Your input helps fight antibiotic resistance in Nigeria.
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">{completionPercentage}%</p>
                <p className="text-sm text-gray-600">Complete</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-semibold text-gray-700">Question {currentStep + 1} of {questions.length}</span>
                <p className="text-xs text-gray-600">{currentQuestion.category.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Risk Level: <span className="font-bold">{calculateDynamicRisk()}/40</span></p>
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
              Previous Question
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
    </div>
  )
}
            >
              <ArrowLeft size={18} className="mr-2" />
              Previous Question
            </button>
          )}
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This tool provides general guidance only and does not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
