import React, { useState } from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { CALCULATOR_TEXT } from '../data/translations';

interface CalculatorScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
  onNavigate,
  currentLanguage,
  onShowToast,
}) => {
  const [promoterEquity, setPromoterEquity] = useState<number>(100000);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cText = CALCULATOR_TEXT[currentLanguage] || CALCULATOR_TEXT.en;

  // Dynamic calculations based on 1:10 Statutory Leverage
  const totalProject = promoterEquity * 10;
  const loanPrincipal = promoterEquity * 9;
  
  // Scheme selection threshold
  const isMicroFinance = totalProject <= 140000;
  const schemeName = isMicroFinance
    ? 'NSFDC / NBCFDC Micro Finance Scheme'
    : 'NBCFDC Term Loan Scheme (General Apex Channel)';
  const interestRate = isMicroFinance ? 4.0 : 5.0; // Effective subsidized
  const tenureYears = isMicroFinance ? 3 : 7;
  const moratoriumMonths = 6;
  const repaymentQuarters = (tenureYears * 4) - 2; // Minus 2 quarters of moratorium

  // Approximate quarterly EMI
  const quarterlyInterestRate = (interestRate / 100) / 4;
  const quarterlyEmi = Math.round(
    (loanPrincipal * quarterlyInterestRate * Math.pow(1 + quarterlyInterestRate, repaymentQuarters)) /
    (Math.pow(1 + quarterlyInterestRate, repaymentQuarters) - 1)
  );

  const interestSaved = Math.round(loanPrincipal * 0.03 * (tenureYears - 0.5));

  // CapEx Breakdown (68% Machinery, 14% Civil, 18% Working Capital)
  const machineryAmount = Math.round(totalProject * 0.68);
  const civilAmount = Math.round(totalProject * 0.14);
  const workingCapitalAmount = Math.round(totalProject * 0.18);

  const quickAnchors = [15000, 50000, 100000, 250000, 500000];

  const handleVoiceListen = () => {
    setIsListeningVoice(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = currentLanguage === 'en'
        ? `On your margin of ${promoterEquity.toLocaleString('en-IN')} rupees, the total project outlay is ${totalProject.toLocaleString('en-IN')} rupees and concessional loan is ${loanPrincipal.toLocaleString('en-IN')} rupees. Quarterly EMI is ${quarterlyEmi.toLocaleString('en-IN')} rupees.`
        : `आपके ${promoterEquity.toLocaleString('en-IN')} रुपये के मार्जिन पर, कुल परियोजना लागत ${totalProject.toLocaleString('en-IN')} रुपये और रियायती ऋण ${loanPrincipal.toLocaleString('en-IN')} रुपये स्वीकृत होता है। त्रैमासिक ईएमआई ${quarterlyEmi.toLocaleString('en-IN')} रुपये होगी।`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
      utterance.onend = () => setIsListeningVoice(false);
      utterance.onerror = () => setIsListeningVoice(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsListeningVoice(false), 2000);
    }
    onShowToast(cText.voiceCalculate, 'info');
  };

  const handleSubmitToSca = () => {
    setIsSubmitting(true);
    onShowToast('Transmitting Bankable Dossier to SCA & Aryavart Bank Nodal Desk...', 'info');
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('Dossier successfully registered! Forwarded to Repayment Simulator.', 'success');
      onNavigate('loan-simulator');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-variant">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-sm">hub</span>
            MoSJE Statutory DBT Engine: Live DPR Router v4.2
          </div>
          <h1 className="font-display-lg text-primary tracking-tight">
            {cText.title}
          </h1>
          <p className="text-xs sm:text-sm text-outline">
            {cText.subtitle}
          </p>
        </div>

        {/* Voice Sahayak button */}
        <button
          onClick={handleVoiceListen}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shadow-xs cursor-pointer ${
            isListeningVoice
              ? 'bg-error text-white border-error animate-pulse'
              : 'bg-surface-container-lowest text-primary border-primary/30 hover:bg-primary/5'
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {isListeningVoice ? 'record_voice_over' : 'mic'}
          </span>
          <span>{isListeningVoice ? 'Voice Active...' : cText.voiceCalculate}</span>
        </button>
      </div>

      {/* Main Two-Column Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input + 1:10 Multiplier Output (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Equity Margin Input Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-variant shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">
                  Mandatory Promoter Equity
                </span>
                <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
                  10% Statutory Minimum
                </span>
              </div>
              <h2 className="font-headline-sm font-bold text-on-surface mt-1">
                {cText.promoterEquityInput}
              </h2>
            </div>

            {/* Input with Quick Chips */}
            <div className="space-y-3">
              <div className="relative flex items-center">
                <span className="absolute left-4 font-currency-display font-bold text-outline text-xl">
                  ₹
                </span>
                <input
                  type="number"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={promoterEquity}
                  onChange={(e) => setPromoterEquity(Math.max(10000, Number(e.target.value)))}
                  className="w-full pl-10 pr-4 py-3.5 bg-surface-container-low border border-surface-variant rounded-2xl font-currency-display font-extrabold text-2xl text-on-surface focus:border-primary focus:bg-white outline-hidden"
                />
              </div>

              {/* Quick Anchor Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-outline font-medium mr-1">{cText.quickPicks}:</span>
                {quickAnchors.map((anchor) => (
                  <button
                    key={anchor}
                    onClick={() => setPromoterEquity(anchor)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      promoterEquity === anchor
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                    }`}
                  >
                    ₹{anchor.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* 1:10 Leverage Formula Display */}
            <div className="p-4 rounded-2xl bg-surface-container-high/60 border border-surface-variant space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-outline">Statutory 1:10 Leverage Calculation</span>
                <span className="text-primary font-mono">10% Margin → 90% Loan</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-white rounded-xl border border-surface-variant shadow-xs">
                  <span className="text-[10px] text-outline font-bold uppercase">{cText.totalOutlayCard}</span>
                  <div className="font-currency-display font-extrabold text-xl text-on-surface mt-0.5">
                    ₹{totalProject.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-secondary font-medium">10x Equity Multiplier</span>
                </div>

                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-xs">
                  <span className="text-[10px] text-primary font-bold uppercase">{cText.concessionalLoanCard}</span>
                  <div className="font-currency-display font-extrabold text-xl text-primary mt-0.5">
                    ₹{loanPrincipal.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-primary font-medium">Sovereign Concession</span>
                </div>
              </div>

              {/* Direct Interest Subvention Applied Banner */}
              <div className="flex items-center justify-between p-2.5 bg-green-50 rounded-xl border border-green-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-green-900">
                  <span className="material-symbols-outlined text-base text-primary">verified</span>
                  3.0% Direct Interest Subvention Applied
                </div>
                <span className="font-mono text-xs font-bold text-primary">
                  Net: {interestRate.toFixed(1)}% p.a.
                </span>
              </div>
            </div>

            {/* Normative CapEx Breakdown Allocation Matrix */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                  {cText.capitalExpenditure}
                </h3>
                <span className="text-[11px] text-outline font-mono">MoSJE Standard Norms</span>
              </div>

              <div className="space-y-2.5">
                {/* Machinery & Solar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-surface">{cText.machinery} (68%)</span>
                    <span className="font-mono text-primary font-bold">₹{machineryAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[68%]"></div>
                  </div>
                  <span className="text-[10px] text-outline">500L Milk Tank, 5kW Off-Grid Solar Array, BMC Compressor</span>
                </div>

                {/* Civil Infrastructure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-surface">{cText.civil} (14%)</span>
                    <span className="font-mono text-secondary font-bold">₹{civilAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[14%]"></div>
                  </div>
                  <span className="text-[10px] text-outline">Insulated shed, water purification dock, stainless drainage</span>
                </div>

                {/* Working Capital */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-surface">{cText.workingCapital} (18%)</span>
                    <span className="font-mono text-tertiary-container font-bold">₹{workingCapitalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-container w-[18%]"></div>
                  </div>
                  <span className="text-[10px] text-outline">Fat/SNF analyzers, initial 15-day milk advance buffer, testing reagents</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scheme Auto-Selection Engine & Repayment Preview (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Automated Scheme Dispatch Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-variant shadow-sm space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                Automated Dispatch Engine
              </div>
              <h2 className="font-headline-sm font-bold text-on-surface mt-1">
                {cText.schemeTitle}
              </h2>
              <p className="text-xs text-outline">
                Dynamically routes application to optimal statutory channel based on DPR quantum.
              </p>
            </div>

            {/* Selected Scheme Badge */}
            <div className="p-4 rounded-2xl bg-linear-to-br from-primary/10 to-surface-container-low border-2 border-primary/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {cText.schemeTitle}
                </span>
                <span className="text-xs font-bold text-white bg-primary px-2.5 py-0.5 rounded-full">
                  Zero Collateral
                </span>
              </div>
              <div className="font-headline-md font-bold text-primary">
                {schemeName}
              </div>
              <p className="text-xs text-outline leading-relaxed">
                {isMicroFinance
                  ? 'Designed for micro grassroots enterprises up to ₹1.40 Lakh. Minimal paperwork via local SHG federations.'
                  : 'Apex sovereign credit conduit for rural backward classes and scheduled caste entrepreneurs up to ₹50 Lakh with quarterly debt servicing.'}
              </p>
            </div>

            {/* Scheme Parameter Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-surface-container-high rounded-xl border border-surface-variant">
                <span className="text-[10px] text-outline uppercase font-semibold">Subsidized Interest</span>
                <div className="font-currency-display font-bold text-primary text-base mt-0.5">
                  {interestRate.toFixed(2)}% p.a.
                </div>
                <span className="text-[10px] text-outline">Statutory DBT</span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-xl border border-surface-variant">
                <span className="text-[10px] text-outline uppercase font-semibold">{cText.tenureMonths} / {cText.gracePeriod}</span>
                <div className="font-currency-display font-bold text-on-surface text-base mt-0.5">
                  {tenureYears} Yrs / 6M
                </div>
                <span className="text-[10px] text-outline">Grace Period</span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-xl border border-surface-variant col-span-2 sm:col-span-1">
                <span className="text-[10px] text-outline uppercase font-semibold">Credit Guarantee</span>
                <div className="font-currency-display font-bold text-secondary text-base mt-0.5">
                  85% CGTMSE
                </div>
                <span className="text-[10px] text-outline">Sovereign Backed</span>
              </div>
            </div>

            {/* Cashflow Aligned Repayment Preview */}
            <div className="p-5 bg-surface-container-low rounded-2xl border border-surface-variant space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                    {cText.quarterlyEmiCard}
                  </span>
                  <div className="font-currency-display font-extrabold text-2xl text-primary mt-0.5">
                    ₹{quarterlyEmi.toLocaleString('en-IN')} <span className="text-xs font-normal text-outline">/ quarter</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-outline font-semibold">Total Quotas</span>
                  <div className="font-bold text-on-surface text-sm">{repaymentQuarters} Quarters</div>
                  <span className="text-[10px] text-green-700 font-bold">Post 6-Mo Moratorium</span>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-variant flex items-center justify-between text-xs text-outline">
                <span>{cText.interestSavedCard}:</span>
                <span className="font-mono font-bold text-primary">+₹{interestSaved.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Repayment Modal Trigger */}
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-surface-variant hover:border-outline bg-surface-container-high text-xs font-bold text-on-surface transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-primary">calendar_month</span>
              <span>{cText.repaymentSchedule}</span>
            </button>

            {/* Submission Action */}
            <button
              onClick={handleSubmitToSca}
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-container text-white font-headline-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Transmitting to Aryavart Nodal Bank...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">send</span>
                  <span>{cText.submitDpr}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Quarterly Harvest Repayment Simulator Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-surface-variant max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface">
                  {cText.repaymentSchedule}
                </h3>
                <p className="text-xs text-outline">
                  Sanctioned Principal: ₹{loanPrincipal.toLocaleString('en-IN')} @ {interestRate.toFixed(1)}% Subsidized
                </p>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-1.5 rounded-full hover:bg-surface-container-high text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">hourglass_top</span>
                <span>
                  <strong>Months 1–6 (Q1 & Q2):</strong> Full Statutory Moratorium active. EMI is ₹0 while equipment stabilizes and milk aggregation commences.
                </span>
              </div>

              {/* Sample Quotas */}
              <div className="space-y-2 text-xs">
                {[
                  { quarter: 'Q1 (Months 1-3)', period: 'Setup Period', emi: 0, status: 'Moratorium (Grace)' },
                  { quarter: 'Q2 (Months 4-6)', period: 'Trail Chilling', emi: 0, status: 'Moratorium (Grace)' },
                  { quarter: 'Q3 (Month 9)', period: 'Kharif Harvest Flush', emi: quarterlyEmi, status: 'First Installment' },
                  { quarter: 'Q4 (Month 12)', period: 'Winter Peak Flush', emi: quarterlyEmi, status: 'Regular EMI' },
                  { quarter: 'Q5 (Month 15)', period: 'Rabi Harvest Flush', emi: quarterlyEmi, status: 'Regular EMI' },
                  { quarter: 'Q6 (Month 18)', period: 'Summer Lean Period', emi: quarterlyEmi, status: 'Regular EMI' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-variant"
                  >
                    <div>
                      <span className="font-bold text-on-surface block">{item.quarter}</span>
                      <span className="text-[11px] text-outline">{item.period}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-on-surface block">
                        ₹{item.emi.toLocaleString('en-IN')}
                      </span>
                      <span className={`text-[10px] font-semibold ${item.emi === 0 ? 'text-amber-800' : 'text-primary'}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center text-xs text-outline pt-2">
                + Remaining 22 Quarters amortized through Year 7 with automatic harvest cashflow adjustment.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-variant">
              <button
                onClick={() => {
                  onShowToast('Amortization Slip downloaded as verified PDF', 'success');
                  setShowScheduleModal(false);
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-container transition-colors cursor-pointer"
              >
                Download Official Schedule PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
