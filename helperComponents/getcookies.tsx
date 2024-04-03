import { cookies } from "next/headers";

const GetCookie = async () => {
  return cookies()?.get("authtoken")?.value ?? "";
};

export default GetCookie;
