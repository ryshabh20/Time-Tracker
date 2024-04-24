"use client";
import Link from "next/link";
import React, { useState } from "react";
import Sort from "../Sort";
import Modal from "../Modal";

export default function ProjectsTable({
  projects,
  TableHeaders,
}: {
  projects: Project[];
  TableHeaders: TableHeaders[];
}) {
  const [showModal, setShowModal] = useState("");
  return (
    <div className="h-full">
      <table
        className={`table-auto text-gray-600  font-light h-full w-full text-left`}
      >
        <thead className="bg-[#e9e9e9]  h-10">
          <Sort TableHeaders={TableHeaders} tag={"projects"} />
        </thead>
        {
          <tbody>
            {projects?.map((project: Project) => {
              return (
                <tr className="bg-white h-12 border" key={project._id}>
                  <td className=" md:px-2 lg:px-5  text-custom-green">
                    <Link href={`/projects/admin/projectdetail/${project._id}`}>
                      {" "}
                      <li className="md:list-none lg:list-disc">
                        <span className="">{project.projectname}</span>
                      </li>
                    </Link>
                  </td>
                  <td className=" md:px-2 lg:px-5 ">{project.clientname}</td>
                  <td className=" md:px-2 lg:px-5">
                    {project?.hoursLeft?.toFixed(2)}
                  </td>
                  <td className=" md:px-2 lg:px-5">
                    <div className="max-h-[3rem] overflow-hidden line-clamp-2 ">
                      {project.assignedTeam.join(" , ")}
                    </div>
                  </td>
                  <Modal
                    Id={project._id}
                    tag="projects"
                    showModal={showModal}
                    setShowModal={setShowModal}
                    deleteroute="/api/admin/project/deleteproject"
                    editroute="projects/admin/editproject"
                  />
                </tr>
              );
            })}
          </tbody>
        }
      </table>
    </div>
  );
}
