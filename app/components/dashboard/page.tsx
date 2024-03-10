"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Chart } from "chart.js";
import { convertMillisecondsToTime } from "@/helper/convertMillisecondsToTime";

import axios from "axios";
import { useState, useEffect } from "react";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

const dashboard = () => {
  const [timeEntries, setTimeEntries] = useState<
    { _id: string; totalDuration: number }[]
  >([]);

  const getTimeEntries = async () => {
    const response = await axios.get("/api/users/getalltimeentries");

    setTimeEntries(response.data.duration);
  };
  useEffect(() => {
    getTimeEntries();
  }, []);
  let totalHours = "";
  const data = {
    labels: timeEntries.map((day) => {
      const today = new Date().toLocaleDateString();
      const dateToCheck = new Date(day._id).toLocaleDateString();

      if (today == dateToCheck) {
        totalHours = convertMillisecondsToTime(day.totalDuration);
      } else {
      }
      return day._id;
    }),
    datasets: [
      {
        label: "duration",
        data: timeEntries.map((duration) => {
          console.log(duration);
          const seconds = Math.round(duration.totalDuration);
          const durationHours = Math.floor(seconds / 3600);
          return durationHours;
        }),
        backgroundColor: ["#00a8b2"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Working Hours",
      },
    },
    scales: {
      x: {
        grid: {
          drawBorder: false,
        },
      },
      y: {
        min: 0,
        max: 9,
        stepSize: 1,
        grid: {},
      },
    },
  };
  return (
    <div className="space-y-5 font-medium">
      <div className="align-left">Dashboard</div>
      <div>
        <div className="flex bg-[#e9e9e9] p-3 rounded-sm items-center justify-between">
          <div>Today</div>
          <div>
            <span className="text-[#868686] mr-2">Total:</span>
            <span className="text-xl font-medium">{totalHours}</span>
          </div>
        </div>
        <div className="bg-white">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
