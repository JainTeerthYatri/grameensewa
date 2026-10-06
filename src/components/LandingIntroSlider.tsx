import React, { useState, useEffect } from 'react';

interface LandingIntroSliderProps {
  onGetStarted: () => void;
}

export const LandingIntroSlider: React.FC<LandingIntroSliderProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      titleHi: '📍 लाइव GPS व पिनकोड बिजनेस मैपिंग',
      titleEn: '📍 Live GPS & Pincode Business Mapping',
      descHi: 'अपने गांव या कस्बे के 5-10 किमी दायरे में पहचानें कि कौन सा व्यवसाय सबसे ज्यादा चलेगा और कहां ग्राहक मांग सबसे अधिक है।',
      descEn: 'Detect your village or town GPS location to discover high-demand business opportunities and local market demand hotspots.',
      icon: 'explore',
      bgGradient: 'from-emerald-900 via-emerald-800 to-teal-900',
    },
    {
      titleHi: '💰 35% तक सरकारी सब्सिडी व बैंक लोन',
      titleEn: '💰 Up to 35% Govt Subsidy & Bank Loans',
      descHi: 'PMEGP, मुद्रा लोन और PMFME योजनाओं के तहत मुफ्त सब्सिडी कैलकुलेट करें और HDFC, ICICI, SBI की ब्याज दरों की तुलना करें।',
      descEn: 'Calculate PMEGP 35% capital grants and compare live interest rates from top banks like HDFC, ICICI, and SBI instantly.',
      icon: 'account_balance',
      bgGradient: 'from-teal-900 via-stone-900 to-emerald-950',
    },
    {
      titleHi: '📒 दुकान बही-खाता व उधारी हिसाब',
      titleEn: '📒 Shop Bahi-Khata & Customer Ledger',
      descHi: 'ग्राहकों की उधारी (Debit) और जमा (Credit) का डिजिटल हिसाब रखें। एक क्लिक में WhatsApp पर तकादा भेजें और मुनाफा बढ़ाएं।',
      descEn: 'Manage daily customer udhar, cash collections, and supplier payments easily with instant WhatsApp payment reminders.',
      icon: 'menu_book',
      bgGradient: 'from-stone-900 via-emerald-950 to-stone-900',
    },
  ];

  // Auto-advance slides every 4.5 seconds with smooth animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className={`rounded-3xl p-6 sm:p-10 text-white bg-linear-to-r ${slide.bgGradient} shadow-xl border border-emerald-700/50 relative overflow-hidden transition-all duration-500 animate-in fade-in`}>
      {/* Background Glow */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>GramMitra • Rural Business Suite</span>
        </div>

        <div className="space-y-3 min-h-[140px] transition-all duration-300">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {slide.titleEn}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
            {slide.descEn}
          </p>
        </div>

        {/* Slide Indicators & Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/15">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={onGetStarted}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-105"
          >
            <span>Explore Portal Now</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
