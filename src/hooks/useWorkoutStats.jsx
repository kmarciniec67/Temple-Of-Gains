import { useCallback, useEffect, useState } from "react";
import { authHeaders } from "../utils/authHeaders";

export default function useWorkoutStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/workouts/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });

      if (res.status === 401 || res.status === 403)
        throw new Error("UNAUTHORIZED");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setStats(data);
    } catch (e) {
      setStats(null);
      setError(e.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
