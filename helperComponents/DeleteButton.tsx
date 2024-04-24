"use client";
import action from "@/helper/action";
import axios from "axios";
import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BASE_URL } from "@/utils/BaseUrl";

const DeleteButton = ({ entry_id }: { entry_id: string }) => {
  async function DeleteEntry(id: string) {
    try {
      const res = await axios.delete(
        `${BASE_URL}api/admin/project/deleteprojectdetail/${id}`
      );
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div
      className="px-3"
      onClick={() => {
        DeleteEntry(entry_id);
        action();
      }}
    >
      <RiDeleteBin6Fill className="w-6 h-6" />
    </div>
  );
};

export default DeleteButton;
