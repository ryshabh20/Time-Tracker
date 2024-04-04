"use client";
import AddClient from "@/components/AdminClient";
import axios from "axios";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { millisecondsToTime } from "@/helper/convertMillisecondsToTime";

const IdleTime = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [active, setActive] = useState<number>();
  const [showModal, setShowModal] = useState(null);
  const [sortBy, setSortBy] = useState<string>("projectname");
  const [order, setOrder] = useState<string>("asc");

  const notify = (status: boolean, message: string) => {
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const openModal = (id: any) => {
    setShowModal(id);
  };
  const closeModal = () => {
    setShowModal(null);
  };
  const user = useAppSelector((state) => state.userData);
  const fetchingEmployee = async () => {
    try {
      const response = await axios.get(
        `/api/admin/employee/idletime/${params.id}?search=${term}&page=${page}&sort=${sortBy}&order=${order}`
      );
      console.log("response.data", response.data);
      if (response.data) {
        setPageCount(response.data.pagination.pageCount);
        setEmployees(response.data.duration);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pagesToRender = Math.ceil(pageCount);
  const pagesarr = Array.from({ length: pagesToRender }, (_, i) => i + 1);
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/admin/employee/idletime/${params.id}?search=${term}&page=${page}&sort=${sortBy}&order=${order}`
      );
      console.log("response", response);
      if (response.data) {
        setPageCount(response.data.pagination.pageCount);
        setEmployees(response.data.duration);
      }
    } catch (error: any) {
      notify(false, error.response.data.message);
    }
  };
  useEffect(() => {
    fetchingEmployee();
    setActive(page);
  }, [page, order]);

  const handleSort = (sort: string, order: string) => {
    setSortBy(sort);
    setOrder(order);
  };
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

  const pageRender = () => {
    if (pagesToRender) {
      return (
        <div className="flex space-x-4">
          {pagesarr.map((pagelink) => (
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
              {pagelink}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex px-4 py-2 rounded-full bg-custom-green text-white">
          1
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <div className="flex justify-between items-center ">
        <span className="text-2xl">Idle Time</span>
      </div>
      <form className="flex  bg-white py-2 px-2 h-14">
        <div className=" w-full ml-2">
          <input
            type="text"
            required
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            className=" h-full w-full mr-2 px-2 float-right  bg-[#f6f6f6]"
            placeholder="Search by date..."
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={handleClick}
            className="bg-custom-green px-3 h-full text-white "
          >
            Search
          </button>
        </div>
      </form>
      <div>
        <table className="table-auto text-gray-600 font-light w-full text-left">
          <thead className="bg-[#e9e9e9]  h-10">
            <tr>
              <th className=" px-5">
                Date{" "}
                <span
                  onClick={() => handleSort("employeename", "asc")}
                  className={`text-2xl ${
                    sortBy === "employeename" && order === "asc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  ↑{" "}
                </span>
                <span
                  onClick={() => handleSort("employeename", "desc")}
                  className={`text-2xl ${
                    sortBy === "employeename" && order === "desc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  {" "}
                  ↓
                </span>
              </th>
              <th className="px-5">Up Time </th>
              <th className="px-5">Idle Time</th>
              <th className="px-5">Total</th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => {
              return (
                <tr className="bg-white h-12 border" key={employee._id}>
                  <td className="px-5  text-custom-green">
                    {new Date(employee._id).toLocaleDateString()}
                  </td>

                  <td className="px-5">
                    {millisecondsToTime(employee.totalDuration)}
                  </td>
                  <td className="px-5">
                    {millisecondsToTime(28800000 - employee.totalDuration)}
                  </td>
                  <td className="px-5">08:00</td>

                  <td className="relative">
                    <FaEllipsisV />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div className="flex justify-center space-x-4">
          <button disabled={page === 1} onClick={handlePrevious}>
            &lt;&lt;
          </button>
          <div>{pageRender()}</div>
          <button disabled={page === pageCount} onClick={handleNext}>
            &gt;&gt;
          </button>
        </div>
      )}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default IdleTime;
