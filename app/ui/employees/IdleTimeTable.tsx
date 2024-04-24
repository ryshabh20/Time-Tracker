import React from "react";
import Sort from "../Sort";
import { millisecondsToTime } from "@/helper/convertMillisecondsToTime";

export default async function IdleTimeTable({
  duration,
  TableHeaders,
}: {
  duration: Duration[];
  TableHeaders: TableHeaders[];
}) {
  return (
    <div>
      <table
        className={`table-auto text-gray-600  font-light w-full text-left`}
      >
        <thead className="bg-[#e9e9e9]  h-10">
          <Sort TableHeaders={TableHeaders} tag={"idletime"} />
        </thead>
        {
          <tbody>
            {duration.map((empduration: any) => {
              return (
                <tr className="bg-white h-12 border" key={empduration._id}>
                  <td className="md:px-2 lg:px-5  text-custom-green">
                    {new Date(empduration._id).toLocaleDateString()}
                  </td>

                  <td className="md:px-2 lg:px-5">
                    {millisecondsToTime(empduration.totalDuration)}
                  </td>
                  <td className="md:px-2 lg:px-5">
                    {millisecondsToTime(28800000 - empduration.totalDuration)}
                  </td>
                  <td className="md:px-2 lg:px-5">08:00</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        }
      </table>
    </div>
  );
}
