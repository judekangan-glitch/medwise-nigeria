export const ANTIBIOTIC_DATA = [
  {
    id: 1,
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    images: [
      '/amoxicillin-250mg-capsules_.jpg',
      '/Amoxicillin-500mg-caps-3-scaled.webp'
    ],
    commonBrands: ['Amoxytor', 'Ranmoxy', 'Amoxil'],
    forms: {
      en: ['Capsules', 'Suspension', 'Tablets'],
      pidgin: ['Capsule', 'Syrup', 'Tablet'],
      ha: ['Kwayoyin magani', 'Magani mai ruwa', 'Kwayoyin magani masu fadi'],
      yo: ['Ògùn oníkóró', 'Ògùn olómi', 'Ògùn onípáálì'],
      ig: ['Mkpụrụ ọgwụ', 'Ọgwụ mmiri', 'Mkpụrụ ọgwụ dị larịị']
    },
    appearance: {
      en: 'Red/white or red/yellow capsules',
      pidgin: 'Red/white or red/yellow capsule',
      ha: 'Kwayoyin magani ja da fari ko ja da rawaya',
      yo: 'Ògùn pupa àti funfun tàbí pupa àti pupa-yẹ́lò',
      ig: 'Mkpụrụ ọgwụ chaworo ọbara ọbara na ọcha ma ọ bụ ọbara ọbara na odo odo'
    },
    commonUses: {
      en: ['Respiratory tract infections', 'Ear infections', 'Urinary tract infections', 'Skin infections'],
      pidgin: ['Cough wey bad', 'Ear pain', 'Heat for urine', 'Body scratch'],
      ha: ['Ciwon kirji', 'Ciwon kunne', 'Ciwon fitsari', 'Ciwon fata'],
      yo: ['Àìsàn àyà', 'Dun-un etí', 'Ìṣòro títọ́', 'Àìsàn awọ ara'],
      ig: ['Ọrịa obi', 'Ebere ntị', 'Nsogbu mmamịrị', 'Ọrịa anụ ahụ']
    },
    dosageGuidelines: '250-500mg every 8 hours',
    warnings: {
      en: 'Complete full course even if symptoms improve. Tell doctor about penicillin allergies.',
      pidgin: 'Finish all the medicine even if you don well. Tell doctor if medicine dey do you somehow.',
      ha: 'Gama dukkan maganin koda ka ji sauki. Faɗa wa likita idan magani yana yi maka illa.',
      yo: 'Parí gbogbo ògùn rẹ kódà bí ara rẹ bá ti yá. Sọ fún oníṣègùn bí ògùn bá n ṣe ọ́ ní jàǹbá.',
      ig: 'Mechaa ọgwụ gị niile ọbụlagodi na ahụ adịla gị mma. Gwa dọkịta ma ọ bụrụ na ọgwụ na-eme gị ihe ọzọ.'
    },
    nigerianContext: {
      en: 'One of the most commonly prescribed antibiotics in Nigeria.',
      pidgin: 'Dis medicine common well-well for Naija.',
      ha: 'Daya daga cikin magungunan da ake mafi amfani da su a Najeriya.',
      yo: 'Ọ̀kan nínú àwọn ògùn tí wọ́n n lò jù lọ ní Nàìjíríà.',
      ig: 'Otu n\'ime ọgwụ ndị a kacha aṅụ na Naịjirịa.'
    }
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
    forms: {
      en: ['Tablets', 'Capsules', 'Suspension', 'Eye/Ear drops'],
      pidgin: ['Tablet', 'Capsule', 'Syrup', 'Drop for eyes/ear'],
      ha: ['Kwayoyin magani', 'Kwayoyin magani masu fadi', 'Magani mai ruwa', 'Magani na ido da kunne'],
      yo: ['Ògùn onípáálì', 'Ògùn oníkóró', 'Ògùn olómi', 'Ògùn fún ojú àti etí'],
      ig: ['Mkpụrụ ọgwụ dị larịị', 'Mkpụrụ ọgwụ', 'Ọgwụ mmiri', 'Ọgwụ maka anya na ntị']
    },
    appearance: {
      en: 'Yellow/cream tablets or capsules',
      pidgin: 'Yellow or cream color tablet',
      ha: 'Kwayoyin magani masu launin rawaya ko fari',
      yo: 'Ògùn pupa-yẹ́lò tàbí oníkóró',
      ig: 'Mkpụrụ ọgwụ chaworo odo odo'
    },
    commonUses: {
      en: ['Urinary tract infections', 'Typhoid fever', 'Bacterial diarrhea', 'Respiratory infections'],
      pidgin: ['Heat for urine', 'Typhoid fever', 'Belle run', 'Cough'],
      ha: ['Ciwon fitsari', 'Zazzabin typhoid', 'Zawo', 'Ciwon kirji'],
      yo: ['Ìṣòro títọ́', 'Ìbà Typhoid', 'Ìgbẹ́ gbuuru', 'Àìsàn àyà'],
      ig: ['Nsogbu mmamịrị', 'Ịba typhoid', 'Otoro', 'Ọrịa obi']
    },
    dosageGuidelines: '500-750mg every 12 hours',
    warnings: {
      en: 'Avoid in children and pregnant women. May cause tendon problems. Avoid dairy products 2 hours before/after.',
      pidgin: 'No give pikin or pregnant woman. No drink milk two hours before or after you take am.',
      ha: 'Kada a ba yara da mata masu juna biyu. Kada a sha madara sa\'o\'i biyu kafin ko bayan shan magani.',
      yo: 'Máṣe fún ọmọdé tàbí aboyún. Máṣe lo wàrà ní wákàtí méjì ṣáájú tàbí lẹ́yìn tí o bá lo ògùn náà.',
      ig: 'Enyela ụmụaka na ụmụ nwaanyị dị ime. Aṅụla mmiri ara ehi awa abụọ tupu ma ọ bụ mgbe i ṅụchara ọgwụ a.'
    },
    nigerianContext: {
      en: 'Widely used for typhoid treatment in Nigeria.',
      pidgin: 'People dey use am well for typhoid for Naija.',
      ha: 'Ana amfani da shi sosai wajen maganin typhoid a Najeriya.',
      yo: 'Wọ́n n lò ó púpọ̀ fún ìtọ́jú ìbà typhoid ní Nàìjíríà.',
      ig: 'A na-aṅụ ya nke ukwuu maka ịba typhoid na Naịjirịa.'
    }
  }
]
