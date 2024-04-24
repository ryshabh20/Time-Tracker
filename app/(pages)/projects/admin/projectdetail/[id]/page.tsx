"use server";

import {
  convertMillisecondsToTime,
  formatDate,
} from "@/helper/convertMillisecondsToTime";
import DeleteButton from "@/helperComponents/DeleteButton";
import GetCookie from "@/helperComponents/getcookies";

import { IoCalendarOutline } from "react-icons/io5";

async function GetData(id: string) {
  const cookie = await GetCookie();
  try {
    const url =
      process.env.NODE_ENV === "production"
        ? `https://time-tracker-xi-three.vercel.app/api/admin/project/projectdetail/${id}`
        : `http://localhost:3000/api/admin/project/projectdetail/${id}`;
    const res = await fetch(url, {
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
      next: { tags: ["collection"] },
      cache: "no-store",
    });
    const data = await res.json();

    const name: [string, string][] = data?.timeEntry?.map(
      (employee: TimeEntryDetails) => [
        employee?.user_id?.employee?.designation || "HR",
        employee.user_id.name,
      ]
    );

    const uniqueValues = [...new Set(name)];
    let uniqueName: [string, string][] = [];

    uniqueValues.forEach((sublist) => {
      let exists = uniqueName?.some((item) => {
        return item[0] === sublist[0] && item[1] === sublist[1];
      });

      if (!exists) {
        uniqueName.push(sublist);
      }
    });

    return { ...data, uniqueName };
  } catch (error) {
    throw new Error("Error fetching the data from the route");
  }
}

const ProjectDetail = async ({ params }: { params: { id: string } }) => {
  const { duration, uniqueName, groupedTimeEntries, projectDetails } =
    await GetData(params.id);
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

  const renderTotalDuration = (date: string): string => {
    const foundItem = duration.find(
      (d: any) =>
        new Date(d._id).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );

    return foundItem
      ? convertMillisecondsToTime(foundItem.totalDuration)
      : "00:00:00";
  };

  return (
    <div className="space-y-2">
      <span>{projectDetails[0]?.projectname}</span>
      <div className="bg-white flex flex-col justify-between   h-3/6 p-10">
        <div className="flex md:space-x-1 lg:space-x-10  ">
          <div>AssignedTeam :</div>
          <div>
            <table>
              <tbody>
                {uniqueName?.length > 0 ? (
                  uniqueName?.map((info: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border md:px-10 lg:px-20">{info[0]}</td>
                        <td className="border md:px-10 lg:px-20">{info[1]}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No Team Assigned</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="  space-y-5">
          <table className="border-separate border-spacing-y-5">
            <tbody>
              <tr>
                <td className="pr-7">Hours Alloted :</td>
                <td>{projectDetails[0]?.hoursAlloted || "00.00"} Hr</td>
              </tr>
              <tr>
                <td className="pr-7">Hours Consumed :</td>
                <td>
                  {projectDetails[0]?.hoursConsumed?.toFixed(2) || "00.00"} Hr
                </td>
              </tr>
              <tr>
                <td className="pr-7">Hours Left :</td>
                <td>
                  {projectDetails[0]?.hoursLeft?.toFixed(2) || "00.00"} Hr
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {groupedTimeEntries.map((entry: any) => {
        return (
          <div className="flex flex-col " key={entry._id}>
            <div className="bg-[#e9e9e9] items-center flex justify-between mt-7 pl-4 py-2">
              <span className="text-[#868686]">{formatDate(entry._id)}</span>
              <div className="flex items-center pr-4">
                <span className="text-[#868686] mr-2">Total:</span>
                <span className="text-xl font-medium">
                  {renderTotalDuration(entry._id)}
                </span>
              </div>
            </div>
            {entry.entries.map((entry: any) => (
              <div
                className="flex w-full p-4 items-center  justify-around md:justify-between lg-justify-normal border"
                key={entry._id}
              >
                <div className="text-[#707070] truncate font-medium w-2/12">
                  {entry.task}
                </div>
                <li className="ml-2 text-[#58c4cc] truncate  font-medium w-2/12 lg:w-5/12 ">
                  {entry?.userDetails[0]?.name}
                </li>
                <div className=" inline    md:w-2/12 lg:4/12 lg:truncate lg:flex items-center text-[#707070] border-r-2  text-sm font-medium  ">
                  {`${formatTime(new Date(entry.start_time))} - ${formatTime(
                    new Date(entry.end_time)
                  )}`}
                  <IoCalendarOutline className="ml-2 w-6 h-6 hidden lg:flex" />
                </div>
                <div className="  text-black border-r-2 md:px-2 text-clip  justify-center text-center m-0 truncate text-lg font-medium   lg:w-1/12 hidden md:flex ">
                  {convertMillisecondsToTime(entry.duration)}
                </div>
                <div className="border-r-2 flex px-3 ">
                  <DeleteButton entry_id={entry._id} />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectDetail;
