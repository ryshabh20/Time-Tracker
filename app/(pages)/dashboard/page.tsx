"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Chart } from "chart.js";
import {
  convertHoursToTime,
  convertMillisecondsToTime,
} from "@/helper/convertMillisecondsToTime";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { setUserData } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";

import axios from "axios";
import { useState, useEffect } from "react";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(ChartDataLabels);

const dashboard = () => {
  const [timeEntries, setTimeEntries] = useState<
    { _id: string; totalDuration: number }[]
  >([]);
  const dispatch = useAppDispatch();
  const getTimeEntries = async () => {
    const response = await axios.get("/api/users/getalltimeentries");
    setTimeEntries(response.data.duration);
  };
  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get("/api/users/currentUser");
      dispatch(setUserData({ ...response.data.data, currentTask: "" }));
      // setUser(response.data.data);
    };
    getUserDetails();
    getTimeEntries();
  }, []);
  const lastWeek = [];
  const withoutFormat = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",

      month: "long",

      day: "numeric",
    });

    lastWeek.push(formattedDate);

    withoutFormat.push(date.toLocaleDateString());
  }
  console.log(lastWeek);

  const durationData = withoutFormat.map((day) => {
    const entry = timeEntries.find(
      (entry) => new Date(entry._id).toLocaleDateString() === day
    );
    return entry ? entry.totalDuration : 0;
  });
  const maxDuration = Math.max(...durationData);
  let totalHours = convertMillisecondsToTime(
    durationData[durationData.length - 1]
  );

  const data = {
    labels: lastWeek.map((day) => day),
    datasets: [
      {
        label: "duration",
        data: durationData.map((duration) => {
          const seconds = Math.round(duration / 1000);
          const durationHours = seconds / 3600;

          return durationHours;
        }),
        backgroundColor: ["#00a8b2"],
        borderSkipped: false,
        datalabels: {
          color: "black",
          anchor: "end",
          formatter: function (value, context) {
            const formattedValue = convertHoursToTime(value);

            return formattedValue;
          },
        },
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
      },
      title: {
        display: true,
        text: "Working Hours",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 9,
        stepSize: 1,
        grid: {
          color: (context) => {
            if (context.index === 0) {
              return "";
            } else {
              return "rgba(102,102,102,0.2)";
            }
          },
          displayBorder: false,
        },
        ticks: {
          callback: (value) => {
            return `${value}h   `;
          },
        },
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
