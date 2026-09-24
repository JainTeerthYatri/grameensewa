export type ScreenType =
  | 'login'
  | 'gateway'
  | 'feasibility'
  | 'calculator'
  | 'cluster-map'
  | 'loan-simulator'
  | 'khata';

export interface AuthUser {
  email: string;
  name: string;
  role: string;
  citizenId: string;
  panchayat: string;
  district: string;
  state: string;
  loginTime: string;
}

export type SupportedLanguage =
  | 'hi'
  | 'en'
  | 'bn'
  | 'mr'
  | 'te'
  | 'ta'
  | 'gu'
  | 'ur'
  | 'kn'
  | 'or'
  | 'ml'
  | 'pa';

export interface LanguageInfo {
  code: SupportedLanguage;
  nativeName: string;
  englishName: string;
  region: string;
  sampleEmi: string;
}

export type GatewayRole = 'beneficiary' | 'vle' | 'sca' | 'dic' | 'central';
