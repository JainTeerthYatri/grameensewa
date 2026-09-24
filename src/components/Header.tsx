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

  const navItems: { id: ScreenType; label: string; icon: string; badge?: string }[] = [
    { id: 'gateway', label: strings.navGateway, icon: 'account_circle' },
    { id: 'khata', label: strings.navKhata || 'Dukandar Khata', icon: 'menu_book', badge: 'LEDGER' },
    { id: 'feasibility', label: strings.navFeasibility, icon: 'assessment', badge: '92% AAA' },
    { id: 'calculator', label: strings.navCalculator, icon: 'calculate', badge: '1:10 Leverage' },
    { id: 'cluster-map', label: strings.navClusterMap, icon: 'map', badge: 'GIS LGD' },
    { id: 'loan-simulator', label: strings.navSimulator, icon: 'monitoring', badge: '6M Grace' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface shadow-xs border-b border-surface-variant/70">
      {/* Top Sovereign Bar with Tricolor accent */}
      <div className="bg-[#0f1f12] text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center border-b-2 border-[#ff9933]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff9933] inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#138808] inline-block"></span>
            <span className="font-bold tracking-wider uppercase text-[11px] ml-1 text-surface-variant">
              {strings.sovereignHeader}
            </span>
          </div>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline text-[11px] text-white/80">
            NBCFDC & NSFDC Statutory Apex Corporations
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={onToggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-sm transition-colors ${
              highContrast ? 'bg-primary-fixed text-primary font-bold' : 'hover:bg-white/10 text-white/80'
            }`}
            title="Toggle Accessibility High Contrast"
          >
            <span className="material-symbols-outlined text-[14px]">contrast</span>
            <span>{strings.contrastMode}</span>
          </button>
          <button
            onClick={onOpenLanguageModal}
            className="flex items-center gap-1 px-2 py-0.5 rounded-sm bg-white/10 hover:bg-white/20 transition-colors font-medium text-white border border-white/20"
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
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WhmvW-T1ONNWhu04HxAPs05gskK5nIQf6ZOJu9-Ta3HGDG-FKlyLg9NeU6NIclBC0D4uIoy_ibNNVzcEQ1cNFCRcMk4If_8ik3PAl6isiJJ59N0pMTEojWxeik2kzd9PdVN01W1jQdkqqFbTKX_EHsMYcXenS4IVnb5NzhOvi0K5l3DEkIxd4vT1TR1QWXifV2Ueqiapd3ZV5bLvCC4zCLJjuAJnRcScf1AkKYerkhsQ_HIiD_BRmMVCg"
              alt="GramMitra Sovereign Seal"
              className="h-11 w-11 object-contain rounded-lg p-1 bg-white border border-surface-variant shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm font-extrabold tracking-tight text-primary">
                  {strings.portalName}
                </span>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide border border-primary/20">
                  National Portal
                </span>
              </div>
              <div className="text-xs text-outline font-medium tracking-tight">
                {strings.portalSubtitle}
              </div>
            </div>
          </button>
        </div>

        {/* Right Action Icons: Language Switcher, Bhashini Voice, Notification Bell, VLE User Desk */}
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-variant border border-outline-variant/60 text-xs font-semibold text-on-surface transition-colors cursor-pointer"
              title="Voice Assistant"
            >
              <span className="material-symbols-outlined text-primary text-base animate-pulse">mic</span>
              <span className="hidden sm:inline">{strings.voiceSahayak}</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-surface-container-high text-on-surface transition-colors focus:outline-hidden"
              title="Portal Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-surface-variant p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
                  <span className="font-label-lg font-bold text-on-surface">Sovereign Alerts</span>
                  <span className="text-[11px] text-primary font-bold">3 Unread</span>
                </div>
                <div className="space-y-2.5 mt-2.5 text-xs">
                  <div className="p-2 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="font-bold text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      DPR Sanction Confirmed
                    </div>
                    <div className="text-outline mt-0.5">
                      Rampur Kalan Mini Solar Chilling Unit approved at 85% CGTMSE Sovereign Guarantee.
                    </div>
                    <span className="text-[10px] text-outline mt-1 block">12 mins ago</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-low border border-surface-variant">
                    <div className="font-bold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-secondary">update</span>
                      Q3 Harvest Subvention Credited
                    </div>
                    <div className="text-outline mt-0.5">
                      Direct DBT 3.0% interest subvention posted for 14 Gram Panchayat clusters.
                    </div>
                    <span className="text-[10px] text-outline mt-1 block">2 hours ago</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-low border border-surface-variant">
                    <div className="font-bold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-tertiary">warning</span>
                      DIC Geo-Inspection Notice
                    </div>
                    <div className="text-outline mt-0.5">
                      Field Inspector assigned to verify 5kW Off-Grid Solar backup array.
                    </div>
                    <span className="text-[10px] text-outline mt-1 block">Yesterday</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full text-center text-xs text-primary font-bold pt-2 mt-2 border-t border-surface-variant hover:underline"
                >
                  Close & Clear
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
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-xs">
                  <div className="font-bold text-on-surface flex items-center gap-1">
                    <span className="truncate max-w-[120px]">{currentUser.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                  </div>
                  <div className="text-[10px] text-outline font-mono truncate max-w-[120px]">
                    {currentUser.citizenId}
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-sm">
                  {showUserMenu ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Direct Quick Logout Button */}
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg border border-surface-variant hover:border-error hover:bg-error/10 text-outline hover:text-error transition-colors cursor-pointer"
                title="Sign Out / Logout"
              >
                <span className="material-symbols-outlined text-base">logout</span>
              </button>

              {/* User Details Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl shadow-xl border border-surface-variant p-4 z-50 animate-in fade-in space-y-3">
                  <div className="pb-3 border-b border-surface-variant">
                    <div className="font-bold text-sm text-on-surface">{currentUser.name}</div>
                    <div className="text-xs text-outline font-mono">{currentUser.email}</div>
                    <div className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                      {currentUser.role}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-outline">
                    <div className="flex justify-between">
                      <span>Citizen ID:</span>
                      <span className="font-mono font-bold text-on-surface">{currentUser.citizenId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gram Panchayat:</span>
                      <span className="font-bold text-on-surface">{currentUser.panchayat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>District & State:</span>
                      <span className="text-on-surface">{currentUser.district}, {currentUser.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session Started:</span>
                      <span className="text-on-surface">{currentUser.loginTime}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-surface-variant">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-error/10 hover:bg-error text-error hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      <span>Sign Out from Portal</span>
                    </button>
                  </div>
                </div>
              )}
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
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <nav className="border-t border-surface-variant/80 bg-surface-container-lowest overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 sm:gap-2">
          {currentScreen === 'login' ? (
            <div className="py-2 px-1 flex items-center gap-2 text-xs font-bold text-outline">
              <span className="material-symbols-outlined text-base text-primary">lock</span>
              <span>Sovereign Authentication Gateway • Enter Verified Temporary Credentials to Unlock Full System</span>
            </div>
          ) : (
            navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 font-label-lg whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-primary text-primary font-bold bg-primary/5'
                      : 'border-transparent text-outline hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg ${isActive ? 'text-primary' : 'text-outline'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'bg-surface-container-high text-outline group-hover:text-on-surface'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </nav>
    </header>
  );
};
