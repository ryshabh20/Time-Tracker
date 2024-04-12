import { RxDashboard } from "react-icons/rx";
import { LuClock } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { ImFilesEmpty } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/store";

import { MdPeopleOutline } from "react-icons/md";
import { usePathname } from "next/navigation";

interface IconType {
  name: string;
  icon: JSX.Element;
  page: string;
}
const sideBarDataAdmin = [
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    page: "/dashboard",
  },
  {
    name: "Time Tracker",
    icon: <LuClock />,
    page: "/timetracker",
  },
  {
    name: "Projects",
    icon: <GrNotes />,
    page: "/projects",
  },
  {
    name: "Clients",
    icon: <VscAccount />,
    page: "/clients",
  },
  {
    name: "Employees",
    icon: <MdPeopleOutline />,
    page: "/employees",
  },
  {
    name: "Screenshots",
    icon: <ImFilesEmpty />,
    page: "/screenshots",
  },
];

const sideBarDataClient = [
  {
    name: "Dashboard",
    icon: <RxDashboard />,
    page: "/dashboard",
  },
  {
    name: "Time Tracker",
    icon: <LuClock />,
    page: "/timetracker",
  },
  {
    name: "Projects",
    icon: <GrNotes />,
    page: "/projects",
  },

  {
    name: "Screenshots",
    icon: <ImFilesEmpty />,
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
  const pathname = usePathname();

  const currentPath = "/" + pathname.split("/")[1];
  return (
    <div>
      {role === "admin"
        ? sideBarDataAdmin.map((data, index) => (
            <SidebarLink data={data} key={index} currentPath={currentPath} />
          ))
        : sideBarDataClient.map((data, index) => (
            <SidebarLink data={data} key={index} currentPath={currentPath} />
          ))}
    </div>
  );
};

const SidebarLink = ({
  data,
  currentPath,
}: {
  data: IconType;
  currentPath: string;
}) => (
  <Link href={data.page}>
    <div
      className={`hover:bg-[#00a7b1] hover:text-white ${
        currentPath === data.page
          ? "bg-[#00a7b1] text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex items-center hover:text-white group lg:w-max-content mx-10 pl-1 py-2 my-3 cursor-pointer">
        <div
          className={`${
            currentPath === data.page ? "text-white" : "text-black"
          }`}
        >
          {React.cloneElement(data.icon, {
            className: `w-9 h-9 group-hover:text-white ${
              currentPath === data.page ? "text-white" : "text-gray-600 "
            }`,
          })}
        </div>
        <div className="ml-4 text-lg">{data.name}</div>
      </div>
    </div>
  </Link>
);
export default SideBarData;
