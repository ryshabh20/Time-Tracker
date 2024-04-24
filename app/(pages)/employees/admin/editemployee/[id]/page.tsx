"use client";
import AdminRoute from "@/helperComponents/AdminRoute";
import EmployeeForm from "@/helperComponents/EmployeeForm";

const Editemployee = ({ params }: { params: { id: string } }) => {
  return <EmployeeForm edit={true} id={params.id} />;
};

export default Editemployee;
