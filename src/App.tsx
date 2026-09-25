import { useState, useEffect } from 'react';
import { AuthUser, ScreenType, SupportedLanguage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageModal } from './components/LanguageModal';
import { LoginScreen } from './screens/LoginScreen';
import { KhataScreen } from './screens/KhataScreen';
import { GatewayScreen } from './screens/GatewayScreen';
import { CalculatorScreen } from './screens/CalculatorScreen';
import { VOICE_TEXT } from './data/translations';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export function App() {
  // Load saved authenticated user if present
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('grammitra_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    try {
      const saved = localStorage.getItem('grammitra_auth_user');
      if (!saved) return 'login';
      const hash = window.location.hash.replace('#', '') as ScreenType;
      const validScreens: ScreenType[] = [
        'gateway',
        'calculator',
        'khata',
        'feasibility',
        'cluster-map',
        'loan-simulator',
      ];
      if (hash === 'feasibility' || hash === 'loan-simulator') return 'calculator';
      if (hash === 'cluster-map') return 'gateway';
      return validScreens.includes(hash) ? hash : 'gateway';
    } catch {
      return 'login';
    }
  });

  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('hi');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    showToast(lang === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है' : `Language updated to ${lang.toUpperCase()}`, 'info');
  };

  // Sync hash with current screen
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenType;
      if (hash === 'feasibility' || hash === 'loan-simulator') {
        setCurrentScreen('calculator');
        return;
      }
      if (hash === 'cluster-map') {
        setCurrentScreen('gateway');
        return;
      }
      const validScreens: ScreenType[] = ['login', 'gateway', 'calculator', 'khata'];
      if (validScreens.includes(hash)) {
        if (!currentUser && hash !== 'login') {
          setCurrentScreen('login');
          window.location.hash = 'login';
        } else {
          setCurrentScreen(hash);
        }
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  const navigateTo = (screen: ScreenType) => {
    if (!currentUser && screen !== 'login') {
      setCurrentScreen('login');
      window.location.hash = 'login';
      showToast(currentLanguage === 'hi' ? 'कृपया पहले लॉगिन करें' : 'Please sign in first to access this module', 'warning');
      return;
    }

    // Direct routing to the 3 clean modules
    let target = screen;
    if (screen === 'feasibility' || screen === 'loan-simulator') target = 'calculator';
    if (screen === 'cluster-map') target = 'gateway';

    setCurrentScreen(target);
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentScreen('gateway');
    window.location.hash = 'gateway';
  };

  const handleLogout = () => {
    localStorage.removeItem('grammitra_auth_user');
    setCurrentUser(null);
    setCurrentScreen('login');
    window.location.hash = 'login';
    showToast(currentLanguage === 'hi' ? 'सफलतापूर्वक लॉगआउट हुआ' : 'Signed out successfully.', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('contrast-more');
        showToast('High Contrast Mode Enabled', 'info');
      } else {
        document.documentElement.classList.remove('contrast-more');
        showToast('Standard Display Mode Restored', 'info');
      }
      return next;
    });
  };

  // Voice Sahayak speech trigger
  const handleVoiceQuery = (queryText: string, targetScreen?: ScreenType) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      let reply = '';
      if (currentLanguage === 'en') {
        if (queryText.includes('margin') || queryText.includes('loan')) {
          reply = 'PMEGP provides up to 35% capital subsidy, and HDFC and ICICI offer Mudra loans starting at 9.25% interest.';
        } else if (queryText.includes('Rampur') || queryText.includes('dairy')) {
          reply = 'In your village area, milk chilling and agro flour processing have over 94% local customer demand.';
        } else {
          reply = 'Welcome to GramMitra Portal. Select Business Setup, Loan Calculator or Shop Khata.';
        }
      } else {
        if (queryText.includes('मार्जिन') || queryText.includes('लोन') || queryText.includes('सब्सिडी')) {
          reply = 'PMEGP योजना में 35% सीधी सरकारी सब्सिडी और HDFC, ICICI बैंक में 9.25% से मुद्रा लोन उपलब्ध है।';
        } else if (queryText.includes('रामपुर') || queryText.includes('डेयरी') || queryText.includes('चिलिंग')) {
          reply = 'आपके गांव क्षेत्र में डेयरी चिलिंग व आटा चक्की में 94% से अधिक स्थानीय मांग है।';
        } else {
          reply = 'ग्राममित्र पोर्टल में आपका स्वागत है। बिजनेस सेटअप, लोन व दुकान बही-खाता टूल उपलब्ध हैं।';
        }
      }
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
    showToast(`Voice Guide: "${queryText}"`, 'info');
    if (targetScreen) {
      setTimeout(() => {
        navigateTo(targetScreen);
        setShowVoiceAssistant(false);
      }, 700);
    }
  };

  const voiceStrings = VOICE_TEXT[currentLanguage] || VOICE_TEXT.hi;

  return (
    <div className={`min-h-screen flex flex-col bg-surface text-on-surface ${highContrast ? 'contrast-more' : ''}`}>
      {/* Universal Sovereign Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        onOpenLanguageModal={() => setIsLanguageModalOpen(false)}
        highContrast={highContrast}
        onToggleHighContrast={toggleHighContrast}
        onOpenVoiceAssistant={() => setShowVoiceAssistant(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Screen Content Viewport - 3 Clean Sections */}
      <main className="flex-1">
        {currentScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            currentLanguage={currentLanguage}
            onShowToast={showToast}
          />
        )}
        {(currentScreen === 'gateway' || currentScreen === 'cluster-map') && (
          <GatewayScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
            onShowToast={showToast}
          />
        )}
        {(currentScreen === 'calculator' || currentScreen === 'feasibility' || currentScreen === 'loan-simulator') && (
          <CalculatorScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'khata' && (
          <KhataScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Universal Clean Footer */}
      <Footer onNavigate={navigateTo} currentLanguage={currentLanguage} />

      {/* 12-Language Selector Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-variant space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center animate-pulse">
                  <span className="material-symbols-outlined text-lg">mic</span>
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-on-surface">
                    {currentLanguage === 'hi' ? 'ग्राममित्र आवाज सहायक' : 'Voice Assistant'}
                  </h3>
                  <p className="text-xs text-outline">
                    {currentLanguage === 'hi' ? 'किसी भी प्रश्न पर क्लिक करें या सुनें' : 'Click any query to listen'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVoiceAssistant(false)}
                className="p-1 rounded-full hover:bg-surface-container-high text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2">
              {[
                {
                  text: currentLanguage === 'hi' ? 'PMEGP 35% सब्सिडी और HDFC/ICICI बैंक लोन के बारे में बताएं' : 'Tell me about PMEGP 35% subsidy and bank loans',
                  target: 'calculator' as ScreenType,
                },
                {
                  text: currentLanguage === 'hi' ? 'रामपुर व आसपास में कौन सा बिजनेस सबसे ज्यादा चलने लायक है?' : 'Which business is best for my local village area?',
                  target: 'gateway' as ScreenType,
                },
                {
                  text: currentLanguage === 'hi' ? 'दुकान बही-खाता में ग्राहकों की उधारी कैसे दर्ज करें?' : 'How to record customer credit in Shop Khata?',
                  target: 'khata' as ScreenType,
                },
              ].map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleVoiceQuery(query.text, query.target)}
                  className="w-full p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 hover:border-emerald-500 border border-stone-200 text-left text-xs font-semibold text-stone-900 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-emerald-700">record_voice_over</span>
                    {query.text}
                  </span>
                  <span className="material-symbols-outlined text-base text-stone-400">arrow_forward</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200 ${
              toast.type === 'success'
                ? 'bg-[#15341c] text-white border-emerald-500'
                : toast.type === 'warning'
                ? 'bg-[#3b2310] text-white border-amber-500'
                : 'bg-[#182129] text-white border-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'warning' ? 'warning' : 'info'}
            </span>
            <span className="flex-1">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
