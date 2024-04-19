import Link from "next/link";
import React from "react";
import Sort from "./Sort";
import Modal from "./Modal";

export default async function ProjectsTable({
  projects,
  TableHeaders,
}: {
  projects: Project[];
  TableHeaders: TableHeaders[];
}) {
  return (
    <div>
      <table
        className={`table-auto text-gray-600  font-light w-full text-left`}
      >
        <thead className="bg-[#e9e9e9]  h-10">
          <Sort TableHeaders={TableHeaders} tag={"projects"} />
        </thead>
        {
          <tbody>
            {projects?.map((project: Project) => {
              return (
                <tr className="bg-white h-12 border" key={project._id}>
                  <td className="px-5  text-custom-green">
                    <Link href={`/projects/admin/projectdetail/${project._id}`}>
                      {" "}
                      <li className="md:list-none lg:list-disc">
                        <span className="">{project.projectname}</span>
                      </li>
                    </Link>
                  </td>
                  <td className="px-5">{project.clientname}</td>
                  <td className="px-5">{project?.hoursLeft?.toFixed(2)}</td>
                  <td className="px-5">{project.assignedTeam.join(" , ")}</td>
                  <Modal projectId={project._id} />
                </tr>
              );
            })}
          </tbody>
        }
      </table>
    </div>
  );
}
