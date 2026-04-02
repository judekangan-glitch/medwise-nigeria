import { Plus, Pill, Clock, CheckCircle, AlertCircle, Trophy, Trash2 } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'
import { useGamification } from '../hooks/useGamification'
import PageWrapper from '../components/PageWrapper'

export default function Track() {
  const { medications, updateMedications, reminders, updateReminders, language } = useMedwise()
  const { t } = useTranslation(language)
  const { awardPoints, updateStreak, checkAchievement } = useGamification()
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  })

  const handleAddMedication = (e) => {
    e.preventDefault()
    const total = parseInt(newMed.frequency) * parseInt(newMed.duration)
    const medication = {
      id: Date.now(),
      ...newMed,
      startDate: new Date().toISOString().split('T')[0],
      completed: 0,
      total: total,
      nextDose: 'Not set' // Simple placeholder
    }
    
    updateMedications([...medications, medication])
    
    // Auto-create a reminder for first dose
    if (reminders.length < 1 && 'Notification' in window && Notification.permission === 'granted') {
      const newReminder = {
        id: Date.now().toString(),
        medicationId: medication.id,
        medication: newMed.name,
        time: '08:00', // Default morning dose
        enabled: true,
        createdAt: new Date().toISOString()
      }
      updateReminders([...reminders, newReminder])
    }
    
    setNewMed({ name: '', dosage: '', frequency: '', duration: '' })
    setShowAddForm(false)
    alert('Medication added! Set up reminders in the Reminders tab.')
  }

  const deleteMedication = (medId) => {
    if (confirm('Remove this medication?')) {
      updateMedications(medications.filter(m => m.id !== medId))
    }
  }

  const markDoseTaken = (medId) => {
    const updatedMeds = medications.map(med => {
      if (med.id === medId) {
        const newCompleted = Math.min(med.completed + 1, med.total)
        
        // Award points using global custom hook
        const reward = awardPoints('dose_taken')
        
        if (newCompleted === med.total) {
          checkAchievement('COURSE_COMPLETER')
          alert(`🎉 Course Complete! +${reward.pointsAdded} points\n${med.name} finished!`)
        } else {
          alert(`✓ Dose taken! +${reward.pointsAdded} points`)
        }
        
        return { ...med, completed: newCompleted }
      }
      return med
    })
    
    updateMedications(updatedMeds)
    updateStreak(updatedMeds)
  }

  const calculateProgress = (completed, total) => {
    return Math.round((completed / total) * 100)
  }

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500'
    if (progress < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <PageWrapper className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-gray-900">
            {language === 'en' ? 'Track Your Medications' : 'Follow Your Medicine'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Never miss a dose. Complete your antibiotic course. Fight resistance.'
              : 'No forget to take your drug. Finish the full course make sickness no strong pass you.'}
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {language === 'en' ? 'Why Complete Your Course?' : 'Why You Suppose Finish Your Drug?'}
              </h3>
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Stopping antibiotics early—even when you feel better—allows resistant bacteria to survive and multiply. Completing the full course ensures all bacteria are eliminated.'
                  : 'If you stop take your antibiotic before time—even if you don better—that sickness fit come back strong pass before. Finish the full med make everything clear.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary w-full md:w-auto"
          >
            <Plus size={20} className="inline mr-2" />
            {language === 'en' ? 'Add Medication to Track' : 'Add New Medicine'}
          </button>
        </div>

        {showAddForm && (
          <div className="card mb-8">
            <h3 className="font-bold text-xl mb-4 text-gray-900">Add New Medication</h3>
            <form onSubmit={handleAddMedication} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Medication Name</label>
                <input
                  type="text"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  placeholder="e.g., Amoxicillin 500mg"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Dosage per intake</label>
                <input
                  type="text"
                  value={newMed.dosage}
                  onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                  placeholder="e.g., 1 capsule, 5ml syrup"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Frequency (times per day)</label>
                <input
                  type="number"
                  value={newMed.frequency}
                  onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                  placeholder="e.g., 3"
                  min="1"
                  max="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Duration (days)</label>
                <input
                  type="number"
                  value={newMed.duration}
                  onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                  placeholder="e.g., 7"
                  min="1"
                  max="30"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">Add Medication</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {medications.length === 0 ? (
          <div className="card text-center py-12">
            <Pill size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2 text-gray-900">{language === 'en' ? 'No Medications Tracked' : 'You never add any medicine'}</h3>
            <p className="text-gray-600 mb-6">{language === 'en' ? 'Add your first medication to start tracking adherence' : 'Add your first medicine make we start to follow you'}</p>
            <button onClick={() => setShowAddForm(true)} className="btn-primary">{language === 'en' ? 'Add Medication' : 'Add Medicine'}</button>
          </div>
        ) : (
          <div className="space-y-6">
            {medications.map((med) => {
              const progress = calculateProgress(med.completed, med.total)
              const isCompleted = med.completed === med.total

              return (
                <div key={med.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2 text-gray-900">{med.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Dosage: {med.dosage}</p>
                        <p>Frequency: {med.frequency} times daily</p>
                        <p>Started: {new Date(med.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCompleted && <Trophy size={32} className="text-yellow-500" />}
                      <button onClick={() => deleteMedication(med.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress: {med.completed} / {med.total} doses</span>
                      <span className="text-sm font-semibold text-gray-700">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(progress)}`} style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  {isCompleted ? (
                    <div className="bg-green-50 p-4 rounded-lg flex items-center">
                      <CheckCircle size={24} className="text-green-600 mr-3" />
                      <div>
                        <p className="font-semibold text-green-900">{language === 'en' ? 'Course Completed!' : 'You Don Finish Am!'}</p>
                        <p className="text-sm text-green-700">{language === 'en' ? 'Great job completing your full antibiotic course' : 'Well done as you finish all your antibiotic pills'}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center">
                          <Clock size={20} className="text-blue-600 mr-2" />
                          <span className="text-blue-900 font-semibold">{language === 'en' ? 'Next dose' : 'Dose wey follow'}: {med.nextDose}</span>
                        </div>
                      </div>
                      <button onClick={() => markDoseTaken(med.id)} className="btn-primary w-full" disabled={isCompleted}>
                        <CheckCircle size={20} className="inline mr-2" />
                        {language === 'en' ? 'Mark Dose as Taken' : 'I don take this dose'}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-12 card bg-green-50">
          <h3 className="font-bold text-xl mb-4 text-gray-900">{language === 'en' ? 'Adherence Tips' : 'Helpful Advice'}</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{language === 'en' ? 'Set alarms or reminders for each dose time' : 'Set alarm make you no forget to take your drug'}</p></div>
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{language === 'en' ? "Keep medications in a visible place (but out of children's reach)" : 'Put your medicine where you fit see am quick'}</p></div>
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{language === 'en' ? 'Take doses at the same times each day' : 'Dey take am the same time every day'}</p></div>
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{language === 'en' ? 'Never stop early, even if you feel better' : 'No ever stop early, even if you don better'}</p></div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
