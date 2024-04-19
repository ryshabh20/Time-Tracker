"use client";
import React, { useEffect, useState } from "react";
("");
import { useAppDispatch } from "@/store/store";
import { setUserData } from "@/store/slices/userSlice";
import Image from "next/image";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { userDetails } from "@/helper/hydrationHelper";
import SideBarData from "@/helperComponents/SideBarData";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const pathname = usePathname();
  useEffect(() => {
    const intervalId = setInterval(takeScreenshot, 1800000);

    return () => clearInterval(intervalId);
  }, [pathname]);
  const logoutHandler = async () => {
    await axios.get("/api/users/logout");
    dispatch(setUserData(null));
    router.push("/login");
  };

  const takeScreenshot = async () => {
    const response = await axios.get(`/api/users/screenshot${pathname}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="md:w-4/12 lg:w-1/5 max-h-screen sticky top-0">
        <div className="h-1/5">
          <Image
            alt="logo"
            src="https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-28%2015-01-08.png?alt=media&token=1f237e60-3ad6-4be0-bce7-f0c4f70edf68"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-36"
          />
        </div>
        <div className=" flex  h-4/5 flex-col  ">
          <div className="flex items-center mx-10  space-x-4">
            {userDetails()}
          </div>
          <div className=" flex flex-1 justify-between flex-col ">
            <SideBarData />

            <button
              onClick={logoutHandler}
              className=" bg-custom-green m-2  text-white hover:text-black p-3 text-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#f2f2f2]  md:w-8/12 lg:w-4/5 py-16 px-10 ">
        {" "}
        {children}
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;
