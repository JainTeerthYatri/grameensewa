import React, { useState } from 'react';
import { AuthUser, ScreenType, SupportedLanguage } from '../types';
import { LANGUAGES, UI_STRINGS } from '../data/translations';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
  onOpenLanguageModal: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onOpenVoiceAssistant?: () => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  currentLanguage,
  onSelectLanguage,
  onOpenLanguageModal,
  highContrast,
  onToggleHighContrast,
  onOpenVoiceAssistant,
  currentUser,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const strings = UI_STRINGS[currentLanguage] || UI_STRINGS.en;
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  const isHindi = currentLanguage === 'hi';

  // Exactly 3 clean, streamlined navigation modules as requested by user
  const navItems: { id: ScreenType; label: string; icon: string; badge: string; sub: string }[] = [
    {
      id: 'gateway',
      label: isHindi ? '1. बिज़नेस सेटअप व मैप गाइड' : '1. Business Setup & GPS Guide',
      icon: 'explore',
      badge: isHindi ? 'सेटअप & मैप' : 'SETUP & MAP',
      sub: isHindi ? 'लाइव लोकेशन व पिनकोड गाइड' : 'Live GPS & Local Guide',
    },
    {
      id: 'calculator',
      label: isHindi ? '2. लोन, सब्सिडी व बैंक प्लानर' : '2. Loans, Subsidies & Bank Rates',
      icon: 'account_balance',
      badge: isHindi ? 'सब्सिडी & बैंक' : 'LOANS & SUBSIDY',
      sub: isHindi ? 'HDFC, ICICI, SBI व EMI हेल्पर' : 'Bank Offers, EMI & Profit',
    },
    {
      id: 'khata',
      label: isHindi ? '3. दुकान खाता (हिसाब-किताब)' : '3. Shop Bahi-Khata',
      icon: 'menu_book',
      badge: isHindi ? 'बही-खाता' : 'BAHI-KHATA',
      sub: isHindi ? 'ग्राहक उधारी व नकद हिसाब' : 'Customer Credit & Cash Ledger',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface shadow-xs border-b border-surface-variant/70">
      {/* Top Community Bar */}
      <div className="bg-[#142918] text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center border-b-2 border-emerald-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span className="font-bold tracking-wider text-[11px] ml-1 text-emerald-100">
              GramMitra • {isHindi ? 'ग्रामीण व्यवसाय व डिजिटल सेवा पोर्टल' : 'Rural Business & Digital Guide Portal'}
            </span>
          </div>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline text-[11px] text-white/80">
            {isHindi ? 'आसान भाषा में बिज़नेस सेटअप, लोन सब्सिडी व दुकान बही-खाता' : 'Simple Setup Guide, Bank Loan Comparison & Shop Khata'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={onToggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-sm transition-colors cursor-pointer ${
              highContrast ? 'bg-primary-fixed text-primary font-bold' : 'hover:bg-white/10 text-white/80'
            }`}
            title="Toggle Accessibility High Contrast"
          >
            <span className="material-symbols-outlined text-[14px]">contrast</span>
            <span>{strings.contrastMode}</span>
          </button>
          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-1 px-2 py-0.5 rounded-sm bg-white/10 hover:bg-white/20 transition-colors font-medium text-white border border-white/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">translate</span>
            <span className="font-bold">{currentLangObj.nativeName}</span>
            <span className="text-white/60 text-[10px]">({currentLangObj.englishName})</span>
            <span className="material-symbols-outlined text-[12px]">arrow_drop_down</span>
          </button>
        </div>
      </div>

      {/* Main Brand & Identity Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => onNavigate('gateway')}
            className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="h-11 w-11 rounded-xl bg-linear-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm font-extrabold tracking-tight text-primary">
                  {strings.portalName}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide border border-emerald-300">
                  {isHindi ? '3-इन-1 पोर्टल' : '3-in-1 Suite'}
                </span>
              </div>
              <div className="text-xs text-outline font-medium tracking-tight">
                {isHindi ? 'सेटअप गाइड • लोन व सब्सिडी • दुकान खाता' : 'Setup Guide • Bank Loans & Subsidies • Shop Ledger'}
              </div>
            </div>
          </button>
        </div>

        {/* Right Action Icons: Language Switcher, Voice, User Desk */}
        <div className="flex items-center gap-2.5">
          {/* Quick Language Switcher Dropdown */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-surface-container-high hover:bg-surface-variant border border-outline-variant/70 text-xs text-on-surface shadow-2xs transition-colors">
            <span className="material-symbols-outlined text-primary text-base">translate</span>
            <select
              value={currentLanguage}
              onChange={(e) => onSelectLanguage && onSelectLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent font-bold text-xs text-on-surface focus:outline-none cursor-pointer pr-1 py-0.5"
              aria-label="Change Language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="text-gray-900 bg-white">
                  {l.nativeName} ({l.englishName})
                </option>
              ))}
            </select>
          </div>

          {onOpenVoiceAssistant && (
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-xs font-semibold text-emerald-900 transition-colors cursor-pointer"
              title="Voice Assistant"
            >
              <span className="material-symbols-outlined text-emerald-700 text-base animate-pulse">mic</span>
              <span className="hidden sm:inline">{isHindi ? 'आवाज से पूछें' : 'Voice Guide'}</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-surface-container-high text-on-surface transition-colors focus:outline-hidden cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-surface-variant p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
                  <span className="font-label-lg font-bold text-on-surface">
                    {isHindi ? 'महत्वपूर्ण अपडेट्स' : 'Active Updates'}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold">2 Active</span>
                </div>
                <div className="space-y-2.5 mt-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="font-bold text-emerald-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-emerald-700">verified</span>
                      {isHindi ? 'PMEGP 35% ग्रामीण सब्सिडी खुली है' : 'PMEGP 35% Rural Subsidy Open'}
                    </div>
                    <div className="text-emerald-800 mt-0.5">
                      {isHindi ? 'ग्रामीण नए उद्यमों के लिए 35% तक सरकारी सब्सिडी मिल रही है।' : 'Up to 35% capital subsidy active for rural manufacturing & service units.'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-variant">
                    <div className="font-bold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-secondary">account_balance</span>
                      {isHindi ? 'HDFC & ICICI बैंक Mudra लोन अपडेट' : 'HDFC & ICICI Mudra Rates Updated'}
                    </div>
                    <div className="text-outline mt-0.5">
                      {isHindi ? '9.25% से शुरू - बिना किसी गारंटी के 10 लाख तक लोन।' : 'Rates starting 9.25% with zero collateral up to ₹10 Lakh.'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full text-center text-xs text-primary font-bold pt-2 mt-2 border-t border-surface-variant hover:underline cursor-pointer"
                >
                  {isHindi ? 'बंद करें' : 'Close'}
                </button>
              </div>
            )}
          </div>

          {/* User Account / Profile & Logout */}
          {currentUser ? (
            <div className="relative pl-3 border-l border-surface-variant flex items-center gap-2">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-container-high transition-all text-left cursor-pointer focus:outline-hidden"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-xs">
                  <div className="font-bold text-on-surface flex items-center gap-1">
                    <span className="truncate max-w-[110px]">{currentUser.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                  </div>
                  <div className="text-[10px] text-outline truncate max-w-[110px]">
                    {currentUser.panchayat || 'Village Member'}
                  </div>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg border border-surface-variant hover:border-error hover:bg-error/10 text-outline hover:text-error transition-colors cursor-pointer"
                title="Sign Out / Logout"
              >
                <span className="material-symbols-outlined text-base">logout</span>
              </button>
            </div>
          ) : (
            <div className="pl-3 border-l border-surface-variant">
              <button
                onClick={() => onNavigate('login')}
                className={`py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentScreen === 'login'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>{isHindi ? 'लॉगिन' : 'Sign In'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar - 3 Streamlined Tabs */}
      <nav className="border-t border-surface-variant/80 bg-[#f8faf8] overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-start gap-2 py-1">
          {navItems.map((item) => {
            const isActive =
              currentScreen === item.id ||
              (item.id === 'calculator' && (currentScreen === 'feasibility' || currentScreen === 'loan-simulator')) ||
              (item.id === 'gateway' && currentScreen === 'cluster-map');

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-emerald-50/70 border-stone-200 hover:border-emerald-300'
                }`}
              >
                <span className={`material-symbols-outlined text-lg ${isActive ? 'text-white' : 'text-emerald-700'}`}>
                  {item.icon}
                </span>
                <div className="text-left">
                  <div className="font-bold leading-tight">{item.label}</div>
                  <div className={`text-[10px] hidden sm:block ${isActive ? 'text-emerald-100' : 'text-stone-500'}`}>
                    {item.sub}
                  </div>
                </div>
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
