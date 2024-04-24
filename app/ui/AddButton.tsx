"use client";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

export default function AddProjectButton({
  page,
  role,
  apiroute,
  text,
}: {
  page: string;
  role?: string;
  apiroute?: string;
  text?: string;
}) {
  return (
    <div className="flex justify-between items-center ">
      <span className="text-2xl">{page}</span>
      {role === "admin" ? (
        <Link href={apiroute!}>
          <button className="text-white flex items-center bg-custom-green p-3">
            <FaPlusCircle /> &nbsp; {text}
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
