import React, { useState } from 'react';
import { AuthUser, SupportedLanguage } from '../types';
import { supabase, isSupabaseConfigured, updateSupabaseCredentials } from '../utils/supabaseClient';

interface LoginScreenProps {
  onLoginSuccess: (user: AuthUser) => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface RegisteredUserAccount {
  email: string;
  password: string;
  name: string;
  role: string;
  citizenId: string;
  panchayat: string;
  district: string;
  state: string;
  dpdpConsent: boolean;
}

const INITIAL_ACCOUNTS: RegisteredUserAccount[] = [
  {
    email: 'demo.citizen@grammitra.in',
    password: 'GramMitra@2026',
    name: 'Shri Lalu Yadav',
    role: 'Rural Beneficiary & Dairy Entrepreneur',
    citizenId: 'GM-2026-UP-4921',
    panchayat: 'Rampur Kalan',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    dpdpConsent: true,
  },
  {
    email: 'xyz@grammitra.in',
    password: 'GramMitra@2026',
    name: 'XYZ User',
    role: 'Panchayat Enterprise Promoter',
    citizenId: 'GM-2026-UP-7720',
    panchayat: 'Rampur Kalan',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    dpdpConsent: true,
  },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onShowToast,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state - starts empty
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginDpdpChecked, setLoginDpdpChecked] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPanchayat, setRegPanchayat] = useState('');
  const [regDistrict, setRegDistrict] = useState('Lucknow');
  const [regState, setRegState] = useState('Uttar Pradesh');
  const [regRole, setRegRole] = useState('Village Entrepreneur & Shopkeeper');
  const [regDpdpConsent, setRegDpdpConsent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Supabase Config Modal state
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [sbUrlInput, setSbUrlInput] = useState('');
  const [sbKeyInput, setSbKeyInput] = useState('');

  const getStoredAccounts = (): RegisteredUserAccount[] => {
    try {
      const saved = localStorage.getItem('grammitra_registered_users');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    localStorage.setItem('grammitra_registered_users', JSON.stringify(INITIAL_ACCOUNTS));
    return INITIAL_ACCOUNTS;
  };

  // Sign In handler (Supports Supabase Auth + Local Fallback)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailTrim = loginEmail.trim().toLowerCase();
    const passTrim = loginPassword.trim();

    if (!emailTrim || !passTrim) {
      setErrorMessage('Please enter your email and password to sign in.');
      return;
    }

    if (!loginDpdpChecked) {
      setErrorMessage('Under the DPDP Act, explicit data processing consent is required to sign in.');
      onShowToast('DPDP Consent required', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      if (isSupabaseConfigured()) {
        // Authenticate via Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailTrim,
          password: passTrim,
        });

        if (error) {
          // Fallback to local accounts if Supabase auth errors out (e.g. user created locally)
          console.warn('Supabase auth error, checking local accounts:', error.message);
          verifyLocalAccount(emailTrim, passTrim);
          return;
        }

        if (data.user) {
          const userMeta = data.user.user_metadata || {};
          const authUser: AuthUser = {
            email: data.user.email || emailTrim,
            name: userMeta.name || emailTrim.split('@')[0],
            role: userMeta.role || 'Village Entrepreneur',
            citizenId: userMeta.citizenId || `GM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            panchayat: userMeta.panchayat || 'Rampur Kalan',
            district: userMeta.district || 'Lucknow',
            state: userMeta.state || 'Uttar Pradesh',
            loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          localStorage.setItem('grammitra_auth_user', JSON.stringify(authUser));
          setIsLoading(false);
          onShowToast(`Welcome back via Supabase, ${authUser.name}!`, 'success');
          onLoginSuccess(authUser);
          return;
        }
      }

      // If Supabase is not configured, verify against local accounts
      verifyLocalAccount(emailTrim, passTrim);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication error occurred.');
    }
  };

  const verifyLocalAccount = (emailTrim: string, passTrim: string) => {
    const accounts = getStoredAccounts();
    const matched = accounts.find((a) => a.email.toLowerCase() === emailTrim);

    if (!matched) {
      setIsLoading(false);
      setErrorMessage(`No account found for "${emailTrim}". Please register first.`);
      onShowToast('Account not found. Please register.', 'warning');
      return;
    }

    if (matched.password !== passTrim) {
      setIsLoading(false);
      setErrorMessage('Incorrect password. Please verify your credentials.');
      onShowToast('Incorrect password', 'warning');
      return;
    }

    setIsLoading(false);
    const authUser: AuthUser = {
      email: matched.email,
      name: matched.name,
      role: matched.role,
      citizenId: matched.citizenId,
      panchayat: matched.panchayat,
      district: matched.district,
      state: matched.state,
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    localStorage.setItem('grammitra_auth_user', JSON.stringify(authUser));
    onShowToast(`Welcome back, ${authUser.name}!`, 'success');
    onLoginSuccess(authUser);
  };

  // Register handler (Supports Supabase Auth + Local Fallback)
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const nameTrim = regName.trim();
    const emailTrim = regEmail.trim().toLowerCase();
    const passTrim = regPassword.trim();
    const panchayatTrim = regPanchayat.trim();

    if (!nameTrim || !emailTrim || !passTrim || !panchayatTrim) {
      setErrorMessage('Please fill in all required registration fields.');
      onShowToast('Please fill all fields', 'warning');
      return;
    }

    if (passTrim.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      onShowToast('Password too short', 'warning');
      return;
    }

    if (!regDpdpConsent) {
      setErrorMessage('Under India’s DPDP Act, explicit consent is required to register and process personal data.');
      onShowToast('DPDP Act Consent mandatory', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      const citizenId = `GM-2026-${regState.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signUp({
          email: emailTrim,
          password: passTrim,
          options: {
            data: {
              name: nameTrim,
              role: regRole,
              panchayat: panchayatTrim,
              district: regDistrict,
              state: regState,
              citizenId,
              dpdpConsent: true,
            },
          },
        });

        if (error) {
          console.warn('Supabase sign-up error, registering locally:', error.message);
          registerLocally(nameTrim, emailTrim, passTrim, panchayatTrim, citizenId);
          return;
        }

        setIsLoading(false);
        onShowToast('Account registered securely via Supabase under DPDP Act!', 'success');

        const authUser: AuthUser = {
          email: emailTrim,
          name: nameTrim,
          role: regRole,
          citizenId,
          panchayat: panchayatTrim,
          district: regDistrict,
          state: regState,
          loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        localStorage.setItem('grammitra_auth_user', JSON.stringify(authUser));
        onLoginSuccess(authUser);
        return;
      }

      registerLocally(nameTrim, emailTrim, passTrim, panchayatTrim, citizenId);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Registration error occurred.');
    }
  };

  const registerLocally = (
    nameTrim: string,
    emailTrim: string,
    passTrim: string,
    panchayatTrim: string,
    citizenId: string
  ) => {
    const accounts = getStoredAccounts();
    const existing = accounts.find((a) => a.email.toLowerCase() === emailTrim);

    if (existing) {
      setIsLoading(false);
      setErrorMessage(`An account with email "${emailTrim}" already exists. Please sign in.`);
      onShowToast('Account already exists', 'warning');
      return;
    }

    const newAccount: RegisteredUserAccount = {
      email: emailTrim,
      password: passTrim,
      name: nameTrim,
      role: regRole,
      citizenId,
      panchayat: panchayatTrim,
      district: regDistrict,
      state: regState,
      dpdpConsent: true,
    };

    accounts.push(newAccount);
    localStorage.setItem('grammitra_registered_users', JSON.stringify(accounts));

    setIsLoading(false);
    onShowToast('Account registered successfully under DPDP Act! Logging you in...', 'success');

    const authUser: AuthUser = {
      email: newAccount.email,
      name: newAccount.name,
      role: newAccount.role,
      citizenId: newAccount.citizenId,
      panchayat: newAccount.panchayat,
      district: newAccount.district,
      state: newAccount.state,
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    localStorage.setItem('grammitra_auth_user', JSON.stringify(authUser));
    onLoginSuccess(authUser);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12 bg-linear-to-b from-stone-50 via-emerald-50/20 to-stone-100 animate-in fade-in duration-300">
      <div className="w-full max-w-xl space-y-6">
        {/* Header Branding Card */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-linear-to-br from-emerald-600 to-green-800 text-white shadow-md mb-1">
            <span className="material-symbols-outlined text-4xl">storefront</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-widest">
            <span>GramMitra • Supabase & DPDP Act Enabled</span>
            <span
              onClick={() => setShowSupabaseModal(!showSupabaseModal)}
              className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] cursor-pointer hover:bg-emerald-200 transition-colors"
              title="Configure Supabase Connection"
            >
              {isSupabaseConfigured() ? '🟢 Supabase Connected' : '⚙️ Connect Supabase'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            {authMode === 'login' ? 'Sign In to Your Account' : 'Register New Village Account'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            {authMode === 'login'
              ? 'Enter your credentials to access business setup guides, bank loans, and shop khata.'
              : 'Create a secure account for your village enterprise or shop in 1 minute.'}
          </p>
        </div>

        {/* Supabase Config Banner / Modal */}
        {showSupabaseModal && (
          <div className="p-4 rounded-2xl bg-emerald-900 text-white shadow-lg space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">database</span>
                Configure Supabase Database & Auth
              </span>
              <button
                onClick={() => setShowSupabaseModal(false)}
                className="text-emerald-200 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <p className="text-[11px] text-emerald-100 leading-relaxed">
              Enter your Supabase Project URL and Anon API Key to connect live database storage and cloud authentication.
            </p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Supabase Project URL (e.g. https://xyz.supabase.co)"
                value={sbUrlInput}
                onChange={(e) => setSbUrlInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-xs font-mono focus:outline-none"
              />
              <input
                type="password"
                placeholder="Supabase Anon Key"
                value={sbKeyInput}
                onChange={(e) => setSbKeyInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-xs font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (!sbUrlInput || !sbKeyInput) {
                    onShowToast('Please enter both URL and Anon Key', 'warning');
                    return;
                  }
                  updateSupabaseCredentials(sbUrlInput, sbKeyInput);
                  onShowToast('Supabase credentials saved! Reloading...', 'success');
                }}
                className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs cursor-pointer shadow"
              >
                Save & Connect Supabase
              </button>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="bg-stone-200/80 p-1.5 rounded-2xl grid grid-cols-2 gap-1 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('login');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-emerald-800 text-white shadow-sm font-black'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Sign In (Login)
          </button>
          <button
            onClick={() => {
              setAuthMode('register');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-emerald-800 text-white shadow-sm font-black'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Create Account (Register)
          </button>
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-rose-600 text-base">error</span>
            <span className="flex-1">{errorMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-stone-400 text-lg">mail</span>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email (e.g. xyz@grammitra.in)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold text-stone-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Password</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-stone-400 text-lg">lock</span>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold text-stone-900"
                />
              </div>
            </div>

            {/* DPDP Act Consent Checkbox for Login */}
            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={loginDpdpChecked}
                  onChange={(e) => setLoginDpdpChecked(e.target.checked)}
                  className="mt-0.5 accent-emerald-700 h-4 w-4 rounded cursor-pointer"
                />
                <span className="text-[11px] text-stone-700 leading-relaxed font-medium">
                  <strong>DPDP Act Consent:</strong> I give explicit consent for processing my authentication & business profile data securely under India's Digital Personal Data Protection (DPDP) Act.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying & Signing In...' : 'Sign In'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>

            {/* Quick Demo Helper */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Need a quick test?</span>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('demo.citizen@grammitra.in');
                  setLoginPassword('GramMitra@2026');
                  setLoginDpdpChecked(true);
                  onShowToast('Filled demo account details', 'info');
                }}
                className="text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Autofill Demo Account
              </button>
            </div>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. rajesh@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase">Password (min 6 chars)</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase">Gram Panchayat / Village</label>
                <input
                  type="text"
                  required
                  value={regPanchayat}
                  onChange={(e) => setRegPanchayat(e.target.value)}
                  placeholder="e.g. Rampur Kalan"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase">District</label>
                <input
                  type="text"
                  required
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  placeholder="e.g. Lucknow"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase">State</label>
                <input
                  type="text"
                  required
                  value={regState}
                  onChange={(e) => setRegState(e.target.value)}
                  placeholder="e.g. Uttar Pradesh"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-700 uppercase">Business / Role Type</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-emerald-700 focus:outline-none text-xs font-bold bg-white"
              >
                <option value="Village Entrepreneur & Shopkeeper">Village Entrepreneur & Shopkeeper</option>
                <option value="Dairy & Agro Producer">Dairy & Agro Producer</option>
                <option value="Village CSC Operator (VLE)">Village CSC Operator (VLE)</option>
                <option value="Rural Citizen Beneficiary">Rural Citizen Beneficiary</option>
              </select>
            </div>

            {/* DPDP Act Consent Checkbox for Registration */}
            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={regDpdpConsent}
                  onChange={(e) => setRegDpdpConsent(e.target.checked)}
                  className="mt-0.5 accent-emerald-700 h-4 w-4 rounded cursor-pointer"
                />
                <span className="text-[11px] text-stone-700 leading-relaxed font-medium">
                  <strong>DPDP Act Consent:</strong> I give explicit consent to GramMitra to securely store and process my registration data solely for providing village business guides and khata ledger services under India's Digital Personal Data Protection (DPDP) Act.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Registering...' : 'Register & Start Portal'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
