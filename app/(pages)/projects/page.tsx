import Pagination from "@/app/ui/Pagination";
import { ProjectTableHeaders } from "@/app/ui/data";
import AddProjectButton from "@/app/ui/projects/AddProjectButton";
import ProjectsTable from "@/app/ui/projects/ProjectsTable";
import Search from "@/app/ui/projects/Search";
import GetCookie from "@/helperComponents/getcookies";
const GetProjects = async (
  search: string,
  currentPage: number,
  sortBy: string,
  order: string
) => {
  try {
    const cookie = await GetCookie();
    console.log(
      "search,currentPage,typeof sortBy,order",
      search,
      currentPage,
      typeof sortBy,
      order
    );
    const url =
      process.env.NODE_ENV === "production"
        ? `https://time-tracker-xi-three.vercel.app/api/admin/project/getprojects?search=${search}&page=${currentPage}}&sort=${sortBy}&order=${order}`
        : `http://localhost:3000/api/admin/project/getprojects?search=${search}&page=${currentPage}&sort=${sortBy}&order=${order}`;
    const res = await fetch(url, {
      next: { tags: ["projects"] },
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
    });

    const response = await res.json();
    return {
      success: true,
      projects: response.projects,
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
    success,
    projects = [],
    totalPages,
    role,
  } = await GetProjects(search, currentPage, sortBy, order);
  const options = [
    { value: "clients", label: "Clients" },
    { value: "employees", label: "Employees" },
  ];
  return (
    <div className="flex flex-col max-h-screen space-y-10">
      <AddProjectButton role={role} />
      <Search options={options} placeholder="Search by project name" />
      <ProjectsTable TableHeaders={ProjectTableHeaders} projects={projects} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
