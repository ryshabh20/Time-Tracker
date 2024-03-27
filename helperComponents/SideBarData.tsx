import { RxDashboard } from "react-icons/rx";
import { LuClock } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { ImFilesEmpty } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/store";

import { MdPeopleOutline } from "react-icons/md";

const sideBarDataAdmin = [
  {
    name: "Dashboard",
    icon: <RxDashboard className=" text-gray-600 w-9 h-9" />,
    page: "/dashboard",
  },
  {
    name: "Time Tracker",
    icon: <LuClock className=" text-gray-600 w-9 h-9" />,
    page: "/timetracker",
  },
  {
    name: "Screenshots",
    icon: <ImFilesEmpty className=" text-gray-600 w-9 h-9" />,
    page: "/screenshots",
  },
  {
    name: "Projects",
    icon: <GrNotes className=" text-gray-600 w-9 h-9" />,
    page: "/projects",
  },
  {
    name: "Clients",
    icon: <VscAccount className=" text-gray-600 w-9 h-9" />,
    page: "/clients",
  },
  {
    name: "Employees",
    icon: <MdPeopleOutline className=" text-gray-600 w-9 h-9" />,
    page: "/employees",
  },
];

const sideBarDataClient = [
  {
    name: "Dashboard",
    icon: <RxDashboard className=" text-gray-600 w-9 h-9" />,
    page: "/dashboard",
  },
  {
    name: "Time Tracker",
    icon: <LuClock className=" text-gray-600 w-9 h-9" />,
    page: "/timetracker",
  },
  {
    name: "Projects",
    icon: <GrNotes className=" text-gray-600 w-9 h-9" />,
    page: "/projects",
  },

  {
    name: "Screenshots",
    icon: <ImFilesEmpty className=" text-gray-600 w-9 h-9" />,
    page: "/screenshots",
  },
];
const SideBarData = () => {
  const [active, setActive] = useState<string>("");
  const [role, setRole] = useState<string | undefined>();
  const userRole = useAppSelector((state) => state?.userData?.role);
  useEffect(() => {
    setRole(userRole);
  }, [userRole]);
  return (
    <div>
      {role === "admin"
        ? sideBarDataAdmin.map((data, index) => (
            <SidebarLink
              data={data}
              key={index}
              active={active}
              setActive={setActive}
            />
          ))
        : sideBarDataClient.map((data, index) => (
            <SidebarLink
              data={data}
              key={index}
              active={active}
              setActive={setActive}
            />
          ))}
    </div>
  );
};

const SidebarLink = ({ data, active, setActive }) => (
  <Link href={data.page}>
    <div
      className={`hover:bg-[#00a7b1] ${
        active === data.name ? "bg-[#00a7b1] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center hover:text-white lg:w-max-content mx-10 pl-1 py-2 my-3 cursor-pointer">
        <div
          className={`${active === data.name ? "fill-white" : "text-black"}`}
        >
          {data.icon}
        </div>
        <div
          className="ml-4 text-lg"
          onClick={() => {
            setActive(data.name);
          }}
        >
          {data.name}
        </div>
      </div>
    </div>
  </Link>
);
export default SideBarData;
