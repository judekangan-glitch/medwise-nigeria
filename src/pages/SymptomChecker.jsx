import { useState } from 'react'
import { ArrowLeft, AlertCircle, CheckCircle, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const questions = [
    {
      id: 'symptom_type',
      question: 'What type of symptoms are you experiencing?',
      options: [
        { value: 'respiratory', label: 'Respiratory (cough, cold, sore throat)', next: 1 },
        { value: 'digestive', label: 'Digestive (diarrhea, stomach pain)', next: 2 },
        { value: 'urinary', label: 'Urinary (painful urination, frequent urination)', next: 3 },
        { value: 'skin', label: 'Skin infection (wound, rash, boil)', next: 4 },
      ]
    },
    {
      id: 'respiratory_severity',
      question: 'How severe are your respiratory symptoms?',
      options: [
        { value: 'mild', label: 'Mild (runny nose, slight cough)', recommendation: 'self_care' },
        { value: 'moderate', label: 'Moderate (persistent cough, fever)', recommendation: 'see_doctor' },
        { value: 'severe', label: 'Severe (difficulty breathing, high fever)', recommendation: 'urgent' },
      ]
    },
    {
      id: 'digestive_severity',
      question: 'Describe your digestive symptoms:',
      options: [
        { value: 'mild', label: 'Mild upset stomach, no fever', recommendation: 'self_care' },
        { value: 'moderate', label: 'Persistent diarrhea with fever', recommendation: 'see_doctor' },
        { value: 'severe', label: 'Bloody stool, severe dehydration', recommendation: 'urgent' },
      ]
    },
    {
      id: 'urinary_severity',
      question: 'How severe are your urinary symptoms?',
      options: [
        { value: 'mild', label: 'Slight discomfort when urinating', recommendation: 'see_doctor' },
        { value: 'moderate', label: 'Painful urination with fever', recommendation: 'see_doctor' },
        { value: 'severe', label: 'Blood in urine, back pain, high fever', recommendation: 'urgent' },
      ]
    },
    {
      id: 'skin_severity',
      question: 'Describe your skin condition:',
      options: [
        { value: 'minor', label: 'Small cut or scrape, no pus', recommendation: 'self_care' },
        { value: 'infected', label: 'Swollen, red, with pus', recommendation: 'see_doctor' },
        { value: 'spreading', label: 'Rapidly spreading redness, fever', recommendation: 'urgent' },
      ]
    },
  ]

  const recommendations = {
    self_care: {
      title: 'Self-Care Recommended',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      message: 'Your symptoms suggest a condition that may not require antibiotics.',
      advice: [
        'Rest and stay hydrated',
        'Use over-the-counter pain relievers if needed',
        'Monitor your symptoms for 48-72 hours',
        'See a doctor if symptoms worsen or don\'t improve'
      ],
      warning: 'Do NOT self-prescribe antibiotics. Most minor infections resolve on their own.'
    },
    see_doctor: {
      title: 'See a Doctor',
      icon: Users,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      message: 'Your symptoms require professional medical evaluation.',
      advice: [
        'Schedule an appointment with a healthcare provider',
        'Do not buy antibiotics without a prescription',
        'Bring a list of your symptoms and their duration',
        'Ask your doctor if antibiotics are truly necessary'
      ],
      warning: 'Only a qualified healthcare provider can determine if antibiotics are needed.'
    },
    urgent: {
      title: 'Seek Urgent Care',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      message: 'Your symptoms are severe and require immediate medical attention.',
      advice: [
        'Go to the nearest hospital or clinic immediately',
        'Do not delay seeking medical care',
        'Do not attempt self-treatment',
        'Follow all medical advice carefully'
      ],
      warning: 'This is a medical emergency. Seek professional help immediately.'
    }
  }

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: option.value }
    setAnswers(newAnswers)

    if (option.recommendation) {
      setResult(option.recommendation)
    } else if (option.next !== undefined) {
      setCurrentStep(option.next)
    }
  }

  const resetChecker = () => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    const rec = recommendations[result]
    const Icon = rec.icon

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/learn"
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Learn
          </Link>

          <div className={`${rec.bgColor} p-8 rounded-2xl shadow-lg`}>
            <div className="flex items-center space-x-4 mb-6">
              <Icon size={48} className={rec.color} />
              <h2 className="font-display font-bold text-3xl text-gray-900">
                {rec.title}
              </h2>
            </div>

            <p className="text-lg mb-6 text-gray-700">{rec.message}</p>

            <div className="bg-white p-6 rounded-xl mb-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Recommended Actions:</h3>
              <ul className="space-y-3">
                {rec.advice.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-yellow-700 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-800 font-medium">{rec.warning}</p>
              </div>
            </div>

            <button
              onClick={resetChecker}
              className="btn-primary w-full"
            >
              Start New Assessment
            </button>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-3 text-gray-900">Remember:</h3>
            <p className="text-gray-700">
              This symptom checker provides general guidance only. It does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link
          to="/learn"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Learn
        </Link>

        <div className="card">
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl mb-4 text-gray-900">
              Symptom Assessment
            </h1>
            <p className="text-gray-600">
              Answer a few questions to get evidence-based guidance on whether you need antibiotics
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Question {currentStep + 1} of {questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-bold text-xl mb-6 text-gray-900">
              {currentQuestion.question}
            </h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-green-50 transition-all"
                >
                  <span className="text-gray-800 font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-gray-600 hover:text-gray-800 flex items-center"
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
