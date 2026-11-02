/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { createEventSchema } from "../../shared/schemas.js";

// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });
initializeApp();

export const getEvents = onRequest(async (request, response) => {
  if (request.method !== "GET") {
    response.set("Allow", "GET");
    response.status(405).json({ error: "Use a GET request." });
    return;
  }

  try {
    const database = getFirestore();
    const snapshot = await database.collection("events").limit(50).get();

    const events = snapshot.docs.map((document) => {
      const data = document.data();

      return {
        document_id: document.id,
        event_id: data.event_id,
        title: data.title,
        description: data.description,
        address: data.address,
        location_name: data.location_name,
        points_value: data.points_value,
        created_at: data.created_at.toDate().toISOString(),
        starts_at: data.starts_at.toDate().toISOString(),
        ends_at: data.ends_at.toDate().toISOString(),
      };
    });

    response.status(200).json({ events });
  } catch (error) {
    console.error("Failed to read events:", error);
    response.status(500).json({ error: "Unable to retrieve events." });
  }
});

export const createEvent = onRequest(async (request, response) => {
  if (request.method !== "POST") {
    response.set("Allow", "POST");
    response.status(405).json({ error: "Use a POST request." });
    return;
  }

  // Allow local testing while organizer/admin authorization is pending.
  if (
    process.env.FUNCTIONS_EMULATOR !== "true" ||
    !process.env.FIRESTORE_EMULATOR_HOST
  ) {
    response.status(403).json({
      error: "Event creation is currently available only in local testing.",
    });
    return;
  }

  try {
    const result = createEventSchema.safeParse(request.body);

    if (!result.success) {
      response.status(400).json({
        error: "Invalid event details.",
        issues: result.error.issues,
      });
      return;
    }

    const database = getFirestore();

    const document = await database.collection("events").add({
      ...result.data,
      created_at: FieldValue.serverTimestamp(),
    });

    response.status(201).json({
      document_id: document.id,
      event_id: result.data.event_id,
    });
  } catch (error) {
    console.error("Failed to create event:", error);
    response.status(500).json({ error: "Unable to create event." });
  }
});

export const deleteEvent = onRequest(async (request, response) => {
  if (request.method !== "DELETE") {
    response.set("Allow", "DELETE");
    response.status(405).json({ error: "Use a DELETE request." });
    return;
  }

  // Allow local testing while organizer/admin authorization is pending.
  if (
    process.env.FUNCTIONS_EMULATOR !== "true" ||
    !process.env.FIRESTORE_EMULATOR_HOST
  ) {
    response.status(403).json({
      error: "Event deletion is currently available only in local testing.",
    });
    return;
  }

  const documentId = request.query.document_id;
  if (
    typeof documentId !== "string" ||
    documentId.trim().length === 0 ||
    documentId.includes("/") ||
    documentId === "." ||
    documentId === ".." ||
    Buffer.byteLength(documentId, "utf8") > 1500
  ) {
    response.status(400).json({ error: "A valid document_id is required." });
    return;
  }

  try {
    const database = getFirestore();
    const document = database.collection("events").doc(documentId);
    const deleted = await database.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(document);
      if (!snapshot.exists) {
        return false;
      }

      transaction.delete(document);
      return true;
    });

    if (!deleted) {
      response.status(404).json({ error: "Event not found." });
      return;
    }

    response.status(200).json({ document_id: documentId });
  } catch (error) {
    console.error("Failed to delete event:", error);
    response.status(500).json({ error: "Unable to delete event." });
  }
});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
