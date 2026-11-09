import { useEffect, useState } from "react";
import {
  type FirestoreResource,
  subscribeToResources,
} from "../services/resources";

export function useResources(): FirestoreResource[] {
  const [resources, setResources] = useState<FirestoreResource[]>([]);

  useEffect(() => {
    return subscribeToResources(setResources, (error) => {
      console.error("Unable to load Firebase resources.", error);
    });
  }, []);

  return resources;
}
