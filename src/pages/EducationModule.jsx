import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Award } from 'lucide-react'

export default function EducationModule() {
  const { moduleId } = useParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const modules = {
    'antibiotics-basics': {
      title: 'Antibiotic Basics',
      sections: [
        {
          title: 'What Are Antibiotics?',
          content: `Antibiotics are medicines used to treat infections caused by bacteria. They work by either killing bacteria or stopping them from multiplying.

Key points to remember:
• Antibiotics only work against BACTERIAL infections
• They DO NOT work against viral infections like colds, flu, or COVID-19
• Different antibiotics target different types of bacteria
• They are one of medicine's most important discoveries`
        },
        {
          title: 'When Do You Need Antibiotics?',
          content: `Antibiotics are needed when you have a confirmed or suspected bacterial infection that your body cannot fight on its own.

Common conditions that MAY require antibiotics:
• Urinary tract infections (UTIs)
• Strep throat
• Certain pneumonias
• Skin infections with pus

Common conditions that DO NOT need antibiotics:
• Common cold
• Flu (influenza)
• Most sore throats
• Most coughs and bronchitis`
        },
        {
          title: 'Why Professional Diagnosis Matters',
          content: `Only a qualified healthcare provider can determine if you need antibiotics because:

1. They can distinguish bacterial from viral infections
2. They know which antibiotic works best for specific infections
3. They can adjust dosing for your age, weight, and health conditions
4. They monitor for side effects and interactions

Self-diagnosing and self-medicating with antibiotics is dangerous and contributes to antibiotic resistance.`
        }
      ],
      quiz: {
        question: 'Which of the following infections can be treated with antibiotics?',
        options: [
          { text: 'Common cold', correct: false },
          { text: 'Influenza (flu)', correct: false },
          { text: 'Urinary tract infection', correct: true },
          { text: 'COVID-19', correct: false }
        ],
        explanation: 'Urinary tract infections are bacterial infections that require antibiotics. The common cold, flu, and COVID-19 are viral infections that do not respond to antibiotics.'
      }
    },
    'resistance-crisis': {
      title: 'The Resistance Crisis',
      sections: [
        {
          title: 'What Is Antibiotic Resistance?',
          content: `Antibiotic resistance occurs when bacteria change in ways that make antibiotics ineffective against them. These "superbugs" can:

• Survive antibiotic treatment
• Continue to multiply and cause infection
• Spread to other people
• Become increasingly difficult to treat

This is one of the biggest threats to global health today.`
        },
        {
          title: 'How Resistance Develops',
          content: `Bacteria become resistant through:

1. MISUSE: Taking antibiotics when not needed (like for viral infections)
2. INCOMPLETE COURSES: Stopping treatment early when you feel better
3. WRONG DOSING: Taking too little or too much
4. SHARING: Using someone else's prescription

Each time bacteria are exposed to antibiotics incorrectly, resistant strains have a better chance to survive and multiply.`
        },
        {
          title: 'The Consequences',
          content: `When antibiotics stop working:

• Simple infections become life-threatening
• Surgery and chemotherapy become riskier
• Hospital stays become longer
• Treatment costs increase dramatically
• More people die from infections that were once easily treatable

In Nigeria, antibiotic resistance is rising rapidly due to over-the-counter sales and improper use.`
        }
      ],
      quiz: {
        question: 'What contributes to antibiotic resistance?',
        options: [
          { text: 'Completing the full course of antibiotics', correct: false },
          { text: 'Stopping antibiotics early when you feel better', correct: true },
          { text: 'Following your doctor\'s instructions exactly', correct: false },
          { text: 'Taking antibiotics with food', correct: false }
        ],
        explanation: 'Stopping antibiotics early allows resistant bacteria to survive and multiply. Always complete the full prescribed course, even if you feel better.'
      }
    },
    'proper-use': {
      title: 'Proper Antibiotic Use',
      sections: [
        {
          title: 'The Golden Rules',
          content: `Follow these rules EVERY time you take antibiotics:

1. ONLY take antibiotics prescribed by a healthcare provider
2. COMPLETE the full course - never stop early
3. TAKE them at the right times and doses
4. NEVER share or use someone else's antibiotics
5. DON'T save leftover antibiotics for later
6. ASK questions if you don't understand instructions`
        },
        {
          title: 'Why Completing the Course Matters',
          content: `You might feel better after 2-3 days, but bacteria may still be present. Stopping early:

• Allows remaining bacteria to survive
• Gives resistant strains a chance to multiply
• Can cause the infection to return stronger
• Contributes to community resistance

Your symptoms improving ≠ Infection eliminated

Complete the full course to ensure all bacteria are destroyed.`
        },
        {
          title: 'What to Do If You Have Side Effects',
          content: `If you experience side effects:

DO:
✓ Contact your healthcare provider
✓ Report the symptoms you're experiencing
✓ Ask if you should continue taking the medication
✓ Follow their guidance

DON'T:
✗ Stop taking the antibiotic without medical advice
✗ Ignore serious side effects
✗ Self-adjust the dose

Common mild side effects (nausea, diarrhea) can often be managed. Severe reactions require immediate medical attention.`
        }
      ],
      quiz: {
        question: 'When should you stop taking antibiotics?',
        options: [
          { text: 'As soon as you feel better', correct: false },
          { text: 'After 2-3 days if symptoms improve', correct: false },
          { text: 'Only when you\'ve completed the full prescribed course', correct: true },
          { text: 'When you have any side effects', correct: false }
        ],
        explanation: 'Always complete the full prescribed course, even if you feel better. Only stop early if your doctor specifically advises you to do so.'
      }
    }
  }

  const currentModule = modules[moduleId]
  if (!currentModule) {
    return <div>Module not found</div>
  }

  const handleQuizAnswer = (optionIndex) => {
    setQuizAnswers({ ...quizAnswers, [moduleId]: optionIndex })
    setShowResults(true)
  }

  const isLastSection = currentSection === currentModule.sections.length

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/learn"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Learn
        </Link>

        <div className="card">
          <h1 className="font-display font-bold text-3xl mb-6 text-gray-900">
            {currentModule.title}
          </h1>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Section {currentSection + 1} of {currentModule.sections.length + 1}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentSection + 1) / (currentModule.sections.length + 1)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentSection + 1) / (currentModule.sections.length + 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          {!isLastSection ? (
            <>
              <h2 className="font-bold text-2xl mb-4 text-gray-900">
                {currentModule.sections[currentSection].title}
              </h2>
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
                  {currentModule.sections[currentSection].content}
                </p>
              </div>
            </>
          ) : (
            // Quiz Section
            <div>
              <h2 className="font-bold text-2xl mb-4 text-gray-900">
                Knowledge Check
              </h2>
              <p className="text-gray-600 mb-6">
                {currentModule.quiz.question}
              </p>

              <div className="space-y-3 mb-6">
                {currentModule.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showResults}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                      showResults
                        ? option.correct
                          ? 'border-green-500 bg-green-50'
                          : quizAnswers[moduleId] === index
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                        : 'border-gray-200 hover:border-primary hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">{option.text}</span>
                      {showResults && option.correct && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResults && (
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 className="font-bold mb-2 text-gray-900">Explanation:</h3>
                  <p className="text-gray-700">{currentModule.quiz.explanation}</p>
                </div>
              )}

              {showResults && (
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <Award size={48} className="text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-gray-900">Module Complete!</h3>
                  <p className="text-gray-700 mb-4">
                    You've successfully completed {currentModule.title}
                  </p>
                  <Link to="/learn" className="btn-primary inline-block">
                    Back to Learning Modules
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {!isLastSection && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} className="inline mr-2" />
                Previous
              </button>
              <button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="btn-primary"
              >
                {currentSection === currentModule.sections.length - 1 ? 'Take Quiz' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
