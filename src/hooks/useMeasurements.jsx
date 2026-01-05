import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useMeasurements() {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refetch = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/measurements", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setMeasurements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch measurements failed:", err);
      setMeasurements([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { measurements, loading, refetch, setMeasurements };
}
