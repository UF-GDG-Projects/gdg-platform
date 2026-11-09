import { useEffect, useState } from "react";
import { type FirestoreResource, listResources } from "../services/resources";

export function useResources(): FirestoreResource[] {
  const [resources, setResources] = useState<FirestoreResource[]>([]);

  useEffect(() => {
    let isActive = true;

    listResources()
      .then((nextResources) => {
        if (isActive) setResources(nextResources);
      })
      .catch((error: unknown) => {
        console.error("Unable to load Firebase resources.", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return resources;
}
