import type { Profile } from "@shared/schemas";
import { createContext, type ReactNode, useContext, useState } from "react";

export type DemoProfile = {
  firstName: string;
  lastName: string;
  email: string;
  ufid: string;
  avatar?: string;
  major?: string;
  minor?: string;
  gradSemester?: string;
  role?: string;
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

/** Convert frontend profile to backend Firestore Profile format */
export function toPlatformProfile(demo: DemoProfile): Partial<Profile> {
  return {
    full_name: `${demo.firstName} ${demo.lastName}`.trim(),
    first_name: demo.firstName,
    last_name: demo.lastName,
    ufid: demo.ufid,
    google_email: demo.email,
    profilepicture_url: demo.avatar || "",
    role: demo.role || "Member",
    major: demo.major || "",
    minor: demo.minor || "",
    grad_semester: demo.gradSemester || "",
    username: demo.email.split("@")[0] || "",
    attended_ids: [],
  };
}

/** Convert backend Firestore Profile into frontend profile format */
export function fromPlatformProfile(profile: Partial<Profile>): DemoProfile {
  const [first = "", ...rest] = (profile.full_name || "").split(" ");
  return {
    firstName: profile.first_name || first,
    lastName: profile.last_name || rest.join(" "),
    email: profile.google_email || "",
    ufid: profile.ufid || "",
    avatar: profile.profilepicture_url || undefined,
    major: profile.major || "",
    minor: profile.minor || "",
    gradSemester: profile.grad_semester || "",
    role: profile.role || "Member",
  };
}

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
