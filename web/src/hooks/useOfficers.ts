import { useEffect, useState } from "react";
import {
  type FirestoreOfficer,
  subscribeToOfficers,
} from "../services/officers";

export function useOfficers(): FirestoreOfficer[] {
  const [officers, setOfficers] = useState<FirestoreOfficer[]>([]);

  useEffect(() => {
    return subscribeToOfficers(setOfficers, (error) => {
      console.error("Unable to load Firebase officers.", error);
    });
  }, []);

  return officers;
}
