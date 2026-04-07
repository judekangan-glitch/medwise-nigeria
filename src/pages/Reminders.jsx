import { useState, useEffect } from 'react'
import { Bell, Plus, Trash2, Clock, Pill, AlertCircle, CheckCircle, Zap, Smartphone } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import PageWrapper from '../components/PageWrapper'
import { lang } from '../utils/translations'

// Mobile-compatible notification: prefers Service Worker (Android/PWA),
// falls back to new Notification() for desktop browsers.
const swNotify = async (title, options = {}) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready
      if (reg && reg.showNotification) {
        await reg.showNotification(title, options)
        return
      }
    } catch (e) {
      console.warn('SW notification failed, using fallback:', e)
    }
  }
  new Notification(title, options)
}

export default function Reminders() {
  const { medications, reminders, updateReminders } = useMedwise()
  const [medicationName, setMedicationName] = useState('')
  const [selectedMedicationId, setSelectedMedicationId] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState('default')
  const [lastCheck, setLastCheck] = useState(null)

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  // Check reminders every 30 seconds
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      
      setLastCheck(new Date().toLocaleTimeString())
      
      console.log('Checking reminders at:', currentTime)

      reminders.forEach(async (reminder) => {
        console.log('Reminder:', reminder.medication, 'at', reminder.time, 'enabled:', reminder.enabled)
        if (reminder.time === currentTime && reminder.enabled) {
          console.log('FIRING NOTIFICATION for:', reminder.medication)
          sendNotification(reminder)

          // SMS Reminder (if enabled for demo and not sent in this minute)
          if (reminder.smsEnabled && reminder.lastSmsSentAt !== currentTime) {
            console.log('FIRING SMS for:', reminder.medication)
            await sendSmsReminder(reminder, currentTime)
          }
        }
      })
    }

    // Check immediately
    checkReminders()

    // Then check every 30 seconds
    const interval = setInterval(checkReminders, 30000)

    return () => clearInterval(interval)
  }, [reminders])

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      
      if (permission === 'granted') {
        // Send test notification immediately
        await swNotify(
          lang({en:'MedWise - Success!',pidgin:'MedWise - As E Dey Hot!',ha:'MedWise - Anyi Nasara!',yo:'MedWise - Ọdún Dá!',ig:'MedWise - Eji Ya Tụọ Ntụpọ!'}), 
          {
            body: lang({en:'Notifications are now enabled! You will receive medication reminders.',pidgin:'Alarm don on! You go dey receive drug reminder.',ha:'An kunna tunatarwa! Za a rika tunatar da kai shan maganinka.',yo:'Aago ti ṣí sílẹ̀ gbayì! Wàá gba ìrántí ògùn.',ig:'Amụma emepela! Ị ga-enweta ozi mgbe ihe ncheta ruru.'}),
            icon: '/icon-192x192.png',
            requireInteraction: false
          }
        )
      }
    }
  }

  const sendTestNotification = async () => {
    if (notificationPermission === 'granted') {
      await swNotify(
        lang({en:'MedWise - Test Notification',pidgin:'MedWise - Test Alarm',ha:'MedWise - Gwajin Tunatarwa',yo:'MedWise - Aago Dídánwò',ig:'MedWise - Nnwale Ihe Ncheta'}), 
        {
          body: lang({en:'This is a test! Your notifications are working correctly. 🎉',pidgin:'Dis na test! Your alarm dey work very well. 🎉',ha:'Wannan gwaji ne! Kararrawar ka na aiki yadda ya kamata. 🎉',yo:'Eleyi jẹ́ àbáwò! Aago rẹ ń ṣiṣẹ́ fín-ní-fín-ní. 🎉',ig:'Nke a bụ nnwale! Ozi uge gị na-arụ ọrụ nke ọma. 🎉'}),
          icon: '/icon-192x192.png',
          requireInteraction: false
        }
      )
    } else {
      alert(lang({en:'Please enable notifications first!',pidgin:'Abeg allow alarm first!',ha:'Don Allah kunna tunatarwa tukuna!',yo:'Ẹ jọ̀ọ́, gba aago láàyè kọ́kọ́!',ig:'Biko nwuu amụma tupu nwa oge!'}) + '')
    }
  }

  const sendNotification = async (reminder) => {
    if (notificationPermission === 'granted') {
      console.log('Sending notification for:', reminder.medication)
      await swNotify(
        lang({en:'MedWise - Medication Reminder 💊',pidgin:'MedWise - Time for drug 💊',ha:'MedWise - Tunatarwan Magani 💊',yo:'MedWise - Aago Ògùn Rẹ 💊',ig:'MedWise - Ihe Ncheta Ọgwụ 💊'}), 
        {
          body: lang({en:`Time to take your ${reminder.medication}`,pidgin:`E don reach to take your ${reminder.medication}`,ha:`Lokaci ya yi na shan maganin ${reminder.medication}`,yo:`O ti to asiko lati lo oogun ${reminder.medication}`,ig:`Oge e rula inweta ọgwụ ${reminder.medication}`}),
          icon: '/icon-192x192.png',
          badge: '/icon-72x72.png',
          tag: reminder.id,
          requireInteraction: true,
          vibrate: [200, 100, 200]
        }
      )
    } else {
      console.log('Cannot send notification - permission:', notificationPermission)
    }
  }

  const sendSmsReminder = async (reminder, currentTime) => {
    try {
      console.log('Triggering SMS for:', reminder.medication)
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medication: reminder.medication,
          time: formatTime12Hour(reminder.time)
        })
      });
      
      const data = await response.json();
      if (data.success) {
        console.log('SMS Sent successfully:', data.sid);
        
        // Update reminder locally to reflect SMS was sent for this minute
        // This prevents double-sending if the 30s check runs twice in one minute
        const updatedReminders = reminders.map(r => 
          r.id === reminder.id ? { ...r, lastSmsSentAt: currentTime } : r
        );
        updateReminders(updatedReminders);
      } else {
        console.warn('SMS failed (possibly demo restriction):', data.error);
      }
    } catch (err) {
      console.error('Failed to trigger SMS service:', err);
    }
  }

  const addReminder = (e) => {
    e.preventDefault()

    const medName = selectedMedicationId 
      ? medications.find(m => m.id === parseInt(selectedMedicationId))?.name 
      : medicationName

    if (!medName || !reminderTime) {
      alert('Please fill in all fields')
      return
    }

    if (notificationPermission !== 'granted') {
      alert('Please enable notifications first!')
      return
    }

    const newReminder = {
      id: Date.now().toString(),
      medicationId: selectedMedicationId || null,
      medication: medName,
      time: reminderTime,
      enabled: true,
      smsEnabled: smsEnabled,
      lastSmsSentAt: null,
      createdAt: new Date().toISOString(),
      dosableMarkWhenNotified: true
    }

    updateReminders([...reminders, newReminder])
    setMedicationName('')
    setSelectedMedicationId('')
    setReminderTime('')
    setSmsEnabled(false)
    
    alert(`Reminder added! You will be notified at ${formatTime12Hour(reminderTime)}${smsEnabled ? ' with an additional SMS reminder' : ''}.`)
  }

  const deleteReminder = (id) => {
    if (confirm('Delete this reminder?')) {
      updateReminders(reminders.filter(r => r.id !== id))
    }
  }

  const toggleReminder = (id) => {
    updateReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ))
  }

  const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const getCurrentTime = () => {
    const now = new Date()
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  }

  return (
    <PageWrapper className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-gray-900">
            {lang({en:'Medication Reminders',pidgin:'Drug Alarm',ha:'Tunatarwan Magani',yo:'Àwọn Aago Ògùn',ig:'Ihe Ncheta Ọgwụ'})}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {lang({en:'Never miss a dose! Set up reminders for your medications and get browser notifications.',pidgin:'No miss your drug! Set alarm make your phone/computer remind you.',ha:'Kada ku taba karanci adadi! Kafa tunatarwa don maganganun ku kuma sami sanarwar mai bincike.',yo:'Bọ́ ògùn sí àkókò! Ṣe aago ìwé ògùn rẹ kí o sì gba ìránníyè lọ́wọ́ ẹ̀rọ-iṣẹ́ rẹ.',ig:'Enwetakwa ọnụma ọgwụ! Tọọ ihe nchetele kwesịrị oge gị niile ma natakwa amụma na mgbasa ozi nweta.'})}
          </p>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-100 border-2 border-gray-300 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-gray-900 mb-2">{lang({en:'System Status',pidgin:'System Status',ha:'Matsayin Tsarin',yo:'Ipò Ètò',ig:'Ọnọdụ Sistemụ'})}</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>{lang({en:'Current Time:',pidgin:'Time Now:',ha:'Lokacin Yanzu:',yo:'Àkókò Lọ́wọ́lọ́wọ́:',ig:'Oge Ugbu a:'})}</strong> {getCurrentTime()} ({new Date().toLocaleTimeString()})</p>
            <p><strong>{lang({en:'Permission:',pidgin:'Allowance:',ha:'Izini:',yo:'Ìyọ̀nda:',ig:'Ikike:'})}</strong> {notificationPermission}</p>
            <p><strong>{lang({en:'Last Check:',pidgin:'Last Check:',ha:'Bincike Na Qarshe:',yo:'Àyẹ̀wò Ìkẹyìn:',ig:'Nnyocha Azụ:'})}</strong> {lastCheck || lang({en:'Not checked yet',pidgin:'We never check',ha:'Ba a duba tukunna ba',yo:'Kò tíì ṣàyẹ̀wò',ig:'A nwabeghị okwu'})}</p>
            <p><strong>{lang({en:'Active Reminders:',pidgin:'Active Alarm:',ha:'Tunatarwa Masu Aiki:',yo:'Aago Tí Ń Ṣiṣẹ́:',ig:'Amụma Na-arụ Ọrụ:'})}</strong> {reminders.filter(r => r.enabled).length}</p>
          </div>
        </div>

        {/* Notification Permission */}
        {notificationPermission !== 'granted' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {lang({en:'Enable Notifications',pidgin:'Allow Alarm Complete',ha:'Bada Damar Tunatarwa',yo:'Gba Aago Laaye',ig:'Hazié Amụma'})}
                </h3>
                <p className="text-gray-700 mb-4">
                  {lang({en:'To receive medication reminders, you need to enable browser notifications.',pidgin:'To receive your drug reminder, abeg allow the notification.',ha:'Kafin ka sami sanarwar tunatarwa, kana buƙatar bada izini sanarwa daga na\'ura mai bincike.',yo:'Lati rí ìrántí oogun, o níláti fi ààyè gba ìránníyè amúlò.',ig:'Iji nweta amụma maka ọgwụ gị, ị ghaghị ịhazi nchọgharị.'})}
                </p>
                <button
                  onClick={requestNotificationPermission}
                  className="btn-primary"
                >
                  <Bell size={20} className="inline mr-2" />
                  {lang({en:'Enable Notifications',pidgin:'On Di Alarm',ha:'Kunna Tunatarwa',yo:'Ta Aago Laaye',ig:'Hazié Amụma'})}
                </button>
              </div>
            </div>
          </div>
        )}

        {notificationPermission === 'granted' && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-3" size={24} />
                <p className="text-green-800 font-semibold">
                  {lang({en:'Notifications enabled! You\'ll receive reminders at scheduled times.',pidgin:'Alarm dey work! You go hear am when time reach.',ha:'An kunna tunatarwa! Za ku ji shi a lokacin da aka tsara.',yo:'Aago ń dún bayii! O ma gbo ọ nigbati o ba tọ.',ig:'Amụma na arụ ọrụ! Ị ga anụ ya na oge atọrọ.'})}
                </p>
              </div>
              <button
                onClick={sendTestNotification}
                className="btn-primary ml-4"
              >
                <Zap size={18} className="inline mr-2" />
                {lang({en:'Test Now',pidgin:'Test Am Now',ha:'Gwada Yanzu',yo:'Idánwò Bayìí',ig:'Nwaa Ugbu a'})}
              </button>
            </div>
          </div>
        )}

        {/* Add Reminder Form */}
        <div className="card mb-8">
          <h2 className="font-bold text-2xl mb-6 text-gray-900 flex items-center">
            <Plus className="mr-3 text-primary" size={28} />
            {lang({en:'Add New Reminder',pidgin:'Put New Alarm',ha:'Saka Sabon Tunatarwa',yo:'Fi Aago Tuntun Sí',ig:'Tinye Ihe Ncheta Ọhụrụ'})}
          </h2>

          <form onSubmit={addReminder}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {medications.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {lang({en:'Select from Tracked Medications',pidgin:'Choose from drug wey you dey track',ha:'Zabi daga magunguna masu bibiya',yo:'Yan láti inú oogun tọpinpin',ig:'Họrọ na ọgwụ na-enyocha'})}
                  </label>
                  <select
                    value={selectedMedicationId}
                    onChange={(e) => {
                      setSelectedMedicationId(e.target.value)
                      if (e.target.value) {
                        const med = medications.find(m => m.id === parseInt(e.target.value))
                        if (med) setMedicationName(med.name)
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option value="">{lang({en:'-- Select medication --',pidgin:'-- Choose drug --',ha:'-- Zabi magani --',yo:'-- Yan oogun --',ig:'-- Họrọ ọgwụ --'})}</option>
                    {medications.map(med => (
                      <option key={med.id} value={med.id}>
                        {med.name} ({med.completed}/{med.total} {lang({en:'doses',pidgin:'doses',ha:'nisa',yo:'aleyi',ig:'ihe ndị ahụ'})})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {medications.length > 0 && selectedMedicationId 
                    ? lang({en:'Or enter custom name',pidgin:'Or type another name',ha:'Ko shigar da sunan ka',yo:'Abi kikọ orukọ',ig:'Ma tinye aha gị'}) 
                    : lang({en:'Medication Name',pidgin:'Drug Name',ha:'Sunan Magani',yo:'Orúkọ Oogun',ig:'Aha Ọgwụ'})}
                </label>
                <div className="relative">
                  <Pill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    placeholder="e.g., Amoxicillin 500mg"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {lang({en:'Reminder Time',pidgin:'Time for Alarm',ha:'Lokacin Tunatarwa',yo:'Akoko Aago',ig:'Oge Ihe Ncheta'})}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {lang({en:'Current time:',pidgin:'Time now:',ha:'Lokacin yanzu:',yo:'Akoko bayi:',ig:'Oge a:'})} {getCurrentTime()} ({formatTime12Hour(getCurrentTime())})
                </p>
              </div>

              {/* SMS Toggle */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <input
                  type="checkbox"
                  id="smsEnabled"
                  checked={smsEnabled}
                  onChange={(e) => setSmsEnabled(e.target.checked)}
                  className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor="smsEnabled" className="flex items-center text-sm font-semibold text-gray-700 cursor-pointer">
                  <Smartphone className="mr-2 text-primary" size={18} />
                  {lang({
                    en: 'Enable Twilio SMS Reminder (Demo Mode)',
                    pidgin: 'Receive drug alarm via SMS (Demo)',
                    ha: 'Kunna tunatarwa ta SMS (Yanayin Gwaji)',
                    yo: 'Gba ìránníyè oogun lórí SMS (Àpẹẹrẹ)',
                    ig: 'Nweta amụma maka ọgwụ site na SMS (Demo)'
                  })}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={notificationPermission !== 'granted'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} className="inline mr-2" />
              {lang({en:'Add Reminder',pidgin:'Put Alarm',ha:'Saka Tunatarwa',yo:'Fi Aago Sí',ig:'Tinye Ihe Ncheta'})}
            </button>

            {notificationPermission !== 'granted' && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {lang({en:'Enable notifications first to add reminders',pidgin:'On notification first before you put alarm',ha:'Fara kunna tunatarwa kafin ka saka sanarwa',yo:'Pa aago pọ lati fi ránníyè kún un',ig:'Dọwa amụma mbụ i ji tinye ihe ncheta'})}
              </p>
            )}
          </form>
        </div>

        {/* Reminders List */}
        <div className="card">
          <h2 className="font-bold text-2xl mb-6 text-gray-900 flex items-center">
            <Bell className="mr-3 text-primary" size={28} />
            {lang({en:`Your Reminders (${reminders.length})`,pidgin:`Your Alarms (${reminders.length})`,ha:`Tunatarwanku (${reminders.length})`,yo:`Awọn Aago Rẹ (${reminders.length})`,ig:`Amụma Gị (${reminders.length})`})}
          </h2>

          {reminders.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto mb-4 text-gray-300" size={64} />
              <p className="text-gray-500 text-lg mb-2">{lang({en:'No reminders yet',pidgin:'No alarm yet',ha:'Babu tunatarwa tukunna',yo:'Ko si aago kankan nisisiyi',ig:'Enweghị ụda amụma ugbu a'})}</p>
              <p className="text-gray-400">{lang({en:'Add your first medication reminder above',pidgin:'Put your first drug alarm up there',ha:'Saka sanarwar maganinka ta farko a sama',yo:'Fi aago ṣiṣe ránníyè nipa oogun tirẹ ti akọkọ si ibẹ',ig:'Tinye amụma mbụ maka ọgwụ gị site n\'elu'})}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    reminder.enabled
                      ? 'bg-white border-primary border-opacity-30'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          reminder.enabled ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                            reminder.enabled ? 'transform translate-x-7' : ''
                          }`}
                        />
                      </button>

                      {/* Medication Info */}
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${
                          reminder.enabled ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {reminder.medication}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock size={16} className="mr-1" />
                          {formatTime12Hour(reminder.time)} ({reminder.time})
                        </div>
                        {reminder.smsEnabled && (
                          <div className="flex items-center mt-1 text-xs text-primary font-medium">
                            <Smartphone size={14} className="mr-1" />
                            {lang({en:'SMS Enabled (Demo)', pidgin:'SMS Alarm On', ha:'SMS Tunatarwa', yo:'Aago SMS sí', ig:'Amụma SMS'})}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                      title="Delete reminder"
                    >
                      <Trash2 className="text-gray-400 group-hover:text-red-600" size={20} />
                    </button>
                  </div>

                  {!reminder.enabled && (
                    <p className="text-sm text-gray-500 mt-2 ml-16">
                      {lang({en:'This reminder is paused', pidgin:'Dis alarm don sleep', ha:'An dakatar da wannan tunatarwa', yo:'Aago yìí ti dúró na', ig:'Amụma a akwụsịla tupu oge'})}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4 text-gray-900">{lang({en:'How It Works',pidgin:'How E Dey Work',ha:'Yadda Yake Aiki',yo:'Báwo Ló Ṣe Ń Ṣiṣẹ́',ig:'Otu O Si Aru Oru'})}</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">1</div>
              <p>{lang({en:'Enable browser notifications by clicking the button above',pidgin:'Allow browser alarm/notification by clicking the button way dey up for dis page',ha:'Kunna sanarwar na\'urar bincike (Browser) ta hanyar danna maballin da ke sama',yo:'Gba aago wẹẹbu láàyè nípa kíkàn bọtini "Enable Notifications" tó wà lókè',ig:'Hapụ amụma weebụsaịtị gị site n\'ịpị bọtịnụ "Enable Notifications" nọ n\'elu'})}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">2</div>
              <p>{lang({en:'Add your medication and set the time you want to be reminded',pidgin:'Type your medicine name and target time way you wan make your phone ring',ha:'Saka sunan maganinka sannan ka saita lokacin da kake so a tunatar da kai',yo:'Fi orúkọ oogun rẹ sílẹ̀ ati asiko gangan tí o fẹ́ kí aago rẹ dún',ig:'Tinye aha ọgwụ gị na oge kpamkpam ị chọrọ ka ihe ncheta gị dọọ aka ná ntị'})}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">3</div>
              <p>{lang({en:'System checks every 30 seconds and sends notification at exact time',pidgin:'The system go dey check every 30 seconds and e go ring sharp-sharp for your exact time',ha:'Tsarinmu yana duba kowane dakikoki 30 kuma zai aiko maka da sanarwa a ainihin lokacin da ka saita',yo:'Ètò yóò máa yẹ̀wò lẹ́yìn ìṣẹ́jú kọ̀ọ̀kan láti rí i pé aago rẹ dún gẹ́lẹ́ lákòókò tó tọ́',ig:'Usoro a na-enyocha kwa sekọnd iri atọ ọ bụla iji hụ na amụma gị dọrọ aka ná ntị n\'oge kpamkpam'})}</p>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">4</div>
              <p>{lang({en:'Toggle reminders on/off or delete them anytime',pidgin:'You fit off di alarm or delete am anytime way you feel like',ha:'Kuna iya kunna ko kashe tunatarwa, ko kuma share su a duk lokacin da kuke so',yo:'O lè tan aago rẹ tàbí kí o pa á, tàbí kí o parẹ́ pátápátá lákòókò yówù kí ó jẹ́',ig:'Ị nwere ike ịgbanyụ ma ọ bụ gbuo ihe ncheta gị n\'oge ọbụla ị chọrọ'})}</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
          <h3 className="font-bold text-yellow-900 mb-2">{lang({en:'Important Notes',pidgin:'Very Important Messages',ha:'Sakonni Masu Muhimmanci',yo:'Àwọn Ohun Pàtàkì',ig:'Ihe Ndị Dị Mkpa'})}</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li className="font-bold text-orange-900">
              📱 <strong>{lang({en:'Mobile Ready:',pidgin:'Phone Ready:',ha:'Akwai a Waya:',yo:'Àyẹwò lórí fóònù:',ig:'Dị Nkwado n\'ekwute:'})}</strong> {lang({en:'Fully supports Android and Desktop. For iPhones, add this app to your Home Screen to get notifications.',pidgin:'E dey work well for Android and Laptop. For iPhone people, you gats "Add to Home Screen" first before you fit get notification.',ha:'Yana aiki da Android da Desktop gaba daya. Ga masu iPhone, sai kun saka wannan manhajar a babban shafin wayar ku (Add to Home Screen) kafin ku samu sanarwa.',yo:'Ó ń ṣiṣẹ́ fín-ní-fín-ní lórí Android àti kọ̀ǹpútà. Fún àwọn tó ń lo iPhone, ẹ gbọdọ̀ lo "Add to Home Screen" kọ́kọ́ láti gba ìtọ́nilétí aago.',ig:'O na-arụ ọrụ nke ọma na Android na kọmputa. Maka ndị na-eji iPhone, ị ghaghị ibu ụzọ gbakwunye ngwa a na ihuenyo ụlọ gị (Add to Home Screen) iji nweta amụma.'})}
            </li>
            <li>• {lang({en:'Keep this browser tab open (can be minimized)',pidgin:'Keep dis browser tab open (but you fit minimize am)',ha:'Ka bar wannan zauren a bude (zaka iya adana shi)',yo:'Jẹ́ kí ojú-ewé yìí wà ní ṣíṣí (o lè pa á gbàdí)',ig:'Dowe taabụ weebụsaịtị nkem a mepee(ịnwere ike ibelata ya)'})}</li>
            <li>• {lang({en:'Click "Test Now" button to verify notifications work',pidgin:'Click "Test Now" button to see whether di alarm dey work',ha:'Danna maballin "Gwajin Tunatarwa" domin ganin yana aiki',yo:'Tẹ bọtini "Dánwò" kí o rii daju wí pé aago ń ṣiṣẹ́',ig:'Pịa "Nnwale" inweta eziokwu na amụma na-arụ ọrụ nke ọma'})}</li>
            <li>• {lang({en:'Your reminders are saved locally on this device only',pidgin:'Your reminders only dey saved for dis normal phone/laptop',ha:'Ana adana tunatarwarku a kan wayarku ko kwamfutarku kadai',yo:'Àwọn aago rẹ ti was ní ìpamọ́ sí orí fóònù/kọ̀ǹpútà rẹ yìí nikan',ig:'Echekwaala ihe ncheta gị n\'ime ngwaọrụ gị a naanị'})}</li>
            <li>• {lang({en:'This is a helpful tool, but always follow your doctor\'s prescription',pidgin:'Dis tool make sense well-well, but make you always dey follow wetin doctor talk',ha:'Duk da wannan kayan aiki ne mai amfani, koyaushe ka bi umarnin likitanka',yo:'Ohun eèlò yìí rẹwà, ṣùgbọ́n rí i wí pé o kò kúrò ní ọ̀nà ìtọ́kasí oníṣěgùn',ig:'Nke a bụ ngwaọrụ dị mkpa ma gbaa mbọ sàé maka ndenye ọgwụ dọkịta oge ọbụla'})}</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  )
}

