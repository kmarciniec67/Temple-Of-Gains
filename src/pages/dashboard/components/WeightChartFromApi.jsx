import React from "react";
import useMeasurements from "../../../hooks/useMeasurements";
import WeightChart from "./WeightChart";

const formatDatePL = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString("pl-PL");
};

const WeightChartFromApi = () => {
  const { measurements, loading } = useMeasurements();

  if (loading) return <p>Ładowanie wykresu...</p>;

  return <WeightChart measurements={measurements} formatDate={formatDatePL} />;
};

export default WeightChartFromApi;
