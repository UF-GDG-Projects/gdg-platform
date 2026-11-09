import type { Resource } from "@shared/schemas";
import { resourceSchema } from "@shared/schemas";
import {
  collection,
  type DocumentData,
  onSnapshot,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "../firebase/client";

export type FirestoreResource = Resource & {
  document_id: string;
};

function parseResource(
  document: QueryDocumentSnapshot<DocumentData>,
): FirestoreResource | null {
  try {
    const parsed = resourceSchema.safeParse(document.data());

    if (!parsed.success) {
      console.warn(
        `Resource document ${document.id} does not match schema, skipping:`,
        parsed.error.issues,
      );
      return null;
    }

    return {
      document_id: document.id,
      ...parsed.data,
    };
  } catch (err) {
    console.warn(`Unexpected error parsing resource ${document.id}:`, err);
    return null;
  }
}

export function subscribeToResources(
  onResources: (resources: FirestoreResource[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(getFirebaseDb(), "resources"),
    (snapshot) => {
      const resources: FirestoreResource[] = [];
      for (const doc of snapshot.docs) {
        const parsed = parseResource(doc);
        if (parsed?.is_active) {
          resources.push(parsed);
        }
      }
      onResources(resources);
    },
    onError,
  );
}
