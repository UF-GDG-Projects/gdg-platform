import type { Event as PlatformEvent } from "@shared/schemas";
import { eventSchema } from "@shared/schemas";
import {
  collection,
  type DocumentData,
  getDocs,
  limit,
  orderBy,
  type QueryDocumentSnapshot,
  query,
  Timestamp,
} from "firebase/firestore/lite";
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

export async function listEvents(maxResults = 50): Promise<FirestoreEvent[]> {
  const eventsQuery = query(
    collection(getFirebaseDb(), "events"),
    orderBy("starts_at", "asc"),
    limit(maxResults),
  );
  const snapshot = await getDocs(eventsQuery);

  return snapshot.docs.map(parseEvent);
}
