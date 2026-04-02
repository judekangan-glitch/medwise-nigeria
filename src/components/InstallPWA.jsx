import { useState, useEffect } from 'react'
import { Download, X, Smartphone } from 'lucide-react'

export default function InstallPWA() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if app is already installed (running in standalone mode)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone
      || document.referrer.includes('android-app://');
    
    setIsStandalone(isInStandaloneMode)

    // Listen for install prompt availability
    const handleInstallAvailable = () => {
      if (!isInStandaloneMode) {
        setShowInstallPrompt(true)
      }
    }

    // Check if it already fired before this component mounted
    if (window.deferredPrompt && !isInStandaloneMode) {
      setShowInstallPrompt(true)
    }

    // [DEV ONLY] Force the UI to show up locally so we can confirm the component works
    if (import.meta.env.DEV && !isInStandaloneMode) {
      setShowInstallPrompt(true)
    }

    window.addEventListener('pwa-install-available', handleInstallAvailable)

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallAvailable)
    }
  }, [])

  const handleInstallClick = async () => {
    if (window.showInstallPrompt) {
      const accepted = await window.showInstallPrompt()
      if (accepted) {
        setShowInstallPrompt(false)
      }
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Remember dismissal for abbreviated time (1 day) instead of 7 during development
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  // Don't render anything if already installed
  if (isStandalone) {
    return null
  }

  // Don't render if prompt not available or was dismissed
  if (!showInstallPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary p-6">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <div className="flex items-start space-x-4">
          <div className="bg-primary bg-opacity-10 p-3 rounded-xl">
            <Smartphone className="text-primary" size={32} />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Install MedWise App
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Install our app for a better experience! Get offline access, faster loading, and home screen access.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={handleInstallClick}
                className="btn-primary flex-1"
              >
                <Download size={18} className="inline mr-2" />
                Install Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
              >
                Later
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            ✨ Benefits: Offline access • Push notifications • Faster loading • App-like experience
          </p>
        </div>
      </div>
    </div>
  )
}

