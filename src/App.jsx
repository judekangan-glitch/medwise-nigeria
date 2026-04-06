import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Auth from './components/Auth'
import InstallPWA from './components/InstallPWA'
import AnimatedRoutes from './components/AnimatedRoutes'
import ToastContainer from './components/ToastContainer'
import { useMedwise } from './context/MedwiseContext'
import { Loader2 } from 'lucide-react'

function App() {
  const { user, theme, setTheme, loading } = useMedwise()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Wrap everything in Router early to avoid hook errors
  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-[#022c22] text-gray-100' : 'bg-gray-50/50 text-gray-900'}`}>
        {loading ? (
          <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="font-medium animate-pulse">Initializing MedWise...</p>
          </div>
        ) : !user ? (
          <Auth />
        ) : (
          <>
            <Navigation theme={theme} setTheme={setTheme} />
            <AnimatedRoutes />
            <InstallPWA />
          </>
        )}
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
