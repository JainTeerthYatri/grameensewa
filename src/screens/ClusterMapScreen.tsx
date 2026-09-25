import React, { useState } from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { CLUSTER_MAP_TEXT } from '../data/translations';

interface ClusterMapScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ClusterMapScreen: React.FC<ClusterMapScreenProps> = ({
  onNavigate,
  currentLanguage,
  onShowToast,
}) => {
  const [bufferFilter, setBufferFilter] = useState<'5km' | '10km' | 'all'>('10km');
  const [selectedPin, setSelectedPin] = useState<'hub' | 'parag' | 'kisan' | 'mandi' | 'substation'>('hub');
  const [isPlayingGuide, setIsPlayingGuide] = useState(false);

  const cmText = CLUSTER_MAP_TEXT[currentLanguage] || CLUSTER_MAP_TEXT.en;

  const handlePlayAudioGuide = () => {
    if (!isPlayingGuide) {
      setIsPlayingGuide(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = currentLanguage === 'en'
          ? 'In the Rampur Kalan area, there are many cows and buffaloes. There are already too many flour mills in the village, so milk collection is the best business opportunity to start here.'
          : 'रामपुर कलां ग्राम क्लस्टर में 1,840 दुधारू पशु हैं। आटा चक्की क्लस्टर पहले से काफी भरा है इसलिए आटा चक्की में जोखिम है। डेयरी व दूध संग्रहण इस क्षेत्र के लिए सबसे अच्छा अवसर है।';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
        utterance.onend = () => setIsPlayingGuide(false);
        utterance.onerror = () => setIsPlayingGuide(false);
        window.speechSynthesis.speak(utterance);
      }
      onShowToast(cmText.audioGuide, 'info');
    } else {
      setIsPlayingGuide(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleExportDossier = () => {
    onShowToast('Downloading Village Business Guide (PDF)...', 'info');
    setTimeout(() => {
      onShowToast('Village Business Guide downloaded successfully!', 'success');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 pb-24">
      {/* Top Geo-Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-variant">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-outline mb-1">
            <span>VILLAGE MAP</span>
            <span>•</span>
            <span>UTTAR PRADESH</span>
            <span>•</span>
            <span>LUCKNOW</span>
            <span>•</span>
            <span className="text-primary font-bold">MOHANLALGANJ / RAMPUR KALAN</span>
          </div>
          <h1 className="font-display-lg text-primary tracking-tight">
            {cmText.title}
          </h1>
          <p className="text-xs sm:text-sm text-outline">
            {cmText.subtitle}
          </p>
        </div>

        {/* Live Area Status */}
        <div className="flex items-center gap-2.5 bg-surface-container-high px-4 py-2 rounded-2xl border border-surface-variant">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
          <div className="text-xs">
            <span className="font-bold text-on-surface">Village Area Map Active</span>
            <div className="text-[10px] text-outline font-mono">10km Radius • Nearby Centers</div>
          </div>
        </div>
      </div>

      {/* Audio Guide Card */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-variant shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayAudioGuide}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlayingGuide
                ? 'bg-error text-white animate-pulse'
                : 'bg-primary text-white hover:bg-primary-container shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {isPlayingGuide ? 'pause' : 'volume_up'}
            </span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-lg font-bold text-on-surface">
                {cmText.audioGuide}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                Bhashini Copilot
              </span>
            </div>
            <div className="text-xs text-outline">
              Saturation alerts & competitive feasibility voice briefing
            </div>
          </div>
        </div>

        {/* Infrastructure telemetry chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-surface-container-high border border-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-amber-600">bolt</span>
            <span>Feeder: <strong>19.4 hrs/day</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-surface-container-high border border-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-green-600">grass</span>
            <span>Fodder: <strong>+420 Qtl Surplus</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-surface-container-high border border-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-blue-600">water_drop</span>
            <span>Groundwater: <strong>Safe Tier-1</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive GIS Radar + Cluster Saturation & Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive GIS Cluster Radar (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">radar</span>
                {cmText.activeClusters}
              </h3>
              <p className="text-xs text-outline">
                Click nodes to inspect logistics distance and competitive density.
              </p>
            </div>

            {/* Buffer Filters */}
            <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded-xl text-xs font-bold">
              {(['5km', '10km', 'all'] as const).map((buf) => (
                <button
                  key={buf}
                  onClick={() => setBufferFilter(buf)}
                  className={`px-3 py-1 rounded-lg transition-colors capitalize cursor-pointer ${
                    bufferFilter === buf ? 'bg-white text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                  }`}
                >
                  {buf === 'all' ? cmText.allClusters : `${buf.toUpperCase()} ${cmText.filterBuffer}`}
                </button>
              ))}
            </div>
          </div>

          {/* Radar Map Canvas */}
          <div className="relative w-full aspect-16/10 bg-[#0c140e] rounded-2xl overflow-hidden border border-surface-variant/80 p-4">
            <svg className="w-full h-full" viewBox="0 0 600 380">
              <defs>
                <radialGradient id="clusterPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="300" y1="0" x2="300" y2="380" stroke="#1c2d20" strokeWidth="1" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="#1c2d20" strokeWidth="1" />

              {/* Range Circles */}
              <circle cx="300" cy="190" r="70" fill="none" stroke="#253e2a" strokeWidth="1.2" strokeDasharray="3 3" />
              <text x="305" y="125" fill="#52795a" fontSize="9" fontFamily="monospace">5 KM RADIUS</text>

              <circle cx="300" cy="190" r="140" fill="none" stroke="#253e2a" strokeWidth="1.2" strokeDasharray="4 4" />
              <text x="305" y="55" fill="#52795a" fontSize="9" fontFamily="monospace">10 KM RADIUS</text>

              {/* Geofence Glow */}
              <circle
                cx="300"
                cy="190"
                r={bufferFilter === '5km' ? 70 : bufferFilter === '10km' ? 140 : 175}
                fill="url(#clusterPulse)"
                stroke="#4ade80"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />

              {/* Road Lines */}
              <path d="M 60 50 Q 200 130 300 190 T 520 310" fill="none" stroke="#415245" strokeWidth="3" strokeDasharray="5 3" />

              {/* Center Pin: Rampur Kalan BMC */}
              <g className="cursor-pointer" onClick={() => setSelectedPin('hub')}>
                <circle cx="300" cy="190" r="15" fill="#00450d" stroke="#4ade80" strokeWidth="2.5" />
                <circle cx="300" cy="190" r="5" fill="#ffffff" />
                <text x="300" y="218" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Rampur Kalan BMC (Center)
                </text>
              </g>

              {/* Pin 2: Parag BMC 3.2km */}
              <g className="cursor-pointer" onClick={() => setSelectedPin('parag')}>
                <circle cx="240" cy="130" r="9" fill="#1b5e20" stroke="#acf4a4" strokeWidth="1.5" />
                <text x="240" y="115" fill="#ffffff" fontSize="9" textAnchor="middle">Parag BMC (3.2 km)</text>
              </g>

              {/* Pin 3: Kisan Cold Chain 4.8km */}
              <g className="cursor-pointer" onClick={() => setSelectedPin('kisan')}>
                <circle cx="370" cy="140" r="9" fill="#49607c" stroke="#d1e4ff" strokeWidth="1.5" />
                <text x="370" y="125" fill="#ffffff" fontSize="9" textAnchor="middle">Kisan Cold Chain (4.8 km)</text>
              </g>

              {/* Pin 4: Mohanlalganj Mandi 7.4km */}
              <g className="cursor-pointer" onClick={() => setSelectedPin('mandi')}>
                <circle cx="430" cy="280" r="10" fill="#933100" stroke="#ffb498" strokeWidth="1.5" />
                <text x="430" y="302" fill="#ffffff" fontSize="9" textAnchor="middle">Mohanlalganj Mandi (7.4 km)</text>
              </g>

              {/* Pin 5: Agrifeeder Substation 1.9km */}
              <g className="cursor-pointer" onClick={() => setSelectedPin('substation')}>
                <circle cx="210" cy="230" r="8" fill="#314863" stroke="#b0c9e8" strokeWidth="1.5" />
                <text x="210" y="250" fill="#ffffff" fontSize="8" textAnchor="middle">Substation (1.9 km)</text>
              </g>
            </svg>
          </div>

          {/* Selected Pin Inspector Snippet */}
          <div className="p-4 bg-surface-container-high rounded-2xl border border-surface-variant flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-outline uppercase font-bold">{cmText.panchayatDetails}</span>
              <div className="font-bold text-on-surface text-sm">
                {selectedPin === 'hub' && 'Proposed Rampur Kalan Solar Chilling Unit: 0.0 km (Zero Logistics Friction)'}
                {selectedPin === 'parag' && 'Parag Cooperative BMC: 3.2 km distance, 2,000L existing bulk chilling capacity'}
                {selectedPin === 'kisan' && 'Kisan Cold Chain Hub: 4.8 km distance, multi-commodity solar cold storage'}
                {selectedPin === 'mandi' && 'Mohanlalganj APMC Mandi: 7.4 km via SH-24, prime bulk institutional offtaker'}
                {selectedPin === 'substation' && 'Agrifeeder Substation: 1.9 km distance, dedicated rural power transformer'}
              </div>
              <div className="text-outline text-[11px]">
                {selectedPin === 'hub' && 'Optimal site: adjacent to Gram Panchayat Bhawan with 3-phase connection & open solar roof'}
                {selectedPin === 'parag' && 'Cooperative partner willing to enter long-term off-take escrow agreement'}
                {selectedPin === 'kisan' && 'Offers auxiliary backup chiller lease during peak flush summer seasons'}
                {selectedPin === 'mandi' && 'Connected via PMGSY Stage-2 all-weather blacktop road suitable for tankers'}
                {selectedPin === 'substation' && 'Continuous 19.4 hrs feeder average with automated surge protection'}
              </div>
            </div>
            <button
              onClick={() => onShowToast(`Inspected details for node: ${selectedPin.toUpperCase()}`, 'info')}
              className="px-3 py-1.5 rounded-lg bg-white border border-surface-variant text-primary font-bold whitespace-nowrap ml-4 hover:bg-surface-container-low cursor-pointer"
            >
              Logistics Route
            </button>
          </div>
        </div>

        {/* Right Column: Saturation & Demographics Scorecard (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cluster Saturation & Competitive Density Heatmap */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm font-bold text-on-surface">
                {cmText.saturationIndex}
              </h3>
              <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-0.5 rounded-sm">
                Red Flag Alerts
              </span>
            </div>
            <p className="text-xs text-outline">
              AI-screened saturation to prevent NPA risk from overcrowding rural trades.
            </p>

            <div className="space-y-3 pt-1 text-xs">
              {/* Dairy Processing (18% - Optimal) */}
              <div className="p-3 rounded-xl bg-green-50/80 border border-green-200 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-green-950 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-green-700">check_circle</span>
                    {cmText.recommended}: Dairy Processing & Chilling
                  </span>
                  <span className="text-green-800">18% Saturation (Optimal Fit)</span>
                </div>
                <div className="h-2 w-full bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 w-[18%]"></div>
                </div>
                <span className="text-[10px] text-green-800">High unmet demand; zero chillers in 8.5km radius.</span>
              </div>

              {/* Cattle Feed Production (24% - High Growth) */}
              <div className="p-3 rounded-xl bg-green-50/80 border border-green-200 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-green-950 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-green-700">check_circle</span>
                    Cattle Feed & Mineral Mix
                  </span>
                  <span className="text-green-800">24% Saturation (High Potential)</span>
                </div>
                <div className="h-2 w-full bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 w-[24%]"></div>
                </div>
                <span className="text-[10px] text-green-800">Complements dairy unit; raw straw available locally.</span>
              </div>

              {/* Handloom Weaving (45% - Moderate) */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-amber-950 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-amber-700">warning</span>
                    Handloom & Textile Weaving
                  </span>
                  <span className="text-amber-800">45% Saturation (Moderate)</span>
                </div>
                <div className="h-2 w-full bg-amber-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 w-[45%]"></div>
                </div>
                <span className="text-[10px] text-amber-800">Niche demand; requires direct urban market linkage.</span>
              </div>

              {/* Flour & Rice Milling (82% - HIGH NPA RISK) */}
              <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-rose-950 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-rose-700">cancel</span>
                    {cmText.avoid}: Flour & Rice Milling (Atta Chakki)
                  </span>
                  <span className="text-rose-800">82% (HIGH NPA RISK)</span>
                </div>
                <div className="h-2 w-full bg-rose-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 w-[82%]"></div>
                </div>
                <span className="text-[10px] text-rose-800 font-bold">
                  OVER-SATURATED: 11 existing chakkis within 3km. Bank sanctions restricted.
                </span>
              </div>
            </div>
          </div>

          {/* Demographic & Fiscal Scorecard */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
            <h3 className="font-headline-sm font-bold text-on-surface">
              {cmText.panchayatDetails}
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-surface-container-high rounded-xl">
                <span className="text-outline uppercase text-[10px] font-semibold">Households</span>
                <div className="font-currency-display font-extrabold text-lg text-on-surface mt-0.5">
                  6,420
                </div>
                <span className="text-[10px] text-outline">74% Agri/Dairy workforce</span>
              </div>

              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <span className="text-primary uppercase text-[10px] font-bold">{cmText.milchCattle}</span>
                <div className="font-currency-display font-extrabold text-lg text-primary mt-0.5">
                  1,840
                </div>
                <span className="text-[10px] text-primary">Gir & Murrah Breeds</span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-xl">
                <span className="text-outline uppercase text-[10px] font-semibold">Avg Disposable Income</span>
                <div className="font-currency-display font-bold text-lg text-on-surface mt-0.5">
                  ₹7,850/mo
                </div>
                <span className="text-[10px] text-outline">Strong retail liquidity</span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-xl">
                <span className="text-outline uppercase text-[10px] font-semibold">Financial Nodes</span>
                <div className="font-bold text-base text-on-surface mt-0.5">
                  Aryavart Bank
                </div>
                <span className="text-[10px] text-outline">+ 3 Active CSC Kendras</span>
              </div>
            </div>

            {/* Geotagged Ground Photo Asset */}
            <div className="relative rounded-2xl overflow-hidden border border-surface-variant group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWSQbdndoucDSBhBp9b6rFooNDk5O-BZlPxGxAI3Gu7kgAkhH-pJ7XNYkkFkrIzWb3hlMPzLGs4gAdSzUHVZZQJ1x0j-rx0ELKoW-77oZs7aqKnNEk69ZSkX7Yh3u4yK2735Q9WU41aj2lPaynu--MTl6HBBfmiLOItzkKqVe_1xMEP6Qb5HnbxoNe5W_F36D5x9SVgSpH7BMoeTJniv3LP-yUwKfPG1O7fdZyEHNvat-P__IDXk2C"
                alt="DIC Field Inspector Site Verification"
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white text-xs">
                <div className="flex items-center gap-1 text-primary-fixed text-[10px] font-bold">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Geotagged Site Verification
                </div>
                <div className="font-bold">Proposed Rampur Kalan Panchayat Hub Ground</div>
                <div className="text-[10px] text-white/70">Inspected by DIC Field Officer • 14 Feb 2026</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleExportDossier}
                className="flex-1 py-2.5 px-3 rounded-xl border border-surface-variant hover:border-outline text-xs font-bold text-on-surface transition-colors cursor-pointer"
              >
                {cmText.exportDossier}
              </button>
              <button
                onClick={() => onNavigate('loan-simulator')}
                className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
              >
                Simulate Loan Schemes →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};