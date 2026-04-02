import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Auth from './components/Auth'
import InstallPWA from './components/InstallPWA'
import AnimatedRoutes from './components/AnimatedRoutes'
import { useMedwise } from './context/MedwiseContext'

function App() {
  const { user, theme, setTheme } = useMedwise()

  useEffect(() => {
    // Apply theme globally
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Show Auth/Login screen if no user is initialized
  if (!user) {
    return <Auth />
  }

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-deep-green text-gray-100' : 'bg-gray-50/50 text-gray-900'}`}>
        <Navigation theme={theme} setTheme={setTheme} />
        <AnimatedRoutes />
        <InstallPWA />
      </div>
    </Router>
  )
}

export default App
