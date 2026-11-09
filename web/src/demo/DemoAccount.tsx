import { createContext, type ReactNode, useContext, useState } from "react";

export type DemoProfile = {
  firstName: string;
  lastName: string;
  email: string;
  ufid: string;
  avatar?: string;
};
export type DemoSettings = {
  dark: boolean;
  events: boolean;
  meetings: boolean;
  eventReminder: string;
  meetingReminder: string;
};
const sample: DemoProfile = {
  firstName: "GDG",
  lastName: "Admin",
  email: "gdg-admin@example.com",
  ufid: "00000000",
};
const defaults: DemoSettings = {
  dark: false,
  events: true,
  meetings: true,
  eventReminder: "1 Hour",
  meetingReminder: "30 Minutes",
};
type Account = {
  profile: DemoProfile | null;
  settings: DemoSettings;
  signIn: () => void;
  saveProfile: (value: DemoProfile) => void;
  saveSettings: (value: DemoSettings) => void;
  logOut: () => void;
};
const DemoContext = createContext<Account | null>(null);

// Preview state only. It is never an authentication credential and never reaches the backend.
export function DemoAccountProvider({ children }: { children: ReactNode }) {
  const [profile, saveProfile] = useState<DemoProfile | null>(null);
  const [settings, saveSettings] = useState<DemoSettings>(defaults);
  function logOut() {
    saveProfile(null);
    saveSettings(defaults);
  }
  return (
    <DemoContext.Provider
      value={{
        profile,
        settings,
        signIn: () => saveProfile({ ...sample }),
        saveProfile,
        saveSettings,
        logOut,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
export function useDemoAccount() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("DemoAccountProvider is required");
  return value;
}
