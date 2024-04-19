"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Chart } from "chart.js";
import {
  convertHoursToTime,
  convertMillisecondsToTime,
  millisecondsToTime,
} from "@/helper/convertMillisecondsToTime";
import ChartDataLabels from "chartjs-plugin-datalabels";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(ChartDataLabels);

const Dashboard = () => {
  const [timeEntries, setTimeEntries] = useState<
    { _id: string; totalDuration: number; entries: any }[]
  >([]);
  const [modal, setModal] = useState(false);
  const dialogRef = useRef<any>();
  const getTimeEntries = async () => {
    const response = await axios.get("/api/users/getalltimeentries");
    setTimeEntries(response.data.duration);
  };

  useEffect(() => {
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

  const durationData = withoutFormat.map((day) => {
    const entry = timeEntries.find(
      (entry) => new Date(entry._id).toLocaleDateString() === day
    );
    return entry ? entry?.totalDuration : 0;
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
          const seconds = Math.floor(duration / 1000);
          const durationHours = seconds / 3600;

          return durationHours;
        }),
        backgroundColor: ["#00a8b2"],
        borderSkipped: false,
        datalabels: {
          color: "black",
          anchor: "end",
          formatter: function (value: any, context: any) {
            const formattedValue = convertHoursToTime(value);

            return formattedValue;
          },
        },
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          color: (context: any) => {
            if (context.index === 0) {
              return "";
            } else {
              return "rgba(102,102,102,0.2)";
            }
          },
          displayBorder: false,
        },
        ticks: {
          callback: (value: any) => {
            return `${value}h   `;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-5 font-medium ">
      <div className="align-left">Dashboard</div>
      <div>
        <div className="flex bg-[#e9e9e9] p-3 rounded-sm items-center justify-between">
          <div>Today</div>
          <div className="relative " onClick={() => setModal(true)}>
            <dialog ref={dialogRef} open={modal}>
              <div className="absolute -left-32 space-y-2 ">
                <div className="bg-white   md:p-1 lg:p-4 md:space-y-1 lg:space-y-2 border md:w-48 lg:w-60  flex flex-col">
                  <span className="md:text-xl lg:text-2xl  md:py-1 lg:py-2">
                    Up Time
                  </span>
                  {timeEntries
                    .filter(
                      (time) =>
                        new Date(time._id).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                    )
                    .map((time, index) => {
                      const duration = time.totalDuration;
                      return (
                        <div key={index}>
                          {time.entries.map(
                            (entry: Entry, entryIndex: number) => {
                              let sessionIndex = entryIndex + 1;
                              return (
                                <div
                                  className="flex border-y-2 justify-between items-center space-y-2"
                                  key={`${time._id}-${entryIndex}`}
                                >
                                  <span>Session {sessionIndex} </span>
                                  <span>
                                    {millisecondsToTime(entry.duration)} hr
                                  </span>
                                </div>
                              );
                            }
                          )}
                          <div className="flex justify-between md:py-2 lg:pt-4">
                            {" "}
                            <span>Total Up Time:</span>
                            <span> {millisecondsToTime(duration)} hr</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="bg-white   md:p-1 lg:p-4 md:space-y-1 lg:space-y-2 border md:w-48 lg:w-60  flex flex-col">
                  <span className="md:text-xl lg:text-2xl  md:py-1 lg:py-2">
                    Idle Time
                  </span>
                  {timeEntries
                    .filter(
                      (time) =>
                        new Date(time._id).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                    )
                    .map((time, index) => {
                      const duration = time.totalDuration;
                      return (
                        <div key={index}>
                          <div className="flex justify-between ">
                            {" "}
                            <span>Total Idle Time:</span>
                            <span>
                              {" "}
                              {millisecondsToTime(28800000 - duration)} hr
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </dialog>
            <span className="text-[#868686] mr-2">Total:</span>
            <span className="text-xl font-medium">{totalHours}</span>
          </div>
        </div>
        <div className="bg-white " onClick={() => setModal(false)}>
          <Bar
            data={data as any}
            height={500}
            width={100}
            options={options as any}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
