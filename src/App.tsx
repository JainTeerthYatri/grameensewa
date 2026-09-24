import { useState, useEffect } from 'react';
import { AuthUser, ScreenType, SupportedLanguage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageModal } from './components/LanguageModal';
import { LoginScreen } from './screens/LoginScreen';
import { KhataScreen } from './screens/KhataScreen';
import { GatewayScreen } from './screens/GatewayScreen';
import { FeasibilityScreen } from './screens/FeasibilityScreen';
import { CalculatorScreen } from './screens/CalculatorScreen';
import { ClusterMapScreen } from './screens/ClusterMapScreen';
import { LoanSimulatorScreen } from './screens/LoanSimulatorScreen';
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
        'khata',
        'feasibility',
        'calculator',
        'cluster-map',
        'loan-simulator',
      ];
      return validScreens.includes(hash) ? hash : 'gateway';
    } catch {
      return 'login';
    }
  });

  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    showToast(`Official language updated to ${lang.toUpperCase()}`, 'info');
  };

  // Sync hash with current screen
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenType;
      const validScreens: ScreenType[] = [
        'login',
        'gateway',
        'khata',
        'feasibility',
        'calculator',
        'cluster-map',
        'loan-simulator',
      ];
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
      showToast('Please sign in with temporary credentials first to access this module', 'warning');
      return;
    }
    setCurrentScreen(screen);
    window.location.hash = screen;
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
    showToast('Signed out successfully. Session terminated.', 'info');
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
        showToast('High Contrast Accessibility Mode Enabled', 'info');
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
          reply = 'On ₹1 Lakh promoter margin, you are eligible for ₹9 Lakh concessional credit at subsidized 5% interest rate.';
        } else if (queryText.includes('Rampur') || queryText.includes('chilling')) {
          reply = 'In Rampur Kalan, there are 1,840 milch cattle and zero competing chillers within 8.5 kilometers.';
        } else {
          reply = 'Welcome to GramMitra Portal. You can directly generate and submit your bankable project report.';
        }
      } else {
        if (queryText.includes('मार्जिन') || queryText.includes('लोन') || queryText.includes('loan')) {
          reply = '1 लाख रुपये के मार्जिन पर आपको 9 लाख का रियायती ऋण 5 प्रतिशत ब्याज पर मिलेगा।';
        } else if (queryText.includes('रामपुर') || queryText.includes('चिलिंग')) {
          reply = 'रामपुर कलां में 1840 दुधारू पशु हैं और 8.5 किमी में कोई प्रतिस्पर्धी चिलर नहीं है।';
        } else {
          reply = 'ग्राममित्र पोर्टल में आपका स्वागत है। आप सीधे आवेदन कर सकते हैं।';
        }
      }
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
    showToast(`Voice Sahayak: "${queryText}"`, 'info');
    if (targetScreen) {
      setTimeout(() => {
        navigateTo(targetScreen);
        setShowVoiceAssistant(false);
      }, 700);
    }
  };

  const voiceStrings = VOICE_TEXT[currentLanguage] || VOICE_TEXT.en;

  return (
    <div className={`min-h-screen flex flex-col bg-surface text-on-surface ${highContrast ? 'contrast-more' : ''}`}>
      {/* Universal Sovereign Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => {
          setCurrentLanguage(lang);
          showToast(`Official language updated to ${lang.toUpperCase()}`, 'success');
        }}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        highContrast={highContrast}
        onToggleHighContrast={toggleHighContrast}
        onOpenVoiceAssistant={() => setShowVoiceAssistant(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Screen Content Viewport */}
      <main className="flex-1">
        {currentScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            currentLanguage={currentLanguage}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'gateway' && (
          <GatewayScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
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
        {currentScreen === 'feasibility' && (
          <FeasibilityScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'calculator' && (
          <CalculatorScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'cluster-map' && (
          <ClusterMapScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'loan-simulator' && (
          <LoanSimulatorScreen
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Official MoSJE Sovereign Footer */}
      <Footer onNavigate={navigateTo} currentLanguage={currentLanguage} />

      {/* 12-Language Selector Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => {
          setCurrentLanguage(lang);
          showToast(`Official language updated to ${lang.toUpperCase()}`, 'success');
        }}
      />

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-variant space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center animate-pulse">
                  <span className="material-symbols-outlined text-lg">mic</span>
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-on-surface">{voiceStrings.title}</h3>
                  <p className="text-xs text-outline">{voiceStrings.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setShowVoiceAssistant(false)}
                className="p-1 rounded-full hover:bg-surface-container-high text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="text-xs text-outline">
              {voiceStrings.askPrompt}
            </div>

            <div className="space-y-2">
              {voiceStrings.queries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleVoiceQuery(query.text, query.target)}
                  className="w-full p-3 rounded-xl bg-surface-container-low hover:bg-primary/5 hover:border-primary border border-surface-variant text-left text-xs font-semibold text-on-surface flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">record_voice_over</span>
                    {query.text}
                  </span>
                  <span className="material-symbols-outlined text-base text-outline">arrow_forward</span>
                </button>
              ))}
            </div>

            <div className="p-3 bg-surface-container rounded-xl text-center text-[11px] text-outline">
              {voiceStrings.tapNotice}
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
                ? 'bg-[#15341c] text-white border-primary-container'
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
