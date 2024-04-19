"use server";
type DailyEntries = Record<string, Entry[]>;

import { CreateTimeEntry } from "@/app/ui/dashboard/CreateTimeEntry";
import { TimeEntries } from "@/app/ui/dashboard/TimeEntries";
import GetCookie from "@/helperComponents/getcookies";
import { Suspense } from "react";
import Loading from "./loading";

export async function Data(id: string) {
  const cookie = await GetCookie();
  try {
    const url =
      process.env.NODE_ENV === "production"
        ? `https://time-tracker-xi-three.vercel.app/api/users/getalltimeentries`
        : `http://localhost:3000/api/users/getalltimeentries`;
    const res = await fetch(url, {
      next: { tags: ["timeentries"] },
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
    });

    const response = await res.json();

    return {
      success: response.success,
      timeEntries: response.data,
      duration: response.duration,
    };
  } catch (error) {
    console.log(error);
    return {
      loading: false,
      success: false,
      message: "Error fetching the entries",
      timeEntries: [],
    };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await Data(params.id);
  const groupEntries: TimeTrackerEntries[] = data.timeEntries;
  const duration: { _id: string; totalDuration: number }[] = data.duration;

  return (
    <div>
      <CreateTimeEntry />
      <Suspense fallback={<Loading />}>
        <TimeEntries groupEntries={groupEntries} duration={duration} />
      </Suspense>
    </div>
  );
}
