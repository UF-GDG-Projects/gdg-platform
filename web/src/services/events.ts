import type { Event as PlatformEvent } from "@shared/schemas";
import { eventSchema } from "@shared/schemas";
import {
  collection,
  type DocumentData,
  limit,
  onSnapshot,
  orderBy,
  type QueryDocumentSnapshot,
  query,
  Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "../firebase/client";

export type FirestoreEvent = PlatformEvent & {
  document_id: string;
};

function toDate(value: unknown, fieldName: string): Date {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;

  throw new Error(`Event field ${fieldName} is not a Firestore timestamp.`);
}

function parseEvent(
  document: QueryDocumentSnapshot<DocumentData>,
): FirestoreEvent {
  const data = document.data();
  const parsed = eventSchema.safeParse({
    ...data,
    created_at: toDate(data.created_at, "created_at"),
    starts_at: toDate(data.starts_at, "starts_at"),
    ends_at: toDate(data.ends_at, "ends_at"),
  });

  if (!parsed.success) {
    throw new Error(
      `Event ${document.id} does not match the shared schema: ${parsed.error.message}`,
    );
  }

  return {
    document_id: document.id,
    ...parsed.data,
  };
}

export function subscribeToEvents(
  onEvents: (events: FirestoreEvent[]) => void,
  onError: (error: Error) => void,
  maxResults = 50,
): Unsubscribe {
  const eventsQuery = query(
    collection(getFirebaseDb(), "events"),
    orderBy("starts_at", "asc"),
    limit(maxResults),
  );

  return onSnapshot(
    eventsQuery,
    (snapshot) => onEvents(snapshot.docs.map(parseEvent)),
    onError,
  );
}
