import Pagination from "@/app/ui/Pagination";
import { EmployeeTableHeaders } from "@/app/ui/data";
import AddButton from "@/app/ui/AddButton";
import EmployeesTable from "@/app/ui/employees/EmployeesTable";
import Search from "@/app/ui/Search";
import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
const GetEmployees = async (
  search: string,
  currentPage: number,
  sortBy: string,
  order: string
) => {
  try {
    const cookie = await GetCookie();
    const url = `${BASE_URL}admin/employee/getemployees?search=${search}&page=${currentPage}&sort=${sortBy}&order=${order}`;
    const res = await fetch(url, {
      next: { tags: ["employees"] },
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
    });

    const response = await res.json();
    return {
      success: true,
      employees: response.employees,
      totalPages: Math.ceil(response.pagination.pageCount),
      role: response.role,
    };
  } catch (error) {
    return { success: false };
  }
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    sort?: string;
    order?: string;
  };
}) {
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sort || "";

  const order = searchParams?.order || "";
  const {
    employees = [],
    totalPages,
    role,
  } = await GetEmployees(search, currentPage, sortBy, order);

  const options = [
    { value: "clients", label: "Clients" },
    { value: "projects", label: "Projects" },
  ];
  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <AddButton
        page="Employee"
        role={role}
        apiroute="/employees/admin/addemployee"
        text="Add a new Employee"
      />
      <Search options={options} placeholder="Search by employee name" />
      <EmployeesTable
        TableHeaders={EmployeeTableHeaders}
        employees={employees}
      />
      <Pagination totalPages={totalPages!} />
    </div>
  );
}
