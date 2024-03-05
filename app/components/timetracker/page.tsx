"use client";
import axios from "axios";
import { useAppSelector, useAppDispatch, RootState } from "@/store/store";
import TimeEntries from "@/db/models/timeEntries";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import { UserData, setUserData } from "@/store/slices/userSlice";

const Timetracker = () => {
  const [timeEntries, setTimeEntries] = useState([]);
  const [task, setTask] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const user = useAppSelector((state: RootState) => state.userData);
  const dispatch = useAppDispatch();
  function formatTime(date) {
    const hours = formatTimePart(date.getHours());
    const minutes = formatTimePart(date.getMinutes());
    const seconds = formatTimePart(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  function formatTimePart(part) {
    return part.toString().padStart(2, "0");
  }
  const handleOnClick = async () => {
    if (task.trim() !== "") {
      const bodydata = { task, user };

      const response = await axios.post("/api/users/timeentry", bodydata);
      if (user) {
        dispatch(
          setUserData({
            ...user,
            isTimer: response.data.updatedTimer,
          })
        );
      }
    } else {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    const fetchingData = async () => {
      const response = await axios.get("/api/users/getalltimenetries");
      const result = Object.groupBy(response.data.data, (data) => {
        return new Date(data.start_time).toLocaleDateString();
      });
      setTimeEntries(result);
    };
    fetchingData();
  }, [user?.isTimer]);
  console.log(timeEntries);
  return (
    <div>
      <div className="flex bg-white h-14">
        <div className=" flex p-2 w-3/5">
          <div className="w-full">
            <input
              onChange={(e) => {
                setTask(e.target.value);
                setErrorMessage(false);
              }}
              className={`bg-[#e4e0e0]  w-full h-full ${
                errorMessage
                  ? "border border-red-700"
                  : "hover:border-green-700"
              }`}
              value={task}
              type="text"
              placeholder={
                errorMessage
                  ? "This field is required"
                  : "What are you working on"
              }
              required
            ></input>
          </div>
        </div>
        <button type="submit" onClick={handleOnClick}>
          {user?.isTimer ? "Stop" : "Start"}
        </button>
      </div>
      {Object.keys(timeEntries)?.map((date) => (
        <div key={date}>
          <h2>{date}</h2>
          {timeEntries[date].map((entry) => (
            <div key={entry._id}>
              <p>Start Time: {formatTime(new Date(entry.start_time))}</p>
              <p>End Time: {formatTime(new Date(entry.end_time))}</p>
              <p>Duration</p>
              <p>Task: {entry.task}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timetracker;
