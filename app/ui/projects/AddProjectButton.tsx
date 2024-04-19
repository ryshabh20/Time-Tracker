"use client";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

export default function AddProjectButton({ role }: { role: string }) {
  //   const role = useAppSelector((state) => state?.userData?.role);
  return (
    <div className="flex justify-between items-center ">
      <span className="text-2xl">Project</span>
      {role === "admin" ? (
        <Link href="/projects/admin/addproject">
          <button className="text-white flex items-center bg-custom-green p-3">
            <FaPlusCircle /> &nbsp; Add a new Project
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
