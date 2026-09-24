import React, { useState } from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { SIMULATOR_TEXT } from '../data/translations';

interface LoanSimulatorScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const LoanSimulatorScreen: React.FC<LoanSimulatorScreenProps> = ({
  onNavigate,
  currentLanguage,
  onShowToast,
}) => {
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(6);
  const [yieldShock, setYieldShock] = useState<number>(0);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [sanctionedPrincipal] = useState(900000);
  const nominalInterest = 8.0;
  const subsidizedInterest = 5.0; // 3% subvention

  const sText = SIMULATOR_TEXT[currentLanguage] || SIMULATOR_TEXT.en;

  // Calculate live DSCR based on yield shock
  // Base DSCR = 2.20x; at 40% shock it degrades to 1.35x
  const liveDscr = (2.20 - (yieldShock / 100) * 2.1).toFixed(2);
  const quarterlySurplus = Math.round(64000 * (1 - (yieldShock / 100) * 0.75));

  const handleRouteToBank = () => {
    setIsRouting(true);
    onShowToast('Transmitting Sanction Dossier to Lead District Bank (SBI / Aryavart)...', 'info');
    setTimeout(() => {
      setIsRouting(false);
      onShowToast('Sovereign Sanction Confirmed! Case Ref: LDB-UP-LKO-9941', 'success');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-variant">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
            GramMitra Financial Engine NBCFDC-NSFDC V3.4
          </div>
          <h1 className="font-display-lg text-primary tracking-tight">
            {sText.title}
          </h1>
          <p className="text-xs sm:text-sm text-outline">
            {sText.subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdjustModal(true)}
            className="px-4 py-2.5 rounded-xl border border-surface-variant hover:border-outline bg-surface-container-low text-xs font-bold text-on-surface transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>{sText.moratoriumSlider} ({moratoriumMonths} Mo)</span>
          </button>

          <button
            onClick={handleRouteToBank}
            disabled={isRouting}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-headline-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            {isRouting ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                <span>Routing to Bank...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">send_and_archive</span>
                <span>{sText.routeToBank}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4-Tile Stat Bento Cluster */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Principal */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest border border-surface-variant shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
            {sText.principalPaid}
          </span>
          <div className="font-currency-display font-extrabold text-2xl text-primary">
            ₹{sanctionedPrincipal.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-outline">
            90% Concessional Term Loan (DPR: ₹10L)
          </div>
        </div>

        {/* Subsidized Interest Rate */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest border border-surface-variant shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              {sText.concessionalInterest}
            </span>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.2 rounded-sm">
              -3.0% Subvention
            </span>
          </div>
          <div className="font-currency-display font-extrabold text-2xl text-on-surface">
            {subsidizedInterest.toFixed(2)}% <span className="text-xs font-normal text-outline">p.a.</span>
          </div>
          <div className="text-[11px] text-outline line-through decoration-error">
            Nominal Rate: {nominalInterest.toFixed(2)}%
          </div>
        </div>

        {/* Total Tenure */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest border border-surface-variant shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
            Repayment Tenure
          </span>
          <div className="font-currency-display font-extrabold text-2xl text-on-surface">
            7 Years
          </div>
          <div className="text-[11px] text-outline">
            28 Scheduled Harvest Quarters
          </div>
        </div>

        {/* Active Moratorium */}
        <div className="p-5 rounded-3xl bg-surface-container-lowest border-2 border-primary/30 shadow-xs space-y-1 bg-primary/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Active Moratorium
            </span>
            <span className="text-[10px] font-bold text-white bg-primary px-1.5 py-0.2 rounded-sm">
              Statutory
            </span>
          </div>
          <div className="font-currency-display font-extrabold text-2xl text-primary">
            {moratoriumMonths} Months Grace
          </div>
          <div className="text-[11px] text-primary/80 font-medium">
            EMI = ₹0 during herd & solar setup
          </div>
        </div>
      </div>

      {/* Lifecycle Trajectory: Moratorium & Debt Amortization Curve */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-variant shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
              Lifecycle Trajectory
            </span>
            <h2 className="font-headline-sm font-bold text-on-surface mt-0.5">
              {sText.amortizationTable} (Months 0–84)
            </h2>
            <p className="text-xs text-outline">
              Zero debt service during first 6 months stabilization, followed by smooth quarterly harvest amortization.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              Moratorium (Grace)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              Principal Amortization
            </span>
          </div>
        </div>

        {/* Amortization SVG Visual Curve */}
        <div className="relative w-full aspect-21/9 bg-[#0e1610] rounded-2xl overflow-hidden border border-surface-variant p-4">
          <svg className="w-full h-full" viewBox="0 0 700 240">
            <defs>
              <linearGradient id="moratoriumZone" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="repaymentZone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="60" y1="40" x2="680" y2="40" stroke="#1d2d21" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="60" y1="90" x2="680" y2="90" stroke="#1d2d21" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="60" y1="140" x2="680" y2="140" stroke="#1d2d21" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="60" y1="190" x2="680" y2="190" stroke="#1d2d21" strokeWidth="1" />

            {/* Y-Axis Labels */}
            <text x="50" y="45" fill="#718274" fontSize="10" textAnchor="end">₹9.0L</text>
            <text x="50" y="95" fill="#718274" fontSize="10" textAnchor="end">₹6.0L</text>
            <text x="50" y="145" fill="#718274" fontSize="10" textAnchor="end">₹3.0L</text>
            <text x="50" y="195" fill="#718274" fontSize="10" textAnchor="end">₹0</text>

            {/* Moratorium Highlight Rectangle (Months 0-6 = 60 to 140 on x-axis) */}
            <rect x="60" y="40" width="80" height="150" fill="url(#moratoriumZone)" />
            <line x1="140" y1="40" x2="140" y2="190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
            <text x="100" y="30" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
              6-MO GRACE
            </text>

            {/* Amortization Curve: Month 0-6 flat at 9.0L (y=40), then smoothly declining to y=190 at x=680 */}
            <path
              d="M 60 40 L 140 40 C 260 45, 450 110, 680 190"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3.5"
            />
            {/* Area fill under curve */}
            <path
              d="M 60 40 L 140 40 C 260 45, 450 110, 680 190 L 680 190 L 60 190 Z"
              fill="url(#repaymentZone)"
            />

            {/* Milestone Dots */}
            <circle cx="60" cy="40" r="5" fill="#f59e0b" />
            <circle cx="140" cy="40" r="5" fill="#f59e0b" />
            <circle cx="280" cy="65" r="5" fill="#22c55e" />
            <circle cx="480" cy="125" r="5" fill="#22c55e" />
            <circle cx="680" cy="190" r="6" fill="#4ade80" />

            {/* X-Axis labels */}
            <text x="60" y="210" fill="#a4ada3" fontSize="9" textAnchor="middle">M0 (Sanction)</text>
            <text x="140" y="210" fill="#f59e0b" fontSize="9" textAnchor="middle">M6 (Grace End)</text>
            <text x="280" y="210" fill="#a4ada3" fontSize="9" textAnchor="middle">M24 (Yr 2)</text>
            <text x="480" y="210" fill="#a4ada3" fontSize="9" textAnchor="middle">M48 (Yr 4)</text>
            <text x="680" y="210" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">M84 (Debt Free)</text>
          </svg>
        </div>

        {/* 4 Stabilization Milestones Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-surface-container-high rounded-xl border border-surface-variant">
            <span className="text-[10px] font-bold text-outline">MONTH 1</span>
            <div className="font-bold text-on-surface mt-0.5">Machinery Setup</div>
            <p className="text-[11px] text-outline mt-1">Solar PV array installed & testing chilling cycles.</p>
          </div>
          <div className="p-3 bg-surface-container-high rounded-xl border border-surface-variant">
            <span className="text-[10px] font-bold text-outline">MONTH 3</span>
            <div className="font-bold text-on-surface mt-0.5">Herd Procurement</div>
            <p className="text-[11px] text-outline mt-1">6 SHG routes operational; 240 L/day intake.</p>
          </div>
          <div className="p-3 bg-surface-container-high rounded-xl border border-surface-variant">
            <span className="text-[10px] font-bold text-primary">MONTH 6</span>
            <div className="font-bold text-primary mt-0.5">Break-Even Reached</div>
            <p className="text-[11px] text-outline mt-1">Full 500 L/day capacity; healthy cash reserves.</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
            <span className="text-[10px] font-bold text-primary">MONTH 7</span>
            <div className="font-bold text-primary mt-0.5">EMI Ready</div>
            <p className="text-[11px] text-primary/80 mt-1">First quarterly installment ₹40,759 serviced.</p>
          </div>
        </div>
      </div>

      {/* Grid: Seasonal Cashflow Matrix + Agro-Climatic Stress Test */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Seasonal Cashflow Matrix (6 Cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-4">
          <div>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
              Rural Cashflow Alignment
            </span>
            <h3 className="font-headline-sm font-bold text-on-surface mt-0.5">
              Seasonal Harvest Revenue Alignment
            </h3>
            <p className="text-xs text-outline">
              Repayment scheduled to match peak harvest and milk flush liquidity cycles.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block">Q1: Rabi Harvest (Apr – Jun)</span>
                <span className="text-[11px] text-outline">Wheat & Mustard sales create high household buffer</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-primary block">+₹85,000 Surplus</span>
                <span className="text-[10px] text-outline">Post-EMI Liquidity</span>
              </div>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block">Q2: Kharif Sowing (Jul – Sep)</span>
                <span className="text-[11px] text-outline">High fertilizer & seed capex; dairy unit maintains EMI</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-secondary block">+₹22,000 Net</span>
                <span className="text-[10px] text-outline">Protected by Escrow</span>
              </div>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block">Q3: Peak Flush Season (Oct – Dec)</span>
                <span className="text-[11px] text-outline">Winter green fodder drives maximum milk volume</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-primary block">+₹1,15,000 Surplus</span>
                <span className="text-[10px] text-outline">Highest Operating Profit</span>
              </div>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant flex items-center justify-between">
              <div>
                <span className="font-bold text-on-surface block">Q4: Summer Lean Period (Jan – Mar)</span>
                <span className="text-[11px] text-outline">Pivots to high-margin paneer buffer production</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-secondary block">+₹34,000 Net</span>
                <span className="text-[10px] text-outline">Value-Add Sustained</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-between">
            <span className="text-xs font-bold text-primary">Cumulative Annual Net Profit Post-Debt:</span>
            <span className="font-currency-display font-bold text-xl text-primary">₹2,56,000 / yr</span>
          </div>
        </div>

        {/* Right Column: Agro-Climatic Stress Test & DSCR Resiliency (6 Cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-3xl p-6 border border-surface-variant shadow-sm space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-error uppercase tracking-wider">
                {sText.stressSlider}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-surface-container-high text-outline">
                RBI Parametric Model
              </span>
            </div>
            <h3 className="font-headline-sm font-bold text-on-surface mt-0.5">
              {sText.stressSlider} & DSCR
            </h3>
            <p className="text-xs text-outline">
              Simulate climatic shocks (drought, fodder inflation, disease) on loan viability.
            </p>
          </div>

          {/* Shock Slider */}
          <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-on-surface">{sText.stressSlider}:</span>
              <span className="font-mono font-bold text-error text-base">{yieldShock}% Shock</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={5}
              value={yieldShock}
              onChange={(e) => setYieldShock(Number(e.target.value))}
              className="w-full accent-error h-2 bg-surface-variant rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-outline">
              <span>0% (Optimal Weather)</span>
              <span>20% (Moderate Heatwave)</span>
              <span>40% (Extreme Deficit)</span>
            </div>
          </div>

          {/* Reactive DSCR Scorecard */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-surface-container-high rounded-2xl border border-surface-variant space-y-1">
              <span className="text-[10px] text-outline uppercase font-semibold">
                {sText.liveDscr}
              </span>
              <div className="font-currency-display font-extrabold text-2xl text-primary">
                {liveDscr}x
              </div>
              <div className="text-[10px] text-green-700 font-bold">
                {Number(liveDscr) >= 1.5 ? 'Strong Buffer (>1.5x)' : 'Adequate (>1.2x Benchmark)'}
              </div>
            </div>

            <div className="p-4 bg-surface-container-high rounded-2xl border border-surface-variant space-y-1">
              <span className="text-[10px] text-outline uppercase font-semibold">
                {sText.quarterlySurplus}
              </span>
              <div className="font-currency-display font-extrabold text-2xl text-on-surface">
                ₹{quarterlySurplus.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-outline">
                Quarterly Cushion post-EMI
              </div>
            </div>
          </div>

          {/* Escrow Safety Protocols */}
          <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-variant space-y-2 text-xs">
            <div className="font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">shield</span>
              Statutory Escrow Safety Protocols Active
            </div>
            <ul className="space-y-1 text-outline text-[11px] pl-5 list-disc">
              <li>Automatic 30-day emergency grace trigger in event of certified district drought.</li>
              <li>Tri-Lingual SMS & IVR advisory sent 15 days before harvest quarter installment.</li>
              <li>Local CSC / VLE operator performs physical doorstep reconciliation.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Field Operations Setup Tracker with 3 Geotagged Nodal Inspection Photos */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-variant shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Ground Readiness
            </span>
            <h3 className="font-headline-sm font-bold text-on-surface">
              {sText.equipmentCatalog}
            </h3>
            <p className="text-xs text-outline">
              Verified ground assets pre-allocated for Rampur Kalan chilling facility.
            </p>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            3 of 3 Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Asset 1: Bulk Milk Cooler */}
          <div className="rounded-2xl overflow-hidden border border-surface-variant bg-surface-container-low group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5jw4L3-O5wTPLy6pHdLjJTh6uOHCcjab9yLNVjjjobHG4RCjXV355C12QdDIlade481a9us4THjCq16noZTJO5eeXSXksOzIMIrqtFtdvCk9R8g98NIBsO9nzKnYnuZSEdgv6rInYkXZLcTU9OKBx-T8oIqkj9FhNDdybeWzsGTE6kkZ3vsB-AcV-GkieU4KJzjfHHla1nL5XTAE5iWomfdbzVAF_YrFEEVMDt0_IfxaTRzm2LgiE"
              alt="Bulk Milk Cooler Tank"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">Bulk Milk Chilling Tank (1000L)</span>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded-sm">Verified</span>
              </div>
              <p className="text-[11px] text-outline">SS-304 food-grade stainless tank with direct expansion compressor.</p>
            </div>
          </div>

          {/* Asset 2: High-Yield Cattle Herd */}
          <div className="rounded-2xl overflow-hidden border border-surface-variant bg-surface-container-low group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVBQZDtscrH8US-qq4yQT3v7_pl1dHtaagGPrO9WDMODS0nfi03KlDjYesDduc4wQCwZInctQcNbWqOuLzEFxit_kFADmEnpCJHekwVsXiRDPLda8_FmADPGP0k8ol3CWkQ3C9k60C-A6fxpyFezJRzbBdazg7HqxbIdi3e6rxRP7WHaqov-i9TQaTPl4Bl9u7YjtY8g1jljmD7VxdCHGqEx1EKOueMYydnlRSYWqLHXH7UAnnzpm5"
              alt="High-Yield Cattle Herd"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">10 High-Yield Cows (Gir & Murrah)</span>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded-sm">Ear-Tagged</span>
              </div>
              <p className="text-[11px] text-outline">INAPH sovereign digital cattle registry with veterinary immunization.</p>
            </div>
          </div>

          {/* Asset 3: Solar PV Rooftop Array */}
          <div className="rounded-2xl overflow-hidden border border-surface-variant bg-surface-container-low group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA60OscTPxvANp-5vyLObrdXGjKHUEb-NNZVxazwyQ_C4wB753n7-maAXSz7k3v1JnGYFwZWHW6FMvROuIfCaOjWjhEJ1HuGHgiIqoEN5Av4Jts8ptopxIGheJdLgwPartl9hsXoZ1k5v02T4ejt5xm_-iV8e-H54bdhrdvedATtzRWlCFq3OxD-rt8SVnMVge6cWQzihBTkjH2mnge_IzDMDj8UkFUyetdFRvCIiOwrLw5ZR0ywqJI"
              alt="5kW Solar PV Rooftop Array"
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">5kW Off-Grid Solar Array</span>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded-sm">Commissioned</span>
              </div>
              <p className="text-[11px] text-outline">Mono PERC panels with Lithium battery storage for zero diesel running.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Adjust Moratorium Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-variant space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
              <h3 className="font-headline-sm font-bold text-on-surface">
                {sText.moratoriumSlider}
              </h3>
              <button
                onClick={() => setShowAdjustModal(false)}
                className="p-1 rounded-full hover:bg-surface-container-high text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-outline">
              Select the initial grace period before the first quarterly installment becomes due:
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[3, 6, 9].map((m) => (
                <button
                  key={m}
                  onClick={() => setMoratoriumMonths(m)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                    moratoriumMonths === m
                      ? 'border-primary bg-primary text-white shadow-xs'
                      : 'border-surface-variant hover:border-outline text-on-surface'
                  }`}
                >
                  <div className="font-bold text-base">{m} Months</div>
                  <div className="text-[10px] opacity-80">{m === 6 ? 'Statutory Standard' : m < 6 ? 'Fast Track' : 'Extended'}</div>
                </button>
              ))}
            </div>

            <div className="p-3 bg-surface-container-high rounded-xl text-xs text-outline">
              During the {moratoriumMonths}-month grace period, no principal repayment is required. Simple interest is offset by direct DBT interest subvention.
            </div>

            <button
              onClick={() => {
                onShowToast(`Updated Moratorium to ${moratoriumMonths} Months`, 'success');
                setShowAdjustModal(false);
              }}
              className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-container transition-colors cursor-pointer"
            >
              Apply Calibration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
