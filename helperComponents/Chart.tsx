import React from "react";
import { Chart } from "chart.js/auto";

function TimeTrackerChart({ data }) {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Hours Worked",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Process data for chart
  for (const date in data) {
    const entries = data[date];
    const totalDuration = entries.reduce(
      (acc, entry) => acc + entry.duration / (1000 * 60 * 60),
      0
    ); // Convert to hours

    chartData.labels.push(date);
    chartData.datasets[0].data.push(totalDuration.toFixed(2)); // Format to 2 decimal places
  }

  return (
    <div>
      <canvas id="timeTrackerChart" width="600" height="400"></canvas>
    </div>
  );
}

export default TimeTrackerChart;
