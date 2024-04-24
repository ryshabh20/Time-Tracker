import Pagination from "@/app/ui/Pagination";
import { WorkDetailsTableHeaders } from "@/app/ui/data";
import AddButton from "@/app/ui/AddButton";
import WorkDetailTable from "@/app/ui/employees/WorkDetailTable";
import Search from "@/app/ui/Search";
import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
const GetWorkDetails = async (
  search: string,
  currentPage: number,
  sortBy: string,
  order: string,
  id: string
) => {
  try {
    const cookie = await GetCookie();
    const url = `${BASE_URL}admin/employee/workdetails/${id}?search=${search}&page=${currentPage}&sort=${sortBy}&order=${order}`;

    const res = await fetch(url, {
      next: { tags: ["workdetails"] },
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
    });

    const response = await res.json();
    return {
      success: true,
      workdetails: response.employees,
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
    sort?: string;
    order?: string;
  };
  params: { id: string };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sort || "";

  const order = searchParams?.order || "";
  const {
    workdetails = [],
    totalPages,
    role,
  } = await GetWorkDetails(search, currentPage, sortBy, order, params.id);

  const options = [
    { value: "clients", label: "Clients" },
    { value: "employees", label: "Employees" },
  ];
  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <AddButton
        page="Project"
        role={role}
        apiroute="/projects/admin/addproject"
        text="Add a new Project"
      />
      <Search options={options} placeholder="Search by technologies" />
      <WorkDetailTable
        TableHeaders={WorkDetailsTableHeaders}
        workdetails={workdetails}
      />
      <Pagination totalPages={totalPages!} />
    </div>
  );
}
