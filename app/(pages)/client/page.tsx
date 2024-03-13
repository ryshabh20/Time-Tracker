"use client";
import AddClient from "@/components/AdminClient";
import axios from "axios";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

const client = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const user = useAppSelector((state) => state.userData);
  const fetchingClient = async () => {
    const response = await axios.get("/api/admin/client/getclients");
    console.log(response);
  };
  useEffect(() => {
    fetchingClient();
  }, []);
  return (
    <div className="flex flex-col space-y-10">
      <div className="flex justify-between items-center ">
        <span className="text-2xl ">Client</span>
        <Link href="/client/addclient">
          <button className="text-white flex items-center bg-custom-green p-3">
            <FaPlusCircle /> &nbsp; Add a new client
          </button>
        </Link>
      </div>
      <div className="flex bg-white py-2 px-2 h-14">
        <div className="SelectProjets text-gray-600 flex  w-1/12 justify-center border-r  items-center">
          <label htmlFor="projectswitch">Projects</label>
          <select name="" id="projectswitch" className="bg-white "></select>
        </div>
        <div className="w-5/6 ">
          <input
            type="text"
            className=" h-full w-4/6 mr-2 px-2 float-right  bg-[#f6f6f6]"
            placeholder="Search by client name..."
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-custom-green px-3 h-full text-white "
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <table className="table-auto text-gray-600 font-light w-full text-left">
          <thead className="bg-[#e9e9e9]  h-10">
            <tr>
              <th className="px-5">Client</th>
              <th className="px-5">Contact</th>
              <th className="px-5">Email</th>
              <th className="px-5">Country</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default client;
