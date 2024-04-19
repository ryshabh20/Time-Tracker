"use client";
import { dynamicaction } from "@/helper/action";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
export default function Sort({
  TableHeaders,
  tag,
}: {
  tag: string;
  TableHeaders: TableHeaders[];
}) {
  const [sortBy, setSortBy] = useState<string>("projectname");
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

  return (
    <tr>
      {TableHeaders.map((TableHeader, index) => {
        return (
          <th className=" px-5" key={index}>
            {TableHeader.name}{" "}
            {TableHeader?.sortvalue && (
              <>
                <span
                  onClick={() => handleSort(TableHeader.sortvalue!, "asc")}
                  className={`text-2xl ${
                    sortBy === "projectname" && order === "asc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  ↑{" "}
                </span>
                <span
                  onClick={() => handleSort("projectname", "desc")}
                  className={`text-2xl ${
                    sortBy === "projectname" && order === "desc"
                      ? "text-3xl"
                      : "text-2xl"
                  }`}
                >
                  {" "}
                  ↓
                </span>
              </>
            )}
          </th>
        );
      })}

      {/*  */}
      <th className="px-5"></th>
    </tr>
  );
}
