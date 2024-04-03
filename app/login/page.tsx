"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchUser } from "@/store/slices/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    stayLoggedIn: "false",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      await dispatch(fetchUser());

      router.push("/dashboard");
    } catch (error: any) {
      setLoading(true);
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#f2f2f2]">
      <Image
        alt="logo"
        src="https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-23%2018-47-57.png?alt=media&token=1fab8603-9b12-470e-935c-5ad02908eb14"
        width="0"
        height="0"
        sizes="100vw"
        className="w-64 h-auto"
      />
      <div className="bg-white w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-8 rounded-lg mb-36 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-500 mb-4">Log in</h1>
        <form className="flex flex-col space-y-4" onSubmit={onLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleOnChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <div className="flex flex-row justify-between">
            <div>
              <input
                className="checked:bg-custom-green"
                type="checkbox"
                name="stayLoggedIn"
                onChange={handleOnChange}
                id="loggedIn"
              ></input>
              <label className="pl-2" htmlFor="loggedIn">
                Stay logged in
              </label>
            </div>
            <span className="underline text-custom-green">Forgot Password</span>
          </div>
          <div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <LoginButton loading={loading} />
        </form>
      </div>
    </div>
  );
}
interface LoginButtonProps {
  loading: boolean;
}

function LoginButton({ loading }: LoginButtonProps) {
  return (
    <button
      className="w-full p-2 rounded-md bg-custom-green text-white "
      aria-disabled={loading}
      type="submit"
    >
      {loading ? "Loading..." : "Login"}
    </button>
  );
}
