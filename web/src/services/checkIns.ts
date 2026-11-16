import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "../firebase/client";

function checkInReference(eventId: string, userId: string) {
  return doc(getFirebaseDb(), "events", eventId, "checkins", userId);
}

export function subscribeToCheckIn(
  eventId: string,
  userId: string,
  onChange: (checkedIn: boolean) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    checkInReference(eventId, userId),
    (snapshot) => onChange(snapshot.exists()),
    onError,
  );
}

export async function checkInToEvent(
  eventId: string,
  userId: string,
): Promise<void> {
  await setDoc(checkInReference(eventId, userId), {
    event_id: eventId,
    user_id: userId,
    checked_in_at: serverTimestamp(),
  });
}
