import React from 'react';
import { LANGUAGES } from '../data/translations';
import { SupportedLanguage } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-surface-variant">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">translate</span>
              <h3 className="font-headline-sm font-bold text-on-surface">Select Official Sovereign Language</h3>
            </div>
            <p className="font-body-sm text-outline mt-0.5">
              Available in all 12 Scheduled Indian Official Dialects & Scripts
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"
            title="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs'
                    : 'border-surface-variant hover:border-outline hover:bg-surface-container-low'
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-sm font-bold text-on-surface">{lang.nativeName}</span>
                    <span className="text-xs font-semibold text-outline uppercase">{lang.englishName}</span>
                  </div>
                  <div className="text-xs text-secondary mt-1">{lang.region}</div>
                  <div className="text-[11px] font-mono text-primary font-medium mt-1 bg-surface-container-high px-2 py-0.5 rounded-sm inline-block">
                    {lang.sampleEmi}
                  </div>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between text-xs text-outline">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-primary">record_voice_over</span>
            Bhashini Voice synthesizer active for selected dialect
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-container transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
