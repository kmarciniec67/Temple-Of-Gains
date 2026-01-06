import { useCallback, useEffect, useState } from "react";
import { authHeaders } from "../utils/authHeaders";

export default function useWorkoutDetails(workoutId) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDetails = useCallback(async () => {
    if (!workoutId) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });

      if (res.status === 401 || res.status === 403) {
        throw new Error("UNAUTHORIZED");
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setWorkout(data);
    } catch (e) {
      setError(e.message || "Fetch error");
      setWorkout(null);
    } finally {
      setLoading(false);
    }
  }, [workoutId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return { workout, loading, error, refetch: fetchDetails };
}
