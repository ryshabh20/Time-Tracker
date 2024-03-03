"use client";
import axios from "axios";
import { useAppSelector } from "@/store/store";

import { useState } from "react";
const timetracker = () => {
  const user = useAppSelector((state) => state.userData);

  const [task, setTask] = useState("");
  const [timer, setTimer] = useState(false);
  const data = { task, timer };
  const handleOnClick = async () => {
    setTimer(!timer);
    // const user = await axios.get("/api/users/currentUser");
    const bodydata = { ...data, user };
    const response = await axios.post("/api/users/timeentry", bodydata);
  };
  return (
    <div>
      Time Tracker
      <div>
        <input
          onChange={(e) => setTask(e.target.value)}
          value={task}
          type="text"
          placeholder="What are you working on"
        ></input>
        <button onClick={handleOnClick}>Start</button>
      </div>
    </div>
  );
};

export default timetracker;
