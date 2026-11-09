import { onAuthStateChanged, type User } from "firebase/auth";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { signOutMember } from "../firebase/auth";
import { getFirebaseAuth, getFirebaseDb } from "../firebase/client";

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

const defaultSettings: DemoSettings = {
  dark: false,
  events: true,
  meetings: true,
  eventReminder: "1 Hour",
  meetingReminder: "30 Minutes",
};

type AccountContextValue = {
  user: User | null;
  profile: DemoProfile | null;
  loading: boolean;
  error: string | null;
  settings: DemoSettings;
  saveProfile: (value: DemoProfile) => Promise<void>;
  saveSettings: (value: DemoSettings) => void;
  logOut: () => Promise<void>;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function DemoAccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DemoProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState<DemoSettings>(defaultSettings);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(
      getFirebaseAuth(),
      (firebaseUser) => {
        unsubscribeProfile?.();
        unsubscribeProfile = undefined;

        setUser(firebaseUser);
        setProfile(null);
        setError(null);

        if (!firebaseUser) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const profileRef = doc(getFirebaseDb(), "profiles", firebaseUser.uid);

        unsubscribeProfile = onSnapshot(
          profileRef,
          (snapshot) => {
            if (!snapshot.exists()) {
              setProfile(null);
              setLoading(false);
              return;
            }

            const data = snapshot.data();

            const fullName =
              typeof data.full_name === "string" ? data.full_name.trim() : "";

            const nameParts = fullName ? fullName.split(/\s+/) : [];

            const firstName = nameParts[0] ?? "";
            const lastName = nameParts.slice(1).join(" ");

            setProfile({
              firstName,
              lastName,
              email:
                typeof data.google_email === "string"
                  ? data.google_email
                  : (firebaseUser.email ?? ""),
              ufid: "",
              avatar:
                typeof data.profilepicture_url === "string" &&
                data.profilepicture_url
                  ? data.profilepicture_url
                  : (firebaseUser.photoURL ?? undefined),
            });

            setError(null);
            setLoading(false);
          },
          (firestoreError) => {
            console.error("Failed to load Firebase profile:", firestoreError);

            setError(firestoreError.message);
            setProfile(null);
            setLoading(false);
          },
        );
      },
      (authError) => {
        console.error("Authentication error:", authError);
        setError(authError.message);
        setUser(null);
        setProfile(null);
        setLoading(false);
      },
    );

    return () => {
      unsubscribeAuth();
      unsubscribeProfile?.();
    };
  }, []);

  async function saveProfile(value: DemoProfile) {
    const firebaseUser = getFirebaseAuth().currentUser;

    if (!firebaseUser) {
      throw new Error("You must be signed in.");
    }

    const firstName = value.firstName.trim();
    const lastName = value.lastName.trim();

    if (!firstName || !lastName) {
      throw new Error("First and last name are required.");
    }

    if (value.email !== (firebaseUser.email ?? "")) {
      throw new Error("Your Google account email cannot be changed here.");
    }

    if (value.ufid) {
      throw new Error("UFID editing is not available yet.");
    }

    await updateDoc(doc(getFirebaseDb(), "profiles", firebaseUser.uid), {
      full_name: `${firstName} ${lastName}`,
      updated_at: serverTimestamp(),
    });
  }

  function saveSettings(value: DemoSettings) {
    setSettings(value);
  }

  async function logOut() {
    await signOutMember();

    setProfile(null);
    setSettings(defaultSettings);
  }

  return (
    <AccountContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        settings,
        saveProfile,
        saveSettings,
        logOut,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useDemoAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("DemoAccountProvider is required.");
  }

  return context;
}
