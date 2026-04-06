import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Award, Zap } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { useTranslation } from '../utils/translations'
import { useGamification } from '../hooks/useGamification'
import { saveQuizResult } from '../utils/localStorage'
import PageWrapper from '../components/PageWrapper'

export default function EducationModule() {
  const { language, showToast } = useMedwise()
  const { t } = useTranslation(language)
  const lang = (map) => map[language] ?? map['en']
  const { awardPoints, checkAchievement } = useGamification()
  const { moduleId } = useParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [reward, setReward] = useState(null)

  const modules = {
    'antibiotics-basics': {
      title: lang({en:'Antibiotic Basics',pidgin:'Antibiotic: Basic Things',ha:'Tushen Ilimin Antibiotics',yo:'Ìpìlẹ̀ Ìmọ̀ Antibiotics',ig:'Ihe Ntọala banyere Antibiotics'}),
      sections: [
        {
          title: lang({en:'What Are Antibiotics?',pidgin:'Wetin Be Antibiotic?',ha:'Menene Antibiotics?',yo:'Kí Ni Antibiotics?',ig:'Gịnị bụ Antibiotics?'}),
          content: lang({
            en: `Antibiotics are medicines used to treat infections caused by bacteria. They work by either killing bacteria or stopping them from multiplying.\n\nKey points to remember:\n• Antibiotics only work against BACTERIAL infections\n• They DO NOT work against viral infections like colds, flu, or COVID-19\n• Different antibiotics target different types of bacteria\n• They are one of medicine's most important discoveries\n\nCommon antibiotics include penicillins (Amoxicillin), fluoroquinolones (Ciprofloxacin), and macrolides (Azithromycin).`,
            pidgin: `Antibiotic na medicine wey dem dey use to treat infection wey bacteria cause. E dey work by killing the bacteria or by stopping them from growing.\n\nThings wey you must remember:\n• Antibiotic only dey work for BACTERIA infection\n• E NO dey work for virus infection like cold, flu, or COVID-19\n• Different antibiotic dey for different bacteria\n• Na one of the most important medicine wey doctor ever discover\n\nCommon antibiotics: penicillins (Amoxicillin), fluoroquinolones (Ciprofloxacin), macrolides (Azithromycin).`,
            ha: `Antibiotics magunguna ne da ake amfani da su don kula da cututtuka da ƙwayoyin cuta ke haifarwa. Suna aiki ta hanyar kashe ƙwayoyin cuta ko dakatar da yaduwarsu.\n\nManyan abubuwa da za a tuna:\n• Antibiotics na aiki ne kawai akan cututtukan ƙwayoyin CUTA\n• BA su aiki BA akan cututtukan ƙwayar cuta kamar mura, influenza, ko COVID-19\n• Antibiotics daban-daban suna kai hari kan nau'o'in ƙwayoyin cuta daban-daban\n• Suna daga cikin binciken magani mafi muhimmanci\n\nSanannen antibiotics: penicillins (Amoxicillin), fluoroquinolones (Ciprofloxacin), macrolides (Azithromycin).`,
            yo: `Antibiotics jẹ́ egbogi tí a ń lò láti tọ́jú àwọn àrùn tí àwọn bakitéríà fà. Wọ́n ń ṣiṣẹ́ nípa pípa àwọn bakitéríà tàbí dídáwọ́ wọn lọwọ láti pọ̀ sí i.\n\nÀwọn ohun pàtàkì láti rántí:\n• Antibiotics ń ṣiṣẹ́ lòdì sí àwọn àrùn BAKITÉRÍÀ nìkan\n• Wọn KO ṣiṣẹ́ lòdì sí àwọn àrùn fáírọ̀ọ̀sì bí iwọ̀n otutu, aarun, tàbí COVID-19\n• Antibiotics oríṣiríṣi ń kọlu àwọn irú bakitéríà oríṣiríṣi\n• Wọ́n jẹ́ ọ̀kan lára àwọn ìṣàwárí egbogi tí ó ṣe pàtàkì jùlọ\n\nAntibiotics tí a mọ̀: penicillins (Amoxicillin), fluoroquinolones (Ciprofloxacin), macrolides (Azithromycin).`,
            ig: `Antibiotics bụ ọgwụ a na-eji gwọọ ọrịa ndị bacteria kpatara. Ha na-arụ ọrụ site na igbu bacteria ma ọ bụ igbochi ha ịba ụba.\n\nIhe ndị dị mkpa ị ga-echeta:\n• Antibiotics na-arụ ọrụ naanị maka ọrịa BACTERIA\n• Ha ANAGHỊ arụ ọrụ maka ọrịa virus dịka oyi, ụkwara, ma ọ bụ COVID-19\n• Antibiotics dị iche iche na-ebuso ụdị bacteria dị iche iche\n• Ha bụ otu n'ime mkpụrụ ọgwụ kachasị dị mkpa e chepụtara\n\nAntibiotics a maara: penicillins (Amoxicillin), fluoroquinolones (Ciprofloxacin), macrolides (Azithromycin).`
          })
        },
        {
          title: lang({en:'When Do You Need Antibiotics?',pidgin:'Wetin Time You Need Antibiotic?',ha:'Yaushe Ake Buƙatar Antibiotics?',yo:'Nígbà Wo Ni O Nílò Antibiotics?',ig:'Mgbe ole ka ị chọrọ Antibiotics?'}),
          content: lang({
            en: `Antibiotics are needed when you have a confirmed or suspected bacterial infection that your body cannot fight on its own.\n\nConditions that MAY require antibiotics:\n• Urinary tract infections (UTIs)\n• Strep throat\n• Certain pneumonias\n• Skin infections with pus\n• Ear infections (some types)\n• Bone infections (osteomyelitis)\n\nConditions that DO NOT need antibiotics:\n• Common cold\n• Flu (influenza)\n• Most sore throats\n• Most coughs and bronchitis\n• Viral conjunctivitis (pink eye)\n• Diarrhea (unless caused by specific bacteria)`,
            pidgin: `You need antibiotic when you get bacterial infection wey your body cannot fight by emself.\n\nSickness wey FIT need antibiotic:\n• Infection for where you dey urinate (UTI)\n• Strep throat\n• Some kind pneumonia\n• Skin infection wey get pus\n• Ear infection (some type)\n• Bone infection\n\nSickness wey NO need antibiotic:\n• Common cold\n• Flu (influenza)\n• Most sore throat\n• Most cough and bronchitis\n• Viral pink eye\n• Running belle (except na special bacteria cause am)`,
            ha: `Ana buƙatar antibiotics lokacin da kuna da cututtukan ƙwayoyin cuta da aka tabbatar ko ake zargi da su wanda jikin ku ba zai iya yaƙi da su ba shi kaɗai.\n\nYanayi da ZASU iya buƙatar antibiotics:\n• Cututtukan hanyar fitsari (UTIs)\n• Strep throat\n• Wasu nau'o'in ciwon huhu\n• Cututtukan fata mai ruwa\n• Cututtukan kunne (wasu nau'i)\n• Cututtukan ƙashi\n\nYanayi DA BA su buƙatar antibiotics:\n• Mura ta yau da kullum\n• Influenza\n• Yawancin maƙogwaron ciwo\n• Yawancin tari da bronchitis\n• Conjunctivitis ta ƙwayar cuta\n• Zawo (sai dai idan ƙwayoyin cuta ta musamman ce ta haifar da shi)`,
            yo: `Antibiotics nílò nígbà tí o bá ní àrùn bakitéríà tí a ti jẹ́rìísí tàbí tí wọ́n fura sí tí ara rẹ kò lè jagun pẹ̀lú nìkan.\n\nÀwọn ipò tí ó LÈKAN nílò antibiotics:\n• Àrùn ọ̀nà ìtọ̀ (UTIs)\n• Strep throat\n• Àwọn ẹ̀dọ̀fóró àrùn kan\n• Àrùn awọ ara tí ó ní ẹ̀jẹ̀ ẹlẹgẹ\n• Àrùn etí (àwọn irú kan)\n• Àrùn egungun\n\nÀwọn ipò tí KŌ nílò antibiotics:\n• Otutu ti o wopo\n• Aarun (influenza)\n• Ọ̀pọ̀ jùlọ ọfun ìdùnnú\n• Ọ̀pọ̀ ìkọ àti bronchitis\n• Conjunctivitis fáírọ̀ọ̀sì\n• Ìgbẹ́ gbuuru (àfipamọ́ tí bakitéríà pàtàkì kan bá fà á)`,
            ig: `A chọrọ antibiotics mgbe ị nwere ọrịa bacteria achọpụtara ma ọ bụ a na-echere nke ahụ nke ahụ gị enweghị ike ịlụso ya ọgụ.\n\nŌnọdụ ndị NWERE ike ịchọ antibiotics:\n• Ọrịa ụzọ nsi (UTIs)\n• Strep throat\n• Ụfọdụ ụdị ọrịa phneumonia\n• Ọrịa akpụkpọ ahụ nwere ọbara\n• Ọrịa ntị (ụfọdụ ụdị)\n• Ọrịa ọkpụkpụ\n\nŌnọdụ ndị ANARỌGHỊ antibiotics:\n• Oyi a na-ahụkarị\n• Ụkwara (influenza)\n• Ọtụtụ ihe na-eme akpịrị mgbu\n• Ọtụtụ ụkwara na bronchitis\n• Conjunctivitis virus\n• Ọbara afọ (belụsọ naanị ma bacteria pụrụ iche kpatara ya)`
          })
        },
        {
          title: lang({en:'Why Professional Diagnosis Matters',pidgin:'Why Doctor Must Check You',ha:'Me Ya Sa Likita Ya Duba',yo:'Ìdí Tí Ìwádìí Onísègùn Fi Ṣe Pàtàkì',ig:'Ihe mere o ji dị mkpa ka dọkịta nyochaa gị'}),
          content: lang({
            en: `Only a qualified healthcare provider can determine if you need antibiotics because:\n\n1. They can distinguish bacterial from viral infections\n2. They know which antibiotic works best for specific infections\n3. They can adjust dosing for your age, weight, and health conditions\n4. They monitor for side effects and interactions\n5. They know about antibiotic allergies and contraindications\n\nSelf-diagnosing and self-medicating with antibiotics is dangerous and contributes to antibiotic resistance.`,
            pidgin: `Only qualified doctor or health worker can tell if you need antibiotic because:\n\n1. They fit tell bacteria infection apart from virus infection\n2. They sabi which antibiotic go work for which sickness\n3. They fit adjust the dose base on your age, weight, and health condition\n4. They dey monitor for side effects and drug interaction\n5. They sabi about antibiotic allergy and contraindications\n\nTo diagnose yourself and buy medicine yourself na dangerous thing wey dey cause antibiotic resistance.`,
            ha: `Likita ko ma'aikacin lafiya masu ƙwarewa ne kawai zasu iya tantance ko kuna buƙatar antibiotics saboda:\n\n1. Suna iya rarrabe cututtukan ƙwayoyin cuta daga na ƙwayar cuta\n2. Sun san wane antibiotic ne mafi kyau ga cututtuka na musamman\n3. Suna iya daidaita allura bisa shekar ku, nauyi, da halin lafiya\n4. Suna sa ido kan illolin maganin da hulɗar magungunan\n5. Sun san game da rashin juriya ta ƙwayoyin cuta\n\nShugabancin kai da shan magani da kanku yana da haɗari kuma yana taimakawa juriyar antibiotics.`,
            yo: `Olùpèsè ìlera tó ní ìmọ̀ nìkan ni ó lè pinnu bóyá o nílò antibiotics nítorí:\n\n1. Wọ́n lè yatọ̀ síi àwọn àrùn bakitéríà kúrò nínú àwọn àrùn fáírọ̀ọ̀sì\n2. Wọ́n mọ iye egbogi tó péye jùlọ fún àwọn àrùn pàtàkì\n3. Wọ́n lè ṣàtúnṣe iwọn lílò gẹgẹ bí ọjọ́ orí, ìwọ̀n, àti ipò ìlera rẹ\n4. Wọ́n máa ń ṣàgbéyẹ̀wò àwọn ipa ìpalára àti ìbáṣepọ̀\n5. Wọ́n mọ nípa àléjì antibiotics àti àwọn ìdíwọ́\n\nṢíṣe àyẹ̀wò ti ara ẹni àti mímu egbogi lára ẹni jẹ́ ewu tí ó ń ṣe ìgbéga ìfilọ́ antibiotics.`,
            ig: `Naanị onye ọrụ ahụike nwere ikike nwere ike ịchọpụta ma ọ bụrụ na ị chọrọ antibiotics n'ihi:\n\n1. Ha nwere ike ịchọpụta ọrịa bacteria wepu ọrịa virus\n2. Ha maara antibiotics nke arụ ọrụ kacha maka ọrịa ọ bụla\n3. Ha nwere ike idozi ọnụọgụ ọgwụ maka ọjọọ gị, ibu, na ọnọdụ ahụike gị\n4. Ha na-elekọta maka ihe ndị ọgwụ na-eme na mkparịta ụzọ ọgwụ\n5. Ha maara maka allergy antibiotics na ihe ndị e kwesịghị iche\n\nĪ nyochaa onwe gị ma ọ bụ ọcha onwe gị ọgwụ dị ize ndụ ma na-enyere mgbochi antibiotics aka.`
          })
        },
        {
          title: lang({en:'Types of Antibiotics',pidgin:'Different Kinds of Antibiotic',ha:'Nau\'o\'in Antibiotics',yo:'Àwọn Irú Antibiotics',ig:'Ụdị Antibiotics dị iche iche'}),
          content: lang({
            en: `Different antibiotics work in different ways:\n\nPENICILLINS (e.g., Amoxicillin, Ampicillin)\n• Kill bacteria by destroying cell walls\n• Commonly used for respiratory and skin infections\n• Safe for most people\n\nFLUOROQUINOLONES (e.g., Ciprofloxacin)\n• Interfere with bacterial DNA\n• Effective against many infections\n• Require careful dosing\n\nMACROLIDES (e.g., Azithromycin)\n• Prevent bacteria from making proteins\n• Often used for respiratory infections\n• Good for people allergic to penicillin\n\nCEPHALOSPORINS (e.g., Ceftriaxone)\n• Similar to penicillins, work on cell walls\n• Often used for serious infections\n• Cross-allergy with penicillin possible`,
            pidgin: `Different antibiotics dey work for different ways:\n\nPENICILLINS (e.g., Amoxicillin, Ampicillin)\n• E dey kill bacteria by destroying their walls\n• Doctors dey use am for chest and skin infection\n• Safe for most people\n\nFLUOROQUINOLONES (e.g., Ciprofloxacin)\n• E dey disturb bacteria DNA\n• E dey work for plenty infections\n• Doctor must give correct dose\n\nMACROLIDES (e.g., Azithromycin)\n• E dey stop bacteria from making protein\n• Good for chest infection\n• Good for people wey allergic to penicillin\n\nCEPHALOSPORINS (e.g., Ceftriaxone)\n• Similar to penicillin, dey work on bacteria walls\n• For serious infection\n• Fit cause allergy for people wey allergic to penicillin`,
            ha: `Antibiotics daban-daban suna aiki ta hanyoyi daban-daban:\n\nPENICILLINS (misali, Amoxicillin, Ampicillin)\n• Suna kashe ƙwayoyin cuta ta hanyar lalata bangon sel\n• Ana amfani da su don cututtukan numfashi da fata\n• Aminci ga yawancin mutane\n\nFLUOROQUINOLONES (misali, Ciprofloxacin)\n• Suna tsangwama da DNA na ƙwayoyin cuta\n• Ingantacce akan cututtuka da yawa\n• Yana buƙatar allura ta hankali\n\nMACROLIDES (misali, Azithromycin)\n• Suna hana ƙwayoyin cuta daga yin sunadaran\n• Da yawa ana amfani da shi don cututtukan numfashi\n• Mai kyau ga mutanen da ke da rashin jure penicillin\n\nCEPHALOSPORINS (misali, Ceftriaxone)\n• Kama da penicillins, yana aiki akan bangon sel\n• Da yawa ana amfani don cututtuka masu tsanani\n• Yiwuwar crisscross-allergy tare da penicillin`,
            yo: `Antibiotics oríṣiríṣi ń ṣiṣẹ́ ní àwọn ọ̀nà oríṣiríṣi:\n\nPENICILLINS (fun apẹẹrẹ, Amoxicillin, Ampicillin)\n• Ń pa àwọn bakitéríà nípa fífarabale àwọn odi ẹ̀wọ̀n\n• A máa ń lò fún àwọn àrùn ẹ̀dọ̀fóró àti awọ ara\n• Àbò fún ọ̀pọ̀ ènìyàn\n\nFLUOROQUINOLONES (fun apẹẹrẹ, Ciprofloxacin)\n• Ń dáwọ́ DNA bakitéríà lọwọ\n• Munadoko lòdì sí ọ̀pọ̀ àrùn\n• Nílò ìwọn lílo tí ó ṣọra\n\nMACROLIDES (fun apẹẹrẹ, Azithromycin)\n• Ń dáwọ́ bakitéríà lọwọ láti ṣe àwọn protein\n• A máa ń lò fún àwọn àrùn ẹ̀dọ̀fóró\n• Dára fún àwọn tí ó ní àléjì sí penicillin\n\nCEPHALOSPORINS (fun apẹẹrẹ, Ceftriaxone)\n• Jọ penicillins, ń ṣiṣẹ́ lórí àwọn odi ẹ̀wọ̀n\n• A máa ń lò fún àwọn àrùn líle\n• Àléjì àgbélérugbó pẹ̀lú penicillin ṣeéṣe`,
            ig: `Antibiotics dị iche iche na-arụ ọrụ n'ụzọ dị iche iche:\n\nPENICILLINS (dịka, Amoxicillin, Ampicillin)\n• Na-egbu bacteria site n'ibibi mgbidi cell ha\n• A na-ejikarị maka ọrịa iku ume na akpụkpọ ahụ\n• Dị nlechaa maka ọtụtụ mmadụ\n\nFLUOROQUINOLONES (dịka, Ciprofloxacin)\n• Na-ebibi DNA nke bacteria\n• Na-arụ ọrụ maka ọrịa dị iche iche\n• Chọrọ itule ọnụọgụ nke ọma\n\nMACROLIDES (dịka, Azithromycin)\n• Na-egbochi bacteria isi mepụta protein\n• A na-ejikarị maka ọrịa iku ume\n• Mma maka ndị nwere allergy maka penicillin\n\nCEPHALOSPORINS (dịka, Ceftriaxone)\n• Yịkọ penicillins, na-arụ ọrụ na mgbidi cell\n• A na-ejikarị maka ọrịa siri ike\n• Allergy nke nta na penicillin nwere ike eme`
          })
        }
      ],
      quiz: [
        {
          question: lang({en:'Which of the following infections can be treated with antibiotics?',pidgin:'Which of these infection fit be treated with antibiotic?',ha:'Wace daga cikin waɗannan cututtukan za a iya bi da antibiotics?',yo:'Àrùn wo nínú àwọn wọ̀nyí ni a lè tọ́jú pẹ̀lú antibiotics?',ig:'Nke ọ bụla n\'ime ọrịa ndị a nwere ike iji antibiotics gwọọ?'}),
          options: [
            { text: lang({en:'Common cold',pidgin:'Common cold',ha:'Mura ta yau da kullum',yo:'Otutu ti o wopo',ig:'Oyi a na-ahụkarị'}), correct: false },
            { text: lang({en:'Influenza (flu)',pidgin:'Influenza (flu)',ha:'Influenza (mura)',yo:'Influenza (aarun)',ig:'Influenza (ụkwara)'}), correct: false },
            { text: lang({en:'Urinary tract infection',pidgin:'Infection for where you dey urinate',ha:'Cutar hanyar fitsari',yo:'Àrùn ọ̀nà ìtọ̀',ig:'Ọrịa ụzọ nsi'}), correct: true },
            { text: lang({en:'COVID-19',pidgin:'COVID-19',ha:'COVID-19',yo:'COVID-19',ig:'COVID-19'}), correct: false }
          ],
          explanation: lang({en:'Urinary tract infections are bacterial infections that require antibiotics. The common cold, flu, and COVID-19 are viral infections that do not respond to antibiotics.',pidgin:'Infection for where you dey urinate na bacteria wahala wey need antibiotic. Common cold, flu, and COVID-19 na virus - antibiotic no go work for them.',ha:'Cututtukan hanyar fitsari cututtukan ƙwayoyin cuta ne waɗanda ke buƙatar antibiotics. Mura ta yau da kullum, influenza, da COVID-19 cututtukan ƙwayar cuta ne waɗanda ba su amsa antibiotics ba.',yo:'Àwọn àrùn ọ̀nà ìtọ̀ jẹ́ àwọn àrùn bakitéríà tí ó nílò antibiotics. Otutu ti o wopo, aarun, àti COVID-19 jẹ́ àwọn àrùn fáírọ̀ọ̀sì tí kò fèsì sí antibiotics.',ig:'Ọrịa ụzọ nsi bụ ọrịa bacteria nke chọrọ antibiotics. Oyi a na-ahụkarị, ụkwara, na COVID-19 bụ ọrịa virus ndị anaghị aza antibiotics.'})
        },
        {
          question: lang({en:'How do antibiotics work?',pidgin:'How antibiotic dey work?',ha:'Yaya antibiotics ke aiki?',yo:'Báwo ni antibiotics ṣe ń ṣiṣẹ́?',ig:'Kedu ka antibiotics si arụ ọrụ?'}),
          options: [
            { text: lang({en:'They boost your immune system',pidgin:'E dey boost your immune system',ha:'Suna ƙarfafa tsarin rigakafi na ku',yo:'Wọ́n ń mú ètò àgbèjà ara rẹ lágbára',ig:'Ha na-enye nhazi njikwa ahụ gị ike'}), correct: false },
            { text: lang({en:'They kill bacteria or stop them from multiplying',pidgin:'E dey kill bacteria or stop them from multiplying',ha:'Suna kashe ƙwayoyin cuta ko dakatar da yaduwarsu',yo:'Wọ́n ń pa àwọn bakitéríà tàbí dídáwọ́ wọn lọwọ láti pọ̀ sí i',ig:'Ha na-egbu bacteria ma ọ bụ igbochi ha ịba ụba'}), correct: true },
            { text: lang({en:'They reduce inflammation only',pidgin:'E only dey reduce swelling',ha:'Suna rage kumburi kawai',yo:'Wọ́n ń dín ìhùn kù nìkan',ig:'Ha na-ebelata ọfụfụ naanị'}), correct: false },
            { text: lang({en:'They cure all types of infections',pidgin:'E dey cure every kind infection',ha:'Suna warkar da duk nau\'o\'in cututtuka',yo:'Wọ́n ń wò gbogbo irú àwọn àrùn',ig:'Ha na-agwọ ụdị ọrịa niile'}), correct: false }
          ],
          explanation: lang({en:'Antibiotics work by either killing bacteria directly or preventing them from reproducing. This allows your immune system to clear the remaining infection.',pidgin:'Antibiotic dey work by killing bacteria directly or stopping them from replicating. This na wetin allow your immune system to clear the remaining infection.',ha:'Antibiotics na aiki ta hanyar kashe ƙwayoyin cuta kai tsaye ko hana su haifuwa. Wannan yana ba wa tsarin rigakafi damar share sauran cutar.',yo:'Antibiotics ń ṣiṣẹ́ nípa pípa àwọn bakitéríà tààrà tàbí dídáwọ́ wọn lọwọ láti tún ṣẹ. Èyí gba àjẹsára rẹ láàyè láti pa àrùn tó kù run.',ig:'Antibiotics na-arụ ọrụ site n\'igbu bacteria ozugbo ma ọ bụ igbochi ha ịmụta. Nka na-enye nhazi njikwa ahụ gị ohere ịhapụ ihe fọdụrụ nke ọrịa ahụ.'})
        },
        {
          question: lang({en:'Why should you only take antibiotics prescribed by a doctor?',pidgin:'Why you suppose only take antibiotic wey doctor give you?',ha:'Me ya sa ya kamata ka shan antibiotics da likita ya rubuta kawai?',yo:'Kí nìdí tí o fi yẹ kí o gbà antibiotics tí dókítà fún ọ nìkan?',ig:'Gịnị mere ị ga-ewere naanị antibiotics dọkịta nyere gị?'}),
          options: [
            { text: lang({en:'To avoid side effects',pidgin:'To avoid side effects',ha:'Don guje wa illolin magani',yo:'Láti yẹra fún àwọn ipa ìpalára',ig:'Iji zere ihe ọgwụ na-eme'}), correct: false },
            { text: lang({en:'Because doctors want to make money',pidgin:'Because doctor wan make money',ha:'Saboda likitoci suna son samun kuɗi',yo:'Nítorí àwọn dókítà fẹ́ jèrè owó',ig:'N\'ihi na dọkịta chọrọ ịnweta ego'}), correct: false },
            { text: lang({en:'Because doctors know which antibiotic works for your specific infection and dosage',pidgin:'Because doctor sabi which antibiotic go work for your specific infection and how much to take',ha:'Saboda likitoci sun san wane antibiotic ne ke aiki da cutar ka musamman da kuma allura da za a ba',yo:'Nítorí àwọn dókítà mọ iye egbogi tó péye jùlọ fún àrùn rẹ pàtàkì àti ìwọn lílo',ig:'N\'ihi na dọkịta maara antibiotics nke arụ ọrụ maka ọrịa gị kpọmkwem na ọnụọgụ ọgwụ'}), correct: true },
            { text: lang({en:'Doctors just prefer pharmacy money',pidgin:'Doctor just like pharmacy money',ha:'Likitoci na son kuɗin kantin magani kawai',yo:'Àwọn dókítà fẹ́ owó ilé-egbogi nìkan',ig:'Dọkịta naanị achọ ego ụlọ ahịa ọgwụ'}), correct: false }
          ],
          explanation: lang({en:'Healthcare providers diagnose the specific infection, identify the causative bacteria, and prescribe the appropriate antibiotic at the correct dose for your condition.',pidgin:'Doctor fit identify the exact sickness, know which bacteria cause am, and write the right antibiotic for the right amount for your body.',ha:'Masu ba da lafiya na gano cutar musamman, gano ƙwayoyin cuta masu haifar da ita, kuma suna rubuta antibiotic da ya dace a allura ta daidai don yanayin ku.',yo:'Àwọn olùpèsè ìlera ń ṣàwádìí àrùn pàtàkì, ń dá àwọn bakitéríà tó fà á mọ, wọ́n sì ń fún egbogi tó yẹ ní ìwọn tó péye fún ipò rẹ.',ig:'Ndị ọrụ ahụike na-achọpụta ọrịa ahụ kpọmkwem, ịchọpụta bacteria kpatara ya, wee dee antibiotics kwesịrị ekwesị n\'ọnụọgụ kwesịrị maka ọnọdụ gị.'})
        },
        {
          question: lang({en:'What can happen if you take someone else\'s antibiotics?',pidgin:'Wetin fit happen if you take another person antibiotic?',ha:'Menene zai iya faruwa idan ka sha antibiotics na wani?',yo:'Kí ni ó lè ṣẹlẹ̀ tí o bá mú antibiotics ẹnìkejì rẹ?',ig:'Gịnị nwere ike ime ma ọ bụrụ na ị were antibiotics nke mmadụ ọzọ?'}),
          options: [
            { text: lang({en:'Nothing, antibiotics are the same for everyone',pidgin:'Nothing go happen, antibiotic na antibiotic',ha:'Babu komai, antibiotics iri ɗaya ne ga kowa',yo:'Ohunkóhun, antibiotics jẹ́ kan náà fún gbogbo ènìyàn',ig:'Ọ dịghị ihe, antibiotics otu ihe bụ maka mmadụ niile'}), correct: false },
            { text: lang({en:'It might not treat your infection and can cause harm',pidgin:'E fit not treat your own infection and e fit cause problem',ha:'Yana iya rashin kula da cutar ku kuma yana iya haifar da ɓarna',yo:'Ó lè kùnà láti tọ́jú àrùn rẹ tí ó sì lè fa ìpalára',ig:'O nwere ike imeghị ọrịa gị ọgwụ ma nwere ike imebi ihe'}), correct: true },
            { text: lang({en:'It always works better than prescribed antibiotics',pidgin:'E go work better pass the one doctor give you',ha:'Koyaushe yana aiki mafi kyau fiye da antibiotics da aka rubuta',yo:'Ó máa ń ṣiṣẹ́ dára jùlọ nígbà gbogbo ju àwọn antibiotics tí a fún ọ lọ',ig:'Ọ na-arụzi ọrụ n\'ụzọ ka mma karịa antibiotics dọkịta nyere'}), correct: false },
            { text: lang({en:'You save money without any risks',pidgin:'You go save money without any risk',ha:'Kana adana kuɗi ba tare da wani haɗari ba',yo:'Ìwọ yóò fi owó pamọ́ láì sí ewu kankan',ig:'Ị ga-echekwa ego na-enwegh ihe ize ndụ ọ bụla'}), correct: false }
          ],
          explanation: lang({en:'Different infections require different antibiotics. Taking the wrong antibiotic won\'t treat your condition and may cause unnecessary side effects.',pidgin:'Different infection need different antibiotic. To take wrong antibiotic no go treat your sickness and fit cause extra problems for your body.',ha:'Cututtuka daban-daban suna buƙatar antibiotics daban-daban. Shan antibiotic mara daidai ba zai kula da yanayin ku ba kuma yana iya haifar da illolin maganin da ba dole ba.',yo:'Àwọn àrùn oríṣiríṣi nílò àwọn antibiotics oríṣiríṣi. Mímu antibiotic tó ṣàìtọ̀ kìí tọ́jú ipò rẹ tí ó sì lè fa àwọn ipa ìpalára tí kò pọn dandan.',ig:'Ọrịa dị iche iche chọrọ antibiotics dị iche iche. Iwere antibiotics ezighi ezi agaghị agwọ ọnọdụ gị ma nwere ike imeye ihe ọgwụ na-eme ndị ọzọ.'})
        },
        {
          question: lang({en:'How long should you take an antibiotic course?',pidgin:'How long you suppose take antibiotic?',ha:'Tsawon lokaci nawa za ka sha koryar antibiotic?',yo:'Ìgbà mélòó ni o yẹ kí o mú kóọsì antibiotics?',ig:'Ogologo oge ole ka ị ga-ewe usoro antibiotics?'}),
          options: [
            { text: lang({en:'Until you feel better',pidgin:'Until you feel better',ha:'Har sai ka ji kyau',yo:'Títí tí o fi dára',ig:'Ruo mgbe ị dị mma'}), correct: false },
            { text: lang({en:'2-3 days maximum',pidgin:'2-3 days maximum',ha:'Kwana 2-3 mafi tsawo',yo:'Ọjọ́ 2-3 jùlọ',ig:'Ụbọchị 2-3 kachasị'}), correct: false },
            { text: lang({en:'The full prescribed duration, even if you feel better',pidgin:'Take the full course wey doctor give you, even if you don feel better',ha:'Cikakken lokacin da aka rubuta, koda kuwa ka ji kyau',yo:'Ìgbà tí a kọ síl\u0025ẹ̀ pátápátá, àní bí o bá ti dára',ig:'Ogologo oge nke ọha niile, ọbụna ma ị mara mma'}), correct: true },
            { text: lang({en:'Until your medicine bottle is half-empty',pidgin:'Until your bottle reach half',ha:'Har sai kwalban magani ta zama rabin kofa',yo:'Títí tí ìgò egbogi rẹ fi jẹ́ ìdajì òfo',ig:'Ruo mgbe ọ dị ọkara n\'ime karama ọgwụ'}), correct: false }
          ],
          explanation: lang({en:'Always complete the full prescribed course to ensure all bacteria are eliminated and prevent antibiotic resistance.',pidgin:'Always finish the full course wey doctor tell you so that all the bacteria go die and resistance no go develop.',ha:'Koyaushe kammala cikakken koryar da aka rubuta don tabbatar da kawar da duk ƙwayoyin cuta da kuma hana juriyar antibiotics.',yo:'Máa parí kóọsì tí a kọ síl\u0025ẹ̀ pátápátá nígbà gbogbo láti ríjú pọ̀ tí gbogbo bakitéríà parẹ́ àti láti dáwọ́ ìfilọ́ antibiotics lọwọ.',ig:'Mechaa usoro ọha niile mgbe niile iji jide n\'aka na bacteria niile fụọrọ wee gbochie mgbochi antibiotics.'})
        }
      ]
    },
    'resistance-crisis': {
      title: lang({en:'The Resistance Crisis',pidgin:'The Problem with Resistance',ha:'Rikicin Juriya',yo:'Ìpèníjà Ìfilọ́',ig:'Nsogbu Mgbochi'}),
      sections: [
        {
          title: lang({en:'What Is Antibiotic Resistance?',pidgin:'Wetin Be Antibiotic Resistance?',ha:'Menene Juriyar Antibiotics?',yo:'Kí Ni Ìfilọ́ Antibiotics?',ig:'Gịnị Bụ Mgbochi Antibiotics?'}),
          content: lang({
            en: `Antibiotic resistance occurs when bacteria change in ways that make antibiotics ineffective against them. These "superbugs" can:\n\n• Survive antibiotic treatment\n• Continue to multiply and cause infection\n• Spread to other people\n• Become increasingly difficult to treat\n• Sometimes resist multiple antibiotics at once (multidrug-resistant)\n\nThis is one of the biggest threats to global health today and is especially severe in Nigeria.`,
            pidgin: `Antibiotic resistance dey happen when bacteria change so tey antibiotic no fit work for them again. These "superbugs" fit:\n\n• Survive when you dey take antibiotic\n• Continue to grow and cause sickness\n• Spread go meet other people\n• Hard to treat well well\n• Sometimes, dem fit resist many many antibiotics at once\n\nThis na one of the biggest wahala for health for the whole world today, and e worse for Nigeria.`,
            ha: `Juriyar antibiotics na faruwa ne lokacin da ƙwayoyin cuta suka canza ta hanyoyin da ke sa antibiotics ya zama mara amfani a kansu. Waɗannan "superbugs" na iya:\n\n• Tsira daga maganin antibiotics\n• Ci gaba da yawaita da haifar da cuta\n• Yaɗu zuwa ga wasu mutane\n• Zama da wahalar gaske don kulawa\n• Wani lokaci suna jurewa antibiotics da yawa a lokaci guda\n\nWannan shine ɗayan manyan barazanar lafiyar duniya a yau kuma yana da tsanani musamman a Najeriya.`,
            yo: `Ìfilọ́ antibiotics ń ṣẹlẹ̀ nígbà tí bakitéríà bá yí padà ní àwọn ọ̀nà tí ó sọ antibiotics di aláìlágbára mọ́ wọn lára. Àwọn "superbugs" wọ̀nyí lè:\n\n• Jẹ́ aláìkú lábẹ́ ìtọ́jú antibiotics\n• Tún máa pọ̀ sí i kí wọ́n sì máa fa àrùn\n• Tàn kálẹ̀ sí àwọn ènìyàn mìíràn\n• Di ohun tí ó ṣòro láti tọ́jú sí i\n• Nígbà míràn wọ́n ń kọjú ìjà sí ọ̀pọ̀lọpọ̀ antibiotics l\u1eb9\u0300kan náà\n\nÈyí jẹ́ ọ̀kan lára àwọn ewu tí ó tóbi jùlọ sí ìlera àgbáyé lónìí, ó sì lágbára gidigidi ní Nàìjíríà.`,
            ig: `Mgbochi antibiotics na-eme mgbe bacteria gbanwere n\'ụzọ na-eme ka ọgwụ antibiotics ghara ịdị irè megide ha. "Superbugs" ndị a nwere ike:\n\n• Na-adị ndụ n\'agbanyeghị ọgwụgwọ antibiotics\n• Na-aga n\'ihu ịba ụba na ịkpata ọrịa\n• Gbasaa n\'ebe ndị ọzọ nọ\n• Na-esiri ike n\'ịgwọ\n• Mgbe ụfọdụ, na-eguzogide ọtụtụ ọgwụ antibiotics n\'otu oge\n\nNke a bụ otu n\'ime ihe egwu kachasị na ahụike ụwa taa, ọ kachasị njọ na Nigeria.`
          })
        },
        {
          title: lang({en:'How Resistance Develops',pidgin:'How Resistance Dey Start',ha:'Yadda Juriya Ke Haɓaka',yo:'Bówo Ni Ìfilọ́ Ṣe Ń Bẹ̀rẹ̀',ig:'Otu Mgbochi si Amalite'}),
          content: lang({
            en: `Bacteria become resistant through:\n\n1. MISUSE: Taking antibiotics when not needed (like for viral infections)\n2. INCOMPLETE COURSES: Stopping treatment early when you feel better\n3. WRONG DOSING: Taking too little or too much\n4. SHARING: Using someone else's prescription\n5. AGRICULTURAL USE: Antibiotics given to livestock can create resistant bacteria\n6. POOR SANITATION: Contaminated water spreads resistant bacteria\n\nEach time bacteria are exposed to antibiotics incorrectly, resistant strains have a better chance to survive and multiply.`,
            pidgin: `Bacteria dey get resistance through:\n\n1. WRONG USE: To take antibiotic when you no need am (like for virus infection)\n2. INCOMPLETE USE: When you stop medicine early because you don feel better\n3. WRONG DOSE: To take too small or too much\n4. SHARING: To use another person prescription\n5. FARM USE: Antibiotic wey dem dey give animal fit create antibiotic resistance\n6. DIRTY ENVIRONMENT: Dirty water dey spread bacteria wey get resistance\n\nEvery time bacteria see antibiotic for wrong way, those way get power to resist go survive and multiply.`,
            ha: `ƙwayoyin cuta suna zama masu juriya ta hanyar:\n\n1. RASHIN AMFANI DA YA DACE: Shan antibiotics lokacin da ba a buƙata (kamar na cututtukan hoto/viral)\n2. RASHIN KAMMALA MAGANI: Dakatar da magani da wuri lokacin da kaji sauƙi\n3. ALLURA MARA DAIDAI: Shan kadan ko da yawa\n4. RABA MAGANI: Yin amfani da takardar sayen magani na wani\n5. AMFANIN GONA: Antibiotics da ake ba dabbobi na iya haifar da ƙwayoyin cuta masu juriya\n6. RASHIN TSAFTA: Ruwan da ya gurɓata yana yaɗa ƙwayoyin cuta masu juriya\n\nDuk lokacin da ƙwayoyin cuta suka haɗu da antibiotics ba daidai ba, nau\'ikan da ke da juriya suna da kyakkyawar dama ta tsira da yawaita.`,
            yo: `Bakitéríà ń ní ìfilọ́ nípa:\n\n1. ÌLÒKÚLÒ: Mímu antibiotics nígbà tí kò yẹ (bíi fún àrùn fáírọ̀ọ̀sì)\n2. ÀÌPARÍ ÌTỌ́JÚ: Dídá ìtọ́jú dúró ní kùtùkùtù nígbà tí ara rẹ bá yá\n3. ÌW\u1eb0N LÍLO TÓ ṢÌNÀ: Mímu kékeré jù tàbí púpọ̀ jù\n4. PÍNIPÍN: Lílò ìwé egbogi ẹlòmíràn\n5. ÌLÒ NÍ IL\u1eb8\u0300-IṢ\u1eb8\u0300: Antibiotics tí a ń fún àwọn ẹran-ọ̀sìn lè dá bakitéríà onífilọ́ síl\u1eb8\u0300\n6. ÀÌNÍ TSAFTA TÓ PÉ: Omi tó dọ̀tí ń tan bakitéríà onífilọ́ kál\u1eb8\u0300\n\nNí gbogbo ìgbà tí bakitéríà bá bá antibiotics gùn lọ́nà tí kò tọ́, àwọn onífilọ́ ní àǹfààní tó dára jù láti yè àti láti pọ̀ sí i.`,
            ig: `Bacteria na-enweta mgbochi site na:\n\n1. EJIGHỊ YA ME IHE KWESỊRỊ: Iwere antibiotics mgbe ọ dịghị mkpa (dịka maka ọrịa virus)\n2. USORO AKWỤSỊRỊ NA MKPU: Ịkwụsị ọgwụ n\'isi ụtụtụ mgbe ahụ gị dị gị mma\n3. ỌNỤỌGỤ EZIGHỊ EZI: Iwere ntakịrị ma ọ bụ nke karịrị akarị\n4. ISORITA: Iji ọgwụ mmadụ ọzọ\n5. OJIIJE NA ỌRỤ UGBO: Antibiotics a na-enye anụ ụlọ nwere ike ịmepụta bacteria na-eguzogide ọgwụ\n6. ADỊGHỊ ỌCHA: Mmiri ruru unyi na-agbasa bacteria nwere mgbochi\n\nOge ọ bụla bacteria hụrụ antibiotics n\'ụzọ ezighi ezi, ndị nwere ike iguzogide na-enwe ohere ka mma ịdị ndụ na ịba ụba.`
          })
        },
        {
          title: lang({en:'The Consequences',pidgin:'The Wahala Wey E Fit Cause',ha:'Sakamakon',yo:'Àwọn Àbájáde',ig:'Ihe Ndị Na-eso Ya'}),
          content: lang({
            en: `When antibiotics stop working:\n\n• Simple infections become life-threatening\n• Surgery and chemotherapy become riskier\n• Hospital stays become longer\n• Treatment costs increase dramatically\n• More people die from infections that were once easily treatable\n• Patients may need stronger drugs with more side effects\n\nIn Nigeria, antibiotic resistance is rising rapidly due to:\n- Over-the-counter antibiotic sales without prescriptions\n- Poor-quality and counterfeit medications\n- Improper disposal of antibiotics\n- Limited access to diagnostic tests`,
            pidgin: `When antibiotic stop to work:\n\n• Sickness wey small fit kill person\n• Surgery and cancer treatment go dangerous pass before\n• Person go stay for hospital long time\n• Money for treatment go increase well well\n• Many people go dey die from sickness wey small pass before\n• People fit need stronger medicine wey get more side effects\n\nFor Nigeria, antibiotic resistance dey grow fast fast because:\n- People dey buy antibiotic for pharmacy without doctor paper\n- Fake medicine and bad quality medicine\n- People no dey throway medicine for right way\n- Access to test no plenty`,
            ha: `Lokacin da antibiotics ya daina aiki:\n\n• ƙananan cututtuka na zama masu barazanar rai\n• Tiyata da chemotherapy na zama masu haɗari\n• Zaman asibiti yana tsawon lokaci\n• Kudin magani yana karuwa sosai\n• ƙarin mutane na mutuwa daga cututtukan da aka saba warkarwa cikin sauƙi\n• Marasa lafiya na iya buƙatar magunguna masu ƙarfi tare da ƙarin illolin magani\n\nA Najeriya, juriyar antibiotics na karuwa cikin sauri saboda:\n- Sayar da antibiotics ba tare da takardar sayen magani ba\n- Magunguna marasa inganci da na jabu\n- Rashin zubar da antibiotics yadda ya dace\n- ƙarancin samun gwaje-gwajen tantance cuta`,
            yo: `Nígbà tí antibiotics bá dẹ́kun iṣẹ́:\n\n• Àwọn àrùn kékeré di ohun tó lè gbànìyàn lẹ́mìí\n• Iṣẹ́ abẹ àti ìtọ́jú jẹjẹrẹ di ohun eléwu sí i\n• Gbígbe ní ilé ìwòsàn di gígùn\n• Owó ìtọ́jú ń pọ̀ sí i gidigidi\n• Ọ̀pọ̀ ènìyàn ń kú látàrí àrùn tí a ti lè tọ́jú rọrùn tẹ́l\u1eb8\u0300\n• Àwọn aláìsàn lè nílò egbogi tó lágbára jù p\u1eb9\u0300l\u00fa àwọn ipa ìpalára púp\u1ecd\u0300\n\nNí Nàìjíríà, ìfilọ́ antibiotics ń pọ̀ sí i ní kíá nítòrí:\n- Títà á láìsí ìwé egbogi láti ọwọ́ oníṣègùn\n- Àwọn egbogi tí kò dára àti àwọn egbogi èké\n- Àìsọ egbogi nù lọ́nà tó tọ́\n- Àìní ọ̀nà tó pọ̀ sí àwọn àyẹ̀wò ìlera`,
            ig: `Mgbe ọgwụ antibiotics kwụsịrị ịrụ ọrụ:\n\n• Ọrịa ndị dị mfe na-aghọ ihe egwu na ndụ\n• Ịwa ahụ na chemotherapy na-aghọ ihe ize ndụ karị\n• Ịnọ n\'ụlọ ọgwụ na-adị ogologo oge\n• Ụgwọ ọgwụgwọ na-abawanye nke ukwuu\n• Ọtụtụ mmadụ na-anwụ site na ọrịa ndị nwere ike ịgwọọ tupu oge a\n• Ndị ọrịa nwere ike ịchọ ọgwụ siri ike nwere mmetụta ndị ọzọ\n\nNa Nigeria, mgbochi antibiotics na-eto ngwa ngwa n\'ihi:\n- Ịre ọgwụ antibiotics na-enweghị akwụkwọ dọkịta\n- Ọgwụ adịghị mma na ọgwụ adịgboroja\n- Atụfughị ọgwụ antibiotics n\'ụzọ kwesịrị ekwesị\n- Ịnara ule nyocha adịghị mfe`
          })
        },
        {
          title: lang({en:'Nigeria\'s Resistance Crisis',pidgin:'Nigeria Resistance Wahala',ha:'Rikicin Juriyar Najeriya',yo:'Wàhálà Ìfilọ́ ní Nàìjíríà',ig:'Nsogbu Mgbochi nke Nigeria'}),
          content: lang({
            en: `Nigeria faces a severe antibiotic resistance problem:\n\nTHE STATISTICS:\n• Over 110,000 deaths annually linked to resistance\n• Over 40% of antibiotics are obtained without prescriptions\n• Many antibiotics sold are counterfeit or substandard\n• Limited diagnostic testing leads to inappropriate use\n\nTHE CAUSES:\n• Weak pharmacy regulations\n• Medications available in open markets\n• Limited public awareness\n• High cost of proper diagnosis\n• Insufficient antibiotic stewardship programs\n\nYOUR ROLE MATTERS: Proper antibiotic use protects Nigeria's population.`,
            pidgin: `Nigeria dey face big antibiotic resistance wahala:\n\nTHE STATISTICS:\n• Pass 110,000 people dey die every year because of resistance\n• Pass 40% of antibiotic, people dey buy am without doctor paper\n• Many antibiotic wey dem dey sell na fake or bad ones\n• Test to know sickness no plenty, so people dey use antibiotic anyhow\n\nTHE CAUSES:\n• Law for pharmacy no strong well\n• Medicine dey for open market anyhow\n• People no sabi the danger well\n• To get correct doctor report cost money\n• Not enough program to teach people\n\nYOU GET ROLE TO PLAY: If you use antibiotic well, you dey protect Nigeria.`,
            ha: `Najeriya na fuskantar babbar matsalar juriyar antibiotics:\n\nƘIDIDDIGA:\n• Fiye da mutuwar mutane 110,000 a kowace shekara sakamakon juriya\n• Fiye da 40% na antibiotics ana samun su ne ba tare da takardar sayen magani ba\n• Dayawa daga cikin antibiotics da ake sayarwa na jabu ne ko marasa inganci\n• ƙarancin gwajin tantancewa yana haifar da amfani mara kyau\n\nADALILAI:\n• Rashin tsauraran dokokin kantin magani\n• Magunguna suna samuwa a kasuwanni buɗe\n• ƙarancin sanin ya kamata ga jama'a\n• Tsadar tantance cuta daidai\n• Rashin isassun shirye-shiryen kula da amfani da antibiotics\n\nMATSAYIN KA NA DA MUHIMMANCI: Ingantaccen amfani da antibiotics yana kare al'ummar Najeriya.`,
            yo: `Nàìjíríà ń kọjú ìjà sí wàhálà ìfilọ́ antibiotics tó lágbára:\n\nÀW\u1eb0N ÌPÍN:\n• Ju ikú 110,000 lọ lọ́dọọdún tó tan mọ́ ìfilọ́\n• Ju 40% antibiotics lọ ni a ń rà láìsí ìwé egbogi\n• Ọ̀pọ̀lọpọ̀ antibiotics tí a ń tà jẹ́ èké tàbí èyí tí kò dára\n• Àyẹ̀wò ìlera tó dín kù ń fa ìlòkúlò\n\nÀW\u1eb0N ÌDÍ:\n• Òfin ilé-egbogi tí kò lágbára\n• Àwọn egbogi wà ní ọjà gbangba\n• Imọ̀ ará ìlú tí kò tó\n• Owó àyẹ̀wò tó tọ́ tó ga\n• Àìtó àwọn ètò fún ìtọ́jú antibiotics\n\nIPA R\u1eb8ṢE PÀTÀKÌ: Lílò antibiotics lọ́nà tó tọ́ ń dáàbò bo àwọn ènìyàn Nàìjíríà.`,
            ig: `Nigeria na-eche nsogbu mgbochi antibiotics siri ike ihu:\n\nNDỊ STATISTICS:\n• Ihe karịrị mmadụ 110,000 na-anwụ kwa afọ n\'ihi mgbochi\n• Ihe karịrị 40% nke ọgwụ antibiotics ka a na-enweta na-enweghị akwụkwọ dọkịta\n• Ọtụtụ ọgwụ antibiotics a na-ere bụ adịgboroja ma ọ bụ ndị adịghị mma\n• Nnwale nyocha adịghị mfe na-eduga n\'ejighị ya mee ihe kwesịrị\n\nHE KPATARA YA:\n• Iwu ụlọ ahịa ọgwụ adịghị ike\n• Ọgwụ dị n\'ahịa mepere emepe\n• Ọha na eze amaghị nke ọma\n• Ụgwọ nyocha kwesịrị ekwesị dị elu\n• Ejighị usoro nlekọta antibiotics mee ihe nke ọma\n\nỌrụ GỊ DỊ MKPA: Iji ọgwụ antibiotics mee ihe nke ọma na-echebe ndị Nigeria.`
          })
        },
        {
          title: lang({en:'What You Can Do',pidgin:'Wetin You Fit Do',ha:'Abin da Zaka Iya Yi',yo:'Ohun Tí O Lè Ṣe',ig:'Ihe Ị Nwere Ike Ime'}),
          content: lang({
            en: `Fight antibiotic resistance by:\n\nPERSONAL ACTIONS:\n✓ Never self-medicate with antibiotics\n✓ Always complete prescribed courses\n✓ Never share antibiotics with others\n✓ Never use leftover antibiotics\n✓ Ask your doctor for diagnosis before taking antibiotics\n✓ Report counterfeit medications to NAFDAC\n\nCOMMUNITY ACTIONS:\n✓ Educate family and friends\n✓ Support proper medication disposal\n✓ Advocate for pharmacy licensing\n✓ Report suspicious drug sellers\n\nWHEN BUYING MEDICATIONS:\n✓ Buy from licensed pharmacies only\n✓ Ask for prescriptions\n✓ Verify medication authenticity\n✓ Keep receipts\n✓ Report counterfeit products`,
            pidgin: `Fight antibiotic resistance with these things:\n\nWETIN YOU FIT DO BY YOURSELF:\n✓ No ever buy antibiotic on your own without doctor paper\n✓ Always finish the full course wey doctor tell you\n✓ No share your antibiotic with another person\n✓ No ever use leftover antibiotic\n✓ Ask doctor make e check you first before you take antibiotic\n✓ Tell NAFDAC if you see fake medicine\n\nWETIN YOU FIT DO FOR YOUR COMMUNITY:\n✓ Teach your family and friends\n✓ Support correct way to throway medicine\n✓ Help follow tell people to get license for pharmacy\n✓ Tell authority if you see person wey dey sell medicine for wrong way\n\nWHEN YOU DEY BUY MEDICINE:\n✓ Buy from pharmacy wey get license only\n✓ Ask for doctor paper\n✓ Check if the medicine na original\n✓ Keep your receipt\n✓ Report any fake product`,
            ha: `Yi yaƙi da juriyar antibiotics ta hanyar:\n\nAYYUKAN KANKA:\n✓ Kada ka taɓa siyan antibiotics da kanka ba tare da takardar sayen magani ba\n✓ Koyaushe kammala koryar maganin da aka rubuta\n✓ Kada ka raba antibiotics da wasu\n✓ Kada ka taɓa amfani da ragowar antibiotics\n✓ Tambayi likitanka don tantancewa kafin shan antibiotics\n✓ Kai rahoton magungunan jabu ga NAFDAC\n\nAYYUKAN AL'UMMA:\n✓ Koyar da dangi da abokai\n✓ Taimakawa wajen zubar da magunguna yadda ya dace\n✓ Tallafawa lasisin kantin magani\n✓ Kai rahoton masu sayar da magunguna masu zargi\n\nLOKACIN SAYEN MAGUNGUNA:\n✓ Saya daga kantin magani mai lasisi kawai\n✓ Nemi takardar sayen magani\n✓ Tabbatar da ingancin magani\n✓ Ajiye rasit\n✓ Kai rahoton kayayyakin jabu`,
            yo: `Bá ìfilọ́ antibiotics jà nípa:\n\nIPA TI ARA \u1eb8NI:\n✓ Má ṣe lo antibiotics fúnra rẹ láìsí oníṣègùn\n✓ Máa parí kóọsì tí a kọ fún ọ ní gbogbo ìgbà\n✓ Má ṣe pín antibiotics rẹ pẹ̀lú ẹlòmíràn\n✓ Má ṣe lo antibiotics tó kù nínú ìgò\n✓ Béèrè lọ́wọ́ oníṣègùn fún àyẹ̀wò kí o tó lo antibiotics\n✓ Jìròyìn egbogi èké fún NAFDAC\n\nIPA NINU ARA ILU:\n✓ K\u1ecd\u0301 àwọn ẹbí àti ọ̀rẹ́ rẹ\n✓ Ṣàtìl\u1eb9\u0300yìn fún sísọ egbogi nù lọ́nà tó tọ́\n✓ Gbèjà fún kí ilé-egbogi ní ìwé àṣẹ\n✓ Jìròyìn àwọn tó ń ta egbogi lọ́nà tó lòdì\n\nNÍGBÀ TÍ O BÁ Ń RA EGBOGI:\n✓ Ra láti ilé-egbogi tó ní àṣẹ nìkan\n✓ Béèrè fún ìwé egbogi\n✓ Ṣàyẹ̀wò bóyá egbogi náà jẹ́ òótọ́\n✓ Tọ́jú rásìtì rẹ\n✓ Jìròyìn èyíkéyìí egbogi èké`,
            ig: `Lụso mgbochi antibiotics ọgụ site na:\n\nỌRỤ GỊ:\n✓ Ejila ọgwụ antibiotics eme ihe n\'onwe gị na-enweghị akwụkwọ dọkịta\n✓ Mechaa usoro ọha niile mgbe niile\n✓ Esoritana ọgwụ antibiotics gị na ndị ọzọ\n✓ Ejila ọgwụ antibiotics fọdụrụnụ\n✓ Jụọ dọkịta gị ka ọ nyochaa gị tupu ị were antibiotics\n✓ Gwa NAFDAC maka ọgwụ adịgboroja\n\nỌRỤ MMADỤ NIILE NWE:\n✓ Kụziere ezinụlọ gị na ndị enyi gị\n✓ Kwado atụfu ọgwụ n\'ụzọ kwesịrị ekwesị\n✓ Kwado maka ikikere ụlọ ahịa ọgwụ\n✓ Gwa ndị ọchịchị ma ị hụ onye na-ere ọgwụ n\'ụzọ ezighi ezi\n\nMGbe ị na-azụ ọgwụ:\n✓ Zụta naanị n\'ụlọ ahịa ọgwụ nwere ikikere\n✓ Jụọ maka akwụkwọ dọkịta\n✓ Lelee ma ọgwụ ahụ bụ nke mbụ\n✓ Debe nnata ego gị\n✓ Gwa maka ngwaahịa ọ bụla adịgboroja`
          })
        }
      ],
      quiz: [
        {
          question: lang({en:'What contributes to antibiotic resistance?',pidgin:'Wetin dey cause antibiotic resistance?',ha:'Me ke taimakawa juriyar antibiotics?',yo:'Kí ni ó ń fa ìfilọ́ antibiotics?',ig:'Gịnị na-enye aka na mgbochi antibiotics?'}),
          options: [
            { text: lang({en:'Completing the full course of antibiotics',pidgin:'To finish the full course wey doctor tell you',ha:'Kammala cikakken koryar antibiotics',yo:'Pípari gbogbo kóọsì antibiotics',ig:'Imecha usoro ọgwụ antibiotics niile'}), correct: false },
            { text: lang({en:'Stopping antibiotics early when you feel better',pidgin:'To stop antibiotic early when you don feel better',ha:'Dakatar da antibiotics da wuri lokacin da kaji sauƙi',yo:'Dídá antibiotics dúró ní kùtùkùtù nígbà tí ara bá yá',ig:'Ịkwụsị antibiotics n\'isi ụtụtụ mgbe ahụ gị dị gị mma'}), correct: true },
            { text: lang({en:'Following your doctor\'s instructions exactly',pidgin:'To follow wetin doctor tell you exactly',ha:'Bin umarnin likitanka daidai',yo:'Títẹ̀lé ìlànà oníṣègùn rẹ gangan',ig:'Ime ihe dọkịta gị kwuru kpọmkwem'}), correct: false },
            { text: lang({en:'Taking antibiotics with food',pidgin:'To take antibiotic with food',ha:'Shan antibiotics tare da abinci',yo:'Mímu antibiotics p\u1eb9\u0300l\u00fa oúnj\u1eb9',ig:'Iwere antibiotics na nri'}), correct: false }
          ],
          explanation: lang({en:'Stopping antibiotics early allows resistant bacteria to survive and multiply. Always complete the full prescribed course, even if you feel better.',pidgin:'If you stop antibiotic early, bacteria wey strong go survive and grow pass before. Always finish your full course even if you don feel better.',ha:'Dakatar da antibiotics da wuri yana ba ƙwayoyin cuta masu juriya damar tsira da yawaita. Koyaushe kammala cikakken koryar da aka rubuta, koda kuwa kaji sauƙi.',yo:'Dídá antibiotics dúró ní kùtùkùtù ń gba bakitéríà onífilọ́ láàyè láti yè àti láti pọ̀ sí i. Máa parí kóọsì tí a kọ fún ọ ní gbogbo ìgbà, àní bí o bá ti dára.',ig:'Ịkwụsị antibiotics n\'isi ụtụtụ na-enye bacteria nwere mgbochi ohere ịdị ndụ na ịba ụba. Mechaa usoro ọha niile mgbe niile, ọbụna ma ị mara mma.'})
        },
        {
          question: lang({en:'How do bacteria become resistant to antibiotics?',pidgin:'How bacteria dey take get resistance for antibiotic?',ha:'Yaya ƙwayoyin cuta ke zama masu juriya ga antibiotics?',yo:'Báwo ni bakitéríà ṣe ń ní ìfilọ́ sí antibiotics?',ig:'Kedu ka bacteria si enweta mgbochi na antibiotics?'}),
          options: [
            { text: lang({en:'By drinking contaminated water',pidgin:'By to drink dirty water',ha:'Ta hanyar shan ruwa mai gurɓata',yo:'Nípa mímu omi tó dọ̀tí',ig:'Site na ịṅụ mmiri ruru unyi'}), correct: false },
            { text: lang({en:'By exposure to incorrect antibiotic use which allows resistant strains to survive',pidgin:'When people use antibiotic for wrong way, e allow some bacteria to survive',ha:'Ta hanyar fallasa ga amfani da antibiotic mara kyau wanda ke ba wa nau\'ikan masu juriya damar tsira',yo:'Nípa lilo antibiotics lọ́nà tí kò tọ́ tó ń gba àwọn onífilọ́ láàyè láti yè',ig:'Site na ejighị ọgwụ antibiotics mee ihe kwesịrị nke na-enye ohere ka bacteria guzogide dị ndụ'}), correct: true },
            { text: lang({en:'By natural aging',pidgin:'By the way person dey old',ha:'Ta hanyar tsufa na halitta',yo:'Nípa dída-àgbà',ig:'Site na ịka nka'}), correct: false },
            { text: lang({en:'By sunlight exposure',pidgin:'By sun wey too hot',ha:'Ta hanyar fallasa ga hasken rana',yo:'Nípa dīdùn oòrùn',ig:'Site na ekpuchiri anwụ'}), correct: false }
          ],
          explanation: lang({en:'Bacteria that survive antibiotic exposure (due to misuse, incomplete courses, or wrong dosing) multiply and pass on their resistance to new bacteria.',pidgin:'Bacteria wey no die when you use antibiotic for wrong way go multiply and pass their power to other bacteria.',ha:'ƙwayoyin cuta da suka tsira daga fallasa ga antibiotics (saboda rashin amfani da ya dace, gajeren koryar magani, ko allura mara dace) suna yawaita kuma suna tura juriyarsu ga sababbin ƙwayoyin cuta.',yo:'Bakitéríà tí ó yè látàrí ìbáṣepọ̀ pẹ̀lú antibiotics (nítorí ìlòkúlò, àìparí kóọsì, tàbí ìwọn lílo tó ṣìnà) ń pọ̀ sí i, wọ́n sì ń tan ìfilọ́ wọn sí àwọn bakitéríà tuntun.',ig:'Bacteria ndị dị ndụ n\'agbanyeghị ọgwụ antibiotics (n\'ihi ejighị ya mee ihe kwesịrị, usoro akwụsịrị na mkpu, ma ọ bụ ọnụọgụ ezighi ezi) na-aba ụba ma na-enyefe mgbochi ha na bacteria ọhụrụ.'})
        },
        {
          question: lang({en:'What is a superbug?',pidgin:'Wetin be superbug?',ha:'Menene superbug?',yo:'Kí ni superbug?',ig:'Gịnị bụ superbug?'}),
          options: [
            { text: lang({en:'A very large insect',pidgin:'One big insect',ha:'Wani babban kwaro',yo:'Kòkòrò tó tóbi gidigidi',ig:'Ahụhụ buru ibu nke ukwuu'}), correct: false },
            { text: lang({en:'A bacteria that is resistant to multiple antibiotics',pidgin:'Bacteria wey many antibiotic no fit kill',ha:'ƙwayar cuta wacce ke jurewa antibiotics da yawa',yo:'Bakitéríà tó dárí ìjà sí ọ̀pọ̀lọpọ̀ antibiotics',ig:'Bacteria nke na-eguzogide ọtụtụ ọgwụ antibiotics'}), correct: true },
            { text: lang({en:'A viral infection',pidgin:'Virus sickness',ha:'Cutar hoto/viral',yo:'Àrùn fáírọ̀ọ̀sì',ig:'Ọrịa virus'}), correct: false },
            { text: lang({en:'A type of fungal infection',pidgin:'One kind fungs infection',ha:'Wani nau\'in cutar fungal',yo:'Irú àrùn fúngí kan',ig:'Ụdị ọrịa fungal'}), correct: false }
          ],
          explanation: lang({en:'Superbugs are bacteria that have developed resistance to one or more antibiotics, making them very difficult to treat.',pidgin:'Superbugs na bacteria wey don learn how to fight back many antibiotics. E dey very hard to treat them.',ha:'Superbugs ƙwayoyin cuta ne waɗanda suka samar da juriya ga ɗaya ko fiye na antibiotics, wanda hakan ke sa su da wahalar gaske don kulawa.',yo:'Àwọn superbugs jẹ́ bakitéríà tí ó ti ní ìfilọ́ sí ọ̀kan tàbí jù bẹ́ẹ̀ lọ antibiotics, èyí tó sọ wọ́n di ohun tó ṣòro láti tọ́jú.',ig:'Superbugs bụ bacteria ndị nwetara mgbochi na otu ma ọ bụ karịa ọgwụ antibiotics, na-eme ka ọ fọrọ nke nta ka ọ ghara ikwe omume ịgwọ ha.'})
        },
        {
          question: lang({en:'How many deaths annually in Nigeria are linked to antibiotic resistance?',pidgin:'How many people dey die every year for Nigeria because of antibiotic resistance?',ha:'Mutuwar mutane nawa a kowace shekara a Najeriya ke da alaƙa da juriyar antibiotics?',yo:'Iku mélòó lọ́dọọdún ní Nàìjíríà ni ó tan mọ́ ìfilọ́ antibiotics?',ig:'Mmadụ ole na-anwụ kwa afọ na Nigeria n\'ihi mgbochi antibiotics?'}),
          options: [
            { text: lang({en:'Fewer than 10,000',pidgin:'Less pass 10,000',ha:'Kasa da 10,000',yo:'Kìí tó 10,000',ig:'Ntakịrị karịa 10,000'}), correct: false },
            { text: lang({en:'Around 50,000',pidgin:'Almost 50,000',ha:'Kusan 50,000',yo:'Bíi 50,000',ig:'Ihe dị ka 50,000'}), correct: false },
            { text: lang({en:'Over 110,000',pidgin:'Pass 110,000',ha:'Fiye da 110,000',yo:'Ju 110,000 lọ',ig:'Ihe karịrị 110,000'}), correct: true },
            { text: lang({en:'Resistance causes no deaths',pidgin:'Resistance no dey kill person',ha:'Juriya ba ta haifar da mutuwa',yo:'Ìfilọ́ kìí pa ènìyàn',ig:'Mgbochi anaghị egbu mmadụ'}), correct: false }
          ],
          explanation: lang({en:'Over 110,000 deaths annually in Nigeria are linked to antibiotic resistance, making it a critical public health issue.',pidgin:'Pass 110,000 people dey die for Nigeria every year because of antibiotic resistance. This one na big wahala for public health.',ha:'Fiye da mutuwar mutane 110,000 a kowace shekara a Najeriya ke da alaƙa da juriyar antibiotics, wanda hakan ya sa ya zama muhimmiyar matsalar lafiyar jama\'a.',yo:'Ju ikú 110,000 lọ lọ́dọọdún ní Nàìjíríà ni ó tan mọ́ ìfilọ́ antibiotics, èyí tó sọ ọ́ di ọ̀ràn ìlera ará ìlú tó ṣe kókó.',ig:'Ihe karịrị mmadụ 110,000 na-anwụ kwa afọ na Nigeria n\'ihi mgbochi antibiotics, na-eme ka ọ bụrụ nsogbu ahụike ọha na eze.'})
        },
        {
          question: lang({en:'What percentage of antibiotics in Nigeria are obtained without prescriptions?',pidgin:'Wetin be the percentage of antibiotic wey people dey buy without doctor paper for Nigeria?',ha:'Wane kaso na antibiotics a Najeriya ake samu ba tare da takardar sayen magani ba?',yo:'Ìpín mélòó nínú ọgọ́rùn-ún antibiotics ní Nàìjíríà ni a ń rà láìsí ìwé egbogi?',ig:'Pasent ole nke ọgwụ antibiotics na Nigeria ka a na-enweta na-enweghị akwụkwọ dọkịta?'}),
          options: [
            { text: lang({en:'Less than 10%',pidgin:'Less pass 10%',ha:'Kasa da 10%',yo:'Kìí tó 10%',ig:'Ntakịrị karịa 10%'}), correct: false },
            { text: lang({en:'Around 40%',pidgin:'Almost 40%',ha:'Kusan 40%',yo:'Bíi 40%',ig:'Ihe dị ka 40%'}), correct: true },
            { text: lang({en:'Over 80%',pidgin:'Pass 80%',ha:'Fiye da 80%',yo:'Ju 80% lọ',ig:'Ihe karịrị 80%'}), correct: false },
            { text: lang({en:'All antibiotics require prescriptions',pidgin:'All antibiotic need doctor paper',ha:'Duk antibiotics na buƙatar takardar sayen magani',yo:'Gbogbo antibiotics nílò ìwé egbogi',ig:'Ọgwụ antibiotics niile chọrọ akwụkwọ dọkịta'}), correct: false }
          ],
          explanation: lang({en:'Over 40% of antibiotics in Nigeria are obtained without prescriptions, largely from open markets and unlicensed vendors, contributing to resistance.',pidgin:'Pass 40% of antibiotic for Nigeria, people dey buy am without doctor paper, mostly for market and people wey no get license. This one dey contribute well well to resistance.',ha:'Fiye da 40% na antibiotics a Najeriya ana samun su ne ba tare da takardar sayen magani ba, galibi a kasuwanni buɗe da masu sayarwa mara lasisi, wanda ke ba da gudummawa ga juriya.',yo:'Ju 40% antibiotics lọ ní Nàìjíríà ni a ń rà láìsí ìwé egbogi, púpọ̀ jùlọ láti ọjà gbangba àti lọ́wọ́ àwọn tó ń ta egbogi láìní àṣẹ, èyí tó ń fa ìfilọ́.',ig:'Ihe karịrị 40% nke ọgwụ antibiotics na Nigeria ka a na-enweta na-enweghị akwụkwọ dọkịta, ọ kachasị site n\'ahịa mepere emepe na ndị na-ere ahịa na-enweghị ikikere, na-atụnye ụtụ na mgbochi.'})
        }
      ]
    },

    'proper-use': {
      title: lang({en:'Proper Antibiotic Use',pidgin:'How To Use Antibiotic Well',ha:'Kyakkyawan Amfani Da Antibiotics',yo:'Lílo Antibiotics Lọ́nà Tó Tọ́',ig:'Iji Antibiotics Eme Ihe nke Ọma'}),
      sections: [
        {
          title: lang({en:'The Golden Rules',pidgin:'The Main Rules',ha:'Hanyoyi Mafi Muhimmanci',yo:'Àwọn Òfin Pàtàkì',ig:'Iwu Ọlaedo'}),
          content: lang({
            en: `Follow these rules EVERY time you take antibiotics:\n\n1. ONLY take antibiotics prescribed by a healthcare provider\n2. COMPLETE the full course - never stop early\n3. TAKE them at the right times and doses\n4. NEVER share or use someone else's antibiotics\n5. DON'T save leftover antibiotics for later\n6. ASK questions if you don't understand instructions\n7. REPORT any unusual side effects to your doctor\n8. KEEP track of what you're taking and when`,
            pidgin: `Make you follow these rules ANY TIME you dey take antibiotic:\n\n1. ONLY take antibiotic wey doctor write for you\n2. FINISH am completely - no stop am halfway\n3. TAKE am for correct time and the correct amount\n4. NEVER share or use another person antibiotic\n5. NO KEEP the one wey remain for future\n6. ASK question if you no understand how to take am\n7. TELL your doctor if you dey feel uncomfortable after you take am\n8. WRITE down the name and time you take am so you no go forget`,
            ha: `Bi waɗannan dokoki KOWANE lokaci da kake shan antibiotics:\n\n1. KAWAI ɗauki antibiotics da likitanka ya rubuta\n2. KAMMALA maganin duka - kada ka tsaya rabi\n3. SHAA a kan kari da kuma yadda aka ce\n4. KADA ka taɓa raba ko amfani da antibiotics na wani\n5. KADA ka ajiye maganin da ya rage don gaba\n6. TAMBAYA idan ba ka fahimci yadda za ka sha ba\n7. GAYAMA likitanka duk wani abin da ka ji wanda bai dace ba\n8. KIYAYE abin da kake sha da kuma lokacin da kake sha`,
            yo: `Tẹ̀lé àwọn òfin wọ̀nyí NÍ GBOGBO ÌGBÀ tí o bá ń mú antibiotics:\n\n1. MÚ antibiotics tí dókítà rẹ kọ nìkan\n2. PARÍ rẹ̀ pátápátá - má ṣe dúró láàrín\n3. MÚ wọn ní àkókò tó tọ́ àti ìwọ̀n tó tọ́\n4. MÁ ṢE pín tàbí lo antibiotics ẹlòmíràn láé\n5. MÁ ṢE fi antibiotics tó kù pamọ́ fún ọjọ́ iwájú\n6. BÈÈRÈ ìbéèrè bí o kò bá lóye ìtọ́sọ́nà\n7. TỌPÍN ewu èyíkéyìí tó ṣẹlẹ̀ sí dókítà rẹ\n8. MÁA TỌ́JÚ orúkọ àti àkókò tí o mú wọn`,
            ig: `Soro iwu ndị a MGBE Ọ BỤLA ị na-aṅụ antibiotics:\n\n1. NAANỊ ṅụọ antibiotics dọkịta gị kọwara\n2. GMECHAA ọgwụ ahụ - akwụsịla ya n'etiti\n3. ṄỤỌ ya na oge kwesịrị ekwesị na ole kwesịrị\n4. EKERỊTALA ma ọ bụ jiri antibiotics onye ọzọ\n5. ECHEKWALA antibiotics fọdụrụ maka oge ọzọ\n6. JỤỌ ajụjụ ma ọ bụrụ na ịghọtaghị otu esi aṅụ ya\n7. GWA dọkịta gị ma ọ bụrụ na ọ dị njọ n'ahụ gị\n8. DEE aha ya na oge ị na-aṅụ ya`
          })
        },
        {
          title: lang({en:'Why Completing the Course Matters',pidgin:'Why E Good Make You Finish Your Medicine',ha:'Me Ya Sa Kammala Koryar Ke Da Muhimmanci',yo:'Ìdí Tí Pípari Ẹ̀kọ́ Ṣe Pàtàkì',ig:'Ihe Mere Imecha Usoro Jiri Dị Mkpa'}),
          content: lang({
            en: `You might feel better after 2-3 days, but bacteria may still be present. Stopping early:\n\n• Allows remaining bacteria to survive\n• Gives resistant strains a chance to multiply\n• Can cause the infection to return stronger\n• Contributes to community resistance\n\nYOUR SYMPTOMS IMPROVING ≠ INFECTION ELIMINATED\n\nThe infection may take longer to be fully cured than the time it takes for your body to stop showing symptoms. Bacteria numbers may still be high even though you feel well.\n\nComplete the full course to ensure all bacteria are destroyed.`,
            pidgin: `You fit feel better after 2-3 days, but the bacteria fit still dey your body. If you stop early:\n\n• The bacteria wey remain fit survive\n• E fit give the strong bacteria chance to grow\n• E fit make the sickness come back stronger\n• E dey cause wahala for the whole community\n\nYOUR BODY DON DO WELL ≠ NO SICKNESS AGAIN\n\nSickness fit take long time to clear finish for your body even if you don start to feel well. Bacteria fit still plenty even though you dey feel healthy.\n\nMake you finish all your medicine so that all the bacteria go die.`,
            ha: `Za ka iya jin daɗi bayan kwanaki 2-3, amma ƙwayoyin cutar na iya kasancewa a jikinka. Idan ka tsaya rabi:\n\n• Yana ba da damar ƙwayoyin cutar da suka rage su rayu\n• Yana ba da tabbatattun ƙwayoyin cuta damar karuwa\n• Zai iya sa ciwon ya dawo da ƙarfi\n• Yana kawo matsala ga al'umma\n\nJINKA DA DAƊI ≠ CIWON YA KARE\n\nCiwon yana iya ɗaukar lokaci mai tsawo kafin ya warke fiye da yadda kake tsammani koda kana jin dadi. Ƙwayoyin cuta na iya zama da yawa koda kana jin dadi.\n\nKammala maganin gaba daya don tabbatar da cewa an kashe duk ƙwayoyin cutar.`,
            yo: `Ara rẹ lè yá lẹ́yìn ọjọ́ 2-3, sùgbọ́n bakitéríà lè ṣì wà nínú rẹ̀. Bí o bá dáwọ́ dúró laarin:\n\n• Ó gba àwọn bakitéríà tó kù láàyè láti yè\n• Ó tún máa jẹ́ kí àwọn bakitéríà tó lágbára pọ̀ sí i\n• Ó lè mú kí àìsàn náà padà wá pẹ̀lú agbára\n• Ó ń kó bára fún àwùjọ\n\nBÍ ARA RẸ BÁ YÁ ≠ ÀÌSÀN TI LỌ\n\nÀìsàn rẹ lè pẹ́ kí ó tó san jù bí o ṣe rò lọ. Bakitéríà lè pọ̀ rẹpẹtẹ nínú rẹ, bó tilẹ̀ jẹ́ pé ara rẹ ti ń yá.\n\nParí oògùn rẹ̀ pátápátá láti rí i dájú pé o ti pa gbogbo bakitéríà yẹn run.`,
            ig: `Ahụ gị nwere ike ịdị mma ka ụbọchị abụọ ma ọ bụ atọ gasịrị, mana nje bacteria nwere ike ịnọ n'ime gị. Ọ bụrụ na ị kwụsị n'etiti:\n\n• Ọ na-enye bacteria fọdụrụ ohere ịdị ndụ\n• Ọ na-eme ka bacteria siri ike baa ụba\n• Ọ nwere ike ime ka ọrịa ahụ laghachi na ike\n• Ọ na-ebute nsogbu n'obodo\n\nAhụ gị ịdị mma ≠ Ọrịa ahụ apụọla\n\nỌrịa ahụ nwere ike iwe oge tupu ọ laa karịa oge ị na-eche ya ọ bụ ezie na ahụ gị dị gị mma. Nje bacteria nwere ike ịdị ọtụtụ ọ bụ ezie na ọ dị gị mma n'ahụ.\n\nGbaa mbọ mechaa ọgwụ ahụ kpamkpam iji jide n'aka na i gbuo nje bacteria ahụ. `
          })
        },
        {
          title: lang({en:'What to Do If You Have Side Effects',pidgin:'Wetin to Do If Peppermint No Agree With Your Body',ha:'Abin da Zaku Yi Idan Kuna Da Matsala',yo:'Ohun Tí Lati Ṣe Tí Ara Rẹ Kò Bá Gba Ẹkọ́',ig:'Ihe I Kwesịrị Ime Mgbe I Nweghị Ihe'}),
          content: lang({
            en: `If you experience side effects:\n\nDO:\n✓ Contact your healthcare provider\n✓ Report the symptoms you're experiencing\n✓ Ask if you should continue taking the medication\n✓ Follow their guidance\n✓ Document when symptoms started\n\nDON'T:\n✗ Stop taking the antibiotic without medical advice\n✗ Ignore serious side effects\n✗ Self-adjust the dose\n✗ Switch to someone else's medication\n\nCOMMON MILD SIDE EFFECTS (can usually be managed):\n• Nausea - take with food\n• Diarrhea - stay hydrated\n• Mild rash - report to doctor\n\nSERIOUS SIDE EFFECTS (seek help immediately):\n• Severe allergic reactions\n• Difficulty breathing\n• Severe rash or skin reactions`,
            pidgin: `If antibiotic give you any wahala:\n\nWETIN YOU SUPPOSE DO:\n✓ Call your doctor\n✓ Tell them wetin dey do you\n✓ Ask if make you continue to dey take am\n✓ Do exactly wetin doctor tell you\n✓ Write down when the wahala start\n\nWETIN YOU NO SUPPOSE DO:\n✗ Make you no stop am without wetin doctor tell you\n✗ Make you no just overlook serious wahala\n✗ Make you no reduce the amount by yourself\n✗ Make you no take another person medicine\n\nWAHALA WEY NO TOO MUCH (you fit handle am):\n• Nausea - chop food before you take am\n• Diarrhea - drink plenty water\n• Small stretch marks - tell your doctor\n\nSERIOUS WAHALA (reach hospital sharp sharp):\n• Severe allergic reactions\n• If breathing dey hard\n• Big big rashes for body`,
            ha: `Idan ka samu wata matsala:\n\nABIN DA ZAKU YI:\n✓ Tuntuɓi likitanka\n✓ Gaya masa yadda kake ji\n✓ Tambaye shi idan za ka ci gaba da sha\n✓ Yi abinda yace daidai\n✓ Rubuta lokacin da matsalar ta tashi\n\nABIN DA BAA YI:\n✗ Kada ka tsaya ba tare da shawara na likita ba\n✗ Kada ka dauka babban matsala as wasa\n✗ Kada ka rage yawa a kanka\n✗ Kada ka sauya zuwa maganin wani\n\nƘANAN MATSALOLI (anda za'a iya mantawa):\n• Ciwon kai - sha magani da abinci\n• Gudawa - sha ruwa sosai\n• Kanan kwayoyi - gaya likita\n\nBABBAN MATSALOLI (koma asibiti yanzu):\n• Matsala a numfashi\n• Matsala masu tsanani na fata`,
            yo: `Bá ọ̀ràn kan bá wáyé:\n\nOHUN TÍ LATI ṢE:\n✓ Pe dókítà rẹ\n✓ Sọ ohun tí ń ṣe ẹ́ fún wọn\n✓ Béèrè bí o bá lè máa bá a lọ\n✓ Tẹ̀lé ìmọ̀ràn wọn\n✓ Kọ sìgbà tí kókó náà bẹ̀rẹ̀\n\nOHUN TÍ O KÒ GBỌDỌ̀ ṢE:\n✗ Má ṣe dá oògùn dúró láì gba ìmọ̀ràn dókítà\n✗ Má ṣe ṣáájú ohun tó le\n✗ Má ṣe ṣe àtúnṣe agbára fúnra rẹ\n✗ Má ṣe gbìyànjú oògùn ẹlòmíràn\n\nÀWỌN WÀHÁLÀ TÓ YÁ (a lè yanjú):\n• Nausea - mú oògùn yìí pẹ̀lú oúnjẹ\n• Ìgbẹ́gbẹ́ - máa mu omi púpọ̀\n• Iwọ̀n ìrora - ṣàlàyé fún dókítà\n\nÀWỌN WÀHÁLÀ JÙLỌ (lọ sí ilé ìwòsàn léèrè):\n• Àwọn ìhùwadà burúkú\n• Ìṣòro ìmí\n• Àwọn àpá burúkú tàbí ìhùwadà awọ ara`,
            ig: `Ọ bụrụ na i nwee nsogbu ọ bụla:\n\nIE NDI I KWESỊRỊ IME:\n✓ Kpọọ dọkịta gị\n✓ Gwa ha etu ọ dị gị n'ahụ\n✓ Jụọ ma ọ bụrụ na ị ka ga-anọgide na-aṅụ ya\n✓ Soro ntụziaka ha\n✓ Dee oge nsogbu ahụ bidoro\n\nIHE I KWESỊGHỊ IME:\n✗ E kwụsịla ịṅụ ọgwụ n'enweghị ndụmọdụ dọkịta\n✗ Elefuru ihe gbasara nsogbu siri ike\n✗ E belatala egwu onwe gị\n✗ E nwezie ọgwụ onye ọzọ\n\nNSOGBU NTA (nke ị pụrụ iji njikwa):\n• Nausea - wetere ya nri\n• Diarrhea - hụ na ị na-aṅụ mmiri nke ọma\n• Obere rash - kpọtụrụ dọkịta gị\n\nNSOGBU SI IHE (Gaa n'ụlọ ọgwụ ngwa ngwa):\n• Ahụ mmeghachi omume siri ike\n• Nsogbu iku ume\n• Rash ma ọ bụ ahụike anụ ahụ dị njọ`
          })
        },
        {
          title: lang({en:'Storage & Safety',pidgin:'How to Keep and Use Antibiotic Well',ha:'Ma\'adanar & Tsaro',yo:'Ìpamọ́ & Àbò',ig:'Nchekwa & Nchekwa'}),
          content: lang({
            en: `Store antibiotics properly:\n\nPROPER STORAGE:\n• Keep in cool, dry place\n• Store away from children\n• Keep in original container with label\n• Don't refrigerate unless instructed\n• Check expiration dates\n• Don't expose to direct sunlight\n\nDISPOSAL:\n• Never throw in trash or flush down toilet\n• Check for community drug take-back programs\n• Mix with undesirable substance (coffee grounds, salt) in plastic bag if no program available\n• Remove personal information from containers\n\nWHY IT MATTERS:\n- Improper disposal contaminates water supplies\n- Discarded antibiotics can be picked up by people\n- Environmental antibiotics harm ecosystems\n- Can promote resistance in environmental bacteria`,
            pidgin: `Keep your antibiotic in a good place:\n\nGOOD WAYS TO KEEP AM:\n• Put am in a cool and dry place\n• Make sure pikin dem no fit reach am\n• Leave am inside the container where e follow come with the label\n• No put am inside fridge unless doc tell you\n• Open your eyes for expiration dates\n• No let am touch direct sun\n\nWHEN YOU WAN THROW AM WAY:\n• No throw am entering your dustbin or flush am inside toilet\n• Find whether your area get program wey dey take medicine wey remain\n• If program no dey, mix am with things like salt inside a nylon tie am well to throw am\n• Cancel any personal detail wey dey your containers\n\nWHY THIS NA BIG DEAL:\n- If you throw wetin remain anyhow, e fit spoil drinking water \n- Person fit pick am up go use am again\n- When antibiotic flow outside, it fit cause harm\n- It fit make bad bacteria wey dey outside stronger`,
            ha: `Ka adana antibiotics naka a waje dake da kyau:\n\nADAJIN YI:\n• Ajiye a waje mai sanyi, babu ruwa\n• Nisantar da ita daga yara\n• Ajiye shi a cikin kwalban asali tare da tambarin\n• Kada a saka cikin faratice sai mun umarceh ɗan ba\n• Bincika kwanaki masu zuwa na mutuwa\n• Kada kuyi fallasa shi ga hasken rana kai tsaye\n\nYI AMFANI DA SHI:\n• Kada kaba saki am inta ci gida kuma ku yi tsuguno a cikin bandaki\n• Samu abin duba al'umma don sake tsara matakan zubar da miyagun ƙwayoyi\n• Hadaka shida da takalmin kofi ko gishiri a cikin jakar roba idan ba shiri samuwa\n• Cire bayanan na asali daga kwalaben\n\nMENENE MANUFAR:\n- Zaɓin ya wanzu tare da haɗaɗɗiyar kayan\n- Dukkai an watsar da ƙwayoyin cuta za su iya ƙwaƙaɓu da\n- Abubuwan kimiyya a ciki, da suka gurɓata\n- Za su iya ƙaddamar da ƙarfin ciki`,
            yo: `Fi antibiotics pamọ daradara:\n\nIFI PAMỌ DARADARA:\n• Fipamọ si ibi tutu, ogbele\n• Fipamọ s'ọtun s'ọdọ awọn ọmọde\n• Fipamọ sinu ìgò atilẹba rẹ̀  pẹ̀lú aami \n• Maṣe fi sinu firiji ayafi ti o ba so bẹ\n• Ṣayẹwo ọjọ ipari\n• Maṣe da silẹ si imuoorun gangan \n\nIDALẸNU:\n• Maṣe sọ sinu ìdọ̀tí tàbí sọ si inu ìgbọ̀nsẹ̀\n• Ṣayẹwo fún ewu ti o ba eto iṣètó oní-ìjọ̀rẹ́\n• Papọ̀ mọ ohun alaigbọ́wọ́gùkiri (igi kofi, iyo) nu iwe apo rọba ti ko rọ\n• Yọ alaye ara ẹni kuro ninu epo irẹyẹ\n\nKI NI O FẸ ṢE NA:\n- Idalẹnu lai-tọ npa ipese omi mọ\n- Awọn apamọra lù gba silẹ lè gbe\n- Àwọn eléyì tí o ti ṣiṣe yàn a maa ń fa ààrùn sí alèpọ\n- A lè pọsi pè ìbágbẹ̀ nipa bakteria iyan-èrí`,
            ig: `Chekwaa antibiotics n'ụzọ kwesịrị ekwesị:\n\nEBE A NA-EDEBE YA KPOKWU:\n• Debe n'ebe oyi, nkụ\n• Debe pụọ n'anya ụmụaka\n• Debe ya n'igbe mbụ  nwere aha \n• Etinyela na friji belụsọ e nyere ntụziaka\n• Lelee ụbọchị ngwụcha \n• Ewekwala ìhere gosi anwụ gboụ\n\nNKE NA-EGosi:\n• Atụbala ya n'ahịa maọbụ mmiri nsị\n• Lelee fọm ihe nweta  maka ọgwụ obodo a \n• Ngwakota wọtị mwekota gwa (ugwu kofe, nnu) bọtịnụ plastik na ọ dịghị ngalaba kpatara ya a nwaa\n• Wapụ ozi nkeonwe site na akpa  \n\nIHE MERE Ọ JI DỊ MKPA:\n- Nsụpụ na adịghị mma weghere nweta mmiriy \n- Atụfula ọgwụ pụrụ ijide site na mmadụ\n- Ekere ebe ọrụ akụkụ n'okpuru anyanwụ  egwuregwu\n- Nwere ike kwalite nguzogidel  ngwa na baịkị a mụnna`
          })
        },
        {
          title: lang({en:'Preventing Future Infections',pidgin:'How To Avoid Future Infection',ha:'Rigakafin Cututtukan da zasu kasance gaba',yo:'Idena Awọn Kokoro Ti Nbọ Loni',ig:'Ibochigide Ọrịa Ọdịnihu'}),
          content: lang({
            en: `While antibiotics treat infections, prevention is better:\n\nHYGIENE PRACTICES:\n✓ Wash hands frequently with soap and water\n✓ Practice good food hygiene\n✓ Keep wounds clean and covered\n✓ Don't share personal items (toothbrush, makeup, razors)\n✓ Maintain good sanitation\n\nWHEN TO SEE A DOCTOR:\n✓ Fever lasting more than 3-5 days\n✓ Wounds showing signs of infection (pus, warmth, increasing pain)\n✓ Persistent symptoms despite home care\n✓ Symptoms of common bacterial infections\n\nVACCINATION:\n✓ Keep vaccinations current\n✓ Prevents many infections from starting\n✓ Reduces antibiotic need\n✓ Protects your community`,
            pidgin: `True true antibiotics go kill infection, but make you avoid infection na him beta pass:\n\nHOW DO KEEP YOURSELF CLEAN:\n✓ Always use soap to wash your hand\n✓ Treat your food well so you no get sick\n✓ Cover your wound sharp sharp make e no catch bad things\n✓ No give another person wetin you use for your body like razor\n✓ Make sure your envirnoment dey spark clean\n\nWHEN NA THE RIGHT TIME FOR DOCTOR:\n✓ If hot body hold you reach pass 3 days\n✓ When your sore start to smell, sweet, and red pass everyday\n✓ When small cold no let you rest, say to see Doctor beta\n✓ Sickness wey dey like ordinary bacterial infection\n\nVACCINATION YAM YAM DEY USEFUL:\n✓ To collect your injection na sure pass\n✓ Vaccination keep bad things far away\n✓ To reduce when doctor give you medicine that start with Auntie (Antibiotics)\n✓ Keep people for your envirnoment fine and clear`,
            ha: `Ganin cewa a ba magani cututtuka, rigakafi shi yafi dacewa:\n\nKYAKKYAWAN BAYANI:\n✓ Wanke hannu in gaskiya da sabulu\n✓ Karuwar kyawawan haƙoranci \n✓ Ci gaba da raunuka tsabta kuma an rufe shi\n✓ Kada ka raba abubuwa na musamman ko abin  fata (kamar burushin hakori)\n✓ Kasancewa da kyakkyawan tsabta\n\nLOKACIN GANIN LIKITA:\n✓ Ciwon zazzabi ya daɗi fiye da kwana 3 zuwa 5\n✓ Tsuntsauran raunuka suna nuna alamar kamuwa da cuta  kasa juji ko cuta (kamar cututtuka masu cutarwa na fata)\n✓ Alamu daganan  matsi a cikin gida don jinya  tun duba\n✓ Alamu nau'in nauyi ne na yanayin yanayin lafiya\n\nRANAR BANGARE SHIRI TASA:\n✓ Kula alluran riga-kafi\n✓ Yana tsaro yawancin ci gaba\n✓ Magance tsarin asali masu yawaitar da su\n✓ Kula tare da ku wanda yakamata ya gamsar al'ummarku`,
            yo: `Nígbà tó jẹ́ pé awọn atako ẹyẹlẹ ma f'ọwọ́ han ọwọ́ inkan ibi, idena ló dara jùlọ:\n\nÀṢILẸYẸ IBÁ ṢU ÒFIN:\n✓ Fo ọwọ rẹ lemọlemọf pẹlu idotI àti  tó gbọgbẹ\n✓ Bosi idanra dọgba loṣòr\n✓ Jeki egbò jẹ kika bo ti ṣe bójú tó\n✓ Maṣe pin iyẹwu tabi awon ohun elo ẹni (funra bi ewe iwè tabi bi wewe \n✓ Bojutò dídara \n\nNIGBA TI  WO A Dọkita:\n✓ Igbóná ojú ibà paapaa nipa 3 wọnyi tabi 5 \n✓ Awọn ami o nfihàn ti ikoko kan nfihan egbò gbogbo \n✓ Àwọn wàhálà yó pẹtẹkẹ̀ nínú èyì àtí ibi ipèsè onífẹnù\n✓ Àwọn ìhàwátẹ̀ ìparun aàrùn kòòkan tí o yẹra \n\nIYANYE IGBAGBỌ:\n✓ Sẹsẹ abẹrẹ oogun re \n✓ O idilọwọ̀ awon ipa ti ipọnju ti nwà sẹlẹ \n✓ Boju rẹ awọn ipa ọpọ wọnyi oogun \n✓ Jẹ iboju fun awùjọ nini ifarabalẹ́`,
            ig: `N’oge ogwu nke na luso ọrịa ọsọ, mgbochi ka mma nke mbụsọ :\n\nOMUME NDỊ DI OFEMA :\n✓ Sachaa aka gị ọsọ ọsọ n'ọma ahụike yana njiri ihe pụrụ iche \n✓ Na-anya ma o ga  anya mmezu  nke nri\n✓ Na-edebe ma gbochie iru \n✓ Edila ekedi onye  nyocha mma ma iwu\n✓ Nwee obodo nwere ihne mkpa nke nwute\n\nNIGBATI Ị HU CHỌN Dọkita:\n✓ Okpomọkụ nwuru pụrụ iche gafere karịa ụbọchị  ato ịbụ isri  3 nwayị 5 \n✓ Ighota irube na nsonazụ nweta pụrụ iche mbụ\n✓ Mba  mkpasu njedebe nweta afa nlekota n’ụlọ \n✓ Mgba ọsọ iru njị mmiri \n\nOGWU NDỊ NMETA :\n✓ Banye mmekota nke gbochiri onyunye \n✓ Ngabiga ndien nye irịba ama nke nrụgide kpamkpam\n✓ Ngwa n’anya igbochi mkpa gbasara mmelite ọgwụ\n✓ Enyere  nzụlite mbụ nye ndị  mkpagburu   obodo`
          })
        }
      ],
      quiz: [
        {
          question: lang({en:'When should you stop taking antibiotics?',pidgin:'When be the correct time to stop your antibiotic?',ha:'Yaushe ya kamata ka daina shan antibiotics?',yo:'Nigba wo ni o yẹ ki o duro gbigba antibiotics?',ig:'Olee oge ikwesiri ịkwụsị inwe antibiotics?'}),
          options: [
            { text: lang({en:'As soon as you feel better',pidgin:'When your body don tell you say you dey alari',ha:'Kamar yadda jin ka zai fada maka',yo:'Bó ti wù kí ó rí ń rí ireti si i',ig:'Ọ bụrụ na ị na-enwe obere mwute'}), correct: false },
            { text: lang({en:'After 2-3 days if symptoms improve',pidgin:'Wait give am 2-3 days when your fever reduce',ha:'Zaka iya dakata kwaniki biyu ko uku Idan kana ji dadi',yo:'Lehin ọjọ meji nipa pe ko si ami gidi',ig:'Mgbe ụbọchị atọ ikpe ikpe nke ahụ gị na-atụ obere'}), correct: false },
            { text: lang({en:'The full prescribed duration, even if you feel better',pidgin:'Even finish your drug the time the doctor tell you make you finish am',ha:'Ƙarshe duka har muddin koka ji kana da amfani da wargi',yo:'Bi ohun elo ogun naa wule si , paapaa ti o ba lo rí pe ori rẹ da gidi',ig:'Nnọgide ụbọchị ndị nile nke Ịgwọ ọrịa kwesịrị, n\'agbanyeghị mmetụta gị mere ị mara mma'}), correct: true },
            { text: lang({en:'When you have any side effects',pidgin:'Stop sharp am if you get problem',ha:'Sa\'ad da kaji kayi tsalle da maganin',yo:'Nigba tí rí abayọrisi oníbà',ig:'Na mkpọ gị nwere nkọwa ezighi ama ibé'}), correct: false }
          ],
          explanation: lang({en:'Always complete the full prescribed course to ensure all bacteria are eliminated and prevent antibiotic resistance.',pidgin:'Try well make you finish all the drugs doctor write so you can be sure the sickness will not disturb the drug tomorrow',ha:'Ya kamata mu sha magani daga lokaci na likita har cike, saboda ba ruwanta da cutar jiki',yo:'Lọwọ lati lo gbogbo iwọn-ara naa si n gboju gbogbo awọn abajade wọnyii pe agbara gbese kẹhin ',ig:'Gbọrọ usoro ihe ahụike ije nke gbanwere ike ahụ iji hụ nje bu ahụ iji wụfu nzaghachi nweta ọgwụ ahụike '})
        },
        {
          question: lang({en:'What should you do if you experience side effects from antibiotics?',pidgin:'What you should do if you feel bad when using your antibiotics',ha:'Menene abinda yake kyau ku yi in kun sha kuma ka ji m?',yo:'Kini gbogbo ipejuwe ti iwọ ba ri ohun ijinlẹ lẹwa e gbajumọ ogun rẹ̀ ?',ig:'Mgbe i nwetara ihe niile ịchọtabara mgbe idere ihe ọṅụṅụ igwọ?'}),
          options: [
            { text: lang({en:'Stop taking them immediately',pidgin:'Stop to take am straight',ha:'Takama tsayawa asali maganin',yo:'Dúró lati ri rẹ ni ijo keji',ig:'Kwushiri inwe ha na nwayọọ'}), correct: false },
            { text: lang({en:'Contact your healthcare provider for guidance',pidgin:'Enter talk with your doctor for instructions on top am',ha:'Likitanta domin ya taimake ka',yo:'E ba awon osise ìlera lopin  ọgún igbaniyanju',ig:'Akpọrọ ntuziaka onye kwadoro gị '}), correct: true },
            { text: lang({en:'Take half the dose',pidgin:'Cut your drug in half',ha:'Dibar a cikin kofarka',yo:'O dẹ gba idaji  oju iwọn',ig:'Mgbe ogbere ọnọdụ ọṅụṅụ '}), correct: false },
            { text: lang({en:'Switch to someone else\'s medication',pidgin:'Pack another person drug start dey take',ha:'Sauwka zuwa maganin ɗayan',yo:'Lo di oògun awon mii',ig:'Gbọcha ọnọjụ na ọnya mmadu niile'}), correct: false }
          ],
          explanation: lang({en:'Always contact your healthcare provider if you experience side effects. They can advise whether to continue or adjust your treatment.',pidgin:'Just hold talk doctor when any side effects happen them will help you how to correct the issues or continue your waka drug',ha:'Kasance tare da likitanka idan kasamu wani canji a yanayi ba. Zai ci gaba da taimakon sa don inganta ragi kan jin dadi',yo:'E lo awon ewe ìtọsọ̀nà lodo won e si yẹ wo fun oṣuwọn tabi igbese ibamu',ig:'Tinye ihe igwe anya nye ezigbo onye chere banyere ihe nsonazụ nye gị .'})
        },
        {
          question: lang({en:'Why should you never share antibiotics with others?',pidgin:'Why your friend or brother no fit hold same drugs?',ha:'Dalilin da bayar da ku  sakamako likicin juriya?',yo:'Eeṣe ki ni idi fun iberu ti iwọ laya ka pin ohun ìrera pẹlu iyoku abinrin  ?',ig:'Eji gị enwetara ndị mgbatị ebughe na anyen enwe mgbatị ibe onye ọzọ  ?'}),
          options: [
            { text: lang({en:'To be selfish',pidgin:'Make person just look like greedy',ha:'Idan ka tsaya maka kwaliya',yo:'Bi iwọ jẹ okanṣoṣo eleru',ig:'Dị ka ihe inye echiche gbasara onwe onye'}), correct: false },
            { text: lang({en:'Because you need them for your infection',pidgin:'As the antibiotics use to work for only your infection',ha:'Saboda tana cikin alama na',yo:'Awọn jẹ fun iwulosilẹ tirẹ nikan',ig:'Maka na ị chọrọ ka agbapụsị ike ahụ nwere nsogbu gị '}), correct: false },
            { text: lang({en:'Because the antibiotic may not be appropriate for their infection and can cause harm',pidgin:'To give person antibiotics where go cause bad luck because e fit no be the same sickness.',ha:'Domin zai iya haifar da cutar wa zai kawo amfani domin ciwo shi ke',yo:'Idi nitori a mu ipọnju miiran bi awon kokoko kii baamu ohun iwà ipọnju lilo rẹ ',ig:'E kwesịrị eburu ihe ọnụahịa nye ahụ  ihe nwere ike ikwado ọrịa a , gbado mkpa onye niile '}), correct: true },
            { text: lang({en:'There is no reason to avoid sharing',pidgin:'Why you no go just part am wella',ha:'Babu wani kudin amfani a bayan shi',yo:'Kosí iyasotọ  yio lodo asiri  ti efi ni feti gbon',ig:'Ogogo anya dị mma ịbanye nsogbu '}), correct: false }
          ],
          explanation: lang({en:'Different infections require different antibiotics at different doses. Sharing can harm the other person and contribute to resistance.',pidgin:'Sickness go dey change base on pesin na why doctor tell you stop sharing drugs because of side effects where can help increase antibiotic issues',ha:'Zaman lafiya ita ce mabuɗi tsarin lafiyar abin  ciwo iri -iri ga mutane sabanin matakan yiwuwa na kaddarorin.',yo:'Awọn wàhálà o lodi fun ẹnikeni , gbigbesọ igbesoke awon nise  gbesi ipa awọn  yinyin rẹ .',ig:'Nke na a nye afa pụrụ idapụ Ọrịa ndika ọrịa ọrịa na ndo nti onye.'})
        },
        {
          question: lang({en:'How should you properly dispose of leftover antibiotics?',pidgin:'How be right process to troway remnant drugs where left',ha:'Ta yaya mizanika ya kawar da abin kwance wacce take ',yo:'Báwo ni iṣe isọdọtun ifiranṣẹ aipe ogun jije',ig:'Kedụ ihe igbabanye nlekota ọsụsụ mbụ ka eketa mkpụrụ gbaghaa?'}),
          options: [
            { text: lang({en:'Flush them down the toilet',pidgin:'Carry them go toilet den push em down to the pit',ha:'Rufa su su fita a ciki ruwa kwanonka',yo:'Ṣe ipese lọ inu akoto omi kanga ',ig:'Kwanyee ha  nye ime ahụike ntughari mmiri nnwoke ikporo '}), correct: false },
            { text: lang({en:'Throw them in the trash',pidgin:'Use  bin put the remaining drugs  dey go',ha:'Tura zuwa juji naka inda tace',yo:'Dalu fọ inu agbada inu egbin ',ig:'Maa ha n\'ahịhịa mme mme okpuru'}), correct: false },
            { text: lang({en:'Take them back to the pharmacy or use a community drug take-back program',pidgin:'Return the drugs to the store or find good system the government don bring about disposing expired products',ha:'Karbi shi nufi masu lafiyar ga zai warke daidai saurin jama-ar amfanin sa',yo:'A dake wo padà rọkàkà ibi gbagede  awọ ibesè ogun aipe awujọ giga ',ig:'Gaa site na ahia ọgwụ  weghachi okike agbamume nkwado oha mba mkpokọta '}), correct: true },
            { text: lang({en:'Save them for later use',pidgin:'Hold them down you fit use them anytime well ',ha:'Ajiye musu lafiya daga kwanuka na riga',yo:'Dura fú gbè a fi silẹ gba akoko mii  ',ig:'Cheki maka ọmume mmanya obodo mmachi anya'}), correct: false }
          ],
          explanation: lang({en:'Proper disposal prevents environmental contamination and stops people from accessing discarded medications inappropriately.',pidgin:'Throw drugs wella stop pure water around environment form dey spoiled by people taking  used medicine   wella by accident ',ha:'Mai da takarda cikin ladabi yayi tsaftan kayaya inda cewa wasu ko manya ba su gan shi  ta jikinka  ',yo:'A gbódidò  ni yíyo  ibaje igbo afẹmu yọ pẹlu omi oju iho lẹkọ ki eniyan ba yí iru ayelujara tẹnisi ',ig:'Ihe agbamakpe ụtu adịghachi ozi mmechi mkpa abawanye nweta agha  gbakwube mgbe oghere ihe ndị nkọ ahịa na ihu '})
        },
        {
          question: lang({en:'Where should antibiotics only be obtained from?',pidgin:'Where make you normally waka go get fine true medicine ',ha:'Daga wani asali  kasu  nemo lafiya karshe daban magunguna abin  rubutun shagon ?',yo:'Nibo gangan yẹ iṣe de ìlara ìléra dídà ',ig:'Aị nwee nwe ọgwụ obula maka ntuziaka onye kwadoro ? '}),
          options: [
            { text: lang({en:'Open markets without prescriptions',pidgin:'Market outside  house when nobody know doc ',ha:'A waje ga tsabar takarda domin bayarda alhaki ba',yo:'Pabari ile isowo ibebe lasan ',ig:'Mkpokọta ohere ihe na ekpuchiri maka ịgba okpu ọnụ '}), correct: false },
            { text: lang({en:'Friends and family',pidgin:'Family members go help well as doctor too .',ha:'Abokanai ko gida nufin su ba ka ',yo:'Awon alajọ mọ fọwọn si  tọkasi ',ig:'Mpaghara mbụ ma ndị ezinaụlọ na ibe ndị mmụta  kwa '}), correct: false },
            { text: lang({en:'Licensed pharmacies with a prescription from a healthcare provider',pidgin:'Original store wey doctor agree and the one dem give you letter  go meet .',ha:'Kungiya na baki kasuwanci in za kun yi sha  a takardu magani kyakkyawar .',yo:'Lọ sí ilé idakọ ti agbekale yato fun isise ẹri to ni itọsi oògun   ',ig:'Ochie nwee nkọ ahịa nke ntuziaka dọkịta nke dọkịta kpadoro nyekwara nze mkpo igosi '}), correct: true },
            { text: lang({en:'Any vendor offering them',pidgin:'Oga wey call him  say  medicine  dey stand buy for inside bus ',ha:'Wane tsari idan shagona a kan hanya',yo:'Itiju asiri ẹnìkejì kankan ba fi silẹ lodo ti idoko eja lọtọ',ig:'Obula mgbe e mechie okpuruko dọkịta nyekwaraghi'}), correct: false }
          ],
          explanation: lang({en:'Only licensed pharmacies with valid prescriptions ensure you get authentic, appropriate antibiotics for your specific infection.',pidgin:'See medicine doctor go make assure true one and make the correct drug available for exact your exact kind of fever no mix any one ',ha:'Duk yadda ya kasance akwai kungiyoyi da ke zayyabu tabbacin ka amshi tsarin da bai dace kuma ba matsala saboda kasuwan ba na gaskiya bane.',yo:'Eri ipara alawùro fihàn rẹ pé  ohun alaye isokuso abere tabi ajere oògùn kankan fi a yí ọ lọ , tètè lero si lori eyi gbiyanju  rẹ .',ig:'Ọgwụ gị site n\'ịkwado onye nwe ọgwụ maka oké nduzi si na nnọchite ọnọdụ maka nje mbụ bụ otu ibugo ọrịa .'})
        }
      ]
    }
  }

  const currentModule = modules[moduleId]
  if (!currentModule) {
    return <div>Module not found</div>
  }

  const handleQuizAnswer = (optionIndex) => {
    const question = currentModule.quiz[currentQuizIndex]
    const isCorrect = question.options[optionIndex].correct
    
    setQuizAnswers({ 
      ...quizAnswers, 
      [currentQuizIndex]: { optionIndex, isCorrect } 
    })
    setShowResults(true)
  }

  const handleNextQuestion = () => {
    if (currentQuizIndex < currentModule.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setShowResults(false)
    } else {
      // Quiz complete - calculate score and award points
      const correctAnswers = Object.values(quizAnswers).filter(a => a.isCorrect).length
      const totalQuestions = currentModule.quiz.length
      const score = Math.round((correctAnswers / totalQuestions) * 100)
      
      // Award points based on score (Points added + auto-achievement triggers)
      const pointsToAward = Math.round((correctAnswers / totalQuestions) * 100)
      
      // We only call awardPoints once - the hook handles the badges automatically!
      const rewardData = awardPoints(
        correctAnswers === totalQuestions ? 'quiz_perfect' : 'module_complete', 
        pointsToAward
      )
      
      // Save quiz result
      saveQuizResult(moduleId, score)
      setReward(rewardData)
      setQuizComplete(true)
      showToast(lang({en:`Module Complete! You scored ${score}%`,pidgin:`You don finish am! You get ${score}%`,ha:`An kammala Module! Kun ci ${score}%`,yo:`Par\u00ed \u1eb8\u0300k\u1ecd\u0301! O gba ${score}%`,ig:`Mechara Module! I nwetara ${score}%`}), 'success')

    }
  }

  const isLastSection = currentSection === currentModule.sections.length

  return (
    <PageWrapper className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/learn"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          {lang({en:'Back to Learn',pidgin:'Go back to Education',ha:'Koma ga Koyo',yo:'Padà sí Ẹ̀kọ́',ig:'Laghachi na Mmụta'})}
        </Link>

        <div className="card">
          <h1 className="font-display font-bold text-3xl mb-6 text-gray-900">
            {currentModule.title}
          </h1>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                {lang({en:'Section',pidgin:'Part',ha:'Sashe',yo:'Apá',ig:'Nịdọ'})} {currentSection + 1} {lang({en:'of',pidgin:'for',ha:'na',yo:'nínú',ig:'n\'ime'})} {currentModule.sections.length + 1}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentSection + 1) / (currentModule.sections.length + 1)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentSection + 1) / (currentModule.sections.length + 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          {!isLastSection ? (
            <>
              <h2 className="font-bold text-2xl mb-4 text-gray-900">
                {currentModule.sections[currentSection].title}
              </h2>
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
                  {currentModule.sections[currentSection].content}
                </p>
              </div>
            </>
          ) : quizComplete ? (
            // Quiz Results
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-12 text-white mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Zap size={64} className="text-yellow-400" />
                </div>
                <h2 className="font-bold text-3xl mb-4">{lang({en:'Module Complete!',pidgin:'You Don Finish!',ha:'An kammala Module!',yo:'Parí Ẹ̀kọ́!',ig:'Mechara Module!'})}</h2>
                <p className="text-xl mb-6">
                  {lang({en:"You've successfully completed",pidgin:'You don finish to learn',ha:'Kun ƙare koyarwar',yo:'O ti parí kíkọ́ pẹ̀lú àṣeyọrí',ig:'Imechara mụta nke ọma'})} <strong>{currentModule.title}</strong>
                </p>
                
                {reward && (
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-6">
                    <p className="text-lg mb-2">🎁 {lang({en:'Reward Earned:',pidgin:'Reward wey you get:',ha:'An samu lada:',yo:'Ẹ̀bùn Tí A Gba:',ig:'Onyinye Nwetara:'})} </p>
                    <p className="text-2xl font-bold">+{reward.pointsAdded} {lang({en:'Points',pidgin:'Points',ha:'Maki',yo:'Àmi Ìdíyelé',ig:'Ihe'})}</p>
                    <p className="text-sm mt-2">{lang({en:'New Level:',pidgin:'New Level:',ha:'Sabon Matakin:',yo:'Ìpele Tuntun:',ig:'Ọkwa Ọhụrụ:'})}: {reward.newLevel}</p>
                  </div>
                )}
              </div>

              <Link to="/learn" className="btn-primary inline-block">
                {lang({en:'Back to Learning Modules',pidgin:'Go back to Other Topics',ha:'Koma zuwa Modules na Koyo',yo:'Padà sí Àwọn Ẹ̀kọ́',ig:'Laghachi na Modules Mmụta'})}
              </Link>
            </div>
          ) : (
            // Quiz Section - One Question at a Time
            <div>
              <div className="mb-6">
                <span className="text-sm text-gray-600">
                  {lang({en:'Question',pidgin:'Question',ha:'Tambaya',yo:'Ìbéèrè',ig:'Ajụjụ'})} {currentQuizIndex + 1} {lang({en:'of',pidgin:'of',ha:'na',yo:'nínú',ig:'n\'ime'})} {currentModule.quiz.length}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuizIndex + 1) / currentModule.quiz.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="font-bold text-2xl mb-6 text-gray-900">
                {lang({en:'Knowledge Check',pidgin:'Check Wetin You Learn',ha:'Gwajin Ilimi',yo:'Ṣàyẹ̀wò Ìmọ̀',ig:'Nlele Ihe Ọmụmụ'})}
              </h2>
              <p className="text-gray-700 mb-6 text-lg font-semibold">
                {currentModule.quiz[currentQuizIndex].question}
              </p>

              <div className="space-y-3 mb-6">
                {currentModule.quiz[currentQuizIndex].options.map((option, index) => {
                  const userAnswer = quizAnswers[currentQuizIndex]
                  const isSelected = userAnswer && userAnswer.optionIndex === index
                  const isCorrect = option.correct

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={showResults}
                      className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                        showResults
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : isSelected && !isCorrect
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200'
                          : 'border-gray-200 hover:border-primary hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{option.text}</span>
                        {showResults && isCorrect && (
                          <CheckCircle className="text-green-500" size={20} />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <div className="text-red-500 text-lg">✗</div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {showResults && (
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 className="font-bold mb-2 text-gray-900">{lang({en:'Explanation:',pidgin:'Reason:',ha:'Bayani:',yo:'Àlàyé:',ig:'Ihe kpatara:'})} </h3>
                  <p className="text-gray-700">
                    {currentModule.quiz[currentQuizIndex].explanation}
                  </p>
                </div>
              )}

              {showResults && (
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary w-full"
                >
                  {currentQuizIndex < currentModule.quiz.length - 1
                    ? lang({en:'Next Question',pidgin:'Next Question',ha:'Tambaya ta gaba',yo:'Ìbéèrè Tí Ó Kàn',ig:'Ajụjụ ọzọ'})
                    : lang({en:'Complete Quiz',pidgin:'Finish Am',ha:'Kammala Gwajin',yo:'Parí Àdánwò',ig:'Mechaa Ngwá Ahụ'})}
                </button>
              )}
            </div>
          )}

          {/* Navigation */}
          {!isLastSection && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} className="inline mr-2" />
                {lang({en:'Previous',pidgin:'Go Back',ha:'Baya',yo:'Ẹ̀yìn',ig:'Gaa n\'azụ'})}
              </button>
              <button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="btn-primary"
              >
                {currentSection === currentModule.sections.length - 1 
                  ? lang({en:'Take Quiz',pidgin:'Try the Test',ha:'Ɗauki Gwajin',yo:'Ṣe Àdánwò',ig:'Were Ngwá Ahụ'})
                  : lang({en:'Next',pidgin:'Next',ha:'Gaba',yo:'Tókàn',ig:'Ọzọ'})}
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
