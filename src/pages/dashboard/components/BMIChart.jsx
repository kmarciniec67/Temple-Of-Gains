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

import bmiStyles from "./BMIChart.module.css";

const BMIChart = ({ chartData, latest, status }) => {
  if (!chartData || chartData.length < 2) {
    return (
      <p>Dodaj minimum 2 pomiary z wagą i wzrostem, aby zobaczyć wykres BMI.</p>
    );
  }

  return (
    <div className={bmiStyles.bmiRow}>
      <div className={bmiStyles.chartWrap}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 24, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickMargin={10} />
            <YAxis
              tickMargin={10}
              width={50}
              domain={["dataMin - 1", "dataMax + 1"]}
              label={{ value: "BMI", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bmi"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={bmiStyles.card}>
        <div className={bmiStyles.cardTitle}>BMI (ostatni pomiar)</div>
        <div className={bmiStyles.cardValue}>{latest?.bmi ?? "-"}</div>

        <div className={bmiStyles.cardStatus}>
          Status:{" "}
          <span
            className={
              status?.kind === "ok"
                ? bmiStyles.ok
                : status?.kind === "warn"
                  ? bmiStyles.warn
                  : status?.kind === "bad"
                    ? bmiStyles.bad
                    : ""
            }
          >
            {status?.label ?? "Brak danych"}
          </span>
        </div>

        <div className={bmiStyles.cardHint}>
          Zakres normy dla dorosłych: 18.5–24.9
        </div>
      </div>
    </div>
  );
};

export default BMIChart;
