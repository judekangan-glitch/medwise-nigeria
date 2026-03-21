import { useState } from 'react'
import { X, AlertTriangle, ShieldAlert, Eye } from 'lucide-react'

export default function FakeDrugAlerts() {
  const [selectedAlert, setSelectedAlert] = useState(null)

  const fakeDrugAlerts = [
    {
      id: 1,
      productName: 'Fake Avastin & Tecentriq (Cancer Drugs)',
      declaredDate: 'March 2026',
      nafdacAlert: 'NAFDAC Alert No. 015/2026',
      dangerLevel: 'Critical',
      image: '/Fake_Avastin_Bevacizumab.jpg',
      additionalImages: ['/Fake_Avaa.jpg', '/Fake_avaaa.jpg'],
      description: 'Counterfeit batches of Avastin (Bevacizumab) 400mg/16ml and Tecentriq (Atezolizumab) 1200mg/20ml circulating in Nigeria',
      identificationTips: [
        'Batch numbers do not correspond to genuine Roche batches',
        'Differences in artwork and printing quality',
        'Wrong placement of text on packaging',
        'Incorrect variable data',
        'Tamper-evident labels inconsistent with genuine products',
        'Serial numbers not corresponding to genuine Roche serialisation system'
      ],
      healthRisk: 'Counterfeit oncology medicines may contain incorrect or no active ingredients, harmful contaminants, or incorrect dosage strength. May result in treatment failure, disease progression, serious adverse events, or death.',
      affectedBrands: ['Avastin (Bevacizumab)', 'Tecentriq (Atezolizumab)'],
      whereFound: 'Healthcare facilities across Nigeria - sold at significantly lower prices (₦180,000-₦350,000)',
      alertDetails: 'Reported by Roche Nigeria after complaints from healthcare professionals. Patients brought counterfeit products to facilities.'
    },
    {
      id: 2,
      productName: 'Fake Ciprofit 500mg (Antibiotic)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 030B/2025',
      dangerLevel: 'Critical',
      image: '/10.jpg',
      additionalImages: ['/100.jpg'],
      description: 'Falsified Ciprofloxacin 500mg tablets containing only 5.7% active ingredient (should be 90-110%)',
      identificationTips: [
        'Falsely claims manufacture by Impact Pharmaceutical Ltd, Enugu',
        'Laboratory tested - contains only 5.7% ciprofloxacin',
        'Packaging may appear legitimate but product is substandard',
        'Check for proper NAFDAC registration verification'
      ],
      healthRisk: 'Gross violation of quality standards leads to treatment failures and antimicrobial resistance. Infections will not be treated properly, potentially leading to serious complications.',
      affectedBrands: ['Ciprofit 500'],
      whereFound: 'Various locations in Nigeria',
      alertDetails: 'WHO-prequalified laboratory confirmed only 5.7% active ingredient through HPLC assay. Product marketed as locally manufactured.'
    },
    {
      id: 3,
      productName: 'Fake Betaclox (Antibiotic)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 037/2025',
      dangerLevel: 'High',
      image: '/7.jpg',
      additionalImages: ['/77.jpg'],
      description: 'Substandard and falsified Betaclox (Ampicillin 250mg + Cloxacillin 250mg) with fraudulent NAFDAC registration number',
      identificationTips: [
        'NAFDAC Registration Number A4-4724 is fraudulent (belongs to different product - Mebendazole 500mg)',
        'Address shown as "128 MCC Road, Calabar" but genuine company is at "101 MCC Road, Calabar"',
        'Batch No. 230701, Mfg Date: 07/2023, Exp Date: 07/2026',
        'Manufacturer shown as Saeny Laboratory Pvt Ltd, India'
      ],
      healthRisk: 'Substandard antibiotics lead to treatment failure and contribute to antimicrobial resistance. Infections remain untreated.',
      affectedBrands: ['Betaclox'],
      whereFound: 'Procured from Gambori Market, Maiduguri → distributed to Kano → sold in Zaria, Kaduna',
      alertDetails: 'Clear case of registration number misappropriation. Fraudulent use of company name and address.'
    },
    {
      id: 4,
      productName: 'Fake Cialis 20mg (Erectile Dysfunction)',
      declaredDate: 'November 2025',
      nafdacAlert: 'NAFDAC Alert No. 033/2025',
      dangerLevel: 'High',
      image: '/8.jpg',
      additionalImages: ['/88.jpg', '/888.jpg'],
      description: 'Counterfeit Cialis 20mg tablets discovered during routine market surveillance in Abuja',
      identificationTips: [
        'Sold at ₦8,000 per pack (genuine product costs ₦55,000)',
        'Packaging not consistent with authentic Cialis 20mg specifications',
        'Quality specifications do not match genuine product',
        'Huge price difference is major red flag'
      ],
      healthRisk: 'May contain no active ingredient, wrong ingredients, or harmful substances. Could cause serious health complications.',
      affectedBrands: ['Cialis (Tadalafil)'],
      whereFound: 'Openly sold in Abuja markets',
      alertDetails: 'Discovered by Chi Pharmaceutical Ltd (Marketing Authorisation Holder) field sales representatives during surveillance.'
    },
    {
      id: 5,
      productName: 'Fake VISITECT HIV Test Kits',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 011/2026',
      dangerLevel: 'Critical',
      image: '/3.jpg',
      additionalImages: ['/33.jpg', '/333.jpg'],
      description: 'Counterfeit and parallel-imported unregistered VISITECT CD4 Advanced Disease test kits',
      identificationTips: [
        'Counterfeit label displays 3-year shelf-life (2024-08 to 2027-01)',
        'NAFDAC approved only 18-month shelf-life',
        'Manufacturer shown as OMEGA DIAGNOSTICS LTD instead of genuine AccuBio Ltd',
        'Sold through unauthorised channels'
      ],
      healthRisk: 'Inaccurate HIV diagnostic results can lead to wrong treatment decisions, delayed care for patients with severe HIV, and potential death.',
      affectedBrands: ['VISITECT CD4 Advanced Disease'],
      whereFound: 'Unauthorised distribution channels',
      alertDetails: 'Confirmed by EURO SPECS International Nigeria Limited (MAH). Critical for HIV patient triage in resource-limited settings.'
    },
    {
      id: 6,
      productName: 'Discontinued Antimalarial Suspensions',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 009/2026',
      dangerLevel: 'High',
      image: '/4.jpg',
      additionalImages: [],
      description: 'ALL multi-dose Artemether/Lumefantrine dry powder oral suspensions discontinued due to instability',
      identificationTips: [
        'Includes brands: Lokmal, Havax, Paludex, Winart, Biolumefar, Fanetha, Artemelum, Cikatem, Bellartem',
        'Any multi-dose antimalarial suspension is now unregistered',
        'NAFDAC no longer accepts applications for these formulations',
        'Manufacturers must switch to dispersible tablets or single-dose sachets'
      ],
      healthRisk: 'Reconstituted suspensions are unstable and lose efficacy. Treatment failure leads to worsening malaria, complications, and potential death.',
      affectedBrands: ['ALL multi-dose artemether/lumefantrine suspensions'],
      whereFound: 'May still be in circulation despite discontinuation',
      alertDetails: 'Regulatory directive based on stability studies. Public reminder of Alert No. 01/2025.'
    },
    {
      id: 7,
      productName: 'Fake Dermazin Cream (Burn Treatment)',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 005/2026',
      dangerLevel: 'Medium',
      image: '/5.jpg',
      additionalImages: [],
      description: 'Counterfeit Dermazin (1% Silver Sulphadiazine) Cream falsely claiming production by Taylek Drugs Company',
      identificationTips: [
        'Font style different from original - counterfeit shows bolder font stating "DERMAZIN"',
        'Colors on packaging are faded compared to original',
        'Falsely claims production by Taylek Drugs Company Limited',
        'Poor packaging quality'
      ],
      healthRisk: 'Counterfeit burn cream may not provide proper antibacterial protection, leading to burn wound infections and delayed healing.',
      affectedBrands: ['Dermazin (Silver Sulphadiazine)'],
      whereFound: 'Reported to NAFDAC by legitimate manufacturer',
      alertDetails: 'Complaint received from Taylek Drugs Company Limited about counterfeit using their name.'
    },
    {
      id: 8,
      productName: 'Unauthorized Risperdal 2mg (Psychiatric)',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 003/2026',
      dangerLevel: 'High',
      image: '/6.jpg',
      additionalImages: [],
      description: 'Unauthorised Risperdal 2mg tablets diverted from Turkish market to Nigeria',
      identificationTips: [
        'Turkish text on packaging ("Kullanma talimatını okumadan araç/makine kullanmayınız")',
        'Batch manufactured for Turkish market, not authorised for Nigeria',
        'Purchased outside authorised Johnson & Johnson distribution network',
        'Found specifically in Kaduna state'
      ],
      healthRisk: 'Unregistered products have not undergone NAFDAC evaluation. Safety, quality, and effectiveness cannot be assured. May be counterfeit, falsified, stolen, or recalled.',
      affectedBrands: ['Risperdal (Risperidone)'],
      whereFound: 'Kaduna state - illegally diverted from Turkey',
      alertDetails: 'Johnson & Johnson confirmed batch intended for Turkish market. Product for treating schizophrenia, bipolar disorder, autism.'
    },
    {
      id: 9,
      productName: 'Fake Phesgo (Breast Cancer Drug)',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 014/2026',
      dangerLevel: 'Critical',
      image: '/2nd_Fake.jpg',
      additionalImages: [],
      description: 'Counterfeit Phesgo 600mg with non-existent batch numbers reported in multiple countries',
      identificationTips: [
        'Batch numbers B2346B16 and C3809C5 do not exist in Roche database',
        'Batch C3809C5 vial volume approximately 20mL instead of expected 10mL',
        'Incorrect text and variable data on packaging',
        'GTIN does not correspond to any genuine GTIN',
        'Tamper-evidence label missing',
        'Manufacturing site not visible in photos'
      ],
      healthRisk: 'Fake breast cancer medication may contain no active ingredient or harmful substances. Treatment failure can lead to cancer progression and death.',
      affectedBrands: ['Phesgo (Pertuzumab/Trastuzumab)'],
      whereFound: 'Lagos University Teaching Hospital (LUTH-NSIA) - brought in by patients. Also reported in Turkey and Philippines.',
      alertDetails: 'Same fake batch number B2346B16 reported in confirmed counterfeit complaints from multiple countries.'
    },
    {
      id: 10,
      productName: 'Unauthorized Darzalex (Cancer Drug)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 031/2025',
      dangerLevel: 'Critical',
      image: '/9.jpg',
      additionalImages: [],
      description: 'Unregistered Darzalex (Daratumumab) 1800mg diverted from Indian and Arab markets',
      identificationTips: [
        'Product packaging designed for Indian or Arab markets',
        'Darzalex is NOT registered in Nigeria',
        'Cold-chain product requiring refrigeration',
        'Not purchased from authorised Johnson & Johnson distributors in Nigeria',
        'Batch No. PKS1F01 visible on packaging'
      ],
      healthRisk: 'Unregistered cold-chain cancer drug may have compromised potency due to improper storage. Treatment failure in multiple myeloma patients can be fatal.',
      affectedBrands: ['Darzalex (Daratumumab)'],
      whereFound: 'Nigeria - diverted from international markets',
      alertDetails: 'Johnson & Johnson investigation revealed diversion from Indian/Arab markets. Used for multiple myeloma treatment.'
    }
  ]

  const getDangerColor = (level) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-600 text-white'
      case 'High':
        return 'bg-orange-500 text-white'
      case 'Medium':
        return 'bg-yellow-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl mb-3 text-gray-900 flex items-center">
          <ShieldAlert className="mr-3 text-red-600" size={28} />
          NAFDAC Fake Drug Alerts
        </h2>
        <p className="text-gray-600">
          Real NAFDAC alerts on counterfeit, falsified, and unauthorized medications found in Nigeria. Learn to identify and avoid them.
        </p>
      </div>

      {/* Alert Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {fakeDrugAlerts.map((alert) => (
          <button
            key={alert.id}
            onClick={() => setSelectedAlert(alert)}
            className="bg-white border-2 border-red-200 rounded-xl p-3 hover:border-red-500 hover:shadow-lg transition-all group cursor-pointer text-left"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-3 relative bg-gray-100">
              <img
                src={alert.image}
                alt={alert.productName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${getDangerColor(alert.dangerLevel)}`}>
                {alert.dangerLevel}
              </div>
            </div>
            <h3 className="font-bold text-xs text-gray-900 mb-1 line-clamp-2">{alert.productName}</h3>
            <p className="text-xs text-gray-600">{alert.declaredDate}</p>
          </button>
        ))}
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg mb-8">
        <div className="flex">
          <AlertTriangle className="text-red-600 mr-3 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-red-900 mb-1">Critical Warning - Real NAFDAC Alerts</h3>
            <p className="text-sm text-red-800">
              These are REAL fake drugs that have been officially declared by NAFDAC. If you see any of these products, 
              DO NOT purchase or consume them. Report immediately to NAFDAC hotline: <strong>0800-NAFDAC (0800-623-322)</strong>
            </p>
          </div>
        </div>
      </div>

      {/* How to Spot Fake Drugs */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-xl mb-4 text-gray-900 flex items-center">
          <Eye className="mr-2 text-blue-600" size={24} />
          General Tips: How to Spot Fake Medications
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">Check the Package:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Look for spelling errors and poor printing</li>
              <li>• Verify NAFDAC number format is correct</li>
              <li>• Check for security features (holograms, seals)</li>
              <li>• Ensure professional printing quality</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">Check the Product:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Tablets should be uniform in size/color</li>
              <li>• Capsules should have clean, even seams</li>
              <li>• Verify expiry date is clear and properly printed</li>
              <li>• Check for proper batch numbers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">Purchase Safely:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Buy from licensed pharmacies only</li>
              <li>• Avoid roadside vendors and open markets</li>
              <li>• Be suspicious of unusually cheap prices</li>
              <li>• Ask for proof of pharmacy licensing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">When in Doubt:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Call NAFDAC hotline: 0800-NAFDAC</li>
              <li>• Check NAFDAC website for alerts</li>
              <li>• Consult a licensed pharmacist</li>
              <li>• Report suspicious products immediately</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAlert(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3 ${getDangerColor(selectedAlert.dangerLevel)}`}>
                    {selectedAlert.dangerLevel} Risk
                  </div>
                  <h2 className="font-bold text-2xl text-gray-900 mb-1">{selectedAlert.productName}</h2>
                  <p className="text-sm text-gray-600 mb-1">{selectedAlert.nafdacAlert}</p>
                  <p className="text-sm text-gray-600">Declared: {selectedAlert.declaredDate}</p>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Images */}
              <div className={`grid ${selectedAlert.additionalImages.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-6`}>
                <div className="rounded-xl overflow-hidden border-4 border-red-200">
                  <img
                    src={selectedAlert.image}
                    alt={selectedAlert.productName}
                    className="w-full h-64 object-contain bg-gray-50"
                  />
                </div>
                {selectedAlert.additionalImages.map((img, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border-2 border-red-200">
                    <img
                      src={img}
                      alt={`${selectedAlert.productName} ${index + 2}`}
                      className="w-full h-64 object-contain bg-gray-50"
                    />
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedAlert.description}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Affected Products</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedBrands.map((brand, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Where Found</h3>
                  <p className="text-gray-700">{selectedAlert.whereFound}</p>
                </div>

                {selectedAlert.alertDetails && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Alert Details</h3>
                    <p className="text-gray-700">{selectedAlert.alertDetails}</p>
                  </div>
                )}

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                    <Eye size={18} className="mr-2" />
                    How to Identify This Fake
                  </h3>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {selectedAlert.identificationTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                  <h3 className="font-bold text-red-900 mb-2 flex items-center">
                    <AlertTriangle size={18} className="mr-2" />
                    Health Risk
                  </h3>
                  <p className="text-sm text-red-800">{selectedAlert.healthRisk}</p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">What To Do If You Have This Product</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. DO NOT consume the medication</li>
                    <li>2. Keep the packaging and receipt as evidence</li>
                    <li>3. Report to NAFDAC: <strong>0800-NAFDAC (0800-623-322)</strong></li>
                    <li>4. Email: <strong>sf.alert@nafdac.gov.ng</strong></li>
                    <li>5. Report to the pharmacy where purchased</li>
                    <li>6. Warn family and friends</li>
                    <li>7. Seek medical attention if you've already consumed it</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

