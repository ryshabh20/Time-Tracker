"use server";
interface User {
  email: string;
  password: string;
}
import { cookies } from "next/headers";
export async function Authenticate(user: User) {
  try {
    const response = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    cookies().set;
    if (!response.ok) {
      return { error: response.statusText, status: response.status };
    }
    const data = await response.json();
    return { data, error: null, status: 200 };
  } catch (error) {
    return "Something went wrong";
  }
}
