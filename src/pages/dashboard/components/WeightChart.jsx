import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const WeightChart = ({ measurements, formatDate }) => {
  const chartData = (measurements || [])
    .filter(
      (m) =>
        m?.body_weight !== null &&
        m?.body_weight !== undefined &&
        m?.body_weight !== "",
    )
    .map((m) => ({
      date: formatDate
        ? formatDate(m.date)
        : new Date(m.date).toLocaleDateString("pl-PL"),
      weight: Number(m.body_weight),
      rawDate: new Date(m.date).getTime(),
    }))
    .filter((d) => Number.isFinite(d.weight) && Number.isFinite(d.rawDate))
    .sort((a, b) => a.rawDate - b.rawDate)
    .map(({ rawDate, ...rest }) => rest);

  if (chartData.length < 2) {
    return <p>Dodaj minimum 2 pomiary wagi, aby zobaczyć wykres.</p>;
  }

  return (
    <div style={{ width: "100%", minHeight: 280 }}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickMargin={10} />
          <YAxis
            tickMargin={10}
            width={50}
            domain={["dataMin - 1", "dataMax + 1"]}
            label={{ value: "kg", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="weight"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
