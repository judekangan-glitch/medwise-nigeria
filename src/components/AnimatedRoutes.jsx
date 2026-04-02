import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Lazy load all pages for Performance Optimization
const Home = lazy(() => import('../pages/Home'))
const Learn = lazy(() => import('../pages/Learn'))
const Verify = lazy(() => import('../pages/Verify'))
const Track = lazy(() => import('../pages/Track'))
const Reminders = lazy(() => import('../pages/Reminders'))
const SymptomChecker = lazy(() => import('../pages/SymptomChecker'))
const EducationModule = lazy(() => import('../pages/EducationModule'))
const Pitch = lazy(() => import('../pages/Pitch'))

const PageLoader = () => (
  <div className="min-h-[60vh] w-full flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    <p className="mt-4 text-primary font-semibold">Loading MedWise...</p>
  </div>
)

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/symptom-checker" element={<SymptomChecker />} />
          <Route path="/learn/module/:moduleId" element={<EducationModule />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/track" element={<Track />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/pitch" element={<Pitch />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}
