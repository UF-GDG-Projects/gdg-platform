import { useEffect, useState } from "react";
import {
  type FirestoreGalleryProject,
  subscribeToGalleryProjects,
} from "../services/gallery";

export function useGalleryProjects(): FirestoreGalleryProject[] {
  const [projects, setProjects] = useState<FirestoreGalleryProject[]>([]);

  useEffect(() => {
    return subscribeToGalleryProjects(setProjects, (error) => {
      console.error("Unable to load Firebase gallery projects.", error);
    });
  }, []);

  return projects;
}
