"use client";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/store/store";

import { useState } from "react";
import { setUserData } from "@/store/slices/userSlice";
const timetracker = () => {
  const user = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const [task, setTask] = useState("");

  const data = { task };
  const handleOnClick = async () => {
    const bodydata = { ...data, user };
    const response = await axios.post("/api/users/timeentry", bodydata);
  };
  return (
    <div>
      Time Tracker
      <div className="flex">
        <input
          onChange={(e) => setTask(e.target.value)}
          value={task}
          type="text"
          placeholder="What are you working on"
        ></input>
        <button onClick={handleOnClick}>
          {user?.isTimer ? "start" : "stop"}
        </button>
      </div>
    </div>
  );
};

export default timetracker;
