import { useState } from 'react'
import { X, Pill, AlertCircle } from 'lucide-react'
import { lang } from '../utils/translations'

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
      appearance: lang({en:'Red/white or red/yellow capsules',pidgin:'Red/white or red/yellow capsule',ha:'Jar fatu mai fari ko rawaya',yo:'Capsule pupa àti funfun tàbí pẹ̀lú yẹló',ig:'Ogwu capsule uhie na ọcha ma ọ bụ uhie na odo'}),
      commonUses: [
        lang({en:'Respiratory tract infections',pidgin:'Chest and breathing sickness',ha:'Cutar iska a kuturu',yo:'Àrùn ọ̀nà mí',ig:'Ọrịa akwara ume'}),
        lang({en:'Ear infections',pidgin:'Ear sickness',ha:'Cutar kunne',yo:'Àrùn etí',ig:'Ọrịa ntị'}),
        lang({en:'Urinary tract infections',pidgin:'Toilet infection',ha:'Lokaci ko cuta wajen fitsari',yo:'Àrùn ibi itọ́',ig:'Ọrịa mamịrị'}),
        lang({en:'Skin infections',pidgin:'Skin sickness',ha:'Cutar fata',yo:'Àrùn awọ',ig:'Ọrịa akpụkpọ ahụ'})
      ],
      dosageGuidelines: lang({en:'250-500mg every 8 hours',pidgin:'250-500mg every 8-8 hours',ha:'250-500mg kowanne awa 8',yo:'250-500mg ni gbogbo wakati 8',ig:'Nnukwu 250-500mg abalị asatọ n\'oge abụọ'}),
      warnings: lang({en:'Complete full course even if symptoms improve. Tell doctor about penicillin allergies.',pidgin:'Finish am even if you dey well. Tell doc if penicillin dey give you allergic reaction.',ha:'Kammala shan magani koda kana jin dadi. Sanar da likita idan baka son maganin penicillin.',yo:'Lo gbogbo ogun yii daadaa bí o tilẹ̀ jẹ pé ara rẹ yá. Sọ fún dọ́kítà nipa àìsàn kọ́kọ́mọ́ penicillin.',ig:'Gbaa ụbọchị ihe ruru ọbụna ma ị chọpụta na ọ dịkwa mma. Gwa dọkịta maka nsogbu ahu penicillin.'}),
      nigerianContext: lang({en:'One of the most commonly prescribed antibiotics in Nigeria. Available in most pharmacies.',pidgin:'E dey everywhere for Naija put inside pharmacies. Doctors dey quick give am out.',ha:'Ɗaya daga cikin magungunan da aka fi sayarwa a Najeriya kuma kusan a kowane kemis.',yo:'Lára àwọn ogún tí wọ́n máa ń pín wọpọ̀ ní Nàìjíríà nínú ọ̀pọ̀ ilé ìtaja.',ig:'Ọgwụ a ma ama e nyere ndị mmadụ n\'Naijiria na ahịa niile.'})
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
      appearance: lang({en:'Yellow/cream tablets or capsules',pidgin:'Yellow or cream tablets/capsules',ha:'Kwayoyin rawaya ko fari-fari',yo:'Oògùn funfun yẹ́lò tàbí capsule',ig:'Ọgwụ odo na-acha ude akwụkwọ'}),
      commonUses: [
        lang({en:'Urinary tract infections',pidgin:'Toilet infection',ha:'Cutar hanyar fitsari',yo:'Àrùn orí itọ́',ig:'Ọrịa akụkụ mmamịrị'}),
        lang({en:'Typhoid fever',pidgin:'Typhoid sickness',ha:'Zazzabin Taifot',yo:'Iba Tàífọ́ọ̀dù',ig:'Ịba ịba typhoid'}),
        lang({en:'Bacterial diarrhea',pidgin:'Running belly wey bacteria bring',ha:'Tsutsar ciki ko gudawa',yo:'Igbe gbuuru afọ',ig:'Anya ngwangba ikpọnwụ'}),
        lang({en:'Respiratory infections',pidgin:'Chest sickness',ha:'Cututtukan numfashi',yo:'Inura ọ̀nà ẹmi',ig:'Ọrịa iku ume'})
      ],
      dosageGuidelines: lang({en:'500-750mg every 12 hours',pidgin:'500-750mg every 12 hours',ha:'500-750mg kowanne awa 12',yo:'500-750mg ní gbogbo ukatí mejila',ig:'250-750mg kwa elekere irí na abụọ'}),
      warnings: lang({en:'Avoid in children and pregnant women. May cause tendon problems. Avoid dairy products 2 hours before/after.',pidgin:'Pikin and pregnant women no suppose chop am. E fit pain muscle. No take milk 2 hours before or after am.',ha:'A guji basu yara da mata masu ciki. Zai iya sa ciwon tsoka, ka nisanta madara ko wani abu mai abubuwan kiwo awa 2 kafin ka sha.',yo:'Yẹra fun lilo gbogbo fun omode tabi alaboyun. Le fa ìṣòro isan. Yẹra fun ounjẹ oni-wara ṣaaju tabi lẹhin lilo ni wákàtí 2.',ig:'Na emenyela ụmụaka ma ọ bụ ụmụnwaanyị di ime. Ọ nwere ike iba ahụ́ nke isusu agbama. Gbara ngwa mmiri site iche ịdị ike.'}),
      nigerianContext: lang({en:'Widely used for typhoid treatment in Nigeria. Often prescribed for travelers\' diarrhea.',pidgin:'Dem dey use am wella cure typhoid for Naija matter. If you catch runny belly, na him dey sure.',ha:'An fi amfani da shi domin cutar zazzabin taifot da gudawar abinci masu tafiya a Najeriya.',yo:'Ayé n lo daradara fún iba typhoid nile Naijiria, bẹẹ̀ wọn á le fún ẹniti njà igbẹ́.',ig:'Enyere ihe dị na Nàìjíríà oge okpomoku typhoid; ọgbụgbọ ịba n\'elu enwekwara ikike pụrụ ije.'})
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
      appearance: lang({en:'White or yellow round tablets',pidgin:'White or yellow round medicine',ha:'Kwaya fari ko rawaya masu zagaye',yo:'Ẹyọ yékèyékè wín wín aláwọ̀ fúfun tàbi yẹ́lò',ig:'Okirikiri ọchá nwere mpụta gbara odo odo'}),
      commonUses: [
        lang({en:'Amoebiasis and giardiasis',pidgin:'Stomach amoeba problem',ha:'Cutar tsutsar ciki kaman Giardia',yo:'Wàhálà oní kòkòrò inú',ig:'Okpukpu anya gburugburu arụ ọrụ afọ'}),
        lang({en:'Bacterial vaginosis',pidgin:'Woman under sickness',ha:'Cutar gaban mace',yo:'Àrùn idun abo',ig:'Ọrịa anụ ahụ nwanyị gbu'}),
        lang({en:'Dental infections',pidgin:'Tooth sickness',ha:'Cutar hakori',yo:'Kokoro Eyi tàbí eyín',ig:'Aka ọkài ebe ezè n\'egosi'}),
        lang({en:'H. pylori treatment',pidgin:'Ulcer treatment',ha:'Maganin tsutar jikin ciki wadda ke kawo Ulsa',yo:'Àpẹrẹ ẹdọ inu tí ń fa iwájú ọgbẹ',ig:'Mgbochi nchọpụta akwara ịhụnanya afọ nke ọma'})
      ],
      dosageGuidelines: lang({en:'200-400mg every 8 hours',pidgin:'200-400mg every 8 hours',ha:'200-400mg kowanne awa 8',yo:'200-400mg ní gbogbo wakati 8',ig:'Nke gbuogburu elekere abalị kachakwasikya asaatọ'}),
      warnings: lang({en:'NEVER take with alcohol - causes severe reaction. Avoid during first trimester of pregnancy.',pidgin:'NO take alcohol with am at all at all! Pregnant women wey just start belle no make you take am.',ha:'Kada a taba hadawa da giya- zai yi wani munnan aiki mai ban tsoro. Misu tsakanin tayi kada su sha a ciki wata uku farkon ciki.',yo:'MAṢE munu oti bí o bá ti lówóoògùn—le fa iṣoro buruku. Àwọn aláboyún kí wọ́n da mọ lọṣẹ iwá.',ig:'AÑA añala okwu na mmanya - ọ ga ebute nsogbu jọrọ njọ maka ahụ. Zekwa imé ihu ọnwa mbụ'}),
      nigerianContext: lang({en:'Essential for treating amoebic infections common in Nigeria. Often combined with other antibiotics.',pidgin:'Dis drug strong well well to kill Amoeba infections for Naija. Dem dey like combine am with out medicine.',ha:'Magani mai karfi don cire ciki inda wasu kwari kamar amoeba ta sa cutar ta daidai a Nigeria.',yo:'O je ti koko fún ipo inu arun amoeba ní Nigeria paapaa; wọ́n sì máa ń lo pẹ̀lú oniruru ọgùn yòókù',ig:'Ihe kachasị amasị ya gbadosie Ọrịa agba obodo na abata onye ezinwanyi mmụọ a na-atụ otụtụ Ndi obodo.'})
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
      appearance: lang({en:'White/pink tablets or capsules, often in 3-day pack',pidgin:'White or pink drug, e dey most times inside 3-days pack',ha:'Maganin fari/ko ruwan hoda akusa da shi don kawan ki 3',yo:'Ògùn fúfuin/tí o yì padà sí píńkì tí o máa ń parí lẹ́yìn ọjọ́ 3',ig:'Ọgwụ okike ọcha na oroma wute ụbọchị atọ'}),
      commonUses: [
        lang({en:'Respiratory infections',pidgin:'Chest sickness',ha:'Cututtukan numfashi',yo:'Àrùn ohun ti nmi',ig:'Ọrịa akwara iku ume'}),
        lang({en:'Sexually transmitted infections',pidgin:'Sickness person go catch from meetin',ha:'Cutar saduwa na sanyi',yo:'Àrùn iniyipo ifenukonu',ig:'Nsogbu nke Onye nkwurịta mmekọahụ tọsịrị '}),
        lang({en:'Skin infections',pidgin:'Skin sickness',ha:'Cutar Fata',yo:'Àwọn àrùn awọ́',ig:'Ahụ ike nsogbu ịgba n\'ahụ'}),
        lang({en:'Ear infections',pidgin:'Ear sickness',ha:'Cutar Kunne',yo:'Ẹkù eti iníyẹ̀',ig:'Nsogbu akpara Nke nti'})
      ],
      dosageGuidelines: lang({en:'500mg once daily for 3 days OR 500mg day 1, then 250mg days 2-5',pidgin:'500mg every 24 hours for 3 days OR 500mg today finish do 250mg small over next 4 days.',ha:'500mg da zarar rana daya abunda ya kai kwanan kwana 3 KO 500mg na rana 1 , to 250mg don ragowar kwana 4.',yo:'500mg nigba kan fun ọjọ 3. TABI Kí ọbẹ̀ẹ̀rẹ̀ ni 500mg titi din si 250mg ọjọ mẹrin tóku.',ig:'Mgbe a 500mg otu ubọchi ka agbapụsịrị gị ubochị 3.  Ka ị bụ otu 500 n\'ubochi kachasi. Gị nye 250 mg ya pụrụ.'}),
      warnings: lang({en:'Take on empty stomach. May cause heart rhythm problems in some people.',pidgin:'Take am when belly dey clear without food. E fit give some people fast heart beat problem.',ha:'Shan magani a kan gindin da ba komai a ciki. Yana iya sa matsalolin ziciya ga mutane.',yo:'Lo ogun ti onje bá fi inu silẹ ni iyaleta. Ólè dá awọn ọ̀kàn dúró lẹẹ́kan nipa àwọn kan.',ig:'Nye ahụ mmanya na efọ rị ọtọ. O nwere ike inye obi otitị dị ka ihe metara mmegheri nsogbu.'}),
      nigerianContext: lang({en:'Popular for short-course treatment. Z-pack (3-day course) widely available.',pidgin:'Dem know dis one dey treat am express. Z-pack e full pass outside naija pharmacy well well.',ha:'Yi amfani dashi da sauraya, ya da yawa kaji sunyi kwanciyar z-pack( kwanana 3).',yo:'Ògùn ìṣẹ́pẹ tó gbayì lilo kọ́kọ́ lọ. a mọ ni z-pak gbe e kiri ká',ig:'Aha ama ogwugwo ije njem odo odo ozi a kpọ 3 - Day na nso njedebe.'})
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
      appearance: lang({en:'Distinctive pink/black capsules',pidgin:'That black and pink capsule drug',ha:'Furen maganin shunayya da baki mai saurin fitowa',yo:'Capsule oníbó pé òkúùnkùn pẹ̀lú adúlarọ',ig:'Igbe odo ya na oyi pink na ojii a hụrụ'}),
      commonUses: [
        lang({en:'Mixed bacterial infections',pidgin:'Different different bacteria sickness',ha:'Irin kwaran gaurwaye maganu',yo:'Kóró ìparapọ ayé fẹ́fẹ́ àfojúrí baakiteriya',ig:'Osuso nwee akọkọtara dị ize ngwa ojoi'}),
        lang({en:'Respiratory tract infections',pidgin:'Breathing sickness',ha:'Matsalar hanyar iska',yo:'Wàhálà oní kòkòrò amí imú',ig:'Nsogbu nke oghere obibi ime'}),
        lang({en:'Skin and soft tissue infections',pidgin:'Sickness inside body and skin',ha:'Cutar Fata da naman jiki',yo:'Àrùn ẹ̀yà ara àti ìṣètó ayé awọ́',ig:'Ọria mmiri ọkuma nsogbu mme'}),
        lang({en:'Post-surgical infections',pidgin:'Infection for operation matter',ha:'Cuta lokacin amsar agajin kafa',yo:'Wàhálà lẹ́yìn iṣẹ́ abẹ',ig:'Mgbe agafere mbidi maka asacha ezigbo nkpari '})
      ],
      dosageGuidelines: lang({en:'250-500mg every 6-8 hours',pidgin:'Take 250-500mg every 6 or 8 hours',ha:'Sha 250-500mg kowanne awa 6 zuwa 8',yo:'Awọn 250 to 500mg ṣaaju ipele ukatí 6 si 8.',ig:'250 mg na 500mg nke onye kachasị kwa elekere isii nke abali.'}),
      warnings: lang({en:'Tell doctor about penicillin allergies. Complete full course.',pidgin:'Tell doc say penicillin no good on you if true. And please finish the medicine sure sure.',ha:'Sayar wa likitanku cewa abubuwan nan bazai tsari na penicillin. Kuyi don gama gabatan jijiya duka.',yo:'Ba dọkita rẹ jiyan lati le mo aleji iwa penicillin pe ẹ gbọdọ ṣee paari wà pátápátá rẹ.',ig:'Chitua maka na enweghi oge inabata mkpamkpa peli ahu ya ọmụma dọkịta ya, mezuola nwata'}),
      nigerianContext: lang({en:'Very popular combination antibiotic in Nigeria. The pink/black capsules are widely recognized.',pidgin:'This pink and black capsule dey highly familiar to people eye for Naija when sickness start.',ha:'Ana yawan hada magungunan a Najeriya kuma kowa ya san maganin nan bakar fushi tare da kyawancin asirin.',yo:'Paápàá nínú Nigeria lo tì ṣe ohun ogun ayédèrú fúfun pínki, ati ojuju rẹ sọ ibì kan gbogbo awujo mọ ọ́ gún gbọnyingbọnyin',ig:'Ọkamma mmemme ndu ejikọtaranụ gwa enyi a na a hụ ọnyị ahụ njide niile nwee ewu ihe mnyama.'})
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
      appearance: lang({en:'White tablets or orange/pink suspension',pidgin:'White tablet or the one for water wey orange color',ha:'Farar ƙwaya ko maganin ruwan shunayya ko lemu',yo:'Egbogi funfun tabi omi lemu pink',ig:'Mmanya mmiri ocha na oroma ibé dị njọ'}),
      commonUses: [
        lang({en:'Urinary tract infections',pidgin:'Toilet infection matter',ha:'Cutar wajajen idon fitari',yo:'Wàhálà àtọgbẹ ẹlẹgbin ifun',ig:'Ebumnuchena njikota a rịa arịa'}),
        lang({en:'Respiratory infections',pidgin:'Breathing chest clear out sickness',ha:'Alamomin iska numfashin kwari',yo:'Ayewo ẹ̀dọ́ pẹ̀lú iwo atẹgun',ig:'Ihe mmeru onwuche maka igbupụ ifuru'}),
        lang({en:'Traveler\'s diarrhea',pidgin:'Running belly for pesin walking away',ha:'Gudawar tafiye-tafiye masu bako',yo:'Igbe ẹni tó ṣèsì mọ́ iraja',ig:'Abụọ abuo ka igbasa maka awo nje '}),
        lang({en:'Prevention in HIV patients',pidgin:'To block small small disease for immune drop pesin',ha:'Tsari ga yan dauke da cutar sida don inganci jiki',yo:'Lilo kòkòrò afààyà fún awọn oní ikọ-éèsi(HIV) arùn',ig:'Mkposara kponwuru idabere nlebara anya njiko ngwọ akwa .'})
      ],
      dosageGuidelines: lang({en:'2 tablets (960mg) every 12 hours',pidgin:'2 tablets (960mg) every morning and night time',ha:'Kwaya guda biyu (960mg) nufin kowane awa 12',yo:'Ó ṣe ogun méjì (960mg) ní gbogbo ukatí mjeila',ig:'2 tablets njem ike maka nke awa isii mbu'}),
      warnings: lang({en:'Drink plenty of water. Avoid if allergic to sulfa drugs. May cause skin reactions.',pidgin:'Drink like bucket of water am well over dey chop. If sulfa dey give you reactions forget wetin doc talk abeg. It can give rash.',ha:'Ka sha sabon ruwa mai yawa akai. Idan kana iya kwanta ciwo masu ciwo ta gari kadan da aka saba ci ba .',yo:'Mú omi ti o pọ̀ pátápátá. Ṣé ìkìlọ̀ mọ ti sulfa. Máá ni yori irun ara abara pọ́ rò.',ig:'Añuo Mmiri nwere ya n\'enye ọtutu izere ozu nke mmekpasa nke egwu ịlịa ịgbaso ifuru. '}),
      nigerianContext: lang({en:'Commonly prescribed for UTIs. Pediatric suspension widely used for children.',pidgin:'For toilet sickness matter most times nai dem dey prescribe am. The syrup beta treat fine for kids wella.',ha:'Maganin asali idan zaku na fitsari babu fashi , yara kanana nada ruwansu masu karfin al\'ummma suna masha da fari kuma',yo:'Oogun idọti ito ito ọmọ naa ati ki èwe pẹlu ṣe fífún ìbádí lọ gidi gan ni',ig:'Ahụ maka arịa na mb͕a  amụ igwe , ogwụ e ji ọsọ ma bụ ya kwadoro oha bu obodo a.'})
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
      appearance: lang({en:'Red/black or yellow/pink capsules',pidgin:'The red and black capsule or even yellow and pink drug am',ha:'Jarum mutane masu kwanciya lafiya / ja bakin abubuwan kwaya magani zabi',yo:'Idagbasokè tàbí ojulumo pupa ti omi dudu to wa lẹsẹ̀ abẹ',ig:'Gị na -ahụ kwa red na pink gbagwọ .'}),
      commonUses: [
        lang({en:'Acne',pidgin:'Pimples',ha:'Kurum kura na fuskoki',yo:'Eèsì wà wà fún ilẹ̀ abẹ',ig:'Ikpọ ihu maka nsogbu'}),
        lang({en:'Respiratory infections',pidgin:'Chest pain or sickness',ha:'Alamomin yanar fuskanci raba cutar a iska',yo:'Àwọn àrùn lórí mími n',ig:'Ngwongwo ahụ kwere ntị'}),
        lang({en:'Cholera',pidgin:'Cholera sickness',ha:'Cutar amai da gudawa',yo:'Àrùn arun idọti agbese kuro',ig:'Ochichi ahụ eju igụ '}),
        lang({en:'Rickettsial infections',pidgin:'Small insects bite infection',ha:'Cututtukan mita jinin jikina ko na bishiyoyi tsin',yo:'Ikọ̀ oniwara eékáná',ig:'Mbọ na ụgha ihu iche'})
      ],
      dosageGuidelines: lang({en:'250-500mg every 6 hours on empty stomach',pidgin:'250-500mg every 6-6 hours when belly never see food am well',ha:'Kwaya magani da coci awa 6 kan cikakken gindi bata abinci dashi ',yo:'Ukatí mẹfà ṣaju ati loje ikun nla dowo ẹyọ ibasọrọ gbinyewo rẹ lẹtọọ.',ig:'Ozi niile gbadoro ụbọchị  na ime oké ọtọ'}),
      warnings: lang({en:'NEVER give to children under 8 or pregnant women - causes tooth discoloration. Avoid dairy products.',pidgin:'Pregnant mama and short children avoid at all oh ! e go make teeth brown . forget milk abeg no chop am together.',ha:'Kada ya tashi a bayar mutun mai ciki don zanyi gyaran haske ya rabuda kyautata fari hakori kaga yana da damuwa gida gaban su.',yo:'Mi o gbodo fun omo keke lati sán tàbí gbígbẹ lọ ti awọ gidi ba o ni  pápá kọ wàrà ṣẹlẹ ti o ku nitori pipada.',ig:'Ejizila obere mwa nwayi amuo ọnya niile nyefe akọ dị udo abọpụrụ '}),
      nigerianContext: lang({en:'Still used for cholera treatment. Important to take on empty stomach for effectiveness.',pidgin:'Nigeria still day take dis medicine to kill cholera oh. Remember set when belly dey knock before giving him work o !',ha:'Ansakeyi maganin saboda amai da gudawa , amfanin kyan sa da karfin gidan kankancewa shiga amfani dashi ne dashi akwai komai gaba ciki .',yo:'Iye  si mu  akọ̀bẹrẹ fún giga cholera sibe rẹ ri, ranti wẹ jọ́ kóo gba ohun ti ikun rẹ laa jẹki gbogbo.',ig:'Zigaa ya eme ka ọdịdị obodo nwoke ji gwọọ , kwanyere obata ahụ maka oké mmegharị nsogbu.'})
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
      appearance: lang({en:'Purple or blue/white boxes, white tablets',pidgin:'Medicine inside purple/white box. Tablet am be white.',ha:'Maganin shunayyan kwalli  fari tare da fararen kwayar',yo:'Pupa tàbí ibi ọwọ́ alawo bulu apoti funfun',ig:'Ihu uhie e nwere ogo abuo , ocha ahụike na mbọ i kwado '}),
      commonUses: [
        lang({en:'Resistant infections',pidgin:'Strong sickness wey resist drug',ha:'Cutar wuta ta saboda basirar da ta tsaya karfin',yo:'Awujo to lagbara lọtọ fún tiwọn oogun adanwo gban',ig:'Ọria nwewuru  ike i gbara ahụ maka osisi iku ume'}),
        lang({en:'Respiratory tract infections',pidgin:'Breathing or chest challenge',ha:'Amfanar matsi zuwa hanyar huhu iska',yo:'Àrùn ohun gbogbo ti imi ba ṣe de',ig:'Akụkụ gbasara ihienwere ike iku  mmiri ume a na ahụ'}),
        lang({en:'Urinary tract infections',pidgin:'Toilet infection sickness',ha:'Zuwan fitsari zafin zuciyoyin cutar ruhi ta amfanin shiga wajen matarsa daji abubuwa',yo:'Wahálà ati isun ẹgbé ito tọọrọ ',ig:'Ebumnuche mmamiri ozi iji lụa nlekota akpa'}),
        lang({en:'Skin and soft tissue infections',pidgin:'Skin sickness everywhere',ha:'Lauluyoyin garkuwar jikin gida fata kwance gabansa ',yo:'Àrùn igbesoke inira to wapa fun ọrọn lẹta aye',ig:'Mkposara a ga maka ọcha ngwa a na nwute a na akpa nkwanya ahu'})
      ],
      dosageGuidelines: lang({en:'625mg-1g every 8-12 hours',pidgin:'625mg reach 1 gram drug every 8 or 12 hours check doc advice',ha:'Duk  625 milligrams zuwa gram 1 zaka yi lauyewa a ko wanne sa a biyu domin sanin awa na',yo:'625mg o gun si 1 gram lo ri ukatí 8 tabi 12 iwari gbe',ig:'Ihe kachasi ahịa gbanye ya bụ ihe a  na nye ọgwụ mmekota maka anya mbụ niile.'}),
      warnings: lang({en:'Take with food to reduce stomach upset. Complete full course.',pidgin:'Put am plus food for belly because e fit give upset tummy am well . Just make ensure set you finsh all.',ha:'Ku sako abinci don guji  mai a gaban mutun, dade ku tabbatar shirin kowa yana kasada abin lafiya.',yo:'Lé gbà lẹpọ jẹ ọgún ohun tí a pọmọ  tí yió lọ yee isora inu tọ . Ládiyè pe pari ògùn ti à ni .',ig:'Bịta ahụ site enwe mmepụta ihu afọ na agụụ ịchọpụtaghị aka obulekpo uche niile njiko .'}),
      nigerianContext: lang({en:'Premium antibiotic for resistant infections. More expensive than regular amoxicillin.',pidgin:'Big man medicine wey strong over ordinary one to fight strong germs pass others e cost am sha .',ha:'Tsari maganin zai dace wa tsafin sabbin karkare da kuma fi kudin gari misali na sama dan haka ',yo:'Ogun afikun ohun to po julo fun awọn oloṣe arun agbara kókó julo . Ótì ta lóló fífipà tálà ju awọn  awujọ mí .',ig:'Nke gbuogburu na nnweta a nye e gburu ogwu kwanyere ka ọbụ enwetala ezi nchekwa .' })
    }
  ]

  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl mb-3 text-gray-900 flex items-center">
          <Pill className="mr-3 text-primary" size={28} />
          {lang({en:'Common Nigerian Antibiotics Gallery',pidgin:'Collection of Drugs Wey We Dey See Everywhere For Naija',ha:'Taswirar Manyan Maganin Antibiotics na Najeriya',yo:'Àkójọ Oògùn Antibiotics Tí Ó Wọ́pọ̀ Lórílẹ̀-èdè Nàìjíríà',ig:'Nchịkọta Nhọrọ Antibiotics Ndị Na-ahụkarị Na Naịjirịa'})}
        </h2>
        <p className="text-gray-600">
          {lang({en:'Learn to identify common antibiotics available in Nigerian pharmacies, their uses, and important safety information.',pidgin:'Come use eye check di antibiotics wey we dey buy inside pharmacies here, wetin be dia use, and important gist onto am to keep you safe.',ha:'Koyi gane muhimman kwayoyin cututtuka dake asibitocin Najeriya , amfanin su da kuma bayanan kare lafiyar da suke daidai da muhimmanci .',yo:'Loye lati da awọn onikan antibiotics to wọpọ lo ni ile iwosan lẹna amọye abojuto ati pataki iru iwulọ oogun fún ijọ oogun re.',ig:'Mụtaru ịmata nke a na ewepụta obodo mmadụ e nso ya iji mee kwụsị nsogbu gbasara na ezi ibé anya na nhazi .'})}
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
            <h3 className="font-bold text-blue-900 mb-1 text-sm">{lang({en:'Important Safety Information',pidgin:'Very Important Message Onto Safety',ha:'Matasa Bayanin Kariyar Lafiya Mai Mahimmanci ',yo:'Pàtàkì Ìfífihàn Pàtàkì  Agbegbe Ètò ',ig:'Ihe di mkpa a nyere iguzobe mkpa'})}</h3>
            <p className="text-xs text-blue-800">
              {lang({en:'Always complete the full course of antibiotics as prescribed, even if you feel better. Never share antibiotics or use leftover antibiotics from previous illnesses. Consult a healthcare professional before taking any medication.',pidgin:'As dem write give you make sure you complete am fine fine body no dey give allowance . Never dash any person plus also take wetin doc no carry write say fine . Ask the doc quick am for guide.',ha:'Ku ci gaba da sha duk wasu tsari gaba duba kamar yadda magani da likita ya rubutaka wa .Koda kana ji mai kayanshi.Kayi hakuri ka gaggauta bin diddigiya wa a likita kuma baiwa su ba.',yo:'Wa e sope ẹgbọdọ lọ ki e rọ ju  wa ọwọ si ògùn ki amoye de pari e ti aba tẹlẹ ilana dọkita pa pà jù . Iyan fún ilá ko gbodo lo pinni ohun. ',ig:'Kwekọtara nweta ọgwụ ahụ e tinyerekwa na idabere amala. Ige ekwekọtara ahụ maka idabere nyere udu enwekwala na mbọ tọbiri ikwe mmadụ igosiputa '})}
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
                  <p className="text-gray-600">{lang({en:'Generic',pidgin:'Normal Name',ha:'Suna marar lakabi da farin ciki',yo:'Oruko Onígbéyẹ̀wò',ig:'Aha Ahụke Ihe Ndị a'})}: {selectedAntibiotic.genericName}</p>
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
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Common Brand Names in Nigeria',pidgin:'Names Wey You Fit See For Naija Market',ha:'Samfurin Kamfanoni dake Naijeria Tafi Shuhura',yo:'Orukọ Awọn Ọjà Ló wọ́pọ̀ ',ig:'Aha Pụrụ Iche E Kwere N\'Nigeria'})}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAntibiotic.commonBrands.map((brand, index) => (
                      <span key={index} className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Available Forms',pidgin:'How The Medicine Dey Show',ha:'Yanayin Zamowarsu A Waje Gari ',yo:'Awon Apẹẹrẹ ti wọ̀n ri ra',ig:'Etu Esi Ahụ Ya '})}</h3>
                  <p className="text-gray-700">{selectedAntibiotic.forms.join(', ')}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Appearance',pidgin:'Wetin The Thing Look Like',ha:'Shafin Yin ta Magani',yo:'Irisi ',ig:'Ụdị nnyocha dị mfe'})}</h3>
                  <p className="text-gray-700">{selectedAntibiotic.appearance}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Common Uses',pidgin:'Wetin Dem Dey Use Am Do Most Times',ha:'Cuta Da Suke Mutunta Ma gari',yo:'Lilo Koko Fún',ig:'Nhọrọ Ike Ahụ Mmere Gbasara Yabụ'})}</h3>
                  <ul className="text-gray-700 space-y-1">
                    {selectedAntibiotic.commonUses.map((use, index) => (
                      <li key={index}>• {use}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{lang({en:'Typical Dosage',pidgin:'How To Normally Take Am',ha:'Yanayin Sha Kamar Yacca aka rubuta',yo:'Oṣuwọn to Ṣe Pataki Lati Lo',ig:'Ọmụma Gbasara Ahụ N\'ọkwa Iwu'})}</h3>
                  <p className="text-gray-700">{selectedAntibiotic.dosageGuidelines}</p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                    <AlertCircle size={18} className="mr-2" />
                    {lang({en:'Important Warnings',pidgin:'Listen To Dis Warning',ha:'Gargadi Da Yake Bukatan Tunawa Gaskiya',yo:'Itọsọna Iranti',ig:'Iwu na Njiko Izo'})}
                  </h3>
                  <p className="text-sm text-yellow-800">{selectedAntibiotic.warnings}</p>
                </div>

                <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-2">{lang({en:'Nigerian Context',pidgin:'Naija Meaning And Experience',ha:'Harkar Zamani Ko Hali Nigeria',yo:'Ìwọ̀n Látí Orílẹ̀ Ẹdẹ̀ Wa nàìjíríà',ig:'Anya Njikota nọrida N\'Nigeria '})}</h3>
                  <p className="text-sm text-green-800">{selectedAntibiotic.nigerianContext}</p>
                </div>

                <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg">
                  <h3 className="font-bold text-red-900 mb-2">{lang({en:'Safety Reminders',pidgin:'How to play am safe',ha:'Bayanan Tsaron Ku',yo:'Esi aabo aabo gidi nipa rẹ mániwà',ig:'Mmekọ Njedebe Nhọrọ'})}</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• {lang({en:'Always buy from licensed pharmacies only',pidgin:'Make sure na normal registered pharmacy you go buy drugs  .',ha:'Ana bukatar koyaushe ka sayi daga shagon kayan magunguna da izini.  ',yo:'A ki ni lọ  lo ra awọn ti nkan wonni ni ile ogun iwe to pe.   ',ig:'Ochie nkpagara mụ ngwa ikwadoro nweta onye ahịa ziri ezi.'})}</li>
                    <li>• {lang({en:'Check NAFDAC registration number on package',pidgin:'Check the package for the NAFDAC number  wey valid  .',ha:'Duba lambar NAFDAC don sanin karfi ya fice akan ledara faskare. ',yo:'O ni gba ipe NAFDAC fun gbigbelero pataki lori re o.',ig:'Lebaa anyan maka nke na NAFDAC o doro anya onyunye nọmba.'})}</li>
                    <li>• {lang({en:'Verify expiry date before use',pidgin:'Use eye conform expiry date make e no pass .',ha:'Tabbatar da adanawar lokutan bacci ko mutuwan magani maza .',yo:'Ṣa ayẹwo ìba a wa ko ṣetan lati fi i se ayan ti igba o ba kú. ',ig:'Leba anya ime na njedebe mgbolu nke ọsọ .' })}</li>
                    <li>• {lang({en:'Store in cool, dry place away from children',pidgin:'Put am place wey chill no dey hot from pikin hand oh. ',ha:'Karka fita shi wajen ajiye don kada shigi ga yaro mai karami kan aiki. ',yo:'Àmì rẹ à gba kuro oju awon idari inu ile ti kẹrẹ nitori ooru gbà fẹ́ .',ig:'Nke na a nde ya okwu ịkwado a na emepụla nwoke site nwata niile egbochi ahụ. '})}</li>
                    <li>• {lang({en:'Consult a doctor or pharmacist if unsure',pidgin:'If you dey confuse on anything just quick check doc abi doc shop seller .',ha:'Ribar bayaninka da likita in ba ma fahimta na gaske ka tambayi wa. ',yo:'Ran ara fún iwọ dọkita ki ò ba à ri igbesoko aabo bi awon nkan ko ba we ye e .',ig:'Ghọta ezigbo anya na enwe ya mgbe mmadụ o na eburu obi dọkịta '})}</li>
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
