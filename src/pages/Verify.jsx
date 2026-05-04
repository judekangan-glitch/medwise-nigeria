import { useState, useRef } from 'react'
import { Search, AlertTriangle, CheckCircle, FileText } from 'lucide-react'
import FakeDrugAlerts from '../components/FakeDrugAlerts'
import { verifyNafdac, searchDrugs, NAFDAC_DRUG_COUNT } from '../utils/verifyNafdac'
import PageWrapper from '../components/PageWrapper'
import { useMedwise } from '../context/MedwiseContext'
import { lang } from '../utils/translations'

export default function Verify() {
  const { language, showToast } = useMedwise()
  const [nafdacCode, setNafdacCode] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)

  const processVerification = (code) => {
    setSuggestions([])
    setShowSuggestions(false)
    setIsVerifying(true)
    
    setTimeout(() => {
      const found = verifyNafdac(code)
      if (found) {
        setVerificationResult({
          status: 'verified',
          name: found.name,
          nafdacNumber: found.nrn,
          category: found.category || '',
          dosageForm: found.dosageForm || '',
          activeIngredient: found.activeIngredient || '',
          strength: found.strength || '',
          expiryCheck: lang({en:'Check expiry date on package',pidgin:'Check the expiry date wey dey the medicine body',ha:'Duba ranar ƙarewa a akwatin',yo:'Ṣàyẹ̀wò ọjọ́ ìpárí ní apoti egbogi',ig:'Lelee ụbọchị njedebe n\'ọpọmọ'})
        })
        showToast(lang({en:'Medication Verified ✓',pidgin:'We don confirm am ✓',ha:'An tabbatar da magani ✓',yo:'A ti ṣàyẹ̀wò egbogi ✓',ig:'Anwachara ọgwụ ✓'}), 'success')
      } else {
        setVerificationResult({
          status: 'not_found',
          warning: lang({en:'NAFDAC number not found in database. This could indicate a counterfeit product.',pidgin:'We no see this NAFDAC number for our record. E fit mean say the drug be fake o.',ha:'Ba a sami lambar NAFDAC a cikin bayanai ba. Wannan na iya nuna kayan karya.',yo:'A kò rí nọ́mbà NAFDAC ní ìkójọpọ̀ alaye. Èyí lè fi hàn pé ọja iro ni.',ig:'Achọtabeghị nọmba NAFDAC n\'ọnọdụ data. Nka nwere ike ịgosi na ọgwụ a bụ eche eche.'})
        })
        showToast(lang({en:'Verification Failed!',pidgin:'E no match o!',ha:'Tabbatarwa ta gaza!',yo:'Ìmójútó Kùnà!',ig:'Nnyocha enwebeghị ire!'}), 'error')
      }
      setIsVerifying(false)
    }, 800)
  }

  const handleInputChange = (e) => {
    const val = e.target.value
    setNafdacCode(val)
    if (val.length >= 2) {
      const s = searchDrugs(val, 8)
      setSuggestions(s)
      setShowSuggestions(s.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (drug) => {
    setNafdacCode(drug.nrn)
    setSuggestions([])
    setShowSuggestions(false)
    processVerification(drug.nrn)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    processVerification(nafdacCode)
  }


  return (
    <PageWrapper className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-gray-900">
            {lang({en:'Verify Your Medication',pidgin:'Check Your Medicine',ha:'Tabbatar da Maganinka',yo:'Sàyẹ̀wò Egbogi Rẹ',ig:'Nyochaa Ọgwụ Gị'})}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {lang({
              en:'Check NAFDAC registration numbers to help identify counterfeit medications',
              pidgin:'Check NAFDAC number for your medicine body or pack to know whether e be real or fake',
              ha:'Duba lambobin rajista ta NAFDAC a jikin akwatin magani don sanin ingancinsa',
              yo:'Ṣàyẹ̀wò nọ́mbà ìforúkọ̀silẹ̀ NAFDAC ní apoti egbogi rẹ láti mọ̀ bóyá jábujábu ni',
              ig:'Lelee nọmba ndebanye aha NAFDAC na ọpọmọ ọgwụ gị iji hụ na ọ bụ eziokwu'
            })}
          </p>
          <div className="mt-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
              <strong>{lang({en:'Currently verifying:',pidgin:'We dey check:',ha:'Ana tabbatarwa:',yo:'A ń ṣàyẹ̀wò:',ig:'A na-enyocha ugbu a:'})}</strong> {NAFDAC_DRUG_COUNT.toLocaleString()} {lang({en:'NAFDAC-registered products',pidgin:'different medicines/products for Naija',ha:'kayayyakin da NAFDAC ta yi rajista',yo:'àwọn ọjà tí NAFDAC fọwọ́ sí',ig:'ngwaahịa ndị NAFDAC deresara'})}
            </span>
            <p className="text-xs text-gray-500 mt-2 max-w-xl mx-auto">
              {lang({
                en:'Data sourced directly from the official NAFDAC Greenbook — Nigeria\'s authoritative register of approved products.',
                pidgin:'We carry this data from NAFDAC Greenbook directly — that na the official list of all approved medicines for Naija.',
                ha:'Bayanan sun fito kai tsaye daga NAFDAC Greenbook — rajista ta hukuma ta kayayyakin da aka amince da su a Najeriya.',
                yo:'A mú àlàyẹ yìí láti ọwọ́ NAFDAC Greenbook tààrà — ìkójọpọ̀ alaye ìjọba ti àwọn ọjà tí a fọwọ́ sí ní Nàìjíríà.',
                ig:'Anyị wepụtara data a site na NAFDAC Greenbook ozugbo — ndekọ gọọmentị nke ngwaahịa ndị NAFDAC kwadoro na Naịjịrịa.'
              })}
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {lang({
                  en:'30-40% of Medications in Nigerian Markets Are Counterfeit',
                  pidgin:'Serious Fake-Drug Alarm: 3 to 4 medicines out of every 10 for our market fit be fake or poison',
                  ha:'Gargadi: Kusan kashi 30-40 na Magungunan kasuwannin mu na jabu ne masu hadari',
                  yo:'Ìkìlọ̀ Pàtàkì: Ìdá ọgbọ̀n sí ogójì nínú ọgọ́rùn-ún (30-40%) ògùn ní ọjà wa jẹ́ jábujábu tàbí májèlé',
                  ig:'Ịdọ aka ná ntị: Pasentị iri atọ ruo iri anọ (30-40%) nke ọgwụ anyị nọ n\'ahịa bụ Jabu ma ọ bụ nsị'
                })}
              </h3>
              <p className="text-gray-700">
                {lang({
                  en:'Fake medications contain no active ingredients or harmful substances. Verification before consumption can save lives.',
                  pidgin:'Fake medicine no get anything wey go heal you, and some fit carry poison wey go damage your body. Check am well before you drink am make you for live long.',
                  ha:'Magungunan jabu ba su da sinadarin warkewa, kuma suna iya ƙunsar abubuwa masu guba da ke lalata gangar jiki. Tabbatarwa kafin amfani yana tseratar da rayuka.',
                  yo:'Ògùn jábujábu kì í wò sàn, ó sì lè ba ẹ̀yà ara jẹ́ tàbí kó fa ikú òjijì. Ṣàyẹ̀wò oògùn rẹ nípa rẹ láti gba ẹ̀mí rẹ là.',
                  ig:'Ọgwụ jabu enweghị ihe na-edozi ahụ, ọ pụkwara imebi akụkụ ahụ gị ma ọ bụ gbuo gị. Nyochaa ya tupu ị nụọ ya iji chebe ndụ gị.'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="font-bold text-2xl text-gray-900 mb-4 md:mb-0">
              {lang({en:'Check NAFDAC Registration Number',pidgin:'Check NAFDAC Registration Number',ha:'Duba Lambar Rajista ta NAFDAC',yo:'Ṣàyẹ̀wò Nọ́mbà Ìforúkọ̀silẹ̀ NAFDAC',ig:'Lelee Nọmba Ndebanye Aha NAFDAC'})}
            </h2>
            <div className="text-gray-500 flex items-center text-sm font-medium">
              <FileText size={18} className="mr-2" />
              {lang({en:'Find number on package',pidgin:'Check the medicine body',ha:'Nemo lamba a akwatin',yo:'Wá nọmbà ní apoti',ig:'Chọta nọmba na ọpọmọ'})}
            </div>
          </div>

          <form onSubmit={handleVerify} className="mb-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {lang({en:'Search by drug name or NAFDAC number',pidgin:'Type the drug name or NAFDAC number',ha:'Shigar da sunan magani ko lambar NAFDAC',yo:'Tẹ orúkọ egbogi tàbí nọ́mbà NAFDAC',ig:'Tinye aha ọgwụ ma ọ bụ nọmba NAFDAC'})}
                </label>
                <div className="flex space-x-3 relative">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      id="nafdac-search-input"
                      value={nafdacCode}
                      onChange={handleInputChange}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      placeholder={lang({en:'e.g. Amoxicillin or A4-1234',pidgin:'e.g. Amoxicillin or A4-1234',ha:'misali: Amoxicillin ko A4-1234',yo:'fun apẹẹrẹ: Amoxicillin tàbí A4-1234',ig:'dịka: Amoxicillin ma ọ bụ A4-1234'})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                      autoComplete="off"
                      required
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {suggestions.map(drug => (
                          <li
                            key={drug.id}
                            onMouseDown={() => handleSuggestionClick(drug)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                          >
                            <div className="font-medium text-gray-900 text-sm">{drug.name}</div>
                            <div className="text-xs text-gray-500">
                              {drug.nrn}{drug.activeIngredient ? ` · ${drug.activeIngredient}` : ''}{drug.dosageForm ? ` · ${drug.dosageForm}` : ''}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying || !nafdacCode}
                    className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifying ? (
                      lang({en:'Verifying...',pidgin:'We dey check...',ha:'Ana tabbatarwa...',yo:'A n sayẹwò...',ig:'A na-enyocha...'})
                    ) : (
                      <>
                        <Search size={20} className="inline mr-2" />
                        {lang({en:'Verify',pidgin:'Check Am',ha:'Tabbatar',yo:'Sayẹwò',ig:'Nyochaa'})}
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {lang({en:'Type a drug name for suggestions, or enter NAFDAC number directly (e.g., A4-1234)',pidgin:'Type drug name for suggestions, or enter NAFDAC number directly',ha:'Rubuta sunan magani don shawarwari, ko shigar da lambar NAFDAC kai tsaye',yo:'Tẹ orúkọ egbogi fún àwọn ìmọ̀ràn, tàbí tẹ nọ́mbà NAFDAC tààrà',ig:'Pịnye aha ọgwụ maka ndụmọdụ, ma ọ bụ tinye nọmba NAFDAC ozugbo'})}
                </p>
              </div>
            </form>

          {/* Verification Result */}
          {verificationResult && (
            <div className={`p-6 rounded-xl ${
              verificationResult.status === 'verified'
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-red-50 border-2 border-red-500'
            }`}>
              <div className="flex items-start mb-4">
                {verificationResult.status === 'verified' ? (
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={32} />
                ) : (
                  <AlertTriangle className="text-red-600 mr-3 flex-shrink-0" size={32} />
                )}
                <div>
                  <h3 className={`font-bold text-xl mb-2 ${
                    verificationResult.status === 'verified'
                      ? 'text-green-900'
                      : 'text-red-900'
                  }`}>
                    {verificationResult.status === 'verified'
                      ? lang({en:'Medication Verified ✓',pidgin:'We don confirm am ✓',ha:'An tabbatar da magani ✓',yo:'A ti ṣàyẹ̀wò egbogi ✓',ig:'Anwachara ọgwụ ✓'})
                      : lang({en:'Verification Failed',pidgin:'E no match o',ha:'Tabbatarwa ta gaza',yo:'Ìmójútó Kùnà',ig:'Nnyocha enwebeghị ire'})}
                  </h3>
                  
                  {verificationResult.status === 'verified' ? (
                    <>
                      <p className="text-gray-700 mb-2">
                        <strong>{lang({en:'Product',pidgin:'Product',ha:'Kaya',yo:'Ọjà',ig:'Ọrụ'})}: </strong>{verificationResult.name}
                      </p>
                      {verificationResult.dosageForm && (
                        <p className="text-gray-700 mb-2">
                          <strong>{lang({en:'Dosage Form',pidgin:'Form',ha:'Nau\'i',yo:'Àpẹẹrẹ',ig:'Ụdị'})}: </strong>{verificationResult.dosageForm}
                        </p>
                      )}
                      {verificationResult.activeIngredient && (
                        <p className="text-gray-700 mb-2">
                          <strong>{lang({en:'Active Ingredient',pidgin:'Active Ingredient',ha:'Sinadarin',yo:'Àkópọ̀',ig:'Ihe dị n\'ime'})}: </strong>{verificationResult.activeIngredient}{verificationResult.strength ? ` (${verificationResult.strength})` : ''}
                        </p>
                      )}
                      {verificationResult.category && (
                        <p className="text-gray-700 mb-2">
                          <strong>{lang({en:'Category',pidgin:'Category',ha:'Nau\'i',yo:'Ẹ̀ka',ig:'Ụdị'})}: </strong>{verificationResult.category}
                        </p>
                      )}
                      <p className="text-gray-700 mb-4">
                        <strong>NAFDAC {lang({en:'Number',pidgin:'Number',ha:'Lamba',yo:'Nọ́mbà',ig:'Nọmba'})}: </strong>{verificationResult.nafdacNumber}
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>{lang({en:'Important',pidgin:'Take note',ha:'Muhimmanci',yo:'Pàtàkì',ig:'Mkpa'})}:</strong> {verificationResult.expiryCheck}. {lang({en:'Ensure the packaging is intact and matches the product description.',pidgin:'Make sure the pack correct and e match the description.',ha:'Tabbatar da cewa akwatin yana da kyau kuma yana dace da bayani na kaya.',yo:'Ríjú pọ̀ tí apoti ṣe pátápátá tí ó bá pọn pẹ̀lú àpèjúwe ọjà.',ig:'Jide n\'aka na ọpọmọ dị oke ọma ma kwado nkọwa ọgwụ.'})}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-red-800 font-semibold mb-2">
                        {verificationResult.warning}
                      </p>
                      <p className="text-gray-700 text-sm">
                        {lang({en:'Do NOT consume this medication. Report to NAFDAC and the pharmacy where you purchased it.',pidgin:'No take this medicine o. Report am to NAFDAC and the pharmacy wey you buy am.',ha:'Kada ka ci wannan magani. Ba da rahoto ga NAFDAC da kantin magani inda ka saya.',yo:'Máṣe mu egbogi yìí. Jábọ̀ sí NAFDAC àti ile egbogi tí o ra a.',ig:'Atọghị iri ọgwụ a. Kọọ NAFDAC na ụlọ ahịa ọgwụ ebe i zụtara ya.'})}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* How to Find NAFDAC Number */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <FileText size={32} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-3 text-gray-900">
              {lang({en:'Where to Find NAFDAC Number',pidgin:'Which place NAFDAC number dey?',ha:'Ina Za Ka Sami Lambar NAFDAC',yo:'Ibiti A Ti Rí Nọ́mbà NAFDAC',ig:'Ebe ị ga-achọta Nọmba NAFDAC'})}
            </h3>
            <p className="text-gray-700 mb-3">
              {lang({en:'Look for the NAFDAC registration number on the medication package. It typically starts with a letter followed by numbers (e.g., A7-1234).',pidgin:'Look for that NAFDAC number for the medicine body. E dey start with one letter then follow with numbers.',ha:'Nema lambar rajista ta NAFDAC a kan akwatin magani. Yawanci tana farawa da harafi sannan lambobi (misali, A7-1234).',yo:'Wá nọ́mbà ìforúkọ̀silẹ̀ NAFDAC ní apoti egbogi. Ó máa ń bẹ̀rẹ̀ pẹ̀lú lẹ́tà tí ó tẹ̀lé pẹ̀lú àwọn nọ́mbà (fun apẹẹrẹ, A7-1234).',ig:'Chọọ nọmba ndebanye aha NAFDAC na ọpọmọ ọgwụ. O na-amalite na mkpụrụedemede wee soro nọmba (dịka, A7-1234).'})}
            </p>
            <p className="text-sm text-gray-600">
              {lang({en:'Found on: Product label, packaging box, or insert leaflet',pidgin:'E dey: Label, box, or leaflet wey dey inside',ha:'Ana samu a: Tambarin kaya, akwatin kunshin, ko takaddar shigarwa',yo:'A rí i ní: Àmì ọjà, apoti, tàbí iwe ìsọfúnni',ig:'Achọtara ya na: Akara ọgwụ, ọpọmọ, ma ọ bụ akwụkwọ ndekọ'})}
            </p>
          </div>

          <div className="card">
            <FileText size={32} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-3 text-gray-900">
              {lang({en:'Additional Verification Tips',pidgin:'More things to check:',ha:'Shawarwarin Tabbatarwa na Ƙari',yo:'Àfikún Àwọn Ìmọ̀ràn Ìmójútó',ig:'Ndụmọdụ ọzọ maka Nnyocha'})}
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• {lang({en:'Check for spelling errors on packaging',pidgin:'Check if them spell word correct for the pack',ha:'Duba kurakuran rubutun haruffa a kan akwati',yo:'Ṣàyẹ̀wò àṣìṣe ìkọ̀wé ní apoti',ig:'Lelee njehie odee na ọpọmọ'})}</li>
              <li>• {lang({en:'Verify the expiry date is legible and valid',pidgin:'Make sure expiry date correct and e fit read am',ha:'Tabbatar da cewa ranar ƙarewa ta bayyana kuma tana da inganci',yo:'Ríjú pọ̀ tí ọjọ́ ìpárí ṣe kedere tí ó tún wọn',ig:'Jide n\'aka na ụbọchị njedebe dị ìhè ma na-arụ ọrụ'})}</li>
              <li>• {lang({en:'Ensure packaging is professionally printed',pidgin:'The pack must look like proper work',ha:'Tabbatar da cewa akwatin an buga shi a ƙwararren hanya',yo:'Ríjú pọ̀ tí a gbéjáde apoti ní ọ̀nà ọjọgbọn',ig:'Jide n\'aka na a pịnta ọpọmọ nke ọkachamara'})}</li>
              <li>• {lang({en:'Buy from licensed pharmacies only',pidgin:'Only buy your medicine from genuine pharmacy',ha:'Saya daga kantunan magani masu lasisi kawai',yo:'Rà ní àwọn ile egbogi tí wọ́n ṣe fọwọ́ sí nikan',ig:'Zụta naanị n\'ụlọ ahịa ọgwụ ndị nwere ikikere'})}</li>
            </ul>
          </div>
        </div>

        {/* Community Reporting */}
        <div className="card bg-blue-50">
          <h3 className="font-bold text-xl mb-4 text-gray-900">
            {lang({en:'Report Suspected Counterfeit Medications',pidgin:'Report Fake Medicine Wey You See',ha:'Bayar da Rahoto kan Magungunan da Ake Zargi Na Karya',yo:'Jábọ̀ Nípa Egbogi Eke Tí O Fura',ig:'Kọọ Ọgwụ Eche Eche I Echere'})}
          </h3>
          <p className="text-gray-700 mb-4">
            {lang({en:'If you suspect you\'ve purchased a counterfeit medication:',pidgin:'If you think the medicine you buy na fake:',ha:'Idan kuna mamaki cewa an sayo magani na karya:',yo:'Tí o bá fura pé o ti ra egbogi eke:',ig:'Ọ bụrụ na i echere na i zụtara ọgwụ eche eche:'})}
          </p>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>• {lang({en:'Do not consume the medication',pidgin:'No take the medicine',ha:'Kada ka ci magani',yo:'Máṣe mu egbogi',ig:'Atọghị iri ọgwụ'})}</li>
            <li>• {lang({en:'Keep the packaging and receipt',pidgin:'Keep the pack and receipt',ha:'Ajiye akwatin da rasiti',yo:'Ṣọ apoti àti ìjẹ̀rìí rẹ̀',ig:'Dobe ọpọmọ na ịkpọ ego'})}</li>
            <li>• {lang({en:'Report to NAFDAC immediately',pidgin:'Report am to NAFDAC now now',ha:'Ba da rahoto ga NAFDAC nan da nan',yo:'Jábọ̀ sí NAFDAC lẹ́sẹ̀kẹsẹ̀',ig:'Kọọ NAFDAC ozugbo'})}</li>
            <li>• {lang({en:'Report to the pharmacy where purchased',pidgin:'Tell the pharmacy wey you buy am from',ha:'Ba da rahoto ga kantin magani inda aka saya',yo:'Jábọ̀ sí ile egbogi tí o ra a',ig:'Kọọ ụlọ ahịa ọgwụ ebe i zụtara ya'})}</li>
            <li>• {lang({en:'Warn others in your community',pidgin:'Tell other people for your area',ha:'Yi wa wasu cikin al\'ummarku gargadi',yo:'Kìlọ̀ fún àwọn mìíràn ní àdúgbò rẹ',ig:'Dọọ ọchịchọ maka ndị ọzọ n\'obodo gị'})}</li>
          </ul>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>NAFDAC Hotline:</strong> 0800-NAFDAC (0800-623-322) <br />
              <strong>SMS:</strong> 20000 ({lang({en:'Free from all networks',pidgin:'E free for all network',ha:'Kyauta daga dukkan hanyoyin sadarwa',yo:'Ọ̀fẹ́ láti gbogbo àwọn nẹ́tíwọ̀ọ̀kì',ig:'Efu na netwọk niile'})})
            </p>
          </div>
        </div>

        {/* Fake Drug Alerts Gallery */}
        <FakeDrugAlerts />

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-gray-700">
            <strong>{lang({en:'Disclaimer',pidgin:'Please Note',ha:'Faɗakarwa',yo:'Ìkìlọ̀',ig:'Ọkwa'})}: </strong>
            {lang({
              en:`This verification tool covers ${NAFDAC_DRUG_COUNT.toLocaleString()} NAFDAC-registered products sourced from the official NAFDAC Greenbook (greenbook.nafdac.gov.ng). For official confirmation, contact NAFDAC directly or visit a licensed pharmacy.`,
              pidgin:`This tool cover ${NAFDAC_DRUG_COUNT.toLocaleString()} products from NAFDAC Greenbook. For complete check, go meet NAFDAC direct or proper pharmacy.`,
              ha:`Wannan kayan aiki na tabbatarwa yana rufe kayayyaki ${NAFDAC_DRUG_COUNT.toLocaleString()} daga NAFDAC Greenbook. Don tabbatarwa ta hukuma, tuntuɓi NAFDAC kai tsaye.`,
              yo:`Ètò ìmójútó yìí bo àwọn ọjà ${NAFDAC_DRUG_COUNT.toLocaleString()} láti NAFDAC Greenbook. Fún ìmójútó ìjọba, kan sí NAFDAC tààrà.`,
              ig:`Ngwá ọrụ nyocha a na-ekpuchie ngwaahịa ${NAFDAC_DRUG_COUNT.toLocaleString()} sitere na NAFDAC Greenbook. Maka nyocha ọffịs, kpọtụrụ NAFDAC ozugbo.`
            })}
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
