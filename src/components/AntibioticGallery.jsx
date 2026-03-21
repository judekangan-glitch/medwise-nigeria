import { useState } from 'react'
import { X, Pill, AlertCircle } from 'lucide-react'

export default function AntibioticGallery() {
  const [selectedAntibiotic, setSelectedAntibiotic] = useState(null)

  const antibiotics = [
    {
      id: 1,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      images: [
        '/amoxicillin-250mg-capsules_.jpg',
        '/Amoxicillin-500mg-caps-3-scaled.webp'
      ],
      commonBrands: ['Amoxytor', 'Ranmoxy', 'Amoxil'],
      forms: ['Capsules', 'Suspension', 'Tablets'],
      appearance: 'Red/white or red/yellow capsules',
      commonUses: [
        'Respiratory tract infections',
        'Ear infections',
        'Urinary tract infections',
        'Skin infections'
      ],
      dosageGuidelines: '250-500mg every 8 hours',
      warnings: 'Complete full course even if symptoms improve. Tell doctor about penicillin allergies.',
      nigerianContext: 'One of the most commonly prescribed antibiotics in Nigeria. Available in most pharmacies.'
    },
    {
      id: 2,
      name: 'Ciprofloxacin',
      genericName: 'Ciprofloxacin',
      images: [
        '/cipro_500mg.webp',
        '/cipro_750mg.webp'
      ],
      commonBrands: ['Ciproflox', 'Ciprotab', 'Cipro'],
      forms: ['Tablets', 'Capsules', 'Suspension', 'Eye/Ear drops'],
      appearance: 'Yellow/cream tablets or capsules',
      commonUses: [
        'Urinary tract infections',
        'Typhoid fever',
        'Bacterial diarrhea',
        'Respiratory infections'
      ],
      dosageGuidelines: '500-750mg every 12 hours',
      warnings: 'Avoid in children and pregnant women. May cause tendon problems. Avoid dairy products 2 hours before/after.',
      nigerianContext: 'Widely used for typhoid treatment in Nigeria. Often prescribed for travelers\' diarrhea.'
    },
    {
      id: 3,
      name: 'Metronidazole (Flagyl)',
      genericName: 'Metronidazole',
      images: [
        '/flagyl_200mg.webp',
        '/Flagyl-400mg-Tablets-Metronidazole-400mg-10-Tablets.jpg'
      ],
      commonBrands: ['Flagyl', 'Metrogyl', 'Metro'],
      forms: ['Tablets', 'Suspension', 'Injection', 'Pessaries'],
      appearance: 'White or yellow round tablets',
      commonUses: [
        'Amoebiasis and giardiasis',
        'Bacterial vaginosis',
        'Dental infections',
        'H. pylori treatment'
      ],
      dosageGuidelines: '200-400mg every 8 hours',
      warnings: 'NEVER take with alcohol - causes severe reaction. Avoid during first trimester of pregnancy.',
      nigerianContext: 'Essential for treating amoebic infections common in Nigeria. Often combined with other antibiotics.'
    },
    {
      id: 4,
      name: 'Azithromycin',
      genericName: 'Azithromycin',
      images: [
        '/Azithromycin-500mg-Tablets-3-Tablets-1-600x600.jpg',
        '/azithromycin_250mg.webp'
      ],
      commonBrands: ['Zithromax', 'Azithrocin', 'Aziwin'],
      forms: ['Tablets', 'Capsules', 'Suspension'],
      appearance: 'White/pink tablets or capsules, often in 3-day pack',
      commonUses: [
        'Respiratory infections',
        'Sexually transmitted infections',
        'Skin infections',
        'Ear infections'
      ],
      dosageGuidelines: '500mg once daily for 3 days OR 500mg day 1, then 250mg days 2-5',
      warnings: 'Take on empty stomach. May cause heart rhythm problems in some people.',
      nigerianContext: 'Popular for short-course treatment. Z-pack (3-day course) widely available.'
    },
    {
      id: 5,
      name: 'Ampiclox',
      genericName: 'Ampicillin + Cloxacillin',
      images: [
        '/Ampiclox_500mg.jpg',
        '/Ampiclox_250_250mg.webp'
      ],
      commonBrands: ['Ampiclox', 'Ampicloxacillin'],
      forms: ['Capsules', 'Injection'],
      appearance: 'Distinctive pink/black capsules',
      commonUses: [
        'Mixed bacterial infections',
        'Respiratory tract infections',
        'Skin and soft tissue infections',
        'Post-surgical infections'
      ],
      dosageGuidelines: '250-500mg every 6-8 hours',
      warnings: 'Tell doctor about penicillin allergies. Complete full course.',
      nigerianContext: 'Very popular combination antibiotic in Nigeria. The pink/black capsules are widely recognized.'
    },
    {
      id: 6,
      name: 'Septrin (Co-trimoxazole)',
      genericName: 'Sulfamethoxazole + Trimethoprim',
      images: [
        '/Septrinn.jfif',
        '/Septrin_suspension.webp'
      ],
      commonBrands: ['Septrin', 'Bactrim', 'Cotrim'],
      forms: ['Tablets', 'Suspension'],
      appearance: 'White tablets or orange/pink suspension',
      commonUses: [
        'Urinary tract infections',
        'Respiratory infections',
        'Traveler\'s diarrhea',
        'Prevention in HIV patients'
      ],
      dosageGuidelines: '2 tablets (960mg) every 12 hours',
      warnings: 'Drink plenty of water. Avoid if allergic to sulfa drugs. May cause skin reactions.',
      nigerianContext: 'Commonly prescribed for UTIs. Pediatric suspension widely used for children.'
    },
    {
      id: 7,
      name: 'Tetracycline',
      genericName: 'Tetracycline',
      images: [
        '/tetracyn-500mg-500x500.webp',
        '/tetracycline-tab_250mg.jpg'
      ],
      commonBrands: ['Tetracyn', 'Tetrex'],
      forms: ['Capsules', 'Tablets'],
      appearance: 'Red/black or yellow/pink capsules',
      commonUses: [
        'Acne',
        'Respiratory infections',
        'Cholera',
        'Rickettsial infections'
      ],
      dosageGuidelines: '250-500mg every 6 hours on empty stomach',
      warnings: 'NEVER give to children under 8 or pregnant women - causes tooth discoloration. Avoid dairy products.',
      nigerianContext: 'Still used for cholera treatment. Important to take on empty stomach for effectiveness.'
    },
    {
      id: 8,
      name: 'Augmentin',
      genericName: 'Amoxicillin + Clavulanic Acid',
      images: [
        '/Augmentin_1g.jpg',
        '/Augmentin.jpeg'
      ],
      commonBrands: ['Augmentin', 'Co-amoxiclav'],
      forms: ['Tablets', 'Suspension', 'Injection'],
      appearance: 'Purple or blue/white boxes, white tablets',
      commonUses: [
        'Resistant infections',
        'Respiratory tract infections',
        'Urinary tract infections',
        'Skin and soft tissue infections'
      ],
      dosageGuidelines: '625mg-1g every 8-12 hours',
      warnings: 'Take with food to reduce stomach upset. Complete full course.',
      nigerianContext: 'Premium antibiotic for resistant infections. More expensive than regular amoxicillin.'
    }
  ]

  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl mb-3 text-gray-900 flex items-center">
          <Pill className="mr-3 text-primary" size={28} />
          Common Nigerian Antibiotics Gallery
        </h2>
        <p className="text-gray-600">
          Learn to identify common antibiotics available in Nigerian pharmacies, their uses, and important safety information.
        </p>
      </div>

      {/* Antibiotic Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {antibiotics.map((antibiotic) => (
          <button
            key={antibiotic.id}
            onClick={() => setSelectedAntibiotic(antibiotic)}
            className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-lg transition-all group cursor-pointer text-left"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gray-100 relative">
              <img
                src={antibiotic.images[0]}
                alt={antibiotic.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">{antibiotic.name}</h3>
            <p className="text-xs text-gray-600">{antibiotic.genericName}</p>
          </button>
        ))}
      </div>

      {/* Educational Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex">
          <AlertCircle className="text-blue-600 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-bold text-blue-900 mb-1 text-sm">Important Safety Information</h3>
            <p className="text-xs text-blue-800">
              Always complete the full course of antibiotics as prescribed, even if you feel better. 
              Never share antibiotics or use leftover antibiotics from previous illnesses. 
              Consult a healthcare professional before taking any medication.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAntibiotic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAntibiotic(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="font-bold text-2xl text-gray-900 mb-1">{selectedAntibiotic.name}</h2>
                  <p className="text-gray-600">Generic: {selectedAntibiotic.genericName}</p>
                </div>
                <button
                  onClick={() => setSelectedAntibiotic(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Images */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedAntibiotic.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border-2 border-gray-200">
                    <img
                      src={image}
                      alt={`${selectedAntibiotic.name} ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Common Brand Names in Nigeria</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAntibiotic.commonBrands.map((brand, index) => (
                      <span key={index} className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Available Forms</h3>
                  <p className="text-gray-700">{selectedAntibiotic.forms.join(', ')}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Appearance</h3>
                  <p className="text-gray-700">{selectedAntibiotic.appearance}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Common Uses</h3>
                  <ul className="text-gray-700 space-y-1">
                    {selectedAntibiotic.commonUses.map((use, index) => (
                      <li key={index}>• {use}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Typical Dosage</h3>
                  <p className="text-gray-700">{selectedAntibiotic.dosageGuidelines}</p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                    <AlertCircle size={18} className="mr-2" />
                    Important Warnings
                  </h3>
                  <p className="text-sm text-yellow-800">{selectedAntibiotic.warnings}</p>
                </div>

                <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-2">Nigerian Context</h3>
                  <p className="text-sm text-green-800">{selectedAntibiotic.nigerianContext}</p>
                </div>

                <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg">
                  <h3 className="font-bold text-red-900 mb-2">Safety Reminders</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Always buy from licensed pharmacies only</li>
                    <li>• Check NAFDAC registration number on package</li>
                    <li>• Verify expiry date before use</li>
                    <li>• Store in cool, dry place away from children</li>
                    <li>• Consult a doctor or pharmacist if unsure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

