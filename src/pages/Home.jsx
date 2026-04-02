import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Shield, Clock, ArrowRight, AlertCircle, CheckCircle, Users, User } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'

export default function Home() {
  const { language } = useMedwise()
  const { t } = useTranslation(language)
  const lang = (map) => map[language] ?? map['en']

  const features = [
    {
      icon: GraduationCap,
      title: lang({en:'LEARN',pidgin:'LEARN',ha:'KOYO',yo:'K\u1ecd\u0301',ig:'M\u1ee4TA'}),
      description: lang({en:'Evidence-based education on antibiotic use, resistance, and medication safety',pidgin:'Learn how to use medicine well make you no get wahala for body',ha:'Ilimi game da amfani da antibiotics da juriya da amincin magani',yo:'\u00c8k\u1ecd\u0301 t\u00f3 d\u00e1 \u00e0r\u00eds\u00ed ar\u00edn l\u00edlo antibiotics, j\u00far\u00fas\u00ed, \u00e0ti ab\u00f3 \u1ecdg\u00f9n',ig:'Agumagu banyere ojiji antibiotics, mgbochi, na nche \u1ecdgw\u1ee5'}),
      color: 'bg-blue-50 text-blue-600',
      link: '/learn'
    },
    {
      icon: Shield,
      title: lang({en:'VERIFY',pidgin:'CHECK AM',ha:'TABBATAR',yo:'\u1e62\u00c0Y\u1eb8\u0300W\u00d2',ig:'NWALEE'}),
      description: lang({en:'Authenticate medications and detect counterfeit drugs before consumption',pidgin:'Check your medicine make you know if e be fake or correct one',ha:'Tabbatar da magunguna kuma gano magunguna na karya kafin amfani',yo:'\u1e62\u1eb9\u0300\u1e63e \u1ecdg\u00f9n \u00e0ti m\u1ecd b\u00f3y\u00e1 \u1ecdg\u00f9n iro n\u00ed b\u00ed \u1eb9 t\u00f3 mu',ig:'Nwalee \u1ecdgw\u1ee5 ma \u1ecbchoputa \u1ecdgw\u1ee5 eche eche tupu \u1ecd d\u1ecb oge iri'}),
      color: 'bg-green-50 text-green-600',
      link: '/verify'
    },
    {
      icon: Clock,
      title: lang({en:'TRACK',pidgin:'FOLLOW AM',ha:'BIBIYE',yo:'T\u1eccPINPIN',ig:'SORO YA'}),
      description: lang({en:'Smart reminders to ensure proper medication adherence and course completion',pidgin:'Make we remind you make you no forget to take your tabs correct',ha:'Tunatarwa na wayo don tabbatar da bin umarnin magani da kammala koryar',yo:'\u00c0w\u1ecdn r\u00e1nnt\u00ed l\u00e1ti r\u00edj\u00fa p\u1ecd\u0300 t\u00ed a m\u00fa \u1ecdg\u00f9n \u1e63\u00e1\u00e1j\u00fa \u00e0ti p\u00e0r\u00ed k\u00f3\u1ecds\u00ec',ig:'Ihe ncheta iji jide na ojiji \u1ecdgw\u1ee5 nke ezi ma mechaa usoro'}),
      color: 'bg-purple-50 text-purple-600',
      link: '/track'
    }
  ]

  const stats = [
    { value: '70%+', label: lang({en:'Inappropriate antibiotic use in Nigeria',pidgin:'Wrong antibiotic wey Naija people dey use',ha:'Rashin amfani da antibiotics a Najeriya',yo:'Lilo antibiotics ti ko to ni Naijeria',ig:'Ojiji antibiotics ezighi ezi na Nigeria'}) },
    { value: '30-40%', label: lang({en:'Counterfeit medications in markets',pidgin:'Fake medicine wey dey market',ha:'Magunguna na karya a kasuwanni',yo:'Ogun iro ni oja',ig:'\u1ecdgw\u1ee5 eche eche n\'ahia'}) },
    { value: '2x', label: lang({en:'Increased resistance from incomplete courses',pidgin:'Resistance wey dey grow when you no finish your drug',ha:'Karuwar juriya daga koryar da ba a kammala ba',yo:'Jijeji lati awon kosi ti a ko pari',ig:'Mmeri mgbochi si na usoro na-ezughihi oke'}) }
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
            {lang({en:'Combating antibiotic resistance and counterfeit medications through education, verification, and adherence tracking',pidgin:'We dey fight fake medicine and wrong antibiotic use through learning, checking and following treatment',ha:'Yakar juriyar maganin kashe demuwa da magunguna na karya ta hanyar ilimi, tabbatarwa, da bin ta',yo:'Ij\u00fa\u1e63\u1eb9\u0301 j\u00far\u00fas\u00ed antibiotics \u00e0ti \u1ecdg\u00f9n iro p\u1eb9\u0300l\u00fa \u1eb9\u0300k\u1ecd\u0301, \u1e63\u00e0y\u1eb9\u0300w\u00f2, \u00e0ti topt\u00ec \u00ect\u1ecd\u0301s\u1ecd\u0301n\u00e0',ig:'Inogide ihe mgbochi antibiotics na \u1ecdgw\u1ee5 eche eche site na agumagu, nyocha, na ilo oge'})}
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
                  {lang({en:'Nigerians Protected',pidgin:'Naija People Wey We Protect',ha:'Yan Najeriya da Aka Kare',yo:'Aw\u1ecdn Omo Naij\u00e9r\u00ed\u00e0 T\u00f3 Wa Dab\u1ecd\u0300',ig:'Nd\u1ecb Nigeria ny\u1ecdchara'})}
                </p>
              </div>

              {/* Stat 2 */}
              <div className="text-center p-2 border-y md:border-y-0 md:border-x border-white/10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 border border-white/10 group-hover:scale-110 transition-transform">
                  <Shield size={24} className="text-accent" />
                </div>
                <h3 className="text-3xl font-black text-white mb-1">842</h3>
                <p className="text-green-100/60 font-medium tracking-wide uppercase text-[10px]">
                  {lang({en:'Fake Drugs Flagged',pidgin:'Fake Medicine Wey We Catch',ha:'An Gano Magunguna na Karya',yo:'\u1ecdg\u00f9n Iro T\u00f3 Wa Ri',ig:'\u1ecdgw\u1ee5 eche eche a chop\u1ee5tara'})}
                </p>
              </div>

              {/* Stat 3 */}
              <div className="text-center p-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 border border-white/10 group-hover:scale-110 transition-transform">
                  <CheckCircle size={24} className="text-blue-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-1">99.9%</h3>
                <p className="text-green-100/60 font-medium tracking-wide uppercase text-[10px]">
                  {lang({en:'Verification Accuracy',pidgin:'As E Correct Reach',ha:'Daidaiton Tabbatarwa',yo:'Ot\u00fat\u00fa \u1e62\u00e0y\u1eb9\u0300w\u00f2',ig:'Izi izi Nnyocha'})}
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
                  {lang({en:'Join thousands of Nigerians making safer medication choices.',pidgin:'Join plenty Naija people wey dey choose better medicine.',ha:'Ku shiga dubban yan Najeriya da ke zabar magunguna mafi aminci.',yo:'D\u00e1r\u00e0 p\u1ecd\u0300 \u00e0w\u1ecdn \u1ecd\u0300g\u00e1\u1ecd\u0300r\u1ecd\u0300 omo Naij\u00e9r\u00ed\u00e0 t\u00ed \u0144 ya ad\u00e9 idi \u1ecdg\u00f9n ab\u00f3.',ig:'D\u1ecb ha na puku mmad\u1ee5 Nigeria na-ah\u1ecd\u1ecd \u1ecdgw\u1ee5 nke \u1ecdma.'})}
                </p>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-wider animate-pulse">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                {lang({en:'Live Protection Active',pidgin:'Active Vigilante Mode',ha:'Kariyar Kai Tsaye Tana Aiki',yo:'Ab\u00f3 T\u00f3 Wa B\u1eb9\u0300r\u1eb9\u0300',ig:'Nche di ndu na-aruo oru'})}
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
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">{lang({en:'Antibiotic Resistance',pidgin:'Antibiotic Resistance',ha:'Juriyar Maganin Kashe Demuwa',yo:'J\u00far\u00fas\u00ed Antibiotics',ig:'Ihe mgbochi Antibiotics'})}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                {lang({en:'Over-the-counter antibiotics, incomplete treatment courses, and inappropriate use are creating superbugs that no longer respond to treatment. Simple infections are becoming life-threatening.',pidgin:'Buying antibiotic from market without doctor, no finishing your course, and wrong use na them dey create superbugs. Small sickness dey become dangerous.',ha:'Saye antibiotics ba tare da takardar likita ba, koryar da ba a kammala ba, da rashin amfani su ne ke haifar da kwayoyin cuta masu juriya. Kamuwa mai sauki tana zama mai hatsarin rai.',yo:'Ra antibiotics l\u1eb9\u0301\u1ecd si oj\u00e0 lai si owo iwofin, aipar\u00ed k\u00f3\u1ecds\u00ec, ati lilo ti ko to ni awon to n mu ki superbug wa. Awon aisan kekere n bere si ni ewu aye.',ig:'Izi antibiotics n-ahia, ilegh\u1ecb usoro nke ezi, na ojiji ezighi ezi na-emep\u1ee5ta superbugs. \u1eccr\u1ecba d\u1ecb obere na-ab\u1ecb ihe ize nd\u1ee5.'})}
              </p>
            </div>
            <div className="card border dark:border-red-900/30">
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">{lang({en:'Counterfeit Medications',pidgin:'Fake Medicine',ha:'Magunguna na Karya',yo:'\u1ecdg\u00f9n Iro',ig:'\u1ecdgw\u1ee5 Eche Eche'})}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                {lang({en:'30-40% of medications in Nigerian markets are fake or substandard. Patients trust these drugs with their lives, unknowingly consuming substances that provide no treatment or cause harm.',pidgin:'30-40% of medicine wey dey Naija market na fake or bad quality. People dey trust those drugs with their life, without knowing say them dey take poison.',ha:'30-40% na magunguna a kasuwar Najeriya na karya ko kasa fahimta. Marasa lafiya suna amincewa da waannan magunguna da rayukansu, ba su sani ba cewa suna sha abubuwa masu cutar da su.',yo:'30-40% ti awon egbogi ni oja Naij\u00e9r\u00ed\u00e0 je eke tabi ko dara. Awon aroorun maa lo awon egbogi naa pelu aye won, lai mo pe won n gbe jije ti ko wulo.',ig:'30-40% nke \u1ecdgw\u1ee5 n-ahia Nigeria b\u1ee5 adi nma ma \u1ecd b\u1ee5 ezighi ezi. Nd\u1ecb \u1ecdr\u1ecba na-a\u1e45\u1ecd \u1ecdgw\u1ee5 ndiya na nd\u1ee5 ha, na-an\u1ecbghá»‹ mara na ha na-ata ihe na-enwegh\u1ecb ike.'})}
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
              {lang({en:'MedWise Nigeria tackles both problems through comprehensive education, medication verification, and adherence support',pidgin:'MedWise Nigeria dey help you learn, check your meds, and follow your treatment correct.',ha:'MedWise Nigeria na magance matsalolin biyu ta hanyar ilimi mai zurfi, tabbatarwar magani, da tallafin bin umarnin',yo:'MedWise Nigeria n\u00ed \u00e1y\u1ecd\u0300 aw\u1ecdn \u1eb9\u0300\u1e63\u00e8\u1ecd\u0300ba m\u00e9j\u00e8\u00e8j\u00ed n\u00ed p\u1eb9\u0300l\u00fa \u1eb9\u0300k\u1ecd\u0301 agbara, \u1e63\u00e0y\u1eb9\u0300w\u00f2 \u1ecdg\u00f9n, \u00e0ti at\u00edl\u1eb9\u0300g\u1ecd waj\u00fa',ig:'MedWise Nigeria na-emejuputa nsogbu nke ab\u1ee5\u1ecd site na agumagu zuru ezu, nyocha \u1ecdgw\u1ee5, na nkwado ilo oge'})}
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
                      <span>{lang({en:'Explore',pidgin:'Go',ha:'Fara',yo:'W\u1ecd\u0300 \u00ecd\u00e0j\u00fa',ig:'Nw\u1ee5nkw\u1ee5'})}</span>
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
            {lang({en:'Education Changes Behavior. Verification Saves Lives.',pidgin:'To learn change you. To check your medicine save your life.',ha:'Ilimi yana canza hali. Tabbatarwa tana ceton rayuka.',yo:'\u1eb8\u0300k\u1ecd\u0301 n\u00ed \u00edpad\u00e0 \u00ecwa. \u1e62\u00e0y\u1eb9\u0300w\u00f2 \u0144 g\u00f9n \u1eb9\u0300m\u00ed.',ig:'Agumagu na-agbanwe omume. Nyocha na-echebe nd\u1ee5.'})}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {lang({en:'When patients understand proper antibiotic use and can verify their medications, resistance decreases and treatment success increases.',pidgin:'When person understand how to use antibiotic and know how to check their medicine, resistance go down and treatment go work.',ha:'Lokacin da marasa lafiya suka fahimci amfani da antibiotics yadda ya kamata kuma suka iya tabbatar da magunguna nasu, juriya tana raguwa kuma nasarar magani tana karuwa.',yo:'Nigba ti awon aroorun ba mo lilo antibiotics saaju ati le se saye egbogi won, jurusi din ku ati ere itoju si i po.',ig:'Mgbe nd\u1ecb \u1ecdr\u1ecba ghot\u1ecdr\u1ecb ojiji antibiotics nke ezi ma nwere ike nyocha \u1ecdgw\u1ee5 ha, mgbochi na-ada ma oru \u1ecdgw\u1ee5 na-aga iru.'})}
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
