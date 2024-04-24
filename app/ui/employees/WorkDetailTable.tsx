"use client";
import Link from "next/link";
import React, { useState } from "react";
import Sort from "../Sort";

export default function WorkDetailTable({
  workdetails,
  TableHeaders,
}: {
  workdetails: Employee[];
  TableHeaders: TableHeaders[];
}) {
  const [showModal, setShowModal] = useState("");

  return (
    <div>
      <table
        className={`table-auto text-gray-600  font-light w-full text-left`}
      >
        <thead className="bg-[#e9e9e9]  h-10">
          <Sort TableHeaders={TableHeaders} tag={"employees"} />
        </thead>
        {
          <tbody>
            {workdetails.map((workdetail: any) => {
              return (
                <tr className="bg-white h-12 border" key={workdetail._id}>
                  <td className="md:px-2 lg:px-5  text-custom-green">
                    <Link
                      href={`/projects/admin/projectdetail/${workdetail.project_id._id}`}
                    >
                      <li className="md:list-none lg:list-disc">
                        <span className="">
                          {workdetail?.project_id?.projectname}
                        </span>
                      </li>
                    </Link>
                  </td>

                  <td className="md:px-2 lg:px-5">
                    {workdetail.project_id.clientname}
                  </td>
                  <td className="md:px-2 lg:px-5">
                    {workdetail.project_id.hoursLeft.toFixed(2)}
                  </td>
                  <td className="md:px-2 lg:px-5">{workdetail.task}</td>

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
