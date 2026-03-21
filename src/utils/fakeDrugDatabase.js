// Expanded NAFDAC Fake Drug Alerts Database (2025-2026)
export const getFakeDrugAlerts = () => {
  return [
    {
      id: 1,
      productName: 'Fake Avastin & Tecentriq (Cancer Drugs)',
      declaredDate: 'March 2026',
      nafdacAlert: 'NAFDAC Alert No. 015/2026',
      dangerLevel: 'Critical',
      dangerScore: 95,
      image: '/Fake_Avastin_Bevacizumab.jpg',
      description: 'Counterfeit Avastin 400mg/16ml and Tecentriq 1200mg/20ml in circulation',
      healthRisk: 'Treatment failure, disease progression, serious adverse events, and death from cancer',
      affectedBrands: ['Avastin', 'Tecentriq'],
      whereFound: 'Healthcare facilities across Nigeria',
      howToIdentify: 'Wrong batch numbers, poor print quality, tamper-evident label issues'
    },
    {
      id: 2,
      productName: 'Fake Ciprofit 500mg (Antibiotic)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 030B/2025',
      dangerLevel: 'Critical',
      dangerScore: 90,
      image: '/10.jpg',
      description: 'Contains only 5.7% ciprofloxacin (should be 90-110%)',
      healthRisk: 'Antibiotic resistance, treatment failure, serious infections',
      affectedBrands: ['Ciprofit'],
      whereFound: 'Various locations across Nigeria',
      howToIdentify: 'Laboratory testing shows insufficient active ingredient'
    },
    {
      id: 3,
      productName: 'Fake Betaclox (Antibiotic)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 037/2025',
      dangerLevel: 'High',
      dangerScore: 80,
      image: '/7.jpg',
      description: 'Substandard Ampicillin 250mg + Cloxacillin 250mg with fraudulent NAFDAC number',
      healthRisk: 'Treatment failure, antimicrobial resistance',
      affectedBrands: ['Betaclox'],
      whereFound: 'Maiduguri → Kano → Zaria, Kaduna distribution chain',
      howToIdentify: 'Wrong NAFDAC registration number, address mismatch'
    },
    {
      id: 4,
      productName: 'Fake Cialis 20mg (Erectile Dysfunction)',
      declaredDate: 'November 2025',
      nafdacAlert: 'NAFDAC Alert No. 033/2025',
      dangerLevel: 'High',
      dangerScore: 75,
      image: '/8.jpg',
      description: 'Counterfeit Cialis 20mg tablets sold at ₦8,000 vs genuine at ₦55,000',
      healthRisk: 'Unknown contents, potential heart/kidney damage',
      affectedBrands: ['Cialis'],
      whereFound: 'Abuja open markets',
      howToIdentify: 'Extremely low price, packaging inconsistencies'
    },
    {
      id: 5,
      productName: 'Fake VISITECT HIV Test Kits',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 011/2026',
      dangerLevel: 'Critical',
      dangerScore: 95,
      image: '/3.jpg',
      description: 'Counterfeit CD4 test kits with 3-year shelf-life (approved only 18-months)',
      healthRisk: 'Inaccurate HIV diagnosis, wrong treatment decisions, death',
      affectedBrands: ['VISITECT CD4'],
      whereFound: 'Unauthorized distribution channels',
      howToIdentify: 'Wrong shelf-life, incorrect manufacturer name'
    },
    {
      id: 6,
      productName: 'Discontinued Antimalarial Suspensions',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 009/2026',
      dangerLevel: 'High',
      dangerScore: 85,
      image: '/4.jpg',
      description: 'All multi-dose artemether/lumefantrine suspensions - DISCONTINUED due to instability',
      healthRisk: 'Unstable formulation, loss of efficacy, malaria treatment failure',
      affectedBrands: ['Lokmal', 'Havax', 'Paludex', 'Winart', 'Biolumefar', 'Fanetha', 'Artemelum'],
      whereFound: 'May still be in circulation',
      howToIdentify: 'Any multi-dose antimalarial suspension is now unregistered'
    },
    {
      id: 7,
      productName: 'Fake Dermazin Cream (Burn Treatment)',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 005/2026',
      dangerLevel: 'Medium',
      dangerScore: 60,
      image: '/5.jpg',
      description: '1% Silver Sulphadiazine falsely claiming Taylek Drugs as manufacturer',
      healthRisk: 'Wound infection, delayed healing',
      affectedBrands: ['Dermazin'],
      whereFound: 'General market circulation',
      howToIdentify: 'Faded colors, bolder font, poor quality packaging'
    },
    {
      id: 8,
      productName: 'Unauthorized Risperdal 2mg (Psychiatric)',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 003/2026',
      dangerLevel: 'High',
      dangerScore: 80,
      image: '/6.jpg',
      description: 'Turkish market diverted Risperdal 2mg tablets',
      healthRisk: 'Unregistered product, counterfeit risk',
      affectedBrands: ['Risperdal'],
      whereFound: 'Kaduna state',
      howToIdentify: 'Turkish language on packaging, not through authorized channels'
    },
    {
      id: 9,
      productName: 'Fake Phesgo (Breast Cancer Drug)',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 014/2026',
      dangerLevel: 'Critical',
      dangerScore: 95,
      image: '/2nd_Fake.jpg',
      description: 'Counterfeit Phesgo 600mg with non-existent batch numbers B2346B16 and C3809C5',
      healthRisk: 'Cancer treatment failure, death',
      affectedBrands: ['Phesgo'],
      whereFound: 'Lagos hospitals, Turkey, Philippines',
      howToIdentify: 'Batch numbers absent from Roche database, wrong vial volume'
    },
    {
      id: 10,
      productName: 'Unauthorized Darzalex (Cancer Drug)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 031/2025',
      dangerLevel: 'Critical',
      dangerScore: 90,
      image: '/9.jpg',
      description: 'Unregistered Darzalex 1800mg diverted from Indian and Arab markets',
      healthRisk: 'Multiple myeloma treatment failure, death',
      affectedBrands: ['Darzalex'],
      whereFound: 'Diverted international distribution',
      howToIdentify: 'Not authorized for Nigeria market'
    },
    {
      id: 11,
      productName: 'Fake Artesunate (Severe Malaria)',
      declaredDate: 'March 2026',
      nafdacAlert: 'NAFDAC Alert No. 017/2026',
      dangerLevel: 'Critical',
      dangerScore: 98,
      image: '',
      description: 'Counterfeit Artesunate IV formulation critically needed for severe malaria',
      healthRisk: 'Severe malaria treatment failure, cerebral malaria, death',
      affectedBrands: ['Artesunate'),
      whereFound: 'Healthcare facilities in northern Nigeria',
      howToIdentify: 'Verify batch through WHO-prequalified list of Artesunate manufacturers'
    },
    {
      id: 12,
      productName: 'Substandard Artemisinin-based Combinations (ACTs)',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 013/2026',
      dangerLevel: 'Critical',
      dangerScore: 90,
      image: '',
      description: 'Multiple substandard Artemether-Lumefantrine and DHA-Piperaquine tablets',
      healthRisk: 'Malaria treatment failure, drug resistance development',
      affectedBrands: ['Coartem (counterfeit)', 'Duocotex (substandard)'],
      whereFound: 'Rural and urban markets',
      howToIdentify: 'HPLC testing of blister packs required, look for retailers lacking cold chains'
    },
    {
      id: 13,
      productName: 'Fake Albendazole (Deworming)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 029/2025',
      dangerLevel: 'Medium',
      dangerScore: 65,
      image: '',
      description: 'Counterfeit Albendazole 400mg-200mg suspensions for school deworming programs',
      healthRisk: 'Worm infections persist, malnutrition in children',
      affectedBrands: ['Albenza (counterfeit)'],
      whereFound: 'School distribution programs',
      howToIdentify: 'Verify with NAFDAC batch tracking system'
    },
    {
      id: 14,
      productName: 'Unauthorized Praziquantel (Schistosomiasis)',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 006/2026',
      dangerLevel: 'High',
      dangerScore: 75,
      image: '',
      description: 'Unregistered Praziquantel formulations in endemic regions',
      healthRisk: 'Treatment failure for schistosomiasis, chronic organ damage',
      affectedBrands: ['Generic Praziquantel'],
      whereFound: 'Northwestern endemic zones',
      howToIdentify: 'Only use NAFDAC-registered formulations in mass campaigns'
    },
    {
      id: 15,
      productName: 'Fake Amoxicillin-Clavulanate Combinations',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 010/2026',
      dangerLevel: 'High',
      dangerScore: 80,
      image: '/Augmentin.jpeg',
      description: 'Substandard Amoxicillin 500mg + Clavulanic Acid 125mg tablets',
      healthRisk: 'Antibiotic resistance, treatment failure',
      affectedBrands: ['Augmentin (counterfeit)', 'Co-amoxiclav (substandard)'],
      whereFound: 'Lagos, Ibadan, Enugu markets',
      howToIdentify: 'Laboratory assay required - check active ingredient content'
    },
    {
      id: 16,
      productName: 'Fake Metronidazole (Flagyl) Tablets',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 007/2026',
      dangerLevel: 'High',
      dangerScore: 85,
      image: '/flagyl_200mg.webp',
      description: 'Counterfeit Metronidazole 400mg claiming various manufacturers',
      healthRisk: 'Amoebic infection treatment failure, parasitic persistence',
      affectedBrands: ['Flagyl (counterfeit)', 'Metro (substandard)'],
      whereFound: 'Widespread in southern Nigeria',
      howToIdentify: 'Compare with known pharmacy sources, verify NAFDAC number'
    },
    {
      id: 17,
      productName: 'Unauthorized Azithromycin Suspensions',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 027/2025',
      dangerLevel: 'Medium',
      dangerScore: 65,
      image: '/azithromycin_250mg.webp',
      description: 'Unregistered Azithromycin 200mg/5mL pediatric suspensions',
      healthRisk: 'Wrong dosing in children, treatment failure',
      affectedBrands: ['Azithrocin (pediatric)'],
      whereFound: 'Informal drug retailers',
      howToIdentify: 'Only use NAFDAC-approved pediatric formulations'
    },
    {
      id: 18,
      productName: 'Substandard Antimalarial Monotherapies',
      declaredDate: 'November 2025',
      nafdacAlert: 'NAFDAC Alert No. 025/2025',
      dangerLevel: 'Critical',
      dangerScore: 92,
      image: '',
      description: 'Quinine, Artemether, and Artesunate monotherapy tablets - now banned',
      healthRisk: 'Malaria resistance development, treatment failure',
      affectedBrands: ['All monotherapy malaria drugs'],
      whereFound: 'Still being sold illegally in some markets',
      howToIdentify: 'Use only WHO-approved artemisinin combination therapies (ACTs)'
    },
    {
      id: 19,
      productName: 'Fake Chloroquine (Malaria)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 028/2025',
      dangerLevel: 'High',
      dangerScore: 70,
      image: '',
      description: 'Fake Chloroquine 250mg tablets - not recommended but still sold',
      healthRisk: 'Complete treatment failure (P. falciparum resistant)',
      affectedBrands: ['Chloroquine generics'],
      whereFound: 'Rural areas, elderly patients',
      howToIdentify: 'NEVER use chloroquine for malaria - use ACTs instead'
    },
    {
      id: 20,
      productName: 'Unauthorized Ibuprofen + Paracetamol Combinations',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 008/2026',
      dangerLevel: 'Medium',
      dangerScore: 55,
      image: '',
      description: 'Unregistered NSAID combinations with incorrect strength ratios',
      healthRisk: 'Liver damage, kidney failure if overdosed',
      affectedBrands: ['Various generic pain combinations'],
      whereFound: 'OTC vendors and informal markets',
      howToIdentify: 'Check product's NAFDAC registration number'
    }
  ]
}

// Safety tips for identifying fake drugs
export const getSafetyTips = () => [
  {
    icon: '🏥',
    title: 'Buy from Licensed Pharmacies',
    description: 'Only purchase from registered NAFDAC-approved pharmacies and healthcare facilities'
  },
  {
    icon: '🔍',
    title: 'Check NAFDAC Number',
    description: 'Verify the NAFDAC registration number on packaging at nafdac.gov.ng'
  },
  {
    icon: '💰',
    title: 'Be Suspicious of Very Low Prices',
    description: 'If price is significantly lower than normal retail, it may be counterfeit'
  },
  {
    icon: '📦',
    title: 'Inspect Packaging Quality',
    description: 'Check for poor printing, misspellings, misaligned text, or faded colors'
  },
  {
    icon: '🔗',
    title: 'Verify Batch Numbers',
    description: 'Ask pharmacist to verify batch numbers with manufacturer if concerned'
  },
  {
    icon: '📱',
    title: 'Report Suspected Fakes',
    description: 'Call NAFDAC hotline: 01-4618080 or report online at nafdac.gov.ng'
  }
]
