import { Link } from 'react-router-dom'
import { GraduationCap, Shield, Clock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: GraduationCap,
      title: 'LEARN',
      description: 'Evidence-based education on antibiotic use, resistance, and medication safety',
      color: 'bg-blue-50 text-blue-600',
      link: '/learn'
    },
    {
      icon: Shield,
      title: 'VERIFY',
      description: 'Authenticate medications and detect counterfeit drugs before consumption',
      color: 'bg-green-50 text-green-600',
      link: '/verify'
    },
    {
      icon: Clock,
      title: 'TRACK',
      description: 'Smart reminders to ensure proper medication adherence and course completion',
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
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
            From Education to Verification
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-green-100">
            Your Complete Medication Safety Companion
          </p>
          <p className="text-lg mb-8 text-green-50 max-w-2xl mx-auto">
            Combating antibiotic resistance and counterfeit medications through education, verification, and adherence tracking
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center space-x-2 bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
          >
            <span>Get Started</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-red-50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start space-x-4 mb-8">
            <AlertCircle className="text-accent flex-shrink-0" size={32} />
            <div>
              <h2 className="font-display font-bold text-3xl mb-4 text-gray-900">
                Nigeria Faces a Silent Healthcare Crisis
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Two deadly threats are claiming lives across our nation:
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-xl mb-3 text-gray-900">Antibiotic Resistance</h3>
              <p className="text-gray-700">
                Over-the-counter antibiotics, incomplete treatment courses, and inappropriate use are creating superbugs that no longer respond to treatment. Simple infections are becoming life-threatening.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-xl mb-3 text-gray-900">Counterfeit Medications</h3>
              <p className="text-gray-700">
                30-40% of medications in Nigerian markets are fake or substandard. Patients trust these drugs with their lives, unknowingly consuming substances that provide no treatment or cause harm.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-md">
                <div className="font-display font-bold text-4xl text-accent mb-2">{stat.value}</div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-4 text-gray-900">
              One Platform. Three Solutions.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              MedWise Nigeria tackles both problems through comprehensive education, medication verification, and adherence support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="feature-card group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Explore</span>
                    <ArrowRight size={18} className="ml-2" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <CheckCircle size={48} className="mx-auto mb-6 text-green-300" />
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
            <span>Start Learning Today</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
