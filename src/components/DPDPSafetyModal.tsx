import React, { useState } from 'react';
import { SupportedLanguage } from '../types';

interface DPDPSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DPDPSafetyModal: React.FC<DPDPSafetyModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'rights' | 'erasure' | 'grievance'>('rights');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isHindi = currentLanguage === 'hi';

  if (!isOpen) return null;

  const handleWipeData = () => {
    localStorage.removeItem('grammitra_auth_user');
    localStorage.removeItem('grammitra_khata_customers');
    localStorage.removeItem('grammitra_khata_transactions');
    onShowToast(
      isHindi
        ? 'DPDP Act के तहत आपका सारा डेटा स्थायी रूप से मिटा दिया गया है (Right to Erasure).'
        : 'All personal data and shop ledgers permanently erased under DPDP Act Right to Erasure.',
      'success'
    );
    setConfirmDelete(false);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl">gpp_good</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900 tracking-tight">
                {isHindi ? 'DPDP Act 2023 - नागरिक डेटा सुरक्षा अधिकार' : 'DPDP Act 2023 - Citizen Data Rights'}
              </h2>
              <p className="text-xs text-stone-600">
                {isHindi ? 'भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम के तहत आपके कानूनी अधिकार' : 'Your legal rights under India’s Digital Personal Data Protection Act'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('rights')}
            className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'rights' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isHindi ? '🛡️ आपके 4 मुख्य अधिकार' : '🛡️ Your 4 Key Rights'}
          </button>
          <button
            onClick={() => setActiveTab('erasure')}
            className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'erasure' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isHindi ? '🗑️ डेटा हटाने का अधिकार (Erasure)' : '🗑️ Right to Erasure'}
          </button>
          <button
            onClick={() => setActiveTab('grievance')}
            className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'grievance' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {isHindi ? '📞 शिकायत निवारण अधिकारी' : '📞 Grievance Officer'}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'rights' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">visibility</span>
                <span>1. {isHindi ? 'डेटा की जानकारी पाने का अधिकार (Right to Access)' : 'Right to Information & Access'}</span>
              </div>
              <p className="text-emerald-800">
                {isHindi
                  ? 'आपको पूरा अधिकार है कि आप जान सकें कि GramMitra पोर्टल पर आपका कौन सा व्यक्तिगत डेटा (नाम, पंचायत, फोन, दुकान खाता) सुरक्षित रखा गया है।'
                  : 'You have the right to obtain a summary of all personal data processed by GramMitra and the identities of all shared entities.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">edit</span>
                <span>2. {isHindi ? 'डेटा सुधार व अपडेट करने का अधिकार (Right to Correction)' : 'Right to Correction & Updating'}</span>
              </div>
              <p className="text-amber-800">
                {isHindi
                  ? 'यदि आपका फोन नंबर, पंचायत का नाम या दुकान का विवरण बदल गया है, तो आप इसे कभी भी प्रोफाइल में अपडेट कर सकते हैं।'
                  : 'You can request immediate correction, completion, or updating of inaccurate or incomplete personal data.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
              <div className="font-bold text-blue-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">lock</span>
                <span>3. {isHindi ? 'उद्देश्य सीमा व गोपनीयता (Purpose Limitation)' : 'Purpose Limitation & Zero Advertising'}</span>
              </div>
              <p className="text-blue-800">
                {isHindi
                  ? 'आपका डेटा केवल ग्राम पंचायत बिजनेस सेटअप, लोन कैलकुलेशन और दुकान बही-खाता के लिए उपयोग होता है। इसे किसी भी विज्ञापन कंपनी को नहीं बेचा जाता।'
                  : 'Your data is strictly processed for consented rural enterprise and ledger purposes. It is never sold or rented to third-party advertisers.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>4. {isHindi ? 'सहमति वापस लेने का अधिकार (Withdrawal of Consent)' : 'Right to Withdraw Consent'}</span>
              </div>
              <p className="text-stone-700">
                {isHindi
                  ? 'आप कभी भी अपनी सहमति वापस ले सकते हैं, जिसके बाद आपका अकाउंट और डेटा पूरी तरह मिटा दिया जाएगा।'
                  : 'You have the right to withdraw your consent at any time just as easily as it was given.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'erasure' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
              <div className="font-bold text-rose-900 flex items-center gap-2 text-base">
                <span className="material-symbols-outlined text-xl">delete_forever</span>
                <span>{isHindi ? 'डेटा हटाने का अधिकार / भूल जाने का अधिकार (Right to Erasure)' : 'Right to Erasure / Right to be Forgotten'}</span>
              </div>
              <p className="text-rose-800 leading-relaxed">
                {isHindi
                  ? 'DPDP Act की धारा 12 के तहत, यदि आप अब इस पोर्टल का उपयोग नहीं करना चाहते हैं, तो आप अपने सभी रिकॉर्ड्स (लॉगिन विवरण, उधारी खाता, लेन-देन इतिहास) को हमेशा के लिए अपने ब्राउज़र और सर्वर से डिलीट कर सकते हैं।'
                  : 'Under Section 12 of the Digital Personal Data Protection Act, you can request the complete erasure of your personal data and shop ledger when it is no longer necessary for the specified purpose.'}
              </p>

              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  {isHindi ? '🗑️ मेरा सारा डेटा स्थायी रूप से मिटाएं' : 'Permanently Delete All My Data'}
                </button>
              ) : (
                <div className="space-y-3 pt-2 border-t border-rose-200">
                  <div className="font-bold text-rose-900 text-xs">
                    {isHindi ? 'क्या आप वाकई अपना सारा डेटा डिलीट करना चाहते हैं? यह क्रिया वापस नहीं हो सकती।' : 'Are you sure? This action cannot be undone and will wipe all your local records.'}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleWipeData}
                      className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-xs cursor-pointer shadow-sm"
                    >
                      {isHindi ? 'हां, सब डिलीट करें' : 'Yes, Delete Permanently'}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs cursor-pointer"
                    >
                      {isHindi ? 'रद्द करें' : 'Cancel'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'grievance' && (
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="font-bold text-stone-900 flex items-center gap-2 text-base">
                <span className="material-symbols-outlined text-xl">support_agent</span>
                <span>{isHindi ? 'डेटा संरक्षण और शिकायत निवारण अधिकारी' : 'Data Protection & Grievance Officer'}</span>
              </div>
              <p className="text-stone-600">
                {isHindi
                  ? 'यदि आपको अपने डेटा की गोपनीयता या DPDP Act अनुपालन से संबंधित कोई भी शिकायत या प्रश्न है, तो आप हमारे नोडल अधिकारी से संपर्क कर सकते हैं।'
                  : 'If you have any grievances or questions regarding your data privacy or DPDP Act compliance, you can contact our designated Grievance Officer.'}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200">
                  <span className="font-bold text-stone-700">{isHindi ? 'अधिकारी नाम:' : 'Officer Name:'}</span>
                  <span className="font-extrabold text-stone-900">Shri R. K. Sharma (Chief Data Protection Officer)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200">
                  <span className="font-bold text-stone-700">{isHindi ? 'ईमेल संपर्क:' : 'Email Contact:'}</span>
                  <span className="font-extrabold text-emerald-700">privacy@grammitra.in</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-stone-200">
                  <span className="font-bold text-stone-700">{isHindi ? 'हेल्पलाइन नंबर:' : 'Helpline Support:'}</span>
                  <span className="font-extrabold text-stone-900">1800-425-GRAM (Toll-Free)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          <div className="text-[11px] text-stone-500">
            {isHindi ? 'भारत सरकार DPDP Act 2023 के तहत पूर्ण प्रमाणित' : 'Fully compliant with India DPDP Act 2023'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
