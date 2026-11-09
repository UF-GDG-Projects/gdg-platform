import { useEffect, useState } from "react";
import { type FirestoreEvent, subscribeToEvents } from "../services/events";

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
    return subscribeToEvents(
      (events) => setState({ events, isLoading: false, error: null }),
      (error) => {
        const message =
          error instanceof Error ? error.message : "Unable to load events.";
        setState({ events: [], isLoading: false, error: message });
      },
      maxResults,
    );
  }, [maxResults]);

  return state;
}
