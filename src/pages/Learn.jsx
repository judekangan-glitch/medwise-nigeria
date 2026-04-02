import { Link } from 'react-router-dom'
import { Activity, BookOpen, Award, ArrowRight, AlertTriangle } from 'lucide-react'
import AntibioticGallery from '../components/AntibioticGallery'
import PageWrapper from '../components/PageWrapper'
import { lang } from '../utils/translations'

export default function Learn() {
  const modules = [
    {
      id: 'antibiotics-basics',
      title: lang({en:'Antibiotic Basics',pidgin:'About Antibiotic Basics',ha:'Fahimta Antibiotics',yo:'Ipilẹ Oògùn Antibiotics',ig:'Nhọrọ Antibiotics'}),
      description: lang({en:'Understand what antibiotics are, how they work, and when they should be used',pidgin:'Sabi wetin antibiotic be, how dem dey work, and when you suppose use dem',ha:'Fahimci menene antibiotics, yadda suke aiki, da kuma lokacin da ya kamata a yi amfani da su',yo:'Loye kini antibiotics jẹ, bawo ni wọn ṣe n ṣiṣẹ, ati igba ti o yẹ ki a lo wọn',ig:'Ghọta ihe antibiotics bụ, otu ha si arụ ọrụ, na oge enwere ike iji ha'}),
      icon: BookOpen,
      duration: lang({en:'5 min',pidgin:'5 min',ha:'Minti 5',yo:'Iṣẹju 5',ig:'Nkeji 5'}),
      color: 'bg-blue-500'
    },
    {
      id: 'resistance-crisis',
      title: lang({en:'The Resistance Crisis',pidgin:'The Wahala of Drug Resistance',ha:'Matsalar Juriya ga Magani',yo:'Ewu Ti Oogun Kiko',ig:'Nsogbu Nke Ọgwụ Ahụike Ndị Na Anaghị Arụ Ọrụ Azụ'}),
      description: lang({en:'Learn about antibiotic resistance, how it develops, and why it matters',pidgin:'Learn matter of antibiotic resistance, how e take dey happen, and why e dey important',ha:'Koyi game da juriyar antibiotics, yadda take faruwa, da kuma dalilin da ya sa take da mahimmanci',yo:'Kọ nipa atako antibiotics, bi o ṣe n waye, ati idi rẹ ti o fi ṣe pataki',ig:'Mụta gbasara onwe onye nkwado na antibiotics, otu esi e mepụta ya, nakwa ihe mmemme nwere'}),
      icon: AlertTriangle,
      duration: lang({en:'7 min',pidgin:'7 min',ha:'Minti 7',yo:'Iṣẹju 7',ig:'Nkeji 7'}),
      color: 'bg-red-500'
    },
    {
      id: 'proper-use',
      title: lang({en:'Proper Antibiotic Use',pidgin:'How To Use Antibiotic Well',ha:'Mizanin Amfani Da Antibiotics',yo:'Sísọ Antibiotics Tító',ig:'Ndị Ọchịchọ Ya Bụrụ Mzuzu Maka Antibiotics'}),
      description: lang({en:'Master the dos and don\'ts of taking antibiotics safely and effectively',pidgin:'Know wetin to do and wetin no to do when you dey take antibiotic safe and well',ha:'Kula da abin yi da abin da ba za a yi ba na shan antibiotics lafiya da tasiri',yo:'Mọ awọn ofin ati aiṣedede mimu antibiotics yoo wúlò yoo je àìléwu',ig:'Mụtaru ị chọrọ ka ọ si bụrụ ihie eji mgbochi gị eme gburugburu '}),
      icon: Award,
      duration: lang({en:'6 min',pidgin:'6 min',ha:'Minti 6',yo:'Iṣẹju 6',ig:'Nkeji 6'}),
      color: 'bg-green-500'
    }
  ]

  return (
    <PageWrapper className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-gray-900">
            {lang({en:'Learn About Medication Safety',pidgin:'Learn Waitin You Suppose Know Make You Safe On Top Medicine',ha:'Koya Bayani Don Samun Kariya Da Amfani Tsaro Lafiyar Magani',yo:'Kọ nipa iṣọra fun ẹni to mọ ati ìlànà',ig:'Mụta banyere mmadụ ọmarịcha nchedo'})}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {lang({en:'Evidence-based education to help you make informed decisions about antibiotics and medication use',pidgin:'Correct lesson to teach you true true how to take your antibiotics well ',ha:'Kyakkyawan koyarwa gwaji da zai taimaka maka amfani da magani tsabta ',yo:'Ètò ẹ̀kọ́ tí ó dá lórí ẹ̀rí láti ràn ọ́ lọ́wọ́ láti ṣe àwọn ìpinnu tí ó mọ nipa lilo antibiotics ',ig:'Mụta banyere onye okike ahụ mere ka inwee  nke okwu ngbanye ike na mmanya  nyesịpụ aka gị ogwu mmanya mkpa niile'})}
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
                <h2 className="font-display font-bold text-2xl">
                  {lang({en:'Symptom Checker',pidgin:'Check Your Sickness Level',ha:'Duba Alamun Cututtukan ku',yo:'Iyewo Àmì Àrùn',ig:'Ugboro abụọ nke ndu nke ọmụmụ ọria'})}
                </h2>
              </div>
              <p className="text-green-100 text-lg">
                {lang({en:'Not sure if you need antibiotics? Use our evidence-based symptom assessment tool to determine if you should see a doctor',pidgin:'You no conform if na antibiotics you suppose take am ? make you click make you find Doctor make know how e go balance out',ha:'Ba za ku yarda ba ko kuna neman antibiotics din  ba ? shiga nan in ba daidaituwar shawara idan za ku je wajen likita ',yo:'Ṣe o ni ipinnu ti o ko i rii boya ohun oogun? wa jẹ ka fi ẹyọ fun amọja wa  la le fihan yẹ',ig:'Gị na azaba i kwesịrị a jị ị chọrọ iji chere ike ihe ndị doro gị ahụ ?'})}
              </p>
            </div>
            <ArrowRight size={32} className="ml-6 group-hover:translate-x-2 transition-transform" />
          </div>
        </Link>

        {/* Education Modules */}
        <div>
          <h2 className="font-display font-bold text-2xl mb-6 text-gray-900">
            {lang({en:'Educational Modules',pidgin:'Lesson Modules',ha:'Daraktar Ilmi',yo:'Ètò Ẹ̀kọ́',ig:'Usoro nke Nweta Gụkwuo'})}
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
            {lang({en:'Why Education Matters',pidgin:'Why Make You Sabi Read Good',ha:'Me Ya Sa Ilimi Yana Da Mahimmanci',yo:'Eeṣe ti Eko Fi Nkan To Ṣe Pataki',ig:'Ihe Mere Izi E Si Dị Mkpa'})}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">{lang({en:'Prevents Resistance',pidgin:'Avoid Body Block Drugs',ha:'Har Tsari Kan Kare Cuta',yo:'O N Da Aaya Diidilero',ig:'Mgbochi n\'agwụ n\'ike gbasara Ahụ'})}</h3>
              <p>{lang({en:'Understanding proper antibiotic use helps prevent the development of drug-resistant bacteria that threaten us all.',pidgin:'If you keep follow instruction wetin dey inside guide the  way doctor dey write make body no block cure ',ha:'Fahimta da gaske zai hanawa jiki ba dace da magungunnan da ba za ka sha ba idan bakana ciwo gaske ',yo:'Loje lilo igbenira ati abajiyio wa lona i ṣe ayipada  iwa a a yee joko to nbaye kokoro ai nilo .',ig:'Ngalaba na ijirimara  mkpa nyi ga mmekorita maka ọrịa mbụ ya na eguzogide mkpa mmeri ibere nye  onye nwe ụwa  '})}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{lang({en:'Improves Outcomes',pidgin:'Bring beta result come',ha:'Haɓaka sakamakon',yo:'Mo ni awọn esi to sunmọ',ig:'Mmụba nke nweta agbawa'})}</h3>
              <p>{lang({en:'Completing full courses and using medications correctly ensures better treatment results and faster recovery.',pidgin:'To Finish and complete full treatment with antibiotics that doctor talk about go quickly bring good recovery',ha:'Duba kuma amfani da magani tsabta domin mafi zaku tabbada yaran warke kamar da an yi niyya',yo:'Ona igun pa pa gbangba e se pataki wipe ki e so ogun gidi fun awon iwosi t\'o kọngbọn le ki ara maa yo di mimọ',ig:'Mgbe a kpọtụrụ gị ọnụ ime usoro nlekota nke mere nkenke igwọ egbochi inye mmanya mmeri ahụ gị niile ngwa ngwa .'})}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{lang({en:'Protects Communities',pidgin:'Safeguard our community people',ha:'Kariyar Al\'ummomi',yo:'O Daa fun Awọn Agbedemeji',ig:'Nke Na Eduzi Oge anyị Obodo i nụ'})}</h3>
              <p>{lang({en:'Your knowledge helps protect your family and community from both resistance and harmful medication practices.',pidgin:'If you keep update know you help keep your people family make un-know no catch them inside ignorance .',ha:'Ribar bayaninka da basirarka ka taba taimako don kulawa abubuwa iyali daga hadarin halayen magani marasa ma-ana .',yo:'Mimi rẹ yii yoo ran o le si i gbagbọ aburu fún ati awujọ nipa igbesẹ  to pẹtẹlẹ  gbọpẹ eewu gígùn. ',ig:'Isi nweta ebo ka idị i kwere nke nọwela kọọ akpụkpọ nwe mmadụ mụ nwute igbochi ezigbo njide nkịtị ya ahụ  ihi nke na igi niile obụla.'})}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{lang({en:'Empowers Decisions',pidgin:'e Dey Give Overpower To Think Wella',ha:'Inganta Zabi Ganuwa ',yo:'Gbé Ń Bọ̀ Àmúyẹ Rírọ',ig:'Nkọwa ikpe ikpe dị mma .'})}</h3>
              <p>{lang({en:'Informed patients can have better conversations with healthcare providers and make smarter health choices.',pidgin:'If patient know plenty things them go fit answer question with fine ideas talk doctor any matter that affect body.',ha:'Masu fama wajen zasu amfani da lafiya wajen jin tausayi , da samun shawara gaban likita asali ba tare sa bati ba a asibiti .',yo:'Alaiye awọn arowagbẹ nipa ogún igbimọ ilera wa e lomi bami ṣàjọ yàn pe lẹtọ wa ni o pe wa bami da irora ni ọgba nla ipele ile ìlera.',ig:'Mgbe ndu ụmụ anyi mụta ihe ka a nwere ike nweta ezigbo nkwurịta okwu site nakwa isibanye gwa ya na ikpe ikpe siri ike okarami okwa .'})}</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}


