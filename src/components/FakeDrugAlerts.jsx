import { useState } from 'react'
import { X, AlertTriangle, ShieldAlert, Eye } from 'lucide-react'
import { lang } from '../utils/translations'

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
      description: lang({en:'Counterfeit batches of Avastin (Bevacizumab) 400mg/16ml and Tecentriq (Atezolizumab) 1200mg/20ml circulating in Nigeria',pidgin:'Fake batches for Avastin and Tecentriq dey everywhere around Naija',ha:'Jabu na Avastin da Tecentriq suna yawo a Najeriya',yo:'Ayé ògùn akàn Ayédèrú fúnd iye po lori Avastin àti Tecentriq ńkiri tẹsiwájú ni Ile Nàìjíríà',ig:'Ngwongwo ezumike adịchaghị mma iwu gbasara  na Avastin na Tecentriq'}),
      identificationTips: [
        lang({en:'Batch numbers do not correspond to genuine Roche batches',pidgin:'Batch number no match Roche own',ha:'Lambar batch din ba ta dace da na Roche ba',yo:'Nwá ńkọ nòmbà  kò bá isẹ po roche',ig:'Ngwugwu akpa nọmbanaghị emegide maka ezigbo nke e mebere.'}),
        lang({en:'Differences in artwork and printing quality',pidgin:'Printing no fine like original',ha:'Ingancin bugun takardar ba shi da kyau',yo:'Ìfihàn àti títẹ̀ rẹ̀ kò dára',ig:'Na ezi nzụlite nbipụta adịghi nke oma '}),
        lang({en:'Wrong placement of text on packaging',pidgin:'Dem put words anyhow for body',ha:'an rubuta abu kuskure kan leda',yo:'A yera fún abawọn  eyi tó jẹ àṣìṣe lọ rẹrẹ.',ig:'Ihe ezighi ezi edeputara'}),
        lang({en:'Incorrect variable data',pidgin:'wrong info for body',ha:'Bayanai marasa fa`ida',yo:'Awọ̀n abajade onigbowo ',ig:'Mwụpụ mmụtakwụ ọnya adịchaghị'})
      ],
      healthRisk: lang({en:'Counterfeit oncology medicines may contain incorrect or no active ingredients. May result in treatment failure or death.',pidgin:'Fake cancer medicine fit kill person because e no get correct thing inside.',ha:'Maganin daji na bogi na iya kashe mutum domin ba shi da inganci.',yo:'Ògùn akàn ayédèrú lè pa ènìyàn nítorí kò ní èròjà kankan nínú.',ig:'Ọgwụ cancer adịgboroja nwere ike igbu mmadụ n\'ihi na o nweghị ihe ezigbo ya dị n\'ime.'}),
      affectedBrands: ['Avastin (Bevacizumab)', 'Tecentriq (Atezolizumab)'],
      whereFound: lang({en:'Healthcare facilities across Nigeria - sold at significantly lower prices (₦180,000-₦350,000)',pidgin:'Healthcare place dem across Naija dey sell am cheap',ha:'Kasuwancin Asibotoci a fadin najjeria',yo:'Ile itiju fún isinwin nàìjíríà tí wọn nta kù ni owó laya',ig:'Ụlọ oru ike nkụzi ahụ ike'}),
      alertDetails: lang({en:'Reported by Roche Nigeria after complaints from healthcare professionals. Patients brought counterfeit products to facilities.',pidgin:'Roche Nigeria report after people begin complain.',ha:'roche Najjeria ne ya bada jawabi ',yo:'Ọjọgbọn láti Roche jabo e wí.',ig:'Roche gosipụtara'})
    },
    {
      id: 2,
      productName: 'Fake Ciprofit 500mg (Antibiotic)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 030B/2025',
      dangerLevel: 'Critical',
      image: '/10.jpg',
      additionalImages: ['/100.jpg'],
      description: lang({en:'Falsified Ciprofloxacin 500mg tablets containing only 5.7% active ingredient (should be 90-110%)',pidgin:'Fake Cipro tablets wey almost no get medicine inside (only 5.7%).',ha:'Jabun maganin Ciprofloxacin wanda ba shi da inganci (kashi 5.7% kawai)',yo:'Ayédèrú ògùn Ciprofloxacin tá kò ní èròjà èròjà tó tó (5.7% nìkan)',ig:'Adịgboroja ọgwụ Ciprofloxacin nke na-enweghị ezigbo ọgwụ n\'ime (5.7% naanị)'}),
      identificationTips: [
        lang({en:'Falsely claims manufacture by Impact Pharmaceutical Ltd, Enugu',pidgin:'Dem lie say na Impact make am for Enugu',ha:'Masu sarrafar kaya sunyi karirin Kamfani',yo:'Ikede irọ fun ajọ ibise Impact',ig:'Ahịa ịgha ụgha mbiputa Enugu'}),
        lang({en:'Laboratory tested - contains only 5.7% ciprofloxacin',pidgin:'Testing show say medicine no dey inside well',ha:'Gwajin dakin gwada kashi 5',yo:'Àyẹ̀wò fihàn pè 5.7 nikan ni',ig:'Ahụike ule kachasi ike gosi'})
      ],
      healthRisk: lang({en:'Gross violation of quality standards leads to treatment failures and antimicrobial resistance. Infections will not be treated properly.',pidgin:'Dis medicine no go treat you and e go make your sickness strong pass medicine.',ha:'Wannan maganin ba zai warkar da kai ba kuma zai sa sanyi ya fi karfin maganin.',yo:'Ògùn yìí kò ní tọ́jú rẹ, yóò sì sọ àìsàn rẹ di alágbára ju ògùn lọ.',ig:'Ọgwụ a agaghị agwọ gị, ọ ga-eme ka ọrịa gị sie ike karịa ọgwụ.'}),
      affectedBrands: ['Ciprofit 500'],
      whereFound: lang({en:'Various locations in Nigeria',pidgin:'Everywhere for Naija',ha:'Kofai daban a najeiria',yo:'orikisi okan ninu ibi ni Nigeria',ig:'Otutu ebe ni nzụlite obodo'}),
      alertDetails: lang({en:'WHO-prequalified laboratory confirmed low active ingredient.',pidgin:'WHO test confirm say active power too low',ha:'Matakin wHo na asibiti yace basuda kyau gaskiya',yo:'WHO se àbádújú iwa naa pé kò dára',ig:'WHO e nyocha nke kacha jụọ'})
    },
    {
      id: 3,
      productName: 'Fake Betaclox (Antibiotic)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 037/2025',
      dangerLevel: 'High',
      image: '/7.jpg',
      additionalImages: ['/77.jpg'],
      description: lang({en:'Substandard and falsified Betaclox (Ampicillin 250mg + Cloxacillin 250mg) with fraudulent NAFDAC registration number',pidgin:'Fake Betaclox wey get fake NAFDAC number',ha:'Jabun Betaclox mai dauke da lambar NAFDAC ta bogi',yo:'Ayédèrú Betaclox tí ó ní nọ́mbà NAFDAC ti kò tọ́',ig:'Adịgboroja Betaclox nwere nọmba ndebanye NAFDAC adịgboroja'}),
      identificationTips: [
        lang({en:'NAFDAC Registration Number A4-4724 is fraudulent',pidgin:'NAFDAC Number A4-4724 na fake',ha:'Lambar NAFDAC A4-4724 ta bogi ce',yo:'Nọ́mbà NAFDAC A4-4724 jẹ́ ayédèrú',ig:'Nọmba NAFDAC A4-4724 bụ adịgboroja'}),
        lang({en:'Address shown as "128 MCC Road, Calabar" but genuine company is at 101',pidgin:'Dem put wrong address for Calabar',ha:'Adireshin da aka nuna a Calabar ba dai-dai bane',yo:'Àdírẹ́sì tí wọ́n fi hàn ní Calabar kò tọ́',ig:'Adreesị egosiri na Calabar abụghị eziokwu'})
      ],
      healthRisk: lang({en:'Substandard antibiotics lead to treatment failure and contribute to antimicrobial resistance.',pidgin:'Bad antibiotics like dis no go work and go make disease stubborn.',ha:'Magungunan da basu da inganci zasu sa ciwon ya ki warkewa.',yo:'Àwọn ògùn tí kò gún régé máa ń fa kí àìsàn pọ̀ sí i.',ig:'Ọgwụ adịghị mma na-ebute ọrịa ka ike.'}),
      affectedBrands: ['Betaclox'],
      whereFound: lang({en:'Procured from Gambori Market, Maiduguri → distributed to Kano → sold in Zaria, Kaduna',pidgin:'Dem buy am from Maiduguri, carry go Kano, come dey sell for Zaria and Kaduna',ha:'An sayo a Maiduguri, an raba a Kano, ana sayarwa a Zaria da Kaduna',yo:'Wọ́n rà á ní Maiduguri, wọ́n pín in sí Kano, wọ́n ń tà á ní Zaria àti Kaduna',ig:'A zụtara na Maiduguri, kesaa ya na Kano, na-ere na Zaria na Kaduna'}),
      alertDetails: lang({en:'Clear case of registration number misappropriation.',pidgin:'Clear matter of fake number use.',ha:'Bayyanannen lamari na amfani da lamba ba dai-dai ba.',yo:'Ẹ̀rí tó dán mọ́rán pé wọ́n lo nọ́mbà tí kò tọ́.',ig:'Ihe akaebe doro anya maka iji nọmba adịgboroja mee ihe.'})
    },
    {
      id: 4,
      productName: 'Fake Cialis 20mg (Erectile Dysfunction)',
      declaredDate: 'November 2025',
      nafdacAlert: 'NAFDAC Alert No. 033/2025',
      dangerLevel: 'High',
      image: '/8.jpg',
      additionalImages: ['/88.jpg', '/888.jpg'],
      description: lang({en:'Counterfeit Cialis 20mg tablets discovered during routine market surveillance in Abuja',pidgin:'Fake Cialis drug wey dem catch for Abuja market',ha:'Jabun kwayar Cialis wanda aka gano a kasuwar Abuja',yo:'Ayédèrú ògùn Cialis tí a rí ní ọjà Abuja',ig:'Adịgboroja ọgwụ Cialis achọtara na ahịa Abuja'}),
      identificationTips: [
        lang({en:'Sold at ₦8,000 per pack (genuine product costs ₦55,000)',pidgin:'Dem dey sell am ₦8,000 (Original na ₦55,000)',ha:'Ana sayarwa a kan ₦8,000 (na asali ₦55,000 ne)',yo:'Wọ́n ń tà á ní ₦8,000 (Ti gidi jẹ ₦55,000)',ig:'A na ere ya ₦8,000 (Ezigbo ya bụ ₦55,000)'}),
        lang({en:'Huge price difference is major red flag',pidgin:'The cheap price na big warning sign',ha:'Maganin yayi arha sosai wanda hakan abin lura ne',yo:'Owó ọjà tí ó kéré yìí jẹ́ àmì ìkìlọ̀',ig:'Ọnụ ala ya bụ ezigbo ihe ịdọ aka ná ntị'})
      ],
      healthRisk: lang({en:'May contain no active ingredient, wrong ingredients, or harmful substances.',pidgin:'E fit no get original medicine or e fit get bad bad things inside.',ha:'Zai iya kasancewa bashi da inganci ko yana da abubuwa masu cutarwa.',yo:'Lè má ní èròjà kankan tàbí kó ní èròjà tó léwu.',ig:'O nwere ike inwe ihe adịghị mma ma ọ bụ nke na - emerụ ahụ.'}),
      affectedBrands: ['Cialis (Tadalafil)'],
      whereFound: lang({en:'Openly sold in Abuja markets',pidgin:'Dem dey sell am open for Abuja market',ha:'Ana sayarwa a bayyane a kasuwannin Abuja',yo:'Wọ́n ń tà á ní gbangba ní ọjà Abuja',ig:'A na-ere ya n\'ihu ọha n\'ahịa Abuja'}),
      alertDetails: lang({en:'Discovered by Chi Pharmaceutical Ltd representatives.',pidgin:'Chi Pharmaceutical workers catch am.',ha:'Ma’aikatan Chi Pharmaceutical ne suka gano hakan',yo:'Àwọn òṣìṣẹ́ Chi Pharmaceutical ló rí i',ig:'Ndị ọrụ Chi Pharmaceutical chọtara ya'})
    },
    {
      id: 5,
      productName: 'Fake VISITECT HIV Test Kits',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 011/2026',
      dangerLevel: 'Critical',
      image: '/3.jpg',
      additionalImages: ['/33.jpg', '/333.jpg'],
      description: lang({en:'Counterfeit and parallel-imported unregistered VISITECT CD4 Advanced Disease test kits',pidgin:'Fake HIV test kit wey dem name VISITECT CD4 wey government no register',ha:'Jabun kayan awo na VISITECT CD4 na kwayar cutar HIV wanda ba a yi rajista ba',yo:'Àwọn ohun èlò àyẹ̀wò HIV ti VISITECT CD4 tí wọ́n jẹ́ ayédèrú tí kò sìn gba ìwé-àṣẹ',ig:'Ngwa nnwale HIV VISITECT CD4 adịgboroja nke edebanyeghị aha'}),
      identificationTips: [
        lang({en:'Counterfeit label displays 3-year shelf-life (2024-08 to 2027-01)',pidgin:'Fake label dey show say e go last 3 years',ha:'Ledar jabun na nuna zai yi amfani har shekaru 3',yo:'Lébẹ́ẹ̀lì ayédèrú fihàn pé ó máa pẹ́ fún ọdún 3',ig:'Adreesị adịgboroja na-egosi na ọ ga-adị mma maka afọ 3'}),
        lang({en:'NAFDAC approved only 18-month shelf-life',pidgin:'NAFDAC approve only 1 year and half for the original',ha:'NAFDAC ta amince da watanni 18 kacal don asali',yo:'NAFDAC fọwọ́ rọ́ oṣù 18 nìkan fún ti gidi',ig:'NAFDAC kwadoro naanị ọnwa 18 maka ezigbo ya'})
      ],
      healthRisk: lang({en:'Inaccurate HIV diagnostic results can lead to wrong treatment decisions and potential death.',pidgin:'Wrong HIV test fit make doc give bad treatment wey fit kill person.',ha:'Sakamakon gwajin HIV na bogi zai iya sa a bada magani ba dai-dai ba.',yo:'Àyẹ̀wò HIV tí kò tọ́ lè fa kí àwọn dọ́kítà ṣe ìpinnu ìtọ́jú tí kò tọ́.',ig:'Nnwale HIV na-ezighi ezi nwere ike ibute ọgwụgwọ adịghị mma.'}),
      affectedBrands: ['VISITECT CD4 Advanced Disease'],
      whereFound: lang({en:'Unauthorised distribution channels',pidgin:'Anyhow place wey sell drugs',ha:'Hanyoyin rarrabawa marasa izini',yo:'Àwọn ibi títà tí kò ní àṣẹ',ig:'Ebe nkesa enweghị ikike'}),
      alertDetails: lang({en:'Confirmed by EURO SPECS International Nigeria Limited.',pidgin:'EURO SPECS company don confirm am say na fake.',ha:'EURO SPECS International Nigeria Limited sun tabbatar',yo:'EURO SPECS fìdí rẹ̀ múlẹ̀',ig:'EURO SPECS kwadoro ya'})
    },
    {
      id: 6,
      productName: 'Discontinued Antimalarial Suspensions',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 009/2026',
      dangerLevel: 'High',
      image: '/4.jpg',
      additionalImages: [],
      description: lang({en:'ALL multi-dose Artemether/Lumefantrine dry powder oral suspensions discontinued due to instability',pidgin:'Dem don stop all Artemether/Lumefantrine malaria powder medicine because e no strong.',ha:'An dakatar da duk magungunan zazzabin cizon sauro na gari saboda basu da nagarta',yo:'Wọ́n ti dáwọ́ dúró fún gbogbo ògùn ibà tó jẹ́ lulú nítorí pé kò dára mọ́',ig:'A kwụsịla ọgwụ ịba niile bụ ntụ ntụ n\'ihi na adịghị mma'}),
      identificationTips: [
        lang({en:'Includes brands: Lokmal, Havax, Paludex, Winart, Biolumefar',pidgin:'E include: Lokmal, Havax, Paludex, Winart',ha:'Ya hada da: Lokmal, Havax, Paludex, Winart',yo:'Ó pẹ̀lú: Lokmal, Havax, Paludex, Winart',ig:'Ọ gụnyere: Lokmal, Havax, Paludex, Winart'}),
        lang({en:'Any multi-dose antimalarial suspension is now unregistered',pidgin:'Any malaria suspension for pikin don become illegal',ha:'Duk wani maganin cizon sauro na ruwa bai da rajista yanzu',yo:'Gbogbo ògùn ibà olómi kò ní ìwé-àṣẹ mọ́',ig:'Ọgwụ ịba mmiri ọ bụla enweghịzi ikike'})
      ],
      healthRisk: lang({en:'Reconstituted suspensions lose efficacy. Treatment failure leads to worsening malaria.',pidgin:'The medicine no go fit cure malaria again, and malaria fit kill pesin.',ha:'Maganin idan an hada shi da ruwa yana bata. Cutar zata kara lalacewa.',yo:'Ògùn yìí kò lágbára mọ́ tí a bá pò ó. Ibà yóò padà le.',ig:'Ọgwụ adịghịzi ike mgbe agwakọtara ya. Ịba nwere ike ịka njọ.'}),
      affectedBrands: ['ALL multi-dose artemether/lumefantrine suspensions'],
      whereFound: lang({en:'May still be in circulation despite discontinuation',pidgin:'E fit still dey market even as dem don ban am',ha:'Zai iya kasancewa ana ci gaba da sayarwa duk da an dakatar',yo:'Wọ́n ṣì le máa tà á nínú ọjà bí wọ́n tiẹ̀ ti kọ̀ ọ́',ig:'Ọ nwere ike ịka dị n\'ahịa n\'agbanyeghị na akwụsịla ya'}),
      alertDetails: lang({en:'Regulatory directive based on stability studies.',pidgin:'Government order based on medicine test.',ha:'Umarnin gwamnati bisa binciken magani.',yo:'Ìkìlọ̀ ìjọba látàrí àyẹ̀wò ògùn.',ig:'Iwu gọọmentị dabere na ule ọgwụ.'})
    },
    {
      id: 7,
      productName: 'Fake Dermazin Cream (Burn Treatment)',
      declaredDate: 'February 2026',
      nafdacAlert: 'NAFDAC Alert No. 005/2026',
      dangerLevel: 'Medium',
      image: '/5.jpg',
      additionalImages: [],
      description: lang({en:'Counterfeit Dermazin Cream falsely claiming production by Taylek Drugs',pidgin:'Fake Dermazin Cream wey claim say na Taylek make am',ha:'Jabun Dermazin Cream mai ikirarin cewa Taylek ne ya kera shi',yo:'Ayédèrú Dermazin Cream tó ń tànjẹ pé Taylek ló ṣe é',ig:'Adịgboroja Dermazin Cream na-ekwu na Taylek mere ya'}),
      identificationTips: [
        lang({en:'Font style different from original - bolder font on "DERMAZIN"',pidgin:'The font for "DERMAZIN" too bold pass normal',ha:'Rubutun "DERMAZIN" yayi gajarta sosai',yo:'Mímọ isalẹ yìí yatọ—"DERMAZIN" tóbi jù',ig:'Mkpuru okwu "DERMAZIN" dị oke mma karịa ka ọ dịkwa'}),
        lang({en:'Colors on packaging are faded compared to original',pidgin:'The color for pack don fade pass original',ha:'Launi a kan leda yayi kodadde',yo:'Àwọ̀ tó pọ̀n ti rẹ̀ lénu rẹ̀',ig:'Ụcha adịghị nke ọma na ngwugwu ahụ'})
      ],
      healthRisk: lang({en:'Counterfeit burn cream may not provide proper antibacterial protection, leading to burn wound infections',pidgin:'Fake burn cream fit make wound infection enter your body.',ha:'Jabun man konewa ba zai kare jiki daga kwayoyin cuta ba.',yo:'Ayédèrú ìpara fún egbò lè jẹ́ kí kòkòrò wọ inú ọgbẹ́.',ig:'Ude adịgboroja nwere ike ime ka ọrịa bata n\'ọnyá ọkụ.'}),
      affectedBrands: ['Dermazin (Silver Sulphadiazine)'],
      whereFound: lang({en:'Reported to NAFDAC by legitimate manufacturer',pidgin:'The legit company dem call NAFDAC for the matter',ha:'Kamfanin asali ne ya sanar da NAFDAC',yo:'Àwọn gidi tó ń ṣe é ló fi tó NAFDAC létí',ig:'Onye nwe mmezi gwara NAFDAC'}),
      alertDetails: lang({en:'Complaint received from Taylek Drugs Company Limited.',pidgin:'Taylek company self complain for dis one.',ha:'Akwai korafi daga kamfanin Taylek.',yo:'Wọ́n gba ẹ̀sùn láti ọwọ́ Taylek',ig:'E nwetara mkpesa n\'aka Taylek.'})
    },
    {
      id: 8,
      productName: 'Unauthorized Risperdal 2mg (Psychiatric)',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 003/2026',
      dangerLevel: 'High',
      image: '/6.jpg',
      additionalImages: [],
      description: lang({en:'Unauthorised Risperdal 2mg tablets diverted from Turkish market to Nigeria',pidgin:'Illegal Risperdal 2mg wey dem carry steal enter Naija from Turkey',ha:'Maganin Risperdal 2mg wanda ba a yarda da shi ba daga Turkiyya zuwa Najeriya',yo:'Ògùn Risperdal 2mg tí kò ní àṣẹ tí wọ́n kó láti Turkey wá sí Nàìjíríà',ig:'Ọgwụ Risperdal 2mg na-akwadoghị nke e si na Turkey weta na Naịjirịa'}),
      identificationTips: [
        lang({en:'Turkish text on packaging',pidgin:'The writing on top the pack na Turkey language',ha:'Rubutun Turkiyya a kan leda',yo:'Èdè Tọ́kì ló wà lára pákéèjì rẹ̀',ig:'Ede Turkey dị na ngwugwu ya'}),
        lang({en:'Purchased outside authorised Johnson & Johnson distribution network',pidgin:'Dem no buy am from the correct Johnson & Johnson sellers',ha:'Ba a saya daga hannun masu sayarwa na asali ba',yo:'Wọ́n kò rà wọ́n láti ọ̀dọ̀ àwọn olùtajà onígbàgbọ́',ig:'Azụtaghị ya n\'aka ezigbo ndị na-ere ahịa'})
      ],
      healthRisk: lang({en:'Unregistered products have not undergone NAFDAC evaluation. Safety cannot be assured.',pidgin:'Because NAFDAC never check am, we no fit sure say e safe for body.',ha:'NAFDAC bata tantance su ba, ba lallai ne su kasance masu aminci ba.',yo:'Àwọn ọjà tí kò sí lábẹ́ NAFDAC, a kò lè fọwọ́ sọ̀yà ààbò wọn.',ig:'Ngwaahịa edebanyeghị aha nwere ike ịdị ize ndụ n\'ihi na NAFDAC enyochaghị ha.'}),
      affectedBrands: ['Risperdal (Risperidone)'],
      whereFound: lang({en:'Kaduna state - illegally diverted from Turkey',pidgin:'Kaduna state - dem bring am illegal from Turkey',ha:'Jihar Kaduna - daga Turkiyya ba bisa ka\'ida ba',yo:'Ìpínlẹ̀ Kaduna - wọ́n kó o láti Turkey lọ́nà àìtọ́',ig:'Kaduna Steeti - e sitere Turkey weta ya n\'uzo iwu na-akwadoghị'}),
      alertDetails: lang({en:'Johnson & Johnson confirmed batch intended for Turkish market.',pidgin:'Johnson & Johnson say the market na for Turkey original.',ha:'Kamfanin ya tabbatar kasuwar Turkiyya aka yi ma.',yo:'Àwọn ilé iṣẹ́ pè ó yẹ fún ọjà Tọ́kì.',ig:'E gosiri na ọ bụ maka ahịa Turkey.'})
    },
    {
      id: 9,
      productName: 'Fake Phesgo (Breast Cancer Drug)',
      declaredDate: 'January 2026',
      nafdacAlert: 'NAFDAC Alert No. 014/2026',
      dangerLevel: 'Critical',
      image: '/2nd_Fake.jpg',
      additionalImages: [],
      description: lang({en:'Counterfeit Phesgo 600mg with non-existent batch numbers reported in multiple countries',pidgin:'Fake Phesgo with batch number wey no exist at all at all',ha:'Jabun Phesgo 600mg tare da lambobin batch da babu su',yo:'Ayédèrú Phesgo 600mg pẹ̀lú nọ́mbà iṣẹ́ tí kò sí rárá',ig:'Adịgboroja Phesgo 600mg nwere nọmba batch na-adịghị adị'}),
      identificationTips: [
        lang({en:'Batch numbers do not exist in Roche database',pidgin:'The numbers no dey Roche database',ha:'Lambobin basu cikin kundin kamfanin Roche',yo:'Àwọn nọ́mbà náà kò sí nínú ìwé Roche',ig:'Nọmba ndị ahụ adịghị n\'akwụkwọ Roche'}),
        lang({en:'Manufacturing site not visible in photos',pidgin:'You no go see where dem make am for the photo',ha:'Ba a gani wurin da aka yi a hotunan',yo:'Ibì tí wọ́n ti ṣe é kò hàn nínú àwọ̀rán',ig:'A hụghị ebe emere ya na foto ahụ'})
      ],
      healthRisk: lang({en:'Treatment failure can lead to cancer progression and death.',pidgin:'If the treatment fail, the cancer go strong pass before and fit kill.',ha:'Rashin aiki zai iya sa ciwon daji ya ci gaba har ya kawo mutuwa.',yo:'Ti ògùn kò bá ṣiṣẹ́, akàn yóò máa pọ̀ sí i, ó sì lè fa ikú.',ig:'Ọgwụghị ịrụ ọrụ nwere ike ime ka ọrịa cancer ka njọ ma kpatara ọnwụ.'}),
      affectedBrands: ['Phesgo (Pertuzumab/Trastuzumab)'],
      whereFound: lang({en:'Lagos University Teaching Hospital (LUTH)',pidgin:'Dem catch am for LUTH',ha:'Asibitin Koyarwa na Jami\'ar Legas (LUTH)',yo:'Ilé-ìwòsàn kọ́lẹ́jì ìṣègùn University of Lagos (LUTH)',ig:'Ụlọ Ọgwụ Nkụzi Mahadum Lagos (LUTH)'}),
      alertDetails: lang({en:'Confirmed counterfeit complaints from multiple countries.',pidgin:'Many countries don complain say na fake.',ha:'Kasashe daban daban sun kawo korafin jabun.',yo:'Àwọn orílẹ̀-èdè púpọ̀ ti fi ẹ̀sùn kan pé ayédèrú ni.',ig:'Ọtụtụ mba ekwuola na ọ bụ adịgboroja.'})
    },
    {
      id: 10,
      productName: 'Unauthorized Darzalex (Cancer Drug)',
      declaredDate: 'December 2025',
      nafdacAlert: 'NAFDAC Alert No. 031/2025',
      dangerLevel: 'Critical',
      image: '/9.jpg',
      additionalImages: [],
      description: lang({en:'Unregistered Darzalex (Daratumumab) 1800mg diverted from Indian/Arab markets',pidgin:'Fake Darzalex wey dem smuggle from Indian and Arab market enter Naija',ha:'Maganin Darzalex wanda ba rajista da aka karkatarda daga kasuwannin Indiya',yo:'Darzalex tí kò ní ìwé-àṣẹ tí wọ́n kó láti ọjà India/Arab',ig:'Darzalex edebanyeghị aha nke e si n\'ahịa Indian/Arab ebubata'}),
      identificationTips: [
        lang({en:'Darzalex is NOT registered in Nigeria',pidgin:'Darzalex no register for Naija at all',ha:'Maganin Darzalex bashi da rajista a Najeriya',yo:'Darzalex kò sí lábẹ́ ìforúkọsílẹ̀ Nàìjíríà',ig:'Edebanyeghị aha Darzalex na Naịjirịa'}),
        lang({en:'Cold-chain product requiring refrigeration',pidgin:'Na medicine wey suppose dey inside fridge',ha:'Maganin sanyi wanda yake bukatar ajiya a firiji',yo:'Ọjà yìí gbọ́dọ̀ wà nínú ẹ̀rọ amúlétùtù',ig:'Ngwaahịa kwesịrị ịdị n\'ime ngwa ntu oyi'})
      ],
      healthRisk: lang({en:'Unregistered cold-chain cancer drug may have compromised potency due to improper storage.',pidgin:'Because dem no store am for fridge well, e fit no work again and fit kill person.',ha:'Rashin ajiya mai kyau zai lalata karfin maganin.',yo:'Tí wọn kò bá tọ́jú rẹ̀ dáadáa sínú tútù, kò ní ṣiṣẹ́ mọ́.',ig:'Ọgwụ edebeghị na ntu oyi nke ọma nwere ike ghara ịrụ ọrụ.'}),
      affectedBrands: ['Darzalex (Daratumumab)'],
      whereFound: lang({en:'Nigeria - diverted from international markets',pidgin:'Naija - dem divert am from outside country',ha:'Najeriya - karkatarwa daga kasuwannin duniya',yo:'Nàìjíríà - wọ́n kó o láti òkè-òkun',ig:'Naịjirịa - esitere ná mba ofesi weta ya'}),
      alertDetails: lang({en:'Investigation revealed diversion from Indian/Arab markets.',pidgin:'Investigation show say na from India/Arab dem bring am.',ha:'Bincike ya nuna an karkatarda daga wasu kasashe.',yo:'Ìwádìí fihàn pé láti apá ilẹ̀ mìíràn ni wọ́n ti mú un wá.',ig:'Nnyocha gosiri na e si n\'ebe ọzọ weta ya.'})
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
          {lang({en:'NAFDAC Fake Drug Alerts',pidgin:'NAFDAC Warning For Fake Drugs',ha:'Gargadin NAFDAC Kan Jabun Magunguna',yo:'Ìkìlọ̀ Ògùn Ayédèrú Láti Ọwọ́ NAFDAC',ig:'Amụma Ọgwụ Adịgboroja NAFDAC'})}
        </h2>
        <p className="text-gray-600">
          {lang({en:'Real NAFDAC alerts on counterfeit, falsified, and unauthorized medications found in Nigeria. Learn to identify and avoid them.',pidgin:'Correct NAFDAC warning on top fake and bad medicine wey dem catch for Naija. Learn how to know dem and run from dem.',ha:'Gargadi na gaskiya daga NAFDAC kan jabun magunguna da aka gano a Najeriya. Koyi yadda zaka gane su kuma ka guje musu.',yo:'Àwọn ìkìlọ̀ gidi láti NAFDAC lórí àwọn ògùn ayédèrú tí wọ́n rí ní Nàìjíríà. Kọ́ bí a ṣe le mọ̀ wọ́n kí o sì yẹra fún wọn.',ig:'Ezigbo amụma NAFDAC gbasara ọgwụ adịgboroja ahụrụ na Naịjirịa. Mụta ka esi amata ha na izere ha.'})}
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
            <h3 className="font-bold text-red-900 mb-1">{lang({en:'Critical Warning - Real NAFDAC Alerts',pidgin:'Serious Warning - Real NAFDAC Alerts',ha:'Babban Gargadi - Gargadin NAFDAC Na Gaskiya',yo:'Ìkìlọ̀ Pàtàkì - Ìkìlọ̀ NAFDAC Gidi',ig:'Amụma Dị Mkpa - Ezigbo Amụma NAFDAC'})}</h3>
            <p className="text-sm text-red-800">
              {lang({en:'These are REAL fake drugs that have been officially declared by NAFDAC. If you see any of these products, DO NOT purchase or consume them. Report immediately to NAFDAC hotline: 0800-NAFDAC (0800-623-322)',pidgin:'Dis na REAL fake drugs wey NAFDAC don officially declare. If you see any of dis products, NO buy or chop dem. Report sharp sharp to NAFDAC hotline: 0800-NAFDAC (0800-623-322)',ha:'Wadannan JABUN magunguna ne na GASKE da NAFDAC ta bayyana a hukumance. Idan kaga ɗaya daga cikin waɗannan kayayyaki, KADA ka saya ko ka sha su. Kai rahoto nan take zuwa layin NAFDAC: 0800-NAFDAC (0800-623-322)',yo:'Àwọn wọ̀nyí ni àwọn ògùn ayédèrú GIDI tí NAFDAC ti kéde ní gbangba. Tí o bá rí èyíkéyìí nínú àwọn ọjà wọ̀nyí, MÁ ṢE rà tàbí lò wọ́n. Fi tó NAFDAC létí kíámọ́kíá: 0800-NAFDAC (0800-623-322)',ig:'Nke a bụ EZIGBO ọgwụ adịgboroja nke NAFDAC kwuputara na gọọmentị. Ọ bụrụ na ịhụ nke ọ bụla n\'ime ngwaahịa ndị a, AZỤLA ma ọ bụ ṅụọ ha. Kọnyere NAFDAC ozugbo na: 0800-NAFDAC (0800-623-322)'})}
            </p>
          </div>
        </div>
      </div>

      {/* How to Spot Fake Drugs */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-xl mb-4 text-gray-900 flex items-center">
          <Eye className="mr-2 text-blue-600" size={24} />
          {lang({en:'General Tips: How to Spot Fake Medications',pidgin:'General Advice: How to Catch Fake Medicine',ha:'Nasihu na Gaba Daya: Yadda Zaka Gane Jabun Magunguna',yo:'Àwọn Ìmọ̀ràn Gbogbogbò: Bí A Ṣe Le Mọ̀ Ògùn Ayédèrú',ig:'Ndụmọdụ Ozugbo: Otu Esi Amata Ọgwụ Adịgboroja'})}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">{lang({en:'Check the Package:',pidgin:'Check the Package:',ha:'Bincika Leda:',yo:'Ṣàyẹ̀wò Pákéèjì:',ig:'Lelee Ngwugwu:'})}</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• {lang({en:'Look for spelling errors and poor printing',pidgin:'Check for wrong spelling and bad printing',ha:'Nemi kurakurai na rubutu da mummunan bugu',yo:'Wá àṣìṣe ìpè àti títẹ̀ rẹ̀ tí kò dára',ig:'Chọọ njehie nsụpe na mbipụta adịghị mma'})}</li>
              <li>• {lang({en:'Verify NAFDAC number format is correct',pidgin:'Make sure say the NAFDAC number correct',ha:'Tabbatar tsarin lambar NAFDAC yayi daidai',yo:'Ríi dájú pé ọ̀nà kíkọ nọ́mbà NAFDAC wà lórí yíyẹ',ig:'Chọpụta na atụmakpu nọmba NAFDAC ziri ezi'})}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">{lang({en:'Check the Product:',pidgin:'Check the Medicine:',ha:'Bincika Maganin:',yo:'Ṣàyẹ̀wò Ọjà Náà:',ig:'Lelee Ngwaahịa Ahụ:'})}</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• {lang({en:'Tablets should be uniform in size/color',pidgin:'Tablets suppose be same size and color',ha:'Kwayoyin su kasance daidaici a girma da launi',yo:'Àwọn tabulẹti gbọdọ̀ jẹ́ bákan náà ní ìwọ̀n àti àwọ̀',ig:'Mkpụrụ ọgwụ kwesịrị ịdị n\'otu Nha na Agba'})}</li>
              <li>• {lang({en:'Capsules should have clean, even seams',pidgin:'Capsules suppose join well well without rough edge',ha:'Kapsul ya kasance mai tsafta kuma an haɗe sosai',yo:'Àwọn capsules gbọdọ̀ jẹ́ mímọ́ àti pẹ̀lú ìran kòòtù',ig:'Capsules kwesịrị isonyere nke ọma '})}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">{lang({en:'Purchase Safely:',pidgin:'Buy Am Safe:',ha:'Saya Lafiya:',yo:'Rà Pelu Aabo:',ig:'Zụta Na Nchekwa:'})}</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• {lang({en:'Buy from licensed pharmacies only',pidgin:'Buy from only pharmacy wey government register',ha:'Saya daga kantunan magunguna masu lasisi kawai',yo:'Rajà láti ọ̀dọ̀ ilé ẹ̀kọ́ fámásì tí ó wà lábẹ́ ìwé-àṣẹ nìkan',ig:'Zụta nanị n\'ụlọ ahịa ọgwụ nwere ikikere'})}</li>
              <li>• {lang({en:'Avoid roadside vendors and open markets',pidgin:'Run from medicine seller for road or open market',ha:'Guji masu siyarwa a bakin hanya da kasuwanni bude',yo:'Yẹra fún àwọn olùtajà lẹ́gbẹ̀ẹ́ tìtì àti àwọn ọjà ṣíṣí',ig:'Zere ndị na ere ahịa n\'okporo ụzọ '})}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">{lang({en:'When in Doubt:',pidgin:'If You Dey Confuse:',ha:'Idan Kana Da Kokwanto:',yo:'Tí O Bá Wà Nínú Iyèméjì:',ig:'Ọ Bụrụ Na I Nwere Obi Abụọ:'})}</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• {lang({en:'Call NAFDAC hotline: 0800-NAFDAC',pidgin:'Call NAFDAC hotline: 0800-NAFDAC',ha:'Kira layin NAFDAC: 0800-NAFDAC',yo:'Pe layin gbigbona NAFDAC: 0800-NAFDAC',ig:'Kpọọ nọmba NAFDAC: 0800-NAFDAC'})}</li>
              <li>• {lang({en:'Consult a licensed pharmacist',pidgin:'Meet register pharmacist make dem check am',ha:'Tuntuɓi masanin magunguna mai lasisi',yo:'Kàn sí abarapara oogun alawọ',ig:'Chọta onye na eresị ọgwụ na nwere akwụkwọ ikike'})}</li>
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
                    {lang({
                      en: `${selectedAlert.dangerLevel} Risk`,
                      pidgin: `${selectedAlert.dangerLevel} Danger`,
                      ha: `Hatsarin ${selectedAlert.dangerLevel}`,
                      yo: `Ewu ${selectedAlert.dangerLevel}`,
                      ig: `Ihe Ize Ndụ ${selectedAlert.dangerLevel}`
                    })}
                  </div>
                  <h2 className="font-bold text-2xl text-gray-900 mb-1">{selectedAlert.productName}</h2>
                  <p className="text-sm text-gray-600 mb-1">{selectedAlert.nafdacAlert}</p>
                  <p className="text-sm text-gray-600">{lang({en:'Declared:',pidgin:'Announced:',ha:'An bayyana:',yo:'Kede:',ig:'E Gosiri:'})} {selectedAlert.declaredDate}</p>
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
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Description',pidgin:'Matter Explain',ha:'Bayanin Lamari',yo:'Àlàyé',ig:'Ihe Nkowapụta'})}</h3>
                  <p className="text-gray-700">{selectedAlert.description}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Affected Products',pidgin:'Medicine Wey Cast',ha:'Magungunan Da Suka Shafa',yo:'Àwọn Ọjà Tí Ó Kàn',ig:'Ngwaahịa Metụtara'})}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedBrands.map((brand, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Where Found',pidgin:'Where Dem Catch Am',ha:'Inda Aka Samo',yo:'Ibi Tí A Ti Rí I',ig:'Ebe Achọtara'})}</h3>
                  <p className="text-gray-700">{selectedAlert.whereFound}</p>
                </div>

                {selectedAlert.alertDetails && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Alert Details',pidgin:'More Gist Onto Am',ha:'Cikakken Bayani Gargadi',yo:'Ẹ̀kúnrẹ́rẹ́ Ìkìlọ̀',ig:'Nkọwa Amụma'})}</h3>
                    <p className="text-gray-700">{selectedAlert.alertDetails}</p>
                  </div>
                )}

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                    <Eye size={18} className="mr-2" />
                    {lang({en:'How to Identify This Fake',pidgin:'How To Know Dis Fake One',ha:'Yadda Zaka Gane Wannan Jabun',yo:'Bí A Ṣe Lè Mọ̀ Ayédèrú Yìí',ig:'Otu Esi Amata Adịgboroja A'})}
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
                    {lang({en:'Health Risk',pidgin:'Health Danger',ha:'Hatsarin Lafiya',yo:'Ewu Ìlera',ig:'Ihe Ize Ndụ Ahụike'})}
                  </h3>
                  <p className="text-sm text-red-800">{selectedAlert.healthRisk}</p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2">{lang({en:'What To Do If You Have This Product',pidgin:'Wetin Make You Do If You Get Am',ha:'Abin Da Zaka Yi Idan Kana Da Wannan Maganin',yo:'Ohun Tí O Lè Ṣe Tí O Bá Ní Ọjà Yìí',ig:'Ihe I Kwesịrị Ime Ọ Bụrụ Na I Nwere Ngwaahịa A'})}</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. {lang({en:'DO NOT consume the medication',pidgin:'NO CHOP the medicine at all',ha:'KADA KA sha maganin',yo:'MÁ ṢE lo ògùn náà',ig:'A ṄỤLA ọgwụ ahụ'})}</li>
                    <li>2. {lang({en:'Keep the packaging and receipt as evidence',pidgin:'Keep the pack and receipt as proof',ha:'Ajiye leda da rasiti matsayin shaida',yo:'Tọ́jú pákéèjì àti ìwé ẹ̀rí gẹ́gẹ́ bí ẹ̀rí',ig:'Dobe ngwugwu na nnata dị ka ihe akaebe'})}</li>
                    <li>3. {lang({en:'Report to NAFDAC',pidgin:'Report to NAFDAC',ha:'Kai Rahoto NAFDAC',yo:'Fi Tó NAFDAC Létí',ig:'Kọnyere NAFDAC'})}: <strong>0800-NAFDAC (0800-623-322)</strong></li>
                    <li>4. Email: <strong>sf.alert@nafdac.gov.ng</strong></li>
                    <li>5. {lang({en:'Report to the pharmacy where purchased',pidgin:'Report to pharmacy wey you from buy am',ha:'Kai rahoto ga kantin magani inda ka saya',yo:'Fi tó fámásì tí o ti rà á létí',ig:'Kọnyere ụlọ ahịa ọgwụ ebe ị zụrụ ya'})}</li>
                    <li>6. {lang({en:'Warn family and friends',pidgin:'Tell your family and guys make dem know',ha:'Gargadi iyali da abokan arziki',yo:'Kìlọ̀ fún ẹbí àti ọ̀rẹ́',ig:'Dọ ndị ezinụlọ na ndị enyi aka na ntị'})}</li>
                    <li>7. {lang({en:'Seek medical attention if you\'ve already consumed it',pidgin:'Go see doc quick if you don chop am already',ha:'Nemi kulawar likita idan har ka riga ka sha',yo:'Wá ìkíyèsí ìṣègùn tí o bá ti lò ó',ig:'Chọọ nlekọta ahụike ma ọ bụrụ na ị ṅụọla ya'})}</li>
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

