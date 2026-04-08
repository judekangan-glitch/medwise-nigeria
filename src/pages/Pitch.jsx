import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Cross, CheckCircle, AlertTriangle, Activity, Users, Database, Smartphone, Trophy, Zap, Code, Globe, ArrowRight, ArrowLeft, Play, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMedwise } from '../context/MedwiseContext'

export default function Pitch() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { theme } = useMedwise()
  const totalSlides = 5

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0))

  // Global Animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeInOut" }
    })
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const childVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  // SLIDE 1: Title Slide
  const Slide1 = () => (
    <div className="flex flex-col items-center justify-center h-full relative">
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 opacity-20"
      >
        <Shield size={120} className="text-primary" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 opacity-20"
      >
        <CheckCircle size={100} className="text-primary-light" />
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center z-10 glass-panel p-16 rounded-3xl border border-white/10 backdrop-blur-xl">
        <motion.h1 variants={childVariant} className="text-7xl md:text-8xl font-display font-bold text-white mb-4 tracking-tight drop-shadow-lg">
          Med<span className="text-primary-light">Wise</span> Nigeria
        </motion.h1>
        <motion.p variants={childVariant} className="text-2xl md:text-3xl text-gray-300 mb-8 font-light italic">
          Your simple guide to safe medicine in Nigeria
        </motion.p>
        <motion.div variants={childVariant} className="mt-8 pt-8 border-t border-white/20">
          <p className="text-xl text-primary-light font-semibold">Presented by</p>
          <p className="text-3xl text-white font-bold tracking-wide mt-2">Jude Kangan Dangwam</p>
        </motion.div>
      </motion.div>
    </div>
  )

  // SLIDE 2: Problem + Impact
  const Slide2 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-5xl">
        <motion.div variants={childVariant} className="text-center mb-12 relative">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -z-10"
          />
          <AlertTriangle size={60} className="mx-auto text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          <h2 className="text-5xl font-bold text-white mb-2">A Silent Crisis in Nigeria’s</h2>
          <h2 className="text-5xl font-bold text-red-500">Healthcare System</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div variants={childVariant} className="glass-panel p-8 rounded-2xl border border-red-500/30 bg-red-900/10 backdrop-blur-lg">
            <h3 className="text-6xl font-bold text-red-400 mb-2">70%</h3>
            <p className="text-xl text-gray-300 font-medium leading-relaxed">of antibiotics are misused</p>
          </motion.div>
          <motion.div variants={childVariant} className="glass-panel p-8 rounded-2xl border border-red-500/30 bg-red-900/10 backdrop-blur-lg">
            <h3 className="text-6xl font-bold text-red-400 mb-2">30–40%</h3>
            <p className="text-xl text-gray-300 font-medium leading-relaxed">of medications are fake or substandard</p>
          </motion.div>
        </div>

        <motion.div variants={childVariant} className="glass-panel p-8 rounded-2xl border border-white/10 bg-white/5">
           <h4 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Why it matters:</h4>
           <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 bg-red-500 rounded-full" />
                 <p className="text-lg text-gray-300">Lives are at risk</p>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 bg-orange-500 rounded-full" />
                 <p className="text-lg text-gray-300">Drug resistance is rising</p>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="w-2 h-2 bg-blue-500 rounded-full" />
                 <p className="text-lg text-gray-300">People are losing trust in healthcare</p>
              </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  )

  // SLIDE 3: Solution
  const Slide3 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl text-center">
        <motion.h2 variants={childVariant} className="text-6xl font-bold text-white mb-4">MedWise Nigeria</motion.h2>
        <motion.h2 variants={childVariant} className="text-4xl font-bold text-primary-light mb-16 italic">All in One Platform</motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Verify", desc: "Check if your medicine is real (No internet needed)", color: "text-primary" },
            { icon: Activity, title: "Track", desc: "Never miss a dose with simple phone reminders", color: "text-blue-400" },
            { icon: Globe, title: "Educate", desc: "Learn how to stay safe and healthy", color: "text-purple-400" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={childVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-panel p-10 rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 flex flex-col items-center"
            >
              <div className={`w-20 h-20 mb-8 bg-white/5 rounded-full flex items-center justify-center shadow-lg`}>
                <item.icon size={40} className={item.color} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">{item.title} →</h3>
              <p className="text-xl text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 4: Features + Innovation + Accessibility
  const Slide4 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl">
        <motion.h2 variants={childVariant} className="text-5xl font-bold text-white mb-12 text-center">Core Features & Innovation</motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
                {[
                    { icon: Database, title: "Database of 10,000+ registered drugs", color: "text-primary" },
                    { icon: Bell, title: "Medicine reminders sent straight to your phone", color: "text-blue-400" },
                    { icon: Globe, title: "Simple lessons on medicine safety", color: "text-purple-400" }
                ].map((f, i) => (
                    <motion.div key={i} variants={childVariant} className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/5 flex items-center">
                        <f.icon size={32} className={`${f.color} mr-4`} />
                        <p className="text-xl text-gray-200">{f.title}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div variants={childVariant} className="glass-panel p-8 rounded-3xl border border-primary/30 bg-primary/5 flex flex-col justify-center text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Built for Nigeria:</h3>
                <p className="text-xl text-primary-light font-medium mb-6">Inclusive and Accessible</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {["English", "Pidgin", "Hausa", "Igbo", "Yoruba"].map((l, i) => (
                        <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-white font-medium border border-white/10">
                            {l}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 5: Technical + Impact (Final Slide)
  const Slide5 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full py-4 text-center">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl">
        <motion.h2 variants={childVariant} className="text-4xl font-bold text-white mb-8 flex items-center justify-center">
            <Code className="mr-3 text-primary" /> Technical Architecture (Built for Scale)
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left mb-12">
          {[
            { tag: "1", title: "React + Vite", desc: "Built to make the app feel very quick and smooth for every user.", color: "text-blue-400" },
            { tag: "2", title: "Tailwind CSS", desc: "Modern design system to make health info easy to see and read.", color: "text-yellow-400" },
            { tag: "3", title: "Supabase Cloud", desc: "Securely saves records so your medical data is never lost.", color: "text-green-400" },
            { tag: "4", title: "Twilio SMS", desc: "Automatic message notes to help patients take their medicine.", color: "text-red-400" },
            { tag: "5", title: "Vercel Hosting", desc: "Makes the app work fast for everyone, even in remote areas.", color: "text-cyan-400" },
            { tag: "🏆 6", title: "PWA (Offline)", desc: "The app works fully even without internet data.", color: "text-primary" }
          ].map((pillar, i) => (
            <motion.div key={i} variants={childVariant} className={`glass-panel p-6 rounded-2xl border border-white/10 bg-white/5`}>
              <h4 className={`font-bold ${pillar.color} mb-2 text-lg`}>{pillar.tag}. {pillar.title}</h4>
              <p className="text-sm text-gray-300 leading-relaxed italic">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={childVariant} className="glass-panel p-8 rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur-xl">
          <h2 className="text-3xl md:text-4xl font-light italic text-white leading-tight">
            “This is not just an app—it’s a movement for safer healthcare in Nigeria.”
          </h2>
        </motion.div>

        <motion.div variants={childVariant} className="mt-8">
           <Link to="/" className="inline-flex items-center space-x-3 px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105">
             <Play size={20} />
             <span>Launch Application</span>
           </Link>
        </motion.div>
      </motion.div>
    </div>
  )

  const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />]

  return (
    // We override global theme background here to enforce the Deep Forest theme for the presentation exclusively
    <div className="fixed inset-0 z-[100] bg-[#091C10] text-[#e5e7eb] overflow-hidden font-sans presentation-mode">
      {/* Abstract dark ambient elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Slide Container */}
      <div className="relative w-full h-full flex flex-col pt-16 pb-24 px-8">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex-1 w-full h-full flex items-center justify-center"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress & Controls */}
      <div className="absolute bottom-8 left-0 right-0 px-12 flex items-center justify-between z-50">
        <div className="flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white flex items-center space-x-2"
          >
            {currentSlide === totalSlides - 1 ? <CheckCircle size={24} className="text-primary" /> : <ArrowRight size={24} />}
          </button>
        </div>
      </div>
    </div>
  )
}
