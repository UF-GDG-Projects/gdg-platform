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
): FirestoreResource {
  const parsed = resourceSchema.safeParse(document.data());

  if (!parsed.success) {
    throw new Error(
      `Resource ${document.id} does not match the shared schema: ${parsed.error.message}`,
    );
  }

  return {
    document_id: document.id,
    ...parsed.data,
  };
}

export function subscribeToResources(
  onResources: (resources: FirestoreResource[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(getFirebaseDb(), "resources"),
    (snapshot) =>
      onResources(
        snapshot.docs
          .map(parseResource)
          .filter((resource) => resource.is_active),
      ),
    onError,
  );
}
