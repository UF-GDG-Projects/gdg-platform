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

function toDate(value: unknown): Date | null {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}

function parseEvent(
  document: QueryDocumentSnapshot<DocumentData>,
): FirestoreEvent | null {
  try {
    const data = document.data();
    const createdAt = toDate(data.created_at);
    const startsAt = toDate(data.starts_at);
    const endsAt = toDate(data.ends_at);

    if (!createdAt || !startsAt || !endsAt) {
      console.warn(
        `Event document ${document.id} missing or invalid timestamps, skipping.`,
      );
      return null;
    }

    const parsed = eventSchema.safeParse({
      ...data,
      created_at: createdAt,
      starts_at: startsAt,
      ends_at: endsAt,
    });

    if (!parsed.success) {
      console.warn(
        `Event document ${document.id} does not match schema, skipping:`,
        parsed.error.issues,
      );
      return null;
    }

    return {
      document_id: document.id,
      ...parsed.data,
    };
  } catch (err) {
    console.warn(`Unexpected error parsing event ${document.id}:`, err);
    return null;
  }
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
    (snapshot) => {
      const events: FirestoreEvent[] = [];
      for (const doc of snapshot.docs) {
        const parsed = parseEvent(doc);
        if (parsed) {
          events.push(parsed);
        }
      }
      onEvents(events);
    },
    onError,
  );
}
