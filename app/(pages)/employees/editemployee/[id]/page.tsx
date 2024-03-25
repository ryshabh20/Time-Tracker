import EmployeeForm from "@/helperComponents/EmployeeForm";

const Editemployee = ({ params }: { params: { id: string } }) => {
  return <EmployeeForm edit={true} id={params.id} />;
};

export default Editemployee;
