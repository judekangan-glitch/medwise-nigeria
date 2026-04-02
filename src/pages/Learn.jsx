import { Link } from 'react-router-dom'
import { Activity, BookOpen, Award, ArrowRight, AlertTriangle } from 'lucide-react'
import AntibioticGallery from '../components/AntibioticGallery'
import PageWrapper from '../components/PageWrapper'

export default function Learn() {
  const modules = [
    {
      id: 'antibiotics-basics',
      title: 'Antibiotic Basics',
      description: 'Understand what antibiotics are, how they work, and when they should be used',
      icon: BookOpen,
      duration: '5 min',
      color: 'bg-blue-500'
    },
    {
      id: 'resistance-crisis',
      title: 'The Resistance Crisis',
      description: 'Learn about antibiotic resistance, how it develops, and why it matters',
      icon: AlertTriangle,
      duration: '7 min',
      color: 'bg-red-500'
    },
    {
      id: 'proper-use',
      title: 'Proper Antibiotic Use',
      description: 'Master the dos and don\'ts of taking antibiotics safely and effectively',
      icon: Award,
      duration: '6 min',
      color: 'bg-green-500'
    }
  ]

  return (
    <PageWrapper className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-gray-900">
            Learn About Medication Safety
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based education to help you make informed decisions about antibiotics and medication use
          </p>
        </div>

        {/* Symptom Checker CTA */}
        <Link
          to="/learn/symptom-checker"
          className="block bg-gradient-to-r from-primary to-primary-light text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all mb-12 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Activity size={32} />
                <h2 className="font-display font-bold text-2xl">Symptom Checker</h2>
              </div>
              <p className="text-green-100 text-lg">
                Not sure if you need antibiotics? Use our evidence-based symptom assessment tool to determine if you should see a doctor
              </p>
            </div>
            <ArrowRight size={32} className="ml-6 group-hover:translate-x-2 transition-transform" />
          </div>
        </Link>

        {/* Education Modules */}
        <div>
          <h2 className="font-display font-bold text-2xl mb-6 text-gray-900">
            Educational Modules
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <Link
                  key={module.id}
                  to={`/learn/module/${module.id}`}
                  className="card group cursor-pointer hover:scale-105 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl ${module.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{module.duration}</span>
                    <ArrowRight size={18} className="text-primary group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Antibiotic Gallery */}
        <AntibioticGallery />

        {/* Why Education Matters */}
        <div className="mt-16 bg-green-50 p-8 rounded-2xl">
          <h2 className="font-display font-bold text-2xl mb-4 text-gray-900">
            Why Education Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">Prevents Resistance</h3>
              <p>Understanding proper antibiotic use helps prevent the development of drug-resistant bacteria that threaten us all.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Improves Outcomes</h3>
              <p>Completing full courses and using medications correctly ensures better treatment results and faster recovery.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Protects Communities</h3>
              <p>Your knowledge helps protect your family and community from both resistance and harmful medication practices.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Empowers Decisions</h3>
              <p>Informed patients can have better conversations with healthcare providers and make smarter health choices.</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

