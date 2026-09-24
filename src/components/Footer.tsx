import React from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { FOOTER_TEXT, UI_STRINGS } from '../data/translations';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentLanguage = 'en' }) => {
  const fText = FOOTER_TEXT[currentLanguage] || FOOTER_TEXT.en;
  const ui = UI_STRINGS[currentLanguage] || UI_STRINGS.en;

  return (
    <footer className="bg-[#121614] text-[#cfd7ce] pt-12 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Column 1: Sovereign Seal & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1WhmvW-T1ONNWhu04HxAPs05gskK5nIQf6ZOJu9-Ta3HGDG-FKlyLg9NeU6NIclBC0D4uIoy_ibNNVzcEQ1cNFCRcMk4If_8ik3PAl6isiJJ59N0pMTEojWxeik2kzd9PdVN01W1jQdkqqFbTKX_EHsMYcXenS4IVnb5NzhOvi0K5l3DEkIxd4vT1TR1QWXifV2Ueqiapd3ZV5bLvCC4zCLJjuAJnRcScf1AkKYerkhsQ_HIiD_BRmMVCg"
                alt="Emblem"
                className="h-10 w-10 object-contain rounded-md bg-white p-1"
              />
              <div>
                <div className="font-headline-sm font-bold text-white tracking-wide">{ui.portalName}</div>
                <div className="text-[11px] text-white/60">Ministry of Social Justice & Empowerment</div>
              </div>
            </div>
            <p className="text-xs text-[#a4ada3] leading-relaxed">
              {fText.purpose}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-primary-fixed">
              <span className="material-symbols-outlined text-sm">security</span>
              <span>{fText.encrypted}</span>
            </div>
          </div>

          {/* Column 2: Quick Portals & Schemes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-primary-fixed rounded-xs"></span>
              {fText.coreModules}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-primary-fixed font-bold"
                >
                  <span className="material-symbols-outlined text-[13px] text-primary-fixed">login</span>
                  Sign In (Temporary Credentials)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gateway')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px] text-primary-fixed">arrow_right</span>
                  {ui.navGateway}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('khata')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold text-amber-300"
                >
                  <span className="material-symbols-outlined text-[13px] text-amber-300">menu_book</span>
                  {ui.navKhata || 'Dukandar Khata (बही-खाता)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('feasibility')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px] text-primary-fixed">arrow_right</span>
                  {ui.navFeasibility}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px] text-primary-fixed">arrow_right</span>
                  {ui.navCalculator}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cluster-map')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px] text-primary-fixed">arrow_right</span>
                  {ui.navClusterMap}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('loan-simulator')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px] text-primary-fixed">arrow_right</span>
                  {ui.navSimulator}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Statutory Agencies & Apex Bodies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-[#ff9933] rounded-xs"></span>
              {fText.apexCorps}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#a4ada3]">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-primary-fixed">verified</span>
                <span>NBCFDC (Backward Classes Finance)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-primary-fixed">verified</span>
                <span>NSFDC (Scheduled Castes Finance)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-primary-fixed">verified</span>
                <span>CGTMSE Sovereign Credit Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-primary-fixed">verified</span>
                <span>PM GatiShakti National Master Plan</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-primary-fixed">verified</span>
                <span>Bhashini Digital Language Mission</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Citizen Grievance & RTI */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-secondary rounded-xs"></span>
              {fText.citizenSupport}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[11px] text-white/90 font-bold">{fText.onlineSupport}</div>
                <div className="text-[10px] text-white/60 mt-0.5">{fText.onlineSupportDesc}</div>
              </div>
              <div className="flex flex-col gap-1 text-[#a4ada3]">
                <a href="#cgp" className="hover:text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                  CPGRAMS Public Grievance Portal
                </a>
                <a href="#rti" className="hover:text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                  RTI Online Citizen Transparency
                </a>
                <a href="#dbt" className="hover:text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                  Direct Benefit Transfer (DBT) Bharat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#869185] gap-4">
          <div>
            {fText.copyright}
          </div>
          <div className="flex items-center gap-4">
            <span>NIC LGD Code: 139420</span>
            <span>•</span>
            <span>Cert-In Audited</span>
            <span>•</span>
            <span>W3C WAI-AA Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
