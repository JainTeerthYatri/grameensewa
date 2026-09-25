import { LanguageInfo, SupportedLanguage, ScreenType } from '../types';

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', region: 'National / Official', sampleEmi: '₹40,759 / quarter' },
  { code: 'hi', nativeName: 'हिंदी', englishName: 'Hindi', region: 'राष्ट्रीय / उत्तर भारत', sampleEmi: '₹40,759 प्रति तिमाही' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali', region: 'পশ্চিমবঙ্গ ও ত্রিপুরা', sampleEmi: '₹৪০,৭৫৯ ত্রৈমাসিক' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi', region: 'महाराष्ट्र', sampleEmi: '₹४०,७५९ त्रैमासिक' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu', region: 'ఆంధ్రప్రదేశ్ & తెలంగాణ', sampleEmi: '₹40,759 త్రైమాసికం' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil', region: 'தமிழ்நாடு', sampleEmi: '₹40,759 காலாண்டு' },
  { code: 'gu', nativeName: 'ગુજરાતી', englishName: 'Gujarati', region: 'ગુજરાત', sampleEmi: '₹૪૦,૭૫૯ ત્રિમાસિક' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu', region: 'قومی زبان', sampleEmi: '₹۴۰,۷۵۹ سہ ماہی' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada', region: 'ಕರ್ನಾಟಕ', sampleEmi: '₹40,759 ತ್ರೈಮಾಸಿಕ' },
  { code: 'or', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia', region: 'ଓଡ଼ିଶା', sampleEmi: '₹୪୦,୭୫୯ ତ୍ରୈମାସିକ' },
  { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam', region: 'കേരളം', sampleEmi: '₹40,759 ത്രൈമാസിക' },
  { code: 'pa', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', region: 'ਪੰਜਾਬ', sampleEmi: '₹੪੦,੭੫੯ ਤਿਮਾਹੀ' }
];

export const UI_STRINGS: Record<SupportedLanguage, {
  portalName: string;
  portalSubtitle: string;
  officialLanguage: string;
  changeLanguage: string;
  contrastMode: string;
  navGateway: string;
  navKhata?: string;
  navFeasibility: string;
  navCalculator: string;
  navClusterMap: string;
  navSimulator: string;
  dprSanctionRate: string;
  activePanchayats: string;
  sovereignHeader: string;
  nationalPortal: string;
  voiceSahayak: string;
  sovereignAlerts: string;
  unread: string;
  apexCorps: string;
}> = {
  en: {
    portalName: 'GramMitra - Gram Panchayat Portal',
    portalSubtitle: 'Easy Village Services, Government Schemes & Business Support for Every Citizen',
    officialLanguage: 'Language',
    changeLanguage: 'Change Language',
    contrastMode: 'High Contrast',
    navGateway: 'Home (Panchayat Seva)',
    navKhata: 'Shop Khata (Hisab-Kitab)',
    navFeasibility: 'Business Plan & Profit Check',
    navCalculator: 'Loan & Subsidy Calculator',
    navClusterMap: 'Village Map & Centers',
    navSimulator: 'Repayment & Installment Helper',
    dprSanctionRate: '98% Loan Success Rate',
    activePanchayats: '42,910+ Villages Connected',
    sovereignHeader: 'GRAM PANCHAYAT CITIZEN SERVICES | Village Community & Enterprise Helper',
    nationalPortal: 'Village Citizen Portal',
    voiceSahayak: 'Voice Help (Bol Kar Puchhein)',
    sovereignAlerts: 'Panchayat Notices & Updates',
    unread: 'New',
    apexCorps: 'Supported by Village & Small Enterprise Welfare Schemes'
  },
  hi: {
    portalName: 'ग्राममित्र पोर्टल',
    portalSubtitle: 'ग्राम पंचायत नागरिक सेवा, ऋण कैलकुलेटर एवं ग्रामीण दुकान बही-खाता',
    officialLanguage: 'भाषा',
    changeLanguage: 'भाषा बदलें',
    contrastMode: 'उच्च कंट्रास्ट',
    navGateway: 'होम (पंचायत सेवा)',
    navKhata: 'दुकानदार बही-खाता',
    navFeasibility: 'बिजनेस प्लान व मुनाफा जांच',
    navCalculator: 'ऋण व सब्सिडी कैलकुलेटर',
    navClusterMap: 'गांव का नक्शा व केंद्र',
    navSimulator: 'किस्त व अदायगी सहायक',
    dprSanctionRate: '98% सफल आवेदन',
    activePanchayats: '42,910+ गांव जुड़े हुए',
    sovereignHeader: 'ग्राम पंचायत नागरिक सेवा पोर्टल | ग्रामीण विकास एवं सहायता',
    nationalPortal: 'ग्राम नागरिक पोर्टल',
    voiceSahayak: 'आवाज सहायक',
    sovereignAlerts: 'पंचायत सूचनाएं व अपडेट',
    unread: 'नया',
    apexCorps: 'ग्रामीण विकास व स्वरोजगार सहायता'
  },
  bn: {
    portalName: 'গ্রামমিত্র পোর্টাল',
    portalSubtitle: 'গ্রাম পঞ্চায়েত নাগরিক সেবা ও গ্রামীণ ব্যবসায়িক সহায়তা',
    officialLanguage: 'ভাষা',
    changeLanguage: 'ভাষা পরিবর্তন',
    contrastMode: 'উচ্চ বৈসাদৃশ্য',
    navGateway: 'হোম (পঞ্চায়েত সেবা)',
    navFeasibility: 'ব্যবসায়িক পরিকল্পনা ও মুনাফা',
    navCalculator: 'ঋণ ও ভর্তুকি ক্যালকুলেটর',
    navClusterMap: 'গ্রামের মানচিত্র ও কেন্দ্র',
    navSimulator: 'কিস্তি ও পরিশোধ সহায়ক',
    dprSanctionRate: '৯৮% সফল আবেদন',
    activePanchayats: '৪২,৯১০+ গ্রাম',
    sovereignHeader: 'গ্রাম পঞ্চায়েত নাগরিক সেবা পোর্টাল | গ্রামীণ উন্নয়ন ও সহায়তা',
    nationalPortal: 'গ্রাম নাগরিক পোর্টাল',
    voiceSahayak: 'ভয়েস সহায়ক',
    sovereignAlerts: 'পঞ্চায়েত বিজ্ঞপ্তি ও আপডেট',
    unread: 'নতুন',
    apexCorps: 'গ্রামীণ উন্নয়ন ও স্বনির্ভরতা সহায়তা'
  },
  mr: {
    portalName: 'ग्राममित्र पोर्टल',
    portalSubtitle: 'ग्रामपंचायत नागरिक सेवा, कर्ज कॅल्क्युलेटर आणि ग्रामीण दुकान वहीखाते',
    officialLanguage: 'भाषा',
    changeLanguage: 'भाषा बदला',
    contrastMode: 'हाय कॉन्ट्रास्ट',
    navGateway: 'होम (पंचायत सेवा)',
    navFeasibility: 'व्यवसाय योजना व नफा तपासणी',
    navCalculator: 'कर्ज व सबसिडी कॅल्क्युलेटर',
    navClusterMap: 'गावाचा नकाशा व केंद्र',
    navSimulator: 'हप्ता व परतफेड सहाय्यक',
    dprSanctionRate: '९८% यशस्वी अर्ज',
    activePanchayats: '४२,९१०+ गावे',
    sovereignHeader: 'ग्रामपंचायत नागरिक सेवा पोर्टल | ग्रामीण विकास आणि सहाय्य',
    nationalPortal: 'ग्राम नागरिक पोर्टल',
    voiceSahayak: 'व्हॉइस सहाय्यक',
    sovereignAlerts: 'पंचायत सूचना व अपडेट',
    unread: 'नवीन',
    apexCorps: 'ग्रामीण विकास व स्वयंरोजगार सहाय्य'
  },
  te: {
    portalName: 'గ్రామమిత్ర పోర్టల్',
    portalSubtitle: 'గ్రామ పంచాయతీ పౌర సేవలు, రుణ కాలిక్యులేటర్ & వ్యాపార సహాయం',
    officialLanguage: 'భాష',
    changeLanguage: 'భాష మార్చండి',
    contrastMode: 'హై కాంట్రాస్ట్',
    navGateway: 'హోమ్ (పంచాయతీ సేవలు)',
    navFeasibility: 'వ్యాపార ప్రణాళిక & లాభం తనిఖీ',
    navCalculator: 'రుణ & సబ్సిడీ కాలిక్యులేటర్',
    navClusterMap: 'గ్రామ పటం & కేంద్రాలు',
    navSimulator: 'వాయిదా చెల్లింపు సహాయకుడు',
    dprSanctionRate: '98% విజయవంతమైన దరఖాస్తులు',
    activePanchayats: '42,910+ గ్రామాలు',
    sovereignHeader: 'గ్రామ పంచాయతీ పౌర సేవా పోర్టల్ | గ్రామీణాభివృద్ధి & సహాయం',
    nationalPortal: 'గ్రామ పౌర పోర్టల్',
    voiceSahayak: 'వాయిస్ సహాయక్',
    sovereignAlerts: 'పంచాయతీ నోటీసులు & అప్‌డేట్లు',
    unread: 'కొత్తది',
    apexCorps: 'గ్రామీణాభివృద్ధి & స్వయం ఉపాధి సహాయం'
  },
  ta: {
    portalName: 'கிராமமித்ரா போர்ட்டல்',
    portalSubtitle: 'கிராம பஞ்சாயத்து குடிமக்கள் சேவைகள், கடன் கால்குலேட்டர் & தொழில் உதவி',
    officialLanguage: 'மொழி',
    changeLanguage: 'மொழியை மாற்றுக',
    contrastMode: 'உயர் மாறுபாடு',
    navGateway: 'முகப்பு (பஞ்சாயத்து சேவை)',
    navFeasibility: 'தொழில் திட்டம் & லாப சரிபார்ப்பு',
    navCalculator: 'கடன் & மானிய கால்குலேட்டர்',
    navClusterMap: 'கிராம வரைபடம் & மையங்கள்',
    navSimulator: 'தவணை செலுத்தும் வழிகாட்டி',
    dprSanctionRate: '98% வெற்றி விகிதம்',
    activePanchayats: '42,910+ கிராமங்கள்',
    sovereignHeader: 'கிராம பஞ்சாயத்து குடிமக்கள் சேவை தளம் | ஊரக வளர்ச்சி மற்றும் உதவி',
    nationalPortal: 'கிராம குடிமக்கள் தளம்',
    voiceSahayak: 'குரல் உதவியாளர்',
    sovereignAlerts: 'பஞ்சாயத்து அறிவிப்புகள்',
    unread: 'புதியது',
    apexCorps: 'ஊரக வளர்ச்சி & சுயதொழில் உதவி'
  },
  gu: {
    portalName: 'ગ્રામમિત્ર પોર્ટલ',
    portalSubtitle: 'ગ્રામ પંચાયત નાગરિક સેવાઓ, લોન કેલ્ક્યુલેટર અને ખાતાવહી',
    officialLanguage: 'ભાષા',
    changeLanguage: 'ભાષા બદલો',
    contrastMode: 'હાઇ કોન્ટ્રાસ્ટ',
    navGateway: 'હોમ (પંચાયત સેવા)',
    navFeasibility: 'બિઝનેસ પ્લાન અને નફો તપાસો',
    navCalculator: 'લોન અને સબસિડી કેલ્ક્યુલેટર',
    navClusterMap: 'ગામનો નકશો અને કેન્દ્રો',
    navSimulator: 'હપ્તા ચુકવણી સહાયક',
    dprSanctionRate: '98% સફળ અરજીઓ',
    activePanchayats: '42,910+ ગામો',
    sovereignHeader: 'ગ્રામ પંચાયત નાગરિક સેવા પોર્ટલ | ગ્રામીણ વિકાસ અને સહાય',
    nationalPortal: 'ગ્રામ નાગરિક પોર્ટલ',
    voiceSahayak: 'વૉઇસ સહાયક',
    sovereignAlerts: 'પંચાયત સૂચનાઓ',
    unread: 'નવું',
    apexCorps: 'ગ્રામીણ વિકાસ અને સ્વરોજગાર સહાય'
  },
  ur: {
    portalName: 'گرام متر پورٹل',
    portalSubtitle: 'گرام پنچایت شہری خدمات، قرض کیلکولیٹر اور کھاتہ وہی',
    officialLanguage: 'زبان',
    changeLanguage: 'زبان تبدیل کریں',
    contrastMode: 'ہائی کنٹراسٹ',
    navGateway: 'ہوم (پنچایت خدمات)',
    navFeasibility: 'کاروباری منصوبہ اور منافع کی جانچ',
    navCalculator: 'قرض اور سبسڈی کیلکولیٹر',
    navClusterMap: 'گاؤں کا نقشہ اور مراکز',
    navSimulator: 'قسط کی ادائیگی میں معاون',
    dprSanctionRate: '98% کامیاب درخواستیں',
    activePanchayats: '42,910+ دیہات',
    sovereignHeader: 'گرام پنچایت شہری خدمت پورٹل | دیہی ترقی و رہنمائی',
    nationalPortal: 'دیہی شہری پورٹل',
    voiceSahayak: 'آواز معاون',
    sovereignAlerts: 'پنچایت نوٹس اور اپ ڈیٹس',
    unread: 'نیا',
    apexCorps: 'دیہی ترقی و خود روزگار معاونت'
  },
  kn: {
    portalName: 'ಗ್ರಾಮಮಿತ್ರ ಪೋರ್ಟಲ್',
    portalSubtitle: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ನಾಗರಿಕ ಸೇವೆಗಳು, ಸಾಲ ಕ್ಯಾಲ್ಕುಲೇಟರ್ & ವ್ಯಾಪಾರ ಬೆಂಬಲ',
    officialLanguage: 'ಭಾಷೆ',
    changeLanguage: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    contrastMode: 'ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್',
    navGateway: 'ಮುಖಪುಟ (ಪಂಚಾಯತ್ ಸೇವೆ)',
    navFeasibility: 'ವ್ಯಾಪಾರ ಯೋಜನೆ & ಲಾಭ ತಪಾಸಣೆ',
    navCalculator: 'ಸಾಲ & ಸಬ್ಸಿಡಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    navClusterMap: 'ಗ್ರಾಮ ನಕ್ಷೆ & ಕೇಂದ್ರಗಳು',
    navSimulator: 'ಕಂತು ಪಾವತಿ ಸಹಾಯಕ',
    dprSanctionRate: '98% ಯಶಸ್ವಿ ಅರ್ಜಿಗಳು',
    activePanchayats: '42,910+ ಗ್ರಾಮಗಳು',
    sovereignHeader: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ನಾಗರಿಕ ಸೇವಾ ಪೋರ್ಟಲ್ | ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ & ಸಹಾಯ',
    nationalPortal: 'ಗ್ರಾಮ ನಾಗರಿಕ ಪೋರ್ಟಲ್',
    voiceSahayak: 'ಧ್ವನಿ ಸಹಾಯಕ',
    sovereignAlerts: 'ಪಂಚಾಯತ್ ಸೂಚನೆಗಳು',
    unread: 'ಹೊಸದು',
    apexCorps: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ & ಸ್ವಯಂ ಉದ್ಯೋಗ ಬೆಂಬಲ'
  },
  or: {
    portalName: 'ଗ୍ରାମମିତ୍ର ପୋର୍ଟାଲ',
    portalSubtitle: 'ଗ୍ରାମ ପଞ୍ଚାୟତ ନାଗରିକ ସେବା, ଋଣ କାଲକୁଲେଟର ଓ ବ୍ୟବସାୟ ସହାୟତା',
    officialLanguage: 'ଭାଷା',
    changeLanguage: 'ଭାଷା ବଦଳାନ୍ତୁ',
    contrastMode: 'ହାଇ କଣ୍ଟ୍ରାଷ୍ଟ',
    navGateway: 'ହୋମ (ପଞ୍ଚାୟତ ସେବା)',
    navFeasibility: 'ବ୍ୟବସାୟ ଯୋଜନା ଓ ଲାଭ ଯାଞ୍ଚ',
    navCalculator: 'ଋଣ ଓ ସବସିଡି କାଲକୁଲେଟର',
    navClusterMap: 'ଗାଁ ମାନଚିତ୍ର ଓ କେନ୍ଦ୍ର',
    navSimulator: 'କିସ୍ତି ପରିଶୋଧ ସହାୟକ',
    dprSanctionRate: '୯୮% ସଫଳ ଆବେଦନ',
    activePanchayats: '୪୨,୯୧୦+ ଗ୍ରାମ',
    sovereignHeader: 'ଗ୍ରାମ ପଞ୍ଚାୟତ ନାଗରିକ ସେବା ପୋର୍ଟାଲ | ଗ୍ରାମୀଣ ବିକାଶ ଓ ସହାୟତା',
    nationalPortal: 'ଗ୍ରାମ ନାଗରିକ ପୋର୍ଟାଲ',
    voiceSahayak: 'ଭଏସ ସହାୟକ',
    sovereignAlerts: 'ପଞ୍ଚାୟତ ସୂଚନା',
    unread: 'ନୂଆ',
    apexCorps: 'ଗ୍ରାମୀଣ ବିକାଶ ଓ ସ୍ୱରୋଜଗାର ସହାୟତା'
  },
  ml: {
    portalName: 'ഗ്രാമമിത്ര പോർട്ടൽ',
    portalSubtitle: 'ഗ്രാമപഞ്ചായത്ത് പൗര സേവനങ്ങൾ, വായ്പാ കാൽക്കുലേറ്റർ & ബിസിനസ്സ് സഹായം',
    officialLanguage: 'ഭാഷ',
    changeLanguage: 'ഭാഷ മാറ്റുക',
    contrastMode: 'ഹൈ കോൺട്രാസ്റ്റ്',
    navGateway: 'ഹോം (പഞ്ചായത്ത് സേവനം)',
    navFeasibility: 'ബിസിനസ് പ്ലാനും ലാഭ പരിശോധനയും',
    navCalculator: 'വായ്പ & സബ്‌സിഡി കാൽക്കുലേറ്റർ',
    navClusterMap: 'ഗ്രാമ ഭൂപടവും കേന്ദ്രങ്ങളും',
    navSimulator: 'തിരിച്ചടവ് സഹായി',
    dprSanctionRate: '98% വിജയകരമായ അപേക്ഷകൾ',
    activePanchayats: '42,910+ ഗ്രാമങ്ങൾ',
    sovereignHeader: 'ഗ്രാമപഞ്ചായത്ത് പൗര സേവന പോർട്ടൽ | ഗ്രാമീണ വികസനവും സഹായവും',
    nationalPortal: 'ഗ്രാമ പൗര പോർട്ടൽ',
    voiceSahayak: 'വോയ്‌സ് സഹായക്',
    sovereignAlerts: 'പഞ്ചായത്ത് അറിയിപ്പുകൾ',
    unread: 'പുതിയത്',
    apexCorps: 'ഗ്രാമവികസനവും സ്വയംതൊഴിൽ സഹായവും'
  },
  pa: {
    portalName: 'ਗ੍ਰਾਮਮਿੱਤਰ ਪੋਰਟਲ',
    portalSubtitle: 'ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਨਾਗਰਿਕ ਸੇਵਾਵਾਂ, ਕਰਜ਼ਾ ਕੈਲਕੁਲੇਟਰ ਅਤੇ ਦੁਕਾਨ ਬਹੀ-ਖਾਤਾ',
    officialLanguage: 'ਭਾਸ਼ਾ',
    changeLanguage: 'ਭਾਸ਼ਾ ਬਦਲੋ',
    contrastMode: 'ਹਾਈ ਕੰਟ੍ਰਾਸਟ',
    navGateway: 'ਹੋਮ (ਪੰਚਾਇਤ ਸੇਵਾ)',
    navFeasibility: 'ਕਾਰੋਬਾਰ ਯੋਜਨਾ ਤੇ ਮੁਨਾਫਾ ਜਾਂਚ',
    navCalculator: 'ਕਰਜ਼ਾ ਤੇ ਸਬਸਿਡੀ ਕੈਲਕੁਲੇਟਰ',
    navClusterMap: 'ਪਿੰਡ ਦਾ ਨਕਸ਼ਾ ਤੇ ਕੇਂਦਰ',
    navSimulator: 'ਕਿਸ਼ਤ ਅਦਾਇਗੀ ਸਹਾਇਕ',
    dprSanctionRate: '98% ਸਫਲ ਅਰਜ਼ੀਆਂ',
    activePanchayats: '42,910+ ਪਿੰਡ',
    sovereignHeader: 'ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਨਾਗਰਿਕ ਸੇਵਾ ਪੋਰਟਲ | ਪੇਂਡੂ ਵਿਕਾਸ ਅਤੇ ਸਹਾਇਤਾ',
    nationalPortal: 'ਪਿੰਡ ਨਾਗਰਿਕ ਪੋਰਟਲ',
    voiceSahayak: 'ਆਵਾਜ਼ ਸਹਾਇਕ',
    sovereignAlerts: 'ਪੰਚਾਇਤ ਸੂਚਨਾਵਾਂ',
    unread: 'ਨਵਾਂ',
    apexCorps: 'ਪੇਂਡੂ ਵਿਕਾਸ ਅਤੇ ਸਵੈ-ਰੋਜ਼ਗਾਰ ਸਹਾਇਤਾ'
  }
};

export interface GatewayTranslations {
  badge: string;
  heroTitle: string;
  heroDescription: string;
  roles: {
    beneficiary: { title: string; sub: string };
    vle: { title: string; sub: string };
    sca: { title: string; sub: string };
    dic: { title: string; sub: string };
    central: { title: string; sub: string };
  };
  loginTitle: string;
  loginSubtitle: string;
  authMethods: { aadhaar: string; digilocker: string; ration: string };
  mobileLabel: string;
  mobilePlaceholder: string;
  getOtp: string;
  resend: string;
  otpLabel: string;
  expiresIn: string;
  verifyBtn: string;
  verified: string;
  terms: string;
  marginEngineTitle: string;
  marginEngineSubtitle: string;
  promoterEquity: string;
  totalProject: string;
  loanSanction: string;
  monthlyEmi: string;
  effectiveRate: string;
  generateDprBtn: string;
  pincodeTitle: string;
  pincodeSubtitle: string;
  pincodePlaceholder: string;
  checkBtn: string;
  prioritySectorsTitle: string;
  prioritySectorsSubtitle: string;
  sectors: {
    dairy: { title: string; desc: string };
    solar: { title: string; desc: string };
    handloom: { title: string; desc: string };
    bio: { title: string; desc: string };
  };
  stats: {
    stat1: { val: string; title: string; sub: string };
    stat2: { val: string; title: string; sub: string };
    stat3: { val: string; title: string; sub: string };
    stat4: { val: string; title: string; sub: string };
  };
  recentTitle: string;
  recentSubtitle: string;
  tableCols: { ref: string; sector: string; panchayat: string; amount: string; status: string };
  vleTitle: string;
  vleActions: { newDpr: string; verifyBio: string; downloadSanction: string; scheduleVisit: string };
}

export const GATEWAY_TEXT: Record<SupportedLanguage, GatewayTranslations> = {
  en: {
    badge: 'Official Gram Panchayat Portal',
    heroTitle: 'Gram Panchayat Digital Seva: Easy Government Schemes & Loans for Village Citizens',
    heroDescription: 'Check government schemes, low-interest business loans, find your nearest CSC Kendra, and maintain your village shop ledger in simple everyday English.',
    roles: {
      beneficiary: { title: 'Village Citizen / Farmer / Shopkeeper', sub: 'Apply for loan, schemes & subsidies' },
      vle: { title: 'CSC / Village Kendra Operator', sub: 'Help villagers fill forms & apply' },
      sca: { title: 'Panchayat & Bank Officer', sub: 'Check and approve village files' },
      dic: { title: 'District Village Officer', sub: 'Review village business plans' },
      central: { title: 'Government Welfare Dept', sub: 'Government scheme guidance' }
    },
    loginTitle: 'Citizen Quick Login',
    loginSubtitle: 'Enter mobile number or Aadhaar to view your village schemes & loan status',
    authMethods: { aadhaar: 'Mobile OTP', digilocker: 'DigiLocker', ration: 'Ration Card' },
    mobileLabel: 'Mobile Number (Aadhaar linked)',
    mobilePlaceholder: 'Enter 10-digit mobile number',
    getOtp: 'Send OTP Code',
    resend: 'Resend Code',
    otpLabel: 'Enter 6-Digit OTP Code sent to your mobile',
    expiresIn: 'Code valid for 04:32',
    verifyBtn: 'Log In to Gram Panchayat Portal',
    verified: 'Aadhaar Verified Citizen',
    terms: 'Safe & secure government portal for all village citizens and panchayat members.',
    marginEngineTitle: 'Simple Loan & Subsidy Calculator',
    marginEngineSubtitle: 'See how much government loan and subsidy you can get with your own money',
    promoterEquity: 'Your Contribution (Apna Paisa) - Money you put in',
    totalProject: 'Total Business Setup Cost (Pura Kharcha)',
    loanSanction: 'Government Loan You Can Get (90% Sarkari Loan)',
    monthlyEmi: 'Estimated Monthly Installment (Har Mahine ki Kist / EMI)',
    effectiveRate: 'Low Subsidized Interest Rate (Only 4% to 5% per year)',
    generateDprBtn: 'Check Loan Eligibility & Business Plan',
    pincodeTitle: 'Find Services & Centers in Your Village',
    pincodeSubtitle: 'Find nearest CSC Kendra, dairy collection, ration shop, and bank branch',
    pincodePlaceholder: 'Enter 6-digit Pincode (e.g. 226301)',
    checkBtn: 'Search My Area',
    prioritySectorsTitle: 'Good Businesses to Start in Villages',
    prioritySectorsSubtitle: 'Government supported businesses with 90% loan and low interest',
    sectors: {
      dairy: { title: 'Dairy & Milk Collection Unit', desc: '500-1000 Litres milk storage • Only 4% low interest loan' },
      solar: { title: 'Solar Power for Farm / Shop', desc: 'Solar pump & rooftop power • 90% government loan support' },
      handloom: { title: 'Weaving & Tailoring Unit', desc: 'Cloth weaving, sewing machines • Special priority for village women' },
      bio: { title: 'Organic Fertilizer & Vermicompost', desc: 'Organic farm manure • High income with small investment' }
    },
    stats: {
      stat1: { val: '98%', title: 'Quick Loan Approvals', sub: 'Paperless online verification' },
      stat2: { val: '72 Hours', title: 'Fast Bank Processing', sub: 'Direct intimation to nearest bank' },
      stat3: { val: '4.0%', title: 'Super Low Interest', sub: 'Special government subsidized rate' },
      stat4: { val: '42,000+', title: 'Active Villages', sub: 'Helping rural citizens grow' }
    },
    recentTitle: 'Recent Approvals in Nearby Villages',
    recentSubtitle: 'See loans and schemes recently approved for village citizens',
    tableCols: { ref: 'Application ID', sector: 'Business Type', panchayat: 'Gram Panchayat', amount: 'Loan Amount', status: 'Status' },
    vleTitle: 'Quick Help Desk for Citizens',
    vleActions: { newDpr: 'Apply for New Loan', verifyBio: 'Aadhaar / Fingerprint Help', downloadSanction: 'Download Approval Letter', scheduleVisit: 'Book Bank Visit' }
  },
  hi: {
    badge: 'ग्राम पंचायत नागरिक सेवा पोर्टल',
    heroTitle: 'ग्राम पंचायत डिजिटल सेवा: गांव के नागरिकों के लिए आसान सरकारी योजनाएं व ऋण सहायता',
    heroDescription: 'ग्रामीण नागरिकों, किसानों और छोटे दुकानदारों के लिए आसान पोर्टल: सरकारी योजनाओं की जानकारी, कम ब्याज वाले ऋण का हिसाब, और दुकान का डिजिटल बही-खाता।',
    roles: {
      beneficiary: { title: 'नागरिक व किसान', sub: 'गांव के निवासी / छोटा उद्यमी' },
      vle: { title: 'सीएससी / जन सेवा केंद्र', sub: 'गांव के सहायक ऑपरेटर' },
      sca: { title: 'ग्राम पंचायत सदस्य', sub: 'प्रधान / पंचायत प्रतिनिधि' },
      dic: { title: 'बैंक व ऋण मित्र', sub: 'लोन एवं सब्सिडी सहायता' },
      central: { title: 'ग्राम सेवा केंद्र', sub: 'नागरिक सहायता व मार्गदर्शन' }
    },
    loginTitle: 'गांव के नागरिक पोर्टल में लॉगिन',
    loginSubtitle: 'मोबाइल नंबर अथवा ओटीपी द्वारा आसान प्रवेश',
    authMethods: { aadhaar: 'मोबाइल ओटीपी', digilocker: 'डिजीलॉकर', ration: 'राशन कार्ड' },
    mobileLabel: 'मोबाइल नंबर',
    mobilePlaceholder: '10-अंकीय मोबाइल नंबर दर्ज करें',
    getOtp: 'ओटीपी प्राप्त करें',
    resend: 'पुनः भेजें',
    otpLabel: '6-अंकीय ओटीपी कोड दर्ज करें',
    expiresIn: 'समाप्ति: 04:32 में',
    verifyBtn: 'सत्यापित करें और आगे बढ़ें',
    verified: 'मोबाइल सत्यापित',
    terms: 'यह पोर्टल ग्राम पंचायत के नागरिकों की सुविधा और मार्गदर्शन के लिए है।',
    marginEngineTitle: 'त्वरित मार्जिन एवं ऋण कैलकुलेटर',
    marginEngineSubtitle: 'देखें आपकी कितनी बचत पर कितना बैंक लोन और सरकारी सब्सिडी मिल सकती है',
    promoterEquity: 'आपकी अपनी बचत / पूंजी (मार्जिन)',
    totalProject: 'कुल व्यापार लागत (प्रोजेक्ट खर्च)',
    loanSanction: 'अनुमानित बैंक ऋण राशि',
    monthlyEmi: 'महीने की अनुमानित किस्त (ईएमआई)',
    effectiveRate: 'अनुमानित ब्याज दर प्रति वर्ष',
    generateDprBtn: 'प्रोजेक्ट रिपोर्ट बनाएं व ऋण जांचें',
    pincodeTitle: 'अपने गांव में सुविधाएं व केंद्र खोजें (पिनकोड)',
    pincodeSubtitle: 'गांव की दुकानें, डेयरी केंद्र और नजदीकी पंचायत कार्यालय देखें',
    pincodePlaceholder: '6-अंकीय पिनकोड दर्ज करें (उदा. 226301)',
    checkBtn: 'गांव में खोजें',
    prioritySectorsTitle: 'गांव में शुरू करने योग्य प्रमुख व्यवसाय',
    prioritySectorsSubtitle: 'डेयरी, सौर ऊर्जा, किराना, हथकरघा और कृषि सेवा',
    sectors: {
      dairy: { title: 'डेयरी व दूध संकलन केंद्र', desc: '500-1000 लीटर क्षमता • सस्ती ब्याज दर' },
      solar: { title: 'सौर ऊर्जा कृषि संयंत्र', desc: '5-15 किलोवाट • बिजली बचत व सिंचाई' },
      handloom: { title: 'हथकरघा व सिलाई केंद्र', desc: 'महिला एवं ग्रामीण बुनकर सहायता' },
      bio: { title: 'जैविक खाद / वर्मीकम्पोस्ट', desc: 'खेती हेतु खाद निर्माण इकाई' }
    },
    stats: {
      stat1: { val: '98%', title: 'सफल लोन आवेदन', sub: 'सही प्रोजेक्ट रिपोर्ट के साथ' },
      stat2: { val: '72 घंटे', title: 'त्वरित मार्गदर्शन', sub: 'नजदीकी बैंक व पंचायत केंद्र से' },
      stat3: { val: '4.0%', title: 'सस्ती ब्याज दर (अनुमानित)', sub: 'सरकारी सहायता प्राप्त योजनाओं में' },
      stat4: { val: '42,910', title: 'संबद्ध ग्राम पंचायतें', sub: 'देशभर के ग्रामीण क्षेत्रों में' }
    },
    recentTitle: 'हाल ही में स्वीकृत ऋण व योजना आवेदन',
    recentSubtitle: 'गांव के नागरिकों के लिए हाल ही में स्वीकृत आवेदन',
    tableCols: { ref: 'आवेदन संख्या', sector: 'व्यवसाय का प्रकार', panchayat: 'ग्राम पंचायत', amount: 'लोन राशि', status: 'स्थिति' },
    vleTitle: 'नागरिकों हेतु त्वरित सहायता केंद्र',
    vleActions: { newDpr: 'नया लोन आवेदन तैयार करें', verifyBio: 'नागरिक आधार / फिंगरप्रिंट मदद', downloadSanction: 'स्वीकृति पत्र डाउनलोड करें', scheduleVisit: 'बैंक शाखा मुलाकात तय करें' }
  },
  // Regional fallbacks map to English with native titles
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};

// Fallback logic for all regional languages so no key is ever missing
const regionalLangs: SupportedLanguage[] = ['bn', 'mr', 'te', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa'];
regionalLangs.forEach((lang) => {
  GATEWAY_TEXT[lang] = { ...GATEWAY_TEXT.en };
});

export interface FeasibilityTranslations {
  title: string;
  subtitle: string;
  audioBriefingTitle: string;
  audioBriefingSubtitle: string;
  catchmentCalibration: string;
  activeShgs: string;
  dailyMilk: string;
  mapTitle: string;
  mapSubtitle: string;
  arbitrageTitle: string;
  middlemanVsChilled: string;
  unorganizedRate: string;
  chilledRate: string;
  dailyWealthRetained: string;
  breakdownTitle: string;
  netProfit: string;
  rawMilk: string;
  solarChilling: string;
  logistics: string;
  totalUnitCost: string;
  wholesalePrice: string;
  monthlyNetSurplus: string;
  swotTitle: string;
  swot: {
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
  };
  riskTitle: string;
  exportDpr: string;
  proceedToCalc: string;

  dossierTitle: string;
  dossierSubtitle: string;
  viabilityRating: string;
  aaaSovereign: string;
  verifiedBy: string;
  audioGuide: string;
  audioPlaying: string;
  downloadDpr: string;
  forwardBank: string;
  keyMetrics: string;
  totalOutlay: string;
  promoterMargin: string;
  netLoan: string;
  annualProfit: string;
  moratorium: string;
  technicalIndicators: string;
  gridReliability: string;
  rawMilkSurplus: string;
  coldChainDistance: string;
  waterTable: string;
  fiveYearTable: string;
  tableHeaders: { year: string; revenue: string; opex: string; debtService: string; netSurplus: string; dscr: string };
  panchayatIndicators: string;
  milchCensus: string;
  cattleBreeds: string;
  chillerProximity: string;
  catchmentRadiusLabel: string;
}

export const FEASIBILITY_TEXT: Record<SupportedLanguage, FeasibilityTranslations> = {
  en: {
    title: 'Village Business Plan & Profit Check',
    subtitle: 'Mini Solar Milk Center (500 Litres Daily) • See costs, profits, and how it works in your village',
    audioBriefingTitle: 'Listen to Voice Explanation (Bol Kar Suno)',
    audioBriefingSubtitle: 'Easy audio summary in plain everyday English',
    catchmentCalibration: 'Village Area Covered (Kitne Gaon Ka Dudh)',
    activeShgs: 'Connected Women Self-Help Groups (SHGs)',
    dailyMilk: 'Daily Extra Milk Available in Village',
    mapTitle: 'Village Milk Collection & Route Map',
    mapSubtitle: 'See nearby dairy routes, village centers, and mandis.',
    arbitrageTitle: 'Your Extra Profit from Milk Center',
    middlemanVsChilled: 'Local Middleman Rate vs Direct Dairy Rate',
    unorganizedRate: 'Old Middleman Rate (Kam Rate)',
    chilledRate: 'Direct Dairy Rate (Achha Rate)',
    dailyWealthRetained: 'Extra Daily Money Staying in Your Village',
    breakdownTitle: 'Cost & Monthly Profit Breakdown',
    netProfit: 'Net Profit per Liter',
    rawMilk: 'Milk Purchase Cost',
    solarChilling: 'Solar Power & Running Cost',
    logistics: 'Transport & Testing',
    totalUnitCost: 'Total Cost per Liter',
    wholesalePrice: 'Selling Price at Mandi/Dairy',
    monthlyNetSurplus: 'Your Expected Monthly Profit',
    swotTitle: 'Simple Business Plan Summary',
    swot: {
      strengths: 'Strengths (Achhi Batein)',
      weaknesses: 'Things to Manage (Savdhani)',
      opportunities: 'Growth Opportunities (Fayda)',
      threats: 'Things to Watch (Dhyan Rakhein)'
    },
    riskTitle: 'Safety & Care Tips',
    exportDpr: 'Download Business Plan & Loan Paper (PDF)',
    proceedToCalc: 'Go to Loan & EMI Calculator',

    dossierTitle: 'Village Business Plan & Profit Check',
    dossierSubtitle: 'Mini Solar Milk Center (500 Litres Daily) • Verified for Government Village Loans',
    viabilityRating: 'Success Rating',
    aaaSovereign: 'High Success (92%)',
    verifiedBy: 'Verified for Village Loans',
    audioGuide: 'Listen to Voice Explanation',
    audioPlaying: 'Playing audio explanation in simple language...',
    downloadDpr: 'Download Business Plan (PDF)',
    forwardBank: 'Send Application to Nearest Bank',
    keyMetrics: 'Key Investment & Income Details',
    totalOutlay: 'Total Setup Cost (Pura Kharcha)',
    promoterMargin: 'Your Investment (Only 10% - Apna Paisa)',
    netLoan: 'Government Loan (90% - Sarkari Loan)',
    annualProfit: 'Expected Yearly Profit (Salana Kamai)',
    moratorium: 'No EMI for First 6 Months (Chhoot Samay)',
    technicalIndicators: 'Village Facility Check',
    gridReliability: 'Daily Electricity Hours',
    rawMilkSurplus: 'Daily Extra Milk in Village',
    coldChainDistance: 'Distance to Nearest Milk Plant',
    waterTable: 'Water Level in Village',
    fiveYearTable: '5-Year Expected Income & Loan Payments',
    tableHeaders: {
      year: 'Year',
      revenue: 'Total Earnings',
      opex: 'Running Costs',
      debtService: 'Loan Installment (EMI)',
      netSurplus: 'Net Profit in Pocket',
      dscr: 'Loan Safety Score'
    },
    panchayatIndicators: 'Panchayat & Village Details',
    milchCensus: 'Total Cows & Buffaloes in Area',
    cattleBreeds: 'Common Cattle Breeds',
    chillerProximity: 'Nearest Competitor Distance',
    catchmentRadiusLabel: 'Area Radius (km)'
  },
  hi: {
    title: 'हाइपर-लोकल व्यवहार्यता रिपोर्ट (DPR)',
    subtitle: 'मिनी सोलर डेयरी चिलिंग यूनिट (500 लीटर/दिन) • पीएम गतिशक्ति एवं भुवन जीआईएस डेटा समर्थित',
    audioBriefingTitle: 'भाषिणी ऑडियो सारांश सुनें',
    audioBriefingSubtitle: 'एआई-संश्लेषित व्यवहार्यता सारांश सुनें',
    catchmentCalibration: 'संग्रहण दायरा अंशांकन',
    activeShgs: 'सक्रिय स्वयं सहायता समूह (SHG) लिंकेज',
    dailyMilk: 'दैनिक कुल अधिशेष मात्रा',
    mapTitle: 'भू-स्थानिक पंचायत दायरा और आपूर्ति नेटवर्क',
    mapSubtitle: 'डेयरी क्लस्टरों और प्रतिस्पर्धी चिलिंग इंफ्रास्ट्रक्चर के विरुद्ध मैप किया गया दूध संग्रहण क्षेत्र।',
    arbitrageTitle: 'ग्राम स्तर पर मार्जिन आर्बिट्राज',
    middlemanVsChilled: 'बिचौलिया दर बनाम प्रत्यक्ष चिल्ड खरीद दर',
    unorganizedRate: 'असंगठित बिचौलिया दर',
    chilledRate: 'संगठित चिल्ड खरीद दर',
    dailyWealthRetained: 'ग्राम पंचायत में दैनिक बनाए रखा गया धन',
    breakdownTitle: 'लागत विश्लेषण और शुद्ध लाभ मार्जिन',
    netProfit: 'शुद्ध मार्जिन',
    rawMilk: 'कच्चा दूध खरीद',
    solarChilling: 'सौर ऊर्जा और परिचालन लागत',
    logistics: 'परिवहन और परीक्षण सामग्री',
    totalUnitCost: 'प्रति लीटर कुल लागत',
    wholesalePrice: 'थोक विक्रय मूल्य',
    monthlyNetSurplus: 'अनुमानित मासिक शुद्ध बचत',
    swotTitle: 'सांविधिक स्वाट (SWOT) एवं फील्ड सत्यापन मैट्रिक्स',
    swot: {
      strengths: 'ताकत (Strengths)',
      weaknesses: 'कमजोरी (Weaknesses)',
      opportunities: 'अवसर (Opportunities)',
      threats: 'जोखिम (Threats)'
    },
    riskTitle: 'जोखिम न्यूनीकरण प्रोटोकॉल',
    exportDpr: 'बैंक योग्य डीपीआर (PDF) डाउनलोड करें',
    proceedToCalc: 'योजना कैलकुलेटर पर जाएं',

    dossierTitle: 'गांव बिजनेस प्लान व मुनाफा जांच',
    dossierSubtitle: 'मिनी सोलर दूध चिलर केंद्र (500 लीटर/दिन) • गांव स्तर पर लागत व कमाई का पूरा ब्योरा',
    viabilityRating: 'सफलता संभावना',
    aaaSovereign: 'उच्च सफलता दर (92%)',
    verifiedBy: 'स्थानीय ग्राम पंचायत डेटा आधारित',
    audioGuide: 'आवाज में जानकारी सुनें',
    audioPlaying: 'ऑडियो विवरण चल रहा है...',
    downloadDpr: 'प्रोजेक्ट रिपोर्ट (PDF) डाउनलोड करें',
    forwardBank: 'नजदीकी बैंक में आवेदन प्रस्तुत करें',
    keyMetrics: 'मुख्य निवेश एवं मुनाफा आंकड़े',
    totalOutlay: 'कुल सेटअप लागत',
    promoterMargin: 'आपकी अपनी पूंजी (10%)',
    netLoan: 'बैंक ऋण राशि (90%)',
    annualProfit: 'वार्षिक अनुमानित शुद्ध लाभ',
    moratorium: 'किस्त चुकाने में छूट (मोराटोरियम)',
    technicalIndicators: 'तकनीकी जरूरतें व सुविधाएं',
    gridReliability: 'बिजली आपूर्ति उपलब्धता',
    rawMilkSurplus: 'दैनिक दूध उपलब्धता',
    coldChainDistance: 'निकटतम डेयरी केंद्र की दूरी',
    waterTable: 'पानी की सुविधा',
    fiveYearTable: '5-वर्षीय अनुमानित कमाई व खर्च (प्रोजेक्शन)',
    tableHeaders: {
      year: 'वर्ष',
      revenue: 'कुल बिक्री/आय',
      opex: 'रोजमर्रा का खर्च',
      debtService: 'ऋण किस्त (ईएमआई)',
      netSurplus: 'हाथ में शुद्ध बचत/लाभ',
      dscr: 'सुरक्षा स्कोर'
    },
    panchayatIndicators: 'ग्राम पंचायत स्थिति',
    milchCensus: 'दुधारू पशु संख्या',
    cattleBreeds: 'मुख्य पशु नस्लें',
    chillerProximity: 'निकटतम चिलर दूरी',
    catchmentRadiusLabel: 'गांव का दायरा (किमी)'
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};
regionalLangs.forEach((lang) => {
  FEASIBILITY_TEXT[lang] = { ...FEASIBILITY_TEXT.en };
});

export interface CalculatorTranslations {
  title: string;
  subtitle: string;
  promoterEquityInput: string;
  quickPicks: string;
  totalOutlayCard: string;
  concessionalLoanCard: string;
  quarterlyEmiCard: string;
  interestSavedCard: string;
  capitalExpenditure: string;
  machinery: string;
  civil: string;
  workingCapital: string;
  repaymentSchedule: string;
  submitDpr: string;
  voiceCalculate: string;
  schemeTitle: string;
  tenureMonths: string;
  gracePeriod: string;
}

export const CALCULATOR_TEXT: Record<SupportedLanguage, CalculatorTranslations> = {
  en: {
    title: 'Easy Loan, EMI & Subsidy Calculator',
    subtitle: 'See how much government loan you can get, your monthly installment (EMI), and how much interest you save',
    promoterEquityInput: 'Enter Your Own Money to Invest (Apna Paisa)',
    quickPicks: 'Quick Amounts',
    totalOutlayCard: 'Total Business Setup Cost (Pura Kharcha)',
    concessionalLoanCard: 'Government Loan You Can Get (90%)',
    quarterlyEmiCard: 'Quarterly Installment (3 Mahine ki Kist)',
    interestSavedCard: 'Total Government Subsidy Saved',
    capitalExpenditure: 'Where the Money is Spent',
    machinery: 'Machines & Equipment (68%)',
    civil: 'Shop / Shed Construction (14%)',
    workingCapital: 'Cash in Hand for Daily Work (18%)',
    repaymentSchedule: 'View Installment Schedule',
    submitDpr: 'Save & Send Loan Application',
    voiceCalculate: 'Listen to Voice Calculation',
    schemeTitle: 'Government Loan Scheme',
    tenureMonths: 'Total Loan Time',
    gracePeriod: 'No-EMI Grace Time (Chhoot Samay)'
  },
  hi: {
    title: 'आसान ऋण, ईएमआई एवं सब्सिडी कैलकुलेटर',
    subtitle: 'देखें आपकी बचत पर कितना बैंक लोन और सरकारी सब्सिडी मिल सकती है, कितनी किस्त बनेगी और कितनी ब्याज बचत होगी',
    promoterEquityInput: 'अपनी जेब से लगाने वाली पूंजी (अपना पैसा)',
    quickPicks: 'त्वरित विकल्प',
    totalOutlayCard: 'कुल व्यापार लागत (पूरा खर्चा)',
    concessionalLoanCard: 'अनुमानित बैंक ऋण राशि (90%)',
    quarterlyEmiCard: 'त्रैमासिक किस्त (3 महीने की EMI)',
    interestSavedCard: 'सरकारी सब्सिडी से कुल बचत',
    capitalExpenditure: 'पैसे का कहां खर्च होगा',
    machinery: 'मशीनरी एवं उपकरण (68%)',
    civil: 'दुकान या शेड निर्माण (14%)',
    workingCapital: 'रोजमर्रा के काम के लिए रोकड़ (18%)',
    repaymentSchedule: 'किस्त चुकाने का समय-सारणी',
    submitDpr: 'प्रोजेक्ट रिपोर्ट तैयार करें',
    voiceCalculate: 'आवाज में हिसाब सुनें',
    schemeTitle: 'सरकारी सहायता प्राप्त ग्रामीण योजना',
    tenureMonths: 'कुल ऋण अवधि',
    gracePeriod: 'किस्त से शुरुआती छूट (मोराटोरियम)'
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};
regionalLangs.forEach((lang) => {
  CALCULATOR_TEXT[lang] = { ...CALCULATOR_TEXT.en };
});

export interface ClusterMapTranslations {
  title: string;
  subtitle: string;
  filterBuffer: string;
  allClusters: string;
  audioGuide: string;
  exportDossier: string;
  panchayatDetails: string;
  saturationIndex: string;
  recommended: string;
  avoid: string;
  milchCattle: string;
  activeClusters: string;
}

export const CLUSTER_MAP_TEXT: Record<SupportedLanguage, ClusterMapTranslations> = {
  en: {
    title: 'Gram Panchayat Village Map & Business Guide',
    subtitle: 'Check what businesses are needed in your village and what businesses are already crowded',
    filterBuffer: 'Filter Village Distance',
    allClusters: 'All Village Areas',
    audioGuide: 'Listen to Village Guide (Audio)',
    exportDossier: 'Download Village Map Report (PDF)',
    panchayatDetails: 'Panchayat & Village Details',
    saturationIndex: 'Market Demand Status',
    recommended: 'Best Businesses to Start Here',
    avoid: 'Already Crowded (Avoid Starting)',
    milchCattle: 'Number of Cows & Buffaloes',
    activeClusters: 'Active Shops & Units in Area'
  },
  hi: {
    title: 'ग्राम पंचायत गांव का नक्शा व व्यवसाय गाइड',
    subtitle: 'देखें आपके गांव में कौन सा व्यवसाय चलने लायक है और किसमें पहले से भीड़ है',
    filterBuffer: 'गांव की दूरी फ़िल्टर करें',
    allClusters: 'सभी गांव क्षेत्र',
    audioGuide: 'गांव गाइड (ऑडियो) सुनें',
    exportDossier: 'गांव नक्शा रिपोर्ट (PDF) डाउनलोड करें',
    panchayatDetails: 'ग्राम पंचायत व गांव विवरण',
    saturationIndex: 'मांग व बाजार स्थिति',
    recommended: 'शुरू करने योग्य अच्छे व्यवसाय',
    avoid: 'पहले से भीड़भाड़ (शुरू करने से बचें)',
    milchCattle: 'गाय-भैंसों की कुल संख्या',
    activeClusters: 'क्षेत्र में चालू दुकानें व इकाइयां'
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};
regionalLangs.forEach((lang) => {
  CLUSTER_MAP_TEXT[lang] = { ...CLUSTER_MAP_TEXT.en };
});

export interface SimulatorTranslations {
  title: string;
  subtitle: string;
  moratoriumSlider: string;
  stressSlider: string;
  liveDscr: string;
  quarterlySurplus: string;
  concessionalInterest: string;
  routeToBank: string;
  equipmentCatalog: string;
  amortizationTable: string;
  quarter: string;
  principalPaid: string;
  interestPaid: string;
  remainingBalance: string;
  status: string;
}

export const SIMULATOR_TEXT: Record<SupportedLanguage, SimulatorTranslations> = {
  en: {
    title: 'Loan Repayment & Installment Helper',
    subtitle: 'See your installment schedule, check what happens if crop yield or milk dips, and see easy repayment steps',
    moratoriumSlider: 'Choose First Free Months (No-EMI Time)',
    stressSlider: 'Simulate Bad Season / Less Crop or Milk',
    liveDscr: 'Repayment Safety Score',
    quarterlySurplus: 'Your Quarterly Money Remaining in Hand',
    concessionalInterest: 'Low Subsidized Interest Rate (4%-5%)',
    routeToBank: 'Contact Nearest Bank Branch for Help',
    equipmentCatalog: 'Suggested Machine & Equipment List',
    amortizationTable: 'Step-by-Step Installment Table',
    quarter: 'Quarter (3 Months)',
    principalPaid: 'Loan Repaid',
    interestPaid: 'Interest Paid',
    remainingBalance: 'Balance Remaining',
    status: 'Status'
  },
  hi: {
    title: 'आसान ऋण किस्त व छूट अवधि सहायक',
    subtitle: 'देखें आपकी किस्त कब शुरू होगी, खराब मौसम या कम पैदावार में किस्त कैसे चुकाएं',
    moratoriumSlider: 'शुरुआती छूट के महीने चुनें (जब ईएमआई ₹0 होगी)',
    stressSlider: 'कम पैदावार या कम दूध की स्थिति जांचें',
    liveDscr: 'किस्त चुकाने का सुरक्षा स्कोर',
    quarterlySurplus: 'हर 3 महीने में हाथ में बचने वाला पैसा',
    concessionalInterest: 'सस्ती ब्याज दर (4%-5%)',
    routeToBank: 'नजदीकी बैंक शाखा से सहायता लें',
    equipmentCatalog: 'अनुमोदित मशीनरी व सामान सूची',
    amortizationTable: 'किस्त चुकाने की समय सारणी',
    quarter: 'तिमाही (3 महीने)',
    principalPaid: 'मूलधन भुगतान',
    interestPaid: 'ब्याज भुगतान',
    remainingBalance: 'बकाया राशि',
    status: 'स्थिति'
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};
regionalLangs.forEach((lang) => {
  SIMULATOR_TEXT[lang] = { ...SIMULATOR_TEXT.en };
});

export interface FooterTranslations {
  purpose: string;
  encrypted: string;
  coreModules: string;
  apexCorps: string;
  techInfra: string;
  citizenSupport: string;
  onlineSupport: string;
  onlineSupportDesc: string;
  copyright: string;
}

export const FOOTER_TEXT: Record<SupportedLanguage, FooterTranslations> = {
  en: {
    purpose: 'GramMitra - Village Community & Gram Panchayat Portal: An independent digital platform helping rural citizens, farmers, and village shopkeepers calculate loans, explore rural welfare schemes, and manage shop khata in easy language.',
    encrypted: 'Private, Secure & Community-Focused Portal',
    coreModules: 'Panchayat Services',
    apexCorps: 'Rural Welfare Schemes',
    techInfra: 'Village Digital Tools',
    citizenSupport: 'Citizen Help & Guidance Desk',
    onlineSupport: 'Online Citizen Helpdesk',
    onlineSupportDesc: 'Ask questions, get help with calculations, or find nearest village centers.',
    copyright: '© 2026 GramMitra. An independent community helper portal for Gram Panchayat citizens and rural shopkeepers.'
  },
  hi: {
    purpose: 'ग्राममित्र - ग्राम पंचायत नागरिक एवं समुदाय सेवा पोर्टल: ग्रामीण नागरिकों, किसानों और छोटे दुकानदारों के लिए एक स्वतंत्र डिजिटल मंच, जहाँ आप आसानी से ऋण की गणना कर सकते हैं, ग्रामीण योजनाओं की जानकारी ले सकते हैं और अपनी दुकान का बही-खाता चला सकते हैं।',
    encrypted: 'सुरक्षित, निजी एवं जनहितैषी नागरिक पोर्टल',
    coreModules: 'प्रमुख सेवाएं',
    apexCorps: 'ग्रामीण कल्याण योजनाएं',
    techInfra: 'ग्राम डिजिटल सुविधाएं',
    citizenSupport: 'नागरिक सहायता व मार्गदर्शन',
    onlineSupport: 'ऑनलाइन नागरिक सहायता',
    onlineSupportDesc: 'कोई भी प्रश्न पूछें, लोन गणना में सहायता लें या नजदीकी पंचायत केंद्र खोजें।',
    copyright: '© 2026 ग्राममित्र। ग्राम पंचायत नागरिकों, किसानों और ग्रामीण दुकानदारों के लिए समर्पित स्वतंत्र सामुदायिक मंच।'
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};
regionalLangs.forEach((lang) => {
  FOOTER_TEXT[lang] = { ...FOOTER_TEXT.en };
});

export interface VoiceTranslations {
  title: string;
  subtitle: string;
  askPrompt: string;
  tapNotice: string;
  queries: { text: string; target: ScreenType }[];
}

export const VOICE_TEXT: Record<SupportedLanguage, VoiceTranslations> = {
  en: {
    title: 'Voice Sahayak (Audio Help Desk)',
    subtitle: 'Listen and speak in simple language',
    askPrompt: 'Tap any question below to listen to the answer:',
    tapNotice: 'Click any button to hear the answer and open that page.',
    queries: [
      { text: 'How much government loan can I get on ₹1 Lakh of my own money?', target: 'calculator' },
      { text: 'Can I start a mini solar milk center in Rampur Kalan?', target: 'feasibility' },
      { text: 'Which businesses are most needed in our village area?', target: 'cluster-map' },
      { text: 'When do I have to pay my first loan installment?', target: 'loan-simulator' }
    ]
  },
  hi: {
    title: 'Voice Sahayak (आवाज सहायक)',
    subtitle: 'बोलकर पूछें और आसान भाषा में समझें',
    askPrompt: 'हिंदी अथवा अपनी बोली में पूछें या नीचे दिया गया प्रश्न चुनें:',
    tapNotice: 'ऑडियो उत्तर सुनने और सीधे उस पेज पर जाने के लिए किसी भी प्रश्न पर टैप करें।',
    queries: [
      { text: 'मुझे ₹1 लाख अपनी पूंजी पर कितना बैंक लोन मिल सकता है?', target: 'calculator' },
      { text: 'रामपुर कलां में चिलिंग यूनिट लगाने का क्या फायदा है?', target: 'feasibility' },
      { text: 'हमारे गांव में कौन सा काम शुरू करना सबसे अच्छा रहेगा?', target: 'cluster-map' },
      { text: 'मेरी पहली लोन की किस्त कब देनी होगी?', target: 'loan-simulator' }
    ]
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};
regionalLangs.forEach((lang) => {
  VOICE_TEXT[lang] = { ...VOICE_TEXT.en };
});

export interface LoginTranslations {
  title: string;
  subtitle: string;
  tempCredentialsNotice: string;
  tempCredentialsDesc: string;
  authorizedEmailLabel: string;
  authorizedPasswordLabel: string;
  autofillButton: string;
  copiedTooltip: string;
  emailInputLabel: string;
  passwordInputLabel: string;
  rememberMe: string;
  signInButton: string;
  verifyingButton: string;
  invalidEmailError: string;
  invalidPasswordError: string;
  emptyFieldsError: string;
  roleBeneficiary: string;
  roleVle: string;
  secureAuthNote: string;
  citizenSupportLink: string;
}

export const LOGIN_TEXT: Record<SupportedLanguage, LoginTranslations> = {
  en: {
    title: 'Gram Panchayat Citizen Login',
    subtitle: 'Easy Village Services, Schemes & Shopkeeper Khata for Citizens',
    tempCredentialsNotice: 'Direct Quick Login (No Password Needed)',
    tempCredentialsDesc: 'Click the green auto-fill button below to instantly log in as a citizen or village member.',
    authorizedEmailLabel: 'Quick Login Account',
    authorizedPasswordLabel: 'Password',
    autofillButton: 'Click Here for Quick Auto-Login',
    copiedTooltip: 'Copied!',
    emailInputLabel: 'Email or Mobile ID',
    passwordInputLabel: 'Password',
    rememberMe: 'Keep me logged in on this phone/computer',
    signInButton: 'Log In to Village Portal',
    verifyingButton: 'Opening Village Portal...',
    invalidEmailError: 'Login details not recognized. Please use one of the quick accounts listed above.',
    invalidPasswordError: 'Incorrect password. Please use the quick auto-login button above.',
    emptyFieldsError: 'Please enter your login email and password.',
    roleBeneficiary: 'Village Citizen / Small Business Owner',
    roleVle: 'CSC Village Operator',
    secureAuthNote: 'Safe and private access for village citizens & shopkeepers',
    citizenSupportLink: 'Panchayat Citizen Helpline: 1800-11-2001'
  },
  hi: {
    title: 'ग्राम पंचायत नागरिक लॉगिन',
    subtitle: 'गांव के नागरिकों के लिए आसान सेवाएं, सरकारी योजनाएं और दुकान बही-खाता',
    tempCredentialsNotice: 'आसान त्वरित लॉगिन (सीधा प्रवेश)',
    tempCredentialsDesc: 'पोर्टल खोलने के लिए नीचे दिए गए हरे बटन "ऑटो-फिल" पर क्लिक करें और तुरंत प्रवेश करें।',
    authorizedEmailLabel: 'त्वरित लॉगिन ईमेल',
    authorizedPasswordLabel: 'पासवर्ड',
    autofillButton: 'तुरंत लॉगिन करने के लिए यहाँ क्लिक करें (Auto-Fill)',
    copiedTooltip: 'क्लिपबोर्ड पर कॉपी किया गया!',
    emailInputLabel: 'ईमेल अथवा मोबाइल नंबर',
    passwordInputLabel: 'पासवर्ड',
    rememberMe: 'मुझे इस फोन/कंप्यूटर पर लॉगिन रखें',
    signInButton: 'ग्राम पंचायत पोर्टल में लॉगिन करें',
    verifyingButton: 'पोर्टल खोला जा रहा है...',
    invalidEmailError: 'कृपया ऊपर दिए गए त्वरित लॉगिन ईमेल (जैसे laluaj677@gmail.com या demo.citizen@grammitra.in) का उपयोग करें।',
    invalidPasswordError: 'गलत पासवर्ड। कृपया ऊपर दिए गए "तुरंत लॉगिन" बटन का उपयोग करें।',
    emptyFieldsError: 'कृपया आगे बढ़ने के लिए ईमेल और पासवर्ड दोनों दर्ज करें।',
    roleBeneficiary: 'गांव का नागरिक / छोटा व्यवसायी',
    roleVle: 'सीएससी / जन सेवा केंद्र ऑपरेटर',
    secureAuthNote: 'ग्राम पंचायत नागरिकों हेतु सुरक्षित एवं निजी पहुंच',
    citizenSupportLink: 'पंचायत नागरिक सहायता: 1800-11-2001'
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};
regionalLangs.forEach((lang) => {
  LOGIN_TEXT[lang] = { ...LOGIN_TEXT.en };
});

export interface KhataTranslations {
  title: string;
  subtitle: string;
  defaultShopName: string;
  defaultOwner: string;
  shopLocation: string;
  tabs: {
    customers: string;
    suppliers: string;
    galla: string;
    billing: string;
    inventory: string;
    analytics: string;
  };
  metrics: {
    toCollect: string;
    toPay: string;
    todaySales: string;
    cashInGalla: string;
  };
  customers: {
    searchPlaceholder: string;
    addNewCustomer: string;
    filterAll: string;
    filterUdhar: string;
    filterJama: string;
    youGave: string;
    youGot: string;
    netUdhar: string;
    netAdvance: string;
    allSettled: string;
    sendReminder: string;
    downloadStatement: string;
    recordEntry: string;
    giveCreditBtn: string;
    receivePaymentBtn: string;
    billNoOrNote: string;
    amountLabel: string;
    dateLabel: string;
    transactionHistory: string;
    noCustomersFound: string;
    whatsappReminderSent: string;
  };
  suppliers: {
    searchPlaceholder: string;
    addNewSupplier: string;
    totalPayable: string;
    recordPurchase: string;
    recordPayment: string;
  };
  galla: {
    title: string;
    subtitle: string;
    openingBalance: string;
    cashSales: string;
    upiCollection: string;
    cashExpenses: string;
    closingCash: string;
    notesCounter: string;
    recordExpense: string;
  };
  billing: {
    title: string;
    subtitle: string;
    selectCustomer: string;
    cashCustomer: string;
    addItem: string;
    itemName: string;
    qty: string;
    unitPrice: string;
    total: string;
    paymentMode: string;
    cash: string;
    upi: string;
    creditKhata: string;
    generateSlip: string;
    printParchi: string;
    downloadPdf: string;
    shareWhatsapp: string;
    itemsCatalog: string;
  };
  inventory: {
    title: string;
    subtitle: string;
    addItem: string;
    itemName: string;
    category: string;
    buyRate: string;
    sellRate: string;
    currentStock: string;
    lowStockWarn: string;
  };
  analytics: {
    title: string;
    subtitle: string;
    grossRevenue: string;
    grossMargin: string;
    topDebtors: string;
    monthlyTrend: string;
  };
}

export const KHATA_TEXT: Record<SupportedLanguage, KhataTranslations> = {
  en: {
    title: 'Village Shop Khata & Daily Bill Book',
    subtitle: 'Simple Daily Hisab-Kitab: Customer Udhar & Jama, Wholesaler Dues, Cash Galla, and Fast Bill Parchi',
    defaultShopName: 'Radhe Kirana & General Store',
    defaultOwner: 'Lalu Yadav (Shopkeeper)',
    shopLocation: 'Gram Panchayat Rampur Kalan, Lucknow',
    tabs: {
      customers: 'Customer Khata (Udhar & Jama)',
      suppliers: 'Wholesalers (Mal Khareed)',
      galla: 'Daily Cash Galla (Cash Box)',
      billing: 'Make Bill / Parchi (Quick Bill)',
      inventory: 'My Items & Stock (Dukan Saman)',
      analytics: 'Daily Sales & Profit (Munafa)'
    },
    metrics: {
      toCollect: 'Market Udhar to Collect (Lena Hai)',
      toPay: 'Wholesaler Dues to Pay (Dena Hai)',
      todaySales: "Today's Total Sale (Aaj Ki Bikri)",
      cashInGalla: 'Cash in Galla (Galle Ka Cash)'
    },
    customers: {
      searchPlaceholder: 'Search customer by name, village, or mobile...',
      addNewCustomer: '+ Add New Customer',
      filterAll: 'All Customers',
      filterUdhar: 'Udhar Baki (To Collect)',
      filterJama: 'Advance Jama (Credit)',
      youGave: 'You Gave (Udhar Diya ₹)',
      youGot: 'You Received (Paisa Mila ₹)',
      netUdhar: 'Balance Customer Owes (Baki Paisa)',
      netAdvance: 'Advance Customer Paid (Advance Jama)',
      allSettled: 'Hisab Clear (No Dues)',
      sendReminder: 'Send WhatsApp Reminder',
      downloadStatement: 'Download Khata Statement (PDF)',
      recordEntry: 'Add Entry in Customer Khata',
      giveCreditBtn: '- Gave on Credit (Udhar Diya)',
      receivePaymentBtn: '+ Received Payment (Paisa Mila)',
      billNoOrNote: 'Bill No. / Item Name or Note',
      amountLabel: 'Amount (₹)',
      dateLabel: 'Date',
      transactionHistory: 'Customer Ledger Entries',
      noCustomersFound: 'No customer found',
      whatsappReminderSent: 'WhatsApp reminder message sent!'
    },
    suppliers: {
      searchPlaceholder: 'Search wholesaler or dealer by name...',
      addNewSupplier: '+ Add New Wholesaler',
      totalPayable: 'Total Due to Wholesaler (Dena Hai)',
      recordPurchase: '+ Bought Goods on Credit (Udhar Mal Aaya)',
      recordPayment: '- Paid to Wholesaler (Chukaya)'
    },
    galla: {
      title: 'Daily Cash Galla (Rozana Rokad Hisab)',
      subtitle: 'Keep track of physical cash in drawer, UPI payments (PhonePe/GPay), and daily store expenses',
      openingBalance: 'Morning Opening Cash (Subah Ka Galla)',
      cashSales: 'Cash Received from Sales',
      upiCollection: 'Online / UPI Payments (PhonePe, GPay, Paytm)',
      cashExpenses: 'Daily Shop Expenses (Kharcha)',
      closingCash: 'Net Cash in Galla at Night (Sham Ka Cash)',
      notesCounter: 'Cash Notes Counter (Note Ganna)',
      recordExpense: '+ Add Shop Expense'
    },
    billing: {
      title: 'Make Bill & Parchi (Quick Invoicing)',
      subtitle: 'Create simple customer receipts, print small parchi, or send on WhatsApp',
      selectCustomer: 'Select Customer (or leave empty)',
      cashCustomer: 'Direct Cash Customer (Walk-in)',
      addItem: '+ Add Item to Bill',
      itemName: 'Item Name',
      qty: 'Quantity',
      unitPrice: 'Price per Unit (₹)',
      total: 'Total (₹)',
      paymentMode: 'How did customer pay?',
      cash: 'Cash Payment (Nagad)',
      upi: 'UPI / QR Code',
      creditKhata: 'Add to Customer Khata (Udhar)',
      generateSlip: 'Save Bill',
      printParchi: 'Print Bill Parchi',
      downloadPdf: 'Download Bill PDF',
      shareWhatsapp: 'Send on WhatsApp',
      itemsCatalog: 'Pick from Store Items Catalog'
    },
    inventory: {
      title: 'Store Items & Stock Management',
      subtitle: 'List your items, purchase rates, selling rates, and get low-stock alerts',
      addItem: '+ Add Item to Store',
      itemName: 'Item Name',
      category: 'Category',
      buyRate: 'Cost Price (Khareed Rate ₹)',
      sellRate: 'Selling Price (Bikri Rate ₹)',
      currentStock: 'Stock Quantity Left',
      lowStockWarn: 'Low Stock Alert (< 10 left)'
    },
    analytics: {
      title: 'Store Profit & Sales Summary',
      subtitle: 'See your daily sales, estimated profit, and top customer balances',
      grossRevenue: 'Total Sales This Month',
      grossMargin: 'Estimated Profit Margin',
      topDebtors: 'Top Customers with Udhar',
      monthlyTrend: 'Weekly Sales Trend'
    }
  },
  hi: {
    title: 'दुकानदार डिजिटल बही-खाता एवं व्यापार प्रबंधक',
    subtitle: 'ग्राहक जमा-उधार, सप्लायर हिसाब, दुकान का गल्ला (रोकड़ बही), डिजिटल बिलिंग एवं त्वरित व्हाट्सएप्प तकादा',
    defaultShopName: 'श्री राधे किराना एवं डेयरी भंडार',
    defaultOwner: 'श्री लालू यादव (दुकानदार / प्रोप्राइटर)',
    shopLocation: 'ग्राम पंचायत रामपुर कलां, ब्लॉक मोहनलालगंज, लखनऊ',
    tabs: {
      customers: 'ग्राहक खाता (जमा-उधार)',
      suppliers: 'सप्लायर खाता (थोक व्यापारी)',
      galla: 'दुकान का गल्ला (रोकड़ बही)',
      billing: 'कच्चा/पक्का बिल (पर्ची)',
      inventory: 'सामान व स्टॉक (इन्वेंटरी)',
      analytics: 'व्यापार रिपोर्ट व मुनाफा'
    },
    metrics: {
      toCollect: 'बाजार में फंसी उधारी (लेना है)',
      toPay: 'सप्लायर को बकाया (देना है)',
      todaySales: 'आज की कुल बिक्री (सकल)',
      cashInGalla: 'गल्ले में कुल रोकड़ (रोकड़ शेष)'
    },
    customers: {
      searchPlaceholder: 'ग्राहक का नाम, मोबाइल नंबर या गांव खोजें...',
      addNewCustomer: '+ नया ग्राहक जोड़ें',
      filterAll: 'सभी खाते',
      filterUdhar: 'उधारी बाकी (लेना है)',
      filterJama: 'एडवांस / चुकता (जमा)',
      youGave: 'मैंने दिया (उधार ₹)',
      youGot: 'मुझे मिला (जमा ₹)',
      netUdhar: 'ग्राहक से लेना बाकी है',
      netAdvance: 'खाते में एडवांस जमा',
      allSettled: 'हिसाब पूरा चुकता है',
      sendReminder: 'व्हाट्सएप्प पर तकादा भेजें',
      downloadStatement: 'खाता विवरण PDF निकालें',
      recordEntry: 'खाते में लेनदेन जोड़ें',
      giveCreditBtn: '- मैंने दिया (उधार)',
      receivePaymentBtn: '+ मुझे मिला (जमा)',
      billNoOrNote: 'बिल/पर्ची नंबर या सामान का विवरण',
      amountLabel: 'लेनदेन राशि (₹)',
      dateLabel: 'लेनदेन की तारीख',
      transactionHistory: 'ग्राहक बही-खाता लेनदेन विवरण',
      noCustomersFound: 'इस खोज के अनुसार कोई ग्राहक नहीं मिला',
      whatsappReminderSent: 'व्हाट्सएप्प/एसएमएस द्वारा तकादा संदेश भेज दिया गया'
    },
    suppliers: {
      searchPlaceholder: 'सप्लायर या थोक विक्रेता का नाम खोजें...',
      addNewSupplier: '+ नया सप्लायर जोड़ें',
      totalPayable: 'सप्लायर को कुल देना बाकी',
      recordPurchase: '+ उधार माल आया (खरीद)',
      recordPayment: '- सप्लायर को भुगतान किया'
    },
    galla: {
      title: 'दैनिक गल्ला एवं रोकड़ बही सत्यापन',
      subtitle: 'दुकान के भौतिक गल्ले की नकदी, यूपीआई संग्रह और खर्चों का सटीक मिलान',
      openingBalance: 'सुबह का गल्ला (शुरुआती रोकड़)',
      cashSales: 'आज की नकद बिक्री',
      upiCollection: 'क्यूआर / यूपीआई ऑनलाइन संग्रह',
      cashExpenses: 'दुकान के दैनिक खर्चे व भुगतान',
      closingCash: 'गल्ले में अपेक्षित रोकड़ राशि',
      notesCounter: 'करेंसी नोटों की गिनती कैलकुलेटर',
      recordExpense: '+ दुकान का खर्चा दर्ज करें'
    },
    billing: {
      title: 'त्वरित डिजिटल पर्ची व व्हाट्सएप्प रसीद',
      subtitle: 'ग्राहकों के लिए तुरंत खुदरा बिल बनाएं, सीधे बही-खाते में उधारी दर्ज करें या रसीद प्रिंट करें',
      selectCustomer: 'ग्राहक खाता चुनें',
      cashCustomer: 'काउंटर नकद ग्राहक (बिना खाता)',
      addItem: '+ एक और सामान जोड़ें',
      itemName: 'सामान का नाम / विवरण',
      qty: 'मात्रा',
      unitPrice: 'दर प्रति इकाई (₹)',
      total: 'कुल राशि (₹)',
      paymentMode: 'भुगतान का तरीका',
      cash: 'नकद प्राप्त हुआ',
      upi: 'यूपीआई / ऑनलाइन प्राप्त हुआ',
      creditKhata: 'ग्राहक के खाते में उधार जोड़ें',
      generateSlip: 'पर्ची बनाएं व सहेजें',
      printParchi: 'थर्मल रसीद प्रिंट करें',
      downloadPdf: 'PDF रसीद डाउनलोड करें',
      shareWhatsapp: 'व्हाट्सएप्प पर बिल भेजें',
      itemsCatalog: 'दुकान के सामान कैटलॉग से चुनें'
    },
    inventory: {
      title: 'दुकान का सामान व स्टॉक रजिस्टर',
      subtitle: 'किराना सामान, दूध के केन, पशु आहार और न्यूनतम स्टॉक चेतावनी की निगरानी करें',
      addItem: '+ नया सामान जोड़ें',
      itemName: 'उत्पाद का नाम',
      category: 'श्रेणी',
      buyRate: 'खरीद दर (₹)',
      sellRate: 'बिक्री दर (₹)',
      currentStock: 'उपलब्ध स्टॉक',
      lowStockWarn: 'कम स्टॉक चेतावनी (< 10 इकाई)'
    },
    analytics: {
      title: 'दुकान का व्यापार स्वास्थ्य एवं लाभ-हानि रिपोर्ट',
      subtitle: 'सकल लाभ, उधारी वसूली चक्र और कार्यशील पूंजी का संपूर्ण विश्लेषण',
      grossRevenue: 'मासिक अनुमानित कारोबार',
      grossMargin: 'सकल लाभ मार्जिन',
      topDebtors: 'सर्वाधिक उधारी वाले ग्राहक',
      monthlyTrend: 'साप्ताहिक रोकड़ प्रवाह'
    }
  },
  bn: {} as any, mr: {} as any, te: {} as any, ta: {} as any, gu: {} as any,
  ur: {} as any, kn: {} as any, or: {} as any, ml: {} as any, pa: {} as any
};

regionalLangs.forEach((lang) => {
  KHATA_TEXT[lang] = { ...KHATA_TEXT.en };
});
