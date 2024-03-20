"use client";
import AddClient from "@/components/AdminClient";
import axios from "axios";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const project = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [active, setActive] = useState<number>();
  const [showModal, setShowModal] = useState(null);

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
  const fetchingProject = async () => {
    const response = await axios.get(
      `/api/admin/project/getprojects?search=${term}&page=${page}`
    );
    console.log("response.data", response.data);
    if (response.data) {
      setPageCount(response.data.pagination.pageCount);
      setProjects(response.data.projects);
    }
  };
  const pagesToRender = Math.ceil(pageCount);
  const pagesarr = Array.from({ length: pagesToRender }, (_, i) => i + 1);
  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/admin/project/getprojects?search=${term}&page=${page}`
      );
      if (response.data) {
        console.log(
          "response.data.pagination.pageCount",
          response.data.pagination.pageCount
        );
        setPageCount(response.data.pagination.pageCount);
        setProjects(response.data.projects);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchingProject();
    setActive(page);
  }, [page]);
  // const sortHandler = async () => {
  //   // const query;
  //   const response = await axios.post("/api/admin/client/getclients");
  // };
  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `/api/admin/project/deleteproject/${showModal}`
      );
      if (response.data.success) {
        notify(response.data.success, response.data.message);
      }
      fetchingProject();
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
  const HandleClientClick = () => {
    router.push("/clients");
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
        <span className="text-2xl">Project</span>
        <Link href="/projects/addproject">
          <button className="text-white flex items-center bg-custom-green p-3">
            <FaPlusCircle /> &nbsp; Add a new Project
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
            <option value={`clients`}>Clients</option>
            <option value={`projects`}>Projects</option>
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
            placeholder="Search by project name..."
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
              <th className="px-5">Project</th>
              <th className="px-5">Client</th>
              <th className="px-5">Hours</th>
              <th className="px-5">Team</th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => {
              return (
                <tr className="bg-white h-12 border" key={project._id}>
                  <td className="px-5 text-custom-green">
                    <li>{project.projectname}</li>
                  </td>
                  <td className="px-5">{project.clientname}</td>
                  <td className="px-5">{project.hoursLeft}</td>
                  <td className="px-5">{project.assignedTeam.join(" , ")}</td>
                  <td className="relative">
                    <FaEllipsisV onClick={() => openModal(project._id)} />
                    {showModal === project._id && (
                      <div className="absolute bg-white z-10  shadow-lg border ">
                        <Link href={`/projects/editproject/${project._id}`}>
                          <div className="px-2 py-1 border-b hover:bg-gray-400 ">
                            Edit
                          </div>
                        </Link>
                        <div
                          onClick={deleteHandler}
                          className="px-2 py-1  hover:bg-red-400"
                        >
                          Delete
                        </div>
                      </div>
                    )}
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

export default project;
