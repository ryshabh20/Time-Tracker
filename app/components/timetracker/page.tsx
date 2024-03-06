"use client";
import axios from "axios";
import { useAppSelector, useAppDispatch, RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { UserData, setUserData } from "@/store/slices/userSlice";
import { IoCalendarOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { setTimeEntry } from "@/store/slices/timeSlice";
const Timetracker = () => {
  const [timeEntries, setTimeEntries] = useState([]);
  const [duration, setDuration] = useState([]);
  const [task, setTask] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const user = useAppSelector((state: RootState) => state.userData);
  const dispatch = useAppDispatch();
  function formatTime(date) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const minutes = formatTimePart(date.getMinutes());
    return `${hours}:${minutes} ${ampm}`;
  }
  function convertMillisecondsToTime(milliseconds) {
    const totalSeconds = Math.round(milliseconds / 1000); // Round to nearest second
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }

  function formatTimePart(timePart) {
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
    } else {
      setErrorMessage(true);
    }
  };
  // const deleteHandler = async(id: string) => {
  //   const response = await axios.delete(`/api/users/deleteEntry/${id}`)
  //   return response
  // };
  const deleteHandler = async (id: string) => {
    const response = await axios.delete(`/api/users/deleteEntry/${id}`);
    console.log(response);
    console.log(timeEntries);
    // setTimeEntries((prev) => prev.filter((listing) => listing._id !== id));
  };

  useEffect(() => {
    const fetchingData = async () => {
      const response = await axios.get("/api/users/getalltimenetries");
      const result = Object.groupBy(response.data.data, (data) => {
        return new Date(data.start_time).toLocaleDateString();
      });
      setTimeEntries(result);
      setDuration(response.data.duration);
    };
    fetchingData();
  }, [user?.isTimer]);

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
          <button
            type="submit"
            className="bg-custom-green text-white w-20"
            onClick={handleOnClick}
          >
            {user?.isTimer ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      {Object.keys(timeEntries)?.map((date) => (
        <div className="flex flex-col " key={date}>
          <div className="bg-[#e9e9e9] items-center flex justify-between mt-7 pl-4 py-2">
            <span className="text-[#868686]">{date}</span>
            <div className="flex items-center pr-4">
              <span className="text-[#868686] mr-2">Total:</span>
              <span className="text-xl font-medium">
                {duration.find(
                  (d) => new Date(d._id).toLocaleDateString() === date
                )
                  ? convertMillisecondsToTime(
                      duration?.find(
                        (d) => new Date(d._id)?.toLocaleDateString() === date
                      ).totalDuration
                    )
                  : "00:00:00"}
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
              <div
                className="border-r-2 flex px-3 "
                // onClick={deleteHandler(entry._id)}
              >
                <CiPlay1 className="w-6  h-6 " />
              </div>
              <div className="px-3" onClick={() => deleteHandler(entry._id)}>
                <RiDeleteBin6Fill className="w-6 h-6" />
              </div>
            </div>
          ))}
          {/* <p>Start Time: {formatTime(new Date(entry.start_time))}</p>
          <p>End Time: {formatTime(new Date(entry.end_time))}</p>
          <p>Duration</p>
          <p>Task: {entry.task}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Timetracker;
