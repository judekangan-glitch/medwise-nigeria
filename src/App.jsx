import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Auth from './components/Auth'
import InstallPWA from './components/InstallPWA'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Verify from './pages/Verify'
import Track from './pages/Track'
import Reminders from './pages/Reminders'
import SymptomChecker from './pages/SymptomChecker'
import EducationModule from './pages/EducationModule'
import { getTheme } from './utils/localStorage'

function App() {
  const [theme, setTheme] = useState(getTheme())
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('medwise-user')
    setUser(savedUser ? JSON.parse(savedUser) : null)

    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  if (!user) {
    return <Auth />
  }

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/symptom-checker" element={<SymptomChecker />} />
          <Route path="/learn/module/:moduleId" element={<EducationModule />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/track" element={<Track />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
        <InstallPWA />
      </div>
    </Router>
  )
}

export default App

