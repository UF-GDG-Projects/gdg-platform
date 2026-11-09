import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getFirebaseAuth, getFirebaseDb } from "./client";

export function watchAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(getFirebaseAuth(), provider);

  const profileRef = doc(getFirebaseDb(), "profiles", result.user.uid);

  const profile = await getDoc(profileRef);

  return {
    user: result.user,
    hasProfile: profile.exists(),
  };
}

export async function loadMemberProfile(uid: string) {
  const snapshot = await getDoc(doc(getFirebaseDb(), "profiles", uid));

  return snapshot.exists() ? snapshot.data() : null;
}

export async function saveMemberProfile(
  user: User,
  firstName: string,
  lastName: string,
) {
  const profileRef = doc(getFirebaseDb(), "profiles", user.uid);

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

  const existing = await getDoc(profileRef);

  if (existing.exists()) {
    await updateDoc(profileRef, {
      full_name: fullName,
      updated_at: serverTimestamp(),
    });
  } else {
    await setDoc(profileRef, {
      full_name: fullName,
      google_email: user.email ?? "",
      profilepicture_url: user.photoURL ?? "",
      username: user.email?.split("@")[0] ?? user.uid,
      role: "member",
      attended_ids: [],
      major: "",
      minor: "",
      grad_semester: "",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
  }
}

export async function signOutMember() {
  await signOut(getFirebaseAuth());
}
