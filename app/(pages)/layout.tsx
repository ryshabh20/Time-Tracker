"use client";
import React, { useState } from "react";
("");
import { useAppDispatch } from "@/store/store";
import { setUserData } from "@/store/slices/userSlice";
import { useAppSelector } from "@/store/store";
import Image from "next/image";

import axios from "axios";

import { useRouter } from "next/navigation";
import { userDetails } from "@/helper/hydrationHelper";
import SideBarData from "@/helperComponents/SideBarData";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  // const [hydrated, setHydtared] = useState(false);

  // useEffect(() => {
  //   setHydtared(true);
  // }, []);

  // if (!hydrated) return null;

  // const [user, setUser] = useState<any>({});

  // useEffect(() => {
  // const getUserDetails = async () => {
  //   const response = await axios.get("/api/users/currentUser");
  //   dispatch(setUserData({ ...response.data.data, currentTask: "" }));
  //   setUser(response.data.data);
  // };
  // getUserDetails();
  // }, []);

  // useEffect(()=>{
  // const userData = useAppSelector((state) => state.userData);
  // setUser(userData)
  // },[])

  const logoutHandler = async () => {
    try {
      console.log("button was clicked");
      await axios.get("/api/users/logout");
      dispatch(setUserData(null));
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="md:3/12 lg:w-1/5 h-screen">
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
            <div className="h-12 w-12 rounded-full bg-custom-green"></div>
            {/* <div className="flex flex-col">
              <span className="text-lg float-left">
                {user?.name || "loading"}
              </span>
              <span className="text-custom-green text-lg">
                {user?.team || "loading"}
              </span>
            </div> */}

            {userDetails()}
          </div>
          <div className=" flex flex-1 justify-between flex-col ">
            <SideBarData />
            {/* <div> */}
            {/* {sideBarData.map((data, index) => (
                <Link href={data.page} key={index}>
                  <div
                    className={`hover:bg-[#00a7b1]  ${
                      active === data.name
                        ? "bg-[#00a7b1] text-white"
                        : "bg-white text-black"
                    } `}
                    key={index}
                  >
                    <div
                      key={index}
                      className="flex items-center hover:text-white lg:w-max-content mx-10 pl-1 py-2 my-3  cursor-pointer"
                    >
                      <div
                        className={`${
                          active === data.name ? "fill-white" : " text-black"
                        } `}
                      >
                        {data.icon}
                      </div>
                      <div
                        className={`ml-4 text-lg`}
                        onClick={() => {
                          setActive(data.name);
                        }}
                      >
                        {data.name}
                      </div>
                    </div>
                  </div>
                </Link>
              ))} */}
            {/* </div> */}
            <button
              onClick={logoutHandler}
              className=" bg-custom-green m-2  text-white hover:text-black p-3 text-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#f2f2f2]  w-4/5 py-16 px-10"> {children}</div>
    </div>
  );
};

export default Layout;
