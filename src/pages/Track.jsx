import { useState } from 'react'
import { Plus, Pill, Clock, CheckCircle, AlertCircle, Trophy, Trash2 } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'
import { useGamification } from '../hooks/useGamification'
import PageWrapper from '../components/PageWrapper'

export default function Track() {
  const { medications, updateMedications, reminders, updateReminders, language, showToast } = useMedwise()
  const { t } = useTranslation(language)
  const { awardPoints, updateStreak, checkAchievement } = useGamification()
  const lang = (map) => map[language] ?? map['en']

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
      nextDose: 'Not set'
    }
    
    updateMedications([...medications, medication])
    
    if (reminders.length < 1 && 'Notification' in window && Notification.permission === 'granted') {
      const newReminder = {
        id: Date.now().toString(),
        medicationId: medication.id,
        medication: newMed.name,
        time: '08:00',
        enabled: true,
        createdAt: new Date().toISOString()
      }
      updateReminders([...reminders, newReminder])
    }
    
    setNewMed({ name: '', dosage: '', frequency: '', duration: '' })
    setShowAddForm(false)
    showToast(lang({en:'Medication added! Set up reminders in the Reminders tab.',pidgin:'Medicine don add! Set up alarm for Reminders tab.',ha:'An ƙara magani! Shirya tunatarwa a shafin Tunatarwa.',yo:'A ṣàfikún egbogi! Ṣètò àwọn ìránlọ́wọ́ ní ìdásílẹ̀ Olùránnilétí.',ig:'Agbakwunyere ọgwụ! Tọọ ihe ncheta na taabụ Ihe Ncheta.'}), 'success')
  }

  const deleteMedication = (medId) => {
    if (confirm(lang({en:'Remove this medication?',pidgin:'You wan remove this medicine?',ha:'Cire wannan magani?',yo:'Yọ egbogi yii kuro?',ig:'Wepụ ọgwụ a?'}))) {
      updateMedications(medications.filter(m => m.id !== medId))
    }
  }

  const markDoseTaken = (medId) => {
    const updatedMeds = medications.map(med => {
      if (med.id === medId) {
        const newCompleted = Math.min(med.completed + 1, med.total)
        const reward = awardPoints('dose_taken')
        
        if (newCompleted === med.total) {
          checkAchievement('COURSE_COMPLETER')
          showToast(`🎉 ${lang({en:'Course Complete',pidgin:'You don finish am',ha:'An kammala koryar',yo:'Parí kóọsì',ig:'Mechaa usoro'})}! +${reward.pointsAdded} points\n${med.name} finished!`, 'success')
        } else {
          showToast(`✓ ${lang({en:'Dose taken',pidgin:'I don take dose',ha:'An shan allura',yo:'A mu oògùn',ig:'Ọ nwetara ọgwụ'})}! +${reward.pointsAdded} points`, 'success')
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
            {lang({en:'Track Your Medications',pidgin:'Follow Your Medicine',ha:'Bi Magungunanka',yo:'Tọpinpin Egbogi Rẹ',ig:'Soro Ọgwụ Gị'})}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {lang({en:'Never miss a dose. Complete your antibiotic course. Fight resistance.',pidgin:'No forget to take your drug. Finish the full course make sickness no strong pass you.',ha:'Kada ka rasa allura. Kammala koryar maganin kashe ƙwayoyin cuta. Yaƙar juriya.',yo:'Má ṣe gbàgbé oògùn. Parí kóọsì antibiotics. Ja ìjà j̈úrúsí.',ig:'Ghara ifu ọgwụ. Mechaa usoro antibiotics gị. Lụọ mgbochi ọgụ.'})}
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {lang({en:'Why Complete Your Course?',pidgin:'Why You Suppose Finish Your Drug?',ha:'Me Ya Sa Kuke Buƙatar Kammala Koryar?',yo:'Kí Nìdí Tí O Fi Yẹ Kí O Parí Kóọsì?',ig:'Gịnị mere o ji dị mkpa ime usoro?'})}
              </h3>
              <p className="text-gray-700">
                {lang({en:'Stopping antibiotics early—even when you feel better—allows resistant bacteria to survive and multiply. Completing the full course ensures all bacteria are eliminated.',pidgin:'If you stop take your antibiotic before time—even if you don better—that sickness fit come back strong pass before. Finish the full med make everything clear.',ha:'Daina shan antibiotics da wuri—ko da kana jin daɗi—yana barin ƙwayoyin cuta masu juriya suyi raye suyi yawa. Kammala dukan koryar tana tabbatar da kawar da dukan ƙwayoyin cuta.',yo:'Dádúró mu antibiotics ní ìjẹ̀jẹ̀—àní nígbà tí o bá fẹ́ dára jẹ́—n jẹ́ kí àwọn bakitéríà arínifẹ̀ yè kó sì pọ̀ sí i. Parí gbogbo kóọsì ń ríjú pọ̀ tí gbogbo bakitéríà parẹ́.',ig:'Ikwụsị antibiotics n\'oge oge—ọbụna mgbe ị mara mma—na-ahapụ bacteria na-eguzogide ka ha nọdụ ụlọ ma ọ bụ mụbaa. Imechi usoro niile na-ejide na bacteria niile fụọrọ.'})}
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
            {lang({en:'Add Medication to Track',pidgin:'Add New Medicine',ha:'Ƙara Magani don Bi',yo:'Fikún Egbogi Láti Tọpinpin',ig:'Tinye Ọgwụ iji Soro'})}
          </button>
        </div>

        {showAddForm && (
          <div className="card mb-8">
            <h3 className="font-bold text-xl mb-4 text-gray-900">
              {lang({en:'Add New Medication',pidgin:'Add New Medicine',ha:'Ƙara Sabon Magani',yo:'Fikún Egbogi Tuntun',ig:'Tinye Ọgwụ Ọhụrụ'})}
            </h3>
            <form onSubmit={handleAddMedication} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {lang({en:'Medication Name',pidgin:'Name of Medicine',ha:'Sunan Magani',yo:'Orúkọ Egbogi',ig:'Aha Ọgwụ'})}
                </label>
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
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {lang({en:'Dosage per intake',pidgin:'How much to take at once',ha:'Yawan magani a kowane lokaci',yo:'Iye Egbogi Lẹ̀yẹ̀yẹ̀',ig:'Ọgwụ kwa oge'})}
                </label>
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
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {lang({en:'Frequency (times per day)',pidgin:'How many times per day',ha:'Sau nawa a rana',yo:'Iye Ìgbà Lójójúmọ́',ig:'Ole oge n\'ụbọchị'})}
                </label>
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
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {lang({en:'Duration (days)',pidgin:'How many days',ha:'Kwanaki nawa',yo:'Iye Ọjọ́',ig:'Ogologo oge (ụbọchị)'})}
                </label>
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
                <button type="submit" className="btn-primary flex-1">
                  {lang({en:'Add Medication',pidgin:'Add Medicine',ha:'Ƙara Magani',yo:'Fikún Egbogi',ig:'Tinye Ọgwụ'})}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary flex-1">
                  {lang({en:'Cancel',pidgin:'Cancel',ha:'Soke',yo:'Fagilé',ig:'Kagbuo'})}
                </button>
              </div>
            </form>
          </div>
        )}

        {medications.length === 0 ? (
          <div className="card text-center py-12">
            <Pill size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2 text-gray-900">
              {lang({en:'No Medications Tracked',pidgin:'You never add any medicine',ha:'Babu magungunan da ake bin su',yo:'Kò sí Egbogi Tí A Tọpinpin',ig:'Ọ dịghị ọgwụ a na-asoro'})}
            </h3>
            <p className="text-gray-600 mb-6">
              {lang({en:'Add your first medication to start tracking adherence',pidgin:'Add your first medicine make we start to follow you',ha:'Ƙara magani naka na farko don fara bin ta',yo:'Fikún egbogi àkọ́kọ́ rẹ láti bẹ̀rẹ̀ títọpinpin',ig:'Tinye ọgwụ nke mbụ gị iji bido ịsoro'})}
            </p>
            <button onClick={() => setShowAddForm(true)} className="btn-primary">
              {lang({en:'Add Medication',pidgin:'Add Medicine',ha:'Ƙara Magani',yo:'Fikún Egbogi',ig:'Tinye Ọgwụ'})}
            </button>
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
                        <p>{lang({en:'Dosage',pidgin:'Dose',ha:'Yawan allura',yo:'Iye Oògùn',ig:'Ọnụọgụ ọgwụ'})}: {med.dosage}</p>
                        <p>{lang({en:'Frequency',pidgin:'How many times',ha:'Sau',yo:'Ìgbà',ig:'Ole oge'})}: {med.frequency} {lang({en:'times daily',pidgin:'times per day',ha:'sau a rana',yo:'ìgbà lójoojúmọ́',ig:'oge n\'ụbọchị'})}</p>
                        <p>{lang({en:'Started',pidgin:'E start',ha:'An fara',yo:'Bẹ̀rẹ̀ ní',ig:'Bidoro'})}: {new Date(med.startDate).toLocaleDateString()}</p>
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
                      <span className="text-sm font-semibold text-gray-700">
                        {lang({en:'Progress',pidgin:'How far',ha:'Ci gaba',yo:'Ìlọsíwájú',ig:'Ọganiihu'})}: {med.completed} / {med.total} {lang({en:'doses',pidgin:'doses',ha:'allurai',yo:'oògùn',ig:'ọgwụ'})}
                      </span>
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
                        <p className="font-semibold text-green-900">
                          {lang({en:'Course Completed!',pidgin:'You Don Finish Am!',ha:'An kammala koryar!',yo:'Parí Kóọsì!',ig:'Mechara usoro!'})}
                        </p>
                        <p className="text-sm text-green-700">
                          {lang({en:'Great job completing your full antibiotic course',pidgin:'Well done as you finish all your antibiotic pills',ha:'Kyakkyawan aiki don kammala dukan koryar maganin kashe ƙwayoyin cuta',yo:'Ìṣẹ́ rere fún píparí gbogbo kóọsì antibiotics rẹ',ig:'Ọrụ ọma imecha usoro antibiotics gị nke ọma'})}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center">
                          <Clock size={20} className="text-blue-600 mr-2" />
                          <span className="text-blue-900 font-semibold">
                            {lang({en:'Next dose',pidgin:'Dose wey follow',ha:'Allura ta gaba',yo:'Oògùn Tí Ó Kàn',ig:'Ọgwụ ọzọ'})}: {med.nextDose}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => markDoseTaken(med.id)} className="btn-primary w-full" disabled={isCompleted}>
                        <CheckCircle size={20} className="inline mr-2" />
                        {lang({en:'Mark Dose as Taken',pidgin:'I don take this dose',ha:'Lura da shan allura',yo:'Ṣàmì Oògùn Gẹ́gẹ́ Bí A Ti Mu',ig:'Kọwapụta ọgwụ ka o wepụtara'})}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-12 card bg-green-50">
          <h3 className="font-bold text-xl mb-4 text-gray-900">
            {lang({en:'Adherence Tips',pidgin:'Helpful Advice',ha:'Shawarwari na Bi Ta',yo:'Àwọn Ìmọ̀ràn Ìgbọràn',ig:'Ndụmọdụ Ilo Oge'})}
          </h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{lang({en:'Set alarms or reminders for each dose time',pidgin:'Set alarm make you no forget to take your drug',ha:'Saita agogon fakarwa don kowane lokacin allura',yo:'Ṣètò àmùlẹ̀ tàbí àwọn ìránnilétí fún gbogbo akókò oògùn',ig:'Tọọ igwe ịdọ aka ná ntị maka oge ọgwụ ọ bụla'})}</p></div>
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{lang({en:"Keep medications in a visible place (but out of children's reach)",pidgin:'Put your medicine where you fit see am quick',ha:"Ajiye magungunan a wuri mai iya gani (amma nesa da yara)",yo:'Ṣọ egbogi sínú ibi tí a lè rí i (ṣùgbọ́n jìnnà sí ọwọ́ àwọn ọmọ)',ig:'Dobe ọgwụ n\'ebe a pụrụ ị hụ ya (mana n\'oshi ụmụaka)'})}
            </p></div>
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{lang({en:'Take doses at the same times each day',pidgin:'Dey take am the same time every day',ha:'Sha allurai a lokaci ɗaya a kowace rana',yo:'Mu oògùn ní àkókò kannákan lójoojúmọ́',ig:'Were ọgwụ n\'oge otu otu kwa ụbọchị'})}</p></div>
            <div className="flex items-start"><CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" /><p>{lang({en:'Never stop early, even if you feel better',pidgin:'No ever stop early, even if you don better',ha:'Kada ka daina da wuri, ko da kana jin daɗi',yo:'Máṣe dádúró ní ìjẹ̀jẹ̀, àní bí o bá fẹ́ dára',ig:'Ghara ikwụsị n\'oge oge, ọbụna ma ị mara mma'})}</p></div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
