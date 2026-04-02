import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle, Camera, FileText } from 'lucide-react'
import FakeDrugAlerts from '../components/FakeDrugAlerts'
import { verifyNafdac } from '../utils/verifyNafdac'
import PageWrapper from '../components/PageWrapper'
import CodeScanner from '../components/CodeScanner'
import { useMedwise } from '../context/MedwiseContext'
import { lang } from '../utils/translations'

export default function Verify() {
  const { language, showToast } = useMedwise()
  const [nafdacCode, setNafdacCode] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  const processVerification = (code) => {
    setIsVerifying(true)
    
    setTimeout(() => {
      const found = verifyNafdac(code)
      if (found) {
        setVerificationResult({
          status: 'verified',
          name: found.name,
          nafdacNumber: found.nrn,
          manufacturer: found.manufacturer || 'N/A',
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
    }, 1000)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    processVerification(nafdacCode)
  }

  const handleScanSuccess = (decodedText) => {
    setIsScanning(false)
    const formattedCode = decodedText.trim().toUpperCase()
    setNafdacCode(formattedCode)
    processVerification(formattedCode)
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
            {lang({en:'Check NAFDAC registration numbers to help identify counterfeit medications',pidgin:'Check NAFDAC number to know whether your medicine be real or fake',ha:'Duba lambobin rajistan NAFDAC don taimaka wajen gane magungunan karya',yo:'Sayẹwò àwọn nọmbà ìdasilẹ NAFDAC láti ṣèrànwọ mọ àwọn egbogi iro',ig:'Lelee nọmba ndebanye aha NAFDAC iji nyere aka ịchọpụta ọgwụ eche eche'})}
          </p>
          <div className="mt-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
              <strong>{lang({en:'Currently verifying:',pidgin:'We dey check:',ha:'Ana tabbatarwa:',yo:'A ń ṣàyẹ̀wò:',ig:'A na-enyocha ugbu a:'})}</strong> 10,076 {lang({en:'NAFDAC-registered drugs',pidgin:'drug for Naija',ha:'magunguna da NAFDAC ta yi rajista',yo:'egbogi tí NAFDAC fọwọ́ sí',ig:'ọgwụ ndị NAFDAC deresara'})}
            </span>
            <p className="text-xs text-gray-500 mt-2 max-w-xl mx-auto">
              <strong>Note:</strong> {lang({en:'This tool does not cover every drug registered by NAFDAC. The limitation is due to lack of access to the official NAFDAC API. Only drugs for which we could obtain public data are included.',pidgin:'This tool no cover all drug wey NAFDAC register. We no get access to their official system. We only put the ones wey we see for public.',ha:'Wannan kayan aiki baya rufe kowace magani da NAFDAC ta yi rajista. Iyakar ta kasance saboda rashin samun damar shiga API ta hukumar NAFDAC. Ana haɗa magunguna kawai waɗanda za a iya samun bayanai na jama\'a.',yo:'Ètò yìí kò bo gbogbo egbogi tí NAFDAC forúkọsilẹ. Ìdíwọ́ yìí jẹ nítorí àìní ìráàyèsí sí API ìjọba NAFDAC. A pẹ̀lú egbogi tí a lè gba àlàyẹ gbangba nikan.',ig:'Ngwá ọrụ a adọrọghị ọgwụ niile ndị NAFDAC deresara. Ọnọdụ a bụ n\'ihi enwegh NAFDAC API. Naanị ọgwụ ndị enwere data ọha a tinye.'})}
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                {lang({en:'30-40% of Medications in Nigerian Markets Are Counterfeit',pidgin:'30-40% of Medicine wey dey Naija market be Fake',ha:'30-40% na Magungunan da ke Kasuwar Najeriya Sun Kasance Na Karya',yo:'30-40% ti Egbogi ní Ọjà Naijíríà Jẹ Eke',ig:'30-40% nke Ọgwụ dị na Ahịa Nigeria bụ Eche Eche'})}
              </h3>
              <p className="text-gray-700">
                {lang({en:'Fake medications contain no active ingredients or harmful substances. Verification before consumption can save lives.',pidgin:'Fake medicine no get wetin go heal you or e fit even kill person. Check your med before you take am.',ha:'Magunguna na karya ba su da wasu kayan aiki masu aiki ko kayan da ke haifar da cutarwa. Tabbatarwa kafin cin abinci na iya ceton rayuka.',yo:'Egbogi iro kò ní ohun èlò tí ń ṣiṣẹ́ tàbí ohun tí ó lè ṣe ọ̀pọ̀lọpọ̀ ìpalára. Ṣàyẹ̀wò ṣáájú lílò lè gùn ẹ̀mí mọ́.',ig:'Ọgwụ eche eche enweghị ihe na-arụ ọrụ ma ọ bụ ihe ndị na-eme mkhai. Nyocha tupu iri nwere ike ide nd\u1ee5 ndu.'})}
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
            <button 
              onClick={() => setIsScanning(!isScanning)}
              className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-4 py-2 rounded-lg flex items-center transition-colors shadow-sm"
              type="button"
            >
              <Camera size={18} className="mr-2" />
              {isScanning
                ? lang({en:'Stop Scanning',pidgin:'Stop the Scan',ha:'Tsaya Skanin',yo:'Dawọ Sísayẹwò',ig:'Kwụsị Nyocha'})
                : lang({en:'Scan Code with Camera',pidgin:'Use Camera Scan the Code',ha:'Yi amfani da Kyamara Skan Code',yo:'Lo Kamẹra Sayẹwò Code',ig:'Jiri Kamera Gbaa Code'})}
            </button>
          </div>

          {isScanning ? (
            <CodeScanner 
              onScan={handleScanSuccess} 
              onClose={() => setIsScanning(false)}
            />
          ) : (
            <form onSubmit={handleVerify} className="mb-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {lang({en:'Enter NAFDAC Number (e.g., A7-1234)',pidgin:'Type the NAFDAC Number (e.g., A7-1234)',ha:'Shigar da Lambar NAFDAC (misali, A7-1234)',yo:'Tẹ Nọmbà NAFDAC (fun apẹẹrẹ, A7-1234)',ig:'Tinye Nọmba NAFDAC (dịka, A7-1234)'})}
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={nafdacCode}
                    onChange={(e) => setNafdacCode(e.target.value.toUpperCase())}
                    placeholder="A7-XXXX"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
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
                  {lang({en:'Find the NAFDAC number or scan the barcode/QR code on your medication package',pidgin:'Check the NAFDAC number or scan the QR code wey dey the medicine body',ha:'Nemo lambar NAFDAC ko skan lambar tattalin kayan ajiya/QR a kan akwatin magani',yo:'Wá nọ́mbà NAFDAC tàbí ṣe ṣíṣàyẹwò barcode/QR ní apoti egbogi rẹ',ig:'Chọta nọmba NAFDAC ma ọ bụ gbaa barcode/QR code dị na ọpọmọ ọgwụ gị n\'oge'})}
                </p>
              </div>
            </form>
          )}

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
                      <p className="text-gray-700 mb-2">
                        <strong>{lang({en:'Manufacturer',pidgin:'Who make am',ha:'Mai kera',yo:'Olùṣe',ig:'Onye mere ya'})}: </strong>{verificationResult.manufacturer}
                      </p>
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
            <Camera size={32} className="text-primary mb-4" />
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
            {lang({en:'This verification tool uses a limited database of 10,076 drugs. For official and complete verification, contact NAFDAC directly or visit a licensed pharmacy. We do not have access to the full NAFDAC registry or API.',pidgin:'This tool na only 10,076 drugs dey inside. For complete check, go meet NAFDAC direct or proper pharmacy. We no get their full system access.',ha:'Wannan kayan aiki na tabbatarwa yana amfani da ɗakunan bayanai masu iyaka na magunguna 10,076. Don hukuma da cikakken tabbatarwa, tuntuɓi NAFDAC kai tsaye ko ziyarci wani kantin magani mai lasisi.',yo:'Ètò ìmójútó yìí ń lo ìkójọpọ̀ alaye ìyàsọtọ ti àwọn egbogi 10,076. Fún ìmójútó ìjọba àti pipe, kan sí NAFDAC tàbí ṣèbẹ̀wò sí ile egbogi tí wọ́n fi fọwọ́ sí.',ig:'Ngwá ọrụ nyocha a na-eji nkwekọrịta data nwere 10,076 ọgwụ. Maka nyocha ọffịs na zuru oke, kpọtụrụ NAFDAC ozugbo ma ọ bụ gaa ụlọ ahịa ọgwụ nwere ikikere.'})}
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
