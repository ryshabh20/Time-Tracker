"use client";
import React, { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/store";
import { setUserData } from "@/store/slices/userSlice";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { LuClock } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { ImFilesEmpty } from "react-icons/im";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const sideBarData = [
  {
    name: "Dashboard",
    icon: <RxDashboard className=" text-gray-600 w-10 h-10" />,
    page: "/components/dashboard",
  },
  {
    name: "Time Tracker",
    icon: <LuClock className=" text-gray-600 w-10 h-10" />,
    page: "/components/timetracker",
  },
  {
    name: "Projects",
    icon: <GrNotes className=" text-gray-600 w-10 h-10" />,
    page: "/components/projects",
  },
  {
    name: "Screenshots",
    icon: <ImFilesEmpty className=" text-gray-600 w-10 h-10" />,
    page: "/components/screenshots",
  },
];
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get("/api/users/currentUser");
      dispatch(setUserData(response.data.data));
      setUser(response.data.data);
    };
    getUserDetails();
  }, []);
  const logoutHandler = async () => {
    try {
      console.log("button was clicked");
      await axios.get("/api/users/logout");
      dispatch(setUserData(null));
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-3/12">
        <Image
          alt="logo"
          src="https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-28%2015-01-08.png?alt=media&token=1f237e60-3ad6-4be0-bce7-f0c4f70edf68"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
        <div>
          <div className="flex items-center mx-10  mb-10 space-x-4">
            <div className="h-12 w-12 rounded-full bg-custom-green"></div>
            <div className="flex flex-col">
              <span className="text-xl">{user?.name || "loading"}</span>
              <span className="text-custom-green text-xl">
                {user?.team || "loading"}
              </span>
            </div>
          </div>
          {sideBarData.map((data, index) => (
            <div className="hover:bg-[#00a7b1] " key={index}>
              <div
                key={index}
                className="flex items-center hover:text-white w-max-content mx-10 pl-1 py-2 my-5  cursor-pointer"
              >
                <div className="">{data.icon}</div>
                <div className="ml-2 text-xl ">
                  <Link href={data.page}> {data.name} </Link>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={logoutHandler}
            className="w-full bg-custom-green text-white hover:text-black p-4 text-2xl"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-[#f2f2f2] w-9/12 p-4"> {children}</div>
    </div>
  );
};

export default Layout;
