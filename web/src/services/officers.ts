import type { Officer } from "@shared/schemas";
import { officerSchema } from "@shared/schemas";
import {
  collection,
  type DocumentData,
  onSnapshot,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "../firebase/client";

export type FirestoreOfficer = Officer & {
  document_id: string;
};

function parseOfficer(
  document: QueryDocumentSnapshot<DocumentData>,
): FirestoreOfficer | null {
  const parsed = officerSchema.safeParse(document.data());
  if (!parsed.success) {
    console.warn(
      `Officer ${document.id} does not match the expected fields, skipping:`,
      parsed.error.issues,
    );
    return null;
  }
  return { document_id: document.id, ...parsed.data };
}

export function subscribeToOfficers(
  onOfficers: (officers: FirestoreOfficer[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(getFirebaseDb(), "officers"),
    (snapshot) => {
      const officers = snapshot.docs
        .map(parseOfficer)
        .filter((officer): officer is FirestoreOfficer => officer !== null)
        .sort((a, b) => a.display_order - b.display_order);
      onOfficers(officers);
    },
    onError,
  );
}
