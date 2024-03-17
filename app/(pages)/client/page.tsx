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
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [active, setActive] = useState<number>();

  const user = useAppSelector((state) => state.userData);
  const fetchingClient = async () => {
    const response = await axios.get(
      `/api/admin/client/getclients?page=${page}`
    );
    if (response.data) {
      setPageCount(response.data.pagination.pageCount);
      setClients(response.data.clients);
    }
  };
  const pagesToRender = Math.ceil(pageCount);
  const pagesarr = Array.from({ length: pagesToRender }, (_, i) => i + 1);
  useEffect(() => {
    fetchingClient();
    setActive(page);
  }, [page]);
  // const sortHandler = async () => {
  //   // const query;
  //   const response = await axios.post("/api/admin/client/getclients");
  // };

  const handlePrevious = () => {
    setPage((p) => {
      if (p === 1) return pageCount;
      return p - 1;
    });
  };
  const handleNext = () => {
    setPage((p) => {
      if (p >= pageCount) return 1;
      return p + 1;
    });
  };
  console.log(page);
  const pageRender = () => {
    // const pagesToRender = Math.ceil(pageCount);
    // const pagesarr = Array.from({ length: pagesToRender }, (_, i) => i + 1);
    return (
      <div className="flex space-x-4">
        {pagesarr.map((pagelink) => {
          return (
            <div
              className={`px-4 py-2 ${
                active === pagelink
                  ? "bg-custom-green text-white rounded-full hover:bg-custom-green"
                  : "hover:bg-custom-green hover:text-white hover:rounded-full"
              }`}
              key={pagelink}
              onClick={() => {
                setPage(pagelink);
              }}
            >
              {pagelink}{" "}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <div className="flex justify-between items-center ">
        <span className="text-2xl ">Client</span>
        <Link href="/client/addclient">
          <button className="text-white flex items-center bg-custom-green p-3">
            <FaPlusCircle /> &nbsp; Add a new client
          </button>
        </Link>
      </div>
      <div className="flex  bg-white py-2 px-2 h-14">
        <div className="SelectProjets text-gray-600 flex  md:2/12 lg:w-1/12 lg:justify-center border-r  items-center">
          <label htmlFor="projectswitch">Projects</label>
          <select name="" id="projectswitch" className="bg-white "></select>
        </div>
        <div className=" lg:w-5/6 ml-auto">
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
          <tbody>
            {clients.map((client: any) => {
              return (
                <tr className="bg-white h-12 border" key={client._id}>
                  <td className="px-5">{client.clientname}</td>
                  <td className="px-5">{client.contactnumber}</td>
                  <td className="px-5">{client.email}</td>
                  <td className="px-5">{client.country}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center space-x-4">
        <button disabled={page === 1} onClick={handlePrevious}>
          &lt;&lt;
        </button>
        <div>{pageRender()}</div>
        <button disabled={page === pageCount} onClick={handleNext}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default client;
