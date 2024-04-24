"use client";
import React, { useState } from "react";
import Sort from "../Sort";
import Modal from "../Modal";

export default function ClentsTable({
  clients,
  TableHeaders,
}: {
  clients: Client[];
  TableHeaders: TableHeaders[];
}) {
  const [showModal, setShowModal] = useState("");
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
            {clients?.map((client: Client) => {
              return (
                <tr className="bg-white h-12 border" key={client._id}>
                  <td className="md:px-2 lg:px-5  text-custom-green">
                    {" "}
                    <li className="md:list-none lg:list-disc">
                      <span className="">{client.clientname}</span>
                    </li>
                  </td>
                  <td className="md:px-2 lg:px-5">{client.contactnumber}</td>
                  <td className="md:px-2 lg:px-5 break-all">{client.email}</td>
                  <td className="md:px-2 lg:px-5">{client.country}</td>

                  <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    Id={client._id}
                    tag="clients"
                    deleteroute="/api/admin/client/deleteclient"
                    editroute="clients/admin/editclient"
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
