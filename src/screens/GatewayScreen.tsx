import React, { useState } from 'react';
import { GatewayRole, ScreenType, SupportedLanguage } from '../types';
import { UI_STRINGS, GATEWAY_TEXT } from '../data/translations';

interface GatewayScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const GatewayScreen: React.FC<GatewayScreenProps> = ({
  onNavigate,
  currentLanguage,
  onSelectLanguage,
  onShowToast,
}) => {
  const [selectedRole, setSelectedRole] = useState<GatewayRole>('vle');
  const [authMethod, setAuthMethod] = useState<'aadhaar' | 'digilocker' | 'ration'>('aadhaar');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [selectedSector, setSelectedSector] = useState<'dairy' | 'solar' | 'handloom' | 'bio'>('dairy');
  
  // Instant Margin Engine reactive state
  const [promoterMargin, setPromoterMargin] = useState<number>(100000);
  const totalDpr = promoterMargin * 10;
  const loanAmount = promoterMargin * 9;

  // Pincode finder state
  const [pincode, setPincode] = useState('226301');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    onShowToast('Aadhaar Biometric e-KYC Verified successfully! Routing to Feasibility Copilot...', 'success');
    setTimeout(() => {
      onNavigate('feasibility');
    }, 600);
  };

  const handlePincodeSearch = () => {
    if (pincode === '226301') {
      setPincodeResult('CSC Kendra #412: Mohanlalganj Main Market (0.4 km) - Operator: Rameshwar Verma');
    } else {
      setPincodeResult(`CSC Kendra found for PIN ${pincode}: Block Development Office Kendra (1.2 km)`);
    }
    onShowToast(`Located active CSC Nodal Kendra for PIN ${pincode}`, 'info');
  };

  const strings = UI_STRINGS[currentLanguage] || UI_STRINGS.en;
  const gText = GATEWAY_TEXT[currentLanguage] || GATEWAY_TEXT.en;

  const roles: { id: GatewayRole; tier: string; title: string; subtitle: string; icon: string }[] = [
    { id: 'beneficiary', tier: 'Tier A', title: gText.roles.beneficiary.title, subtitle: gText.roles.beneficiary.sub, icon: 'person' },
    { id: 'vle', tier: 'Tier B', title: gText.roles.vle.title, subtitle: gText.roles.vle.sub, icon: 'storefront' },
    { id: 'sca', tier: 'Tier C', title: gText.roles.sca.title, subtitle: gText.roles.sca.sub, icon: 'account_balance' },
    { id: 'dic', tier: 'Tier D', title: gText.roles.dic.title, subtitle: gText.roles.dic.sub, icon: 'fact_check' },
    { id: 'central', tier: 'Tier E', title: gText.roles.central.title, subtitle: gText.roles.central.sub, icon: 'shield' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Dynamic Telemetry / Status Pill Bar */}
      <div className="bg-surface-container-high/60 border-y border-surface-variant/80 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              MoSJE Statutory DBT Engine: Live DPR Router v4.2
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-outline">
              <span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
              Consensus Metric: <strong className="text-on-surface">92% viable AAA Sovereign</strong>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-outline">
              <span className="material-symbols-outlined text-[15px] text-secondary">share_location</span>
              Real-time GIS Sync: Rampur Kalan GP (LGD: 139420)
            </span>
          </div>

          <div className="flex items-center gap-4 text-outline font-mono text-[11px]">
            <span>{strings.activePanchayats}</span>
            <span>•</span>
            <span className="text-primary font-bold">{strings.dprSanctionRate}</span>
          </div>
        </div>
      </div>

      {/* Prominent Language Bar: Pure English Default with 1-Click Language Switching */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-3">
        <div className="bg-surface-container-low border border-surface-variant/80 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2 text-stone-700">
            <span className="material-symbols-outlined text-primary text-base">language</span>
            <span className="font-bold text-on-surface">Language / भाषा:</span>
            <span className="text-outline text-[11px] hidden sm:inline">
              (Current: <strong className="text-primary">{currentLanguage === 'en' ? 'English (Pure English)' : 'हिंदी (Hindi)'}</strong>)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                onSelectLanguage?.('en');
                onShowToast('Switched to Pure English', 'info');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLanguage === 'en'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white hover:bg-surface-variant text-stone-700 border border-surface-variant'
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                onSelectLanguage?.('hi');
                onShowToast('भाषा बदलकर हिंदी कर दी गई है', 'info');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLanguage === 'hi'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white hover:bg-surface-variant text-stone-700 border border-surface-variant'
              }`}
            >
              हिंदी (Hindi)
            </button>
            <button
              onClick={() => {
                onSelectLanguage?.('mr');
                onShowToast('भाषा मराठी निवडली आहे', 'info');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentLanguage === 'mr'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white hover:bg-surface-variant text-stone-600 border border-surface-variant'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => {
                onSelectLanguage?.('bn');
                onShowToast('ভাষা বাংলা নির্বাচন করা হয়েছে', 'info');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentLanguage === 'bn'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white hover:bg-surface-variant text-stone-600 border border-surface-variant'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => {
                onSelectLanguage?.('ta');
                onShowToast('மொழி தமிழ் தேர்ந்தெடுக்கப்பட்டது', 'info');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentLanguage === 'ta'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white hover:bg-surface-variant text-stone-600 border border-surface-variant'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        <div className="bg-linear-to-br from-surface-container-low via-surface to-surface-container-low p-6 sm:p-10 rounded-3xl border border-surface-variant shadow-xs relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">hub</span>
              {gText.badge}
            </div>

            <h1 className="font-display-lg text-primary tracking-tight">
              {gText.heroTitle}
            </h1>

            <p className="font-body-lg text-outline leading-relaxed">
              {gText.heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-surface-container-high px-3.5 py-1.5 rounded-xl border border-surface-variant text-xs font-semibold text-on-surface">
                <span className="material-symbols-outlined text-primary text-base">pin_drop</span>
                <span>{strings.activePanchayats}</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-high px-3.5 py-1.5 rounded-xl border border-surface-variant text-xs font-semibold text-on-surface">
                <span className="material-symbols-outlined text-primary text-base">task_alt</span>
                <span>{strings.dprSanctionRate}</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-high px-3.5 py-1.5 rounded-xl border border-surface-variant text-xs font-semibold text-on-surface">
                <span className="material-symbols-outlined text-primary text-base">translate</span>
                <span>12 Scheduled Languages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Tier Operational Role Selector Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-outline uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-primary">badge</span>
              Select Operational Role & Authorization Tier
            </div>
            <span className="text-[11px] text-outline font-medium">Secured under MoSJE Identity Framework</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    onShowToast(`Switched operational context to ${role.title}`, 'info');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-md ring-2 ring-primary/30'
                      : 'bg-surface-container-lowest border-surface-variant hover:border-outline hover:bg-surface-container-low text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-surface-container-high text-outline'
                    }`}>
                      {role.tier}
                    </span>
                    <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-white' : 'text-primary'}`}>
                      {role.icon}
                    </span>
                  </div>
                  <div className={`font-headline-sm font-bold text-sm leading-tight ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                    {role.title}
                  </div>
                  <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-outline'}`}>
                    {role.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Sovereign Access + Reactive Instant Margin Engine */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Secure Sovereign Access */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-variant shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-md font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">fingerprint</span>
                    {gText.loginTitle}
                  </h2>
                  <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                    UIDAI 2.0 Compliant
                  </span>
                </div>
                <p className="text-xs text-outline mt-1">
                  {gText.loginSubtitle}
                </p>
              </div>

              {/* Authentication Mode Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-surface-container-high rounded-xl">
                <button
                  onClick={() => setAuthMethod('aadhaar')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMethod === 'aadhaar'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">password</span>
                  {gText.authMethods.aadhaar}
                </button>
                <button
                  onClick={() => setAuthMethod('digilocker')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMethod === 'digilocker'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">cloud_sync</span>
                  {gText.authMethods.digilocker}
                </button>
                <button
                  onClick={() => setAuthMethod('ration')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMethod === 'ration'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                  {gText.authMethods.ration}
                </button>
              </div>

              {/* Mobile / Aadhaar Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">
                    {gText.mobileLabel}
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-outline">
                      +91
                    </span>
                    <input
                      type="text"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder={gText.mobilePlaceholder}
                      className="w-full pl-12 pr-28 py-3 rounded-xl border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-mono font-medium outline-hidden"
                    />
                    <button
                      onClick={() => {
                        setOtpSent(true);
                        setOtpDigits(['5', '8', '2', '9', '1', '4']);
                        onShowToast('New 6-digit sovereign OTP dispatched to registered mobile!', 'info');
                      }}
                      className="absolute right-2 px-3 py-1.5 bg-surface-container-high hover:bg-surface-variant text-primary font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {otpSent ? gText.resend : gText.getOtp}
                    </button>
                  </div>
                </div>

                {/* 6 Digit OTP Input Cells */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-on-surface">
                      {gText.otpLabel}
                    </label>
                    <span className="text-[11px] text-outline font-mono">{gText.expiresIn}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="h-12 text-center text-lg font-bold font-mono bg-surface-container-low border border-surface-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white outline-hidden"
                      />
                    ))}
                  </div>

                  {/* WhatsApp & Voice Call Alternates */}
                  <div className="flex items-center justify-between text-xs text-outline mt-2.5">
                    <button
                      onClick={() => onShowToast('OTP sent via WhatsApp secure business line', 'info')}
                      className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm text-green-600">chat</span>
                      <span>Send via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => onShowToast('Initiating Bhashini Voice OTP call in 30 seconds', 'info')}
                      className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm text-blue-600">call</span>
                      <span>Get Voice Call OTP</span>
                    </button>
                  </div>
                </div>

                {/* Enterprise Sector Selection */}
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-2">
                    {gText.prioritySectorsTitle}
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'dairy', label: gText.sectors.dairy.title, desc: gText.sectors.dairy.desc, icon: 'water_drop' },
                      { id: 'solar', label: gText.sectors.solar.title, desc: gText.sectors.solar.desc, icon: 'solar_power' },
                      { id: 'handloom', label: gText.sectors.handloom.title, desc: gText.sectors.handloom.desc, icon: 'dry_cleaning' },
                      { id: 'bio', label: gText.sectors.bio.title, desc: gText.sectors.bio.desc, icon: 'eco' },
                    ].map((sec) => {
                      const isSel = selectedSector === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => setSelectedSector(sec.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSel
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-surface-variant hover:border-outline bg-surface-container-lowest'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-lg ${isSel ? 'text-primary' : 'text-outline'}`}>
                              {sec.icon}
                            </span>
                            <span className="text-xs font-bold text-on-surface">{sec.label}</span>
                          </div>
                          <p className="text-[11px] text-outline mt-1 line-clamp-1">{sec.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Big Verification CTA */}
                <button
                  onClick={handleVerify}
                  className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-container text-white font-headline-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform">
                    verified
                  </span>
                  <span>{gText.verifyBtn}</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-outline pt-2 border-t border-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-primary">lock</span>
                    256-bit Sovereign Encryption
                  </span>
                  <span>Direct Benefit Transfer (DBT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Margin Engine & Hyper-Local Teaser */}
          <div className="lg:col-span-6 space-y-6">
            {/* Reactive Margin Engine Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-variant shadow-sm space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                    <span className="material-symbols-outlined text-xs">calculate</span>
                    {gText.marginEngineTitle}
                  </div>
                  <h3 className="font-headline-md font-bold text-on-surface mt-1">
                    {gText.marginEngineTitle}
                  </h3>
                  <p className="text-xs text-outline">
                    {gText.marginEngineSubtitle}
                  </p>
                </div>
              </div>

              {/* Margin Slider */}
              <div className="space-y-3 p-4 bg-surface-container-low rounded-2xl border border-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">{gText.promoterEquity}</span>
                  <span className="font-currency-display font-extrabold text-primary">
                    ₹{promoterMargin.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={promoterMargin}
                  onChange={(e) => setPromoterMargin(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-variant rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-outline">
                  <span>₹20,000 (Micro)</span>
                  <span>₹2,50,000</span>
                  <span>₹5,00,000 (Max Cap)</span>
                </div>
              </div>

              {/* Reactive Financial Stack */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-surface-variant">
                  <div className="text-[11px] font-semibold text-outline uppercase">{gText.loanSanction}</div>
                  <div className="font-display-lg text-xl sm:text-2xl font-bold text-primary mt-1">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-outline mt-1">
                    5.0% Subsidized Interest (3% DBT Rebate)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <div className="text-[11px] font-semibold text-primary uppercase">{gText.totalProject}</div>
                  <div className="font-display-lg text-xl sm:text-2xl font-bold text-on-surface mt-1">
                    ₹{totalDpr.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-primary font-bold mt-1">
                    Full DPR CapEx & Working Capital
                  </div>
                </div>
              </div>

              {/* Visual Ratio Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-secondary font-bold">Promoter Margin: 10%</span>
                  <span className="text-primary font-bold">Sovereign Concession: 90%</span>
                </div>
                <div className="h-3.5 w-full bg-surface-container-high rounded-full overflow-hidden flex border border-surface-variant">
                  <div className="h-full bg-secondary w-[10%]"></div>
                  <div className="h-full bg-primary w-[90%]"></div>
                </div>
              </div>

              {/* Route to Calculator Button */}
              <button
                onClick={() => onNavigate('calculator')}
                className="w-full py-2.5 px-4 rounded-xl border border-primary text-primary hover:bg-primary/5 font-label-lg font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{gText.generateDprBtn}</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

            {/* Merchant Enterprise & Digital Ledger Banner */}
            <div className="bg-linear-to-r from-amber-600 via-amber-700 to-amber-800 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase text-white">
                      Merchant Enterprise Portal
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-stone-900 text-[10px] font-extrabold uppercase">
                      New
                    </span>
                  </div>
                  <h4 className="font-headline-md font-bold text-white text-base sm:text-lg">
                    {currentLanguage === 'hi'
                      ? 'दुकानदार डिजिटल बही-खाता (Khata System)'
                      : 'Business Accounts & Digital Ledger (Khata System)'}
                  </h4>
                  <p className="text-xs text-white/90 max-w-md">
                    {currentLanguage === 'hi'
                      ? 'अपने व्यवसाय को पंजीकृत करें, ग्राहक जमा-उधार, सप्लायर हिसाब, गल्ला रोकड़ और डिजिटल पर्ची प्रबंधित करें।'
                      : 'Register your business first, set up your store name & owner profile, track customer credit & debit, supplier payables, daily cash register, and express PDF invoicing.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-2xl">menu_book</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between relative z-10">
                <div className="text-xs text-white/80">
                  <span>
                    {currentLanguage === 'hi'
                      ? 'चरण 1: पहले अपनी दुकान / व्यवसाय का पंजीकरण करें'
                      : 'Step 1: Complete business registration and set your store identity'}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('khata')}
                  className="px-4 py-2 bg-white text-stone-900 text-xs font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>
                    {currentLanguage === 'hi' ? 'व्यवसाय खाता खोलें' : 'Register & Open Business Khata'}
                  </span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Hyper-Local Feasibility Engine Teaser Card */}
            <div className="bg-linear-to-br from-[#102a14] to-[#1c3e21] rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-wider uppercase text-white">
                      GIS LGD: 139420
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold uppercase">
                      92% AAA Viable
                    </span>
                  </div>
                  <h4 className="font-headline-md font-bold text-white">
                    Rampur Kalan Gram Panchayat
                  </h4>
                  <p className="text-xs text-white/80 max-w-md">
                    Mini Solar Dairy Chilling Unit (500L/day). Pre-validated with zero formal cold chain within 8.5km and 6 Mahila SHG collection routes ready.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between relative z-10">
                <div className="text-xs">
                  <span className="text-white/60">Verified by:</span>{' '}
                  <span className="font-bold text-white">DIC Mohanlalganj</span>
                </div>
                <button
                  onClick={() => onNavigate('feasibility')}
                  className="px-4 py-2 bg-white text-primary text-xs font-bold rounded-xl hover:bg-surface-variant transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Dossier</span>
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                </button>
              </div>
            </div>

            {/* Pincode & Helpdesk Finder */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant space-y-4">
              <h4 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">near_me</span>
                {gText.pincodeTitle}
              </h4>
              <p className="text-xs text-outline">{gText.pincodeSubtitle}</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder={gText.pincodePlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl border border-surface-variant text-sm font-mono focus:border-primary outline-hidden"
                />
                <button
                  onClick={handlePincodeSearch}
                  className="px-4 py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface text-xs font-bold rounded-xl border border-surface-variant whitespace-nowrap transition-colors cursor-pointer"
                >
                  {gText.checkBtn}
                </button>
              </div>
              {pincodeResult && (
                <div className="p-3 bg-surface-container-low rounded-xl border border-surface-variant text-xs text-on-surface">
                  <span className="font-bold text-primary">Found:</span> {pincodeResult}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-surface-variant text-xs text-outline">
                <button
                  onClick={() => onShowToast('Downloading Official MoSJE Concessional Credit Handbook (PDF)', 'info')}
                  className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Citizen Guide (PDF)</span>
                </button>
                <button
                  onClick={() => onShowToast('Playing Audio Tutorial in selected language', 'info')}
                  className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">volume_up</span>
                  <span>Audio Explainer (MP3)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
