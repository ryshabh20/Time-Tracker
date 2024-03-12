"use client";
import axios from "axios";
import { useAppSelector, useAppDispatch, RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { UserData, setUserData } from "@/store/slices/userSlice";
import { IoCalendarOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Timer from "@/helperComponents/Timer";
import { groupBy } from "@/helper/groupBy";
import { convertMillisecondsToTime } from "@/helper/convertMillisecondsToTime";

type DailyEntries = Record<string, Entry[]>;
const Timetracker = () => {
  const [timeEntries, setTimeEntries] = useState<DailyEntries>({});
  const [seconds, setSeconds] = useState<number>(0);
  const [duration, setDuration] = useState<
    { _id: string; totalDuration: number }[]
  >([]);
  const [totalDuration, setTotalDuration] = useState<String>("");
  const [task, setTask] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const user = useAppSelector((state: RootState) => state.userData);
  const dispatch = useAppDispatch();
  function formatTime(date: Date) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = formatTimePart(date.getMinutes());
    return `${hours}:${minutes} ${ampm}`;
  }

  const renderTotalDuration = (date: string): string => {
    const foundItem = duration.find(
      (d) => new Date(d._id).toLocaleDateString() === date
    );
    return foundItem
      ? convertMillisecondsToTime(foundItem.totalDuration)
      : "00:00:00";
  };

  function formatTimePart(timePart: number) {
    return timePart < 10 ? `0${timePart}` : timePart;
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

      setTask(response.data.task);
    } else {
      setErrorMessage(true);
    }
  };
  const updateHandler = async (id: string) => {
    const data = { id };
    const response = await axios.post("/api/users/updatetimeentry", data);

    if (user) {
      dispatch(
        setUserData({
          ...user,
          isTimer: response.data.updatedTimer,
        })
      );
    }
    setTask(response.data.task);
  };
  const deleteHandler = async (id: string, fulldate: string) => {
    try {
      await axios.delete(`/api/users/deleteEntry/${id}`);
      const date = new Date(fulldate).toLocaleDateString();

      setTimeEntries((prev) => {
        if (prev[date]) {
          prev[date] = prev[date].filter((entry) => entry._id !== id);
        }
        return { ...prev };
      });
      fetchingData();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };
  const fetchingData = async () => {
    const response = await axios.get("/api/users/getalltimeentries");
    const result = groupBy(response.data.data);
    setTimeEntries(result);
    setDuration(response.data.duration);
  };
  useEffect(() => {
    fetchingData();
  }, [user?.isTimer]);

  return (
    <div>
      <div className="flex bg-white h-14 justify-between">
        <div className=" flex p-2 w-3/6 ">
          <div className="w-full">
            <input
              onChange={(e) => {
                setTask(e.target.value);
                setErrorMessage(false);
              }}
              className={`bg-[#f6f6f6]  w-full h-full pl-2 ${
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
        <div className="flex p-2 justify-around    w-2/6">
          <div className="flex items-center border-r  ">
            <label htmlFor="projects">Projects</label>
            <select
              id="projects"
              className="bg-white text-custom-green mr-4 "
            ></select>
          </div>
          <Timer />
          <button
            type="submit"
            className="bg-custom-green text-white w-20"
            onClick={handleOnClick}
          >
            {user?.isTimer ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      {Object.keys(timeEntries)?.map((date: string) => {
        if (timeEntries[date].length === 0) {
          return null;
        }
        return (
          <div className="flex flex-col " key={date}>
            <div className="bg-[#e9e9e9] items-center flex justify-between mt-7 pl-4 py-2">
              <span className="text-[#868686]">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <div className="flex items-center pr-4">
                <span className="text-[#868686] mr-2">Total:</span>
                <span className="text-xl font-medium">
                  {renderTotalDuration(date)}
                </span>
              </div>
            </div>
            {timeEntries[date].map((entry) => (
              <div className="flex w-full p-4  border" key={entry._id}>
                <div className="text-[#707070] truncate font-medium w-2/12">
                  {entry.task}
                </div>
                <li className="ml-2 text-[#58c4cc] truncate md-4/12 sm-2/12 font-medium w-6/12">
                  Project
                </li>
                <div className=" flex items-center text-[#707070] border-r-2 truncate text-sm font-medium  w-2/12">
                  {`${formatTime(new Date(entry.start_time))} - ${formatTime(
                    new Date(entry.end_time)
                  )}`}
                  <IoCalendarOutline className="ml-2 w-6 h-6" />
                </div>
                <div className=" ml-2 text-black border-r-2 text-center m-0 truncate text-lg font-medium  w-1/12">
                  {convertMillisecondsToTime(entry.duration)}
                </div>
                <div className="border-r-2 flex px-3 ">
                  <CiPlay1
                    className="w-6  h-6 "
                    onClick={() => updateHandler(entry._id)}
                  />
                </div>
                <div
                  className="px-3"
                  onClick={() => deleteHandler(entry._id, entry.start_time)}
                >
                  <RiDeleteBin6Fill className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Timetracker;
