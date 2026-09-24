import React, { useState } from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { FEASIBILITY_TEXT } from '../data/translations';

interface FeasibilityScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const FeasibilityScreen: React.FC<FeasibilityScreenProps> = ({
  onNavigate,
  currentLanguage,
  onShowToast,
}) => {
  const [catchmentRadius, setCatchmentRadius] = useState<number>(6.5);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<'1.0x' | '1.5x' | '2.0x'>('1.0x');
  const [activeMapPin, setActiveMapPin] = useState<string | null>('hub');

  const fText = FEASIBILITY_TEXT[currentLanguage] || FEASIBILITY_TEXT.en;

  // Toggle voice playback simulation
  const handleToggleAudio = () => {
    if (!isPlayingAudio) {
      setIsPlayingAudio(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = currentLanguage === 'en'
          ? 'In Rampur Kalan Gram Panchayat, the Mini Solar Dairy Chilling Unit is highly viable. There is zero competing cold chain within 8.5 kilometers, and an arbitrage spread of 16 rupees per liter is captured.'
          : 'रामपुर कलां ग्राम पंचायत में मिनी सोलर डेयरी चिलिंग यूनिट अत्यधिक व्यवहार्य है। 8.5 किलोमीटर के दायरे में कोई प्रतिस्पर्धी चिलर नहीं है, और प्रति लीटर 16 रुपये का मूल्य अंतर उपलब्ध है।';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
        utterance.rate = audioSpeed === '1.0x' ? 1.0 : audioSpeed === '1.5x' ? 1.3 : 1.6;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      }
      onShowToast(fText.audioBriefingTitle, 'info');
    } else {
      setIsPlayingAudio(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleExportPdf = () => {
    onShowToast('Compiling Statutory Bankable DPR for Rampur Kalan (PDF)...', 'info');
    setTimeout(() => {
      onShowToast('Bankable DPR downloaded! Signed with NIC Sovereign Key.', 'success');
    }, 1200);
  };

  // Dynamically calculate metrics based on catchment radius
  const dynamicFarmers = Math.round(120 * (catchmentRadius / 6.5));
  const dynamicDailyLitres = Math.min(800, Math.round(500 * (catchmentRadius / 6.5)));
  const dailyArbitrageWealth = dynamicDailyLitres * 16;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 pb-24">
      {/* Top Breadcrumb & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-variant">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-outline mb-1">
            <span>UP</span>
            <span>/</span>
            <span>LUCKNOW</span>
            <span>/</span>
            <span>MOHANLALGANJ</span>
            <span>/</span>
            <span className="text-primary font-bold">RAMPUR KALAN (LGD: 139420)</span>
          </div>
          <h1 className="font-display-lg text-primary tracking-tight">
            {fText.title}
          </h1>
          <p className="text-xs sm:text-sm text-outline">
            {fText.subtitle}
          </p>
        </div>

        {/* Viability Stamp Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 border-2 border-primary/30 p-3 rounded-2xl flex items-center gap-3 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold text-xl">
              92%
            </div>
            <div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
                {fText.viabilityRating}
              </div>
              <div className="font-headline-sm font-bold text-on-surface">{fText.aaaSovereign}</div>
              <div className="text-[10px] text-outline">{fText.verifiedBy}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Explainer Player Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-variant shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleAudio}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-error text-white animate-pulse'
                : 'bg-primary text-white hover:bg-primary-container shadow-md'
            }`}
            title={isPlayingAudio ? 'Pause explainer' : 'Play explainer'}
          >
            <span className="material-symbols-outlined text-2xl">
              {isPlayingAudio ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-lg font-bold text-on-surface">
                {fText.audioBriefingTitle}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                Bhashini AI
              </span>
            </div>
            <div className="text-xs text-outline">
              {fText.audioBriefingSubtitle}
            </div>
          </div>
        </div>

        {/* Audio controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded-xl text-xs font-bold">
            {(['1.0x', '1.5x', '2.0x'] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setAudioSpeed(spd)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  audioSpeed === spd ? 'bg-white text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                }`}
              >
                {spd}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-outline">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            <span>02:45 MINS</span>
          </div>
        </div>
      </div>

      {/* Reactive Catchment Slider */}
      <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-variant flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">radar</span>
            <span className="font-label-lg font-bold text-on-surface">
              {fText.catchmentCalibration}
            </span>
            <span className="font-bold text-primary text-base">{catchmentRadius.toFixed(1)} km</span>
          </div>
          <p className="text-xs text-outline">
            Adjusting radius re-calculates SHG aggregation coverage and aggregate daily retained wealth.
          </p>
        </div>

        <div className="w-full md:w-72 flex items-center gap-3">
          <span className="text-xs font-mono text-outline">3km</span>
          <input
            type="range"
            min="3.0"
            max="15.0"
            step="0.5"
            value={catchmentRadius}
            onChange={(e) => setCatchmentRadius(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-surface-variant rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono text-outline">15km</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-outline">{fText.activeShgs} </span>
            <span className="font-bold text-on-surface">{dynamicFarmers} Farmers</span>
          </div>
          <div>
            <span className="text-outline">{fText.dailyMilk} </span>
            <span className="font-bold text-primary">{dynamicDailyLitres} L/day</span>
          </div>
        </div>
      </div>

      {/* Grid: GIS Spatial Radar + Price Arbitrage Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left GIS Spatial Radar Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">satellite_alt</span>
                <h3 className="font-headline-sm font-bold text-on-surface">
                  {fText.mapTitle}
                </h3>
              </div>
              <p className="text-xs text-outline">
                {fText.mapSubtitle}
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-surface-container-high text-outline">
              Scale 1:{Math.round(catchmentRadius * 1000)}
            </span>
          </div>

          {/* Interactive SVG Radar Map */}
          <div className="relative w-full aspect-16/10 bg-[#0d1610] rounded-2xl overflow-hidden border border-surface-variant/80 p-4">
            <svg className="w-full h-full" viewBox="0 0 600 380">
              <defs>
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00450d" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#00450d" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#00450d" stopOpacity="0" />
                </radialGradient>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#223626" strokeWidth="0.75" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="600" height="380" fill="url(#grid)" />

              {/* Concentric distance rings based on Catchment Slider */}
              <circle cx="300" cy="190" r="60" fill="none" stroke="#2a4d31" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="300" cy="190" r="110" fill="none" stroke="#2a4d31" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="300" cy="190" r={Math.min(180, 80 + catchmentRadius * 10)} fill="url(#radarGlow)" stroke="#39ff14" strokeWidth="1.5" strokeOpacity="0.4" />

              {/* State Highway 24 Road Corridor */}
              <path
                d="M 50 40 Q 180 120 300 190 T 540 330"
                fill="none"
                stroke="#637568"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
              <text x="70" y="55" fill="#a4ada3" fontSize="10" fontFamily="monospace">SH-24 Bitumen Corridor</text>

              {/* SHG Collection Route Vectors */}
              <line x1="300" y1="190" x2="180" y2="120" stroke="#acf4a4" strokeWidth="2" strokeDasharray="2 2" />
              <line x1="300" y1="190" x2="420" y2="130" stroke="#acf4a4" strokeWidth="2" strokeDasharray="2 2" />
              <line x1="300" y1="190" x2="390" y2="280" stroke="#acf4a4" strokeWidth="2" strokeDasharray="2 2" />
              <line x1="300" y1="190" x2="190" y2="270" stroke="#acf4a4" strokeWidth="2" strokeDasharray="2 2" />

              {/* Center Node: Proposed Chilling Hub */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveMapPin('hub')}
              >
                <circle cx="300" cy="190" r="16" fill="#00450d" stroke="#39ff14" strokeWidth="2.5" />
                <circle cx="300" cy="190" r="6" fill="#ffffff" />
                <text x="300" y="222" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Proposed Chilling Hub
                </text>
                <text x="300" y="235" fill="#91d78a" fontSize="9" textAnchor="middle">
                  (500 L/Day Solar PV)
                </text>
              </g>

              {/* Node 2: Kalyanpur Milk Dock */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveMapPin('kalyanpur')}
              >
                <circle cx="180" cy="120" r="10" fill="#1b5e20" stroke="#acf4a4" strokeWidth="1.5" />
                <text x="180" y="105" fill="#ffffff" fontSize="10" textAnchor="middle">Kalyanpur Dock</text>
                <text x="180" y="140" fill="#a4ada3" fontSize="8" textAnchor="middle">3.8 km • 140 L/d</text>
              </g>

              {/* Node 3: Bilaspur APMC Mandi */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveMapPin('bilaspur')}
              >
                <circle cx="420" cy="130" r="12" fill="#49607c" stroke="#d1e4ff" strokeWidth="2" />
                <text x="420" y="112" fill="#ffffff" fontSize="10" textAnchor="middle">Bilaspur Mandi</text>
                <text x="420" y="152" fill="#d1e4ff" fontSize="8" textAnchor="middle">9.4 km • APMC Offtake</text>
              </g>

              {/* Node 4: Mahila SHG Cluster South */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveMapPin('shg_south')}
              >
                <circle cx="390" cy="280" r="9" fill="#933100" stroke="#ffb498" strokeWidth="1.5" />
                <text x="390" y="302" fill="#ffb498" fontSize="9" textAnchor="middle">6 Mahila SHGs</text>
              </g>

              {/* Node 5: Agrifeeder Substation */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveMapPin('substation')}
              >
                <circle cx="190" cy="270" r="9" fill="#314863" stroke="#b0c9e8" strokeWidth="1.5" />
                <text x="190" y="292" fill="#b0c9e8" fontSize="9" textAnchor="middle">Agrifeeder Substation</text>
              </g>
            </svg>
          </div>

          {/* Active Node Detail Card */}
          <div className="p-3.5 bg-surface-container-high rounded-xl border border-surface-variant text-xs flex items-center justify-between">
            <div>
              <span className="text-outline uppercase tracking-wider font-bold text-[10px]">
                Selected GIS Coordinate
              </span>
              <div className="font-bold text-on-surface mt-0.5">
                {activeMapPin === 'hub' && 'Proposed Chilling Hub: GP Panchayat Bhawan Compound (Plot #42)'}
                {activeMapPin === 'kalyanpur' && 'Kalyanpur Milk Dock: 3.8 km distance, 22 Smallholder Families'}
                {activeMapPin === 'bilaspur' && 'Bilaspur Mandi: Daily bulk purchase contract at ₹46/L'}
                {activeMapPin === 'shg_south' && 'Rampur South Mahila SHG Network: 48 women milk pourers'}
                {activeMapPin === 'substation' && 'Agrifeeder 11kV Line: 19.4 hrs/day average rural reliability'}
              </div>
            </div>
            <button
              onClick={() => onNavigate('cluster-map')}
              className="text-primary font-bold hover:underline whitespace-nowrap ml-3 cursor-pointer"
            >
              Open Cluster GIS →
            </button>
          </div>
        </div>

        {/* Right Arbitrage & Per-Litre Economics Stack (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Surplus & Price Arbitrage Comparison */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-5">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                {fText.arbitrageTitle}
              </span>
              <h3 className="font-headline-sm font-bold text-on-surface mt-0.5">
                {fText.middlemanVsChilled}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-surface-container-high border border-surface-variant">
                <div className="text-[11px] text-outline">{fText.unorganizedRate}</div>
                <div className="text-2xl font-currency-display font-bold text-outline mt-1 line-through decoration-error decoration-2">
                  ₹28.00 <span className="text-xs font-normal">/L</span>
                </div>
                <div className="text-[10px] text-error font-semibold mt-1">
                  Distress sale, high spoilage
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-primary/10 border-2 border-primary/30">
                <div className="text-[11px] text-primary font-bold">{fText.chilledRate}</div>
                <div className="text-2xl font-currency-display font-bold text-primary mt-1">
                  ₹44.00 <span className="text-xs font-normal">/L</span>
                </div>
                <div className="text-[10px] text-primary font-bold mt-1">
                  +₹16.00/L Spread Retained
                </div>
              </div>
            </div>

            {/* Daily Aggregate Wealth Retained */}
            <div className="p-4 rounded-2xl bg-linear-to-r from-primary to-primary-container text-white space-y-1">
              <div className="text-xs text-white/80 font-medium">{fText.dailyWealthRetained}</div>
              <div className="text-2xl font-bold font-currency-display text-primary-fixed">
                +₹{dailyArbitrageWealth.toLocaleString('en-IN')} / day
              </div>
              <div className="text-[11px] text-white/70">
                Directly distributed to {dynamicFarmers} local women dairy producers every month.
              </div>
            </div>
          </div>

          {/* Per-Litre Unit Economics Stack */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
            <h4 className="font-headline-sm font-bold text-on-surface flex items-center justify-between">
              <span>{fText.breakdownTitle}</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
                +₹11.50 {fText.netProfit} / L
              </span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-surface-variant">
                <span className="text-outline">{fText.rawMilk}</span>
                <span className="font-mono font-bold text-on-surface">₹30.00 / L</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-variant">
                <span className="text-outline">{fText.solarChilling}</span>
                <span className="font-mono font-bold text-on-surface">₹2.80 / L</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-variant">
                <span className="text-outline">{fText.logistics}</span>
                <span className="font-mono font-bold text-on-surface">₹1.70 / L</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-surface-variant font-bold text-on-surface">
                <span>{fText.totalUnitCost}</span>
                <span className="font-mono text-outline">₹34.50 / L</span>
              </div>
              <div className="flex justify-between py-2 bg-primary/5 px-2 rounded-lg font-bold text-primary">
                <span>{fText.wholesalePrice}</span>
                <span className="font-mono text-sm">₹46.00 / L</span>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl text-center text-xs">
              <span className="text-outline">{fText.monthlyNetSurplus} (500L/day): </span>
              <span className="font-bold text-primary text-sm">₹1,72,500 / month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic SWOT & Risk Mitigation Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Localized SWOT Matrix */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
          <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">analytics</span>
            {fText.swotTitle}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-green-50/80 rounded-xl border border-green-200">
              <span className="font-bold text-green-900 block mb-1">{fText.swot.strengths}</span>
              <p className="text-green-800">
                1,840 cattle pool in Rampur GP; 5kW off-grid solar zero fuel opex; existing 6 SHG collection routes.
              </p>
            </div>
            <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900 block mb-1">{fText.swot.weaknesses}</span>
              <p className="text-amber-800">
                May-June peak summer milk output dips ~18%; need automated electronic milk fat/SNF testers.
              </p>
            </div>
            <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1">{fText.swot.opportunities}</span>
              <p className="text-blue-800">
                Dual-line processing: divert 150L to paneer/curd at 40% higher realization; leased cold storage to local tomato farmers.
              </p>
            </div>
            <div className="p-3.5 bg-rose-50/80 rounded-xl border border-rose-200">
              <span className="font-bold text-rose-900 block mb-1">{fText.swot.threats}</span>
              <p className="text-rose-800">
                Potential 15-day delayed corporate offtake payment; mitigated via statutory Escrow Reserve.
              </p>
            </div>
          </div>
        </div>

        {/* Active Risk Mitigation Index */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
          <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
            {fText.riskTitle}
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-variant">
              <div className="font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                Mitigation A: Seasonal Summer Yield Dip
              </div>
              <p className="text-outline mt-1">
                Value-add paneer & ghee buffer converting 150L/day into shelf-stable dairy commodities at 42% gross margin.
              </p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-variant">
              <div className="font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                Mitigation B: Single Corporate Offtaker Dependency
              </div>
              <p className="text-outline mt-1">
                Dual-escrow split offtake: 60% contract to Parag Cooperative + 40% open-mandi retail distribution in Mohanlalganj.
              </p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-variant">
              <div className="font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                Mitigation C: Power Outages & Grid Fluctuations
              </div>
              <p className="text-outline mt-1">
                5kW Off-Grid Solar array with 10kWh Lithium-ion backup provides 8.5 hours uninterrupted chilling without diesel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating / Bottom Action Bar */}
      <div className="sticky bottom-4 z-30 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-2xl border border-surface-variant shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          <span className="font-bold text-on-surface">Dossier ID: DPR-UP-LKO-2026-0842</span>
          <span className="hidden sm:inline text-outline">• All Statutory Pre-Requisites Met</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPdf}
            className="px-4 py-2.5 rounded-xl border border-surface-variant hover:border-outline bg-surface-container-low text-xs font-bold text-on-surface transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>{fText.exportDpr}</span>
          </button>

          <button
            onClick={() => onNavigate('calculator')}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-headline-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>{fText.proceedToCalc}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};