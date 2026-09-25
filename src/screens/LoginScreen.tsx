import React, { useState } from 'react';
import { AuthUser, SupportedLanguage } from '../types';
import { LOGIN_TEXT } from '../data/translations';

interface LoginScreenProps {
  onLoginSuccess: (user: AuthUser) => void;
  currentLanguage: SupportedLanguage;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

// Pre-authorized temporary credentials
export const AUTHORIZED_CREDENTIALS = [
  {
    email: 'demo.citizen@grammitra.in',
    password: 'GramMitra@2026',
    name: 'Shri Lalu Yadav (Beneficiary)',
    role: 'Rural Beneficiary / Dairy Entrepreneur',
    citizenId: 'GM-2026-UP-4921',
    panchayat: 'Rampur Kalan',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
  },
  {
    email: 'laluaj677@gmail.com',
    password: 'GramMitra@2026',
    name: 'Lalu Aj (Citizen & Shopkeeper)',
    role: 'Panchayat Enterprise Promoter',
    citizenId: 'GM-2026-UP-7720',
    panchayat: 'Rampur Kalan',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
  },
  {
    email: 'vle.officer@grammitra.in',
    password: 'GramMitra@2026',
    name: 'Rameshwar Verma (Village CSC Operator)',
    role: 'Village Help Center Operator',
    citizenId: 'CSC-UP-LKO-88492',
    panchayat: 'Rampur Kalan Hub',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
  },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  currentLanguage,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const t = LOGIN_TEXT[currentLanguage] || LOGIN_TEXT.en;

  const handleAutofill = (targetEmail = 'demo.citizen@grammitra.in') => {
    const cred = AUTHORIZED_CREDENTIALS.find((c) => c.email === targetEmail) || AUTHORIZED_CREDENTIALS[0];
    setEmail(cred.email);
    setPassword(cred.password);
    setErrorMessage(null);
    onShowToast(`Auto-filled credentials for ${cred.email}`, 'info');
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    onShowToast(`${label} copied to clipboard`, 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage(t.emptyFieldsError);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Check if email is in the authorized temporary credentials
      const matchedUser = AUTHORIZED_CREDENTIALS.find(
        (c) => c.email.toLowerCase() === trimmedEmail
      );

      if (!matchedUser) {
        setIsLoading(false);
        setErrorMessage(
          `${t.invalidEmailError} Entered: "${trimmedEmail}". Please use "demo.citizen@grammitra.in" or "laluaj677@gmail.com".`
        );
        onShowToast('Authentication failed: Credentials not available for this email', 'warning');
        return;
      }

      // Check password
      if (matchedUser.password !== trimmedPassword) {
        setIsLoading(false);
        setErrorMessage(t.invalidPasswordError);
        onShowToast('Authentication failed: Incorrect password', 'warning');
        return;
      }

      // Successful verification
      setIsLoading(false);
      const authUser: AuthUser = {
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
        citizenId: matchedUser.citizenId,
        panchayat: matchedUser.panchayat,
        district: matchedUser.district,
        state: matchedUser.state,
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      if (rememberMe) {
        localStorage.setItem('grammitra_auth_user', JSON.stringify(authUser));
      }

      onShowToast(`Welcome, ${authUser.name}! You are now logged in.`, 'success');
      onLoginSuccess(authUser);
    }, 650);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12 bg-linear-to-b from-surface-container-lowest via-surface to-surface-container-low">
      <div className="w-full max-w-xl space-y-6">
        {/* Header Branding Card */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-linear-to-br from-emerald-600 to-green-800 text-white shadow-xs mb-2">
            <span className="material-symbols-outlined text-4xl">cottage</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 tracking-wider">
            <span>GramMitra • Gram Panchayat Portal</span>
          </div>
          <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-outline max-w-md mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Temporary Credentials Banner Box */}
        <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-700 text-xl">vpn_key</span>
              <span className="font-bold text-sm text-amber-900">
                {t.tempCredentialsNotice}
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
              Deployment Mode
            </span>
          </div>

          <p className="text-xs text-amber-900/80 leading-relaxed">
            {t.tempCredentialsDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* Primary Email */}
            <div className="p-3 bg-white/90 rounded-2xl border border-amber-300 space-y-1">
              <span className="text-[10px] font-bold text-outline block uppercase tracking-wide">
                {t.authorizedEmailLabel} 1
              </span>
              <div className="flex items-center justify-between gap-1">
                <code className="text-xs font-mono font-bold text-on-surface select-all break-all">
                  demo.citizen@grammitra.in
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy('demo.citizen@grammitra.in', 'Email')}
                  className="p-1 text-outline hover:text-primary rounded-md cursor-pointer"
                  title="Copy Email"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedField === 'Email' ? 'done' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Secondary Email (User's direct email) */}
            <div className="p-3 bg-white/90 rounded-2xl border border-amber-300 space-y-1">
              <span className="text-[10px] font-bold text-outline block uppercase tracking-wide">
                {t.authorizedEmailLabel} 2 (Your Email)
              </span>
              <div className="flex items-center justify-between gap-1">
                <code className="text-xs font-mono font-bold text-on-surface select-all break-all">
                  laluaj677@gmail.com
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy('laluaj677@gmail.com', 'User Email')}
                  className="p-1 text-outline hover:text-primary rounded-md cursor-pointer"
                  title="Copy User Email"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedField === 'User Email' ? 'done' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="p-3 bg-white/90 rounded-2xl border border-amber-300 space-y-1 sm:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-outline block uppercase tracking-wide">
                  {t.authorizedPasswordLabel}
                </span>
                <span className="text-[10px] font-bold text-primary">Universal Passkey</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <code className="text-xs font-mono font-bold text-primary select-all">
                  GramMitra@2026
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy('GramMitra@2026', 'Password')}
                  className="p-1 text-outline hover:text-primary rounded-md cursor-pointer"
                  title="Copy Password"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedField === 'Password' ? 'done' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick 1-Click Autofill Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleAutofill('demo.citizen@grammitra.in')}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Fill: demo.citizen@grammitra.in</span>
            </button>
            <button
              type="button"
              onClick={() => handleAutofill('laluaj677@gmail.com')}
              className="flex-1 py-2 px-3 rounded-xl bg-white border border-amber-400 hover:bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">person</span>
              <span>Fill: laluaj677@gmail.com</span>
            </button>
          </div>

          {/* Honest Community Disclaimer */}
          <div className="p-3 bg-stone-100 rounded-xl border border-stone-300 text-[11px] text-stone-700 flex items-start gap-2">
            <span className="material-symbols-outlined text-amber-700 text-base shrink-0 mt-0.5">info</span>
            <span>
              {currentLanguage === 'hi'
                ? 'नोट: ग्राममित्र एक स्वतंत्र ग्रामीण सामुदायिक व पंचायत सेवा पोर्टल है। यह किसी भी सरकारी निकाय या मंत्रालय का आधिकारिक प्रमाणित ऐप नहीं है।'
                : 'Note: GramMitra is an open community helper web portal for Gram Panchayat citizens and shopkeepers. It is not affiliated with or certified by any government body.'}
            </span>
          </div>
        </div>

        {/* Sign In Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-surface-variant shadow-lg space-y-5">
          {/* Error Banner if invalid credentials entered */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-error/10 border border-error/30 text-error flex items-start gap-3 animate-in fade-in">
              <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">error</span>
              <div className="space-y-1">
                <div className="font-bold text-xs">{errorMessage}</div>
                <div className="text-[11px] opacity-90">
                  Tip: Click one of the amber buttons above to immediately populate the quick login credentials.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-on-surface">
                {t.emailInputLabel}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-outline text-lg">
                  alternate_email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="demo.citizen@grammitra.in"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-surface-variant bg-surface-container-low text-on-surface text-sm font-medium focus:border-primary focus:bg-white focus:outline-hidden transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-on-surface">
                {t.passwordInputLabel}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-outline text-lg">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-surface-variant bg-surface-container-low text-on-surface text-sm font-medium focus:border-primary focus:bg-white focus:outline-hidden transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-outline hover:text-on-surface p-0.5 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-outline hover:text-on-surface">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-sm accent-primary w-4 h-4 cursor-pointer"
                />
                <span>{t.rememberMe}</span>
              </label>

              <button
                type="button"
                onClick={() => handleAutofill()}
                className="text-primary hover:underline font-bold text-xs cursor-pointer"
              >
                Reset to Demo Key
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span>{t.verifyingButton}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">lock_open</span>
                  <span>{t.signInButton}</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="pt-3 border-t border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-outline">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
              <span>{t.secureAuthNote}</span>
            </div>
            <span>{t.citizenSupportLink}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
