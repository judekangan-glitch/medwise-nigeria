import { useState, useEffect } from 'react'
import { Bell, Plus, Trash2, Clock, Pill, AlertCircle, CheckCircle, Zap } from 'lucide-react'
import { getMedications } from '../utils/localStorage'

export default function Reminders() {
  const [reminders, setReminders] = useState([])
  const [medications, setMedications] = useState([])
  const [medicationName, setMedicationName] = useState('')
  const [selectedMedicationId, setSelectedMedicationId] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [notificationPermission, setNotificationPermission] = useState('default')
  const [lastCheck, setLastCheck] = useState(null)

  // Load reminders and medications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('medwise-reminders')
    if (saved) {
      setReminders(JSON.parse(saved))
    }

    const savedMeds = getMedications()
    setMedications(savedMeds)

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('medwise-reminders', JSON.stringify(reminders))
  }, [reminders])

  // Check reminders every 30 seconds
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      
      setLastCheck(new Date().toLocaleTimeString())
      
      console.log('Checking reminders at:', currentTime)

      reminders.forEach(reminder => {
        console.log('Reminder:', reminder.medication, 'at', reminder.time, 'enabled:', reminder.enabled)
        if (reminder.time === currentTime && reminder.enabled) {
          console.log('FIRING NOTIFICATION for:', reminder.medication)
          sendNotification(reminder)
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
        new Notification('MedWise - Success!', {
          body: 'Notifications are now enabled! You will receive medication reminders.',
          icon: '/icon-192x192.png',
          requireInteraction: false
        })
      }
    }
  }

  const sendTestNotification = () => {
    if (notificationPermission === 'granted') {
      new Notification('MedWise - Test Notification', {
        body: 'This is a test! Your notifications are working correctly. 🎉',
        icon: '/icon-192x192.png',
        requireInteraction: false
      })
    } else {
      alert('Please enable notifications first!')
    }
  }

  const sendNotification = (reminder) => {
    if (notificationPermission === 'granted') {
      console.log('Sending notification for:', reminder.medication)
      new Notification('MedWise - Medication Reminder 💊', {
        body: `Time to take your ${reminder.medication}`,
        icon: '/icon-192x192.png',
        badge: '/icon-72x72.png',
        tag: reminder.id,
        requireInteraction: true,
        vibrate: [200, 100, 200]
      })
    } else {
      console.log('Cannot send notification - permission:', notificationPermission)
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
      createdAt: new Date().toISOString(),
      dosableMarkWhenNotified: true
    }

    setReminders([...reminders, newReminder])
    setMedicationName('')
    setSelectedMedicationId('')
    setReminderTime('')
    
    alert(`Reminder added! You will be notified at ${formatTime12Hour(reminderTime)}`)
  }

  const deleteReminder = (id) => {
    if (confirm('Delete this reminder?')) {
      setReminders(reminders.filter(r => r.id !== id))
    }
  }

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
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
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-gray-900">
            Medication Reminders
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Never miss a dose! Set up reminders for your medications and get browser notifications.
          </p>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-100 border-2 border-gray-300 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-gray-900 mb-2">System Status</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Current Time:</strong> {getCurrentTime()} ({new Date().toLocaleTimeString()})</p>
            <p><strong>Permission:</strong> {notificationPermission}</p>
            <p><strong>Last Check:</strong> {lastCheck || 'Not checked yet'}</p>
            <p><strong>Active Reminders:</strong> {reminders.filter(r => r.enabled).length}</p>
          </div>
        </div>

        {/* Notification Permission */}
        {notificationPermission !== 'granted' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Enable Notifications
                </h3>
                <p className="text-gray-700 mb-4">
                  To receive medication reminders, you need to enable browser notifications.
                </p>
                <button
                  onClick={requestNotificationPermission}
                  className="btn-primary"
                >
                  <Bell size={20} className="inline mr-2" />
                  Enable Notifications
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
                  Notifications enabled! You'll receive reminders at scheduled times.
                </p>
              </div>
              <button
                onClick={sendTestNotification}
                className="btn-primary ml-4"
              >
                <Zap size={18} className="inline mr-2" />
                Test Now
              </button>
            </div>
          </div>
        )}

        {/* Add Reminder Form */}
        <div className="card mb-8">
          <h2 className="font-bold text-2xl mb-6 text-gray-900 flex items-center">
            <Plus className="mr-3 text-primary" size={28} />
            Add New Reminder
          </h2>

          <form onSubmit={addReminder}>
            {medications.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800 font-semibold">
                  💾 Link to a tracked medication (optional)
                </p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {medications.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Select from Tracked Medications
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
                    <option value="">-- Select medication --</option>
                    {medications.map(med => (
                      <option key={med.id} value={med.id}>
                        {med.name} ({med.completed}/{med.total} doses)
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {medications.length > 0 && selectedMedicationId ? 'Or enter custom name' : 'Medication Name'}
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
                  Reminder Time
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
                  Current time: {getCurrentTime()} ({formatTime12Hour(getCurrentTime())})
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={notificationPermission !== 'granted'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} className="inline mr-2" />
              Add Reminder
            </button>

            {notificationPermission !== 'granted' && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Enable notifications first to add reminders
              </p>
            )}
          </form>
        </div>

        {/* Reminders List */}
        <div className="card">
          <h2 className="font-bold text-2xl mb-6 text-gray-900 flex items-center">
            <Bell className="mr-3 text-primary" size={28} />
            Your Reminders ({reminders.length})
          </h2>

          {reminders.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto mb-4 text-gray-300" size={64} />
              <p className="text-gray-500 text-lg mb-2">No reminders yet</p>
              <p className="text-gray-400">Add your first medication reminder above</p>
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
                      This reminder is paused
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-4 text-gray-900">How It Works</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                1
              </div>
              <p>Enable browser notifications by clicking the button above</p>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                2
              </div>
              <p>Add your medication and set the time you want to be reminded</p>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                3
              </div>
              <p>System checks every 30 seconds and sends notification at exact time</p>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                4
              </div>
              <p>Toggle reminders on/off or delete them anytime</p>
            </div>
          </div>
        </div>

        {/* Important Notes with Desktop Recommendation */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
          <h3 className="font-bold text-yellow-900 mb-2">Important Notes</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li className="font-bold text-orange-900">
              💻 <strong>Works Best on Desktop:</strong> This feature is most reliable on desktop browsers (Chrome, Edge, Firefox on Windows/Mac). Mobile notifications may have limited support due to platform restrictions.
            </li>
            <li>• Keep this browser tab open (can be minimized)</li>
            <li>• Click "Test Now" button to verify notifications work</li>
            <li>• System checks every 30 seconds for reminders</li>
            <li>• Your reminders are saved locally on this device only</li>
            <li>• This is a helpful tool, but always follow your doctor's prescription</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

