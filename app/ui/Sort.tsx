"use client";
import { dynamicaction } from "@/helper/action";
import clsx from "clsx";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
export default function Sort({
  TableHeaders,
  tag,
}: {
  tag: string;
  TableHeaders: TableHeaders[];
}) {
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<string>("asc");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSort = (sort: string, order: string) => {
    const params = new URLSearchParams(searchParams);
    setSortBy(sort);
    setOrder(order);
    if (sort && order) {
      params.set("sort", sort);
      params.set("order", order);
    } else {
      dynamicaction(tag);
      params.delete("sort", sort);
      params.delete("order", order);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const className = clsx("md:flex items-center space-x-2", {
    "md:flex-col lg:flex-row": TableHeaders[0].sortvalue === "employeename",
    "md:flex-row": TableHeaders[0].sortvalue !== "employeename",
  });
  return (
    <tr>
      {TableHeaders.map((TableHeader, index) => {
        return (
          <th className=" md:px-2 lg:px-5" key={index}>
            <div className={className}>
              <div className="flex items-center justify-center h-full">
                <span className="pt-1">{TableHeader.name} </span>
              </div>
              {TableHeader?.sortvalue && (
                <div className="inline-flex items-center">
                  <span
                    onClick={() => handleSort(TableHeader.sortvalue!, "asc")}
                    className={`text-2xl  ${
                      sortBy === TableHeader.sortvalue && order === "asc"
                        ? "text-3xl"
                        : "text-2xl"
                    }`}
                  >
                    ↑{" "}
                  </span>
                  <span
                    onClick={() => handleSort(TableHeader.sortvalue!, "desc")}
                    className={`text-2xl ${
                      sortBy === TableHeader.sortvalue && order === "desc"
                        ? "text-3xl"
                        : "text-2xl"
                    }`}
                  >
                    {" "}
                    ↓
                  </span>
                </div>
              )}
            </div>
          </th>
        );
      })}
      <th className="px-5"></th>
    </tr>
  );
}
