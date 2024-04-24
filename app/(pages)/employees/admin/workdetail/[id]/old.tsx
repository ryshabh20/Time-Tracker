"use client";
import AddClient from "@/components/AdminClient";
import axios from "axios";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import AdminRoute from "@/helperComponents/AdminRoute";

const WorkDetail = ({ params }: { params: { id: string } }) => {
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
    const response = await axios.get(
      `/api/admin/employee/workdetails/${params.id}`
    );
    if (response.data) {
      setPageCount(response.data.pagination.pageCount);
      setEmployees(response.data.employees);
    }
  };

  const pagesToRender = Math.ceil(pageCount);
  const pagesarr = Array.from({ length: pagesToRender }, (_, i) => i + 1);
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/admin/employee/workdetails//${params.id}?search=${term}&page=${page}&sort=${sortBy}&order=${order}`
      );
      if (response.data) {
        setPageCount(response.data.pagination.pageCount);
        setEmployees(response.data.employees);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchingEmployee();
    setActive(page);
  }, [page, order]);

  const handleSort = (sort: string, order: string) => {
    setSortBy(sort);
    setOrder(order);
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `/api/admin/employee/deleteemployee/${showModal}`
      );
      if (response.data.success) {
        notify(response.data.success, response.data.message);
      }
      fetchingEmployee();
      setShowModal(null);
    } catch (err: any) {
      notify(err.response.data.success, err.response.data.message);
    }
  };

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
        <span className="text-2xl">Employee</span>
        <Link href="/employees/addemployee">
          <button className="text-white flex items-center bg-custom-green p-3">
            <FaPlusCircle /> &nbsp; Add a new Employee
          </button>
        </Link>
      </div>
      <form className="flex  bg-white py-2 px-2 h-14">
        <div className="SelectProjets text-gray-600 flex  md:2/12 lg:w-1/12 lg:justify-center border-r  items-center">
          <select
            onChange={(e) => {
              const { value } = e.target;

              router.push(`/${value}`);
            }}
            className="bg-white "
          >
            <option value={`projects`}>Projects</option>
            <option value={`clients`}>Clients</option>
          </select>
        </div>
        <div className=" lg:w-5/6 ml-auto">
          <input
            type="text"
            required
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            className=" h-full w-4/6 mr-2 px-2 float-right  bg-[#f6f6f6]"
            placeholder="Search by technologies..."
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
                Project{" "}
                <span
                  onClick={() => handleSort("projectname", "asc")}
                  className={`text-2xl ${
                    sortBy === "projectname" && order === "asc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  ↑{" "}
                </span>
                <span
                  onClick={() => handleSort("projectname", "desc")}
                  className={`text-2xl ${
                    sortBy === "projectname" && order === "desc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  {" "}
                  ↓
                </span>
              </th>

              <th className="px-5">
                Client{" "}
                <span
                  onClick={() => handleSort("clientname", "asc")}
                  className={`text-2xl ${
                    sortBy === "clientname" && order === "asc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  ↑{" "}
                </span>
                <span
                  onClick={() => handleSort("clientname", "desc")}
                  className={`text-2xl ${
                    sortBy === "clientname" && order === "desc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  {" "}
                  ↓
                </span>
              </th>
              <th className="  px-5">
                Hours{" "}
                <span
                  onClick={() => handleSort("hours", "asc")}
                  className={`text-2xl ${
                    sortBy === "hours" && order === "asc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  ↑{" "}
                </span>
                <span
                  onClick={() => handleSort("hours", "desc")}
                  className={`text-2xl ${
                    sortBy === "hours" && order === "desc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  {" "}
                  ↓
                </span>
              </th>

              <th className="px-5">Task</th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => {
              return (
                <tr className="bg-white h-12 border" key={employee._id}>
                  <td className="px-5  text-custom-green">
                    <li className="md:list-none lg:list-disc">
                      <span className="">
                        {employee?.project_id?.projectname}
                      </span>
                    </li>
                  </td>

                  <td className="px-5">{employee.project_id.clientname}</td>
                  <td className="px-5">
                    {employee.project_id.hoursLeft.toFixed(2)}
                  </td>
                  <td className="px-5">{employee.task}</td>
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

export default AdminRoute(WorkDetail);
