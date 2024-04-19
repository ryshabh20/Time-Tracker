"use client";
import Link from "next/link";
import { FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import { notify } from "@/utils/Notify";
import axios from "axios";
import { dynamicaction } from "@/helper/action";

export default function Modal({ projectId }: { projectId: string }) {
  const [showModal, setShowModal] = useState(null);
  const openModal = (id: any) => {
    setShowModal(id);
  };
  const closeModal = () => {
    setShowModal(null);
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `/api/admin/project/deleteproject/${showModal}`
      );
      if (response.data.success) {
        notify(response.data.success, response.data.message);
      }
      dynamicaction("projects");
      setShowModal(null);
    } catch (err: any) {
      notify(err.response.data.success, err.response.data.message);
    }
  };

  return (
    <td className="relative">
      <FaEllipsisV
        onClick={() => openModal(projectId)}
        onBlur={() => closeModal()}
      />
      {showModal === projectId && (
        <div className="absolute bg-white z-10  shadow-lg border ">
          <Link href={`/projects/admin/editproject/${projectId}`}>
            <div className="px-2 py-1 border-b hover:bg-gray-400 ">Edit</div>
          </Link>
          <div onClick={deleteHandler} className="px-2 py-1  hover:bg-red-400">
            Delete
          </div>
        </div>
      )}
    </td>
  );
}
