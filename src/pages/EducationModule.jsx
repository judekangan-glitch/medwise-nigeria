import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Award, Zap } from 'lucide-react'
import { useGamification } from '../hooks/useGamification'
import { saveQuizResult } from '../utils/localStorage'
import PageWrapper from '../components/PageWrapper'

export default function EducationModule() {
  const { awardPoints, checkAchievement } = useGamification()
  const { moduleId } = useParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [reward, setReward] = useState(null)

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
• They are one of medicine's most important discoveries

Common antibiotics include penicillins (Amoxicillin), fluoroquinolones (Ciprofloxacin), and macrolides (Azithromycin).`
        },
        {
          title: 'When Do You Need Antibiotics?',
          content: `Antibiotics are needed when you have a confirmed or suspected bacterial infection that your body cannot fight on its own.

Common conditions that MAY require antibiotics:
• Urinary tract infections (UTIs)
• Strep throat
• Certain pneumonias
• Skin infections with pus
• Ear infections (some types)
• Bone infections (osteomyelitis)

Common conditions that DO NOT need antibiotics:
• Common cold
• Flu (influenza)
• Most sore throats
• Most coughs and bronchitis
• Viral conjunctivitis (pink eye)
• Diarrhea (unless caused by specific bacteria)`
        },
        {
          title: 'Why Professional Diagnosis Matters',
          content: `Only a qualified healthcare provider can determine if you need antibiotics because:

1. They can distinguish bacterial from viral infections
2. They know which antibiotic works best for specific infections
3. They can adjust dosing for your age, weight, and health conditions
4. They monitor for side effects and interactions
5. They know about antibiotic allergies and contraindications

Self-diagnosing and self-medicating with antibiotics is dangerous and contributes to antibiotic resistance.`
        },
        {
          title: 'Types of Antibiotics',
          content: `Different antibiotics work in different ways:

PENICILLINS (e.g., Amoxicillin, Ampicillin)
• Kill bacteria by destroying cell walls
• Commonly used for respiratory and skin infections
• Safe for most people

FLUOROQUINOLONES (e.g., Ciprofloxacin)
• Interfere with bacterial DNA
• Effective against many infections
• Require careful dosing

MACROLIDES (e.g., Azithromycin)
• Prevent bacteria from making proteins
• Often used for respiratory infections
• Good for people allergic to penicillin

CEPHALOSPORINS (e.g., Ceftriaxone)
• Similar to penicillins, work on cell walls
• Often used for serious infections
• Cross-allergy with penicillin possible`
        }
      ],
      quiz: [
        {
          question: 'Which of the following infections can be treated with antibiotics?',
          options: [
            { text: 'Common cold', correct: false },
            { text: 'Influenza (flu)', correct: false },
            { text: 'Urinary tract infection', correct: true },
            { text: 'COVID-19', correct: false }
          ],
          explanation: 'Urinary tract infections are bacterial infections that require antibiotics. The common cold, flu, and COVID-19 are viral infections that do not respond to antibiotics.'
        },
        {
          question: 'How do antibiotics work?',
          options: [
            { text: 'They boost your immune system', correct: false },
            { text: 'They kill bacteria or stop them from multiplying', correct: true },
            { text: 'They reduce inflammation only', correct: false },
            { text: 'They cure all types of infections', correct: false }
          ],
          explanation: 'Antibiotics work by either killing bacteria directly or preventing them from reproducing. This allows your immune system to clear the remaining infection.'
        },
        {
          question: 'Why should you only take antibiotics prescribed by a doctor?',
          options: [
            { text: 'To avoid side effects', correct: false },
            { text: 'Because doctors want to make money', correct: false },
            { text: 'Because doctors know which antibiotic works for your specific infection and dosage', correct: true },
            { text: 'Doctors just prefer pharmacy money', correct: false }
          ],
          explanation: 'Healthcare providers diagnose the specific infection, identify the causative bacteria, and prescribe the appropriate antibiotic at the correct dose for your condition.'
        },
        {
          question: 'What can happen if you take someone else\'s antibiotics?',
          options: [
            { text: 'Nothing, antibiotics are the same for everyone', correct: false },
            { text: 'It might not treat your infection and can cause harm', correct: true },
            { text: 'It always works better than prescribed antibiotics', correct: false },
            { text: 'You save money without any risks', correct: false }
          ],
          explanation: 'Different infections require different antibiotics. Taking the wrong antibiotic won\'t treat your condition and may cause unnecessary side effects.'
        },
        {
          question: 'How long should you take an antibiotic course?',
          options: [
            { text: 'Until you feel better', correct: false },
            { text: '2-3 days maximum', correct: false },
            { text: 'The full prescribed duration, even if you feel better', correct: true },
            { text: 'Until your medicine bottle is half-empty', correct: false }
          ],
          explanation: 'Always complete the full prescribed course to ensure all bacteria are eliminated and prevent antibiotic resistance.'
        }
      ]
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
• Sometimes resist multiple antibiotics at once (multidrug-resistant)

This is one of the biggest threats to global health today and is especially severe in Nigeria.`
        },
        {
          title: 'How Resistance Develops',
          content: `Bacteria become resistant through:

1. MISUSE: Taking antibiotics when not needed (like for viral infections)
2. INCOMPLETE COURSES: Stopping treatment early when you feel better
3. WRONG DOSING: Taking too little or too much
4. SHARING: Using someone else's prescription
5. AGRICULTURAL USE: Antibiotics given to livestock can create resistant bacteria
6. POOR SANITATION: Contaminated water spreads resistant bacteria

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
• Patients may need stronger drugs with more side effects

In Nigeria, antibiotic resistance is rising rapidly due to:
- Over-the-counter antibiotic sales without prescriptions
- Poor-quality and counterfeit medications
- Improper disposal of antibiotics
- Limited access to diagnostic tests`
        },
        {
          title: 'Nigeria\'s Resistance Crisis',
          content: `Nigeria faces a severe antibiotic resistance problem:

THE STATISTICS:
• Over 110,000 deaths annually linked to resistance
• Over 40% of antibiotics are obtained without prescriptions
• Many antibiotics sold are counterfeit or substandard
• Limited diagnostic testing leads to inappropriate use

THE CAUSES:
• Weak pharmacy regulations
• Medications available in open markets
• Limited public awareness
• High cost of proper diagnosis
• Insufficient antibiotic stewardship programs

YOUR ROLE MATTERS: Proper antibiotic use protects Nigeria's population.`
        },
        {
          title: 'What You Can Do',
          content: `Fight antibiotic resistance by:

PERSONAL ACTIONS:
✓ Never self-medicate with antibiotics
✓ Always complete prescribed courses
✓ Never share antibiotics with others
✓ Never use leftover antibiotics
✓ Ask your doctor for diagnosis before taking antibiotics
✓ Report counterfeit medications to NAFDAC

COMMUNITY ACTIONS:
✓ Educate family and friends
✓ Support proper medication disposal
✓ Advocate for pharmacy licensing
✓ Report suspicious drug sellers

WHEN BUYING MEDICATIONS:
✓ Buy from licensed pharmacies only
✓ Ask for prescriptions
✓ Verify medication authenticity
✓ Keep receipts
✓ Report counterfeit products`
        }
      ],
      quiz: [
        {
          question: 'What contributes to antibiotic resistance?',
          options: [
            { text: 'Completing the full course of antibiotics', correct: false },
            { text: 'Stopping antibiotics early when you feel better', correct: true },
            { text: 'Following your doctor\'s instructions exactly', correct: false },
            { text: 'Taking antibiotics with food', correct: false }
          ],
          explanation: 'Stopping antibiotics early allows resistant bacteria to survive and multiply. Always complete the full prescribed course, even if you feel better.'
        },
        {
          question: 'How do bacteria become resistant to antibiotics?',
          options: [
            { text: 'By drinking contaminated water', correct: false },
            { text: 'By exposure to incorrect antibiotic use which allows resistant strains to survive', correct: true },
            { text: 'By natural aging', correct: false },
            { text: 'By sunlight exposure', correct: false }
          ],
          explanation: 'Bacteria that survive antibiotic exposure (due to misuse, incomplete courses, or wrong dosing) multiply and pass on their resistance to new bacteria.'
        },
        {
          question: 'What is a superbug?',
          options: [
            { text: 'A very large insect', correct: false },
            { text: 'A bacteria that is resistant to multiple antibiotics', correct: true },
            { text: 'A viral infection', correct: false },
            { text: 'A type of fungal infection', correct: false }
          ],
          explanation: 'Superbugs are bacteria that have developed resistance to one or more antibiotics, making them very difficult to treat.'
        },
        {
          question: 'How many deaths annually in Nigeria are linked to antibiotic resistance?',
          options: [
            { text: 'Fewer than 10,000', correct: false },
            { text: 'Around 50,000', correct: false },
            { text: 'Over 110,000', correct: true },
            { text: 'Resistance causes no deaths', correct: false }
          ],
          explanation: 'Over 110,000 deaths annually in Nigeria are linked to antibiotic resistance, making it a critical public health issue.'
        },
        {
          question: 'What percentage of antibiotics in Nigeria are obtained without prescriptions?',
          options: [
            { text: 'Less than 10%', correct: false },
            { text: 'Around 40%', correct: true },
            { text: 'Over 80%', correct: false },
            { text: 'All antibiotics require prescriptions', correct: false }
          ],
          explanation: 'Over 40% of antibiotics in Nigeria are obtained without prescriptions, largely from open markets and unlicensed vendors, contributing to resistance.'
        }
      ]
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
6. ASK questions if you don't understand instructions
7. REPORT any unusual side effects to your doctor
8. KEEP track of what you're taking and when`
        },
        {
          title: 'Why Completing the Course Matters',
          content: `You might feel better after 2-3 days, but bacteria may still be present. Stopping early:

• Allows remaining bacteria to survive
• Gives resistant strains a chance to multiply
• Can cause the infection to return stronger
• Contributes to community resistance

YOUR SYMPTOMS IMPROVING ≠ INFECTION ELIMINATED

The infection may take longer to be fully cured than the time it takes for your body to stop showing symptoms. Bacteria numbers may still be high even though you feel well.

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
✓ Document when symptoms started

DON'T:
✗ Stop taking the antibiotic without medical advice
✗ Ignore serious side effects
✗ Self-adjust the dose
✗ Switch to someone else's medication

COMMON MILD SIDE EFFECTS (can usually be managed):
• Nausea - take with food
• Diarrhea - stay hydrated
• Mild rash - report to doctor

SERIOUS SIDE EFFECTS (seek help immediately):
• Severe allergic reactions
• Difficulty breathing
• Severe rash or skin reactions`
        },
        {
          title: 'Storage & Safety',
          content: `Store antibiotics properly:

PROPER STORAGE:
• Keep in cool, dry place
• Store away from children
• Keep in original container with label
• Don't refrigerate unless instructed
• Check expiration dates
• Don't expose to direct sunlight

DISPOSAL:
• Never throw in trash or flush down toilet
• Check for community drug take-back programs
• Mix with undesirable substance (coffee grounds, salt) in plastic bag if no program available
• Remove personal information from containers

WHY IT MATTERS:
- Improper disposal contaminates water supplies
- Discarded antibiotics can be picked up by people
- Environmental antibiotics harm ecosystems
- Can promote resistance in environmental bacteria`
        },
        {
          title: 'Preventing Future Infections',
          content: `While antibiotics treat infections, prevention is better:

HYGIENE PRACTICES:
✓ Wash hands frequently with soap and water
✓ Practice good food hygiene
✓ Keep wounds clean and covered
✓ Don't share personal items (toothbrush, makeup, razors)
✓ Maintain good sanitation

WHEN TO SEE A DOCTOR:
✓ Fever lasting more than 3-5 days
✓ Wounds showing signs of infection (pus, warmth, increasing pain)
✓ Persistent symptoms despite home care
✓ Symptoms of common bacterial infections

VACCINATION:
✓ Keep vaccinations current
✓ Prevents many infections from starting
✓ Reduces antibiotic need
✓ Protects your community`
        }
      ],
      quiz: [
        {
          question: 'When should you stop taking antibiotics?',
          options: [
            { text: 'As soon as you feel better', correct: false },
            { text: 'After 2-3 days if symptoms improve', correct: false },
            { text: 'The full prescribed duration, even if you feel better', correct: true },
            { text: 'When you have any side effects', correct: false }
          ],
          explanation: 'Always complete the full prescribed course to ensure all bacteria are eliminated and prevent antibiotic resistance.'
        },
        {
          question: 'What should you do if you experience side effects from antibiotics?',
          options: [
            { text: 'Stop taking them immediately', correct: false },
            { text: 'Contact your healthcare provider for guidance', correct: true },
            { text: 'Take half the dose', correct: false },
            { text: 'Switch to someone else\'s medication', correct: false }
          ],
          explanation: 'Always contact your healthcare provider if you experience side effects. They can advise whether to continue or adjust your treatment.'
        },
        {
          question: 'Why should you never share antibiotics with others?',
          options: [
            { text: 'To be selfish', correct: false },
            { text: 'Because you need them for your infection', correct: false },
            { text: 'Because the antibiotic may not be appropriate for their infection and can cause harm', correct: true },
            { text: 'There is no reason to avoid sharing', correct: false }
          ],
          explanation: 'Different infections require different antibiotics at different doses. Sharing can harm the other person and contribute to resistance.'
        },
        {
          question: 'How should you properly dispose of leftover antibiotics?',
          options: [
            { text: 'Flush them down the toilet', correct: false },
            { text: 'Throw them in the trash', correct: false },
            { text: 'Take them back to the pharmacy or use a community drug take-back program', correct: true },
            { text: 'Save them for later use', correct: false }
          ],
          explanation: 'Proper disposal prevents environmental contamination and stops people from accessing discarded medications inappropriately.'
        },
        {
          question: 'Where should antibiotics only be obtained from?',
          options: [
            { text: 'Open markets without prescriptions', correct: false },
            { text: 'Friends and family', correct: false },
            { text: 'Licensed pharmacies with a prescription from a healthcare provider', correct: true },
            { text: 'Any vendor offering them', correct: false }
          ],
          explanation: 'Only licensed pharmacies with valid prescriptions ensure you get authentic, appropriate antibiotics for your specific infection.'
        }
      ]
    }
  }

  const currentModule = modules[moduleId]
  if (!currentModule) {
    return <div>Module not found</div>
  }

  const handleQuizAnswer = (optionIndex) => {
    const question = currentModule.quiz[currentQuizIndex]
    const isCorrect = question.options[optionIndex].correct
    
    setQuizAnswers({ 
      ...quizAnswers, 
      [currentQuizIndex]: { optionIndex, isCorrect } 
    })
    setShowResults(true)
  }

  const handleNextQuestion = () => {
    if (currentQuizIndex < currentModule.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setShowResults(false)
    } else {
      // Quiz complete - calculate score and award points
      const correctAnswers = Object.values(quizAnswers).filter(a => a.isCorrect).length
      const totalQuestions = currentModule.quiz.length
      const score = Math.round((correctAnswers / totalQuestions) * 100)
      
      // Award points based on score
      const pointsToAward = Math.round((correctAnswers / totalQuestions) * 100)
      const rewardData = awardPoints('quiz_perfect', pointsToAward)
      
      // Check if perfect score achievement
      if (correctAnswers === totalQuestions) {
        checkAchievement('QUIZ_MASTER')
      }
      
      // Check if knowledge seeker achievement
      checkAchievement('KNOWLEDGE_SEEKER')
      
      // Save quiz result
      saveQuizResult(moduleId, score)
      setReward(rewardData)
      setQuizComplete(true)
    }
  }

  const isLastSection = currentSection === currentModule.sections.length

  return (
    <PageWrapper className="min-h-screen py-12 px-4">
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
          ) : quizComplete ? (
            // Quiz Results
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-12 text-white mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Zap size={64} className="text-yellow-400" />
                </div>
                <h2 className="font-bold text-3xl mb-4">Module Complete!</h2>
                <p className="text-xl mb-6">
                  You've successfully completed <strong>{currentModule.title}</strong>
                </p>
                
                {reward && (
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-6">
                    <p className="text-lg mb-2">🎁 Reward Earned:</p>
                    <p className="text-2xl font-bold">+{reward.pointsAdded} Points</p>
                    <p className="text-sm mt-2">New Level: {reward.newLevel}</p>
                  </div>
                )}
              </div>

              <Link to="/learn" className="btn-primary inline-block">
                Back to Learning Modules
              </Link>
            </div>
          ) : (
            // Quiz Section - One Question at a Time
            <div>
              <div className="mb-6">
                <span className="text-sm text-gray-600">
                  Question {currentQuizIndex + 1} of {currentModule.quiz.length}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuizIndex + 1) / currentModule.quiz.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="font-bold text-2xl mb-6 text-gray-900">
                Knowledge Check
              </h2>
              <p className="text-gray-700 mb-6 text-lg font-semibold">
                {currentModule.quiz[currentQuizIndex].question}
              </p>

              <div className="space-y-3 mb-6">
                {currentModule.quiz[currentQuizIndex].options.map((option, index) => {
                  const userAnswer = quizAnswers[currentQuizIndex]
                  const isSelected = userAnswer && userAnswer.optionIndex === index
                  const isCorrect = option.correct

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={showResults}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        showResults
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : isSelected && !isCorrect
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200'
                          : 'border-gray-200 hover:border-primary hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{option.text}</span>
                        {showResults && isCorrect && (
                          <CheckCircle className="text-green-500" size={20} />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <div className="text-red-500 text-lg">✗</div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {showResults && (
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 className="font-bold mb-2 text-gray-900">Explanation:</h3>
                  <p className="text-gray-700">
                    {currentModule.quiz[currentQuizIndex].explanation}
                  </p>
                </div>
              )}

              {showResults && (
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary w-full"
                >
                  {currentQuizIndex < currentModule.quiz.length - 1
                    ? 'Next Question'
                    : 'Complete Quiz'}
                </button>
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
    </PageWrapper>
  )
}
