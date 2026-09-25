import React from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../data/translations';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentLanguage = 'hi' }) => {
  const isHindi = currentLanguage === 'hi';
  const ui = UI_STRINGS[currentLanguage] || UI_STRINGS.en;

  return (
    <footer className="bg-[#121614] text-[#cfd7ce] pt-10 pb-8 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand & Purpose */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-wide">{ui.portalName}</div>
              <div className="text-xs text-white/60">
                {isHindi ? 'ग्रामीण नागरिकों व दुकानदारों के लिए 3-इन-1 डिजिटल सहायक' : '3-in-1 Rural Setup, Loans & Khata Platform'}
              </div>
            </div>
          </div>

          {/* Quick Nav Links - 3 Clean Sections */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('gateway')}
              className="hover:text-emerald-400 transition-colors cursor-pointer text-white/90"
            >
              {isHindi ? '1. बिजनेस सेटअप व मैप' : '1. Business Setup & GPS'}
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className="hover:text-emerald-400 transition-colors cursor-pointer text-white/90"
            >
              {isHindi ? '2. लोन, सब्सिडी व बैंक दरें' : '2. Loans & Subsidies'}
            </button>
            <button
              onClick={() => onNavigate('khata')}
              className="hover:text-amber-300 transition-colors cursor-pointer text-amber-300 font-bold"
            >
              {isHindi ? '3. दुकान बही-खाता' : '3. Shop Bahi-Khata'}
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4 text-center sm:text-left">
          <div>
            © 2026 GramMitra. {isHindi ? 'ग्रामीण नागरिकों, उद्यमियों और दुकानदारों के लिए सरल व सुरक्षित डिजिटल सेवा।' : 'Free community platform for village entrepreneurs and shopkeepers.'}
          </div>
          <div className="flex items-center gap-3 text-emerald-400 font-medium">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>{isHindi ? 'सरल भाषा • 100% निशुल्क' : 'Simple Language • 100% Free'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
