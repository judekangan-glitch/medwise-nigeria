import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Shield, Clock, ArrowRight, AlertCircle, CheckCircle, Users, User } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'

export default function Home() {
  const { language } = useMedwise()
  const { t } = useTranslation(language)

  const features = [
    {
      icon: GraduationCap,
      title: language === 'en' ? 'LEARN' : 'LEARN',
      description: language === 'en' 
        ? 'Evidence-based education on antibiotic use, resistance, and medication safety'
        : 'Learn how to use medicine well make you no get wahala for body',
      color: 'bg-blue-50 text-blue-600',
      link: '/learn'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'VERIFY' : 'CHECK AM',
      description: language === 'en'
        ? 'Authenticate medications and detect counterfeit drugs before consumption'
        : 'Check your medicine make you know if e be fake or correct one',
      color: 'bg-green-50 text-green-600',
      link: '/verify'
    },
    {
      icon: Clock,
      title: language === 'en' ? 'TRACK' : 'FOLLOW AM',
      description: language === 'en'
        ? 'Smart reminders to ensure proper medication adherence and course completion'
        : 'Make we remind you make you no forget to take your tabs correct',
      color: 'bg-purple-50 text-purple-600',
      link: '/track'
    }
  ]

  const stats = [
    { value: '70%+', label: 'Inappropriate antibiotic use in Nigeria' },
    { value: '30-40%', label: 'Counterfeit medications in markets' },
    { value: '2x', label: 'Increased resistance from incomplete courses' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-deep-surface text-white py-20 px-4 relative overflow-hidden">
        {/* Subtle glass overlay background element */}
        <div className="absolute inset-0 bg-white/5 dark:bg-black/10 backdrop-blur-[2px] z-0 pointer-events-none"></div>
        
        {/* Floating background elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-20 left-10 opacity-20 hidden md:block"
        >
          <Shield size={120} />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-20 opacity-20 hidden md:block"
        >
          <GraduationCap size={160} />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-1/4 opacity-10 hidden md:block"
        >
          <CheckCircle size={80} />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto max-w-4xl text-center relative z-10"
        >
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight drop-shadow-md">
            {t('home.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-green-100">
            {t('home.hero_subtitle')}
          </p>
          <p className="text-lg mb-8 text-green-50 max-w-2xl mx-auto">
            Combating antibiotic resistance and counterfeit medications through education, verification, and adherence tracking
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center space-x-2 bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
          >
            <span>{t('home.get_started')}</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Live Network Impact Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="container mx-auto max-w-4xl px-4 -mt-16 mb-20 relative z-20"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-accent/30"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Stat 1 */}
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                  <Users size={32} className="text-green-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-1">12,480+</h3>
                <p className="text-green-100/60 font-medium tracking-wide uppercase text-[10px]">
                  {language === 'en' ? 'Nigerians Protected' : 'Naija People Wey We Protect'}
                </p>
              </div>

              {/* Stat 2 */}
              <div className="text-center p-2 border-y md:border-y-0 md:border-x border-white/10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 border border-white/10 group-hover:scale-110 transition-transform">
                  <Shield size={24} className="text-accent" />
                </div>
                <h3 className="text-3xl font-black text-white mb-1">842</h3>
                <p className="text-green-100/60 font-medium tracking-wide uppercase text-[10px]">
                  {language === 'en' ? 'Fake Drugs Flagged' : 'Fake Medicine Wey We Catch'}
                </p>
              </div>

              {/* Stat 3 */}
              <div className="text-center p-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 border border-white/10 group-hover:scale-110 transition-transform">
                  <CheckCircle size={24} className="text-blue-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-1">99.9%</h3>
                <p className="text-green-100/60 font-medium tracking-wide uppercase text-[10px]">
                  {language === 'en' ? 'Verification Accuracy' : 'As E Correct Reach'}
                </p>
              </div>
            </div>

            {/* Achievement/Impact Badge */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {['#059669', '#0284c7', '#7c3aed', '#db2777'].map((color, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center text-[10px] font-bold text-white shadow-inner"
                      style={{ backgroundColor: color }}
                    >
                      <User size={14} className="text-white/80" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-primary/20 bg-green-700 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                    +12k
                  </div>
                </div>
                <p className="text-sm text-green-100/80">
                  {language === 'en' ? 'Join thousands of Nigerians making safer medication choices.' : 'Join plenty Naija people wey dey choose better medicine.'}
                </p>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-wider animate-pulse">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                {language === 'en' ? 'Live Protection Active' : 'Active Vigilante Mode'}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-red-50/50 dark:bg-deep-surface transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="flex items-start space-x-4 mb-8">
            <AlertCircle className="text-accent flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="font-display font-bold text-3xl mb-4 text-gray-900 dark:text-gray-100">
                {t('home.problem_title')}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {t('home.problem_desc')}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border dark:border-red-900/30">
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Antibiotic Resistance</h3>
              <p className="text-gray-700 dark:text-gray-400">
                Over-the-counter antibiotics, incomplete treatment courses, and inappropriate use are creating superbugs that no longer respond to treatment. Simple infections are becoming life-threatening.
              </p>
            </div>
            <div className="card border dark:border-red-900/30">
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Counterfeit Medications</h3>
              <p className="text-gray-700 dark:text-gray-400">
                30-40% of medications in Nigerian markets are fake or substandard. Patients trust these drugs with their lives, unknowingly consuming substances that provide no treatment or cause harm.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center card border dark:border-white/5"
              >
                <div className="font-display font-bold text-4xl text-accent mb-2">{stat.value}</div>
                <div className="text-gray-700 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-transparent transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-6xl"
        >
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-4 text-gray-900 dark:text-gray-100">
              {t('home.feature_title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'MedWise Nigeria tackles both problems through comprehensive education, medication verification, and adherence support'
                : 'MedWise Nigeria dey help you learn, check your meds, and follow your treatment correct.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <Link
                    to={feature.link}
                    className="feature-card group cursor-pointer block h-full"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: index * 0.2 }}
                      >
                        <Icon size={32} />
                      </motion.div>
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-4 text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-primary dark:text-primary-light font-semibold group-hover:translate-x-2 transition-transform mt-auto">
                      <span>Explore</span>
                      <ArrowRight size={18} className="ml-2" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-primary dark:bg-deep-surface/90 text-white relative overflow-hidden backdrop-blur-sm border-t border-primary-light/20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl text-center relative z-10"
        >
          <motion.div
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <CheckCircle size={48} className="mx-auto mb-6 text-green-300 shadow-xl rounded-full" />
          </motion.div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
            Education Changes Behavior. Verification Saves Lives.
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            When patients understand proper antibiotic use and can verify their medications, resistance decreases and treatment success increases.
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center space-x-2 bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-green-50 transition-all shadow-lg"
          >
            <span>{t('home.start_learning')}</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
