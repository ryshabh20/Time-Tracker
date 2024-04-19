"use client";
import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import {
  convertMillisecondsToTime,
  formatDate,
} from "@/helper/convertMillisecondsToTime";
import { groupBy } from "@/helper/groupBy";
import { useAppSelector, useAppDispatch, RootState } from "@/store/store";
import { setUserData } from "@/store/slices/userSlice";

import axios from "axios";
import { dynamicaction } from "@/helper/action";
import { notify } from "@/utils/Notify";
export function TimeEntries({
  groupEntries,
  duration,
}: {
  groupEntries: TimeTrackerEntries[];
  duration: { _id: string; totalDuration: number }[];
}) {
  const timeEntries = groupBy(groupEntries);

  function formatTime(date: Date) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = formatTimePart(date.getMinutes());
    return `${hours}:${minutes} ${ampm}`;
  }
  function formatTimePart(timePart: number) {
    return timePart < 10 ? `0${timePart}` : timePart;
  }
  const user = useAppSelector((state: RootState) => state.userData);
  const dispatch = useAppDispatch();

  const renderTotalDuration = (date: string): string => {
    const foundItem = duration.find(
      (d: any) => new Date(d._id).toLocaleDateString() === date
    );
    return foundItem
      ? convertMillisecondsToTime(foundItem.totalDuration)
      : "00:00:00";
  };
  const updateHandler = async (
    id: string,
    projectId: string,
    projectname: string,
    task: string
  ) => {
    const data = { id, projectId, projectname, task };

    try {
      const response = await axios.post("/api/users/updatetimeentry", data);

      if (user && response) {
        dispatch(
          setUserData({
            ...user,
            isTimer: response.data.updatedTimer,
            currentTask: {
              ...user.currentTask,
              startedAt: response.data.startedAt,
              description: response.data.task,
              currentProject: {
                projectId: response.data.projectID,
                projectName: response.data.projectName,
                projectTask: "",
              },
            },
          })
        );
      }
      notify(response.data.success, response.data.message);
    } catch (err: any) {
      notify(err.response.data.success, err.response.data.error);
    }
    dynamicaction("timeentries");
  };
  const deleteHandler = async (id: string, fulldate: string) => {
    try {
      const response = await axios.delete(`/api/users/deleteEntry/${id}`);
      notify(response.data.success, response.data.message);
    } catch (err: any) {
      notify(err.response.data.success, err.response.data.error);
    }
    dynamicaction("timeentries");
  };
  return (
    <>
      {timeEntries &&
        Object.keys(timeEntries)?.map((date: string) => {
          if (timeEntries![date]!.length === 0) {
            return null;
          }
          return (
            <div className="flex flex-col " key={date}>
              <div className="bg-[#e9e9e9] items-center flex justify-between mt-7 pl-4 py-2">
                <span className="text-[#868686]">{formatDate(date)}</span>
                <div className="flex items-center pr-4">
                  <span className="text-[#868686] mr-2">Total:</span>
                  <span className="text-xl font-medium">
                    {renderTotalDuration(date)}
                  </span>
                </div>
              </div>
              {timeEntries![date]!.map((entry) => (
                <div
                  className="flex w-full p-4 items-center  justify-around md:justify-between lg-justify-normal border"
                  key={entry._id}
                >
                  <div className="text-[#707070] truncate font-medium w-2/12">
                    {entry.task}
                  </div>
                  <li className="md:ml-0 lg:ml-2 text-[#58c4cc] truncate  font-medium w-2/12 lg:w-5/12 ">
                    {entry?.project_id?.projectname}
                  </li>
                  <div className=" inline    md:w-2/12  lg:truncate lg:flex items-center text-[#707070] justify-end  text-sm font-medium  ">
                    {`${formatTime(new Date(entry.start_time))} - ${formatTime(
                      new Date(entry.end_time)
                    )}`}
                    <IoCalendarOutline className="ml-2 w-6 h-6 hidden lg:flex" />
                  </div>
                  <div className="  text-black border-x-2 md:px-2 text-clip  justify-center text-center m-0 truncate text-lg font-medium    hidden md:flex ">
                    {convertMillisecondsToTime(entry.duration)}
                  </div>
                  <div className="flex px-3 ">
                    <CiPlay1
                      className="w-6  h-6 "
                      onClick={() =>
                        updateHandler(
                          entry._id,
                          entry.project_id._id,
                          entry.project_id?.projectname,
                          entry?.task
                        )
                      }
                    />
                  </div>
                  <div
                    className="px-3 border-l-2"
                    onClick={() => deleteHandler(entry._id, entry.start_time)}
                  >
                    <RiDeleteBin6Fill className="w-6 h-6" />
                  </div>
                </div>
              ))}
              {/* <button onClick={loadMoreData}>Load more data</button> */}
            </div>
          );
        })}
    </>
  );
}
