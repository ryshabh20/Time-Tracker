import Pagination from "@/app/ui/Pagination";
import { IdleTimeTableHeaders } from "@/app/ui/data";
import AddButton from "@/app/ui/AddButton";
import Search from "@/app/ui/Search";
import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
import IdleTimeTable from "@/app/ui/employees/IdleTimeTable";
const GetIdleTime = async (
  currentPage: number,
  order: string,
  id: string,
  search: string
) => {
  try {
    const cookie = await GetCookie();
    const url = `${BASE_URL}admin/employee/idletime/${id}/?order=${order}&page=${currentPage}&search=${new Date(
      search
    )}`;
    const res = await fetch(url, {
      next: { tags: ["idletime"] },
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
    });

    const response = await res.json();
    return {
      success: true,
      duration: response.duration,
      totalPages: Math.ceil(response.pagination.pageCount),
      role: response.role,
    };
  } catch (error) {
    return { success: false };
  }
};
export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    order?: string;
  };
  params: { id: string };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const order = searchParams?.order || "";
  const {
    duration = [],
    totalPages,
    role,
  } = await GetIdleTime(currentPage, order, params.id, search);

  const options = [
    { value: "clients", label: "Clients" },
    { value: "projects", label: "Projects" },
  ];
  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <AddButton page="Idle Time" />
      <Search options={options} placeholder="Search by date" />
      <IdleTimeTable TableHeaders={IdleTimeTableHeaders} duration={duration} />
      <Pagination totalPages={totalPages!} />
    </div>
  );
}
