import React, { useState, useEffect } from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { LANGUAGES, UI_STRINGS } from '../data/translations';

interface LandingPageProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onOpenDpdpModal?: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  currentLanguage,
  onSelectLanguage,
  onOpenDpdpModal,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const strings = UI_STRINGS[currentLanguage] || UI_STRINGS.en;
  const isHindi = currentLanguage === 'hi';

  const heroSlides = [
    {
      badge: isHindi ? '📍 लाइव GPS व पिनकोड मैपिंग' : '📍 Real-Time GPS & Pincode Mapping',
      title: isHindi ? 'अपने गांव में सबसे अधिक चलने वाले बिजनेस की पहचान करें' : 'Discover High-Demand Businesses in Your Village',
      description: isHindi
        ? 'सैटेलाइट मैप और 6-अंकों के पिनकोड के आधार पर जानें कि आपके क्षेत्र (डेयरी, सोलर कियोस्क, आटा चक्की, किराना) में किस उद्यम की सबसे ज्यादा मांग और शून्य प्रतिस्पर्धा है।'
        : 'Using live satellite maps and 6-digit PIN codes, find out which rural business ventures (Dairy, Solar Kiosk, Flour Mill, Kirana) have maximum local demand and zero competition within a 10km radius.',
      stats: '98.4% Demand Accuracy',
      icon: 'explore',
      color: 'from-emerald-950 via-emerald-900 to-stone-900',
    },
    {
      badge: isHindi ? '💰 35% सरकारी सब्सिडी और टॉप बैंक लोन' : '💰 35% Govt Subsidies & Top Bank Loans',
      title: isHindi ? 'PMEGP 35% अनुदान और HDFC / SBI मुद्रा लोन' : 'Instant PMEGP Grants & HDFC / SBI Mudra Loans',
      description: isHindi
        ? 'PMEGP, PMFME और NABARD के तहत 35% तक की पूंजी सब्सिडी कैलकुलेट करें। HDFC, ICICI और SBI के साथ शून्य गारंटी (Collateral-Free) लोन तुलना करें।'
        : 'Calculate capital subsidies up to 35% under PMEGP, PMFME, and NABARD. Compare live interest rates starting at 8.65% with zero collateral requirements up to ₹10 Lakh.',
      stats: 'Up to ₹10 Lakh Collateral-Free',
      icon: 'account_balance',
      color: 'from-stone-950 via-emerald-950 to-emerald-900',
    },
    {
      badge: isHindi ? '📒 डिजिटल दुकान बही-खाता व नकद गल्ला' : '📒 Digital Shop Bahi-Khata & Cashbook',
      title: isHindi ? 'ग्राहकों का उधारी हिसाब, भुगतान और WhatsApp रिमाइंडर' : 'Manage Customer Udhar, Payments & WhatsApp Reminders',
      description: isHindi
        ? 'दैनिक ग्राहक उधारी, नकद बिक्री और सप्लायर भुगतान को एक सुरक्षित डिजिटल बही-खाते में रखें। एक क्लिक में WhatsApp पर तकादा और रसीद भेजें।'
        : 'Keep track of daily customer credit, cash collections, and supplier payments in one secure place. Send instant payment reminders via WhatsApp with automated digital ledgers.',
      stats: '₹120Cr+ Transactions Managed',
      icon: 'menu_book',
      color: 'from-emerald-900 via-stone-900 to-emerald-950',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[activeSlide];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Top Header with Language Switcher & Quick Sign In */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 px-6 sm:px-12 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-2xl">storefront</span>
          </div>
          <div>
            <div className="font-extrabold text-stone-900 text-base tracking-tight">GramMitra Portal</div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              {isHindi ? 'ग्राम पंचायत नागरिक व स्वरोजगार सेवा' : 'Village Citizen & Business Suite'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-800">
            <span className="material-symbols-outlined text-emerald-700 text-base">translate</span>
            <select
              value={currentLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent font-bold text-xs text-stone-900 focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-white text-stone-900">
                  {l.nativeName} ({l.englishName})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs transition-colors cursor-pointer border border-stone-300"
          >
            {isHindi ? 'लॉगिन करें (Sign In)' : 'Sign In'}
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
          >
            {isHindi ? 'नया खाता बनाएं / शुरू करें' : 'Get Started'}
          </button>
        </div>
      </header>

      {/* Hero Animated Slideshow Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-16">
        <div className={`rounded-3xl p-8 sm:p-14 text-white shadow-2xl border border-white/10 relative overflow-hidden transition-all duration-700 bg-linear-to-r ${slide.color}`}>
          {/* Animated Background Layers */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-300 shadow-sm animate-fade-in">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{slide.badge}</span>
            </div>

            <div className="space-y-3 min-h-[160px]">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight transition-all duration-500">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl transition-all duration-500">
                {slide.description}
              </p>
            </div>

            {/* Slide Indicators & Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/15">
              <div className="flex items-center gap-3">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx ? 'w-12 bg-amber-400 shadow-md' : 'w-2.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
                <span className="text-xs text-emerald-300 font-mono ml-3 font-bold px-2.5 py-1 rounded-md bg-white/10">
                  {slide.stats}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all cursor-pointer hover:scale-105"
                >
                  <span>{isHindi ? 'पोर्टल में प्रवेश करें (Sign In)' : 'Enter Portal & Sign In'}</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Policies & Data Security Disclosures (DPDP Act & Sovereign Trust) */}
        <div className="bg-emerald-950 text-emerald-50 rounded-3xl p-8 sm:p-10 border border-emerald-900 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">gpp_good</span>
            </div>
            <div>
              <h2 className="font-headline-sm font-extrabold text-white text-lg">
                {isHindi ? 'सरकारी नीतियां, डेटा सुरक्षा व DPDP Act अनुपालन' : 'Government Policies, Data Security & DPDP Act Compliance'}
              </h2>
              <p className="text-xs text-emerald-300">
                {isHindi ? 'आपका हर डेटा और व्यक्तिगत जानकारी पूरी तरह सुरक्षित और एनक्रिप्टेड है।' : 'Your personal data and business records are fully encrypted and protected.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <span className="material-symbols-outlined text-base">verified_user</span>
                <span>{isHindi ? 'DPDP Act 2023 सहमति' : 'DPDP Act Consent'}</span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {isHindi
                  ? 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम के तहत हर नागरिक की पूर्व सहमति और पूर्ण गोपनीयता सुनिश्चित की जाती है।'
                  : 'Ensures strict user consent, purpose limitation, and data privacy rights as mandated by the Digital Personal Data Protection Act.'}
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <span className="material-symbols-outlined text-base">lock</span>
                <span>{isHindi ? 'सुरक्षित 256-Bit एन्क्रिप्शन' : '256-Bit SSL Encryption'}</span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {isHindi
                  ? 'दुकान का बही-खाता और व्यक्तिगत लेन-देन बैंक-ग्रेड एन्क्रिप्शन के साथ केवल आपके डिवाइस पर सुरक्षित रहता है।'
                  : 'All shop ledger accounts, customer credits, and login credentials are protected using advanced transport-layer encryption.'}
              </p>
            </div>

            <div className="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <span className="material-symbols-outlined text-base">policy</span>
                <span>{isHindi ? 'पारदर्शी सरकारी सब्सिडी' : 'Transparent Government Schemes'}</span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {isHindi
                  ? 'PMEGP, मुद्रा लोन और पंचायत योजनाओं के नियम और ब्याज दरें पूरी तरह पारदर्शी और RBI स्वीकृत बैंकों के अनुसार हैं।'
                  : 'All PMEGP subsidy slabs and bank loan interest rates comply strictly with RBI guidelines and Ministry of MSME norms.'}
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            {onOpenDpdpModal && (
              <button
                onClick={onOpenDpdpModal}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-base">gpp_good</span>
                <span>{isHindi ? '🛡️ DPDP Act के तहत अपने अधिकार देखें' : '🛡️ View Your DPDP Act Data Rights'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Core Pillars Feature Showcase */}
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {isHindi ? 'पोर्टल की मुख्य विशेषताएं व सेवाएं' : 'Core Features & Services'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {isHindi ? 'गांव के विकास और व्यापारियों के लिए 3 शक्तिशाली उपकरण एक ही जगह पर' : 'Three powerful tools for rural entrepreneurs and shopkeepers in a single suite'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">explore</span>
              </div>
              <h3 className="font-extrabold text-stone-900 text-lg">
                {isHindi ? '1. GPS मैप व बिजनेस गाइड' : '1. GPS Map & Business Guide'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isHindi
                  ? 'लाइव गूगल मैप और पिनकोड के जरिए जानें कि आपके गांव में डेयरी, चक्की या सोलर कियोस्क की कितनी मांग है।'
                  : 'Real-time Google Maps integration showing dairy chilling hubs, agro mandis, and local market demand scores for any PIN code.'}
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="text-emerald-700 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer pt-2"
              >
                <span>{isHindi ? 'लॉगिन करके मैप देखें' : 'Sign in to View Map'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">account_balance</span>
              </div>
              <h3 className="font-extrabold text-stone-900 text-lg">
                {isHindi ? '2. लोन व 35% सब्सिडी कैलकुलेटर' : '2. Loans & 35% Subsidy Calculator'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isHindi
                  ? 'PMEGP सब्सिडी, HDFC व SBI मुद्रा लोन की EMI और बैंक ब्याज दरों की आसान गणना करें।'
                  : 'Calculate PMEGP capital subsidies up to 35% and compare live bank loan interest rates with EMI amortization schedules.'}
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="text-emerald-700 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer pt-2"
              >
                <span>{isHindi ? 'लॉगिन करके कैलकुलेट करें' : 'Sign in to Calculate'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 hover:border-emerald-500 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </div>
              <h3 className="font-extrabold text-stone-900 text-lg">
                {isHindi ? '3. दुकानदार बही-खाता' : '3. Shop Bahi-Khata Ledger'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isHindi
                  ? 'ग्राहकों की उधारी, जमा और दैनिक नकद गल्ला हिसाब रखें। WhatsApp पर एक क्लिक में तकादा भेजें।'
                  : 'Keep complete track of customer credit, cash collections, and supplier payments. Send one-click payment reminders via WhatsApp.'}
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="text-emerald-700 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer pt-2"
              >
                <span>{isHindi ? 'लॉगिन करके खाता खोलें' : 'Sign in to Open Khata'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Impact Statistics Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl">
          <div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">42,910+</div>
            <div className="text-xs text-stone-400 mt-1">{isHindi ? 'जुड़े हुए गांव' : 'Villages Connected'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-amber-300">35%</div>
            <div className="text-xs text-stone-400 mt-1">{isHindi ? 'अधिकतम सब्सिडी' : 'Max Capital Subsidy'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">98%</div>
            <div className="text-xs text-stone-400 mt-1">{isHindi ? 'सफल ऋण आवेदन' : 'Loan Approval Rate'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-amber-300">₹120Cr+</div>
            <div className="text-xs text-stone-400 mt-1">{isHindi ? 'सुरक्षित लेन-देन' : 'Credit Managed'}</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-6 px-6 sm:px-12 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800 text-center">
        <div>© 2026 GramMitra Portal. {isHindi ? 'ग्राम पंचायत नागरिक व दुकानदार सहायता सेवा।' : 'Free digital helper for village citizens and shopkeepers.'}</div>
        <div className="flex items-center gap-4 text-emerald-400 font-bold">
          <span>DPDP Act Compliant</span>
          <span>•</span>
          <span>100% Secure</span>
        </div>
      </footer>
    </div>
  );
};
