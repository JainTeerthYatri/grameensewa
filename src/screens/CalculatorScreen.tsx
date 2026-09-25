import React, { useState } from 'react';
import { ScreenType, SupportedLanguage } from '../types';

interface CalculatorScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface SchemeInfo {
  id: string;
  nameHi: string;
  nameEn: string;
  subsidyPct: number;
  maxSubsidy: number; // in INR
  minProject: number;
  maxProject: number;
  interestRate: number; // approximate effective %
  tenureYears: number;
  collateralFree: boolean;
  descHi: string;
  descEn: string;
  profitImpactHi: string;
  profitImpactEn: string;
  badge: string;
}

interface BankOffer {
  id: string;
  bankName: string;
  loanNameHi: string;
  loanNameEn: string;
  interestRate: number; // Annual %
  processingFeePct: number; // %
  maxTenureYears: number;
  turnaroundTime: string;
  collateralReq: string;
  featuresHi: string[];
  featuresEn: string[];
  logoBg: string;
  tag?: string;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
  onNavigate,
  currentLanguage,
  onShowToast,
}) => {
  const isHindi = currentLanguage === 'hi';

  // Active Tab inside the Financial & Business Planning Suite
  const [activeTab, setActiveTab] = useState<'subsidy' | 'banks' | 'profit' | 'emi'>('subsidy');

  // Core Financial Calculator State
  const [projectCost, setProjectCost] = useState<number>(500000);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('pmegp');
  const [selectedBankId, setSelectedBankId] = useState<string>('hdfc');
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);
  const [extraPrepaymentMonthly, setExtraPrepaymentMonthly] = useState<number>(1000);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Business Feasibility & Profit Checker State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(120000);
  const [rawMaterialCostPct, setRawMaterialCostPct] = useState<number>(45);
  const [monthlyRentElectricity, setMonthlyRentElectricity] = useState<number>(8000);
  const [monthlyLaborWages, setMonthlyLaborWages] = useState<number>(12000);
  const [monthlyOtherExpenses, setMonthlyOtherExpenses] = useState<number>(4000);

  // Active Real Government & Industry Subsidy Schemes
  const schemes: SchemeInfo[] = [
    {
      id: 'pmegp',
      nameHi: 'PMEGP ग्रामीण रोजगार सृजन (35% सब्सिडी)',
      nameEn: 'PMEGP Prime Minister Rural Subsidy (35% Grant)',
      subsidyPct: 35,
      maxSubsidy: 1750000,
      minProject: 100000,
      maxProject: 5000000,
      interestRate: 9.0,
      tenureYears: 5,
      collateralFree: true,
      descHi: 'ग्रामीण क्षेत्रों में नए विनिर्माण व सेवा उद्योग के लिए 35% सीधी सरकारी सब्सिडी। स्वयं का मार्जिन केवल 5% से 10%।',
      descEn: 'Up to 35% direct government capital subsidy for rural new enterprises. Promoter margin only 5% to 10%.',
      profitImpactHi: '₹5 लाख के प्रोजेक्ट पर ₹1.75 लाख सरकार माफ करेगी, आपको सिर्फ ₹3.25 लाख बैंक को चुकाने होंगे!',
      profitImpactEn: 'On a ₹5 Lakh project, government pays ₹1.75 Lakh grant directly to your bank account!',
      badge: isHindi ? 'सबसे लोकप्रिय 35%' : 'Top 35% Subsidy',
    },
    {
      id: 'mudra_kishor',
      nameHi: 'PM मुद्रा योजना - किशोर (0% गारंटी लोन)',
      nameEn: 'PM Mudra Yojana - Kishor (Zero Collateral)',
      subsidyPct: 0,
      maxSubsidy: 0,
      minProject: 50000,
      maxProject: 500000,
      interestRate: 9.25,
      tenureYears: 5,
      collateralFree: true,
      descHi: 'दुकान, किराना, हार्डवेयर व छोटे व्यवसाय के लिए ₹50,000 से ₹5,00,000 तक बिना किसी जमीन या संपत्ति की गारंटी के लोन।',
      descEn: 'Collateral-free micro loans from ₹50k to ₹5 Lakh for village shopkeepers, trading and service units.',
      profitImpactHi: 'कोई बंधक संपत्ति नहीं, तुरंत कम ब्याज पर बैंक खाता चालू करके व्यापार बढ़ाएं।',
      profitImpactEn: 'Zero mortgage needed, fast bank sanction to boost business cash flow.',
      badge: isHindi ? '0% गारंटी' : 'Zero Collateral',
    },
    {
      id: 'mudra_tarun',
      nameHi: 'PM मुद्रा योजना - तरुण (5 लाख से 10/20 लाख)',
      nameEn: 'PM Mudra Yojana - Tarun (₹5L to ₹10L/20L)',
      subsidyPct: 0,
      maxSubsidy: 0,
      minProject: 500000,
      maxProject: 1000000,
      interestRate: 9.5,
      tenureYears: 7,
      collateralFree: true,
      descHi: 'चलते हुए व्यवसाय को बड़ा करने, नई मशीनें खरीदने व विस्तार हेतु ₹10 लाख (विस्तारित ₹20 लाख तक) का लोन।',
      descEn: 'Working capital and machinery expansion loan for growing businesses up to ₹10-20 Lakh.',
      profitImpactHi: '7 साल की लंबी अवधि जिससे हर महीने की किस्त (EMI) बहुत कम आती है।',
      profitImpactEn: 'Extended 7-year tenure keeps monthly EMI low and manageable.',
      badge: isHindi ? 'विस्तार हेतु' : 'Expansion',
    },
    {
      id: 'pm_vishwakarma',
      nameHi: 'PM विश्वकर्मा योजना (5% रियायती ब्याज + ₹15k टूलकिट)',
      nameEn: 'PM Vishwakarma (5% Concessional + ₹15k Toolkit)',
      subsidyPct: 15,
      maxSubsidy: 45000,
      minProject: 100000,
      maxProject: 300000,
      interestRate: 5.0,
      tenureYears: 3,
      collateralFree: true,
      descHi: 'लोहार, बढ़ई, राजमिस्त्री, दर्जी, कुम्हार व 18 पारंपरिक व्यवसायों के लिए मात्र 5% ब्याज पर ₹3 लाख तक ऋण व ₹15,000 टूलकिट ग्रांट।',
      descEn: 'Subsidized 5% interest rate loan up to ₹3 Lakh with ₹15,000 free toolkit incentive for rural artisans.',
      profitImpactHi: 'बाजार के 12% ब्याज की जगह सिर्फ 5% ब्याज, ₹15,000 की मशीनरी मुफ्त!',
      profitImpactEn: 'Save 7% in annual interest plus get ₹15,000 modern tool incentive free.',
      badge: isHindi ? 'मात्र 5% ब्याज' : '5% Lowest Rate',
    },
    {
      id: 'pmfme',
      nameHi: 'PMFME खाद्य प्रसंस्करण योजना (35% सब्सिडी)',
      nameEn: 'PMFME Food Processing Scheme (35% Subsidy)',
      subsidyPct: 35,
      maxSubsidy: 1000000,
      minProject: 200000,
      maxProject: 3000000,
      interestRate: 9.15,
      tenureYears: 6,
      collateralFree: true,
      descHi: 'आटा चक्की, तेल एक्सपेलर, मसाला उद्योग, पापड़, बेकरी, अचार व डेयरी उत्पादों के लिए 35% (अधिकतम 10 लाख) सरकारी सहायता।',
      descEn: '35% capital subsidy up to ₹10 Lakh for flour mills, oil expellers, spice processing & agro-food units.',
      profitImpactHi: 'मशीनरी की 35% लागत सरकार द्वारा वहन की जाती है, जिससे मुनाफा पहले महीने से 40% बढ़ जाता है।',
      profitImpactEn: 'Direct 35% cost reduction on high-grade machinery directly boosts net operating margins.',
      badge: isHindi ? 'फूड प्रोसेसिंग 35%' : 'Food Agro 35%',
    },
    {
      id: 'nabard_dairy',
      nameHi: 'NABARD डेयरी व पशुधन अवसंरचना (25-33% सब्सिडी)',
      nameEn: 'NABARD Dairy & Animal Husbandry (AHIDF)',
      subsidyPct: 33.33,
      maxSubsidy: 1200000,
      minProject: 300000,
      maxProject: 4000000,
      interestRate: 8.9,
      tenureYears: 7,
      collateralFree: false,
      descHi: 'बल्क मिल्क कूलर, डेयरी फार्मिंग, पोल्ट्री व पशु आहार संयत्र हेतु नाबार्ड द्वारा 25% से 33.33% पूंजीगत सब्सिडी + 3% ब्याज छूट।',
      descEn: 'Capital subsidy up to 33.33% and 3% interest subvention for bulk milk coolers and poultry infrastructure.',
      profitImpactHi: '3% ब्याज छूट और 33% अनुदान से डेयरी प्लांट 18 महीने में पूरा कर्ज मुक्त हो जाता है।',
      profitImpactEn: 'Combined 3% interest subvention and 33% capital grant makes dairy break-even within 18 months.',
      badge: isHindi ? 'डेयरी व नाबार्ड' : 'NABARD Dairy',
    },
  ];

  // Real Bank Loan Rates & Best Recommendation Comparison
  const bankOffers: BankOffer[] = [
    {
      id: 'hdfc',
      bankName: 'HDFC Bank',
      loanNameHi: 'HDFC व्यापार व रूरल SME मुद्रा लोन',
      loanNameEn: 'HDFC Vyapar & Rural SME Mudra Loan',
      interestRate: 9.25,
      processingFeePct: 0.50,
      maxTenureYears: 7,
      turnaroundTime: isHindi ? '48 घंटे में डिजिटल स्वीकृति' : '48-hr Digital Sanction',
      collateralReq: isHindi ? '10 लाख तक शून्य गारंटी' : 'Zero Collateral up to ₹10L',
      featuresHi: ['न्यूनतम कागजी कार्रवाई', 'PMEGP व मुद्रा दोनों सपोर्ट', 'ऑनलाइन खाता व QR साउंडबॉक्स मुफ्त'],
      featuresEn: ['Minimal physical paperwork', 'Instant PMEGP & Mudra link', 'Complimentary QR soundbox'],
      logoBg: 'bg-blue-900',
      tag: isHindi ? '⭐ सबसे तेज अप्रूवल' : '⭐ Fastest Disbursal',
    },
    {
      id: 'icici',
      bankName: 'ICICI Bank',
      loanNameHi: 'ICICI ग्रामीण उद्यम व किसान बिजनेस लोन',
      loanNameEn: 'ICICI Rural Enterprise & Business Credit',
      interestRate: 9.50,
      processingFeePct: 0.75,
      maxTenureYears: 7,
      turnaroundTime: isHindi ? '2 से 3 दिन में वितरण' : '2-3 Days Disbursal',
      collateralReq: isHindi ? 'मुद्रा योजना अंतर्गत शून्य गारंटी' : 'Nil Collateral under Mudra',
      featuresHi: ['प्री-अप्रूव्ड डिजिटल लिमिट', 'ओवरड्राफ्ट (OD) सुविधा उपलब्ध', 'डोरस्टेप बैंकिंग सहायता'],
      featuresEn: ['Pre-approved overdraft limits', 'Flexible cash credit line', 'Doorstep executive support'],
      logoBg: 'bg-orange-800',
      tag: isHindi ? '⭐ ओवरड्राफ्ट सुविधा' : '⭐ Overdraft Support',
    },
    {
      id: 'sbi',
      bankName: 'State Bank of India (SBI)',
      loanNameHi: 'SBI ई-मुद्रा व SME सहज व्यापार ऋण',
      loanNameEn: 'SBI e-Mudra & MSME Sahaj Credit',
      interestRate: 8.65,
      processingFeePct: 0.0,
      maxTenureYears: 5,
      turnaroundTime: isHindi ? '3 से 5 कार्य दिवस' : '3-5 Working Days',
      collateralReq: isHindi ? 'शून्य प्रोसेसिंग फीस (मुद्रा)' : 'Zero Processing Fee (Mudra)',
      featuresHi: ['देश में सबसे कम ब्याज दर', 'शिशु लोन पर 0% प्रोसेसिंग फीस', 'हर ग्राम पंचायत में शाखा'],
      featuresEn: ['Lowest base interest rate', 'Zero processing fee on Shishu', 'Widespread village branches'],
      logoBg: 'bg-sky-800',
      tag: isHindi ? '⭐ सबसे कम ब्याज दर' : '⭐ Lowest Interest Rate',
    },
    {
      id: 'bob',
      bankName: 'Bank of Baroda (BOB)',
      loanNameHi: 'BOB बड़ौदा योद्धा व ग्राम समृद्धि लोन',
      loanNameEn: 'BOB Baroda Gram Samriddhi Loan',
      interestRate: 8.85,
      processingFeePct: 0.50,
      maxTenureYears: 7,
      turnaroundTime: isHindi ? '3 से 4 दिन' : '3-4 Days',
      collateralReq: isHindi ? 'CGTMSE कवर उपलब्ध' : 'CGTMSE Coverage Available',
      featuresHi: ['कृषि आधारित उद्योगों हेतु विशेष छूट', '7 वर्ष तक लंबी चुकौती', 'सरल ब्याज गणना'],
      featuresEn: ['Agro enterprise special rebate', 'Extended 7-year tenure', 'Transparent daily reducing rate'],
      logoBg: 'bg-orange-600',
    },
    {
      id: 'pnb',
      bankName: 'Punjab National Bank (PNB)',
      loanNameHi: 'PNB विकास व ग्रामीण सूक्ष्म उद्यमी ऋण',
      loanNameEn: 'PNB Vikas Rural Micro Enterprise Loan',
      interestRate: 8.90,
      processingFeePct: 0.40,
      maxTenureYears: 7,
      turnaroundTime: isHindi ? '3 से 5 दिन' : '3-5 Days',
      collateralReq: isHindi ? '10 लाख तक कोई बंधक नहीं' : 'No Mortgage up to ₹10L',
      featuresHi: ['सरकारी सब्सिडी क्लेम में सबसे तेज', 'किस्त चुकाने में 6 माह की छूट (Moratorium)', 'कम कागजी खर्च'],
      featuresEn: ['Fastest govt subsidy portal claim', '6-month repayment moratorium', 'Low initial processing'],
      logoBg: 'bg-amber-800',
    },
    {
      id: 'axis',
      bankName: 'Axis Bank',
      loanNameHi: 'Axis स्मॉल बिजनेस व माइक्रो एंटरप्राइज लोन',
      loanNameEn: 'Axis Small Business Banking Loan',
      interestRate: 9.75,
      processingFeePct: 0.75,
      maxTenureYears: 5,
      turnaroundTime: isHindi ? '48 घंटे में' : '48 Hours',
      collateralReq: isHindi ? 'बिना गारंटी डिजिटल लोन' : 'Paperless Digital Loan',
      featuresHi: ['मोबाइल बैंकिंग से तुरंत स्वीकृति', 'UPI आधारित बिजनेस खाता', 'लचीली किस्त तारीख'],
      featuresEn: ['Mobile app instant in-principle sanction', 'UPI auto-sweep current account', 'Flexible EMI dates'],
      logoBg: 'bg-pink-900',
    },
  ];

  const currentScheme = schemes.find((s) => s.id === selectedSchemeId) || schemes[0];
  const currentBank = bankOffers.find((b) => b.id === selectedBankId) || bankOffers[0];

  // Dynamic Financial Calculations
  const calculatedSubsidy = Math.min(
    Math.round((projectCost * currentScheme.subsidyPct) / 100),
    currentScheme.maxSubsidy || projectCost
  );
  const promoterOwnMargin = Math.round(projectCost * 0.10); // 10% own equity
  const netLoanPrincipal = Math.max(projectCost - calculatedSubsidy - promoterOwnMargin, 0);

  // Monthly EMI Calculation Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = currentBank.interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  const calculateEmi = (principal: number, rateMonthly: number, months: number) => {
    if (principal <= 0 || months <= 0) return 0;
    if (rateMonthly === 0) return Math.round(principal / months);
    return Math.round(
      (principal * rateMonthly * Math.pow(1 + rateMonthly, months)) /
        (Math.pow(1 + rateMonthly, months) - 1)
    );
  };

  const regularMonthlyEmi = calculateEmi(netLoanPrincipal, monthlyRate, totalMonths);
  const totalLoanRepaid = regularMonthlyEmi * totalMonths;
  const totalInterestPaid = Math.max(totalLoanRepaid - netLoanPrincipal, 0);

  // Prepayment Savings Math
  const effectiveMonthlyPayment = regularMonthlyEmi + extraPrepaymentMonthly;
  let simulatedBalance = netLoanPrincipal;
  let simulatedMonths = 0;
  let simulatedTotalInterest = 0;

  while (simulatedBalance > 0 && simulatedMonths < 360) {
    simulatedMonths++;
    const monthlyInterest = simulatedBalance * monthlyRate;
    simulatedTotalInterest += monthlyInterest;
    const principalPaid = Math.min(simulatedBalance, effectiveMonthlyPayment - monthlyInterest);
    simulatedBalance -= principalPaid;
    if (simulatedBalance < 1) break;
  }

  const interestSavedWithPrepayment = Math.max(totalInterestPaid - Math.round(simulatedTotalInterest), 0);
  const monthsSaved = Math.max(totalMonths - simulatedMonths, 0);

  // Feasibility & Profit Engine
  const totalMonthlyExpenses =
    Math.round((monthlyRevenue * rawMaterialCostPct) / 100) +
    monthlyRentElectricity +
    monthlyLaborWages +
    monthlyOtherExpenses;
  const grossMonthlyProfit = monthlyRevenue - totalMonthlyExpenses;
  const netProfitAfterEmi = grossMonthlyProfit - regularMonthlyEmi;
  const netProfitMarginPct = monthlyRevenue > 0 ? Math.round((netProfitAfterEmi / monthlyRevenue) * 100) : 0;
  const breakEvenMonths = netProfitAfterEmi > 0 ? Math.ceil(promoterOwnMargin / netProfitAfterEmi) : 99;

  // Best Recommended Bank Algorithm: Lowest Total Interest
  const bestBankMatch = [...bankOffers].sort((a, b) => a.interestRate - b.interestRate)[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 pb-24">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-900/60">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-bold text-emerald-300">
              <span className="material-symbols-outlined text-sm">account_balance</span>
              {isHindi ? '📍 मॉड्यूल 2: लोन, सब्सिडी, बैंक ऑफर्स व प्रॉफिट प्लानर' : '📍 Module 2: Loans, Subsidies, Banks & Profit Planner'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {isHindi
                ? 'सरकारी सब्सिडी, बेस्ट बैंक लोन व EMI कैलकुलेटर'
                : 'All-in-One Loan Subsidies, Bank Offers & EMI Suite'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isHindi
                ? 'PMEGP, मुद्रा, PM विश्वकर्मा सब्सिडी की लाइव गणना करें, HDFC, ICICI, SBI बैंकों के रियल टाइम ब्याज दर की तुलना करें और अपने व्यवसाय का शुद्ध मासिक मुनाफा देखें।'
                : 'Real-time calculations for PMEGP, Mudra & PMFME subsidies, live rate comparisons from HDFC, ICICI, SBI, and integrated monthly profit & EMI schedule.'}
            </p>
          </div>

          {/* Quick Summary Pill */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-row lg:flex-col gap-4 text-center shrink-0">
            <div>
              <div className="text-[11px] text-emerald-300 font-bold uppercase">
                {isHindi ? 'अनुमानित सब्सिडी ग्रांट' : 'Eligible Subsidy'}
              </div>
              <div className="text-2xl font-black text-amber-300">
                ₹{calculatedSubsidy.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="border-l lg:border-l-0 lg:border-t border-white/15 pl-4 lg:pl-0 lg:pt-3">
              <div className="text-[11px] text-stone-400 font-bold uppercase">
                {isHindi ? 'मासिक EMI किस्त' : 'Monthly EMI'}
              </div>
              <div className="text-xl font-black text-white">
                ₹{regularMonthlyEmi.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-stone-400">/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-2">
          {[
            { id: 'subsidy', labelHi: '1. सरकारी सब्सिडी योजनाएं', labelEn: '1. Govt Subsidies (35%)', icon: 'savings' },
            { id: 'banks', labelHi: '2. बैंक लोन तुलना (HDFC, ICICI, SBI)', labelEn: '2. Top Bank Loan Offers', icon: 'account_balance' },
            { id: 'profit', labelHi: '3. बिजनेस प्लान व मुनाफा चेक', labelEn: '3. Business Profit Checker', icon: 'analytics' },
            { id: 'emi', labelHi: '4. EMI व किस्त रिपेमेंट हेल्पर', labelEn: '4. EMI & Repayment Helper', icon: 'calculate' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-stone-950 font-black shadow-md ring-2 ring-white/30'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{isHindi ? tab.labelHi : tab.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Real Government & Industry Subsidies Engine */}
      {activeTab === 'subsidy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  {isHindi ? 'सक्रिय सरकारी सब्सिडी योजनाएं' : 'Active Real-Time Government Subsidies'}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isHindi ? 'सब्सिडी योजना चुनें और अपना लाभ देखें' : 'Select Scheme & Calculate Your Direct Profit'}
                </h2>
                <p className="text-xs text-stone-500">
                  {isHindi
                    ? 'नीचे दी गई योजनाएं सीधे बैंक खाते में पूंजीगत सब्सिडी (Grant) प्रदान करती हैं, जिसे वापस नहीं लौटाना होता।'
                    : 'These official schemes provide direct capital subsidies that you do not need to repay.'}
                </p>
              </div>

              {/* Project Cost Quick Selector Slider */}
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 space-y-1.5 w-full sm:w-72">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-stone-600">{isHindi ? 'कुल प्रोजेक्ट लागत:' : 'Total Project Cost:'}</span>
                  <span className="text-emerald-800 font-extrabold text-sm">
                    ₹{projectCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={2500000}
                  step={25000}
                  value={projectCost}
                  onChange={(e) => setProjectCost(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>₹50 हजार</span>
                  <span>₹10 लाख</span>
                  <span>₹25 लाख</span>
                </div>
              </div>
            </div>

            {/* Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemes.map((sch) => {
                const isSelected = selectedSchemeId === sch.id;
                const schemeSubsidyAmt = Math.min(
                  Math.round((projectCost * sch.subsidyPct) / 100),
                  sch.maxSubsidy || projectCost
                );

                return (
                  <div
                    key={sch.id}
                    onClick={() => setSelectedSchemeId(sch.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-700 shadow-md ring-2 ring-emerald-600/30'
                        : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                          {sch.badge}
                        </span>
                        {sch.collateralFree && (
                          <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                            {isHindi ? 'शून्य गारंटी' : 'No Collateral'}
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-stone-900 text-base leading-snug">
                        {isHindi ? sch.nameHi : sch.nameEn}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2">
                        {isHindi ? sch.descHi : sch.descEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">{isHindi ? 'सब्सिडी प्रतिशत:' : 'Subsidy Share:'}</span>
                        <span className="font-black text-emerald-700 text-sm">{sch.subsidyPct}%</span>
                      </div>

                      {sch.subsidyPct > 0 ? (
                        <div className="p-2 bg-emerald-100/70 rounded-lg text-xs font-bold text-emerald-950 flex justify-between items-center">
                          <span>{isHindi ? 'सीधी सब्सिडी छूट:' : 'Direct Grant:'}</span>
                          <span className="font-black text-sm">₹{schemeSubsidyAmt.toLocaleString('en-IN')}</span>
                        </div>
                      ) : (
                        <div className="p-2 bg-stone-100 rounded-lg text-xs text-stone-700 flex justify-between items-center">
                          <span>{isHindi ? 'सुविधा:' : 'Feature:'}</span>
                          <span className="font-bold">{isHindi ? '100% बिना गारंटी लोन' : '100% Collateral-Free'}</span>
                        </div>
                      )}

                      <div className="pt-1">
                        <span
                          className={`w-full py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 ${
                            isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          <span>{isSelected ? (isHindi ? 'चयनित योजना' : 'Selected Scheme') : (isHindi ? 'इस योजना को चुनें' : 'Select Scheme')}</span>
                          <span className="material-symbols-outlined text-xs">
                            {isSelected ? 'check_circle' : 'arrow_forward'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scheme Calculation Deep-Dive Box */}
            <div className="mt-8 bg-gradient-to-br from-emerald-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/15">
                <div>
                  <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                    {isHindi ? 'चयनित योजना का वित्तीय विश्लेषण:' : 'Financial Breakdown:'}
                  </div>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    {isHindi ? currentScheme.nameHi : currentScheme.nameEn}
                  </h3>
                </div>
                <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-amber-300">
                  {isHindi ? 'प्रोजेक्ट लागत:' : 'Project Cost:'} ₹{projectCost.toLocaleString('en-IN')}
                </div>
              </div>

              {/* 4 Step Financial Flow Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/15 space-y-1">
                  <div className="text-[11px] text-emerald-200">{isHindi ? '1. कुल प्रोजेक्ट लागत' : '1. Total Project Cost'}</div>
                  <div className="text-xl font-black text-white">₹{projectCost.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-white/60">{isHindi ? 'मशीनरी + शेड + कच्चा माल' : 'Machinery & Working Cap'}</div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/15 space-y-1">
                  <div className="text-[11px] text-emerald-200">{isHindi ? '2. स्वयं का मार्जिन (10%)' : '2. Your Own Margin (10%)'}</div>
                  <div className="text-xl font-black text-white">₹{promoterOwnMargin.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-white/60">{isHindi ? 'आपकी खुद की पूंजी' : 'Borrower Contribution'}</div>
                </div>

                <div className="bg-emerald-500/30 rounded-xl p-4 border border-emerald-400/40 space-y-1">
                  <div className="text-[11px] text-emerald-200 font-bold">{isHindi ? '3. सरकारी सब्सिडी (माफ)' : '3. Govt Subsidy (Free)'}</div>
                  <div className="text-2xl font-black text-amber-300">₹{calculatedSubsidy.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-emerald-100 font-bold">{currentScheme.subsidyPct}% {isHindi ? 'मुफ्त सरकारी सहायता' : 'Direct Grant'}</div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/15 space-y-1">
                  <div className="text-[11px] text-emerald-200">{isHindi ? '4. वास्तविक बैंक लोन' : '4. Net Bank Loan Needed'}</div>
                  <div className="text-xl font-black text-white">₹{netLoanPrincipal.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-white/60">{isHindi ? 'सिर्फ यही बैंक को चुकाना है' : 'Amount to repay via EMI'}</div>
                </div>
              </div>

              {/* Profit summary statement */}
              <div className="p-4 bg-black/30 rounded-xl border border-white/15 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-300 text-2xl shrink-0">monetization_on</span>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  {isHindi ? currentScheme.profitImpactHi : currentScheme.profitImpactEn}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-stone-300">
                  {isHindi ? 'अब देखें कि कौन सा बैंक सबसे कम ब्याज पर यह लोन देगा:' : 'Now compare which bank gives lowest interest for this loan:'}
                </div>
                <button
                  onClick={() => setActiveTab('banks')}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <span>{isHindi ? '2. HDFC, ICICI, SBI बैंक ऑफर्स देखें' : 'Compare Top Bank Rates'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Top Bank Comparison & Recommendation Engine */}
      {activeTab === 'banks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                  <span className="material-symbols-outlined text-sm">account_balance</span>
                  {isHindi ? 'शीर्ष बैंक लोन ऑफर्स तुलना' : 'Top Real Bank Loan Offers Comparison'}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isHindi ? 'HDFC, ICICI, SBI व अन्य बैंकों की दरें' : 'Compare Live Rates: HDFC, ICICI, SBI & BOB'}
                </h2>
                <p className="text-xs text-stone-500">
                  {isHindi
                    ? 'अपने प्रोजेक्ट के लिए सबसे कम ब्याज और सबसे तेज स्वीकृति देने वाले बैंक का चयन करें।'
                    : 'Compare interest rates, tenure, processing fees and get the smartest bank recommendation.'}
                </p>
              </div>

              {/* Best Bank Badge recommendation */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
                  <span className="material-symbols-outlined text-lg">star</span>
                </div>
                <div>
                  <div className="text-[10px] text-amber-900 font-bold uppercase">
                    {isHindi ? 'सर्वश्रेष्ठ बैंक सिफारिश' : 'Best Recommendation'}
                  </div>
                  <div className="text-xs font-black text-stone-900">
                    {bestBankMatch.bankName} @ {bestBankMatch.interestRate}%
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bankOffers.map((bank) => {
                const isSelected = selectedBankId === bank.id;
                const bankMonthlyRate = bank.interestRate / 12 / 100;
                const bankEmi = calculateEmi(netLoanPrincipal, bankMonthlyRate, loanTenureYears * 12);
                const bankProcFee = Math.round((netLoanPrincipal * bank.processingFeePct) / 100);

                return (
                  <div
                    key={bank.id}
                    onClick={() => setSelectedBankId(bank.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-700 shadow-md ring-2 ring-emerald-600/30'
                        : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-9 h-9 rounded-xl ${bank.logoBg} text-white font-black text-xs flex items-center justify-center shadow-xs`}>
                            {bank.bankName.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-extrabold text-stone-900 text-sm">{bank.bankName}</div>
                            <div className="text-[10px] text-stone-500">{bank.turnaroundTime}</div>
                          </div>
                        </div>

                        {bank.tag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                            {bank.tag}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-xs text-stone-800 leading-snug">
                        {isHindi ? bank.loanNameHi : bank.loanNameEn}
                      </h4>

                      {/* Rate & Fee row */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 bg-stone-100 rounded-xl text-center">
                        <div>
                          <div className="text-[10px] text-stone-500 font-bold uppercase">{isHindi ? 'ब्याज दर' : 'Interest Rate'}</div>
                          <div className="text-base font-black text-emerald-700">{bank.interestRate}% p.a.</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-stone-500 font-bold uppercase">{isHindi ? 'मासिक EMI' : 'Monthly EMI'}</div>
                          <div className="text-base font-black text-stone-900">₹{bankEmi.toLocaleString('en-IN')}</div>
                        </div>
                      </div>

                      {/* Features Bullet List */}
                      <div className="space-y-1 text-xs text-stone-600">
                        {(isHindi ? bank.featuresHi : bank.featuresEn).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-emerald-700 text-xs">check</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">{isHindi ? 'प्रोसेसिंग फीस:' : 'Processing Fee:'}</span>
                        <span className="font-bold text-stone-800">
                          {bank.processingFeePct === 0 ? (isHindi ? 'शून्य (₹0)' : '₹0 Free') : `${bank.processingFeePct}% (₹${bankProcFee})`}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">{isHindi ? 'गारंटी आवश्यकता:' : 'Collateral:'}</span>
                        <span className="font-bold text-emerald-800">{bank.collateralReq}</span>
                      </div>

                      <div className="pt-1">
                        <span
                          className={`w-full py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 ${
                            isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          <span>{isSelected ? (isHindi ? 'चयनित बैंक' : 'Selected Bank') : (isHindi ? 'इस बैंक को चुनें' : 'Select Bank')}</span>
                          <span className="material-symbols-outlined text-xs">
                            {isSelected ? 'check_circle' : 'arrow_forward'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Bridge Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
              <div className="text-xs text-stone-600">
                {isHindi ? 'चयनित बैंक के आधार पर मुनाफा व किस्त चेक करें:' : 'Check profits & EMI schedule for this bank:'}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('profit')}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">analytics</span>
                  <span>{isHindi ? '3. मुनाफा व व्यवहार्यता चेक' : '3. Check Profit Margin'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('emi')}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">calculate</span>
                  <span>{isHindi ? '4. EMI व रिपेमेंट हेल्पर' : '4. Full EMI Schedule'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Integrated Business Feasibility & Profit Plan Checker */}
      {activeTab === 'profit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                  <span className="material-symbols-outlined text-sm">analytics</span>
                  {isHindi ? 'व्यवसाय मुनाफा व व्यवहार्यता जांच' : 'Business Profit & Viability Assessment'}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isHindi ? 'मासिक बिक्री, खर्च व शुद्ध लाभ कैलकुलेटर' : 'Monthly Sales, Expenses & Net Profit Breakdown'}
                </h2>
                <p className="text-xs text-stone-500">
                  {isHindi
                    ? 'अपनी अनुमानित बिक्री व खर्चे दर्ज करें और देखें कि EMI चुकाने के बाद आपके हाथ में कितना शुद्ध मुनाफा बचेगा।'
                    : 'Input projected monthly turnover and expenses to verify your take-home net profit after paying loan EMI.'}
                </p>
              </div>

              {/* Profitability Rating Badge */}
              <div className={`rounded-2xl p-3 px-4 border flex items-center gap-3 ${
                netProfitMarginPct >= 20 ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-white ${
                  netProfitMarginPct >= 20 ? 'bg-emerald-700' : 'bg-amber-600'
                }`}>
                  <span className="material-symbols-outlined text-lg">verified</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-600">
                    {isHindi ? 'व्यवहार्यता स्कोर' : 'Feasibility Score'}
                  </div>
                  <div className="text-sm font-black text-stone-900">
                    {netProfitMarginPct >= 20 ? (isHindi ? 'अत्यधिक लाभदायक (88/100)' : 'Highly Profitable (88/100)') : (isHindi ? 'मध्यम (65/100)' : 'Moderate (65/100)')}
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs & Output Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Revenue & Expense Sliders (6 Cols) */}
              <div className="lg:col-span-6 space-y-5 bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700">tune</span>
                  {isHindi ? 'मासिक अनुमानित आय व खर्चे' : 'Estimated Monthly Income & Costs'}
                </h3>

                {/* Monthly Revenue Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-700">{isHindi ? 'अनुमानित कुल मासिक बिक्री (Turnover):' : 'Projected Monthly Sales:'}</span>
                    <span className="text-emerald-800 font-black text-sm">₹{monthlyRevenue.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={30000}
                    max={500000}
                    step={5000}
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>

                {/* Raw Material Cost Percentage */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-700">{isHindi ? 'कच्चा माल / माल खरीद लागत (%):' : 'Raw Material / Stock Cost (%):'}</span>
                    <span className="text-stone-900 font-bold">{rawMaterialCostPct}% (₹{Math.round((monthlyRevenue * rawMaterialCostPct) / 100).toLocaleString('en-IN')})</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={70}
                    step={1}
                    value={rawMaterialCostPct}
                    onChange={(e) => setRawMaterialCostPct(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                {/* Shop Rent & Electricity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-700">{isHindi ? 'दुकान किराया व बिजली बिल:' : 'Shop Rent & Power Bill:'}</span>
                    <span className="text-stone-900 font-bold">₹{monthlyRentElectricity.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={30000}
                    step={500}
                    value={monthlyRentElectricity}
                    onChange={(e) => setMonthlyRentElectricity(Number(e.target.value))}
                    className="w-full accent-stone-700 cursor-pointer"
                  />
                </div>

                {/* Helper / Labor Wages */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-700">{isHindi ? 'मजदूरी व सहायक कर्मचारी:' : 'Labor & Helpers:'}</span>
                    <span className="text-stone-900 font-bold">₹{monthlyLaborWages.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40000}
                    step={1000}
                    value={monthlyLaborWages}
                    onChange={(e) => setMonthlyLaborWages(Number(e.target.value))}
                    className="w-full accent-stone-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Right Column: Profit Dashboard (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-gradient-to-br from-stone-900 to-emerald-950 p-6 rounded-2xl text-white space-y-5 shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-white/15">
                    <div className="text-xs font-bold text-emerald-300 uppercase">
                      {isHindi ? 'शुद्ध मासिक लाभ रिपोर्ट' : 'Net Monthly Profit Summary'}
                    </div>
                    <span className="text-xs font-bold bg-white/10 px-2.5 py-0.5 rounded-full text-white">
                      Margin: {netProfitMarginPct}%
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-stone-300">
                      <span>{isHindi ? 'कुल मासिक बिक्री:' : 'Total Monthly Sales:'}</span>
                      <span className="font-bold text-white text-sm">₹{monthlyRevenue.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-stone-300">
                      <span>{isHindi ? 'कुल संचालन खर्चे:' : 'Total Operating Costs:'}</span>
                      <span className="font-bold text-rose-300">- ₹{totalMonthlyExpenses.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-stone-300">
                      <span>{isHindi ? 'सकल लाभ (Gross Profit):' : 'Gross Monthly Profit:'}</span>
                      <span className="font-bold text-emerald-300 text-sm">₹{grossMonthlyProfit.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-stone-300 pt-2 border-t border-white/10">
                      <span>{isHindi ? `बैंक EMI (${currentBank.bankName}):` : `Bank EMI (${currentBank.bankName}):`}</span>
                      <span className="font-bold text-amber-300">- ₹{regularMonthlyEmi.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-xl flex justify-between items-center mt-2">
                      <div>
                        <div className="text-[11px] text-emerald-200 font-bold uppercase">{isHindi ? 'मासिक शुद्ध बचत / मुनाफा' : 'Net Take-Home Profit'}</div>
                        <div className="text-xs text-white/70">{isHindi ? 'EMI व सभी खर्चों के बाद' : 'After all expenses & EMI'}</div>
                      </div>
                      <div className="text-2xl font-black text-amber-300">
                        ₹{netProfitAfterEmi.toLocaleString('en-IN')}
                        <span className="text-xs text-white/70 font-normal">/mo</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
                    <div className="p-2.5 bg-white/10 rounded-xl">
                      <div className="text-[10px] text-stone-300">{isHindi ? 'पूंजी वसूली समय' : 'Break-Even Period'}</div>
                      <div className="text-base font-black text-white">{breakEvenMonths} {isHindi ? 'महीने' : 'Months'}</div>
                    </div>
                    <div className="p-2.5 bg-white/10 rounded-xl">
                      <div className="text-[10px] text-stone-300">{isHindi ? 'वार्षिक शुद्ध आय' : 'Annual Net Income'}</div>
                      <div className="text-base font-black text-emerald-300">₹{(netProfitAfterEmi * 12).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                {/* Direct Button to Print / Save Summary */}
                <button
                  onClick={() => {
                    window.print();
                    onShowToast(isHindi ? 'प्रस्ताव सारांश प्रिंट तैयार है' : 'Bank Proposal Ready to Print', 'info');
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  <span>{isHindi ? '📄 बैंक ऋण प्रस्ताव (Loan Proposal) प्रिंट करें' : '📄 Print Bank Loan Proposal'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Smart EMI & Early Repayment Helper */}
      {activeTab === 'emi' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                  <span className="material-symbols-outlined text-sm">calculate</span>
                  {isHindi ? 'EMI व किस्त रिपेमेंट हेल्पर' : 'Smart EMI & Early Repayment Helper'}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isHindi ? 'मासिक किस्त व समय से पहले कर्ज मुक्ति कैलकुलेटर' : 'Monthly EMI & Early Prepayment Savings Engine'}
                </h2>
                <p className="text-xs text-stone-500">
                  {isHindi
                    ? 'देखें कि केवल ₹1,000 या ₹2,000 अतिरिक्त चुकाने से आपका कितना ब्याज बचेगा और लोन कितने महीने पहले खत्म हो जाएगा।'
                    : 'Simulate how paying just ₹1,000 extra per month saves thousands in bank interest and shortens loan tenure.'}
                </p>
              </div>

              {/* Tenure Selector */}
              <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-700">
                <span className="text-[11px] px-2 text-stone-500">{isHindi ? 'अवधि:' : 'Tenure:'}</span>
                {[3, 5, 7].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setLoanTenureYears(yr)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      loanTenureYears === yr ? 'bg-emerald-800 text-white shadow-xs' : 'hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {yr} {isHindi ? 'वर्ष' : 'Yrs'}
                  </button>
                ))}
              </div>
            </div>

            {/* Prepayment Savings Highlight Card */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-2xl p-6 text-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-stone-950 font-black text-xs">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                  {isHindi ? 'स्मार्ट रिपेमेंट बचत' : 'Early Repayment Power'}
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  {isHindi
                    ? `हर महीने ₹${extraPrepaymentMonthly.toLocaleString('en-IN')} अतिरिक्त देने पर:`
                    : `By paying ₹${extraPrepaymentMonthly.toLocaleString('en-IN')} extra every month:`}
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {isHindi
                    ? `आपका कुल ₹${interestSavedWithPrepayment.toLocaleString('en-IN')} का बैंक ब्याज बचेगा और आपका लोन ${monthsSaved} महीने पहले पूरी तरह खत्म हो जाएगा!`
                    : `You save ₹${interestSavedWithPrepayment.toLocaleString('en-IN')} in total interest and close the loan ${monthsSaved} months early!`}
                </p>

                {/* Prepayment slider */}
                <div className="pt-2 space-y-1">
                  <div className="flex justify-between text-xs text-emerald-200">
                    <span>{isHindi ? 'अतिरिक्त मासिक भुगतान:' : 'Extra Monthly Prepayment:'}</span>
                    <span className="font-bold text-amber-300 text-sm">₹{extraPrepaymentMonthly.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={250}
                    value={extraPrepaymentMonthly}
                    onChange={(e) => setExtraPrepaymentMonthly(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:col-span-5 grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/15 text-center">
                  <div className="text-[10px] text-emerald-200 font-bold uppercase">{isHindi ? 'बचाया गया ब्याज' : 'Interest Saved'}</div>
                  <div className="text-xl font-black text-amber-300 mt-0.5">₹{interestSavedWithPrepayment.toLocaleString('en-IN')}</div>
                </div>

                <div className="bg-white/10 rounded-xl p-3.5 border border-white/15 text-center">
                  <div className="text-[10px] text-emerald-200 font-bold uppercase">{isHindi ? 'बचे हुए महीने' : 'Months Saved'}</div>
                  <div className="text-xl font-black text-white mt-0.5">{monthsSaved} {isHindi ? 'माह' : 'Months'}</div>
                </div>

                <div className="col-span-2 bg-black/30 rounded-xl p-3 border border-white/10 text-center text-xs">
                  <span className="text-stone-300">{isHindi ? 'नियमित EMI:' : 'Regular EMI:'} </span>
                  <span className="font-extrabold text-white">₹{regularMonthlyEmi.toLocaleString('en-IN')}/mo</span>
                  <span className="mx-2 text-white/40">•</span>
                  <span className="text-stone-300">{isHindi ? 'नई EMI:' : 'New EMI:'} </span>
                  <span className="font-extrabold text-emerald-300">₹{effectiveMonthlyPayment.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>
            </div>

            {/* Toggle Amortization Schedule Table */}
            <div className="pt-2">
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">table_chart</span>
                <span>{showAmortization ? (isHindi ? 'माह-वार किस्त तालिका छुपाएं' : 'Hide Amortization Table') : (isHindi ? 'माह-वार किस्त (Amortization Schedule) तालिका देखें' : 'View Month-by-Month Amortization Table')}</span>
                <span className="material-symbols-outlined text-sm">{showAmortization ? 'expand_less' : 'expand_more'}</span>
              </button>

              {showAmortization && (
                <div className="mt-4 overflow-x-auto border border-stone-200 rounded-2xl max-h-72 overflow-y-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-100 text-stone-700 font-bold uppercase sticky top-0">
                      <tr>
                        <th className="p-3"># {isHindi ? 'माह' : 'Month'}</th>
                        <th className="p-3">{isHindi ? 'शुरुआती मूलधन' : 'Opening Principal'}</th>
                        <th className="p-3">{isHindi ? 'EMI किस्त' : 'EMI Payment'}</th>
                        <th className="p-3">{isHindi ? 'ब्याज हिस्सा' : 'Interest Paid'}</th>
                        <th className="p-3">{isHindi ? 'मूलधन चुकाया' : 'Principal Paid'}</th>
                        <th className="p-3">{isHindi ? 'शेष राशि' : 'Closing Balance'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {Array.from({ length: Math.min(totalMonths, 36) }).map((_, idx) => {
                        const m = idx + 1;
                        const openBal = Math.max(netLoanPrincipal - (regularMonthlyEmi - netLoanPrincipal * monthlyRate) * idx, 0);
                        const intPart = Math.round(openBal * monthlyRate);
                        const prinPart = Math.min(openBal, regularMonthlyEmi - intPart);
                        const closeBal = Math.max(openBal - prinPart, 0);

                        return (
                          <tr key={m} className={m % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                            <td className="p-3 font-bold">{m}</td>
                            <td className="p-3 font-mono">₹{Math.round(openBal).toLocaleString('en-IN')}</td>
                            <td className="p-3 font-bold text-emerald-800 font-mono">₹{regularMonthlyEmi.toLocaleString('en-IN')}</td>
                            <td className="p-3 font-mono text-amber-800">₹{intPart.toLocaleString('en-IN')}</td>
                            <td className="p-3 font-mono text-emerald-700">₹{prinPart.toLocaleString('en-IN')}</td>
                            <td className="p-3 font-mono font-bold">₹{Math.round(closeBal).toLocaleString('en-IN')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
