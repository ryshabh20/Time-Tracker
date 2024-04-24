import Pagination from "@/app/ui/Pagination";
import { ClientTableHeaders } from "@/app/ui/data";
import AddButton from "@/app/ui/AddButton";
import ClientsTable from "@/app/ui/clients/ClientsTable";
import Search from "@/app/ui/Search";
import GetCookie from "@/helperComponents/getcookies";
import { BASE_URL } from "@/utils/BaseUrl";
const GetProjects = async (
  search: string,
  currentPage: number,
  sortBy: string,
  order: string
) => {
  try {
    const cookie = await GetCookie();
    const url = `${BASE_URL}admin/client/getclients?search=${search}&page=${currentPage}&sort=${sortBy}&order=${order}`;
    const res = await fetch(url, {
      next: { tags: ["clients"] },
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
    });

    const response = await res.json();
    return {
      success: true,
      clients: response.clients,
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
    clients = [],
    totalPages,
    role,
  } = await GetProjects(search, currentPage, sortBy, order);
  const options = [
    { value: "projects", label: "Clients" },
    { value: "employees", label: "Employees" },
  ];
  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <AddButton
        page="Client"
        role={role}
        apiroute="/clients/admin/addclient"
        text="Add a new Client"
      />
      <Search options={options} placeholder="Search by client name" />
      <ClientsTable TableHeaders={ClientTableHeaders} clients={clients} />
      <Pagination totalPages={totalPages!} />
    </div>
  );
}
