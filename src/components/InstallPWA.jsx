import { useState, useEffect } from 'react'
import { Download, X, Smartphone } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'

export default function InstallPWA() {
  const { lang } = useMedwise()
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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up print:hidden">
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
              {lang({en:'Install MedWise App', pidgin:'Install MedWise App', ha:'Saka Manhajar MedWise', yo:'Fi MedWise App Sílẹ̀', ig:'Gbakwunye Ngwa MedWise'})}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {lang({en:'Install our app for a better experience! Get offline access, faster loading, and home screen access.', pidgin:'Install di app for beta experience! E go fast well well and e go work even if you no get data.', ha:'Saka manhajarmu don kyakkyawar gogewa! Samun damar amfani ba tare da yanar gizo ba, saurin lodi, da damar shiga babban shafi.', yo:'Fi ògùn yìí sílẹ̀ fún ìrírí tó dára ju bẹ́ẹ̀ lọ! Ó máa ń yá, ó sì tún máa ń ṣiṣẹ́ láìsí nẹ́tíwọ̀ọ̀kì.', ig:'Gbakwunye ngwa anyị maka ọdịnihu ka mma! Nweta nzikọrịta ozi ngwa ngwa ma rụọ ọrụ n\'ịntanetị pụọ.'})}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={handleInstallClick}
                className="btn-primary flex-1"
              >
                <Download size={18} className="inline mr-2" />
                {lang({en:'Install Now', pidgin:'Install Now', ha:'Saka Yanzu', yo:'Fi Sílẹ̀ Báyìí', ig:'Tinye Ugbu a'})}
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
              >
                {lang({en:'Later', pidgin:'Later', ha:'Anjima', yo:'Nígbà mìíràn', ig:'Ma emechaa'})}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {lang({en:'✨ Benefits: Offline access • Push notifications • Faster loading', pidgin:'✨ Benefits: Work without data • Sharp sharp alarm • Very fast', ha:'✨ Amfani: Amfani ba yanar gizo • Sanarwa ta gaggawa • Saurin lodi', yo:'✨ Àǹfààní: Ìlò láìsí nẹ́tíwọ̀ọ̀kì • Aago ìránnilétí • Ó máa ń yá láti ṣí', ig:'✨ Abamuru: Ọ na-arụ ọrụ n\'ịntanetị pụọ • Amụma ngwa ngwa • Ọ na-agba ọsọ'})}
          </p>
        </div>
      </div>
    </div>
  )
}

