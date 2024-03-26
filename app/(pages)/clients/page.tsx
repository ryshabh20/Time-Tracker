"use client";
import axios from "axios";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import ListingLoader from "@/helperComponents/ListingLoader";

const client = () => {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | undefined>("user");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [active, setActive] = useState<number>();
  const [showModal, setShowModal] = useState(null);
  const [sortBy, setSortBy] = useState<string>("clientname");
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

  const fetchingClient = async () => {
    setLoading(true);
    const response = await axios.get(
      `/api/admin/client/getclients?search=${term}&page=${page}&sort=${sortBy}&order=${order}`
    );
    if (response.data) {
      setLoading(false);
      setPageCount(response.data.pagination.pageCount);
      setClients(response.data.clients);
    }
    setLoading(false);
  };
  const userRole = useAppSelector((state) => state?.userData?.role);
  const pagesToRender = Math.ceil(pageCount);
  const pagesarr = Array.from({ length: pagesToRender }, (_, i) => i + 1);

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/admin/client/getclients?search=${term}&page=${page}&sort=${sortBy}&order=${order}`
      );
      if (response.data) {
        setLoading(false);

        setPageCount(response.data.pagination.pageCount);
        setClients(response.data.clients);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      notify(err.response.data.success, err.response.data.message);
    }
  };

  useEffect(() => {
    setRole(userRole);
    fetchingClient();
    setActive(page);
  }, [page, order]);
  const handleSort = (sort: string, order: string) => {
    setSortBy(sort);
    setOrder(order);
  };
  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `/api/admin/client/deleteclient/${showModal}`
      );
      if (response.data.success) {
        notify(response.data.success, response.data.message);
      }
      fetchingClient();
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
        <span className="text-2xl ">Client</span>
        {role === "admin" ? (
          <Link href="/clients/admin/addclient">
            <button className="text-white flex items-center bg-custom-green p-3">
              <FaPlusCircle /> &nbsp; Add a new client
            </button>
          </Link>
        ) : (
          ""
        )}
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
            placeholder="Search by client name..."
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
        <table
          className={`table-auto text-gray-600 ${
            loading
              ? "border-separate border-spacing-x-1 border-spacing-y-3"
              : ""
          } font-light w-full text-left`}
        >
          <thead className="bg-[#e9e9e9]  h-10">
            <tr>
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
              <th className="px-5">Contact</th>
              <th className="px-5">
                Email{" "}
                <span
                  onClick={() => handleSort("email", "asc")}
                  className={`text-2xl ${
                    sortBy === "email" && order === "asc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  ↑{" "}
                </span>
                <span
                  onClick={() => handleSort("email", "desc")}
                  className={`text-2xl ${
                    sortBy === "email" && order === "asc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  {" "}
                  ↓
                </span>
              </th>
              <th className="px-5">Country</th>
              <th className="px-5"></th>
            </tr>
          </thead>
          {loading ? (
            <ListingLoader />
          ) : (
            <tbody>
              {clients.map((client: any) => {
                return (
                  <tr className="bg-white h-12 border" key={client._id}>
                    <td className="px-5">{client.clientname}</td>
                    <td className="px-5">{client.contactnumber}</td>
                    <td className="px-5">{client.email}</td>
                    <td className="px-5">{client.country}</td>
                    <td className="relative">
                      <FaEllipsisV onClick={() => openModal(client._id)} />
                      {showModal === client._id && (
                        <div className="absolute bg-white z-10  shadow-lg border ">
                          <Link
                            href={`/clients/admin/editclient/${client._id}`}
                          >
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
          )}
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

export default client;
