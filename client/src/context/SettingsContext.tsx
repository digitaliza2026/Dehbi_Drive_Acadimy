import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Settings {
  schoolName: string;
  tagline: string;
  address: string;
  phone: string;
  phoneFixed: string;
  email: string;
  instagram: string;
  facebook: string;
  instagramHandle: string;
  facebookHandle: string;
  stats: {
    years: number;
    candidates: number;
    branches: number;
    since: number;
  };
}

const defaultSettings: Settings = {
  schoolName: 'Dehbi Drive Academy',
  tagline: "30 ans d'excellence dans l'enseignement de la conduite",
  address: '1er étage, Espace Rihab Fès, Imm C, Av Allal Ben Abdellah, VN Fès, Maroc',
  phone: '0663 722 722',
  phoneFixed: '0532 138 710',
  email: 'Dehbi.drive@gmail.com',
  instagram: 'https://instagram.com/dehbi_drive_academy',
  facebook: 'https://facebook.com/Dehbi Drive academy',
  instagramHandle: '@dehbi_drive_academy',
  facebookHandle: 'Dehbi Drive academy',
  stats: { years: 30, candidates: 10000, branches: 7, since: 1994 }
};

const SettingsContext = createContext<Settings>(defaultSettings);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) setSettings({ ...defaultSettings, ...data });
      })
      .catch(() => {});
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
