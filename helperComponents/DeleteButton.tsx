"use client";
import action from "@/helper/action";
import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

const DeleteButton = ({
  deleteEntry,
  entry_id,
}: {
  deleteEntry: (id: string) => Promise<void>;
  entry_id: string;
}) => {
  return (
    <div
      className="px-3"
      onClick={() => {
        deleteEntry(entry_id);
        action();
      }}
    >
      <RiDeleteBin6Fill className="w-6 h-6" />
    </div>
  );
};

export default DeleteButton;
