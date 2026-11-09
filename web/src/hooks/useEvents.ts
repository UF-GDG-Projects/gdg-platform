import { useEffect, useState } from "react";
import { type FirestoreEvent, listEvents } from "../services/events";

type EventsState = {
  events: FirestoreEvent[];
  isLoading: boolean;
  error: string | null;
};

export function useEvents(maxResults = 50): EventsState {
  const [state, setState] = useState<EventsState>({
    events: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isActive = true;

    listEvents(maxResults)
      .then((events) => {
        if (isActive) setState({ events, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        const message =
          error instanceof Error ? error.message : "Unable to load events.";
        setState({ events: [], isLoading: false, error: message });
      });

    return () => {
      isActive = false;
    };
  }, [maxResults]);

  return state;
}
