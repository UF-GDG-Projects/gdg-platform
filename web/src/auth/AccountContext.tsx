import {
  type Profile,
  type ProfileSettings,
  profileSettingsSchema,
} from "@shared/schemas";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  type DocumentData,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getFirebaseAuth, getFirebaseDb } from "../firebase/client";

export type AccountProfile = {
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

export type AccountSettings = ProfileSettings;

export const defaultSettings: AccountSettings = {
  dark: false,
  events: true,
  meetings: true,
  eventReminder: "1 Hour",
  meetingReminder: "30 Minutes",
};

const SETTINGS_STORAGE_KEY = "gdg-account-settings";

function readStoredSettings(): AccountSettings {
  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) return defaultSettings;
    const parsed = profileSettingsSchema.safeParse(JSON.parse(stored));
    return parsed.success ? parsed.data : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function namesFromUser(user: User) {
  const parts = (user.displayName || "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "GDG",
    lastName: parts.slice(1).join(" ") || "Member",
  };
}

function profileFromDocument(
  user: User,
  data: DocumentData | undefined,
): AccountProfile {
  const fallback = namesFromUser(user);
  return {
    firstName:
      typeof data?.first_name === "string" && data.first_name.trim()
        ? data.first_name
        : fallback.firstName,
    lastName:
      typeof data?.last_name === "string" && data.last_name.trim()
        ? data.last_name
        : fallback.lastName,
    email:
      typeof data?.google_email === "string" && data.google_email.trim()
        ? data.google_email
        : user.email || "",
    ufid: typeof data?.ufid === "string" ? data.ufid : "",
    avatar:
      typeof data?.profilepicture_url === "string" && data.profilepicture_url
        ? data.profilepicture_url
        : user.photoURL || undefined,
    major: typeof data?.major === "string" ? data.major : "",
    minor: typeof data?.minor === "string" ? data.minor : "",
    gradSemester:
      typeof data?.grad_semester === "string" ? data.grad_semester : "",
    role: typeof data?.role === "string" ? data.role : "Member",
  };
}

function profileDocument(
  profile: AccountProfile,
): Omit<Profile, "attended_ids" | "created_at" | "settings" | "updated_at"> {
  return {
    full_name: `${profile.firstName} ${profile.lastName}`.trim(),
    first_name: profile.firstName,
    last_name: profile.lastName,
    ufid: profile.ufid,
    google_email: profile.email,
    profilepicture_url: profile.avatar || "",
    role: profile.role || "Member",
    major: profile.major || "",
    minor: profile.minor || "",
    grad_semester: profile.gradSemester || "",
    username: profile.email.split("@")[0] || "",
  };
}

type Account = {
  user: User | null;
  profile: AccountProfile | null;
  settings: AccountSettings;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<User>;
  saveProfile: (value: AccountProfile) => Promise<void>;
  saveSettings: (value: AccountSettings) => Promise<void>;
  logOut: () => Promise<void>;
};

const AccountContext = createContext<Account | null>(null);

function authMessage(error: unknown) {
  if (!(error instanceof Error)) return "Unable to sign in with Google.";
  const code = "code" in error ? String(error.code) : "";
  if (code.includes("popup-closed-by-user"))
    return "Google sign-in was closed.";
  if (code.includes("popup-blocked")) {
    return "Your browser blocked the Google sign-in window. Allow pop-ups and try again.";
  }
  if (code.includes("operation-not-allowed")) {
    return "Google sign-in still needs to be enabled in the Firebase console.";
  }
  return error.message || "Unable to sign in with Google.";
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [settings, setSettings] = useState<AccountSettings>(readStoredSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAccount = useCallback(async (nextUser: User) => {
    const reference = doc(getFirebaseDb(), "profiles", nextUser.uid);
    const snapshot = await getDoc(reference);
    const data = snapshot.exists() ? snapshot.data() : undefined;
    const nextProfile = profileFromDocument(nextUser, data);
    const parsedSettings = profileSettingsSchema.safeParse(data?.settings);
    const nextSettings = parsedSettings.success
      ? parsedSettings.data
      : readStoredSettings();

    if (!snapshot.exists()) {
      await setDoc(reference, {
        ...profileDocument(nextProfile),
        attended_ids: [],
        settings: nextSettings,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
    }

    setProfile(nextProfile);
    setSettings(nextSettings);
    return nextProfile;
  }, []);

  useEffect(() => {
    const auth = getFirebaseAuth();
    void setPersistence(auth, browserLocalPersistence).catch((reason) => {
      console.error("Unable to enable persistent Firebase sign-in.", reason);
    });

    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setError(null);
      if (!nextUser) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        await loadAccount(nextUser);
      } catch (reason) {
        console.error("Unable to load the Firebase profile.", reason);
        setProfile(profileFromDocument(nextUser, undefined));
        setError("You are signed in, but your profile could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    });
  }, [loadAccount]);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.dark ? "dark" : "light";
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo<Account>(
    () => ({
      user,
      profile,
      settings,
      isLoading,
      error,
      signInWithGoogle: async () => {
        setError(null);
        try {
          const auth = getFirebaseAuth();
          await setPersistence(auth, browserLocalPersistence);
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: "select_account" });
          const result = await signInWithPopup(auth, provider);
          setUser(result.user);
          setIsLoading(true);
          await loadAccount(result.user);
          setIsLoading(false);
          return result.user;
        } catch (reason) {
          setIsLoading(false);
          const message = authMessage(reason);
          setError(message);
          throw new Error(message);
        }
      },
      saveProfile: async (value) => {
        if (!user) throw new Error("Sign in before saving your profile.");
        setProfile(value);
        await setDoc(
          doc(getFirebaseDb(), "profiles", user.uid),
          {
            ...profileDocument(value),
            updated_at: serverTimestamp(),
          },
          { merge: true },
        );
      },
      saveSettings: async (value) => {
        setSettings(value);
        if (!user) return;
        await setDoc(
          doc(getFirebaseDb(), "profiles", user.uid),
          { settings: value, updated_at: serverTimestamp() },
          { merge: true },
        );
      },
      logOut: async () => {
        await signOut(getFirebaseAuth());
        setUser(null);
        setProfile(null);
      },
    }),
    [error, isLoading, loadAccount, profile, settings, user],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const value = useContext(AccountContext);
  if (!value) throw new Error("AccountProvider is required");
  return value;
}
