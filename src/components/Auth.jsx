
import { useState } from 'react'
import { User, LogOut, LogIn } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { ACHIEVEMENTS } from '../hooks/useGamification'

export default function Auth() {
  const { user, updateUser, achievements } = useMedwise()
  const [formData, setFormData] = useState({ username: '', email: '' })

  const handleLogin = (e) => {
    e.preventDefault()
    if (!formData.username.trim()) {
      alert('Please enter your username')
      return
    }

    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      joinedDate: new Date().toISOString(),
      points: 0,
      level: 1,
      achievements: [],
      streaks: 0,
      lastActivityDate: new Date().toISOString()
    }

    updateUser(newUser)
    setFormData({ username: '', email: '' })
    alert(`Welcome, ${newUser.username}! 🎉`)
  }

  const handleLogout = () => {
    if (confirm('Logout and reset all data?')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-primary to-blue-600">
        <div className="container mx-auto max-w-md">
          <div className="card">
            <div className="text-center mb-8">
              <User size={48} className="mx-auto text-primary mb-4" />
              <h1 className="font-display font-bold text-3xl text-gray-900">
                Welcome to MedWise
              </h1>
              <p className="text-gray-600 mt-2">
                Join thousands improving their medication safety
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Choose your username"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <LogIn size={20} className="inline mr-2" />
                Get Started
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              ✅ Your data stays on your device
              <br />
              🔒 No login required, complete privacy
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <User size={20} className="text-primary" />
          <div>
            <p className="font-semibold text-gray-900">{user.username}</p>
            <p className="text-xs text-gray-500">Level {user.level}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <p className="text-sm text-gray-600 mb-3">
            ⭐ {user.points} points
          </p>

          {/* Achievements Section */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 font-semibold mb-1">Achievements:</p>
            {achievements.length === 0 ? (
              <span className="text-xs text-gray-400">No achievements yet</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {achievements.map(a => {
                  // Find the achievement details from ACHIEVEMENTS
                  const details = Object.values(ACHIEVEMENTS).find(ach => ach.id === a.id)
                  return details ? (
                    <span key={a.id} title={details.description} className="flex items-center px-2 py-1 bg-blue-50 rounded text-xs">
                      <span className="mr-1">{details.name.split(' ')[0]}</span>
                      <span>{details.name.split(' ').slice(1).join(' ')}</span>
                    </span>
                  ) : null
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:bg-red-50 px-3 py-2 rounded w-full text-sm font-semibold transition flex items-center justify-center"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
