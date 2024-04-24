"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({
  placeholder,
  options,
}: {
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    }
    if (!term) {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="flex  bg-white py-2 px-2 h-14" onSubmit={handleSubmit}>
      <div className="SelectProjets text-gray-600 flex  md:2/12  lg:justify-center border-r  items-center">
        <select
          onChange={(e) => {
            const { value } = e.target;

            router.push(`/${value}`);
          }}
          className="bg-white "
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className=" w-5/6 ml-auto">
        <input
          type="text"
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className=" h-full w-4/6 mr-2 px-2 float-right  bg-[#f6f6f6]"
          placeholder={placeholder}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-custom-green px-3 h-full text-white "
        >
          Search
        </button>
      </div>
    </form>
  );
}
