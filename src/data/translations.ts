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
    portalName: 'GramMitra Portal',
    portalSubtitle: 'National Concessional Credit & Feasibility Portal',
    officialLanguage: 'Official Language',
    changeLanguage: 'Language',
    contrastMode: 'High Contrast',
    navGateway: 'Gateway',
    navKhata: 'Dukandar Khata',
    navFeasibility: 'Feasibility Dossier',
    navCalculator: 'Scheme Calculator',
    navClusterMap: 'Cluster Map',
    navSimulator: 'Loan Simulator',
    dprSanctionRate: '98.4% DPR Sanction Rate',
    activePanchayats: '42,910 Panchayats',
    sovereignHeader: 'GOVERNMENT OF INDIA | Ministry of Social Justice & Empowerment',
    nationalPortal: 'National Portal',
    voiceSahayak: 'Voice Sahayak',
    sovereignAlerts: 'Sovereign Alerts',
    unread: 'Unread',
    apexCorps: 'NBCFDC & NSFDC Statutory Apex Corporations'
  },
  hi: {
    portalName: 'ग्राममित्र पोर्टल',
    portalSubtitle: 'राष्ट्रीय रियायती ऋण एवं वित्तीय व्यवहार्यता पोर्टल',
    officialLanguage: 'आधिकारिक भाषा',
    changeLanguage: 'भाषा',
    contrastMode: 'उच्च कंट्रास्ट',
    navGateway: 'गेटवे (प्रवेश)',
    navKhata: 'दुकानदार बही-खाता',
    navFeasibility: 'व्यवहार्यता रिपोर्ट',
    navCalculator: 'योजना कैलकुलेटर',
    navClusterMap: 'क्लस्टर मानचित्र',
    navSimulator: 'ऋण सिमुलेटर',
    dprSanctionRate: '98.4% स्वीकृति दर',
    activePanchayats: '42,910 ग्राम पंचायतें',
    sovereignHeader: 'भारत सरकार | सामाजिक न्याय एवं अधिकारिता मंत्रालय',
    nationalPortal: 'राष्ट्रीय पोर्टल',
    voiceSahayak: 'आवाज सहायक',
    sovereignAlerts: 'सांविधिक सूचनाएं',
    unread: 'अपठित',
    apexCorps: 'NBCFDC एवं NSFDC शीर्ष सांविधिक निगम'
  },
  bn: {
    portalName: 'গ্রামমিত্র পোর্টাল',
    portalSubtitle: 'জাতীয় রেয়াতী ঋণ ও সম্ভাব্যতা পোর্টাল',
    officialLanguage: 'সরকারি ভাষা',
    changeLanguage: 'ভাষা',
    contrastMode: 'উচ্চ বৈসাদৃশ্য',
    navGateway: 'গেটওয়ে',
    navFeasibility: 'সম্ভাব্যতা প্রতিবেদন',
    navCalculator: 'প্রকল্প ক্যালকুলেটর',
    navClusterMap: 'ক্লাস্টার মানচিত্র',
    navSimulator: 'ঋণ সিমুলেটর',
    dprSanctionRate: '৯৮.৪% ডিপিআর অনুমোদন',
    activePanchayats: '৪২,৯১০ পঞ্চায়েত',
    sovereignHeader: 'ভারত সরকার | সামাজিক ন্যায়বিচার ও ক্ষমতায়ন মন্ত্রক',
    nationalPortal: 'জাতীয় পোর্টাল',
    voiceSahayak: 'ভয়েস সহায়ক',
    sovereignAlerts: 'সরকারি সতর্কতা',
    unread: 'অপঠিত',
    apexCorps: 'NBCFDC ও NSFDC সংবিধিবদ্ধ শীর্ষ নিগম'
  },
  mr: {
    portalName: 'ग्राममित्र पोर्टल',
    portalSubtitle: 'राष्ट्रीय सवलत कर्ज आणि व्यवहार्यता पोर्टल',
    officialLanguage: 'अधिकृत भाषा',
    changeLanguage: 'भाषा',
    contrastMode: 'हाय कॉन्ट्रास्ट',
    navGateway: 'गेटवे',
    navFeasibility: 'व्यवहार्यता अहवाल',
    navCalculator: 'योजना कॅल्क्युलेटर',
    navClusterMap: 'क्लस्टर नकाशा',
    navSimulator: 'कर्ज सिम्युलेटर',
    dprSanctionRate: '९८.४% मंजुरी दर',
    activePanchayats: '४२,९१० पंचायती',
    sovereignHeader: 'भारत सरकार | सामाजिक न्याय आणि सक्षमीकरण मंत्रालय',
    nationalPortal: 'राष्ट्रीय पोर्टल',
    voiceSahayak: 'व्हॉइस सहाय्यक',
    sovereignAlerts: 'सरकारी सूचना',
    unread: 'न वाचलेले',
    apexCorps: 'NBCFDC आणि NSFDC वैधानिक महामंडळे'
  },
  te: {
    portalName: 'గ్రామమిత్ర పోర్టల్',
    portalSubtitle: 'జాతీయ రాయితీ రుణ మరియు సాధ్యాసాధ్యాల పోర్టల్',
    officialLanguage: 'అధికారిక భాష',
    changeLanguage: 'భాష',
    contrastMode: 'హై కాంట్రాస్ట్',
    navGateway: 'గేట్‌వే',
    navFeasibility: 'సాధ్యాసాధ్యాల నివేదిక',
    navCalculator: 'పథకం కాలిక్యులేటర్',
    navClusterMap: 'క్లస్టర్ మ్యాప్',
    navSimulator: 'రుణ సిమ్యులేటర్',
    dprSanctionRate: '98.4% ఆమోదం రేటు',
    activePanchayats: '42,910 పంచాయతీలు',
    sovereignHeader: 'భారత ప్రభుత్వం | సామాజిక న్యాయం & సాధికారత మంత్రిత్వ శాఖ',
    nationalPortal: 'జాతీయ పోర్టల్',
    voiceSahayak: 'వాయిస్ సహాయక్',
    sovereignAlerts: 'ప్రభుత్వ హెచ్చరికలు',
    unread: 'చదవనివి',
    apexCorps: 'NBCFDC & NSFDC చట్టబద్ధ కార్పొరేషన్లు'
  },
  ta: {
    portalName: 'கிராமமித்ரா போர்ட்டல்',
    portalSubtitle: 'தேசிய சலுகைக் கடன் மற்றும் சாத்தியக்கூறு தளம்',
    officialLanguage: 'அதிகாரப்பூர்வ மொழி',
    changeLanguage: 'மொழி',
    contrastMode: 'உயர் மாறுபாடு',
    navGateway: 'நுழைவாயில்',
    navFeasibility: 'சாத்தியக்கூறு அறிக்கை',
    navCalculator: 'திட்ட கால்குலேட்டர்',
    navClusterMap: 'கொத்து வரைபடம்',
    navSimulator: 'கடன் சிமுலேட்டர்',
    dprSanctionRate: '98.4% ஒப்புதல் விகிதம்',
    activePanchayats: '42,910 பஞ்சாயத்துகள்',
    sovereignHeader: 'இந்திய அரசு | சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம்',
    nationalPortal: 'தேசிய போர்ட்டல்',
    voiceSahayak: 'குரல் உதவியாளர்',
    sovereignAlerts: 'அரசு அறிவிப்புகள்',
    unread: 'படிக்காதவை',
    apexCorps: 'NBCFDC & NSFDC சட்டப்பூர்வ கழகங்கள்'
  },
  gu: {
    portalName: 'ગ્રામમિત્ર પોર્ટલ',
    portalSubtitle: 'રાષ્ટ્રીય રાહત ધિરાણ અને શક્યતા પોર્ટલ',
    officialLanguage: 'સત્તાવાર ભાષા',
    changeLanguage: 'ભાષા',
    contrastMode: 'હાઇ કોન્ટ્રાસ્ટ',
    navGateway: 'ગેટવે',
    navFeasibility: 'શક્યતા અહેવાલ',
    navCalculator: 'યોજના કેલ્ક્યુલેટર',
    navClusterMap: 'ક્લસ્ટર નકશો',
    navSimulator: 'લોન સિમ્યુલેટર',
    dprSanctionRate: '98.4% મંજૂરી દર',
    activePanchayats: '42,910 પંચાયતો',
    sovereignHeader: 'ભારત સરકાર | સામાજિક ન્યાય અને સશક્તિકરણ મંત્રાલય',
    nationalPortal: 'રાષ્ટ્રીય પોર્ટલ',
    voiceSahayak: 'વૉઇસ સહાયક',
    sovereignAlerts: 'સરકારી ચેતવણીઓ',
    unread: 'અણવાંચેલા',
    apexCorps: 'NBCFDC અને NSFDC વૈધાનિક નિગમો'
  },
  ur: {
    portalName: 'گرام متر پورٹل',
    portalSubtitle: 'قومی رعایتی قرضہ و فزیبلٹی پورٹل',
    officialLanguage: 'سرکاری زبان',
    changeLanguage: 'زبان',
    contrastMode: 'ہائی کنٹراسٹ',
    navGateway: 'گیٹ وے',
    navFeasibility: 'فزیبلٹی رپورٹ',
    navCalculator: 'اسکیم کیلکولیٹر',
    navClusterMap: 'کلسٹر نقشہ',
    navSimulator: 'لون سمیلیٹر',
    dprSanctionRate: '98.4% منظوری شرح',
    activePanchayats: '42,910 پنچایتیں',
    sovereignHeader: 'حکومت ہند | وزارت سماجی انصاف و تفویض اختیارات',
    nationalPortal: 'قومی پورٹل',
    voiceSahayak: 'آواز معاون',
    sovereignAlerts: 'سرکاری اطلاعات',
    unread: 'غیر پڑھے ہوئے',
    apexCorps: 'NBCFDC اور NSFDC قانونی کارپوریشنز'
  },
  kn: {
    portalName: 'ಗ್ರಾಮಮಿತ್ರ ಪೋರ್ಟಲ್',
    portalSubtitle: 'ರಾಷ್ಟ್ರೀಯ ರಿಯಾಯಿತಿ ಸಾಲ ಮತ್ತು ಕಾರ್ಯಸಾಧ್ಯತಾ ಪೋರ್ಟಲ್',
    officialLanguage: 'ಅಧಿಕೃತ ಭಾಷೆ',
    changeLanguage: 'ಭಾಷೆ',
    contrastMode: 'ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್',
    navGateway: 'ಗೇಟ್‌ವೇ',
    navFeasibility: 'ಕಾರ್ಯಸಾಧ್ಯತಾ ವರದಿ',
    navCalculator: 'ಯೋಜನಾ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    navClusterMap: 'ಕ್ಲಸ್ಟರ್ ನಕ್ಷೆ',
    navSimulator: 'ಸಾಲ ಸಿಮ್ಯುಲೇಟರ್',
    dprSanctionRate: '98.4% ಮಂಜೂರಾತಿ ದರ',
    activePanchayats: '42,910 ಪಂಚಾಯಿತಿಗಳು',
    sovereignHeader: 'ಭಾರತ ಸರ್ಕಾರ | ಸಾಮಾಜಿಕ ನ್ಯಾಯ ಮತ್ತು ಸಬಲೀಕರಣ ಸಚಿವಾಲಯ',
    nationalPortal: 'ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್',
    voiceSahayak: 'ಧ್ವನಿ ಸಹಾಯಕ',
    sovereignAlerts: 'ಸರ್ಕಾರಿ ಎಚ್ಚರಿಕೆಗಳು',
    unread: 'ಓದದಿರುವುದು',
    apexCorps: 'NBCFDC ಮತ್ತು NSFDC ಶಾಸನಬದ್ಧ ನಿಗಮಗಳು'
  },
  or: {
    portalName: 'ଗ୍ରାମମିତ୍ର ପୋର୍ଟାଲ',
    portalSubtitle: 'ଜାତୀୟ ରିହାତି ଋଣ ଏବଂ ସମ୍ଭାବ୍ୟତା ପୋର୍ଟାଲ୍',
    officialLanguage: 'ସରକାରୀ ଭାଷା',
    changeLanguage: 'ଭାଷା',
    contrastMode: 'ହାଇ କଣ୍ଟ୍ରାଷ୍ଟ',
    navGateway: 'ଗେଟୱେ',
    navFeasibility: 'ସମ୍ଭାବ୍ୟତା ରିପୋର୍ଟ',
    navCalculator: 'ଯୋଜନା କାଲକୁଲେଟର',
    navClusterMap: 'କ୍ଲଷ୍ଟର ମାନଚିତ୍ର',
    navSimulator: 'ଋଣ ସିମ୍ୟୁଲେଟର',
    dprSanctionRate: '୯୮.୪% ମଞ୍ଜୁରୀ ହାର',
    activePanchayats: '୪୨,୯୧୦ ପଞ୍ଚାୟତ',
    sovereignHeader: 'ଭାରତ ସରକାର | ସାମାଜିକ ନ୍ୟାୟ ଏବଂ ସଶକ୍ତିକରଣ ମନ୍ତ୍ରଣାଳୟ',
    nationalPortal: 'ଜାତୀୟ ପୋର୍ଟାଲ',
    voiceSahayak: 'ଭଏସ ସହାୟକ',
    sovereignAlerts: 'ସରକାରୀ ସତର୍କତା',
    unread: 'ଅପଠିତ',
    apexCorps: 'NBCFDC ଏବଂ NSFDC ସାମ୍ବିଧାନିକ ନିଗମ'
  },
  ml: {
    portalName: 'ഗ്രാമമിത്ര പോർട്ടൽ',
    portalSubtitle: 'ദേശീയ ഇളവ് വായ്പയും സാധ്യതാ പോർട്ടലും',
    officialLanguage: 'ഔദ്യോഗിക ഭാഷ',
    changeLanguage: 'ഭാഷ',
    contrastMode: 'ഹൈ കോൺട്രാസ്റ്റ്',
    navGateway: 'ഗേറ്റ്‌വേ',
    navFeasibility: 'സാധ്യതാ റിപ്പോർട്ട്',
    navCalculator: 'പദ്ധതി കാൽക്കുലേറ്റർ',
    navClusterMap: 'ക്ലസ്റ്റർ മാപ്പ്',
    navSimulator: 'വായ്പാ സിമുലേറ്റർ',
    dprSanctionRate: '98.4% അനുമതി നിരക്ക്',
    activePanchayats: '42,910 പഞ്ചായത്തുകൾ',
    sovereignHeader: 'ഭാരത സർക്കാർ | സാമൂഹ്യനീതി, ശാക്തീകരണ മന്ത്രാലയം',
    nationalPortal: 'ദേശീയ പോർട്ടൽ',
    voiceSahayak: 'വോയ്‌സ് സഹായക്',
    sovereignAlerts: 'സർക്കാർ അലേർട്ടുകൾ',
    unread: 'വായിക്കാത്തത്',
    apexCorps: 'NBCFDC & NSFDC നിയമപരമായ കോർപ്പറേഷനുകൾ'
  },
  pa: {
    portalName: 'ਗ੍ਰਾਮਮਿੱਤਰ ਪੋਰਟਲ',
    portalSubtitle: 'ਰਾਸ਼ਟਰੀ ਰਿਆਇਤੀ ਕਰਜ਼ਾ ਅਤੇ ਵਿਵਹਾਰਕਤਾ ਪੋਰਟਲ',
    officialLanguage: 'ਸਰਕਾਰੀ ਭਾਸ਼ਾ',
    changeLanguage: 'ਭਾਸ਼ਾ',
    contrastMode: 'ਹਾਈ ਕੰਟ੍ਰਾਸਟ',
    navGateway: 'ਗੇਟਵੇ',
    navFeasibility: 'ਸੰਭਾਵਨਾ ਰਿਪੋਰਟ',
    navCalculator: 'ਸਕੀਮ ਕੈਲਕੁਲੇਟਰ',
    navClusterMap: 'ਕਲੱਸਟਰ ਨਕਸ਼ਾ',
    navSimulator: 'ਕਰਜ਼ਾ ਸਿਮੂਲੇਟਰ',
    dprSanctionRate: '98.4% ਪ੍ਰਵਾਨਗੀ ਦਰ',
    activePanchayats: '42,910 ਪੰਚਾਇਤਾਂ',
    sovereignHeader: 'ਭਾਰਤ ਸਰਕਾਰ | ਸਮਾਜਿਕ ਨਿਆਂ ਅਤੇ ਅਧਿਕਾਰਤਾ ਮੰਤਰਾਲਾ',
    nationalPortal: 'ਰਾਸ਼ਟਰੀ ਪੋਰਟਲ',
    voiceSahayak: 'ਆਵਾਜ਼ ਸਹਾਇਕ',
    sovereignAlerts: 'ਸਰਕਾਰੀ ਚੇਤਾਵਨੀਆਂ',
    unread: 'ਅਣਪੜ੍ਹੇ',
    apexCorps: 'NBCFDC ਅਤੇ NSFDC ਕਾਨੂੰਨੀ ਕਾਰਪੋਰੇਸ਼ਨਾਂ'
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
    badge: 'Sovereign Public Conduit',
    heroTitle: 'GramMitra Portal: National Concessional Credit & Feasibility Portal',
    heroDescription: 'Pre-sanction feasibility analysis and direct concessional credit conduit under NBCFDC, NSFDC and Ministry of Social Justice & Empowerment for grassroots rural enterprises.',
    roles: {
      beneficiary: { title: 'Beneficiary Entrepreneur', sub: 'Rural SC/OBC Citizen' },
      vle: { title: 'Village Level Entrepreneur (VLE)', sub: 'CSC / Digital Seva Kendra' },
      sca: { title: 'State Channelising Agency (SCA)', sub: 'Backward Classes Corp' },
      dic: { title: 'District Industries Centre (DIC)', sub: 'Lead District Manager' },
      central: { title: 'Central Ministry (MoSJE)', sub: 'Apex Statutory Oversight' }
    },
    loginTitle: 'Sovereign Citizen Access',
    loginSubtitle: 'Direct DBT-Linked Concessional Credit Gateway',
    authMethods: { aadhaar: 'Aadhaar OTP', digilocker: 'DigiLocker KYC', ration: 'Ration / NFSA' },
    mobileLabel: 'Aadhaar Linked Mobile Number',
    mobilePlaceholder: 'Enter 10-digit mobile number',
    getOtp: 'Get OTP',
    resend: 'Resend',
    otpLabel: 'Enter 6-Digit Verification Code (OTP)',
    expiresIn: 'Expires in 04:32',
    verifyBtn: 'Verify Identity & Enter Portal',
    verified: 'Aadhaar Verified',
    terms: 'By signing in, you agree to statutory concessional credit terms under MoSJE guidelines.',
    marginEngineTitle: 'Instant Margin & Credit Engine',
    marginEngineSubtitle: 'Statutory 1:10 Concessional Leverage for Rural OBC & SC Enterprises',
    promoterEquity: 'Promoter Equity (Your Margin)',
    totalProject: 'Total Project Cost (DPR)',
    loanSanction: 'Concessional Debt Sanction',
    monthlyEmi: 'Estimated Monthly EMI',
    effectiveRate: 'Effective Interest Rate',
    generateDprBtn: 'Generate Detailed Project Report (DPR)',
    pincodeTitle: 'Check Gram Panchayat Saturation',
    pincodeSubtitle: 'Real-time milk surplus, cold chain distance, and local enterprise density',
    pincodePlaceholder: 'Enter 6-digit Pincode (e.g. 226301)',
    checkBtn: 'Check Saturation',
    prioritySectorsTitle: 'Priority Rural Enterprise Sectors',
    prioritySectorsSubtitle: 'Statutorily identified concessional categories under NBCFDC & NSFDC',
    sectors: {
      dairy: { title: 'Dairy Bulk Milk Chiller', desc: '500-1000 Ltr Capacity • 4% Subsidized Rate' },
      solar: { title: 'Solar Agro Micro-Grid', desc: '5-15 kW Grid Tied • 90% Concessional Credit' },
      handloom: { title: 'Automatic Handloom Weaving', desc: 'Semi-Automatic Loom • Women & Artisan Priority' },
      bio: { title: 'Bio-Fertilizer / Vermicompost', desc: 'Organic Agro Unit • Quick Payback Cycle' }
    },
    stats: {
      stat1: { val: '98.4%', title: 'DPR Auto-Sanction Rate', sub: 'Verified by DIC statutory engine' },
      stat2: { val: '72 Hrs', title: 'In-Principle Approval', sub: 'Direct SLA to Lead District Bank' },
      stat3: { val: '4.0%', title: 'Concessional Fixed Interest', sub: 'NBCFDC & NSFDC subsidized rate' },
      stat4: { val: '42,910', title: 'Active Gram Panchayats', sub: 'Mapped across 748 districts' }
    },
    recentTitle: 'Live National Concessional Credit Feed',
    recentSubtitle: 'Real-time tracking of DPR sanctions across Gram Panchayats',
    tableCols: { ref: 'DPR Reference', sector: 'Sector', panchayat: 'Gram Panchayat', amount: 'Sanction Amount', status: 'Status' },
    vleTitle: 'VLE Terminal Quick Actions',
    vleActions: { newDpr: 'New DPR Dossier', verifyBio: 'Verify Citizen Biometrics', downloadSanction: 'Download Sanction Letter', scheduleVisit: 'Schedule Bank Branch Visit' }
  },
  hi: {
    badge: 'सार्वभौम सार्वजनिक माध्यम',
    heroTitle: 'ग्राममित्र पोर्टल: राष्ट्रीय रियायती ऋण एवं व्यवहार्यता पोर्टल',
    heroDescription: 'ग्रामीण उद्यमियों के लिए राष्ट्रीय पिछड़ा वर्ग एवं अनुसूचित जाति निगमों (NBCFDC/NSFDC) तथा सामाजिक न्याय मंत्रालय के तहत पूर्व-स्वीकृति व्यवहार्यता विश्लेषण और रियायती ऋण माध्यम।',
    roles: {
      beneficiary: { title: 'लाभार्थी उद्यमी', sub: 'ग्रामीण अनु. जाति / पिछड़ा वर्ग नागरिक' },
      vle: { title: 'ग्राम स्तरीय उद्यमी (VLE)', sub: 'सीएससी / डिजिटल सेवा केंद्र' },
      sca: { title: 'राज्य चैनलाइजिंग एजेंसी (SCA)', sub: 'राज्य पिछड़ा वर्ग निगम' },
      dic: { title: 'जिला उद्योग केंद्र (DIC)', sub: 'अग्रणी जिला प्रबंधक' },
      central: { title: 'केंद्रीय मंत्रालय (MoSJE)', sub: 'शीर्ष सांविधिक निगरानी' }
    },
    loginTitle: 'सार्वभौम नागरिक प्रवेश',
    loginSubtitle: 'प्रत्यक्ष डीबीटी-संबद्ध रियायती ऋण गेटवे',
    authMethods: { aadhaar: 'आधार ओटीपी', digilocker: 'डिजीलॉकर केवाईसी', ration: 'राशन कार्ड / एनएफएसए' },
    mobileLabel: 'आधार से जुड़ा मोबाइल नंबर',
    mobilePlaceholder: '10-अंकीय मोबाइल नंबर दर्ज करें',
    getOtp: 'ओटीपी प्राप्त करें',
    resend: 'पुनः भेजें',
    otpLabel: '6-अंकीय सत्यापन कोड (ओटीपी) दर्ज करें',
    expiresIn: 'समाप्ति: 04:32 में',
    verifyBtn: 'पहचान सत्यापित करें और पोर्टल में प्रवेश करें',
    verified: 'आधार सत्यापित',
    terms: 'साइन इन करके आप सामाजिक न्याय एवं अधिकारिता मंत्रालय के सांविधिक नियमों से सहमति व्यक्त करते हैं।',
    marginEngineTitle: 'त्वरित मार्जिन एवं ऋण कैलकुलेटर',
    marginEngineSubtitle: 'ग्रामीण पिछड़ा वर्ग एवं अनुसूचित जाति उद्यमियों हेतु सांविधिक 1:10 रियायती लिवरेज',
    promoterEquity: 'उद्यमी का अंशदान (स्वयं का मार्जिन)',
    totalProject: 'कुल परियोजना लागत (डीपीआर)',
    loanSanction: 'रियायती ऋण स्वीकृति',
    monthlyEmi: 'अनुमानित मासिक किस्त (ईएमआई)',
    effectiveRate: 'प्रभावी रियायती ब्याज दर',
    generateDprBtn: 'विस्तृत परियोजना रिपोर्ट (DPR) तैयार करें',
    pincodeTitle: 'ग्राम पंचायत व्यवहार्यता व संतृप्ति जांचें',
    pincodeSubtitle: 'वास्तविक दुग्ध उत्पादन, कोल्ड चेन दूरी और स्थानीय उद्यम घनत्व',
    pincodePlaceholder: '6-अंकीय पिनकोड दर्ज करें (उदा. 226301)',
    checkBtn: 'संतृप्ति जांचें',
    prioritySectorsTitle: 'प्राथमिकता वाले ग्रामीण उद्यम क्षेत्र',
    prioritySectorsSubtitle: 'एनबीसीएफडीसी एवं एनएसएफडीसी द्वारा सांविधिक रूप से चिह्नित रियायती श्रेणियां',
    sectors: {
      dairy: { title: 'डेयरी बल्क मिल्क चिलर', desc: '500-1000 लीटर क्षमता • 4% अनुदानित ब्याज' },
      solar: { title: 'सौर कृषि माइक्रो-ग्रिड', desc: '5-15 किलोवाट ग्रिड टाई • 90% रियायती ऋण' },
      handloom: { title: 'स्वचालित हथकरघा बुनाई', desc: 'सेमी-ऑटोमैटिक लूम • महिला एवं बुनकर प्राथमिकता' },
      bio: { title: 'जैव-उर्वरक / वर्मीकम्पोस्ट', desc: 'जैविक कृषि इकाई • तीव्र अदायगी चक्र' }
    },
    stats: {
      stat1: { val: '98.4%', title: 'डीपीआर स्वीकृति दर', sub: 'डीआईसी सांविधिक इंजन द्वारा सत्यापित' },
      stat2: { val: '72 घंटे', title: 'सैद्धांतिक स्वीकृति', sub: 'अग्रणी जिला बैंक को सीधा प्रेषण' },
      stat3: { val: '4.0%', title: 'रियायती निश्चित ब्याज', sub: 'NBCFDC एवं NSFDC अनुदानित दर' },
      stat4: { val: '42,910', title: 'सक्रिय ग्राम पंचायतें', sub: 'देशभर के 748 जिलों में मैप्ड' }
    },
    recentTitle: 'हाल ही में स्वीकृत रियायती ऋण आवेदन',
    recentSubtitle: 'ग्राम पंचायतों में डीपीआर स्वीकृतियों की लाइव ट्रैकिंग',
    tableCols: { ref: 'डीपीआर संदर्भ', sector: 'उद्यम क्षेत्र', panchayat: 'ग्राम पंचायत', amount: 'स्वीकृत राशि', status: 'स्थिति' },
    vleTitle: 'वीएलई डेस्क त्वरित कार्य',
    vleActions: { newDpr: 'नया डीपीआर तैयार करें', verifyBio: 'नागरिक बायोमेट्रिक्स सत्यापन', downloadSanction: 'स्वीकृति पत्र डाउनलोड करें', scheduleVisit: 'बैंक शाखा मुलाकात तय करें' }
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
    title: 'Hyper-Local Feasibility Dossier',
    subtitle: 'Mini Solar Dairy Chilling Unit (500 Litres/Day) • Grounded in PM GatiShakti & Bhuvan GIS Data',
    audioBriefingTitle: 'Play Bhashini Audio Explainer',
    audioBriefingSubtitle: 'Listen to AI-synthesized feasibility brief',
    catchmentCalibration: 'Catchment Radius Calibration',
    activeShgs: 'Active SHG Supplier Linkages',
    dailyMilk: 'Daily Aggregate Volume Surplus',
    mapTitle: 'Geospatial Panchayat Buffer & Supply Network',
    mapSubtitle: 'Interactive milk shed radius mapped against dairy clusters and competing chilling infrastructure.',
    arbitrageTitle: 'Village-Level Margin Arbitrage',
    middlemanVsChilled: 'Middleman Rate vs Direct Chilled Offtake',
    unorganizedRate: 'Middleman Unorganized Farmgate',
    chilledRate: 'Organized Chilled Offtake Rate',
    dailyWealthRetained: 'Daily Wealth Retained in Gram Panchayat',
    breakdownTitle: 'Cost Breakdown & Net Profit Margin',
    netProfit: 'Net Margin',
    rawMilk: 'Raw Milk Procurement',
    solarChilling: 'Solar Power & OPEX',
    logistics: 'Logistics & Reagents',
    totalUnitCost: 'Total Cost per Litre',
    wholesalePrice: 'Offtake Wholesale Realization',
    monthlyNetSurplus: 'Projected Monthly Net Surplus',
    swotTitle: 'Statutory SWOT & Field Validation Matrix',
    swot: {
      strengths: 'Strengths',
      weaknesses: 'Weaknesses',
      opportunities: 'Opportunities',
      threats: 'Threats'
    },
    riskTitle: 'Risk Mitigation Protocols',
    exportDpr: 'Download Bankable DPR (PDF)',
    proceedToCalc: 'Proceed to Scheme Calculator',

    dossierTitle: 'Hyper-Local Feasibility Dossier',
    dossierSubtitle: 'Mini Solar Dairy Chilling Unit (500 Litres/Day) • Grounded in PM GatiShakti & Bhuvan GIS Data',
    viabilityRating: 'Viability Rating',
    aaaSovereign: 'AAA Sovereign',
    verifiedBy: 'Verified by DIC & SLBC',
    audioGuide: 'Play Bhashini Audio Explainer',
    audioPlaying: 'Playing Bhashini Audio Explainer...',
    downloadDpr: 'Download Bankable DPR (PDF)',
    forwardBank: 'Forward to District Lead Bank',
    keyMetrics: 'Key Investment & Viability Metrics',
    totalOutlay: 'Total Capital Outlay',
    promoterMargin: 'Promoter Equity (10%)',
    netLoan: 'Concessional Debt (90%)',
    annualProfit: 'Projected Net Annual Profit',
    moratorium: 'Moratorium Grace Period',
    technicalIndicators: 'Technical Feasibility Indicators',
    gridReliability: 'Grid Power Reliability',
    rawMilkSurplus: 'Raw Milk Daily Surplus',
    coldChainDistance: 'Distance to Nearest Cold Chain',
    waterTable: 'Groundwater Table Depth',
    fiveYearTable: '5-Year Statutory Financial Projections',
    tableHeaders: {
      year: 'Year',
      revenue: 'Gross Revenue',
      opex: 'Operating Expenses',
      debtService: 'Debt Servicing (EMI)',
      netSurplus: 'Net Surplus',
      dscr: 'DSCR Coverage'
    },
    panchayatIndicators: 'Gram Panchayat Viability Indicators',
    milchCensus: 'Milch Cattle Census',
    cattleBreeds: 'Dominant Cattle Breeds',
    chillerProximity: 'Competing Chiller Distance',
    catchmentRadiusLabel: 'Catchment Radius'
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

    dossierTitle: 'हाइपर-लोकल व्यवहार्यता रिपोर्ट (DPR)',
    dossierSubtitle: 'मिनी सोलर डेयरी चिलिंग यूनिट (500 लीटर/दिन) • पीएम गतिशक्ति एवं भुवन जीआईएस डेटा समर्थित',
    viabilityRating: 'व्यवहार्यता रेटिंग',
    aaaSovereign: 'एएए सार्वभौम',
    verifiedBy: 'डीआईसी एवं एसएलबीसी द्वारा सत्यापित',
    audioGuide: 'भाषिणी ऑडियो सारांश सुनें',
    audioPlaying: 'भाषिणी ऑडियो सारांश चल रहा है...',
    downloadDpr: 'बैंक योग्य डीपीआर (PDF) डाउनलोड करें',
    forwardBank: 'अग्रणी जिला बैंक को अग्रेषित करें',
    keyMetrics: 'मुख्य निवेश एवं व्यवहार्यता संकेतक',
    totalOutlay: 'कुल पूंजीगत लागत',
    promoterMargin: 'उद्यमी का अंशदान (10%)',
    netLoan: 'रियायती ऋण (90%)',
    annualProfit: 'वार्षिक अनुमानित शुद्ध लाभ',
    moratorium: 'ऋण अदायगी छूट (मोराटोरियम)',
    technicalIndicators: 'तकनीकी व्यवहार्यता संकेतक',
    gridReliability: 'विद्युत आपूर्ति विश्वसनीयता',
    rawMilkSurplus: 'दैनिक अधिशेष दुग्ध उपलब्धता',
    coldChainDistance: 'निकटतम कोल्ड चेन की दूरी',
    waterTable: 'भूजल स्तर गहराई',
    fiveYearTable: '5-वर्षीय सांविधिक वित्तीय प्रक्षेपण',
    tableHeaders: {
      year: 'वर्ष',
      revenue: 'सकल आय',
      opex: 'परिचालन व्यय',
      debtService: 'ऋण अदायगी (ईएमआई)',
      netSurplus: 'शुद्ध बचत / लाभ',
      dscr: 'डीएससीआर कवरेज'
    },
    panchayatIndicators: 'ग्राम पंचायत व्यवहार्यता संकेतक',
    milchCensus: 'दुधारू पशु गणना',
    cattleBreeds: 'प्रमुख पशु नस्लें',
    chillerProximity: 'प्रतिस्पर्धी चिलर दूरी',
    catchmentRadiusLabel: 'संग्रहण दायरा (किमी)'
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
    title: 'Statutory Concessional Credit & Subsidy Calculator',
    subtitle: 'Compute statutory loan entitlement, margin ratio, and EMI under NBCFDC and NSFDC apex schemes',
    promoterEquityInput: 'Enter Promoter Equity (Your Investment)',
    quickPicks: 'Quick Presets',
    totalOutlayCard: 'Total DPR Project Cost',
    concessionalLoanCard: 'Concessional Loan Sanction',
    quarterlyEmiCard: 'Quarterly Repayment EMI',
    interestSavedCard: 'Subvention Interest Saved',
    capitalExpenditure: 'CapEx Allocation Breakdown',
    machinery: 'Machinery & Equipment',
    civil: 'Civil Works & Shed',
    workingCapital: 'Working Capital Reserve',
    repaymentSchedule: 'View Repayment Schedule',
    submitDpr: 'Generate & Submit DPR',
    voiceCalculate: 'Listen to Voice Calculation',
    schemeTitle: 'Applicable Apex Scheme',
    tenureMonths: 'Tenure',
    gracePeriod: 'Moratorium Window'
  },
  hi: {
    title: 'सांविधिक रियायती ऋण एवं सब्सिडी कैलकुलेटर',
    subtitle: 'एनबीसीएफडीसी एवं एनएसएफडीसी शीर्ष योजनाओं के तहत ऋण पात्रता, मार्जिन और ईएमआई की त्वरित गणना',
    promoterEquityInput: 'उद्यमी का अंशदान दर्ज करें (स्वयं का निवेश)',
    quickPicks: 'त्वरित विकल्प',
    totalOutlayCard: 'कुल डीपीआर परियोजना लागत',
    concessionalLoanCard: 'रियायती ऋण स्वीकृति',
    quarterlyEmiCard: 'त्रैमासिक अदायगी किस्त (EMI)',
    interestSavedCard: 'अनुदान द्वारा ब्याज बचत',
    capitalExpenditure: 'पूंजीगत व्यय का विभाजन',
    machinery: 'मशीनरी एवं उपकरण (68%)',
    civil: 'शेड एवं सिविल निर्माण (14%)',
    workingCapital: 'कार्यशील पूंजी आरक्षित (18%)',
    repaymentSchedule: 'अदायगी अनुसूची देखें',
    submitDpr: 'डीपीआर बनाएं और जमा करें',
    voiceCalculate: 'आवाज में गणना सुनें',
    schemeTitle: 'लागू शीर्ष सांविधिक योजना',
    tenureMonths: 'अवधि',
    gracePeriod: 'मोराटोरियम छूट'
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
    title: 'Gram Panchayat Enterprise Cluster Intelligence',
    subtitle: 'Geo-spatial saturation intelligence & supply chain linkage tracker backed by PM GatiShakti',
    filterBuffer: 'Filter Catchment Radius',
    allClusters: 'All Clusters',
    audioGuide: 'Play Cluster Intelligence Audio',
    exportDossier: 'Download GIS Cluster Dossier',
    panchayatDetails: 'Panchayat Cluster Profile',
    saturationIndex: 'Saturation Index',
    recommended: 'Recommended Opportunities',
    avoid: 'High Saturation (Avoid)',
    milchCattle: 'Milch Animal Population',
    activeClusters: 'Active Enterprise Clusters in Radius'
  },
  hi: {
    title: 'ग्राम पंचायत उद्यम क्लस्टर मानचित्र',
    subtitle: 'पीएम गतिशक्ति समर्थित भू-स्थानिक संतृप्ति एवं आपूर्ति श्रृंखला विश्लेषण',
    filterBuffer: 'दायरा फ़िल्टर करें',
    allClusters: 'सभी क्लस्टर',
    audioGuide: 'क्लस्टर ऑडियो गाइड सुनें',
    exportDossier: 'जीआईएस क्लस्टर रिपोर्ट डाउनलोड करें',
    panchayatDetails: 'ग्राम पंचायत क्लस्टर विवरण',
    saturationIndex: 'संतृप्ति सूचकांक',
    recommended: 'अनुशंसित उद्यम अवसर',
    avoid: 'अति-संतृप्त (बचें)',
    milchCattle: 'दुधारू पशु संख्या',
    activeClusters: 'दायरे में सक्रिय उद्यम क्लस्टर'
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
    title: 'Repayment & Moratorium Simulator',
    subtitle: 'Dynamic cashflow stress-test engine with seasonal moratorium adjustments',
    moratoriumSlider: 'Select Moratorium Grace Period',
    stressSlider: 'Agricultural Yield Shock (Stress Test)',
    liveDscr: 'Live Debt Service Coverage (DSCR)',
    quarterlySurplus: 'Quarterly Cashflow Surplus',
    concessionalInterest: 'Concessional Subsidized Interest',
    routeToBank: 'Route Directly to Lead District Bank',
    equipmentCatalog: 'Approved Equipment Procurement Catalog',
    amortizationTable: 'Amortization & Grace Period Schedule',
    quarter: 'Quarter',
    principalPaid: 'Principal Paid',
    interestPaid: 'Interest Paid',
    remainingBalance: 'Outstanding Balance',
    status: 'Status'
  },
  hi: {
    title: 'ऋण अदायगी एवं मोराटोरियम सिमुलेटर',
    subtitle: 'मौसमी बदलाव और मोराटोरियम के साथ गतिशील नकदी प्रवाह सिमुलेटर',
    moratoriumSlider: 'मोराटोरियम छूट अवधि चुनें',
    stressSlider: 'कृषि उत्पादन झटका (तनाव परीक्षण)',
    liveDscr: 'ऋण सेवा कवरेज अनुपात (DSCR)',
    quarterlySurplus: 'त्रैमासिक नकदी अधिशेष',
    concessionalInterest: 'रियायती अनुदानित ब्याज',
    routeToBank: 'अग्रणी जिला बैंक को सीधे प्रेषित करें',
    equipmentCatalog: 'अनुमोदित उपकरण खरीद सूची',
    amortizationTable: 'अदायगी एवं मोराटोरियम अनुसूची',
    quarter: 'तिमाही',
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
    purpose: 'Unified sovereign public credit conduit and agritech moratorium modeler for grassroots rural enterprises across India, backed by NBCFDC, NSFDC, and MoSJE.',
    encrypted: '256-Bit Encrypted Sovereign Infrastructure',
    coreModules: 'Core Modules',
    apexCorps: 'Apex Statutory Corporations',
    techInfra: 'Digital & Spatial Infrastructure',
    citizenSupport: 'Citizen Support & RTI',
    onlineSupport: 'Online Citizen Support',
    onlineSupportDesc: 'Direct grievance registration and RTI tracking via official Government portals.',
    copyright: '© 2026 Ministry of Social Justice & Empowerment, Government of India. Designed & Developed for Gram Panchayat Entrepreneurs.'
  },
  hi: {
    purpose: 'एनबीसीएफडीसी, एनएसएफडीसी और सामाजिक न्याय एवं अधिकारिता मंत्रालय द्वारा समर्थित ग्रामीण उद्यमियों हेतु एकीकृत रियायती ऋण मंच।',
    encrypted: '256-बिट एन्क्रिप्टेड सुरक्षित बुनियादी ढांचा',
    coreModules: 'प्रमुख मॉड्यूल',
    apexCorps: 'शीर्ष सांविधिक निगम',
    techInfra: 'डिजिटल एवं स्थानिक अवसंरचना',
    citizenSupport: 'नागरिक सहायता एवं आरटीआई',
    onlineSupport: 'ऑनलाइन नागरिक सहायता',
    onlineSupportDesc: 'आधिकारिक सरकारी पोर्टलों के माध्यम से प्रत्यक्ष शिकायत पंजीकरण एवं आरटीआई ट्रैकिंग।',
    copyright: '© 2026 सामाजिक न्याय एवं अधिकारिता मंत्रालय, भारत सरकार। ग्राम पंचायत उद्यमियों के लिए निर्मित।'
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
    title: 'Voice Sahayak (Audio Assistant)',
    subtitle: 'Bhashini Multi-Lingual Speech Interface',
    askPrompt: 'Ask in English or choose a common prompt below:',
    tapNotice: 'Tap any prompt to listen to the audio response and navigate directly to the relevant screen.',
    queries: [
      { text: 'How much loan can I get on ₹1 Lakh promoter margin?', target: 'calculator' },
      { text: 'What is the feasibility of a chilling unit in Rampur Kalan?', target: 'feasibility' },
      { text: 'Which enterprises are saturated in the Gram Cluster?', target: 'cluster-map' },
      { text: 'What will be the first installment after a 6-month moratorium?', target: 'loan-simulator' }
    ]
  },
  hi: {
    title: 'Voice Sahayak (आवाज सहायक)',
    subtitle: 'भाषिणी बहुभाषी आवाज प्रणाली',
    askPrompt: 'हिंदी अथवा अपनी क्षेत्रीय बोली में पूछें या नीचे दिया गया प्रश्न चुनें:',
    tapNotice: 'ऑडियो उत्तर सुनने और सीधे संबंधित स्क्रीन पर जाने के लिए किसी भी प्रश्न पर टैप करें।',
    queries: [
      { text: 'मुझे ₹1 लाख मार्जिन पर कितना लोन मिल सकता है?', target: 'calculator' },
      { text: 'रामपुर कलां में चिलिंग यूनिट की संभावना क्या है?', target: 'feasibility' },
      { text: 'ग्राम क्लस्टर में कौन से व्यवसाय अधिक संतृप्त हैं?', target: 'cluster-map' },
      { text: '6 महीने के मोराटोरियम के बाद पहली किस्त कितनी होगी?', target: 'loan-simulator' }
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
    title: 'Beneficiary & Citizen Portal Sign In',
    subtitle: 'Ministry of Social Justice & Empowerment • Sovereign Credit Gateway',
    tempCredentialsNotice: 'Temporary Deployment Access Credentials',
    tempCredentialsDesc: 'Since this application is deployed remotely, please use the pre-configured temporary credentials below. Any other email will be rejected by security verification.',
    authorizedEmailLabel: 'Authorized Temporary Email',
    authorizedPasswordLabel: 'Authorized Temporary Password',
    autofillButton: 'Click to Auto-Fill Temporary Credentials',
    copiedTooltip: 'Copied to clipboard!',
    emailInputLabel: 'Registered Email Address',
    passwordInputLabel: 'Secure Password / Access Key',
    rememberMe: 'Keep me authenticated on this device',
    signInButton: 'Sign In & Access GramMitra Portal',
    verifyingButton: 'Verifying Sovereign Credentials...',
    invalidEmailError: 'Login credentials are not available for this email address. Access is restricted exclusively to authorized temporary credentials.',
    invalidPasswordError: 'Incorrect password. Please use the authorized temporary password provided above.',
    emptyFieldsError: 'Please provide both email address and password to continue.',
    roleBeneficiary: 'Rural Entrepreneur / Beneficiary',
    roleVle: 'CSC Village Level Entrepreneur (VLE)',
    secureAuthNote: 'NIC-Certified 256-Bit SHA-2 Encrypted Authentication Gateway',
    citizenSupportLink: 'Toll-Free National Helpline: 1800-11-2001'
  },
  hi: {
    title: 'लाभार्थी एवं नागरिक पोर्टल लॉगिन',
    subtitle: 'सामाजिक न्याय एवं अधिकारिता मंत्रालय • राष्ट्रीय रियायती ऋण द्वार',
    tempCredentialsNotice: 'अस्थायी अधिकृत प्रवेश क्रेडेंशियल',
    tempCredentialsDesc: 'क्योंकि यह एप्लिकेशन हमारे क्लाउड सर्वर पर तैनात है, कृपया नीचे दिए गए पूर्व-कॉन्फ़िगर अस्थायी क्रेडेंशियल का उपयोग करें। किसी अन्य ईमेल को सुरक्षा सत्यापन द्वारा अस्वीकार कर दिया जाएगा।',
    authorizedEmailLabel: 'अधिकृत अस्थायी ईमेल',
    authorizedPasswordLabel: 'अधिकृत अस्थायी पासवर्ड',
    autofillButton: 'अस्थायी क्रेडेंशियल ऑटो-फिल करने के लिए यहाँ क्लिक करें',
    copiedTooltip: 'क्लिपबोर्ड पर कॉपी किया गया!',
    emailInputLabel: 'पंजीकृत ईमेल पता',
    passwordInputLabel: 'सुरक्षित पासवर्ड / एक्सेस कुंजी',
    rememberMe: 'इस डिवाइस पर मुझे लॉगिन रखें',
    signInButton: 'लॉगिन करें एवं ग्राममित्र पोर्टल खोलें',
    verifyingButton: 'क्रेडेंशियल का सत्यापन किया जा रहा है...',
    invalidEmailError: 'इस ईमेल पते के लिए लॉगिन क्रेडेंशियल उपलब्ध नहीं हैं। प्रवेश केवल अधिकृत अस्थायी क्रेडेंशियल के लिए प्रतिबंधित है।',
    invalidPasswordError: 'गलत पासवर्ड। कृपया ऊपर दिए गए अधिकृत अस्थायी पासवर्ड का उपयोग करें।',
    emptyFieldsError: 'कृपया आगे बढ़ने के लिए ईमेल पता और पासवर्ड दोनों दर्ज करें।',
    roleBeneficiary: 'ग्रामीण उद्यमी / लाभार्थी',
    roleVle: 'सीएससी ग्राम स्तरीय उद्यमी (VLE)',
    secureAuthNote: 'एनआईसी-प्रमाणित 256-बिट एसएचए-2 एन्क्रिप्टेड प्रमाणीकरण प्रणाली',
    citizenSupportLink: 'टोल-फ्री राष्ट्रीय हेल्पलाइन: 1800-11-2001'
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
    title: 'Merchant Enterprise Digital Ledger & Business Manager',
    subtitle: 'Unified Store Accounts, Customer Credit & Debit, Supplier Payables, Cash Drawer & Instant Invoicing',
    defaultShopName: 'My Retail & Provision Store',
    defaultOwner: 'Store Proprietor / Owner',
    shopLocation: 'Main Commercial Market, Central District',
    tabs: {
      customers: 'Customer Accounts (Credit & Debit)',
      suppliers: 'Supplier Accounts (Wholesalers)',
      galla: 'Daily Cash Register (Cash Drawer)',
      billing: 'Express Invoicing & Bill Receipts',
      inventory: 'Product Catalog & Inventory',
      analytics: 'Business Performance & Profit'
    },
    metrics: {
      toCollect: 'Total Customer Credit (Receivable)',
      toPay: 'Total Supplier Dues (Payable)',
      todaySales: "Today's Gross Sales",
      cashInGalla: 'Cash Balance in Drawer'
    },
    customers: {
      searchPlaceholder: 'Search customer by name, mobile, or address...',
      addNewCustomer: '+ Add New Customer Account',
      filterAll: 'All Accounts',
      filterUdhar: 'Credit Outstanding (Receivable)',
      filterJama: 'Advance Deposited',
      youGave: 'You Gave (Debit ₹)',
      youGot: 'You Received (Credit ₹)',
      netUdhar: 'Pending Balance from Customer',
      netAdvance: 'Advance Balance in Account',
      allSettled: 'All Dues Settled',
      sendReminder: 'Send WhatsApp Reminder',
      downloadStatement: 'Export Account Statement (PDF)',
      recordEntry: 'Record Ledger Entry',
      giveCreditBtn: '- Customer Credit (Debit)',
      receivePaymentBtn: '+ Payment Received (Credit)',
      billNoOrNote: 'Invoice / Bill Number or Item Details',
      amountLabel: 'Transaction Amount (₹)',
      dateLabel: 'Transaction Date',
      transactionHistory: 'Customer Account Ledger History',
      noCustomersFound: 'No customer accounts matching query',
      whatsappReminderSent: 'Payment reminder dispatched via WhatsApp'
    },
    suppliers: {
      searchPlaceholder: 'Search supplier or vendor by name...',
      addNewSupplier: '+ Add New Supplier',
      totalPayable: 'Total Outstanding Payable',
      recordPurchase: '+ Stock Purchase on Credit',
      recordPayment: '- Payment to Supplier'
    },
    galla: {
      title: 'Daily Cash Register & Drawer Reconciliation',
      subtitle: 'Track physical drawer cash against digital UPI collections and store expenses',
      openingBalance: 'Morning Opening Cash in Drawer',
      cashSales: 'Cash Sales Collected',
      upiCollection: 'QR / UPI Online Collections',
      cashExpenses: 'Cash Expenses & Store Outflows',
      closingCash: 'Expected Closing Cash in Drawer',
      notesCounter: 'Physical Currency Notes Tally',
      recordExpense: '+ Record Store Expense'
    },
    billing: {
      title: 'Express Digital Invoicing & WhatsApp Receipts',
      subtitle: 'Create fast retail receipts, itemized bills, export official PDF, or print thermal slips',
      selectCustomer: 'Select Customer Account',
      cashCustomer: 'Walk-in Cash Customer (No Account)',
      addItem: '+ Add Custom Item',
      itemName: 'Item Description',
      qty: 'Quantity',
      unitPrice: 'Unit Price (₹)',
      total: 'Line Total (₹)',
      paymentMode: 'Payment Settlement Mode',
      cash: 'Immediate Cash',
      upi: 'UPI / QR Payment',
      creditKhata: 'Add to Customer Credit Account',
      generateSlip: 'Create & Save Invoice',
      printParchi: 'Print Thermal Slip',
      downloadPdf: 'Download PDF Receipt',
      shareWhatsapp: 'Send Invoice on WhatsApp',
      itemsCatalog: 'Select Items from Product Catalog'
    },
    inventory: {
      title: 'Product Catalog & Stock Management',
      subtitle: 'Track store provisions, products, prices, and receive low-stock restocking alerts',
      addItem: '+ Add Product to Catalog',
      itemName: 'Product Name',
      category: 'Category',
      buyRate: 'Cost Rate (₹)',
      sellRate: 'Retail Selling Price (₹)',
      currentStock: 'Current Stock',
      lowStockWarn: 'Low Stock Alert (< 10 Units)'
    },
    analytics: {
      title: 'Business Performance & Profit Summary',
      subtitle: 'Instant visibility on gross profits, debtor turnaround, and working capital cycles',
      grossRevenue: 'Estimated Monthly Turnover',
      grossMargin: 'Gross Profit Margin',
      topDebtors: 'Top Credit Accounts',
      monthlyTrend: 'Weekly Cashflow Trend'
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
