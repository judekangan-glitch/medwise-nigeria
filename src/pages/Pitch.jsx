import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Cross, CheckCircle, AlertTriangle, Activity, Users, Database, Smartphone, Trophy, Zap, Code, Globe, ArrowRight, ArrowLeft, Play, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMedwise } from '../context/MedwiseContext'

export default function Pitch() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { theme } = useMedwise()
  const totalSlides = 10

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
          "Your Complete Medication Safety Companion"
        </motion.p>
        <motion.div variants={childVariant} className="mt-8 pt-8 border-t border-white/20">
          <p className="text-xl text-primary-light font-semibold">Presented by</p>
          <p className="text-3xl text-white font-bold tracking-wide mt-2">Jude Kangan Dangwam</p>
        </motion.div>
      </motion.div>
    </div>
  )

  // SLIDE 2: The Problem
  const Slide2 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-5xl">
        <motion.div variants={childVariant} className="text-center mb-16 relative">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -z-10"
          />
          <AlertTriangle size={80} className="mx-auto text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">A Silent Crisis in Nigeria's</h2>
          <h2 className="text-5xl md:text-6xl font-bold text-red-500">Healthcare System</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={childVariant} className="glass-panel p-10 rounded-2xl border border-red-500/30 bg-red-900/10 backdrop-blur-lg">
            <h3 className="text-7xl font-bold text-red-400 mb-4">&gt;70%</h3>
            <p className="text-2xl text-gray-300 font-medium leading-relaxed">of antibiotics in Nigeria are misused or obtained without proper prescription.</p>
          </motion.div>
          <motion.div variants={childVariant} className="glass-panel p-10 rounded-2xl border border-red-500/30 bg-red-900/10 backdrop-blur-lg">
            <h3 className="text-7xl font-bold text-red-400 mb-4">30-40%</h3>
            <p className="text-2xl text-gray-300 font-medium leading-relaxed">of all medications in circulation are counterfeit or substandard.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 3: Why It Matters
  const Slide3 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-4xl text-left">
        <motion.h2 variants={childVariant} className="text-5xl md:text-6xl font-bold text-white mb-16 border-b border-primary/30 pb-6 inline-block">
          Why It Matters
        </motion.h2>

        <div className="space-y-10">
          <motion.div variants={childVariant} className="flex items-center space-x-8 group">
            <div className="p-4 bg-red-500/10 rounded-2xl group-hover:bg-red-500/30 transition-colors">
              <Activity size={48} className="text-red-400" />
            </div>
            <p className="text-4xl text-gray-200 font-light">Lives are actively at risk every single day.</p>
          </motion.div>
          
          <motion.div variants={childVariant} className="flex items-center space-x-8 group">
            <div className="p-4 bg-orange-500/10 rounded-2xl group-hover:bg-orange-500/30 transition-colors">
              <Shield size={48} className="text-orange-400" />
            </div>
            <p className="text-4xl text-gray-200 font-light">Deadly drug resistance (AMR) is rising rapidly.</p>
          </motion.div>

          <motion.div variants={childVariant} className="flex items-center space-x-8 group">
            <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/30 transition-colors">
              <Users size={48} className="text-blue-400" />
            </div>
            <p className="text-4xl text-gray-200 font-light">Trust in the healthcare system is deeply eroding.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 4: The Solution
  const Slide4 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl text-center">
        <motion.h2 variants={childVariant} className="text-5xl font-bold text-white mb-4">From Education to Verification</motion.h2>
        <motion.h2 variants={childVariant} className="text-5xl font-bold text-primary-light mb-16">All in One Platform</motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Verify", desc: "Instant offline NAFDAC drug authentication." },
            { icon: Activity, title: "Track", desc: "Gamified medication adherence and dosage tracking." },
            { icon: Globe, title: "Educate", desc: "Interactive symptom checks and resistance training." }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={childVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-panel p-10 rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 flex flex-col items-center"
            >
              <div className="w-24 h-24 mb-8 bg-primary/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <item.icon size={48} className="text-primary-light" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-xl text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 5: Core Features
  const Slide5 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl">
        <motion.h2 variants={childVariant} className="text-5xl font-bold text-white mb-12 text-center">Core Features & System Power</motion.h2>
        
        <div className="space-y-6">
          <motion.div variants={childVariant} className="group glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all bg-white/5 flex items-center shadow-lg">
            <Database size={40} className="text-primary mr-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Massive Verification Engine</h3>
              <p className="text-xl text-gray-400">Integrated with a rigorous <span className="text-primary-light font-bold">10,076+</span> NAFDAC-registered drugs database.</p>
            </div>
          </motion.div>

          <motion.div variants={childVariant} className="group glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all bg-white/5 flex items-center shadow-lg">
            <Activity size={40} className="text-blue-400 mr-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Adherence Tracking & Reminders</h3>
              <p className="text-xl text-gray-400">Push notifications and <span className="text-primary-light font-bold">Twilio SMS alerts</span> for exact dosage scheduling natively in-browser.</p>
            </div>
          </motion.div>

          <motion.div variants={childVariant} className="group glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all bg-white/5 flex items-center shadow-lg">
            <Globe size={40} className="text-purple-400 mr-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Interactive Learning Modules</h3>
              <p className="text-xl text-gray-400">Built-in AMR courses and an algorithmic Symptom Checker routing engine.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 5.5: Language Support
  const SlideLanguage = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl text-center">
        <motion.h2 variants={childVariant} className="text-5xl font-bold text-white mb-6">Bridging the Language Barrier</motion.h2>
        <motion.p variants={childVariant} className="text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
          Built natively from the ground up to support Nigeria's diverse linguistic landscape, ensuring healthcare literacy for everyone.
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { tag: "EN", name: "English", desc: "Standard medical terminology", color: "text-blue-400", border: "border-blue-500/30" },
            { tag: "NG", name: "Pidgin", desc: "Urban Nigerian street reliability", color: "text-green-400", border: "border-green-500/30" },
            { tag: "HA", name: "Hausa", desc: "Northern healthcare access", color: "text-yellow-400", border: "border-yellow-500/30" },
            { tag: "YO", name: "Yoruba", desc: "South-West community reach", color: "text-orange-400", border: "border-orange-500/30" },
            { tag: "IG", name: "Igbo", desc: "South-East indigenous access", color: "text-red-400", border: "border-red-500/30" }
          ].map((lang, i) => (
            <motion.div key={i} variants={childVariant} whileHover={{ y: -10 }} className={`glass-panel p-8 rounded-2xl border ${lang.border} bg-white/5 flex flex-col items-center`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 bg-white/5 ${lang.color}`}>
                {lang.tag}
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${lang.color}`}>{lang.name}</h3>
              <p className="text-sm text-gray-400 text-center">{lang.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 7: National Scale Connectivity (Merged Cloud Ecosystem)
  const SlideCloud = () => (
    <div className="flex flex-col items-center justify-center h-full w-full text-center">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl">
        <motion.div variants={childVariant} className="mb-4 inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
          NATIONAL SCALE CONNECTIVITY ☁️
        </motion.div>
        <motion.h2 variants={childVariant} className="text-5xl font-bold text-white mb-6">Built for Reliability & Speed</motion.h2>
        <motion.p variants={childVariant} className="text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
          We've engineered a world-class cloud backbone to unite every patient and healthcare record across Nigeria.
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: Database, title: "Supabase Cloud", desc: "Enterprise-grade real-time data sync ensuring medical records are never lost." },
            { icon: Smartphone, title: "Twilio SMS Engine", desc: "A robust national messaging stack for medical alerts and secure OTP verification." },
            { icon: Globe, title: "Cloud Backup", desc: "Automatic background synchronization whenever the patient is back online." }
          ].map((item, i) => (
            <motion.div key={i} variants={childVariant} whileHover={{ y: -10 }} className="glass-panel p-10 rounded-3xl border border-blue-500/20 bg-blue-900/5 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-6 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <item.icon size={40} className="text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-lg text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 8: AI Orchestration & Development Workflow
  const SlideOrchestration = () => (
    <div className="flex flex-col items-center justify-center h-full w-full py-2 text-center">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-5xl">
        <motion.div variants={childVariant} className="mb-6 inline-block px-4 py-1 rounded-full bg-primary/20 text-primary-light font-bold border border-primary/30 tracking-widest uppercase text-xs">
          MY PROCESS 🛠️
        </motion.div>
        <motion.h2 variants={childVariant} className="text-6xl font-bold text-white mb-4">Fast & Reliable Building</motion.h2>
        <motion.p variants={childVariant} className="text-2xl text-primary-light font-medium mb-12 italic">"Using the Best AI Tools to Build a Safer Nigeria"</motion.p>
        
        <motion.div variants={childVariant} className="glass-panel p-12 rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(34,197,94,0.1)]">
          <div className="flex items-center justify-center mb-8">
            <Zap size={48} className="text-primary-light mr-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
            <h3 className="text-3xl font-bold text-white uppercase tracking-wider">How I Built This</h3>
          </div>
          <p className="text-2xl text-gray-200 leading-relaxed font-light max-w-4xl mx-auto">
            I built MedWise Nigeria by using the world's most advanced AI tools. By combining <span className="text-white font-bold underline decoration-primary">Antigravity</span>, <span className="text-white font-bold underline decoration-blue-500">GitHub Copilot</span>, <span className="text-white font-bold underline decoration-yellow-500">ChatGPT</span>, and <span className="text-white font-bold underline decoration-purple-500">Claude AI</span>, I was able to quickly create a safe and powerful system that works for our entire nation.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )

  // SLIDE 9: 7 Architecture Pillars (The Deep Stack)
  const SlidePillars = () => (
    <div className="flex flex-col items-center justify-center h-full w-full py-4 text-center">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-6xl">
        <motion.h2 variants={childVariant} className="text-5xl font-bold text-white mb-2">The 7-Pillar Architecture</motion.h2>
        <motion.p variants={childVariant} className="text-lg text-primary-light font-medium mb-8 uppercase tracking-[0.2em]">Building for Every Nigerian</motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {[
            { icon: Code, title: "1. Fast Core", desc: "Built with React and Vite to make the app feel fast and smooth on any device.", color: "text-blue-400" },
            { icon: Activity, title: "2. Visual Style", desc: "Used Tailwind CSS and Framer Motion for fun animations that keep users engaged.", color: "text-yellow-400" },
            { icon: Database, title: "3. Safe Storage", desc: "Secure Supabase Cloud storage that keeps all medical records backed up and always ready.", color: "text-green-400" },
            { icon: Smartphone, title: "4. Phone Alerts", desc: "Sends automatic Twilio SMS reminders so patients never miss their daily medicine.", color: "text-red-400" },
            { icon: Globe, title: "5. Smart Hosting", desc: "Hosted on Vercel to ensure the app loads quickly anywhere in Nigeria.", color: "text-cyan-400" },
            { icon: Users, title: "6. Language Support", desc: "Built with Custom Localization in English, Hausa, Yoruba, Igbo, and Pidgin.", color: "text-purple-400" }
          ].map((pillar, i) => (
            <motion.div key={i} variants={childVariant} className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              <pillar.icon size={28} className={`${pillar.color} mb-3`} />
              <h4 className="font-bold text-white mb-2 text-lg"> {pillar.title}</h4>
              <p className="text-sm text-gray-300 leading-relaxed italic">{pillar.desc}</p>
            </motion.div>
          ))}

          {/* Expanded Flagship Pillar 7 */}
          <motion.div variants={childVariant} className="glass-panel p-6 rounded-3xl border-2 border-primary/40 bg-primary/10 hover:bg-primary/20 transition-all md:col-start-1 md:col-span-3 flex flex-col items-center text-center shadow-[0_0_30px_rgba(34,197,94,0.1)] mt-2">
            <div className="flex items-center space-x-3 mb-3">
              <Shield size={32} className="text-white animate-pulse" />
              <h4 className="font-bold text-white text-2xl uppercase tracking-[0.1em]">🏆 7. Works Without Internet</h4>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed max-w-3xl font-light">
              Built as a <span className="text-white font-bold">PWA (Progressive Web App)</span>. Every main feature, including the 10,000+ drug database, works <span className="text-primary-light font-bold underline decoration-primary">100% without data</span>. This is vital for reaching every corner of Nigeria.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )

  // SLIDE 8: The Conclusion
  const Slide8 = () => (
    <div className="flex flex-col items-center justify-center h-full w-full text-center relative">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full max-w-4xl z-10">
        <motion.div variants={childVariant} className="mb-12 space-y-4">
          <div className="flex items-center justify-center space-x-3 text-2xl text-gray-300">
            <CheckCircle className="text-primary" /> <span>Already tested with students (University of Jos)</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-2xl text-gray-300">
            <CheckCircle className="text-primary" /> <span>Architected for national deployment</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-2xl text-gray-300">
            <CheckCircle className="text-primary" /> <span>Ready for integration with regulatory bodies (NAFDAC)</span>
          </div>
        </motion.div>

        <motion.div variants={childVariant} className="glass-panel p-12 rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur-xl mt-12">
          <h2 className="text-4xl md:text-5xl font-light italic text-white leading-tight">
            "This is not just an app—it's a movement for safer healthcare in Nigeria."
          </h2>
        </motion.div>

        <motion.div variants={childVariant} className="mt-16">
           <Link to="/" className="inline-flex items-center space-x-3 px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-105">
             <Play size={24} />
             <span>Start Live Demo</span>
           </Link>
        </motion.div>
      </motion.div>
    </div>
  )

  const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />, <SlideLanguage />, <SlideCloud />, <SlideOrchestration />, <SlidePillars />, <Slide8 />]

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
