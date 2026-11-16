import type { GalleryProject } from "@shared/schemas";
import { galleryProjectSchema } from "@shared/schemas";
import {
  collection,
  type DocumentData,
  onSnapshot,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "../firebase/client";

export type FirestoreGalleryProject = GalleryProject & {
  document_id: string;
};

function parseGalleryProject(
  document: QueryDocumentSnapshot<DocumentData>,
): FirestoreGalleryProject | null {
  try {
    const parsed = galleryProjectSchema.safeParse(document.data());

    if (!parsed.success) {
      console.warn(
        `Gallery project ${document.id} does not match schema, skipping:`,
        parsed.error.issues,
      );
      return null;
    }

    return { document_id: document.id, ...parsed.data };
  } catch (error) {
    console.warn(
      `Unexpected error parsing gallery project ${document.id}:`,
      error,
    );
    return null;
  }
}

export function subscribeToGalleryProjects(
  onProjects: (projects: FirestoreGalleryProject[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(getFirebaseDb(), "gallery_projects"),
    (snapshot) => {
      const projects: FirestoreGalleryProject[] = [];

      for (const document of snapshot.docs) {
        const project = parseGalleryProject(document);
        if (project?.is_active) projects.push(project);
      }

      projects.sort((a, b) => a.display_order - b.display_order);
      onProjects(projects);
    },
    onError,
  );
}
