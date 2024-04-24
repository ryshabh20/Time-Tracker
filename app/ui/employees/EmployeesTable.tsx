"use client";
import Link from "next/link";
import React, { useState } from "react";
import Sort from "../Sort";
import Modal from "../Modal";

export default function EmployeesTable({
  employees,
  TableHeaders,
}: {
  employees: Employee[];
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
            {employees.map((employee: any) => {
              return (
                <tr className="bg-white h-12 border" key={employee._id}>
                  <td className="md:px-2 lg:px-5  text-custom-green">
                    <Link href={`/employees/admin/workdetail/${employee._id}`}>
                      <li className="md:list-none lg:list-disc">
                        <span className="">{employee.employeename}</span>
                      </li>
                    </Link>
                  </td>

                  <td className="md:px-2 lg:px-5">{employee.code}</td>
                  <td className="md:px-2 lg:px-5">{employee.designation}</td>
                  <td className="md:px-2 lg:px-5">{employee.department}</td>
                  <td className="md:px-2 lg:px-5">
                    {employee.technologies.join(" , ")}
                  </td>
                  <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    Id={employee._id}
                    tag="employees"
                    deleteroute="/api/admin/employee/deleteemployee"
                    editroute="employees/admin/editemployee"
                    details="employees/admin/idletime"
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
